import LeagueOperations from "@/components/LeagueOperations";
import { getKeepers, getLeagueById, getOwners } from "@/lib/helpers";
import Link from "next/link";
import { notFound } from "next/navigation";

interface LeagueProps {
  params: { leagueId: string };
}

export default async function League({ params }: LeagueProps) {
  const league = await getLeagueById(params.leagueId);

  if (!league) {
    return notFound();
  }

  const rostersUrl = `https://api.sleeper.app/v1/league/${params.leagueId}/rosters`;
  const response = await fetch(rostersUrl);
  const rosters = await response.json();

  const keeperIds = rosters.map((roster: any) => roster.keepers).flat();

  if (!keeperIds) {
    return notFound();
  }

  const keepers = await getKeepers(keeperIds, params.leagueId, league.status);
  const ownerIds = keepers.map((keeper) => keeper.pickedBy);
  const { ownerMap } = await getOwners(ownerIds);

  return (
    <div className="min-h-screen px-3 py-20 flex flex-col justify-center items-center bg-[rgb(16,33,49]">
      <div className="absolute top-0 left-0 pt-5 px-5 h-10 w-full flex justify-between items-center">
        <h1 className="text-3xl text-white font-bold">{league.name}</h1>
        <nav className="flex items-center space-x-4">
          <Link className="text-sm" href={`${params.leagueId}/draft`}>
            Draft
          </Link>
          <Link className="text-sm" href="/keepers">
            Keepers
          </Link>
        </nav>
      </div>
      {keepers.length === 0 ? (
        <div className="w-1/2 flex flex-col items-center space-y-2">
          <h2 className="text-2xl font-bold text-white">Whoops!</h2>
          <p className="text-md text-center text-blue-100 font-medium">
            If you don&apos;t see your league&apos;s keepers here, and you know
            you&apos;ve set them, remind your commisioner to add your keepers to
            your league&apos;s draftboard. We&apos;re working on a solution so
            you&apos;re commisioner does not need to get involved, but in the
            meantime, it&apos;s unfortunately necessary. Thanks for patience!
          </p>
        </div>
      ) : (
        <LeagueOperations keepers={keepers} owners={ownerMap} />
      )}
    </div>
  );
}
