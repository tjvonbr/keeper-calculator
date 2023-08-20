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

export async function getPlayerProjection(sleeperIds: string[]) {
  const dbPlayers = await db.player.findMany({
    where: {
      sleeperId: { in: sleeperIds },
    },
  });

  if (!dbPlayers) {
    return;
  }

  const projectionResults = [];

  for (const dbPlayer of dbPlayers) {
    const fantasyDataUrl = `https://api.sportsdata.io/v3/nfl/projections/json/PlayerSeasonProjectionStatsByTeam/2023/${dbPlayer.team}?key=${process.env.SPORTS_DATA_API_KEY}`;
    const response = await fetch(fantasyDataUrl);
    const playersTeam = await response.json();
    const playerProjection = playersTeam.filter(
      (player: any) => player.PlayerID === dbPlayer.fantasyId
    );
    projectionResults.push(playerProjection);
  }

  return projectionResults;
}
