import LeagueOperations from "@/components/LeagueOperations";
import { getDraftPicks } from "@/lib/helpers";

export default async function League({
  params,
}: {
  params: { leagueId: string };
}) {
  const rostersUrl = `https://api.sleeper.app/v1/league/${params.leagueId}/rosters`;
  const response = await fetch(rostersUrl);
  const rosters = await response.json();

  const draftPicks = await getDraftPicks(params.leagueId);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <LeagueOperations draftPicks={draftPicks} rosters={rosters} />
    </div>
  );
}
