import { Player } from "@prisma/client";
import { NFLTeamMap, nflTeamMap } from "@/config/teams";

export default function PlayerCard({ player }: { player: Player }) {
  const fullName = player.firstName + " " + player.lastName;

  return (
    <div className="h-20 w-full p-2 flex flex-col space-between border rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <p className="text-xl font-bold">{fullName}</p>
          <p className="text-sm font-semibold">
            {nflTeamMap[player.team as keyof NFLTeamMap]}
          </p>
          <p className="text-sm font-semibold">#{player.jerseyNumber}</p>
          <p className="text-sm font-semibold">{player.position}</p>
        </div>
        <p></p>
      </div>
      <div className="flex items-center space-x-4">
        <p className="text-sm font-semibold">
          Pick in draft:{" "}
          <span className="text-sm font-normal">{player.draft.pick_no}</span>
        </p>
        <p className="text-sm font-semibold">
          PPR ADP:{" "}
          <span className="text-sm font-normal">{Math.round(player.adp)}</span>
        </p>
        <p className="text-sm font-semibold">
          Value:{" "}
          <span className="text-sm font-normal">
            {player.draft.pick_no - Math.round(player.adp)}
          </span>
        </p>
      </div>
    </div>
  );
}
