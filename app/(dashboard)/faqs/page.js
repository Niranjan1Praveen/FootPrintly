import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import data from "@/app/assets/faqs/data";
import { HelpCircle } from "lucide-react";
import ContactForm from "@/components/contactForm";

const Page = () => {
  return (
    <section className="flex flex-col gap-10 section-p min-h-screen">
      <h1 className="text-4xl font-bold flex items-center gap-4 text-[#1CB0F6]">
        <HelpCircle /> Frequently Asked Questions
      </h1>
      <main className="grid gap-20 md:grid-cols-2">
        {/* FAQ Section */}
        <div className="flex flex-col gap-10 max-w-[600px]">
          <Accordion type="single" collapsible>
            {data.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="p-4 rounded-[5px] mb-3 border border-gray-300 shadow-sm"
              >
                <AccordionTrigger className="text-lg">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        {/* Contact Us Form */}
        <ContactForm />
      </main>
    </section>
  );
};

export default Page;
