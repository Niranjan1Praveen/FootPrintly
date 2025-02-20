import Image from "next/image";
import React from "react";
import { Button } from "./button";

function Leaderboard(props) {
  return (
    <main className="flex section-p items-center justify-between gap-10">
      <div className="flex flex-col items-center gap-3">
        <Image
          src="https://d35aaqx5ub95lt.cloudfront.net/images/leagues/660a07cd535396f03982f24bd0c3844a.svg"
          height={300}
          width={300}
        />
        <h2>Unlock Leaderboards!</h2>
        <p>Complete 10 more lessons to start competing</p>
        <Button className="uppercase rounded-full outline-none hover:!bg-[#1ed760] hover:!border-none hover:!shadow-none hover:!text-black mt-[12px] px-[16px] py-[12px]">
          Start a lesson
        </Button>
      </div>
      {/* Leaderboard Info */}
      <div className="flex flex-col gap-3 border-2 border-[rgb(55,70,79)] py-[15px] px-[19px] rounded-[6px] max-w-[400px]">
        <p className="uppercase">WHAT ARE LEADERBOARDS?</p>
        <h2>
          Do lessons. Earn XP. Compete.
          <br />
          Earn XP through lessons, then compete with players in a weekly
          leaderboard
        </h2>
      </div>
    </main>
  );
}

export default Leaderboard;
