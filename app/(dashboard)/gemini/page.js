"use client";
import React, { useState, useEffect } from "react";
import {
  Droplet,
  FileQuestionIcon,
  Footprints,
  Leaf,
  Mic,
  PlusIcon,
  SendIcon,
  ShoppingCart,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
function Page() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isResLoaded, setIsResLoaded] = useState(false);
  const [totalScore, setTotalScore] = useState(null);
  const questionTemplates = [
    {
      tempQS: `Based on my sustainability score of ${totalScore}, suggest three eco-friendly challenges suitable.`,
      icon: <Footprints className="absolute bottom-2 right-2" />,
      star: true,
    },
    {
      tempQS: "What are some sustainable shopping habits?",
      icon: <ShoppingCart className="absolute bottom-2 right-2" />,
    },
    {
      tempQS: "How can I conserve water efficiently?",
      icon: <Droplet className="absolute bottom-2 right-2" />,
    },
    {
      tempQS: "What are some eco-friendly alternatives to plastic?",
      icon: <Leaf className="absolute bottom-2 right-2" />,
    },
  ];
  // Fetch user score
  useEffect(() => {
    const fetchUserScore = async () => {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) return;

      try {
        const response = await fetch(
          `http://localhost:3001/api/user/${authToken}`
        );
        const data = await response.json();

        if (response.ok) {
          setTotalScore(data.totalScore);
        } else {
          console.error("Error fetching score:", data.error);
        }
      } catch (error) {
        console.error("Error fetching score:", error);
      }
    };

    fetchUserScore();
  }, []);
  // Send prompt
  const sendPrompt = async (selectedPrompt) => {
    const finalPrompt = selectedPrompt || prompt;
    if (!finalPrompt.trim()) return;

    setLoading(true);
    setResponse("");
    setTyping(false);
    setPrompt(finalPrompt);

    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const chatSession = model.startChat({ history: [] });
      const result = await chatSession.sendMessage(finalPrompt);
      const aiResponse = await result.response.text();

      setIsResLoaded(true);
      setLoading(false);
      setTyping(true);
      displayTypingEffect(aiResponse);
    } catch (error) {
      setResponse("❌ Failed to fetch response. Try again.");
      setLoading(false);
    }
  };

  const displayTypingEffect = (text) => {
    let index = 0;
    setResponse(text.charAt(0));

    const interval = setInterval(() => {
      index++;
      setResponse((prev) => prev + text.charAt(index));
      if (index === text.length - 1) {
        clearInterval(interval);
        setTyping(false);
      }
    }, 5);
  };

  const formatResponse = (text) => {
    return text
      .replace(/`/g, "")
      .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
      .replace(/\n/g, "<br>");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendPrompt();
    }
  };

  return (
    <main className="flex flex-col min-h-screen section-p gap-2">
      <div className="flex items-center p-[20px] gap-3">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>User</AvatarFallback>
        </Avatar>
        <p className="text-lg">Gemini</p>
        <small>({new Date().toLocaleDateString()})</small>
      </div>

      <div className="flex flex-col flex-grow overflow-y-auto">
        {!isResLoaded && (
          <p className="text-4xl text-center">How can I help you today?</p>
        )}

        {!isResLoaded && (
          <div className={`grid lg:grid-cols-4 gap-[15px] md:grid-cols-2 py-[75px]`}>
            {questionTemplates.map((question, index) => (
              <div
                key={index}
                className={`${question.star && "bg-yellow-100 animate-shine"} bg-[var(--secondary-background)] p-10 rounded-[5px] relative min-h-[200px] cursor-pointer hover:bg-gray-200`}
                onClick={() => sendPrompt(question.tempQS)}
              >
                <p>{question.tempQS}</p>
                {question.icon}
              </div>
            ))}
          </div>
        )}
        {isResLoaded && (
          <div className="bg-[var(--secondary-background)] rounded-l-full rounded-br-full rounded-tr-[5px] px-4 py-2 self-end w-auto max-w-[75%]">
            {prompt}
          </div>
        )}
        {loading ? (
          <div className="flex flex-col gap-2 py-5">
            <Skeleton className="w-full p-2 rounded-[5px]" />
            <Skeleton className="w-full p-2 rounded-[5px]" />
            <Skeleton className="w-full p-2 rounded-[5px]" />
          </div>
        ) : (
          response && (
            <div className="p-5 max-h-[700px] overflow-y-scroll">
              <p
                className="whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: formatResponse(response) }}
              ></p>
              {typing && <span className="animate-pulse">▍</span>}
            </div>
          )
        )}
      </div>

      <div className="sticky bottom-0 left-0 bg-[var(--secondary-background)] px-4 py-2 flex items-center justify-between rounded-full">
        <PlusIcon className="cursor-pointer ml-2 transition hover:scale-125" />
        <Input
          type="text"
          placeholder="Enter prompt here"
          className="border-none outline-none hover:outline-none shadow-none w-full"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Mic className="cursor-pointer ml-2 transition hover:scale-125" />
        <SendIcon
          onClick={sendPrompt}
          className="cursor-pointer ml-2 transition hover:scale-125"
        />
      </div>

      <small className="text-center">
        Gemini can make mistakes, so double-check it.
      </small>
    </main>
  );
}

export default Page;
