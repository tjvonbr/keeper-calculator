"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Spinner from "./Spinner";

export default function LeagueForm() {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  async function handleSubmit(e: React.FormEvent) {
    setIsLoading(true);
    e.preventDefault();

    const current = new URLSearchParams(Array.from(searchParams.entries()));
    const trimmedUsername = username.trim();

    const leaguesUrl = `https://api.sleeper.app/v1/user/${trimmedUsername}`;
    const response = await fetch(leaguesUrl);
    const user = await response.json();

    if (!user) {
      setIsLoading(false);
      return toast.error(
        "We didn't find any accounts associated with this username"
      );
    }

    current.set("userId", user.user_id);
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`leagues/${query}`);
  }

  return (
    <form className="w-3/4 lg:w-1/2 p-5 flex flex-col items-center space-y-5 rounded-md bg-white shadow-[0_20px_50px_rgba(41,198,255,_0.5)]">
      <div className="flex flex-col space-y-2">
        <h1 className="w-full text-left text-2xl text-black font-bold">
          Find your leagues
        </h1>
        <p className="text-sm text-slate-500">
          Enter your Sleeper username below to evaluate your keepers.{" "}
          <span className="font-semibold">
            Right now, this only works for half-PPR leagues with updates coming
            soon.
          </span>
        </p>
      </div>
      <fieldset className="w-full flex flex-col">
        <label className="text-xs text-black font-bold" htmlFor="userId">
          Sleeper username
        </label>
        <input
          className="h-10 w-full px-3 py-2 border border-slate-300 rounded-md text-black text-sm"
          type="text"
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
        />
      </fieldset>
      <button
        className="h-10 w-full hover:opacity-90 flex items-center justify-center rounded-md text-sm text-white font-medium transition-all bg-[#29c6ff] disabled:cursor-not-allowed"
        disabled={username.length < 1 || isLoading}
        onClick={handleSubmit}
      >
        {isLoading ? <Spinner size={20} /> : "Continue"}
      </button>
    </form>
  );
}
