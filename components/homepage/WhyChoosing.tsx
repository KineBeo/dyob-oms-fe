import WhyChoosingCard from "../cards/WhyChoosingCard";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";


interface WhyChoosingCardProps {
  image_url: string;
  title: string;
}

interface WhyChoosingProps {
  title: string;
  description: string;
  cards: WhyChoosingCardProps[];
}

export default function WhyChoosing({ title, description, cards }: WhyChoosingProps) {

  const fixedTexts = [
    "100+",
    "3068",
    "589",
    "20+",
    "10+",
  ];

  return (
    <div className="w-full">
      <div className="relative">
        {/* Split background */}
        <div className="absolute inset-0">
          <div className="bg-[#3F291B] h-3/5"></div>
          <div className="bg-white h-2/5"></div>
        </div>
        <div className="relative z-10 justify-items-center px-4 py-6 text-center ">
          <h2 className="mb-4 font-bold font-robotoslab text-3xl text-center text-white mobile:text-2xl tablet:text-2xl mini-laptop:text-2xl">
            {title}
          </h2>
          <div className="mini-laptop:mb-6 bg-[#D7A444] mx-auto mb-8 mobile:mb-4 tablet:mb-4 w-24 h-1"></div>
          <p className="mx-auto mb-4 max-w-4xl tablet:max-w-lg mini-laptop:max-w-2xl desktop:max-w-5xl font-robotoflex text-sm text-white desktop:text-lg laptop:text-base">
            {description}
          </p>
          <div className="mx-auto max-w-4xl tablet:max-w-lg mini-laptop:max-w-3xl desktop:max-w-5xl">
            {/* Mobile view: horizontal scrollable */}
            <div className="gap-4 desktop:hidden laptop:hidden mini-laptop:hidden grid grid-rows-1 pb-2">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="relative w-full"
              >
                <CarouselContent>
                  {cards.map((benefit, index) => (
                    <CarouselItem
                      key={index}
                      className="relative mobile:basis-1/2 tablet:basis-1/3 grid"
                    >
                      <WhyChoosingCard
                        image_url={benefit.image_url}
                        title={benefit.title}
                        fixed_text={fixedTexts[index]}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>

            {/* Desktop view: grid */}
            <div className="justify-items-center gap-4 mobile:hidden tablet:hidden grid grid-cols-5">
              {cards.map((benefit, index) => (
                <WhyChoosingCard
                  key={index}
                  image_url={benefit.image_url}
                  title={benefit.title}
                  fixed_text={fixedTexts[index]}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
