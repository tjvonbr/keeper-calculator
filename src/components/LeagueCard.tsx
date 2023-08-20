"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function LeagueCard({ league }: { league: any }) {
  const searchParams = useSearchParams();

  const current = new URLSearchParams(Array.from(searchParams.entries()));
  const search = current.toString();
  const query = search ? `?${search}` : "";

  return (
    <Link href={`/leagues/${league.league_id}${query}`}>
      <div className="h-20 w-full p-2 border rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <div className="flex items-center space-x-2">
          <p className="text-md font-bold">{league.name}</p>
          <p className="text-sm text-slate-500">{league.season}</p>
          <p className="text-sm text-slate-500">{`${league.total_rosters}-team league`}</p>
        </div>
      </div>
    </Link>
  );
}
