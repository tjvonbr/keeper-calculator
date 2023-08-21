import LeagueForm from "@/components/LeagueForm";
import { db } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export default async function Home() {
  // const response = await fetch("https://api.sleeper.app/v1/players/nfl");
  // const sleeperPlayers = await response.json();

  // const players = Object.keys(sleeperPlayers).map((id: any) => {
  //   return {
  //     firstName: sleeperPlayers[id].first_name,
  //     lastName: sleeperPlayers[id].last_name ?? null,
  //     height: sleeperPlayers[id].height ?? null,
  //     weight: sleeperPlayers[id].weight ?? null,
  //     team: sleeperPlayers[id].team ?? null,
  //     jerseyNumber: sleeperPlayers[id].number ?? null,
  //     position: sleeperPlayers[id].depth_chart_position ?? null,
  //     fantasyId: sleeperPlayers[id].fantasy_data_id ?? null,
  //     sleeperId: sleeperPlayers[id].player_id,
  //   };
  // });

  // try {
  //   console.log("db");
  //   await db.player.createMany({
  //     data: players,
  //     skipDuplicates: true,
  //   });
  // } catch (error) {
  //   if (error instanceof Prisma.PrismaClientKnownRequestError) {
  //     // The .code property can be accessed in a type-safe manner
  //     if (error.code === "P2002") {
  //       console.log(
  //         "There is a unique constraint violation, a new user cannot be created with this email"
  //       );
  //     }
  //   }
  //   console.log(error);
  // }

  return (
    <main className="min-h-screen grid grid-cols-2 items-center">
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="w-3/4 flex flex-col justify-center items-center text-center space-y-4">
          <h1 className="text-5xl text-white font-bold">
            Sleeper Keeper Calculator
          </h1>
          <p className="text-xl text-slate-300 font-light">
            Discover your keeper values and compare against the teams in your
            Sleeper leagues.
          </p>
          <div className="w-full flex">
            <div className="w-1/2 flex flex-col items-center">
              <p className="text-lg font-semibold text-white text-left">
                What it does:
              </p>
              <ul className="text-white font-light space-y-4 text-left">
                <li>
                  ✅ Pulls your keepers from your Sleeper leagues and learns
                  where your player will be drafted
                </li>
                <li>
                  ✅ Compares your draft pick with the player&apos;s average
                  draft position and gives you a score
                </li>
                <li>✅ Shares your fellow league owners&apos; keeper scores</li>
              </ul>
            </div>
            <div className="w-1/2 flex flex-col items-center">
              <p className="text-lg font-semibold text-white text-left">
                What it doesn&apos;t do:
              </p>
              <ul className="text-white font-light space-y-4 text-left">
                <li>
                  🚫 Tells you which of your players would be the optimal
                  keepers
                </li>
                <li>
                  🚫 Allows you to change your keepers from this platform. You
                  can only do that in the Sleeper app.
                </li>
                <li>🚫 Store any of your personal data</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="h-screen flex flex-col justify-center items-center">
        <LeagueForm />
      </div>
    </main>
  );
}
