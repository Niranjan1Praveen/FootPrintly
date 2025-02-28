import ButtonScene from "@/components/buttonScene";
import React from "react";

function page(props) {
  const date = new Date().toLocaleDateString();
  return (
    <div>
        <div className="section-p absolute">
          <h1 className="text-[#1CB0F6] font-bold text-4xl">Attempt Quiz for {date.toString()}</h1>
        </div>
        <ButtonScene />
    </div>
  );
}

export default page;
