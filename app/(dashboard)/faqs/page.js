import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const Page = (props) => {
  return (
    <section className="flex flex-col md:flex-row items-start justify-between gap-10 md:gap-20 section-p">
      {/* FAQ Section */}
      <div className="w-full md:w-1/2">
        <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is FootPrintly?</AccordionTrigger>
            <AccordionContent>
              FootPrintly is an app that helps users track their daily habits, calculate their carbon footprint, and improve sustainability through actionable insights and challenges.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How does FootPrintly calculate my sustainability score?</AccordionTrigger>
            <AccordionContent>
              Your score is based on responses to lifestyle questions covering transportation, diet, energy use, and waste management. Each choice is assigned an impact level to determine your overall score.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is FootPrintly free to use?</AccordionTrigger>
            <AccordionContent>
              Yes, FootPrintly is free to use, with optional premium features for additional insights and challenges.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>How do Eco Challenges work?</AccordionTrigger>
            <AccordionContent>
              Challenges are based on your habits, like reducing plastic use or trying a meat-free diet. Completing them earns you points and badges.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>What rewards can I earn?</AccordionTrigger>
            <AccordionContent>
              You can unlock eco-badges, rank higher on leaderboards, and access exclusive discounts on sustainable products.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger>Can I delete my data?</AccordionTrigger>
            <AccordionContent>
              Yes, you can delete your account and data anytime from the settings.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Contact Us Form */}
      <div className="w-full md:w-1/2">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <form className="flex flex-col gap-4">
          <Input
            type="text"
            name="email"
            placeholder="Your Email"
            className="w-full"
          />
          <Textarea placeholder="Your Message" className="w-full rounded-[6px]" />

          <button
            type="submit"
            className="bg-[#1CB0F6] text-white py-2 rounded-[6px] w-full sm:w-auto"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Page;
