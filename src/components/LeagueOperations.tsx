"use client";
import { useState } from "react";
import PlayerCard from "./PlayerCard";
import { Keeper, OwnerMap } from "@/lib/helpers";
import OwnerCard from "./OwnerCard";

interface LeagueOperationsProps {
  keepers: any[];
  owners: OwnerMap;
}

enum ValueView {
  PLAYERS = "PLAYERS",
  OWNERS = "OWNERS",
}

export default function LeagueOperations({
  keepers,
  owners,
}: LeagueOperationsProps) {
  const [view, setView] = useState(ValueView.PLAYERS);

  const sortedKeeepers = keepers.sort((a, b) => b.value - a.value);

  const ownerRankings = Array.from(Object.keys(owners)).map(
    (ownerId: string) => {
      const value = keepers
        .filter((keeper) => keeper.pickedBy === ownerId)
        .map((keeper) => keeper.value)
        .reduce((acc, curr) => acc + curr, 0);

      return {
        ownerId,
        value,
      };
    }
  );

  const sortedOwnerRankings = ownerRankings.sort((a, b) => b.value - a.value);

  return (
    <div className="w-1/2 flex flex-col items-center space-y-4">
      <div className="flex space-x-2 self-end text-[#f7f8f8] text-sm">
        <button
          className="hover:text-[#29c6ff] transition-colors"
          onClick={() => setView(ValueView.PLAYERS)}
        >
          Players
        </button>
        <button
          className="hover:text-[#29c6ff] transition-colors"
          onClick={() => setView(ValueView.OWNERS)}
        >
          Owners
        </button>
      </div>
      {view === ValueView.PLAYERS
        ? sortedKeeepers.map((keeper: Keeper, idx: number) => {
            const owner = owners[keeper.pickedBy?.toString() as keyof OwnerMap];

            return (
              <PlayerCard
                key={idx}
                idx={idx}
                keepers={sortedKeeepers.length}
                player={keeper}
                owner={owner}
              />
            );
          })
        : sortedOwnerRankings.map((owner: any, idx: number) => {
            return (
              <OwnerCard
                key={idx}
                keepers={keepers}
                owners={owners}
                owner={owner}
              />
            );
          })}
    </div>
  );
}
