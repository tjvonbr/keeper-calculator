"use client";

import { Player } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import PlayerCard from "./PlayerCard";

export default function LeagueOperations({ keepers }: { keepers: any[] }) {
  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries()));
  const userId = current.get("userId");

  const sortedKeeepers = keepers.sort((a, b) => a.keeperValue - b.keeperValue);

  if (userId) {
    const myKeepers = sortedKeeepers.filter(
      (keeper) => keeper.pickedBy === userId
    );

    return (
      <div className="w-1/2 flex flex-col items-center space-y-4">
        {myKeepers.map((keeper: Player, idx: number) => {
          return <PlayerCard key={idx} player={keeper} />;
        })}
      </div>
    );
  } else {
    return (
      <div className="w-1/2 flex flex-col items-center space-y-4">
        {sortedKeeepers.map((keeper: Player, idx: number) => {
          return <PlayerCard key={idx} player={keeper} />;
        })}
      </div>
    );
  }
}
