"use client";

import React from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import * as strapi from "../../utils/globalApi";
import useSWR from "swr";
import Loading from "@/components/Loading";
import { CldImage } from "next-cloudinary";
interface ImageAndText {
  First_short_text: string;
  Last_short_text: string;
  Image: {
    url: string;
    provider_metadata: {
      public_id : string;
    },
  };
}


export default function AboutUs( ) {
   const { data, isLoading, error } = useSWR("about-us", async () => {
     const response = await strapi.getAboutUs();
     return response.data;
   });

   if (error) return <div>Failed to load</div>;
   if (isLoading) return <Loading/>;
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
                    <CldImage
                      src={image.Image.provider_metadata.public_id}
                      alt={image.Image.url}
                      width={window.innerWidth}
                      height={window.innerHeight}
                      loading="eager"
                      className="w-full h-full object-cover" // Add your desired styles
                    />
                  </div>
                  <h2
                    className=" animate-slideInLeft
                                absolute text-3xl font-medium font-inter
                                text-wrap max-w-xl w-1/2 pointer-events-none
                                right-64 bottom-1/4 text-white text-right
                               mobile:text-2xl mobile:text-right mobile:right-8
                               tablet:text-2xl tablet:right-8
                               mini-laptop:text-2xl mini-laptop:right-8
                               laptop:right-8
                               desktop:right-64
                               " // Thêm pointer-events-none
                  >
                    {image.Last_short_text}
                  </h2>
                  <h2
                    className="absolute text-3xl font-medium font-inter
                               text-wrap max-w-xl w-1/2 pointer-events-none
                               left-64 top-1/4 text-white text-left
                               mobile:text-2xl mobile:text-left mobile:left-8
                               tablet:text-2xl tablet:left-8
                               mini-laptop:text-2xl mini-laptop:left-8
                               laptop:left-8
                               
                              "
                  >
                    {image.First_short_text}
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

