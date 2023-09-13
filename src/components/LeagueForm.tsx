"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
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
    <form className="w-1/2 flex justify-center items-center space-x-2 rounded-md">
      <input
        className="h-10 w-1/2 px-3 py-2 rounded-md text-black text-sm"
        type="text"
        placeholder="Enter your Sleeper username..."
        value={username}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setUsername(e.target.value)
        }
      />
      <button
        className="h-10 w-[150px] bg-blue-400 hover:bg-blue-300 flex items-center justify-center rounded-md text-sm text-[#171717] font-medium transition-colors disabled:cursor-not-allowed"
        disabled={username.length < 1 || isLoading}
        onClick={handleSubmit}
      >
        {isLoading ? <Spinner size={20} /> : "Continue"}
      </button>
    </form>
  );
}
