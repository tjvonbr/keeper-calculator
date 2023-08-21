import { getDraftPicks } from "@/lib/helpers";
import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const playerIds = searchParams.get("ids");

    if (!playerIds) {
      return;
    }

    const players = await db.player.findMany({
      where: {
        sleeperId: { in: JSON.parse(playerIds) },
      },
    });

    const results: any[] = [];

    for (const player of players) {
      const playerObj = { adp: null, ...player };

      const fantasyDataUrl = `https://api.sportsdata.io/v3/nfl/projections/json/PlayerSeasonProjectionStatsByTeam/2023/${player.team}?key=${process.env.SPORTS_DATA_API_KEY}`;
      const response = await fetch(fantasyDataUrl);
      const playersTeam = await response.json();

      let playerProjection;
      // Some of the players returned from the Sleeper API are without a fantasy ID...
      if (player.fantasyId === null) {
        [playerProjection] = playersTeam.filter(
          (p: any) => p.Name === `${player.firstName} ${player.lastName}`
        );
      } else {
        [playerProjection] = playersTeam.filter(
          (p: any) => p.PlayerID === player.fantasyId
        );
      }

      // const draftPicks = await getDraftPicks(params.leagueId);

      playerObj.adp = playerProjection.AverageDraftPositionPPR;

      if (player.fantasyId === null) {
        playerObj.fantasyId = playerProjection.PlayerID;
      }

      results.push(playerObj);
    }

    return NextResponse.json(results);
  } catch (err) {
    throw new Error(`Error: ${err}`);
  }
}
