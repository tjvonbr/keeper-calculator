import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import fs from "fs";

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

    fs.writeFile("test.json", JSON.stringify(players), function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
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
        await db.player.update({
          where: {
            id: dbPlayer.id,
          },
          data: {
            adp: Number(player.adp as string),
          },
        });
      } else {
        console.log(fullName);
      }
    }

    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
