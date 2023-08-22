import { NFLTeamMap, nflTeamMap } from "@/config/league";

export default function PlayerCard({ player }: { player: any }) {
  const fullName = player.firstName + " " + player.lastName;

  return (
    <div className="h-20 w-full p-2 flex flex-col space-between border rounded-md bg-white hover:bg-slate-100 transition-colors shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <p className="text-xl font-bold">{fullName}</p>
          <p className="text-sm text-slate-500 font-medium">
            {nflTeamMap[player.team as keyof NFLTeamMap]}
          </p>
          <p className="text-sm text-slate-500 font-medium">
            #{player.jerseyNumber}
          </p>
          <p className="text-sm text-slate-500 font-medium">
            {player.position}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <p className="text-sm font-medium">
          Pick: <span className="text-sm font-medium">{player.pickNumber}</span>
        </p>
        <p className="text-sm font-medium">
          ADP:{" "}
          <span className="text-sm font-medium">{Math.round(player.adp)}</span>
        </p>
        <p className="text-sm font-medium">
          Value:{" "}
          <span className="text-sm font-medium">
            {player.pickNumber - Math.round(player.adp)}
          </span>
        </p>
      </div>
    </div>
  );
}
