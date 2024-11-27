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
import { CldImage } from "next-cloudinary";
import { Skeleton } from "@nextui-org/react";
import LoadingImage from "../LoadingImage";
interface ArticlesProps {
  homepageLoaded: boolean;
}
const Articles: React.FC<ArticlesProps> = ({ homepageLoaded }) => {
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

    homepageLoaded ? "articles" : null,
    async () => {
      const response: ArticleResponse = await strapi.getAllArticles();
      return response;
    },

  );
  const router = useRouter();
  if (!homepageLoaded) return null;
  if (error) return <div>Error loading homepage data</div>;
  if (isLoading) return <Loading />;

  return (
    <div className="mx-auto px-4 py-8 max-w-4xl desktop:max-w-5xl">
      <h1 className="mb-4 font-bold font-robotoslab text-[#7A0505] text-3xl text-center mobile:text-2xl tablet:text-2xl mini-laptop:text-2xl">NHỊP SỐNG CÙNG ĐÔNG Y ÔNG BỤT</h1>
      <div className="relative">
        {/* Main Content */}
        <div className="items-top gap-8 grid desktop:grid-cols-12 laptop:grid-cols-12 mini-laptop:grid-cols-12">
          {/* Image Section - 5 columns */}
          <div className="relative desktop:col-span-5 laptop:col-span-5 mini-laptop:col-span-5 w-full h-full">
            <div className="relative aspect-[4/3]">
              <div className="top absolute inset-0 bg-[#f5f5f5] rounded-lg rounded-tl-[9rem] rounded-br-[9rem] overflow-hidden transition-all">
                <LoadingImage
                  src={data?.data[currentSlide]?.image?.url ?? "images/homgepage/boss.png"}
                  alt={data?.data[currentSlide].name ?? "default alt text"}
                  // fill
                  className="object-cover"
                  
                />
                {/* Fade effect overlay */}
                <div className="right-0 bottom-0 left-0 absolute bg-gradient-to-t from-black/30 to-transparent h-1/3" />
              </div>
            </div>
          </div>

          {/* Text Content - 7 columns */}
          <div className="desktop:col-span-7 laptop:col-span-7 mini-laptop:col-span-7">
            <div className="relative flex flex-col items-start aspect-[6/3]">
              <h2 className="mobile:hidden tablet:hidden mb-4 font-bold text-[#7A0505] text-2xl">
                {data?.data[currentSlide].title}
              </h2>
              <div className="flex-1 overflow-y-auto">
                <div className="relative">
                  <FaQuoteLeft className="mb-4 text-[#D7A444] text-xl" />
                  <blockquote className="font-robotoflex text-base text-black mobile:text-sm">
                    {data?.data[currentSlide].quote}
                  </blockquote>
                </div>
              </div>
              <button
                className="mt-4 font-medium text-[#D7A444] hover:text-[#D7A444] transition-colors"
                onClick={() =>
                  router.push(`/articles/${data?.data[currentSlide].seoUrl}`)
                }
              >
                XEM CHI TIẾT
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="top-2/3 mobile:top-1/2 tablet:top-1/2 left-12 absolute hover:border-[#D7A444] hover:border-1 bg-white p-1 rounded-full transition-all -translate-x-12 -translate-y-1/2"
          aria-label="Previous slide"
        >
          <IoIosArrowBack className="w-6 h-6 text-[#7A0505]" />
        </button>
        <button
          onClick={nextSlide}
          className="top-2/3 mobile:top-1/2 tablet:top-1/2 right-12 absolute hover:border-[#D7A444] hover:border-1 bg-white p-1 rounded-full transition-all -translate-y-1/2 translate-x-12"
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
                  className="relative desktop:basis-1/6 laptop:basis-1/6 flex justify-center items-center mobile:basis-1/2 tablet:basis-1/3 mini-laptop:basis-1/6"
                >
                  <button
                    key={testimonial.id}
                    onClick={() => handleThumbnailClick(index)}
                    className={`relative flex-shrink-0 w-32 aspect-square rounded-lg overflow-hidden
                ${currentSlide === index
                        ? "ring-2 ring-[#D7A444]"
                        : "opacity-70 hover:opacity-100"
                      }`}
                  >
                    <LoadingImage
                      src={testimonial.image?.url ?? "images/homepage/boss.png"}
                      alt={`Thumbnail ${index + 1}`}
                      // fill
                      className="object-cover"
                      // sizes="(max-width: 768px) 50vw, 33vw"
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
};
export default Articles;
