"use client"
import React, { useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardBody, Image } from '@nextui-org/react';

interface VideosProps {
  title: string;
  videoId: string;
  isActive: boolean;
  onVideoClick: (videoId: string) => void;
}

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
  className?: string;
  isActive: boolean;
  onVideoClick: (videoId: string) => void;
}

const SideVideos: React.FC<VideosProps> = ({ title, videoId, isActive, onVideoClick }) => {
  return (
    <Card className="shadow-xl h-full">
      <CardBody className="gap-2">
        <YouTubeEmbed
          videoId={videoId}
          isActive={isActive}
          onVideoClick={onVideoClick}
          title="Small video"
        />
        <p className="h-full font-medium font-robotoflex text-lg mobile:text-base tablet:text-md">
          {title}
        </p>
      </CardBody>
    </Card>
  );
};

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({
  videoId,
  title = 'YouTube video player',
  className = '',
  isActive,
  onVideoClick,
}) => {
  // Create the video URL based on active state
  const videoUrl = isActive
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1`
    : `https://www.youtube.com/embed/${videoId}?autoplay=0`;

  // Show thumbnail when video is not active
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div
      className={`w-full ${className}`}
      onClick={() => onVideoClick(videoId)}
    >
      <div className="relative pt-[56.25%] w-full cursor-pointer">
        {isActive ? (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={videoUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <Image
              src={thumbnailUrl}
              alt={title}
              className="static w-full h-full object-cover hover:scale-110"
            />

            <div className="absolute inset-0 flex justify-center items-center">
              <div className="flex justify-center items-center bg-black bg-opacity-60 rounded-full w-16 h-16 hover:bg-red-500 transition-all duration-300">
                <div className="ml-1 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent border-l-[20px] border-l-white w-0 h-0" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
interface CustomerFeedbackProps {
  videos: {
    videoId: string;
    title: string;
  }[];
}

const CustomerFeedback: React.FC<CustomerFeedbackProps> = ({ videos }) => {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const handleVideoClick = (videoId: string): void => {
    setActiveVideoId(videoId === activeVideoId ? null : videoId);
  };

  return (
    <div className="mx-auto px-4 py-8 max-w-4xl tablet:max-w-lg mini-laptop:max-w-2xl desktop:max-w-5xl">
      <h1 className="mb-2 font-bold font-robotoslab text-[#7A0505] text-3xl text-center mobile:text-2xl tablet:text-2xl mini-laptop:text-2xl">
        CẢM NHẬN TỪ ĐẠI CHÚNG
      </h1>
      <div className="bg-[#D7A444] mx-auto mb-8 w-24 h-1"></div>
      <Carousel
        opts={{
          align: "center",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {videos.map((video, index) => (
            <CarouselItem
              key={index}
              className="mobile:basis-full tablet:basis-full my-2 basis-1/2"
            >
              <SideVideos
                title={video.title}
                videoId={video.videoId}
                isActive={activeVideoId === video.videoId}
                onVideoClick={handleVideoClick}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hover:bg-[#D7A444] active:bg-[#C2943D] ml-8 mobile:ml-12 tablet:ml-10 hover:text-white active:text-white" />
        <CarouselNext className="hover:bg-[#D7A444] active:bg-[#C2943D] mr-8 mobile:mr-12 tablet:mr-10 ml-8 hover:text-white active:text-white" />
      </Carousel>
    </div>
  );
};

export default CustomerFeedback;