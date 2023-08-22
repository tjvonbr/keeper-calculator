import { Player } from "@prisma/client";
import { db } from "./prisma";

export async function getDraftPicks(leagueId: string) {
  try {
    // Get all drafts for a league
    const response = await fetch(
      `https://api.sleeper.app/v1/league/${leagueId}/drafts`
    );
    const [leagueDrafts] = await response.json();
    const draftId = leagueDrafts.draft_id;

    // Get specific draft
    const result = await fetch(
      `https://api.sleeper.app/v1/draft/${draftId}/picks`
    );
    const draftPicks = await result.json();

    return draftPicks;
  } catch (error) {
    throw error;
  }
}

export interface PlayerWithDraftValue extends Player {
  adp: number;
  pickedBy: string;
  pickNumber: number;
  keeperValue: number;
}

export async function getPlayerProjections(
  leagueId: string,
  sleeperIds: string[]
) {
  const players = await db.player.findMany({
    where: {
      sleeperId: { in: sleeperIds },
    },
  });

  if (!players) {
    return;
  }

  // Grab the league's draft picks
  const draftPicks = await getDraftPicks(leagueId);

  const projectionResults: any[] = [];

  for (const player of players) {
    const [pick] = draftPicks.filter(
      (dp: any) => dp.player_id === player.sleeperId
    );

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

    const playerObj: PlayerWithDraftValue = {
      adp: Math.round(playerProjection.AverageDraftPositionPPR),
      keeperValue: Math.round(
        pick.pick_no - playerProjection.AverageDraftPositionPPR
      ),
      pickedBy: pick.picked_by,
      pickNumber: pick.pick_no,
      ...player,
    };

    projectionResults.push(playerObj);
  }

  return projectionResults;
}
