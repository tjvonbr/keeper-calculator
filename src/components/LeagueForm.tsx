"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Spinner from "./Spinner";

export default function LeagueForm() {
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  async function handleSubmit(e: React.FormEvent) {
    setIsLoading(true);
    e.preventDefault();

    const current = new URLSearchParams(Array.from(searchParams.entries()));
    const id = userId.trim();

    const leaguesUrl = `https://api.sleeper.app/v1/user/${id}/leagues/nfl/2023`;
    const response = await fetch(leaguesUrl);
    const leagues = await response.json();

    setIsLoading(false);

    if (leagues === null || leagues.length === 0) {
      return toast.error(
        "We didn't find any leagues associated with this user ID"
      );
    } else {
      current.set("userId", id);
      const search = current.toString();
      const query = search ? `?${search}` : "";
      router.push(`leagues/${query}`);
    }
  }

  return (
    <form className="w-1/2 p-5 flex flex-col items-center space-y-5 rounded-md bg-white shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]">
      <div className="flex flex-col space-y-2">
        <h1 className="w-full text-left text-2xl font-bold">
          Find your leagues
        </h1>
        <p className="text-sm text-slate-500">
          Enter your Sleeper credentials below to evaluate your keepers.
          Don&apos;t know how to find your Sleeper ID? Watch{" "}
          <Link className="text-[#005f83] hover:underline" href="#">
            this
          </Link>
          .
        </p>
      </div>
      <fieldset className="w-full flex flex-col">
        <label className="text-xs font-bold" htmlFor="userId">
          Sleeper User ID
        </label>
        <input
          className="h-10 w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
          type="text"
          value={userId}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUserId(e.target.value)
          }
        />
      </fieldset>
      <button
        className="h-10 w-full hover:opacity-90 flex items-center justify-center rounded-md text-sm text-white font-medium transition-all bg-[#29c6ff] disabled:cursor-not-allowed"
        disabled={userId.length < 1 || isLoading}
        onClick={handleSubmit}
      >
        {isLoading ? <Spinner size={20} /> : "Continue"}
      </button>
    </form>
  );
}
