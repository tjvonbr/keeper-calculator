import LeaguesOperations from "@/components/LeaguesOperations";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sleeper Keeper Calculator",
  description: "Sleeper Leagues",
};

export default async function Leagues() {
  const response = await fetch("http://localhost:3000/api/leagues");
  const adp = await response.json();
  console.log(adp);

  return <LeaguesOperations />;
}
