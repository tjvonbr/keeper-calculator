"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

export default function LeagueForm() {
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const current = new URLSearchParams(Array.from(searchParams.entries()));
    const id = userId.trim();

    const leaguesUrl = `https://api.sleeper.app/v1/user/${id}/leagues/nfl/2023`;
    const response = await fetch(leaguesUrl);
    const leagues = await response.json();

    if (leagues === null || leagues.length === 0) {
      return toast.error(
        "We didn't find any leagues associated with this user ID"
      );
    } else {
      toast.success("Good news!  We found some leagues for you.  One moment!");
      current.set("userId", id);
      const search = current.toString();
      const query = search ? `?${search}` : "";
      router.push(`leagues/${query}`);
    }
  }

  return (
    <form className="w-1/4 p-5 flex flex-col items-center space-y-5 rounded-md shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]">
      <div className="flex flex-col space-y-2">
        <h1 className="w-full text-left text-2xl font-bold">Sign in</h1>
        <p className="text-sm text-slate-500">
          Enter your Sleeper credentials below to evaluate your keepers. If you
          don&apos;t know how to find these credentials, watch this video.
        </p>
      </div>
      <fieldset className="w-full flex flex-col">
        <label className="text-xs font-bold" htmlFor="userId">
          Sleeper User ID
        </label>
        <input
          className="h-10 w-full px-3 py-2 border border-slate-200 rounded-md text-sm"
          type="text"
          value={userId}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUserId(e.target.value)
          }
        />
      </fieldset>
      <button
        className="h-10 w-full bg-blue-600 hover:opacity-90 flex items-center justify-center rounded-md text-sm text-white font-medium transition-all"
        onClick={handleSubmit}
      >
        Continue
      </button>
    </form>
  );
}
