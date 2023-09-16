import { getDroppedPasses } from "@/lib/helpers";

export default async function MissedOpportunities() {
  const rawDroppedPasses = await getDroppedPasses(2023, 1);
  const droppedPasses = rawDroppedPasses.filter((dp) => dp.droppedPasses !== 0);
  droppedPasses.sort((a, b) => b.droppedPasses - a.droppedPasses);

  return (
    <div className="flex flex-col items-center">
      <div className="w-1/2 flex flex-col items-center">
        <h2 className="text-3xl text-white font-bold">Missed Opportunities</h2>
        <p className="text-white">
          Missed opportunities are scenarios where points are left on the board.
          If a player drops a pass or fumbles the ball, these are points that
          you could&apos;ve had but do not at the end of the day
        </p>
        <table className="w-full mt-32 rounded-md text-sm text-white">
          {droppedPasses.map((dp, idx) => {
            return (
              <tr key={idx} className="even:bg-[#171717] odd:bg-[#2e2e2e]">
                <td className="rounded-l-md px-2 py-3 font-semibold">{`${dp.player.firstName} ${dp.player.lastName}`}</td>
                <td className="rounded-r-md">{dp.droppedPasses}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}
