import LeagueForm from "@/components/LeagueForm";
import { Hammer, Medal, Ruler, Scale } from "lucide-react";

export default async function Home() {
  return (
    <main className="md:min-h-screen mb-10 md:mb-0 flex flex-col lg:flex-row">
      <div className="md:h-screen w-full lg:w-1/2 flex flex-col md:justify-center items-center">
        <div className="w-3/4 p-5 flex flex-col justify-center items-center text-center space-y-4">
          <h1 className="text-5xl text-white font-bold">
            Sleeper Keeper Calculator
          </h1>
          <p className="text-xl text-[#b4bcd0] font-light">
            Discover your keeper values and compare against the teams in your
            Sleeper leagues.
          </p>
          <div className="w-full flex flex-col items-center md:flex-row md:items-start space-y-6 md:space-y-0 md:space-x-4">
            <div className="w-full flex-col text-center md:text-left">
              <div className="flex justify-center md:justify-start space-x-1 text-lg md:text-sm text-white font-semibold">
                <div className="flex justify-center items-center">
                  <Scale size={15} />
                </div>
                <p>Evaluate</p>
              </div>
              <p className="text-lg md:text-sm text-[#b4bcd0]">
                Receive your keepers&apos; valuations
              </p>
            </div>
            <div className="w-full flex-col items-center text-center md:text-left">
              <div className="flex justify-center md:justify-start space-x-1 text-lg md:text-sm text-white font-semibold">
                <div className="flex justify-center items-center">
                  <Ruler size={15} />
                </div>
                <p>Compare</p>
              </div>
              <p className="text-lg md:text-sm text-[#b4bcd0]">
                See where you stack up against your league
              </p>
            </div>
            <div className="w-full flex-col text-center md:text-left">
              <div className="flex justify-center md:justify-start space-x-1 text-lg md:text-sm text-white font-semibold">
                <div className="flex justify-center items-center">
                  <Hammer size={15} />
                </div>
                <p>Build</p>
              </div>
              <p className="text-lg md:text-sm text-[#b4bcd0]">
                Optimize your keeper selection based on results
              </p>
            </div>
            <div className="w-full flex-col text-center md:text-left">
              <div className="flex md:justify-start justify-center space-x-1 text-lg md:text-sm text-white font-semibold">
                <div className="flex justify-center items-center">
                  <Medal size={15} />
                </div>
                <p>Win</p>
              </div>
              <p className="text-lg md:text-sm text-[#b4bcd0]">
                Win your league by optimizing your keepers
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:h-screen w-full lg:w-1/2 flex flex-col lg:justify-center items-center">
        <LeagueForm />
      </div>
    </main>
  );
}
