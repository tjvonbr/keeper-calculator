import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function GET() {
  try {
    const url =
      "https://www.fantasypros.com/nfl/advanced-stats-wr.php?year=2023&range=week&week=2";

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, {
      timeout: 0,
    });

    const players = await page.$$eval("tbody > tr", (players) => {
      return players.map((p) => {
        const fullName = p.querySelector("a")?.innerText;
        const team = p.querySelector("small")?.innerText;
        const droppedPasses = p.querySelector("td:nth-child(19)")?.innerHTML;

        return {
          fullName,
          team,
          droppedPasses,
        };
      });
    });

    await browser.close();

    for (const player of players) {
      const fullName = player.fullName?.split(" ") as string[];
      const firstName = fullName[0];
      const lastName =
        fullName.length > 2 ? fullName.splice(-2).join(" ") : fullName[1];
      const teamName = player.team === "JAC" ? "JAX" : player.team;

      const dbPlayer = await db.player.findFirst({
        where: {
          firstName,
          lastName,
          team: teamName,
        },
      });

      if (dbPlayer) {
        await db.droppedPasses.create({
          data: {
            playerId: dbPlayer.id,
            week: 2,
            year: 2023,
            droppedPasses: Number(player.droppedPasses),
          },
        });
      } else {
        console.log(fullName);
      }
    }

    return NextResponse.json(players, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
