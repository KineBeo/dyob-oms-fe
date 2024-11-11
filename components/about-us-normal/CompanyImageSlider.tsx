"use client";
import React, { useState, useCallback, useEffect } from "react";
import { Divider } from "@nextui-org/react";
import useEmblaCarousel from "embla-carousel-react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { CldImage } from "next-cloudinary";


interface Image {
  src: string;
  width: number;
  height: number;
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
    <div className="mx-auto px-4 py-4 w-full max-w-4xl desktop:max-w-5xl">
      <div className="flex flex-col justify-center items-center mb-6 mobile:mb-4 tablet:mb-4 w-full">
        <p className="p-2 font-bold font-robotoslab text-[#4A2511] text-4xl text-center mobile:text-3xl tablet:text-3xl">
          Hình ảnh công ty
        </p>
        <Divider className="bg-[#D7A444] w-24 h-1" />
      </div>

      <div className="desktop:px-12 laptop:px-8">
        <div className="relative shadow-lg rounded-lg overflow-hidden">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {images.map((image, index) => (
                <div key={index} className="relative flex-[0_0_100%] min-w-0">
                  <div className="relative pb-[56.25%]">
                    <CldImage
                      src={image.src}
                      alt={image.alt || "Company image"}
                      width={image.width}
                      height={image.height}
                      className="top-0 left-0 absolute w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="top-1/2 left-2 md:left-4 absolute flex justify-center items-center bg-white/80 hover:bg-white shadow-md rounded-full w-8 md:w-10 h-8 md:h-10 text-gray-800 transform transition-all -translate-y-1/2"
            aria-label="Previous image"
          >
            <IoIosArrowBack className="w-5 md:w-6 h-5 md:h-6" />
          </button>
          <button
            onClick={scrollNext}
            className="top-1/2 right-2 md:right-4 absolute flex justify-center items-center bg-white/80 hover:bg-white shadow-md rounded-full w-8 md:w-10 h-8 md:h-10 text-gray-800 transform transition-all -translate-y-1/2"
            aria-label="Next image"
          >
            <IoIosArrowForward className="w-5 md:w-6 h-5 md:h-6" />
          </button>

          {/* Dots Navigation */}
          <div className="bottom-2 md:bottom-4 left-1/2 absolute flex space-x-2 transform -translate-x-1/2">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all ${selectedIndex === index ? "bg-white w-4" : "bg-white/60"
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
