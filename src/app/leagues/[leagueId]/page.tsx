import LeagueOperations from "@/components/LeagueOperations";
import { getKeepers, getOwners } from "@/lib/helpers";
import { Http2ServerRequest } from "http2";
import { Divide } from "lucide-react";
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
  const ownerIds = keepers.map((keeper) => keeper.pickedBy);
  const owners = await getOwners(ownerIds);

  return (
    <div className="min-h-screen px-3 py-20 flex flex-col justify-center items-center bg-[rgb(16,33,49]">
      <h1 className="absolute top-3 left-3 text-4xl text-white font-bold self-start">
        Keepers
      </h1>
      {keepers.length === 0 ? (
        <div className="w-1/2 flex flex-col items-center space-y-2">
          <h2 className="text-4xl font-bold text-white">Heads Up!</h2>
          <p className="text-xl text-center text-white">
            If you don&apos;t see any keepers here, and you know you&apos;ve set
            your keepers, remind your commisioner to add your keepers to the
            upcoming draft. We&apos;re working on a solution so you&apos;re
            commisioner does not need to get involved, but in the meantime,
            it&apos;s necessary. Thanks!
          </p>
        </div>
      ) : (
        <LeagueOperations keepers={keepers} owners={owners} />
      )}
    </div>
  );
}
