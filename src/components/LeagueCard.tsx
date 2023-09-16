"use client";

import { SeasonStatus, seasonStatusMap } from "@/config/league";
import { LeagueWithScoringSettings } from "@/types/league";
import Link from "next/link";

export default function LeagueCard({
  league,
}: {
  league: LeagueWithScoringSettings;
}) {
  function renderLeagueFormat() {
    if (league.scoringSettings?.reception === 0.5) {
      return "Half-PPR";
    } else if (league.scoringSettings?.reception === 1) {
      return "PPR";
    } else {
      return "";
    }
  }

  return (
    <Link href={`/leagues/${league.sleeperId}`}>
      <div className="h-20 w-full p-2 flex flex-col space-between border rounded-md bg-white hover:bg-slate-100 transition-colors shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]">
        <div className="flex items-center space-x-2">
          <p className="text-lg text-black font-bold">{league.name}</p>
          <p className="text-sm font-semibold text-slate-500">
            {league.season}
          </p>
          <p className="text-sm font-semibold text-slate-500">
            {seasonStatusMap[league.status as keyof SeasonStatus]}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <p className="text-sm font-medium text-slate-500">{`${league.teams}-team league`}</p>
          <p className="text-sm font-medium text-slate-500">{`${league.maxKeepers} keepers`}</p>
          <p className="text-sm font-medium text-slate-500">
            {league.scoringSettings ? renderLeagueFormat() : ""}
          </p>
        </div>
      </div>
    </Link>
  );
}
