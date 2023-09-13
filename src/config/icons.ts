import { Hammer, Medal, Ruler, Scale, type LucideIcon } from "lucide-react";

export interface Icons {
  [key: string]: LucideIcon;
}

export const icons: Icons = {
  hammer: Hammer,
  medal: Medal,
  ruler: Ruler,
  scale: Scale,
};
