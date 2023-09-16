import { League, LeagueScoringSettings } from "@prisma/client";

export interface LeagueWithScoringSettings extends League {
  scoringSettings?: LeagueScoringSettings;
}
