import { icons } from "@/config/icons";

export interface IconProps {
  name: string;
  color: string;
  size: number;
}

export function Icon({ name, color, size }: IconProps) {
  const LucideIcon = icons[name];

  return <LucideIcon color={color} size={size} />;
}
