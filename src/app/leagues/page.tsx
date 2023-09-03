import LeaguesOperations from "@/components/LeaguesOperations";
import { getLeague } from "@/lib/helpers";

export default async function Leagues({
  params,
}: {
  params: { leagueId: string };
}) {
  const league = getLeague(params.leagueId);
  console.log(league);
  return <LeaguesOperations />;
}
