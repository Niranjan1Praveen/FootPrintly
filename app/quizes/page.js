"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CloseOutlined } from "@mui/icons-material";
import EmptyList from "@/components/emptylist";
import Link from "next/link";

export default function Page({ params }) {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3001/api/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error("Error fetching questions:", err));
  }, []);

  if (questions.length === 0) {
    return <EmptyList />;
  }

  const data = questions[index] || {};

  const handleSelect = (optionIndex) => {
    setSelected(optionIndex);
  };

  const handleNext = () => {
    if (selected !== null && index < questions.length - 1) {
      setIndex((prev) => prev + 1);
      setSelected(null);
    }
  };

  const handlePrevious = () => {
    if (index > 0) setIndex((prev) => prev - 1);
  };

  return (
    <section className="flex justify-center flex-col min-h-screen section-p bg-[url('https://static.vecteezy.com/system/resources/previews/002/037/924/original/abstract-blue-background-with-beautiful-fluid-shapes-free-vector.jpg')]">
      <h1 className="text-1xl font-bold flex items-center gap-4 text-[#1CB0F6] p-2 absolute right-0 top-0">
        {new Date().toLocaleDateString()}
      </h1>
      <Link href={"/quiz"} className="absolute top-0 left-0 p-5">
        <CloseOutlined />
      </Link>

      {/* Progress Bar */}
      <div className="flex gap-2 w-full items-center px-[50px]">
        <ArrowBackIcon
          onClick={handlePrevious}
          className="icon cursor-pointer"
        />
        <div className="relative w-full bg-[rgb(55,70,79)] rounded-full h-[10px]">
          <motion.span
            initial={{ width: 0 }}
            animate={{ width: `${((index + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.5 }}
            className="absolute top-0 left-0 h-full bg-[#1ed760] rounded-full"
          />
        </div>
      </div>

      {/* Question Section */}
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="rounded-lg p-8 flex flex-col gap-4"
      >
        <div className="flex gap-4 items-center font-medium">
          {/* Question Text */}
          {/* <motion.img
            key={index}
            src="/logo/logo.png"
            alt="Question Image"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
            className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-lg shadow-md"
          /> */}
          <motion.p
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="py-[12px] px-[16px] rounded-[5px]"
          >
            {data.Question}
          </motion.p>
        </div>

        {/* Options */}
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 quiz-options py-10">
          {[data.Option1, data.Option2, data.Option3, data.Option4].map(
            (option, i) => (
              <motion.li
                key={i}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.03 }}
                className={`border-2 border-[rgba(55,70,79,1)] overflow-hidden p-[16px] rounded-[6px] text-lg cursor-pointer w-full transition-all ${
                  selected === i + 1
                    ? "bg-[var(--secondary-background)] border shadow-lg"
                    : ""
                }`}
                onClick={() => handleSelect(i + 1)}
              >
                {option}
              </motion.li>
            )
          )}
        </ul>

        {/* Question Progress */}
        <small className="text-center">
          {index + 1} of {questions.length} questions
        </small>

        <hr className="w-full" />

        {/* Next Button */}
        <div className="flex justify-end">
          {index === questions.length - 1 ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="my-[20px] uppercase text-sm font-bold flex items-center justify-center px-8 py-4 rounded-full bg-[#1ed760]"
            >
              <Link href={"/home"}>Submit 🎉</Link>
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={handleNext}
              className="my-[20px] uppercase text-sm font-bold flex items-center justify-center px-8 py-4 rounded-full bg-[#1ed760]"
            >
              Continue
            </motion.button>
          )}
        </div>
      </motion.div>
    </section>
  );
}
