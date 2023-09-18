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

export interface AvatarMap extends OwnerMap {}

export async function getDraftById(draftId: string) {
  const response = await fetch(`https://api.sleeper.app/v1/draft/${draftId}`);
  const draft = await response.json();

  const draftPicksResponse = await fetch(
    `https://api.sleeper.app/v1/draft/${draftId}/picks`
  );
  const draftPicks = await draftPicksResponse.json();
  const draftResults = [];

  for (const draftPick of draftPicks) {
    const dbPlayer = await db.player.findFirst({
      where: {
        sleeperId: draftPick.player_id,
      },
    });

    if (!dbPlayer) {
      break;
    }

    const playerAdp = await db.averageDraftPosition.findFirst({
      where: {
        playerId: dbPlayer.id,
      },
    });

    const playerObj = {
      ...draftPick,
      ...dbPlayer,
      adp: playerAdp?.halfPpr,
      value: playerAdp?.halfPpr ? draftPick.pick_no - playerAdp?.halfPpr : 0,
    };
    draftResults.push(playerObj);
  }

  return { draft, draftResults };
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
    if (leagueStatus !== "complete") {
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
  const avatarMap: AvatarMap = {};

  for (const ownerId of Array.from(ownerSet)) {
    const response = await fetch(`https://api.sleeper.app/v1/user/${ownerId}`);
    const owner = await response.json();

    ownerMap[ownerId] = owner.display_name;
    avatarMap[ownerId] = owner.avatar;
  }

  return { ownerMap, avatarMap };
}

export async function getLeagueById(leagueId: string) {
  const league = await db.league.findFirst({
    where: {
      sleeperId: leagueId,
    },
    include: {
      scoringSettings: true,
    },
  });

  return league;
}

export async function findOrCreateLeagues(userId: string) {
  const leaguesResponse = await fetch(
    `https://api.sleeper.app/v1/user/${userId}/leagues/nfl/2023`
  );
  const leagues = await leaguesResponse.json();

  const dbLeagues = await db.$transaction(
    leagues.map((league: any) =>
      db.league.upsert({
        where: {
          sleeperId: league.league_id,
        },
        include: {
          scoringSettings: true,
        },
        update: {},
        create: {
          name: league.name,
          sleeperId: league.league_id,
          previousLeagueSleeperId: league.previous_league_id,
          status: league.status,
          teams: league.total_rosters,
          maxKeepers: league.settings.max_keepers,
          seasonType: league.season_type,
          season: league.season,
          draftId: league.draft_id,
          scoringSettings: {
            create: {
              fumble: league.scoring_settings.fum,
              fumbleLost: league.scoring_settings.fum_lost,
              interceptionThrown: league.scoring_settings.pass_int,
              reception: league.scoring_settings.rec,
            },
          },
        },
      })
    )
  );

  return dbLeagues;
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
