import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Trophy, HelpCircle, Mail, Send } from "lucide-react";

const Page = () => {
  return (
    <section className="flex flex-col md:flex-row items-start justify-between gap-10 md:gap-20 section-p bg-white text-gray-900">
      {/* FAQ Section */}
      <div className="w-full md:w-1/2">
        <h1 className="text-4xl font-extrabold mb-6 flex items-center gap-2 text-gray-800">
          <HelpCircle className="text-[#1CB0F6]" /> Frequently Asked Questions
        </h1>
        <Accordion type="single" collapsible className="w-full">
          {[
            { question: "What is FootPrintly?", answer: "FootPrintly is an app that helps users track their daily habits, calculate their carbon footprint, and improve sustainability through actionable insights and challenges." },
            { question: "How does FootPrintly calculate my sustainability score?", answer: "Your score is based on responses to lifestyle questions covering transportation, diet, energy use, and waste management. Each choice is assigned an impact level to determine your overall score." },
            { question: "Is FootPrintly free to use?", answer: "Yes, FootPrintly is free to use, with optional premium features for additional insights and challenges." },
            { question: "How do Eco Challenges work?", answer: "Challenges are based on your habits, like reducing plastic use or trying a meat-free diet. Completing them earns you points and badges." },
            { question: "What rewards can I earn?", answer: "You can unlock eco-badges, rank higher on leaderboards, and access exclusive discounts on sustainable products." },
            { question: "Can I delete my data?", answer: "Yes, you can delete your account and data anytime from the settings." },
          ].map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-white text-gray-900 p-4 rounded-xl mb-2 border border-gray-300 shadow-md">
              <AccordionTrigger className="text-lg font-semibold text-gray-800">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Contact Us Form */}
      <div className="w-full md:w-1/2 bg-gray-100 p-6 rounded-2xl shadow-md border border-gray-300">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-gray-800">
          <Trophy className="text-[#FFD700]" /> Get in Touch
        </h2>
        <form className="flex flex-col gap-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-500" />
            <Input
              type="text"
              name="email"
              placeholder="Your Email"
              className="w-full pl-10 border-2 border-gray-300 bg-white text-gray-900"
            />
          </div>
          <Textarea
            placeholder="Your Message"
            className="w-full rounded-[6px] border-2 border-gray-300 bg-white text-gray-900"
          />
          <button
            type="submit"
            className="bg-[#1CB0F6] text-white py-2 rounded-[6px] w-full sm:w-auto flex items-center justify-center gap-2 hover:bg-[#1380C3] transition"
          >
            <Send /> Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Page;