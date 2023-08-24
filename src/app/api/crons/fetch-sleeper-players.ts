import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const url = "https://api.sleeper.app/v1/players/nfl";

    const response = await fetch(url);
    const players = await response.json();

    for (const player of players) {
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

    return NextResponse.json(200);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
