import React from "react";
import { FaPlay } from "react-icons/fa";
interface Testimonial {
  id: number;
  thumbnail: string;
  title: string;
}

interface VideoThumbnailProps {
  isMain?: boolean;
  thumbnail: string;
  title: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    thumbnail: "/images/homepage/feedback1.png",
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eleifend at ante et sagittis.",
  },
  {
    id: 2,
    thumbnail: "/images/homepage/feedback1.png",
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eleifend at ante et sagittis.",
  },
  {
    id: 3,
    thumbnail: "/images/homepage/feedback1.png",
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eleifend at ante et sagittis.",
  },
  {
    id: 4,
    thumbnail: "/images/homepage/feedback1.png",
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eleifend at ante et sagittis.",
  },
];

const VideoThumbnail: React.FC<VideoThumbnailProps> = ({
  isMain = false,
  thumbnail,
  title,
}) => (
  <div
    className={`relative ${
      isMain ? "w-full" : "w-[280px]"
    } group cursor-pointer`}
  >
    <img
      src={thumbnail}
      alt={title}
      className={`w-full ${
        isMain ? "h-[460px]" : "h-[157px]"
      } object-cover rounded-lg`}
    />
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:bg-red-700 transition-colors">
        <FaPlay className="w-10 h-10 text-white" />
      </div>
    </div>
  </div>
);

export default function CustomerFeedback() {
  const mainTestimonial = testimonials[0];
  const sideTestimonials = testimonials.slice(1);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-4xl font-bold text-red-800 text-center mb-2">
        PHẢN HỒI KHÁCH HÀNG
      </h1>
      <div className="w-24 h-1 bg-yellow-500 mx-auto mb-8"></div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main video */}
        <div className="lg:w-3/5">
          <VideoThumbnail
            isMain={true}
            thumbnail={mainTestimonial.thumbnail}
            title={mainTestimonial.title}
          />
          <h2 className="mt-4 text-lg font-medium">{mainTestimonial.title}</h2>
        </div>

        {/* Side videos */}
        <div className="lg:w-2/5 space-y-6">
          {sideTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="flex gap-4">
              <VideoThumbnail
                thumbnail={testimonial.thumbnail}
                title={testimonial.title}
              />
              <p className="flex-1 text-sm">{testimonial.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}