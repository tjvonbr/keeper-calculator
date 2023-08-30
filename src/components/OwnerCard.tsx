import { Keeper, OwnerMap } from "@/lib/helpers";

export default function OwnerCard({
  keepers,
  owner,
  owners,
}: {
  keepers: Keeper[];
  owner: any;
  owners: OwnerMap;
}) {
  const ownerKeepers = keepers.filter(
    (keeper) => keeper.pickedBy === owner.ownerId
  );

  return (
    <div className="h-20 w-full p-2 flex justify-between items-center border rounded-md bg-white hover:bg-slate-100 transition-colors shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]">
      <div className="flex flex-col">
        <p className="text-xl font-bold">{owners[owner.ownerId]}</p>
        <div className="flex space-x-1 text-sm">
          <span className="text-sm font-semibold">Keepers:</span>
          {ownerKeepers.map((keeper, idx) => (
            <p className="text-sm text-slate-500" key={idx}>
              {keeper.firstName} {keeper.lastName}
            </p>
          ))}
        </div>
      </div>
      <p className="text-sm font-medium">Total value: {owner.value}</p>
    </div>
  );
}
