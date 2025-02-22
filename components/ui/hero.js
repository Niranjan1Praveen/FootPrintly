import React from "react";
import { Button } from "./button";
import Link from "next/link";
import Image from "next/image";
import heroAnimation from "../../public/gifs/heroAnimation.gif";

function Hero(props) {
  return (
    <div className="section-p flex gap-40">
      {/* Hero Content */}
      <div className="flex flex-col justify-between gap-3 max-w-[400px] py-[180px]">
        <h2 className="font-bold text-[2rem] text-white">
          From Small Steps to Big Impacts!
        </h2>
        <Link href={"/signup"}>
          <Button className="bg-[#1ed760] uppercase text-black border-none outline-none hover:!bg-[#1ed760] hover:!border-none hover:!shadow-none hover:!text-black w-full">
            Get Started
          </Button>
        </Link>
        <Link href={"/login"}>
          <Button className="bg-white uppercase text-black border-none outline-none hover:!bg-white hover:!border-none hover:!shadow-none hover:!text-black text-[#1CB0F6] w-full">
            I already have an account
          </Button>
        </Link>
      </div>
      {/* <Image src={heroAnimation} alt="hero gif" className="floatingHero space-x-10px" width={500} height={500}/> */}
    </div>
  );
}

export default Hero;
