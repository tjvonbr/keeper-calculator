import { findOrCreateLeagues } from "@/lib/helpers";
import LeaguesOperations from "@/components/LeaguesOperations";

interface UserLeaguesProps {
  params: {
    userId: string;
  };
}

export default async function Leagues({ params }: UserLeaguesProps) {
  const leagues = await findOrCreateLeagues(params.userId);

  return <LeaguesOperations leagues={leagues} />;
}
