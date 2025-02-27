import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { Trophy, Star, TrophyIcon } from "lucide-react";


function Page() {

  const leaderboardData = [
    { position: 1, name: "Alice", trophies: 320, league: "Eco Warrior" },
    { position: 2, name: "Bob", trophies: 290, league: "Sustainability Advocate" },
    { position: 3, name: "Charlie", trophies: 275, league: "Sustainability Advocate" },
  ];

  return (
    <main className="min-h-screen flex flex-col items-center gap-10 section-p">
      <h1 className="text-4xl font-bold flex items-center gap-4 text-[#1CB0F6]">
        <TrophyIcon /> Leaderboards
      </h1>
      {/* Leaderboard List */}
      <div className="flex flex-col py-5 rounded-lg gap-6 w-full">
        {/* {leaderboardData.map((user, index) => (
          <div
            key={user.position}
            className={`flex bg-blue-500 text-white items-center gap-5 w-full p-4 rounded-lg shadow-lg transform transition-all duration-300 ${
              index === 0 ? "bg-green-500 text-white scale-105" : ""
            }`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 border-white shadow-lg`}>
              <span className="text-lg font-bold">#{user.position}</span>
            </div>
            <div className="flex flex-col">
              <p className="font-bold">{user.name}</p>
              <p className="text-sm">
                <Trophy className="inline-block w-4 h-4 text-yellow-400 mr-1" /> Trophies: {user.trophies} – League: {user.league}
              </p>
            </div>
            {index === 0 && <Star className="w-6 h-6 text-yellow-400 animate-ping" />}
          </div>
        ))} */}
      </div>
    </main>
  );
}

export default Page;
