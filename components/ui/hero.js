import React from "react";
import { Button } from "./button";
import Link from "next/link";
import Image from "next/image";

function Hero(props) {
  return (
    <div className="section-p flex gap-40 items-center justify-center">
      {/* Hero Content */}
      <div className="flex flex-col justify-between gap-10 w-[50%] py-[50px] text-center">
        <h1 className="font-bold text-4xl">
          From Small Steps to Big Impacts!
        </h1>
        <p>
          <b>Font Awesome</b> is the Internet's icon library and toolkit, used by millions of designers, developers, and content creators.
        </p>
        <Link href={"/signup"}>
          <Button className="bg-[#1ed760] uppercase text-black border-none outline-none hover:!bg-[#1ed760] hover:!border-none hover:!shadow-none hover:!text-black p-[20px]">
            Get Started
          </Button>
        </Link>

      </div>
      {/* <Image src={heroAnimation} alt="hero gif" className="floatingHero space-x-10px" width={500} height={500}/> */}
    </div>
  );
}

export default Hero;
