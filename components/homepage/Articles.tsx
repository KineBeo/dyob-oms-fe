"use client";
import { useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import useSWR from "swr";
import * as strapi from "@/utils/globalApi";
import Loading from "../Loading";
import { useRouter } from "next/navigation";
import { type CarouselApi } from "../ui/carousel";

export default function Articles() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  const nextSlide = () => {
    setCurrentSlide((prev) => {
      const nextIndex = (prev + 1) % (data?.data?.length || 1);
      // Scroll to the next thumbnail
      api?.scrollTo(nextIndex);
      return nextIndex;
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      const prevIndex =
        (prev - 1 + (data?.data?.length || 1)) % (data?.data?.length || 1);
      // Scroll to the previous thumbnail
      api?.scrollTo(prevIndex);
      return prevIndex;
    });
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentSlide(index);
    api?.scrollTo(index);
  };

  const { data, isLoading, error } = useSWR(
    "articles",
    async () => {
      const response: ArticleResponse = await strapi.getAllArticles();
      return response;
    },
    {
      revalidateOnFocus: false,
    }
  );
  const router = useRouter();
  if (error) return <div>Error loading homepage data</div>;
  if (isLoading) return <Loading />;


  return (
    <div className="max-w-5xl desktop:max-w-5xl mx-auto px-4 py-8">
      <div className="relative">
        {/* Main Content */}
        <div className="grid mini-laptop:grid-cols-12 laptop:grid-cols-12 desktop:grid-cols-12 gap-8 items-top">
          <h2 className="hidden mobile:flex tablet:flex text-2xl font-bold text-[#7A0505]">
            {data?.data[currentSlide]?.title}
          </h2>
          {/* Image Section - 5 columns */}
          <div className=" mini-laptop:col-span-5 laptop:col-span-5 desktop:col-span-5 relative w-full h-full">
            <div className="relative aspect-[4/3]">
              <div className="absolute top inset-0 bg-[#f5f5f5] rounded-lg overflow-hidden">
                <img
                  src={
                    data?.data[currentSlide]?.image?.url ??
                    "images/homgepage/boss.png"
                  }
                  alt={data?.data[currentSlide].name}
                  className="object-cover w-full h-full"
                />
                {/* Fade effect overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </div>
          </div>

          {/* Text Content - 7 columns */}
          <div className="mini-laptop:col-span-7 laptop:col-span-7 desktop:col-span-7 space-y-6">
            <h2 className="mobile:hidden tablet:hidden text-2xl font-bold text-[#7A0505]">
              {data?.data[currentSlide].title}
            </h2>
            <div className="relative">
              <FaQuoteLeft className="text-2xl text-[#D7A444] mb-4" />
              <blockquote className="text-black font-robotoflex mobile:text-sm text-base">
                {data?.data[currentSlide].quote}
              </blockquote>
            </div>

            <button
              className="text-[#D7A444] hover:text-[#D7A444] font-medium transition-colors"
              onClick={() =>
                router.push(`/articles/${data?.data[currentSlide].seoUrl}`)
              }
            >
              XEM CHI TIẾT
            </button>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-12 top-2/3 mobile:top-1/2 tablet:top-1/2
           -translate-y-1/2 -translate-x-12 bg-white p-1 rounded-full 
           hover:border-[#D7A444]  hover:border-1 transition-all"
          aria-label="Previous slide"
        >
          <IoIosArrowBack className="w-6 h-6 text-[#7A0505]" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-12 top-2/3  mobile:top-1/2 tablet:top-1/2 
          -translate-y-1/2 translate-x-12 bg-white p-1 rounded-full
           hover:border-[#D7A444]  hover:border-1 transition-all"
          aria-label="Next slide"
        >
          <IoIosArrowForward className="w-6 h-6 text-[#7A0505]" />
        </button>

        {/* Thumbnail Navigation */}
        <div className="flex gap-2 mt-8 w-full">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            setApi={setApi}
            className="relative w-full"
          >
            <CarouselContent>
              {data?.data.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className="relative flex justify-center items-center mobile:basis-1/2 tablet:basis-1/3 mini-laptop:basis-1/6 laptop:basis-1/6 desktop:basis-1/6"
                >
                  <button
                    key={testimonial.id}
                    onClick={() => handleThumbnailClick(index)}
                    className={`relative flex-shrink-0 w-32 aspect-square rounded-lg overflow-hidden
                ${
                  currentSlide === index
                    ? "ring-2 ring-[#D7A444]"
                    : "opacity-70 hover:opacity-100"
                }`}
                  >
                    <img
                      src={testimonial.image?.url ?? "images/homepage/boss.png"}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {/* Brown overlay for non-active thumbnails */}
                    {currentSlide !== index && (
                      <div className="absolute inset-0 bg-[#4A2822]/20" />
                    )}
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
}
