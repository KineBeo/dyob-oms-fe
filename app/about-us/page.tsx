"use client";

import React from "react";
import ReactFullpage from "@fullpage/react-fullpage";
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
  return (
    <ReactFullpage
      navigation={false}
      scrollingSpeed={1000}
      credits={{ enabled: true }}
      sectionsColor={["#fff", "#fff", "#fff", "#fff"]}
      // Thêm các options mới
      touchSensitivity={15} // Giảm độ nhạy của touch
      normalScrollElements="none" // Ngăn scroll bình thường
      scrollOverflow={false} // Tắt scrollOverflow
      bigSectionsDestination="top" // Luôn scroll từ đầu section
      render={() => {
        return (
          <ReactFullpage.Wrapper>
            {images.map((image, index) => (
              <div key={index} className="section overflow-hidden">
                {" "}
                {/* Thêm overflow-hidden */}
                <div className="relative w-full h-screen flex items-center justify-center">
                  <div className="absolute inset-0">
                    {" "}
                    {/* Wrapper div cho Image */}
                    <Image
                      src={image.src}
                      alt={image.alt}
                      layout="fill"
                      objectFit="cover"
                      quality={100}
                      priority={index === 0} // Ưu tiên load ảnh đầu tiên
                      className="select-none" // Ngăn không cho select ảnh
                    />
                  </div>
                  <h2
                    className="absolute text-3xl font-semibold font-robotoslab
                               mobile:text-base mobile:font-normal
                               right-1/4 bottom-1/4 text-white text-left
                               text-wrap w-1/4
                               pointer-events-none" // Thêm pointer-events-none
                  >
                    {image.subcaption}
                  </h2>
                  <h2
                    className="absolute text-3xl font-semibold font-robotoslab
                               mini-laptop:text-2xl mini-laptop:font-medium
                               tablet:text-xl tablet:font-normal
                               mobile:text-base mobile:font-normal
                               left-1/4 top-1/4 text-white text-right
                               text-wrap max-w-xl w-1/4
                               pointer-events-none" // Thêm pointer-events-none
                  >
                    {image.caption}
                  </h2>
                </div>
              </div>
            ))}
          </ReactFullpage.Wrapper>
        );
      }}
    />
  );
}
