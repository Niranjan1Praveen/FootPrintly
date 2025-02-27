"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Rewards from "@/components/rewards";

const Page = () => {
  const [totalScore, setTotalScore] = useState(0);
  const [ecoLevel, setEcoLevel] = useState("");
  const [challenge, setChallenge] = useState("");

  // Fetch stored score and eco level on component mount
  useEffect(() => {
    const storedScore = Number(localStorage.getItem("totalScore")) || 0;
    const storedEcoLevel = localStorage.getItem("ecoLevel") || "Eco Warrior";
    const storedChallenge = localStorage.getItem("challenge") || "Refill Instead of Buying a new bottle";

    setTotalScore(storedScore);
    setEcoLevel(storedEcoLevel);
    setChallenge(storedChallenge);

    // Set rewards based on stored eco level
  }, []);

  // Update profile function (called by EcoTracker)
  const updateProfile = (score, level, challenge) => {
    localStorage.setItem("totalScore", score);
    localStorage.setItem("ecoLevel", level);
    localStorage.setItem("challenge", challenge);

    setTotalScore(score);
    setEcoLevel(level);
    setChallenge(challenge);
    setRewards(rewardsData[level] || []);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-12 section-p">
    </div>
  );
};

export default Page;
