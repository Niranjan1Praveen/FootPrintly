"use client";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
function Hero() {
  const heroStrong = ["Impacts", "Stories", "Changes"];
  const [currentText, setCurrentText] = React.useState(heroStrong[0]);
  const [fade, setFade] = React.useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        const currentIndex = heroStrong.indexOf(currentText);
        const nextIndex = (currentIndex + 1) % heroStrong.length;
        setCurrentText(heroStrong[nextIndex]);
        setFade(true);
      }, 500);
    }, 4000);

    return () => clearInterval(intervalId);
  }, [currentText, heroStrong]);
  return (
    <div className="section-p flex gap-40 items-center justify-center">
      {/* Hero Content */}
      <div className="flex flex-col items-center justify-between gap-10 w-[70%] py-[50px] text-center">
        <h1 className="font-bold text-5xl leading-tight">
          From Small Steps to Big{" "}
          <strong
            className={`font-bold text-[#1CB0F6] fade-up ${
              fade ? "fade-in" : "fade-out"
            }`}
          >
            {currentText}
          </strong>
          !
        </h1>
        <p>
          <b>FootPrintly</b> is an app that helps users track their daily habits, calculate their carbon footprint, and improve sustainability through actionable insights and challenges.
        </p>
        <Button className="bg-[#1ed760] w-auto uppercase border-none outline-none hover:!bg-[#1ed760] hover:!border-none hover:!shadow-none hover:!text-black p-[20px]">
          <Link href={"/signup"}>Get Started</Link>
        </Button>
      </div>
    </div>
  );
}

export default Hero;
