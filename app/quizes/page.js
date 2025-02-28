"use client";
import React, { useState, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EmptyList from "@/components/emptylist";
import Link from "next/link";
import { CloseFullscreen } from "@mui/icons-material";
export default function Page() {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [isGifActive, setIsGifActive] = useState(false);
  const [selectedScore, setSelectedScore] = useState(null);
  const [totalScore, setTotalScore] = useState(0);
  
  useEffect(() => {
    localStorage.setItem("totalScore", totalScore);    
  }, [totalScore]);

  useEffect(() => {
    fetch("http://localhost:5000/api/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error("Error fetching questions:", err));
  }, []);

  if (questions.length === 0) {
    return (
      <EmptyList/>
    );
  }

  const data = questions[index] || {};

  const handleSelect = (optionIndex, optionText) => {
    const scoreKey = `op${optionIndex}score`;
    const selectedScore = data[scoreKey];

    setSelected(optionIndex);
    setSelectedScore(selectedScore);
  };
  
  const handleNext = () => {
    if (selected !== null && index < questions.length - 1) {
      const scoreKey = `op${selected}score`;
      setTotalScore((prev) => prev + (data[scoreKey] || 0));
      setIsGifActive(true);
      setIndex((prev) => prev + 1);
      setSelected(null);
      setTimeout(() => setIsGifActive(false), 2500);
    }
  };

  const handlePrevious = () => {
    if (index > 0) setIndex((prev) => prev - 1);
  };

  const date = new Date().toLocaleDateString();

  return (
    <section className="flex justify-center flex-col min-h-screen section-p">
      <h1 className="text-1xl font-bold flex items-center gap-4 text-[#1CB0F6] p-2 absolute right-0 top-0">
        {date}
      </h1>
      <Link href={"/home"} className="absolute top-0 left-0 p-5">
        <CloseFullscreen />
      </Link>
      
      <div className="flex gap-2 w-full items-center px-[50px]">
        <ArrowBackIcon
          onClick={handlePrevious}
          className="icon cursor-pointer"
        />
        <div className="relative w-full bg-[rgb(55,70,79)] rounded-full h-[10px]">
          <span
            className="absolute top-0 left-0 h-full bg-[#1ed760] rounded-full transition-all"
            style={{ width: `${((index + 1) / questions.length) * 100}%` }}
          ></span>
        </div>
      </div>

      <div className="rounded-lg p-8 flex flex-col gap-4">
        <div className="flex gap-2 items-center font-medium">
          <p className="py-[12px] px-[16px] rounded-[5px]">
            {data.QS}
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 quiz-options">
          {[data.Option1, data.Option2, data.Option3, data.Option4].map(
            (option, i) => (
              <li
                key={i}
                className={`border-2 border-[rgba(55,70,79,1)] p-[16px] rounded-[6px] text-lg cursor-pointer w-full ${
                  selected === i + 1 ? " bg-[var(--secondary-background)] border" : ""
                }`}
                onClick={() => handleSelect(i + 1)}
              >
                {option}
              </li>
            )
          )}
        </ul>
        <small className="text-center">
          {index + 1} of {questions.length} questions
        </small>

        <hr className="w-full" />

        <div className="flex justify-end">
          {index === questions.length - 1 ? (
            <button
              onClick={handleNext}
              className="my-[20px] uppercase text-sm font-bold flex items-center justify-center px-8 py-4 rounded-full bg-[#1ed760]"
            >
              <Link href={"/home"}>Submit</Link>
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="my-[20px] uppercase text-sm font-bold flex items-center justify-center px-8 py-4 rounded-full bg-[#1ed760]"
            >
              Continue
            </button>
          )}
        </div>
      </div>
    </section>
  );
}