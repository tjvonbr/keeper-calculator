import LeaguesOperations from "@/components/LeaguesOperations";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sleeper Keeper Calculator",
  description: "Sleeper Leagues",
};

export default function Leagues() {
  return <LeaguesOperations />;
}
