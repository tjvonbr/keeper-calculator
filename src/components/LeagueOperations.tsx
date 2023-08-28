"use client";

import { Player } from "@prisma/client";
import PlayerCard from "./PlayerCard";

export default function LeagueOperations({ keepers }: { keepers: any[] }) {
  const sortedKeeepers = keepers.sort((a, b) => b.value - a.value);

  return (
    <div className="w-1/2 flex flex-col items-center space-y-4">
      {sortedKeeepers.map((keeper: Player, idx: number) => {
        return (
          <PlayerCard
            key={idx}
            idx={idx}
            keepers={sortedKeeepers.length}
            player={keeper}
          />
        );
      })}
    </div>
  );
}
