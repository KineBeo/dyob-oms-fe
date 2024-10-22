"use client"
import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";

const SideVideos = () => {
  return (
    <Card className="h-fit shadow-xl">
    <CardBody className="gap-2">
        <YouTubeEmbed className="" videoId="2YHd-5pIGRg" title="Small video" />
      <p className="mobile:text-base tablet:text-md text-lg font-medium h-full font-robotoflex">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eleifend at ante et sagittis.</p>
    </CardBody>
  </Card>
  )
}

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
  className?: string;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({
  videoId,
  title = 'YouTube video player',
  className = '',
}) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="relative w-full pt-[56.25%]">
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default function CustomerFeedback() {
  return (
    <div className="mx-auto px-4 py-8 tablet:max-w-lg mini-laptop:max-w-2xl max-w-4xl desktop:max-w-5xl ">
      <h1 className="mobile:text-2xl 
                    tablet:text-2xl
                    mini-laptop:text-2xl text-3xl font-bold font-robotoslab text-[#7A0505] text-center mb-2">
        PHẢN HỒI KHÁCH HÀNG
      </h1>
      <div className="w-24 h-1 bg-[#D7A444] mx-auto mb-8"></div>

      {/* <div className="w-full grid grid-cols-5 mobile:flex-col mobile:flex tablet:flex tablet:flex-col gap-4">
        <div className="col-span-3">
          <Card className="w-full h-full">
            <CardBody className="gap-4">
              <YouTubeEmbed videoId="0seqrj6zvWw" title="Big video" />
              <p className="mobile:text-md text-lg font-medium">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eleifend at ante et sagittis.</p>
            </CardBody>
          </Card>
        </div>

        <div className="w-full grid grid-rows-3 col-span-2 tablet:grid-cols-2 tablet:grid-rows-2 gap-4">
          <SideVideos />
          <SideVideos />
          <SideVideos />
        </div>
      </div> */}

      <Carousel 
        opts={{
          align: "center",
          loop: true,
        }}
        className="w-full">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="mobile:basis-full tablet:basis-full basis-1/2">
              <div className="">
                <SideVideos />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="mobile:ml-12 tablet:ml-10 ml-8 hover:bg-[#D7A444] hover:text-white active:bg-[#C2943D] active:text-white" />
        <CarouselNext className="mobile:mr-12 tablet:mr-10 ml-8 mr-8 hover:bg-[#D7A444] hover:text-white active:bg-[#C2943D] active:text-white" />
      </Carousel>
    </div>
  );
}