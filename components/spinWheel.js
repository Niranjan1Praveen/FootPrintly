import React, { useState } from "react";
import { motion } from "framer-motion"; // For smooth animations
import { Button } from "./ui/button";
import { FerrisWheelIcon } from "lucide-react";

const challenges = [
  "♻️ Recycle 5 plastic bottles (+10 pts)",
  "🚶 Walk instead of using a vehicle (+10 pts)",
  "🌱 Plant a tree today (+10 pts)",
  "🍃 Go a day without plastic (+10 pts)",
  "🔌 Turn off unused electronics (+10 pts)",
  "🥦 Eat a plant-based meal (+10 pts)",
  "🏞️ Spend 30 mins in nature (+10 pts)",
];

function SpinWheel() {
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [spinning, setSpinning] = useState(false);

  const spinWheel = () => {
    if (spinning) return;
    setSpinning(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * challenges.length);
      setSelectedChallenge(challenges[randomIndex]);
      setSpinning(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center gap-4 py-3">
        <h1 className="font-bold">Spin to get a Bonus Challenge</h1>
      {/* Wheel */}
      <motion.div
        animate={{ rotate: spinning ? 1080 : 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="w-40 h-40 flex items-center rounded-full text-xl font-bold bg-[#1CB0F6] shadow-lg p-4"
      >
        <FerrisWheelIcon className="w-full h-full text-white"/>
      </motion.div>

      {/* Spin Button */}
      <Button
        onClick={spinWheel}
        className="px-4 py-2"
      >
        🎰 Spin
      </Button>

      {/* Result */}
      {selectedChallenge && (
        <div className="text-center">
          <p className="text-xl">{selectedChallenge}</p>
        </div>
      )}
    </div>
  );
}

export default SpinWheel;
