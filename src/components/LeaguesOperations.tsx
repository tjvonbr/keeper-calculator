"use client";

import LeagueCard from "./LeagueCard";
import { LeagueWithScoringSettings } from "@/types/league";

export default function LeaguesOperations({
  leagues,
}: {
  leagues: LeagueWithScoringSettings[];
}) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="absolute top-3 left-3 text-4xl text-white font-bold">
        Leagues
      </h1>
      <div className="w-1/2">
        {leagues.map((league: any, idx: number) => {
          return <LeagueCard key={idx} league={league} />;
        })}
      </div>
    </div>
  );
}
