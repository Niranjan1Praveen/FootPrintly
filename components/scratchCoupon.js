"use client";

import { useState } from "react";
import Confetti from "react-confetti";
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ScratchCard } from "next-scratchcard";

const ScratchCoupon = () => {
  const [confettiActive, setConfettiActive] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
    const [isComplete, setIsComplete] = useState(false);
  const handleScratchComplete = () => {
    setIsComplete(true);
  };
  const copyCode = () => {
    toast("Code has been copied.");
  }

  const vouchersList = [
    { name: "Restaurants", code: "RESTO123", points: 300 },
    { name: "Movie Tickets", code: "MOVIE456", points: 300 },
    { name: "Grocery", code: "GROCERY789", points: 300 },
    { name: "Games", code: "GAME101", points: 300 },
    { name: "Food", code: "FOOD202", points: 300 },
  ];
  return (
    <main className="flex flex-col gap-4 bg-yellow-200 bg-[url(/badges/discount.svg)] bg-center rounded-[5px] min-h-[300px] p-5">
      <h1 className="font-bold text-lg">Redeem codes for your points</h1>

      {confettiActive && (
        <Confetti width={window.innerWidth} height={window.innerHeight} gravity={0.1}/>
      )}

      <div className="flex items-start gap-4 justify-between flex-wrap">
        {vouchersList.map((voucher, index) => (
          <AlertDialog key={index}>
            <AlertDialogTrigger
              className="text-black"
              onClick={() => setSelectedVoucher(voucher)}
            >
              {voucher.name} <small className="text-red-500">(-{voucher.points} pts)</small>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white rounded-[10px]">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-sm text-center">
                  Are you sure you want to redeem?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  <div className="flex flex-col items-center">
                    <h2 className="text-2xl font-bold mb-4">Scratch to Reveal Your Coupon</h2>
                    <ScratchCard
                      width={300}
                      height={170}
                      brushSize={40}
                      percentToFinish={75}
                      onComplete={handleScratchComplete}
                      scratchImage="https://tse2.mm.bing.net/th?id=OIP.JW4_m9cH_KS3mvIXY7kmqwHaF9&pid=Api&P=0&h=180"
                    >
                      <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-green-600">
                        {selectedVoucher ? selectedVoucher.code : "Scratch Me!"}
                      </div>
                    </ScratchCard>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                {isComplete && <AlertDialogAction onClick={copyCode}>Copy</AlertDialogAction>}
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ))}
      </div>
    </main>
  );
};

export default ScratchCoupon;
