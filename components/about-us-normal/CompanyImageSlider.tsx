"use client";
import { Divider } from "@nextui-org/react";
import React, { useState } from "react";

const images = [
  {
    src: "images/aboutusnormal/company.png",
    alt: "Modern office space with plants and computers",
  },
  {
    src: "images/aboutusnormal/company.png",
    alt: "Meeting room",
  },
  {
    src: "images/aboutusnormal/company.png",
    alt: "Collaborative workspace",
  },
];

export default function CompanyImageSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-4">
      <div className="w-full mobile:mb-4 tablet:mb-4 mb-6 items-center justify-center flex flex-col">
        <p className="mobile:text-3xl tablet:text-3xl text-4xl font-robotoslab font-bold text-center p-2 text-[#4A2511]">
          Hình ảnh công ty
        </p>
        <Divider className="w-24 h-1 bg-[#D7A444]" />
      </div>
      <div className="laptop:px-8 desktop:px-12">
        <div className="relative overflow-hidden rounded-lg shadow-lg">
          {/* Main Image */}
          <div className="relative pb-[56.25%]">
            <img
              src={images[currentSlide].src}
              alt={images[currentSlide].alt}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={() =>
              setCurrentSlide(
                (current) => (current - 1 + images.length) % images.length
              )
            }
            className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full shadow-md transition-all"
            aria-label="Previous image"
          >
            ←
          </button>
          <button
            onClick={() =>
              setCurrentSlide((current) => (current + 1) % images.length)
            }
            className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full shadow-md transition-all"
            aria-label="Next image"
          >
            →
          </button>

          {/* Dots Navigation */}
          <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${currentSlide === index ? "bg-white w-4" : "bg-white/60"
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
