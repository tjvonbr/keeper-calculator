"use client";

import { Feature, features } from "@/config/siteConfig";
import { Icon } from "@/components/Icon";

export default function HeroFeatures() {
  return (
    <div className="flex space-x-10">
      {features.map((feature: Feature, idx: number) => {
        return (
          <div key={idx} className="h-[100px] w-[375px] flex space-x-4">
            <div className="h-full relative flex flex-col justify-start">
              <div className="h-[50px] w-[50px] inset-0 absolute flex justify-center items-center rounded-lg bg-blue-500 blur"></div>
              <div className="h-[50px] w-[50px] relative flex justify-center items-center rounded-lg bg-gray-800">
                <Icon name={feature.icon} size={25} color="#60a5fa" />
              </div>
            </div>

            <div className="space-y-2 text-left">
              <p className="text-lg text-white font-bold">{feature.title}</p>
              <p className="text-sm text-slate-300">{feature.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
