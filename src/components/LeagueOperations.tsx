"use client";

import { Player } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import PlayerCard from "./PlayerCard";

export default function LeagueOperations({
  draftPicks,
  rosters,
}: {
  draftPicks: any[];
  rosters: any[];
}) {
  const [keepers, setKeepers] = useState([]);
  const [draftData, setDraftData] = useState([]);

  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries()));
  const userId = current.get("userId");

  const [myRoster] = rosters.filter((roster) => roster.owner_id === userId);

  useEffect(() => {
    async function getKeepers() {
      current.set("ids", JSON.stringify(myRoster.players));
      const search = current.toString();
      const query = search ? `?${search}` : "";

      const response = await fetch(`http://localhost:3000/api/players${query}`);
      const players = await response.json();

      const myPicks = draftPicks.filter((pick) =>
        keepers.some((keeper: any) => pick.player_id === keeper.sleeperId)
      );

      console.log(myPicks);
    }

    getKeepers();
  }, []);

  return (
    <div className="w-1/2 flex flex-col items-center space-y-4">
      {keepers.map((keeper: Player, idx: number) => {
        return <PlayerCard key={idx} player={keeper} />;
      })}
      player
    </div>
  );
}
