import Image from "next/image";
import React from "react";
import { Button } from "./button";

function Leaderboard(props) {
  return (
    <main className="flex flex-col items-center justify-center gap-10 min-h-screen bg-white text-black p-6">
      {/* Leaderboard Banner */}
      <div className="flex flex-col items-center gap-4 bg-[#F5F7FE] p-6 rounded-lg shadow-md max-w-lg w-full text-center border border-gray-300">
        <Image
          src="https://d35aaqx5ub95lt.cloudfront.net/images/leagues/660a07cd535396f03982f24bd0c3844a.svg"
          height={200}
          width={200}
        />
        <h2 className="text-2xl font-bold text-[#1CB0F6]">Unlock Leaderboards!</h2>
        <p className="text-gray-700">Complete 10 more lessons to start competing.</p>
        <Button className="uppercase rounded-full bg-[#1CB0F6] hover:bg-[#1380C3] text-white font-semibold mt-4 px-6 py-3 shadow-lg">
          Start a Lesson
        </Button>
      </div>

      {/* Leaderboard Info */}
      <div className="flex flex-col items-center bg-[#F5F7FE] p-6 rounded-lg shadow-md max-w-lg w-full text-center border border-gray-300">
        <p className="uppercase text-sm text-gray-500 tracking-widest">What Are Leaderboards?</p>
        <h2 className="text-lg font-semibold text-[#1CB0F6]">
          Do lessons. Earn XP. Compete.
        </h2>
        <p className="text-gray-700">
          Earn XP through lessons, then compete with players in a weekly leaderboard.
        </p>
      </div>

      {/* Current Top Players */}
      <div className="bg-[#F5F7FE] p-6 rounded-lg shadow-md max-w-lg w-full border border-gray-300">
        <h2 className="text-xl font-semibold text-[#1CB0F6] text-center mb-4">🏆 Top Players</h2>
        <ul className="space-y-3">
          <li className="flex justify-between bg-white p-3 rounded-lg border border-gray-300">
            <span className="text-[#1CB0F6] font-semibold">#1 Alice</span>
            <span className="text-gray-600">320 Trophies</span>
          </li>
          <li className="flex justify-between bg-white p-3 rounded-lg border border-gray-300">
            <span className="text-[#6A5ACD] font-semibold">#2 Bob</span>
            <span className="text-gray-600">290 Trophies</span>
          </li>
          <li className="flex justify-between bg-white p-3 rounded-lg border border-gray-300">
            <span className="text-[#FF5733] font-semibold">#3 Charlie</span>
            <span className="text-gray-600">275 Trophies</span>
          </li>
        </ul>
      </div>
    </main>
  );
}

export default Leaderboard;
