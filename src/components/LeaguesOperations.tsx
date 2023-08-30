"use client";

import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import LeagueCard from "./LeagueCard";

export default function Leaguesperations() {
  const [leagues, setLeagues] = useState([]);

  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  if (!userId) redirect("/");

  useEffect(() => {
    async function getLeagues() {
      const leaguesUrl = `https://api.sleeper.app/v1/user/${userId}/leagues/nfl/2023`;
      const response = await fetch(leaguesUrl);
      const rawLeagues = await response.json();
      setLeagues(rawLeagues);
    }

    getLeagues();
  }, []);

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
