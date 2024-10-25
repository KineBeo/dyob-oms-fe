"use client";

import React from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import Image from "next/image";
import * as strapi from "../../utils/globalApi";
import useSWR from "swr";
interface ImageAndText {
  First_short_text: String;
  Last_short_text: String;
  Image: {
    url: string;
  } ;
}


export default function AboutUs( ) {
   const { data, isLoading, error } = useSWR("about-us", async () => {
     const response = await strapi.getAboutUs();
     return response.data;
   });

   if (error) return <div>Failed to load</div>;
   if (isLoading) return <div>Loading...</div>;
  // return  <pre>{JSON.stringify(data.slide, null, 2)}</pre>;
   const images : ImageAndText[] = data.slide
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
                    {/* Wrapper div cho Image */}
                    <img
                      src={image.Image.url}
                      alt={image.Image.url}
                      className="w-full h-full object-cover" // Add your desired styles
                    />
                  </div>
                  <h2
                    className=" animate-slideInLeft
                                absolute text-3xl font-semibold font-robotoslab
                                text-wrap max-w-xl w-1/4 pointer-events-none
                                right-1/4 bottom-1/4 text-white text-left
                               mobile:text-lg mobile:font-medium mobile:text-right mobile:right-8
                               tablet:text-xl tablet:font-normal
                               mini-laptop:text-2xl mini-laptop:font-medium
                              
                               " // Thêm pointer-events-none
                  >
                    {image.First_short_text}
                  </h2>
                  <h2
                    className="absolute text-3xl font-semibold font-robotoslab
                               text-wrap max-w-xl w-1/4 pointer-events-none
                               left-1/4 top-1/4 text-white text-right
                               mobile:text-lg mobile:font-medium mobile:text-left mobile:left-8
                               tablet:text-xl tablet:font-normal
                               mini-laptop:text-2xl mini-laptop:font-medium
                              "
                  >
                    {image.Last_short_text}
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

