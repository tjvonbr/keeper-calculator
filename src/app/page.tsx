import HeroFeatures from "@/components/HeroFeatures";
import LeagueForm from "@/components/LeagueForm";

export default async function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center text-center space-y-8">
        <div className="flex flex-col items-center space-y-2">
          <h1 className="text-5xl text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-100 font-extrabold">
            Sleeper Keeper Calculator
          </h1>
          <p className="w-3/5 text-lg text-slate-300">
            Discover your keeper values and compare against the teams in your
            Sleeper fantasy football leagues
          </p>
        </div>
        <HeroFeatures />
        <div className="flex flex-col items-center">
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-400 font-bold">
            Get started
          </p>
          <p className="w-3/4 text-center text-sm text-slate-300">
            Enter your Sleeper username below and we&apos;ll get started
            evaluating your keepers!
          </p>
        </div>
        <LeagueForm />
      </div>
    </main>
  );
}
