"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import beginner from "../../../public/badges/beginner.svg";
import explorer from "../../../public/badges/explorer.svg";
import Challenges from "@/components/challenges";
import { Flame, ArrowBigRight, SmileIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
  const [totalScore, setTotalScore] = useState(0);
  const [ecoLevel, setEcoLevel] = useState("");
  const [challenge, setChallenge] = useState("");
  const [date, setDate] = useState(new Date());
  const [images, setImages] = useState([]);
  useEffect(() => {
    localStorage.clear();
    const storedImages =
      JSON.parse(localStorage.getItem("uploadedImages")) || [];
    setImages(storedImages);
  }, []);

  useEffect(() => {
    const storedScore = Number(localStorage.getItem("totalScore")) || 0;
    const storedEcoLevel = localStorage.getItem("ecoLevel") || "Eco Warrior";
    const storedChallenge =
      localStorage.getItem("challenge") ||
      "Refill Instead of Buying a new bottle";

    setTotalScore(storedScore);
    setEcoLevel(storedEcoLevel);
    setChallenge(storedChallenge);
  }, []);

  const updateProfile = (score, level, challenge) => {
    localStorage.setItem("totalScore", score);
    localStorage.setItem("ecoLevel", level);
    localStorage.setItem("challenge", challenge);

    setTotalScore(score);
    setEcoLevel(level);
    setChallenge(challenge);
    if (storedImage) setProfileImage(storedImage);
  };
  const handleImageUpload = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const newImages = [];
      const currentDate = new Date().toLocaleDateString();

      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const imageObject = { src: reader.result, date: currentDate };
          newImages.push(imageObject);

          const storedImages =
            JSON.parse(localStorage.getItem("uploadedImages")) || [];
          const updatedImages = [...storedImages, ...newImages];

          localStorage.setItem("uploadedImages", JSON.stringify(updatedImages));
          setImages(updatedImages);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  return (
    <div className="flex flex-col gap-12 section-p">
      {/* Profile and Stats */}
      <div className="flex items-start gap-10 justify-between w-full flex-wrap">
        <div className="flex flex-col gap-5 max-w-[500px]">
          <h2 className="text-[#1CB0F6] font-bold text-4xl">
            Welcome Niranjan
          </h2>
          <p>FootPrintly is an app that helps users track their daily habits, calculate their carbon footprint, and improve sustainability through actionable insights and challenges.</p>
        </div>
        {/* Progress */}
        <div className="flex gap-5 items-start bg-[var(--secondary-background)] rounded-[5px]  p-10">
          {/* Streak */}
          <div className="flex items-center flex-col gap-4">
            <small className="uppercase text-[0.7rem]">Streak</small>
            <div className="flex items-center justify-between gap-2 flex-row">
              <Flame className="text-orange-600  fill-yellow-200" />
              <h1 className="text-black">1 Day</h1>
            </div>
          </div>
          {/* League */}
          <div className="flex items-center flex-col gap-5">
            <small className="uppercase text-[0.7rem]">Current Tier</small>
            <Image width={100} height={100} src={beginner} alt="Tier Image 1" />
          </div>
          <div className="flex items-center flex-col gap-5">
            <ArrowBigRight />
          </div>
          <div className="flex items-center flex-col gap-5">
            <small className="uppercase text-[0.7rem]">Next Tier</small>
            <Image width={100} height={100} src={explorer} alt="Tier Image 2" />
          </div>
        </div>
      </div>
      {/* Challenges */}
      <Challenges />
      {/* Hightlight */}
      <div className="flex flex-col gap-5">
        <p className="flex items-center gap-1">
          Post your Hightlight of the Day <SmileIcon />{" "}
        </p>
        <div className="flex justify-between">
          <input
            type="file"
            accept="image/*"
            multiple
            className="p-2 border border-gray-300 rounded-[5px]"
            onChange={handleImageUpload}
            required
          />
          <Link href={"/gallery"}>
            <Button
              type="submit"
              className="bg-[#1ed760] w-auto uppercase border-none outline-none hover:!bg-[#1ed760] hover:!border-none hover:!shadow-none hover:!text-black p-[20px]"
            >
              Post
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
