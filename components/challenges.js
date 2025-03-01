"use client";
import { BoltIcon, LockIcon, AlarmClock } from "lucide-react";
import React, { useState } from "react";
import Timer from "@/app/timer";

function Challenges(props) {
  const maxPoints = 500;
  const [points, setPoints] = useState(10);
  const progressPercentage = (points / maxPoints) * 100;
  return (
    <div>
      {/* Column 1 - Daily Challenges */}
      <div className="flex flex-col gap-6 w-full">
        <div className="flex justify-between py-5">
          <h1 className="font-bold text-lg">Daily Challenges</h1>
          <h1 className="flex items-center gap-2">
            <AlarmClock />

            <Timer />
          </h1>
        </div>

        <div className="flex flex-col gap-3 p-6 border border-gray-300 rounded-lg">
      <div className="flex items-center gap-2 text-[#1CB0F6]">
        <BoltIcon />
        <h1 className="text-lg font-bold">Points Earned</h1>
      </div>
      <div className="h-4 w-full bg-gray-300 rounded-full relative overflow-hidden">
        <div
          className="h-full bg-[#1CB0F6] rounded-full transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <span className="text-sm">
        {points} / {maxPoints}
      </span>
    </div>
       
        <div className="flex gap-3 rounded-lg bg-gray-200 text-gray-600 p-6 border border-gray-300">
          <LockIcon className="text-gray-500" />
          <h1>More challenges unlock as you progress</h1>
        </div>
      </div>
    </div>
  );
}

export default Challenges;
