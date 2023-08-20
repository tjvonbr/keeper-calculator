import { Player } from "@prisma/client";

export default function PlayerCard({ player }: { player: Player }) {
  const fullName = player.firstName + " " + player.lastName;
  return (
    <div className="h-20 w-full p-2 border rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
      <p className="text-md font-bold">{fullName}</p>
    </div>
  );
}
