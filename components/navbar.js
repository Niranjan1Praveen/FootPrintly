"use client";
import React, { useEffect, useState } from "react";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import Person4Icon from "@mui/icons-material/Person4";
import GradeIcon from "@mui/icons-material/Grade";
import logo from "../public/logo/logo.png";

import Image from "next/image";
import Rewards from "./rewards";
import { PhotoAlbum } from "@mui/icons-material";

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

  return (
    <div
      className={`min-h-screen transition-all duration-300 flex flex-col shadow-md items-center bg-[var(--secondary-background)]
      ${isNavbarOpen ? "w-[220px]" : "w-[55px]"}`}
    >
      {/* Menu Button */}
      <div className="flex justify-between items-center p-4 gap-4 w-full">
        <h2
          className={`text-[1.6rem] font-bold transition-all duration-300 text-[#1CB0F6] 
          ${isNavbarOpen ? "block" : "hidden"}`}
        >
          <Link href={"/"}>
            <Image src={logo} alt="navbar logo" width={40} height={40} />
          </Link>
        </h2>
        <MenuIcon
          className="cursor-pointer"
          onClick={() => setIsNavbarOpen(!isNavbarOpen)}
        />
      </div>
      <ul className="flex flex-col gap-2 flex-grow w-full ">
        <hr className="w-full h-[3px] text-gray-300" />
        {/* Home */}
        <Link href="/home">
          <li className="flex items-center gap-4 p-4 cursor-pointer rounded-[5px]">
            <Person4Icon className="icon" />
            <p
              className={`text-sm uppercase transition-all duration-300 ${
                isNavbarOpen ? "block" : "hidden"
              }`}
            >
              Home
            </p>
          </li>
        </Link>
        <hr className="w-full h-[3px] text-gray-300" />
        {/* LeaderBoards */}
        <Link href="/leaderboard">
          <li className="flex items-center gap-4 p-4 cursor-pointer rounded-[5px]">
            <LeaderboardIcon className="icon" />
            <p
              className={`text-sm uppercase transition-all duration-300 ${
                isNavbarOpen ? "block" : "hidden"
              }`}
            >
              LeaderBoards
            </p>
          </li>
        </Link>
        <hr className="w-full h-[3px] text-gray-300" />
        {/* Quizzes */}
        <Link href={"/quiz"}>
          <li className="flex items-center gap-4 p-4 cursor-pointer rounded-[5px] relative">
            <QuestionAnswerIcon className="icon" />
            <p
              className={`text-sm uppercase transition-all duration-300 ${
                isNavbarOpen ? "block" : "hidden"
              }`}
            >
              Quiz
            </p>
          </li>
        </Link>

        <hr className="w-full h-[3px] text-gray-300" />
        {/* FAQs */}
        <Link href="/faqs">
          <li className="flex items-center gap-4 p-4 cursor-pointer rounded-[5px]">
            <LiveHelpIcon className="icon" />
            <p
              className={`text-sm uppercase transition-all duration-300 ${
                isNavbarOpen ? "block" : "hidden"
              }`}
            >
              FAQs
            </p>
          </li>
        </Link>
        <hr className="w-full h-[3px] text-gray-300" />
        {/* Gallery */}
        <Link href="/gallery">
          <li className="flex items-center gap-4 p-4 cursor-pointer rounded-[5px]">
            <PhotoAlbum className="icon"/>
            <p
              className={`text-sm uppercase transition-all duration-300 ${
                isNavbarOpen ? "block" : "hidden"
              }`}
            >
              Gallery
            </p>
          </li>
        </Link>
        <hr className="w-full h-[3px] text-gray-300" />
        {/* Rewards */}
        <li className="flex items-center gap-4 p-4 cursor-pointer rounded-[5px]">
          <GradeIcon className="icon" />
          <div
            className={`text-sm uppercase transition-all duration-300 ${
              isNavbarOpen ? "block" : "hidden"
            }`}
          >
            <Rewards/>
          </div>
        </li>
        <hr className="w-full h-[3px] text-gray-300" />
      </ul>
    </div>
  );
}
