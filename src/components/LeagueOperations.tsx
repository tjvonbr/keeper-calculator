"use client";
import PlayerCard from "./PlayerCard";
import { Keeper, OwnerMap } from "@/lib/helpers";

interface LeagueOperationsProps {
  keepers: any[];
  owners: OwnerMap;
}

export default function LeagueOperations({
  keepers,
  owners,
}: LeagueOperationsProps) {
  const sortedKeeepers = keepers.sort((a, b) => b.value - a.value);

  return (
    <div className="w-1/2 flex flex-col items-center space-y-4">
      {sortedKeeepers.map((keeper: Keeper, idx: number) => {
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
      })}
    </div>
  );
}
