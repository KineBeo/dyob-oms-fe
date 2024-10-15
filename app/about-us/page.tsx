"use client";

import React, { useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";


const images = [
  {
    src: "/images/about-us-slide/slide1.png",
    alt: "Hands planting seedlings",
    caption: "mong muốn mang đến",
    subcaption: "sự tinh túy...",
  },
  {
    src: "/images/about-us-slide/slide2.png",
    alt: "Wooden bowls with various herbs",
    caption: "với khao khát cống hiến & phụng sự xã hội",
    subcaption: "chữa bệnh cứu người, hành đạo giúp đời...",
  },
  {
    src: "/images/about-us-slide/slide3.png",
    alt: "Wooden bowls with various herbs",
    caption: "là sứ mệnh thiêng liêng cao cả",
    subcaption: "của nhà sáng lập Việt Nam Tỉnh Thức...",
  },
  {
    src: "/images/about-us-slide/slide4.png",
    alt: "Wooden bowls with various herbs",
    caption: "mỗi sản phẩm tạo ra",
    subcaption: "là sự kết tinh giá trị của đạo và đời...",
  },
];

export default function AboutUs() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: "y",
    loop: false,
    dragFree: false,
  });

  const onWheel = useCallback(
    (event: WheelEvent) => {
      if (!emblaApi) return;

      event.preventDefault();

      if (event.deltaY > 0) {
        emblaApi.scrollNext();
      } else if (event.deltaY < 0) {
        emblaApi.scrollPrev();
      }
    },
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.rootNode().addEventListener("wheel", onWheel, { passive: false });

    return () => {
      emblaApi.rootNode().removeEventListener("wheel", onWheel);
    };
  }, [emblaApi, onWheel]);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow overflow-hidden" ref={emblaRef}>
        <style jsx global>{`
          html,
          body {
            overflow: hidden;
          }
        `}</style>
        <div className="h-[calc(100vh-74px)]">
          {images.map((image, index) => (
            <div key={index} className="relative w-full h-full flex-shrink-0">
              <Image
                src={image.src}
                alt={image.alt}
                layout="fill"
                objectFit="cover"
                quality={100}
              />
              <h2
                className=" absolute text-3xl font-semibold font-robotoslab 
                              mobile:text-base  mobile:font-normal
                              right-1/4 top-3/4 text-white text-left
                              text-wrap w-1/4"
              >
                {image.subcaption}
              </h2>
              <h2
                className=" absolute text-3xl font-semibold font-robotoslab
                              mini-laptop:text-2xl mini-laptop:font-medium
                              tablet:text-xl table:font-normal
                               mobile:text-base  mobile:font-normal
                               left-1/4 top-1/4 text-white text-right
                               text-wrap max-w-xl w-1/4"
              >
                {image.caption}
              </h2>
            </div>
          ))}
        </div>
      </div>
      {/* Footer is removed from this page */}
    </div>
  );
}
