import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const url = "https://api.sleeper.app/v1/players/nfl";

    const response = await fetch(url);
    const rawPlayers = await response.json();

    const players: any[] = Object.values(rawPlayers).filter(
      (player: any) => player.status !== "Inactive"
    );

    for (const player of players) {
      const dbPlayer = await db.player.findFirst({
        where: {
          sleeperId: player.player_id,
        },
      });

      if (!dbPlayer) {
        await db.player.create({
          data: {
            firstName: player.first_name,
            lastName: player.last_name ?? null,
            height: player.height ?? null,
            weight: player.weight ?? null,
            team: player.team ?? null,
            jerseyNumber: player.number ?? null,
            position: player.depth_chart_position ?? null,
            fantasyId: player.fantasy_data_id ?? null,
            sleeperId: player.player_id,
            adp: null,
          },
        });
      } else {
        await db.player.update({
          where: {
            sleeperId: player.player_id,
          },
          data: {
            firstName: player.first_name,
            lastName: player.last_name ?? null,
            height: player.height ?? null,
            weight: player.weight ?? null,
            team: player.team ?? null,
            jerseyNumber: player.number ?? null,
            position: player.depth_chart_position ?? null,
            fantasyId: player.fantasy_data_id ?? null,
            sleeperId: player.player_id,
          },
        });
      }
    }

    return NextResponse.json(200);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
