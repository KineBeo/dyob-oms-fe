"use client";
import React, { useState, useCallback, useEffect } from "react";
import { Divider } from "@nextui-org/react";
import useEmblaCarousel from "embla-carousel-react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";


interface Image {
  src: string;
  alt?: string;
}

interface CompanyImageSliderProps {
  images: Image[];
}

export default function CompanyImageSlider({
  images,
}: CompanyImageSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();

    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  if (!images || images.length === 0) {
    return <div>No images available</div>;
  }

  return (
    <div className="w-full max-w-4xl desktop:max-w-5xl mx-auto px-4 py-4">
      <div className="w-full mobile:mb-4 tablet:mb-4 mb-6 items-center justify-center flex flex-col">
        <p className="mobile:text-3xl tablet:text-3xl text-4xl font-robotoslab font-bold text-center p-2 text-[#4A2511]">
          Hình ảnh công ty
        </p>
        <Divider className="w-24 h-1 bg-[#D7A444]" />
      </div>

      <div className="laptop:px-8 desktop:px-12">
        <div className="relative overflow-hidden rounded-lg shadow-lg">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {images.map((image, index) => (
                <div key={index} className="relative flex-[0_0_100%] min-w-0">
                  <div className="relative pb-[56.25%]">
                    <img
                      src={image.src}
                      alt={image.alt || "Company image"}
                      className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full shadow-md transition-all"
            aria-label="Previous image"
          >
            <IoIosArrowBack className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full shadow-md transition-all"
            aria-label="Next image"
          >
            <IoIosArrowForward className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Dots Navigation */}
          <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  selectedIndex === index ? "bg-white w-4" : "bg-white/60"
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
