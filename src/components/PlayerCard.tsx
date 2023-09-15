import Image from "next/image";
import { NFLTeamMap, nflTeamMap } from "@/config/league";

export default function PlayerCard({
  idx,
  keepers,
  owner,
  player,
}: {
  idx: number;
  keepers: number;
  owner: string;
  player: any;
}) {
  const fullName = player.firstName + " " + player.lastName;

  function renderPlayerEmoji() {
    if (idx === 0) {
      return "🥇";
    } else if (idx === 1) {
      return "🥈";
    } else if (idx === 2) {
      return "🥉";
    } else if (idx === keepers - 1) {
      return "💩";
    } else if (idx === keepers - 2) {
      return "😬";
    } else {
      return "";
    }
  }

  return (
    <div className="h-20 w-full p-2 flex justify-between items-center border rounded-md bg-white hover:bg-slate-100 transition-colors shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]">
      <div className="w-1/2 flex flex-col justify-center">
        <div className="flex items-center">
          <object
            data={`https://sleepercdn.com/content/nfl/players/${player.sleeperId}.jpg`}
            type="image/png"
            height="32"
            width="44"
          ></object>
          <object
            className="-translate-x-4 translate-y-1.5"
            data={`https://sleepercdn.com/images/team_logos/nfl/${player.team.toLowerCase()}.png`}
            height="16"
            width="16"
          />
          <div className="flex items-center space-x-2 -translate-x-2">
            <p className="text-xl text-black font-bold">{fullName}</p>
            <p className="text-sm text-slate-500">{owner}</p>
          </div>
        </div>
        <div className="flex space-x-2">
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
      <div className="w-1/2 flex justify-end text-left space-x-4">
        <p className="text-sm text-black font-medium">
          Pick:{" "}
          <span className="text-sm text-black font-medium">
            {player.pickNumber}
          </span>
        </p>
        <p className="text-sm text-black font-medium">
          ADP:{" "}
          <span className="text-sm text-black font-medium">
            {Math.round(player.adp)}
          </span>
        </p>
        <p className="text-sm text-black font-medium">
          Value:{" "}
          <span className="text-sm text-black font-medium">
            {player.pickNumber - Math.round(player.adp)}
          </span>
          <span className="ml-1">{renderPlayerEmoji()}</span>
        </p>
      </div>
    </div>
  );
}
