import LeagueForm from "@/components/LeagueForm";
import { Hammer, Medal, Ruler, Scale } from "lucide-react";
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
    <main className="md:min-h-screen mb-10 md:mb-0 flex flex-col lg:flex-row">
      <div className="md:h-screen w-full lg:w-1/2 flex flex-col md:justify-center items-center">
        <div className="w-3/4 p-5 flex flex-col justify-center items-center text-center space-y-4">
          <h1 className="text-5xl text-white font-bold">
            Sleeper Keeper Calculator
          </h1>
          <p className="text-xl text-[#b4bcd0] font-light">
            Discover your keeper values and compare against the teams in your
            Sleeper leagues.
          </p>
          <div className="w-full flex flex-col items-center md:flex-row md:items-start space-y-6 md:space-y-0 md:space-x-4">
            <div className="w-full flex-col text-center md:text-left">
              <div className="flex justify-center md:justify-start space-x-1 text-lg md:text-sm text-white font-semibold">
                <div className="flex justify-center items-center">
                  <Scale size={15} />
                </div>
                <p>Evaluate</p>
              </div>
              <p className="text-lg md:text-sm text-[#b4bcd0]">
                Receive your keepers&apos; valuations
              </p>
            </div>
            <div className="w-full flex-col items-center text-center md:text-left">
              <div className="flex justify-center md:justify-start space-x-1 text-lg md:text-sm text-white font-semibold">
                <div className="flex justify-center items-center">
                  <Ruler size={15} />
                </div>
                <p>Compare</p>
              </div>
              <p className="text-lg md:text-sm text-[#b4bcd0]">
                See where you stack up against your league
              </p>
            </div>
            <div className="w-full flex-col text-center md:text-left">
              <div className="flex justify-center md:justify-start space-x-1 text-lg md:text-sm text-white font-semibold">
                <div className="flex justify-center items-center">
                  <Hammer size={15} />
                </div>
                <p>Build</p>
              </div>
              <p className="text-lg md:text-sm text-[#b4bcd0]">
                Optimize your keeper selection based on results
              </p>
            </div>
            <div className="w-full flex-col text-center md:text-left">
              <div className="flex md:justify-start justify-center space-x-1 text-lg md:text-sm text-white font-semibold">
                <div className="flex justify-center items-center">
                  <Medal size={15} />
                </div>
                <p>Win</p>
              </div>
              <p className="text-lg md:text-sm text-[#b4bcd0]">
                Win your league by optimizing your keepers
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:h-screen w-full lg:w-1/2 flex flex-col lg:justify-center items-center">
        <LeagueForm />
      </div>
    </main>
  );
}
