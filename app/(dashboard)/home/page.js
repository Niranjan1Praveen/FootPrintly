"use client";
import Image from "next/image";
import beginner from "../../../public/badges/beginner.svg";
import explorer from "../../../public/badges/explorer.svg";
import Challenges from "@/components/challenges";
import { Flame, ArrowBigRight } from "lucide-react";

import Highlight from "@/components/highlight";
import Leaderboards from "@/components/leaderboards";
import { useState, useEffect } from "react";
import { ScratchCard } from "next-scratchcard";
import ScratchCoupon from "@/components/scratchCoupon";

const Page = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) return;
      try {
        const response = await fetch(
          `http://localhost:3001/api/user/${authToken}`
        );
        const data = await response.json();
        if (response.ok) {
          setUserName(data.username);
        } else {
          console.error("Error fetching username:", data.error);
        }
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };
    fetchUserName();
  }, []);

  return (
    <div className="grid gap-12 section-p">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
        <div className="flex flex-col gap-10">
          {/* Profile and Stats */}
          <div className="flex flex-col gap-5 max-w-[500px]">
            <h2 className="text-[#1CB0F6] font-bold text-4xl">
              Welcome {userName ? userName : "User"}
            </h2>
            <p>
              FootPrintly is an app that helps users track their daily habits,
              calculate their carbon footprint, and improve sustainability
              through actionable insights and challenges.
            </p>
          </div>
          {/* Daily Challenges */}
          <Challenges />
        </div>

        <div className="flex flex-col gap-10">
          {/* Progress */}
          <div className="grid grid-cols-4 items-start bg-[var(--secondary-background)] rounded-[5px] p-10 overflow-x-scroll gap-4">
            {/* Streak */}
            <div className="flex flex-col items-center gap-4">
              <small className="uppercase text-[0.7rem]">Streak</small>
              <div className="flex items-center gap-2">
                <Flame className="text-orange-600 fill-yellow-200" />
                <h1 className="text-black">1 Day</h1>
              </div>
            </div>
            {/* League */}
            <div className="flex flex-col items-center gap-5">
              <small className="uppercase text-[0.7rem]">Current Tier</small>
              <Image
                width={100}
                height={100}
                src={beginner}
                alt="Tier Image 1"
              />
            </div>
            <div className="flex flex-col items-center gap-5">
              <ArrowBigRight />
            </div>
            <div className="flex flex-col items-center gap-5">
              <small className="uppercase text-[0.7rem]">Next Tier</small>
              <Image
                width={100}
                height={100}
                src={explorer}
                alt="Tier Image 2"
                className="grayscale"
              />
            </div>
          </div>
          {/* Leaderboards */}
          <Leaderboards />

          {/* ScratchCoupon */}
          <ScratchCoupon />
          {/* Highlight Section */}
          <Highlight />
        </div>
      </div>
    </div>
  );
};

export default Page;
