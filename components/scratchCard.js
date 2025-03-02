"use client";
import React, { useState } from "react";
import ScratchCard from "react-scratchcard";

const ScratchCoupon = () => {
  const [revealed, setRevealed] = useState(false);

  const settings = {
    width: 300,
    height: 150,
    image: "/logo/logo.png", // Scratch overlay image
    finishPercent: 50, // Percentage to reveal before considering scratched
    onComplete: () => setRevealed(true), // Callback when fully scratched
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h2 className="text-xl font-bold">Scratch & Win!</h2>

      <ScratchCard {...settings}>
        <div className="flex items-center justify-center bg-yellow-300 h-full text-2xl font-bold">
          {revealed ? "🎉 ₹100 OFF!" : "Scratch Here!"}
        </div>
      </ScratchCard>

      {revealed && <p className="text-green-600 font-bold">Congratulations! 🎊</p>}
    </div>
  );
};

export default ScratchCoupon;
