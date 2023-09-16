import { Player } from "@prisma/client";
import { db } from "./prisma";

export interface Keeper extends Player {
  adp: number | null;
  pickedBy?: number;
  pickNumber: number | null;
  value: null | number;
}

export interface OwnerMap {
  [key: string]: string;
}

export async function getDraftData(leagueId: string) {
  try {
    const response = await fetch(
      `https://api.sleeper.app/v1/league/${leagueId}/drafts`
    );
    const [leagueDrafts] = await response.json();
    const draftId = leagueDrafts.draft_id;

    const draftResponse = await fetch(
      `https://api.sleeper.app/v1/draft/${draftId}`
    );
    const draft = await draftResponse.json();
    const draftStartTime = draft.start_time;

    const result = await fetch(
      `https://api.sleeper.app/v1/draft/${draftId}/picks`
    );
    const draftPicks = await result.json();

    return { draftStartTime, draftPicks };
  } catch (error) {
    throw error;
  }
}

export async function getKeepers(
  keeperIds: string[],
  leagueId: string,
  leagueStatus: string
) {
  const dbPlayers = await db.player.findMany({
    where: {
      sleeperId: { in: keeperIds },
    },
  });

  const { draftPicks, draftStartTime } = await getDraftData(leagueId);

  const keepers: any[] = [];

  for (const dbPlayer of dbPlayers) {
    const playerObj: Keeper = {
      pickNumber: null,
      adp: null,
      value: null,
      ...dbPlayer,
    };

    let adp;
    if (leagueStatus !== "comlete") {
      adp = await db.averageDraftPosition.findFirst({
        where: {
          playerId: dbPlayer.id,
          date: {
            lte: new Date(draftStartTime),
          },
        },
      });

      if (!adp) {
        adp = await db.averageDraftPosition.findFirst({
          where: {
            playerId: dbPlayer.id,
          },
        });
      }

      if (adp) playerObj.adp = adp.halfPpr;
    } else {
      adp = await db.averageDraftPosition.findFirst({
        where: {
          playerId: dbPlayer.id,
        },
      });

      if (adp) playerObj.adp = adp.halfPpr;
    }

    const [draftPick] = draftPicks.filter(
      (pick: any) => pick.player_id === dbPlayer.sleeperId
    );

    playerObj.pickedBy = draftPick?.picked_by;
    playerObj.pickNumber = draftPick?.pick_no;
    playerObj.value = draftPick?.pick_no - (adp?.halfPpr ? adp.halfPpr : 0);

    keepers.push(playerObj);
  }

  const setKeepers = keepers.filter((keeper) => keeper.pickedBy !== undefined);

  return setKeepers;
}

export async function getOwners(ownerIds: string[]) {
  const ownerSet = new Set(ownerIds);
  const ownerMap: OwnerMap = {};

  for (const ownerId of Array.from(ownerSet)) {
    const response = await fetch(`https://api.sleeper.app/v1/user/${ownerId}`);
    const owner = await response.json();

    ownerMap[ownerId] = owner.display_name;
  }

  return ownerMap;
}

export async function getLeague(leagueId: string) {
  const response = await fetch(`https://api.sleeper.app/v1/league/${leagueId}`);
  const league = await response.json();

  return league;
}

export async function getDroppedPasses(season: number, week: number) {
  const droppedPasses = await db.droppedPasses.findMany({
    where: {
      year: season,
      week,
    },
    include: {
      player: true,
    },
  });

  return droppedPasses;
}
