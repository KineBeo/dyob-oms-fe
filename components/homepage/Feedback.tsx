"use client"
import React, { useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardBody } from '@nextui-org/react';

interface VideosProps {
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

const SideVideos: React.FC<VideosProps> = ({ videoId, isActive, onVideoClick }) => {
  return (
    <Card className="h-fit shadow-xl">
      <CardBody className="gap-2">
        <YouTubeEmbed
          videoId={videoId}
          isActive={isActive}
          onVideoClick={onVideoClick}
          title="Small video"
        />
        <p className="mobile:text-base tablet:text-md text-lg font-medium h-full font-robotoflex">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eleifend at ante et sagittis.
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
      <div className="relative w-full pt-[56.25%] cursor-pointer">
        {isActive ? (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={videoUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0 w-full h-full">
            <img
              src={thumbnailUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-black bg-opacity-60 rounded-full flex items-center justify-center">
                <div className="w-0 h-0 border-l-[20px] border-l-white border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const CustomerFeedback: React.FC = () => {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  // Sample video IDs array with type definition
  const videos: string[] = [
    "2YHd-5pIGRg",
    "BNYaSeT2rUE",
    "3TCLy95r8x0",
    "ZDajJraxu9E",
    "LH3d0_2c7bU"
  ];

  const handleVideoClick = (videoId: string): void => {
    setActiveVideoId(videoId === activeVideoId ? null : videoId);
  };

  return (
    <div className="mx-auto px-4 py-8 tablet:max-w-lg mini-laptop:max-w-2xl max-w-4xl desktop:max-w-5xl">
      <h1 className="mobile:text-2xl tablet:text-2xl mini-laptop:text-2xl text-3xl font-bold font-robotoslab text-[#7A0505] text-center mb-2">
        PHẢN HỒI KHÁCH HÀNG
      </h1>
      <div className="w-24 h-1 bg-[#D7A444] mx-auto mb-8"></div>
      <Carousel
        opts={{
          align: "center",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {videos.map((videoId, index) => (
            <CarouselItem
              key={index}
              className="mobile:basis-full tablet:basis-full basis-1/2"
            >
              <SideVideos
                videoId={videoId}
                isActive={activeVideoId === videoId}
                onVideoClick={handleVideoClick}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="mobile:ml-12 tablet:ml-10 ml-8 hover:bg-[#D7A444] hover:text-white active:bg-[#C2943D] active:text-white" />
        <CarouselNext className="mobile:mr-12 tablet:mr-10 ml-8 mr-8 hover:bg-[#D7A444] hover:text-white active:bg-[#C2943D] active:text-white" />
      </Carousel>
    </div>
  );
};

export default CustomerFeedback;