"use client";
import { Button } from "@/components/ui/button";
import BoltIcon from "@mui/icons-material/Bolt";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LockIcon from "@mui/icons-material/Lock";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import { Checkbox } from "@/components/ui/checkbox";
import Timer from "@/app/timer";
import FootModel from "@/components/footmodel"

function Page(props) {
  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start p-6 md:p12 lg:p-20">
      {/* Column 1 - Daily Quests */}
      <div className="flex flex-col gap-6 w-full md:w-2/3">
        <div className="bg-[#FFD700] flex flex-col gap-3 text-black rounded-lg p-6 shadow-lg">
          <h2 className="font-extrabold text-xl">Welcome!</h2>
          <p className="text-md">Complete challenges to earn rewards! Challenges refresh every day.</p>
        </div>

        <div className="flex justify-between py-5">
          <h1 className="font-bold text-lg">Daily Quests</h1>
          <h1 className="font-bold flex items-center gap-2">
            <AccessTimeIcon />
            <Timer />
          </h1>
        </div>

        <div className="flex flex-col gap-3 rounded-lg p-6 border border-gray-300 bg-white shadow-lg">
          <div className="flex items-center gap-2 text-[#1CB0F6]">
            <BoltIcon />
            <h1 className="text-lg font-bold">XP Earned</h1>
          </div>
          <div className="h-3 w-full bg-gray-300 rounded relative">
            <div className="absolute left-0 h-3 bg-[#1CB0F6] rounded w-2/5 animate-pulse"></div>
          </div>
          <span className="text-sm text-gray-600">200 XP / 500 XP</span>
        </div>

        <div className="flex gap-3 rounded-lg bg-gray-200 text-gray-600 p-6 border border-gray-300 shadow-md">
          <LockIcon className="text-gray-500" />
          <h1>More quests unlock soon</h1>
        </div>
      </div>

      {/* Column 2 - Monthly Challenges */}
      <div className="flex flex-col gap-3 rounded-lg p-6 border-2 border-gray-300 bg-white shadow-lg w-full md:w-1/3">
        <h1 className="text-lg font-bold text-[#1CB0F6]">Monthly Challenges!</h1>
        <div className="flex items-center gap-2 text-gray-800">
          <h1>Complete each month's challenges to earn exclusive badges</h1>
          <MilitaryTechIcon className="text-[#FFD700]" />
        </div>
        <ul className="space-y-3 mt-3">
          <li className="flex gap-2 items-center text-gray-800">
            <Checkbox className="text-[#1CB0F6]" /> Recycling Boost - Collect & recycle 5 items
          </li>
          <li className="flex gap-2 items-center text-gray-800">
            <Checkbox className="text-[#1CB0F6]" /> Skip the Straw
          </li>
          <li className="flex gap-2 items-center text-gray-800">
            <Checkbox className="text-[#1CB0F6]" /> Refill Instead of Buying a new bottle
          </li>
          <li className="flex gap-2 items-center text-gray-800">
            <Checkbox className="text-[#1CB0F6]" /> One Meat-Free Meal
          </li>
        </ul>
        <Button className="mt-6 bg-[#1CB0F6] hover:bg-[#1380C3] transition-all text-white font-bold py-2 px-4 rounded-lg">
          Take a quiz
        </Button>
      </div>
      
    </div>
  );
}

export default Page;