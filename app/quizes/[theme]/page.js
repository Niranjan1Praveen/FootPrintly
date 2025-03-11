"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CloseOutlined } from "@mui/icons-material";
import EmptyList from "@/components/emptylist";
import Link from "next/link";
import axios from "axios";
import { useParams, useRouter } from "next/navigation"; 

export default function Page() {
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [totalScore, setTotalScore] = useState(0);
  const [previousScore, setPreviousScore] = useState(0);

  const { theme } = useParams();
  
  useEffect(() => {
    if (!theme) return;

    const decodedTheme = decodeURIComponent(theme);
    fetch(`http://localhost:3001/api/questions/${decodedTheme}`)
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error("Error fetching questions:", err));
  }, [theme]);
  

  if (questions.length === 0) {
    return <EmptyList />;
  }

  const data = questions[index] || {};

  const handleSelect = (optionIndex) => setSelected(optionIndex);

  const handleNext = async () => {
    if (selected !== null && index < questions.length) {
      try {
        const selectedScore =
          selected === 1 ? data.op1score :
          selected === 2 ? data.op2score :
          selected === 3 ? data.op3score :
          selected === 4 ? data.op4score :
          0;

        const newTotalScore = totalScore + selectedScore;

        const randomData = {
          UserID: localStorage.getItem("authToken"),
          QuestionID: parseInt(data.QuestionID, 10) || 0,
          Response: selected ? selected.toString() : "Unknown",
          Timestamp: new Date().toISOString(),
          PreviousScore: previousScore, 
          TotalScore: newTotalScore,
          DailyScore: newTotalScore,
          ChallengeCompletionStatus: data.ChallengeCompletionStatus?.toString() || "Incomplete",
        };

        await axios.post("http://127.0.0.1:5000/add_score", randomData, {
          headers: { "Content-Type": "application/json" },
        });

        console.log("Score submitted successfully:", randomData);

        setPreviousScore(selectedScore);
        setTotalScore(newTotalScore);
        setIndex((prev) => prev + 1);
        setSelected(null);
      } catch (error) {
        console.error("Error submitting score:", error);
      }
    }
  };

  const handleSubmit = async () => {
    console.log("Content saved");
    router.push("/home");
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
        <ArrowBackIcon onClick={handlePrevious} className="icon cursor-pointer" />
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
          {[data.Option1, data.Option2, data.Option3, data.Option4].map((option, i) => (
            <motion.li
              key={i}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.03 }}
              className={`border-2 border-[rgba(55,70,79,1)] overflow-hidden p-[16px] rounded-[6px] text-lg cursor-pointer w-full transition-all ${selected === i + 1 ? "bg-[var(--secondary-background)] border shadow-lg" : ""}`}
              onClick={() => handleSelect(i + 1)}
            >
              {option}
            </motion.li>
          ))}
        </ul>

        <small className="text-center">{index + 1} of {questions.length} questions</small>
        <hr className="w-full" />

        <div className="flex justify-end">
          {index === questions.length - 1 ? (
            <motion.button whileHover={{ scale: 1.05 }} onClick={handleSubmit} className="my-[20px] uppercase text-sm font-bold flex items-center justify-center px-8 py-4 rounded-full bg-[#1ed760]">Submit 🎉</motion.button>
          ) : (
            <motion.button whileHover={{ scale: 1.05 }} onClick={handleNext} className="my-[20px] uppercase text-sm font-bold flex items-center justify-center px-8 py-4 rounded-full bg-[#1ed760]">Continue</motion.button>
          )}
        </div>
      </motion.div>
    </section>
  );
}
