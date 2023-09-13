export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export const features: Feature[] = [
  {
    title: "Evaluate",
    description:
      "Evaluate your current keepers values by comparing their pick in the draft with their current average draft position (ADP)",
    icon: "scale",
  },
  {
    title: "Compare",
    description:
      "Compare your current keeper values with the rest of your roster's hypothetical value and choose the players with highest value",
    icon: "ruler",
  },
  {
    title: "Win",
    description:
      "Fill in your roster's weak spots in the draft and sit back and watch your team win you championship after championship",
    icon: "medal",
  },
];
