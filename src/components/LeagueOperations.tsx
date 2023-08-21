"use client";

import { Player } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import PlayerCard from "./PlayerCard";

export default function LeagueOperations({ keepers }: { keepers: any[] }) {
  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries()));
  const userId = current.get("userId");

  if (userId) {
    const myKeepers = keepers.filter(
      (keeper) => keeper.draft.picked_by === userId
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
        {keepers.map((keeper: Player, idx: number) => {
          return <PlayerCard key={idx} player={keeper} />;
        })}
      </div>
    );
  }
}
