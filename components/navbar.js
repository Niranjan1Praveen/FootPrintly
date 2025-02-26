"use client";
import React, { useEffect, useState } from "react";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import Person4Icon from '@mui/icons-material/Person4';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(true);
  const [dates, setDates] = useState([]);
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsNavbarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const today = new Date();
    const options = { weekday: "short", day: "2-digit", month: "short" }; 

    const upcomingDates = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(today.getDate() + i);
      return {
        key: date.toISOString().split("T")[0], 
        formatted: date.toLocaleDateString("en-GB", options), 
      };
    });

    setDates(upcomingDates);
  }, []);

  return (
    <div
      className={`h-screen transition-all duration-300 border-r-2 border-gray-700 flex flex-col items-center
      ${isNavbarOpen ? "w-[250px]" : "w-[75px]"}`}
    >
      {/* Menu Button */}
      <div className="flex justify-between items-center justify-center p-4 gap-4 w-full">
        <h2
          className={`text-[1.6rem] font-bold transition-all duration-300 text-[#1CB0F6] 
          ${isNavbarOpen ? "block" : "hidden"}`}
        >
          FootPrintly
        </h2>
        <MenuIcon
          className="cursor-pointer"
          onClick={() => setIsNavbarOpen(!isNavbarOpen)}
        />
      </div>

      {/* Navigation Items */}
      <ul className="flex flex-col gap-2 flex-grow w-full">
        {/* Profile */}
        <Link href="/profile">
          <li className="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-800 rounded-[6px]">
            <Person4Icon className="icon" />
            <p className={`text-sm uppercase transition-all duration-300 ${isNavbarOpen ? "block" : "hidden"}`}>
              Your Profile
            </p>
          </li>
        </Link>

        {/* LeaderBoards */}
        <Link href="/leaderboard">
          <li className="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-800 rounded-[6px]">
            <LeaderboardIcon className="icon" />
            <p className={`text-sm uppercase transition-all duration-300 ${isNavbarOpen ? "block" : "hidden"}`}>
              LeaderBoards
            </p>
          </li>
        </Link>

        {/* Challenges */}
        <Link href="/challenges">
          <li className="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-800 rounded-[6px]">
            <EmojiEventsIcon className="icon" />
            <p className={`text-sm uppercase transition-all duration-300 ${isNavbarOpen ? "block" : "hidden"}`}>
              Challenges
            </p>
          </li>
        </Link>

        {/* Quizzes */}
        <li className="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-800 rounded-[6px] relative">
          <QuestionAnswerIcon className="icon" />
          <DropdownMenu>
            <DropdownMenuTrigger className={`focus:outline-none ${isNavbarOpen ? "block" : "hidden"}`}>
              Quizzes
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2 m-2 rounded-[6px] absolute top-[-50px] left-[50px] uppercase min-w-[200px]">
              {dates.length > 0 && (
                <>
                  {dates.map(({ key, formatted }) => (
                    <Link key={key} href={`/quiz?date=${key}`} passHref>
                      <DropdownMenuItem className="cursor-pointer hover:underline text-md">
                        {formatted}
                      </DropdownMenuItem>
                    </Link>
                  ))}
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </li>

        {/* FAQs */}
        <Link href="/faqs">
          <li className="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-800 rounded-[6px]">
            <LiveHelpIcon className="icon" />
            <p className={`text-sm uppercase transition-all duration-300 ${isNavbarOpen ? "block" : "hidden"}`}>
              FAQs
            </p>
          </li>
        </Link>
      </ul>
    </div>
  );
}
