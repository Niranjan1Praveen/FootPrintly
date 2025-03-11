"use client";
import {
  BoltIcon,
  LockIcon,
  AlarmClock,
  CheckCircle,
  Circle,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import Timer from "@/app/timer";
import SpinWheel from "./spinWheel";

function Challenges(props) {
  const maxPoints = 500;
  const [points, setPoints] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const progressPercentage = (points / maxPoints) * 100;

  // List of challenges
  const dailyChallenges = [
    { id: 1, text: "Complete 5 questions", points: 50 },
    { id: 2, text: "Solve a bonus challenge", points: 100 },
    { id: 3, text: "Log in for 3 consecutive days", points: 75 },
  ];

  // Fetch user score
  useEffect(() => {
    const fetchUserScore = async () => {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) return;

      try {
        const response = await fetch(
          `http://localhost:3001/api/user/${authToken}`
        );
        const data = await response.json();
        console.log(data);
        
        if (response.ok) {
          setPoints(data.userScore ?? 0);
          setCompletedChallenges(data.completedChallenges ?? []);
        } else {
          console.error("Error fetching score:", data.error);
        }
      } catch (error) {
        console.error("Error fetching score:", error);
      }
    };

    fetchUserScore();
  }, []);

  // Handle challenge completion
  const handleChallengeComplete = async (challenge) => {
    if (completedChallenges.includes(challenge.id)) return;

    const newPoints = points + challenge.points;
    setPoints(newPoints);
    setCompletedChallenges([...completedChallenges, challenge.id]);

    // Update backend
    const authToken = localStorage.getItem("authToken");
    if (!authToken) return;

    try {
      await fetch(`http://localhost:3001/api/user/${authToken}/update-score`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          challengeId: challenge.id,
          points: challenge.points,
        }),
      });
    } catch (error) {
      console.error("Error updating score:", error);
    }
  };
  return (
    <div className="flex flex-col gap-4">
      {/* Header Section */}
      <div className="flex justify-between py-5">
        <h1 className="font-bold text-lg">Daily Challenges</h1>
        <h1 className="flex items-center gap-2">
          <AlarmClock />
          <Timer />
        </h1>
      </div>

      {/* Progress Bar */}
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

      {/* Locked Challenges */}
      <div className="flex gap-3 rounded-lg bg-gray-200 text-gray-600 p-6 border border-gray-300">
        <LockIcon className="text-gray-500" />
        <h1>More challenges unlock as you progress</h1>
      </div>
      {/* Challenge List */}
      <div className="flex flex-col gap-3">
        {dailyChallenges.map((challenge) => (
          <div
            key={challenge.id}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => handleChallengeComplete(challenge)}
          >
            {completedChallenges.includes(challenge.id) ? (
              <CheckCircle className="text-green-500" />
            ) : (
              <Circle className="text-gray-500" />
            )}
            <h1
              className={
                completedChallenges.includes(challenge.id)
                  ? "text-gray-500 line-through"
                  : ""
              }
            >
              {challenge.text} (+{challenge.points} pts)
            </h1>
          </div>
        ))}
      </div>

      {/* Bonus Challenge */}
      <SpinWheel/>

    </div>
  );
}

export default Challenges;
