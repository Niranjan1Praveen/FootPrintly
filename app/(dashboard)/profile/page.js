"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const rewardsData = {
  "Beginner": ["🎁 5% off eco-friendly products", "📘 Access to sustainability tips"],
  "Intermediate": ["🎉 10% discount on sustainable brands", "🌍 Priority access to green events"],
  "Advanced": ["💚 20% off eco-store", "📝 Personalized sustainability plan"],
  "Expert": ["🎁 Free eco-subscription box", "🏆 Certificate of Sustainability"],
};

const Page = () => {
  useEffect(() => {
    const storedScore = Number(localStorage.getItem("totalScore")) || 0;
    setTotalScore(storedScore);
  }, []);

  const [totalScore, setTotalScore] = useState(0);
  const [ecoLevel, setEcoLevel] = useState("Beginner");
  const [challenge, setChallenge] = useState("Refill Instead of Buying a new bottle");
  const [rewards, setRewards] = useState([]);

  const updateProfile = (score, level, challenge) => {
    const storedScore = Number(localStorage.getItem("totalScore"));
    setTotalScore(storedScore);
    setEcoLevel(level);
    setChallenge(challenge);

    if (level && rewardsData[level]) {
      setRewards(rewardsData[level]);
    } else {
      setRewards([]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-12 px-6 sm:p-8 md:p-12 lg:flex-row lg:items-start">
      {/* Sustainability Profile Section */}
      <div className="shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-md sm:max-w-lg lg:max-w-xl text-center border border-gray-700">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-green-400 mb-4 sm:mb-6">
          Your Sustainability Profile
        </h2>

        <div className="mt-4 sm:mt-6 p-4 sm:p-5 bg-green-500/20 border border-green-500 rounded-lg shadow">
          <h3 className="text-md sm:text-lg font-semibold text-green-400">Total Score</h3>
          <p className="text-3xl sm:text-4xl font-bold text-green-300">{totalScore}</p>
        </div>

        <div className="mt-4 sm:mt-6 p-4 sm:p-5 border border-yellow-500 rounded-lg shadow">
          <h3 className="text-md sm:text-lg font-semibold text-yellow-400">Eco Level</h3>
          <p className="text-xl sm:text-2xl font-bold text-yellow-300">{ecoLevel}</p>
        </div>

        <div className="mt-4 sm:mt-6 p-4 sm:p-5 border border-blue-500 rounded-lg shadow">
          <h3 className="text-md sm:text-lg font-semibold text-blue-400">Your Challenge</h3>
          <p className="text-sm sm:text-md font-medium text-blue-300">{challenge}</p>
        </div>

        {/* Rewards Drawer Trigger */}
        <div className="mt-4 sm:mt-6">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline" className="text-purple-400 border-purple-400 hover:bg-purple-500/20">
                🎁 View Your Rewards
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-xs sm:max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>Unlocked Rewards</DrawerTitle>
                  <DrawerDescription>
                    Check the benefits you’ve unlocked based on your sustainability level.
                  </DrawerDescription>
                </DrawerHeader>

                <div className="p-4 pb-0">
                  {rewards.length > 0 ? (
                    <ul className="text-md sm:text-lg text-white space-y-3">
                      {rewards.map((reward, index) => (
                        <li key={index} className="bg-purple-500/20 border border-purple-500 rounded-lg p-3 shadow">
                          {reward}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-400 text-center">🌱 Reach a higher level to unlock rewards!</p>
                  )}
                </div>

                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="outline">Close</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  );
};

export default Page;