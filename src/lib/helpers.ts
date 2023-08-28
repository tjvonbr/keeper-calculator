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

export async function getKeepers(keeperIds: string[], leagueId: string) {
  const dbPlayers = await db.player.findMany({
    where: {
      sleeperId: { in: keeperIds },
    },
  });

  const draftPicks = await getDraftPicks(leagueId);

  const keepers: any[] = [];

  for (const dbPlayer of dbPlayers) {
    const playerObj = { pickedBy: null, pickNumber: null, ...dbPlayer };

    const [draftPick] = draftPicks.filter(
      (pick: any) => pick.player_id === dbPlayer.sleeperId
    );

    playerObj.pickedBy = draftPick?.picked_by;
    playerObj.pickNumber = draftPick?.pick_no;

    keepers.push(playerObj);
  }

  const setKeepers = keepers.filter((keeper) => keeper.pickedBy !== undefined);

  return setKeepers;
}
