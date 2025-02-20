"use client";
import { Button } from "@/components/ui/button";
import BoltIcon from "@mui/icons-material/Bolt";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LockIcon from "@mui/icons-material/Lock";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import { Checkbox } from "@/components/ui/checkbox"

import { useState, useEffect } from "react";
import Timer from "@/app/timer";

function Page(props) {
  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start p-6 md:p-12 lg:p-20">
      {/* Column 1 */}
      <div className="flex flex-col gap-4 w-full md:w-2/3">
        <div className="bg-[#1CB0F6] flex flex-col gap-3 text-black rounded-lg p-6">
          <h2 className="font-bold text-lg">Welcome!</h2>
          <p className="text-md">
            Complete challenges to earn rewards! Challenges refresh every day.
          </p>
        </div>

        <div className="flex justify-between py-5">
          <h1 className="font-bold text-lg">Daily Quests</h1>
          <h1 className="font-bold flex items-center gap-2">
            <AccessTimeIcon />
            <Timer />
          </h1>
        </div>

        <div className="flex flex-col gap-3 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-2">
            <BoltIcon />
            <h1 className="text-lg">XP Earned</h1>
          </div>
          <div className="h-3 w-full bg-gray-700 rounded"></div>
        </div>

        <div className="flex gap-3 rounded-lg bg-gray-700 text-white p-6 border border-gray-700">
          <LockIcon />
          <h1>More quests unlock soon</h1>
        </div>
      </div>

      {/* Column 2 */}
      <div className="flex flex-col gap-3 rounded-lg p-6 border-2 border-gray-700 w-full md:w-1/3">
        <h1 className="text-lg font-bold">Monthly Challenges!</h1>
        <div className="flex items-center gap-2">
          <h1>Complete each month's challenges to earn exclusive badges</h1>
          <MilitaryTechIcon />
        </div>
        <ul className="list-disc list-inside">
          <li className="flex gap-2 items-center"> <Checkbox/> Recycling Boost - Collect & recycle 5 items</li>
          <li className="flex gap-2 items-center"> <Checkbox/> Skip the Straw</li>
          <li className="flex gap-2 items-center"> <Checkbox/> Refill Instead of Buying a new bottle</li>
          <li className="flex gap-2 items-center"> <Checkbox/> One Meat-Free Meal</li>
        </ul>
        <Button className="mt-4">Take a quiz</Button>
      </div>
    </div>
  );
}

export default Page;
