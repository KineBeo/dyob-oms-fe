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
      navigation={false} // Hiển thị các chấm điều hướng ở bên phải màn hình
      scrollingSpeed={700} // Tốc độ cuộn giữa các slide
      credits={{ enabled: true }} // Tắt credits hiển thị dưới cùng
      sectionsColor={["#fff", "#fff", "#fff", "#fff"]}
      
      render={() => {
        return (
          <ReactFullpage.Wrapper>
            {images.map((image, index) => (
              <div key={index} className="section ">
                <div className="relative w-full h-screen flex items-center justify-center">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                  />
                  <h2
                    className="absolute text-3xl font-semibold font-robotoslab
                               mobile:text-base mobile:font-normal
                               right-1/4 bottom-1/4 text-white text-left
                               text-wrap w-1/4"
                  >
                    {image.subcaption}
                  </h2>
                  <h2
                    className="absolute text-3xl font-semibold font-robotoslab
                               mini-laptop:text-2xl mini-laptop:font-medium
                               tablet:text-xl tablet:font-normal
                               mobile:text-base mobile:font-normal
                               left-1/4 top-1/4 text-white text-right
                               text-wrap max-w-xl w-1/4"
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
