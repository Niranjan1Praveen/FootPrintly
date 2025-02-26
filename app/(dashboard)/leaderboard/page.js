import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import LeaderboardImage from "../../../public/leaderboard/badges.svg";
import { Trophy, Star } from "lucide-react";

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
  if (weeklyScore <= 20) return { league: "Eco Explorer League (Bronze)", nextLeague: "Green Learner League", pointsToNextLeague: 21 - weeklyScore };
  if (weeklyScore <= 40) return { league: "Green Learner League (Silver)", nextLeague: "Sustainability Advocate League", pointsToNextLeague: 41 - weeklyScore };
  if (weeklyScore <= 60) return { league: "Sustainability Advocate League (Gold)", nextLeague: "Eco Warrior League", pointsToNextLeague: 61 - weeklyScore };
  return { league: "Eco Warrior League (Platinum)", nextLeague: "Max", pointsToNextLeague: 0 };
}

function Page() {
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
    <main className="h-screen flex flex-col items-center justify-between gap-10 overflow-y-scroll p-6 bg-white">
      {/* User League Status + Global Arena */}
      <div className="flex flex-col md:flex-row items-center gap-7 w-full">
        {/* User League Panel */}
        <div className="flex flex-col items-center gap-3 p-6 rounded-lg bg-gray-100 shadow-lg w-full md:w-1/2 border border-gray-300">
          <Image src={LeaderboardImage} height={150} width={250} alt="Leaderboard Badge" className="animate-pulse" />
          <h2 className="font-extrabold text-lg text-gray-700">Your League Status</h2>
          <p className="text-center text-gray-500">
            Current League: <span className="font-semibold text-blue-500">{userTrophyInfo.league}</span>
            <br />
            Trophy Points: <span className="font-semibold text-green-500">{userTrophyInfo.currentPoints}</span>
            <br />
            {userTrophyInfo.pointsToNextLeague} points to reach{" "}
            <span className="font-semibold text-purple-500">{userTrophyInfo.nextLeague}</span>
          </p>
          <Button className="uppercase font-bold text-white bg-green-500 hover:bg-green-600 rounded-full mt-4 px-6 py-3">
            Take a Challenge
          </Button>
        </div>

        {/* Global Arena Info Panel */}
        <div className="flex flex-col gap-3 border border-gray-300 py-5 px-6 rounded-lg bg-gray-100 max-w-[400px] w-full md:w-1/2 shadow-md">
          <p className="uppercase text-gray-500 text-lg">GLOBAL ARENA</p>
          <h2 className="font-bold text-gray-700">
            Earn trophy points by completing eco-friendly challenges. Climb the leagues each week to unlock rewards and exclusive challenges!
          </h2>
        </div>
      </div>

      {/* Leaderboard List */}
      <div className="flex flex-col py-5 rounded-lg gap-6 w-full">
        {leaderboardData.map((user, index) => (
          <div
            key={user.position}
            className={`flex items-center gap-5 w-full p-4 rounded-lg shadow-lg transform transition-all duration-300 ${
              index === 0 ? "bg-green-500 text-white scale-105" : "bg-blue-500 text-white"
            }`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 border-white shadow-lg`}>
              <span className="text-lg font-bold">#{user.position}</span>
            </div>
            <div className="flex flex-col">
              <p className="font-bold">{user.name}</p>
              <p className="text-sm">
                <Trophy className="inline-block w-4 h-4 text-yellow-400 mr-1" /> Trophies: {user.trophies} – League: {user.league}
              </p>
            </div>
            {index === 0 && <Star className="w-6 h-6 text-yellow-400 animate-ping" />}
          </div>
        ))}
      </div>
    </main>
  );
}

export default Page;
