"use client";
import React, { useState, useEffect } from "react";
import { FileQuestionIcon, SendIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Skeleton } from "@/components/ui/skeleton";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

function Page() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);

  const sendPrompt = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResponse("");
    setTyping(false);

    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const chatSession = model.startChat({ history: [] });
      const result = await chatSession.sendMessage(prompt);
      const aiResponse = await result.response.text();
      setLoading(false);
      setTyping(true);
      displayTypingEffect(aiResponse);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setResponse("❌ Failed to fetch response. Try again.");
      setLoading(false);
    }
  };

  const displayTypingEffect = (text) => {
    let index = 0;
    setResponse(text.charAt(0)); // Initialize with the first character

    const interval = setInterval(() => {
      index++;
      setResponse((prev) => prev + text.charAt(index));
      if (index === text.length - 1) {
        clearInterval(interval);
        setTyping(false);
      }
    }, 10); 
  };

  // Convert markdown-style bold ( **text** ) to actual <b>text</b>
  const formatResponse = (text) => {
    return text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
  };

  return (
    <div className="flex flex-col min-h-screen section-p gap-10">
      <div className="flex items-center p-[20px] gap-3">
        <p className="text-lg">Gemini</p>
        <small>({new Date().toLocaleDateString()})</small>
      </div>

      <div>
        <p className="text-4xl text-center">How can I help you today?</p>

        <div className="grid lg:grid-cols-4 gap-[15px] md:grid-cols-2 py-[75px]">
          {[1, 2, 3, 4].map((index) => (
            <div
              className="bg-[var(--secondary-background)] p-10 rounded-[5px] relative min-h-[200px] cursor-pointer hover:bg-gray-200"
              key={index}
            >
              <p>Suggest how can I be more eco-friendly in my daily life.</p>
              <FileQuestionIcon className="absolute bottom-2 right-2" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between bg-[var(--secondary-background)] rounded-full px-[16px] py-2">
        <Input
          type="text"
          placeholder="Enter prompt here"
          className="border-none outline-none hover:outline-none shadow-none"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <SendIcon onClick={sendPrompt} className="cursor-pointer" />
      </div>

      {loading ? (
        <div className="flex flex-col gap-2">
          <Skeleton className="w-full p-2 rounded-[5px]" />
          <Skeleton className="w-full p-2 rounded-[5px]" />
          <Skeleton className="w-full p-2 rounded-[5px]" />
        </div>
      ) : response && (
        <div className="p-5">
          <p
            className="whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: formatResponse(response) }}
          ></p>
          {typing && <span className="animate-pulse">▍</span>}
        </div>
      )}
    </div>
  );
}

export default Page;
