import { Button } from "@/components/ui/button";
import React from "react";
import { Trophy, Star, TrophyIcon } from "lucide-react";

function Leaderboards() {
  const leaderboardData = [
    { position: 1, name: "Alice", trophies: 320, league: "Eco Warrior" },
    {
      position: 2,
      name: "Bob",
      trophies: 290,
      league: "Sustainability Advocate",
    },
    {
      position: 3,
      name: "Charlie",
      trophies: 275,
      league: "Sustainability Advocate",
    },
  ];

  return (
    <main className="flex flex-col">
      <h1 className="font-bold text-lg">
        Leaderboards
      </h1>
      {/* Leaderboard List */}
      <div className="flex flex-col py-5 gap-6 w-full">
        {leaderboardData.map((user, index) => (
          <div
            key={user.position}
            className="flex items-center gap-5 w-full p-4 transform transition-all duration-300 bg-[var(--secondary-background)] rounded-[5px] "
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center border-4 border-white shadow-lg`}
            >
              <span className="text-lg font-bold">#{user.position}</span>
            </div>
            <div className="flex flex-col">
              <p className="font-bold">{user.name}</p>
              <p className="text-sm">
                <Trophy className="inline-block w-4 h-4 text-yellow-400 mr-1" />{" "}
                Trophies: {user.trophies} – League: {user.league}
              </p>
            </div>
            {index === 0 && (
              <Star className="w-6 h-6 text-yellow-400 animate-ping" />
            )}
          </div>
        ))}
      </div>
    </main>
  );
}

export default Leaderboards;
