import { getDraftById, getLeagueById } from "@/lib/helpers";
import Image from "next/image";
import { renderPlayerPosition } from "@/lib/utils";
import { notFound } from "next/navigation";

interface DraftProps {
  params: {
    leagueId: string;
  };
}

export default async function LeagueDraft({
  params: { leagueId },
}: DraftProps) {
  const league = await getLeagueById(leagueId);

  if (!league) {
    return notFound();
  }

  const { draftResults, draft } = await getDraftById(league.draftId);

  return (
    <div className="min-h-screen flex flex-col">
      <h1 className="text-2xl text-white font-extrabold">Draft</h1>
      <div className="mt-56 flex flex-col space-y-2">
        {draftRows(draft.settings.rounds, draftResults)}
      </div>
    </div>
  );
}

function draftRows(rounds: number, draftPicks: any[]) {
  const draftRounds = Array(rounds).fill(0);

  return draftRounds.map((_: any, idx: number) => {
    const roundPicks = draftPicks.filter((player) => player.round === idx + 1);

    if ((idx + 1) % 2 === 0) {
      roundPicks.reverse();
    }

    return (
      <div key={idx} className="min-w-screen px-5 flex space-x-2">
        {roundPicks.map((player: any, idx: number) => {
          const playerFirstInitial = player.firstName
            ? player.firstName.split("")[0] + "."
            : "";
          return (
            <div
              key={idx}
              className="relative box-border h-[50px] w-[120px] px-[3px] py-[2px] bg-white rounded-md text-black flex-grow overflow-hidden"
            >
              <div className="w-full flex relative">
                <p className="w-[80%] truncate text-xs text-black font-bold">
                  {playerFirstInitial} {player.lastName}
                </p>
                <p className="w-[20%] text-xs text-gray-600 font-medium">
                  {player.pick_no}
                </p>
              </div>
              <div className="flex space-x-1 text-xs text-black font-medium">
                <p>{player.team}</p>
                <p>{"-"}</p>
                <p>{renderPlayerPosition(player.position)}</p>
              </div>

              <Image
                src={
                  player.metadata.position === "DEF"
                    ? `https://sleepercdn.com/images/team_logos/nfl/${player.player_id.toLowerCase()}.png`
                    : `https://sleepercdn.com/content/nfl/players/${player.sleeperId}.jpg`
                }
                alt={`${player.lastName} Avatar`}
                className="absolute right-0 bottom-0"
                height="24"
                width="38"
              />
            </div>
          );
        })}
      </div>
    );
  });
}
