import WhyChoosingCard from "../cards/WhyChoosingCard";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
export default function WhyChoosing() {
    
  const benefits = [
    {
      image_url: "/images/homepage/whychosing.png",
      title: "DƯỢC LIỆU SẠCH 100%",
    },
    {
      image_url: "/images/homepage/ic-whychoose-1.svg",
      title: "GIÀU KINH NGHIỆM ",
    },
    {
      image_url: "/images/homepage/ic-whychoose-3.svg",
      title: "QUY TRÌNH CHUYÊN NGHIỆP",
    },
    {
      image_url: "/images/homepage/ic-whychoose-4.svg",
      title: "10 NĂM PHÁT TRIỂN",
    },
    {
      image_url: "/images/homepage/ic-whychoose-5.svg",
      title: "GIÁ HỢP LÝ",
    },
  ];
return (
  <div className="w-full">
    <div className="relative">
      {/* Split background */}
      <div className="absolute inset-0">
        <div className="h-3/5 bg-[#3F291B]"></div>
        <div className="h-2/5 bg-white"></div>
      </div>
      <div className="relative z-10 text-center py-6 px-4 justify-items-center  ">
        <h2 className="text-2xl desktop:text-3xl font-bold text-white mb-4 text-center font-robotoslab">
          VÌ SAO NÊN CHỌN ĐÔNG Y ÔNG BỤT
        </h2>
        <div className="w-24 h-1 bg-[#D7A444] mx-auto  mb-8 mobile:mb-4 tablet:mb-4 mini-laptop:mb-6"></div>
        <p className="text-white text-sm  laptop:text-base desktop:text-lg mb-4 max-w-3xl mx-auto font-robotoflex">
          Phát triển nền tảng Đông y Hải Thượng Lãn Ông dựa trên công nghệ khoa
          học hiện đại. Xây dựng một hệ sinh thái toàn diện về Đông y 4.0. Giúp
          người Việt chữa lành thân tâm qua hệ thống &quot;Vườn chữa lành Ông
          Bụt&quot;
        </p>
        <div className="max-w-4xl desktop:max-w-5xl mx-auto">
          {/* Mobile view: horizontal scrollable */}
          <div className=" laptop:hidden desktop:hidden mini-laptop:hidden  grid grid-rows-1 gap-4 pb-2 ">
            <Carousel
              opts={{
                align: "start",
              }}
              className="relative w-full  "
            >
              <CarouselContent>
                {benefits.map((benefit, index) => (
                  <CarouselItem
                    key={index}
                    className="relative basis-1/3 mobile:basis-1/2 tablet:basis-1/2 grid grid-rows-1"
                  >
                    <WhyChoosingCard
                      image_url={benefit.image_url}
                      title={benefit.title}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className=" mobile:hidden tablet:hidden left-0 " />
              <CarouselNext className=" mobile:hidden  tablet:hidden right-0 " />
            </Carousel>
          </div>

          {/* Desktop view: grid */}
          <div className="hidden laptop:grid desktop:grid mini-laptop:grid  mini-laptop:grid-cols-5 desktop:grid-cols-5 laptop:grid-cols-5 gap-4 justify-items-center">
            {benefits.map((benefit, index) => (
              <WhyChoosingCard
                key={index}
                image_url={benefit.image_url}
                title={benefit.title}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);
}
