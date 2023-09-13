import {
  ActivitySquare,
  BookOpenCheck,
  Briefcase,
  Cloud,
  Hammer,
  Headphones,
  Lock,
  Medal,
  Ruler,
  Scale,
  Target,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export interface Icons {
  [key: string]: LucideIcon;
}

export const icons: Icons = {
  hammer: Hammer,
  medal: Medal,
  ruler: Ruler,
  scale: Scale,
};
