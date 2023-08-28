import { Player } from "@prisma/client";
import { db } from "./prisma";

interface Keeper extends Player {
  pickedBy: null | number;
  pickNumber: null | number;
  value: null | number;
}

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
    const playerObj: Keeper = {
      pickedBy: null,
      pickNumber: null,
      value: null,
      ...dbPlayer,
    };

    const [draftPick] = draftPicks.filter(
      (pick: any) => pick.player_id === dbPlayer.sleeperId
    );

    playerObj.pickedBy = draftPick?.picked_by;
    playerObj.pickNumber = draftPick?.pick_no;
    playerObj.value = draftPick?.pick_no - (dbPlayer.adp ? dbPlayer.adp : 0);

    keepers.push(playerObj);
  }

  const setKeepers = keepers.filter((keeper) => keeper.pickedBy !== undefined);

  return setKeepers;
}
