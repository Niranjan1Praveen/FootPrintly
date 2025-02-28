import { AccessTimeFilled } from "@mui/icons-material";
import { BoltIcon, LockIcon, AlarmClock } from "lucide-react";
import React from "react";
import Timer from "@/app/timer";
function Challenges(props) {
  return (
    <div>
      {/* Column 1 - Daily Quests */}
      <div className="flex flex-col gap-6 w-full">
        <div className="flex justify-between py-5">
          <h1 className="font-bold text-lg">Daily Quests</h1>
          <h1 className="font-bold flex items-center gap-2">
            <Timer/>
            <AlarmClock />
          </h1>
        </div>

        <div className="flex flex-col gap-3 p-6 border border-gray-300">
          <div className="flex items-center gap-2 text-[#1CB0F6]">
            <BoltIcon />
            <h1 className="text-lg font-bold">XP Earned</h1>
          </div>
          <div className="h-3 w-full bg-gray-300 rounded relative">
            <div className="absolute left-0 h-3 bg-[#1CB0F6] rounded w-2/5 animate-pulse"></div>
          </div>
          <span className="text-sm text-gray-600">200 XP / 500 XP</span>
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
