import LeagueOperations from "@/components/LeagueOperations";
import { getKeepers } from "@/lib/helpers";
import { notFound } from "next/navigation";

interface LeagueProps {
  params: { leagueId: string };
}

export default async function League({ params }: LeagueProps) {
  // Fetch the league's rosters
  const rostersUrl = `https://api.sleeper.app/v1/league/${params.leagueId}/rosters`;
  const response = await fetch(rostersUrl);
  const rosters = await response.json();

  const keeperIds = rosters.map((roster: any) => roster.keepers).flat();

  if (!keeperIds) {
    return notFound();
  }

  const keepers = await getKeepers(keeperIds, params.leagueId);

  return (
    <div className="min-h-screen px-3 py-20 flex flex-col justify-center items-center bg-[rgb(16,33,49]">
      <h1 className="absolute top-3 left-3 text-4xl text-white font-bold self-start">
        Keepers
      </h1>
      <LeagueOperations keepers={keepers} />
    </div>
  );
}
