"use client"
import { useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
interface Testimonial {
  id: number;
  name: string;
  title: string;
  quote: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Nghệ Sĩ Văn Bầu",
    title: "NGHỆ SĨ LỰA CHỌN ĐÔNG Y ÔNG BỤT",
    quote:
      "Từ ngày dùng thuốc, tình trạng đau nhức vùng thắt lưng, đau mỏi, tê bì chân tay của tôi đã không còn nữa. Việc ăn uống cũng trở nên ngon miệng hơn, đêm ngủ không bị tỉnh giấc giữa chừng, tinh thần tinh táo, minh mẫn hơn. Nhà thuốc rất tâm lý khi hỗ trợ người bệnh đưa sắc và có đặc thuốc thành dạng cao miếng dùng rất tiện lợi, phù hợp với những người bận rộn cần đi chuyển nhiều như tôi.",
    image: "/images/homepage/boss.png",
  },
  {
    id: 2,
    name: "Nghệ Sĩ Văn Bầu",
    title: "NGHỆ SĨ LỰA CHỌN ĐÔNG Y ÔNG BỤT",
    quote:
      "Từ ngày dùng thuốc, tình trạng đau nhức vùng thắt lưng, đau mỏi, tê bì chân tay của tôi đã không còn nữa. Việc ăn uống cũng trở nên ngon miệng hơn, đêm ngủ không bị tỉnh giấc giữa chừng, tinh thần tinh táo, minh mẫn hơn. Nhà thuốc rất tâm lý khi hỗ trợ người bệnh đưa sắc và có đặc thuốc thành dạng cao miếng dùng rất tiện lợi, phù hợp với những người bận rộn cần đi chuyển nhiều như tôi.",
    image: "/images/homepage/doctor.png",
  },
  {
    id: 3,
    name: "Nghệ Sĩ Văn Bầu",
    title: "NGHỆ SĨ LỰA CHỌN ĐÔNG Y ÔNG BỤT",
    quote:
      "Từ ngày dùng thuốc, tình trạng đau nhức vùng thắt lưng, đau mỏi, tê bì chân tay của tôi đã không còn nữa. Việc ăn uống cũng trở nên ngon miệng hơn, đêm ngủ không bị tỉnh giấc giữa chừng, tinh thần tinh táo, minh mẫn hơn. Nhà thuốc rất tâm lý khi hỗ trợ người bệnh đưa sắc và có đặc thuốc thành dạng cao miếng dùng rất tiện lợi, phù hợp với những người bận rộn cần đi chuyển nhiều như tôi.",
    image: "/images/homepage/boss.png",
  },
  // Add more testimonials here
];

export default function Articles(){
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="max-w-5xl desktop:max-w-5xl mx-auto px-4 py-8">
      <div className="relative">
        {/* Main Content */}
        <div className="grid mini-laptop:grid-cols-12 laptop:grid-cols-12 desktop:grid-cols-12 gap-8 items-center">
          <h2 className="hidden mobile:flex tablet:flex text-2xl font-bold text-[#7A0505]">
            {testimonials[currentSlide].title}
          </h2>
          {/* Image Section - 5 columns */}
          <div className=" mini-laptop:col-span-5 laptop:col-span-5 desktop:col-span-5 relative w-full h-full">
            <div className="relative aspect-[4/3]">
              <div className="absolute top inset-0 bg-[#f5f5f5] rounded-lg overflow-hidden">
                <img
                  src={testimonials[currentSlide].image}
                  alt={testimonials[currentSlide].name}
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
              {testimonials[currentSlide].title}
            </h2>
            <div className="relative">
              <FaQuoteLeft className="text-2xl text-[#D7A444] mb-4" />
              <blockquote className="text-black font-robotoflex mobile:text-sm text-base">
                {testimonials[currentSlide].quote}
              </blockquote>
            </div>

            <button className="text-[#D7A444] hover:text-[#D7A444] font-medium transition-colors">
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
            className="relative w-full "
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className="relative flex justify-center items-center mobile:basis-1/2 tablet:basis-1/3 mini-laptop:basis-1/6 laptop:basis-1/6 desktop:basis-1/6 "
                >
                  <button
                    key={testimonial.id}
                    onClick={() => setCurrentSlide(index)}
                    className={`relative flex-shrink-0 w-32 aspect-square rounded-lg overflow-hidden
                ${
                  currentSlide === index
                    ? "ring-2 ring-[#D7A444]"
                    : "opacity-70 hover:opacity-100"
                }`}
                  >
                    <img
                      src={testimonial.image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover "
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