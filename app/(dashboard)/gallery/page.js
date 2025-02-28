"use client";
import EmptyList from "../../../public/gifs/EmptyList.gif"
import Image from "next/image";
import { useState, useEffect } from "react";

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const storedImages = JSON.parse(localStorage.getItem("uploadedImages")) || [];
    setImages(storedImages);
  }, []);

  return (
    <div className="section-p flex flex-col gap-10">
      <h1 className="text-4xl font-bold flex items-center gap-4 text-[#1CB0F6]">
        Hightlights Gallery
      </h1>
      {images.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {images.map((imgObj, index) => (
            <div key={index} className="relative">
              <img
                src={imgObj.src}
                alt={`Uploaded ${index}`}
                className="w-full object-cover rounded-md"
              />
              <p className="text-sm text-center mt-1">{imgObj.date}</p>
            </div>
          ))}
        </div>
      ) : (
        <Image width={200} height={200} src={EmptyList} alt="empty list"/>
      )}
    </div>
  );
};

export default Gallery;
