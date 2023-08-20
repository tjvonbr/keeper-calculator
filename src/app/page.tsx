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
  //     team: sleeperPlayers[id].team ?? null,
  //     position: sleeperPlayers[id].depth_chart_position ?? null,
  //     fantasyId: sleeperPlayers[id].fantasy_data_id ?? null,
  //     sleeperId: sleeperPlayers[id].player_id,
  //   };
  // });

  // try {
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
    <main className="min-h-screen flex flex-col justify-center items-center">
      <LeagueForm />
    </main>
  );
}
