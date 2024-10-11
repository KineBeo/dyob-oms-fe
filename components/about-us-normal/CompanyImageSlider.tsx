"use client";
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
    <section className="py-6 md:py-12 w-full">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-4 md:mb-8">
          Hình ảnh về công ty
        </h2>

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
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSlide === index ? "bg-white w-4" : "bg-white/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
