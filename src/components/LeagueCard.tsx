"use client";

import { SeasonStatus, seasonStatusMap } from "@/config/league";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function LeagueCard({ league }: { league: any }) {
  const searchParams = useSearchParams();

  const current = new URLSearchParams(Array.from(searchParams.entries()));
  const search = current.toString();
  const query = search ? `?${search}` : "";

  function renderLeagueFormat() {
    if (league.scoring_settings.rec === 0.5) {
      return "Half-PPR";
    } else if (league.scoring_settings === 1) {
      return "PPR";
    } else {
      return "";
    }
  }

  return (
    <Link href={`/leagues/${league.league_id}`}>
      <div className="h-20 w-full p-2 flex flex-col space-between border rounded-md bg-white hover:bg-slate-100 transition-colors shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]">
        <div className="flex items-center space-x-2">
          <p className="text-lg font-bold">{league.name}</p>
          <p className="text-sm font-semibold text-slate-500">
            {league.season}
          </p>
          <p className="text-sm font-semibold text-slate-500">
            {seasonStatusMap[league.status as keyof SeasonStatus]}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <p className="text-sm font-medium text-slate-500">{`${league.total_rosters}-team league`}</p>
          <p className="text-sm font-medium text-slate-500">{`${league.settings.max_keepers} keepers`}</p>
          <p className="text-sm font-medium text-slate-500">
            {renderLeagueFormat()}
          </p>
        </div>
      </div>
    </Link>
  );
}
