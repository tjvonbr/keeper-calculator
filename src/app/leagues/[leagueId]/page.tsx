import LeagueOperations from "@/components/LeagueOperations";
import { getPlayerProjections } from "@/lib/helpers";
import { notFound } from "next/navigation";

interface LeagueProps {
  params: { leagueId: string };
}

export default async function League({ params }: LeagueProps) {
  // Fetch the league's rosters
  const rostersUrl = `https://api.sleeper.app/v1/league/${params.leagueId}/rosters`;
  const response = await fetch(rostersUrl);
  const rosters = await response.json();

  const keepers = rosters.map((roster: any) => roster.keepers).flat();

  const keepersWithADP = await getPlayerProjections(params.leagueId, keepers);

  if (!keepersWithADP) {
    return notFound();
  }

  return (
    <div className="min-h-screen px-3 py-2 flex flex-col justify-center items-center bg-[rgb(16,33,49]">
      <h1 className="text-4xl font-bold self-start">Keepers</h1>
      <LeagueOperations keepers={keepersWithADP} />
    </div>
  );
}
