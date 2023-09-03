import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function GET() {
  try {
    const url =
      "https://www.fantasypros.com/nfl/adp/half-point-ppr-overall.php";

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, {
      timeout: 0,
    });

    const players = await page.$$eval("tbody > tr", (players) => {
      return players.map((p) => {
        const fullName = p.querySelector("a")?.innerText;
        const team = p.querySelector("small")?.innerText;
        const adp = p.querySelector("td:nth-child(5)")?.innerHTML;

        return {
          fullName,
          team,
          adp,
        };
      });
    });

    await browser.close();

    for (const player of players) {
      const fullName = player.fullName?.split(" ") as string[];

      if (fullName.includes("DST")) {
        const mascot = fullName.length > 3 ? fullName[2] : fullName[1];
        const city =
          fullName.length > 3 ? fullName.splice(0, 2).join(" ") : fullName[0];

        const dbDefense = await db.player.findFirst({
          where: {
            firstName: city,
            lastName: mascot,
          },
        });

        if (dbDefense) {
          await db.averageDraftPosition.update({
            where: {
              playerId: dbDefense.id,
            },
            data: {
              halfPpr: Number(player.adp),
            },
          });
        } else {
          console.log(fullName);
        }
      } else {
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
          await db.averageDraftPosition.create({
            data: {
              playerId: dbPlayer.id,
              date: new Date(),
              halfPpr: Number(player.adp as string),
            },
          });
        } else {
          console.log(fullName);
        }
      }
    }

    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
