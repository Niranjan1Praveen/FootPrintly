import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import LeaderboardImage from "../../../public/leaderboard/badges.svg";

// Simulated CSV data for questions.
const questionsData = [
  {
    QuestionID: 1,
    Theme: "Onboarding Questions",
    QS: "How do you usually commute?",
    Option1: "Walk / Cycle",
    Option2: "Public Transport (Bus/Train/Metro)",
    Option3: "Car (Alone)",
    Option4: "Frequent Flights (Domestic/International)",
    op1score: 10,
    op2score: 8,
    op3score: 3,
    op4score: 1,
  },
];

// Calculate the daily score based on user answers.
function calculateDailyScore(answers) {
  let totalScore = 0;
  answers.forEach(answer => {
    const question = questionsData.find(q => q.QuestionID === answer.questionID);
    if (question) {
      const scoreKey = `op${answer.selectedOption}score`;
      totalScore += question[scoreKey];
    }
  });
  return totalScore;
}

function calculateWeeklyScore(dailyScores) {
  return dailyScores.reduce((sum, score) => sum + score, 0);
}

function determineLeague(weeklyScore) {
  if (weeklyScore <= 20) {
    return { league: "Eco Explorer League (Bronze)", nextLeague: "Green Learner League", pointsToNextLeague: 21 - weeklyScore };
  }
  if (weeklyScore <= 40) {
    return { league: "Green Learner League (Silver)", nextLeague: "Sustainability Advocate League", pointsToNextLeague: 41 - weeklyScore };
  }
  if (weeklyScore <= 60) {
    return { league: "Sustainability Advocate League (Gold)", nextLeague: "Eco Warrior League", pointsToNextLeague: 61 - weeklyScore };
  }
  return { league: "Eco Warrior League (Platinum)", nextLeague: "Max", pointsToNextLeague: 0 };
}

function Page() {
  // Simulated user answers for a week.
  const dailyAnswers = [
    { questionID: 1, selectedOption: 1 },
    { questionID: 1, selectedOption: 2 },
    { questionID: 1, selectedOption: 1 },
    { questionID: 1, selectedOption: 3 },
    { questionID: 1, selectedOption: 1 },
    { questionID: 1, selectedOption: 1 },
    { questionID: 1, selectedOption: 1 },
  ];

  const dailyScores = dailyAnswers.map(answer => calculateDailyScore([answer]));
  const weeklyScore = calculateWeeklyScore(dailyScores);
  const leagueInfo = determineLeague(weeklyScore);

  const userTrophyInfo = {
    currentPoints: weeklyScore,
    league: leagueInfo.league,
    nextLeague: leagueInfo.nextLeague,
    pointsToNextLeague: leagueInfo.pointsToNextLeague,
  };

  const leaderboardData = [
    { position: 1, name: "Alice", trophies: 320, league: "Eco Warrior" },
    { position: 2, name: "Bob", trophies: 290, league: "Sustainability Advocate" },
    { position: 3, name: "Charlie", trophies: 275, league: "Sustainability Advocate" },
  ];

  return (
    <main className="flex flex-col items-center justify-between gap-10 section-p">
      {/* User League Status + Global Arena */}
      <div className="flex flex-col md:flex-row items-center gap-7 w-full">
        {/* User League Panel */}
        <div className="flex flex-col items-center gap-3 p-4 rounded-md shadow-md w-full md:w-1/2">
          <Image src={LeaderboardImage} height={150} width={250} alt="Leaderboard Badge" />
          <h2 className="font-bold text-lg">Your League Status</h2>
          <p className="text-center">
            Current League: <span className="font-semibold">{userTrophyInfo.league}</span>
            <br />
            Trophy Points: <span className="font-semibold">{userTrophyInfo.currentPoints}</span>
            <br />
            {userTrophyInfo.pointsToNextLeague} points to reach{" "}
            <span className="font-semibold">{userTrophyInfo.nextLeague}</span>
          </p>
          <Button className="uppercase font-bold text-[#1CB0F6] rounded-full mt-[12px] px-[16px] py-[12px]">
            Take a Challenge
          </Button>
        </div>

        {/* Global Arena Info Panel */}
        <div className="flex flex-col gap-3 border-2 border-[rgb(55,70,79)] py-[15px] px-[19px] rounded-[6px] max-w-[400px] w-full md:w-1/2">
          <p className="uppercase text-gray-500 text-lg">GLOBAL ARENA</p>
          <h2 className="font-bold">
            Earn trophy points by completing eco-friendly challenges. Climb the
            leagues each week to unlock rewards and exclusive challenges!
          </h2>
        </div>
      </div>

      {/* Leaderboard List */}
      <div className="flex flex-col py-[20px] rounded-[6px] gap-10 w-full">
        {leaderboardData.map((user) => (
          <div
            key={user.position}
            className="flex items-center gap-5 w-full p-3 bg-gray-900 rounded-[6px] shadow-md"
          >
            <div className="w-[50px] h-[50px] rounded-full flex items-center justify-center border-4 border-blue-500 shadow-[0_0_10px_2px_rgba(28,176,246,0.7)]">
              <span className="text-lg font-bold text-blue-500">#{user.position}</span>
            </div>
            <div className="flex flex-col">
              <p className="font-bold">{user.name}</p>
              <p className="text-sm text-gray-500">
                Trophies: {user.trophies} – League: {user.league}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Page;
