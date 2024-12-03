"use client";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardFooter } from "@nextui-org/react";
import { CldImage } from "next-cloudinary";
import Autoplay from "embla-carousel-autoplay"
import Fade from "embla-carousel";
import React, { useState } from "react";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  isMain: boolean;
  width: number;
  height: number;
}

interface OurMembersProps {
  title: string;
  teamMembers: TeamMember[];
}

export default function OurMembers({ title, teamMembers }: OurMembersProps) {
  const mainDoctor = teamMembers.find((member) => member.isMain);
  const otherDoctors = teamMembers.filter((member) => !member.isMain);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);
  
  return (
    <div className="relative">
      {/* Split background */}
      <div className="absolute inset-0">
        <div className="bg-[#3F291B] h-1/2" />
        <div className="bg-white h-1/2" />
      </div>

      <section className="relative z-10 py-12">
        <div className="mx-auto px-4 max-w-4xl tablet:max-w-lg mini-laptop:max-w-2xl desktop:max-w-5xl">
          <h2 className="mb-12 font-bold font-robotoslab text-3xl text-center text-white mobile:text-2xl tablet:text-2xl mini-laptop:text-2xl">
            {title}
            <div className="bg-[#D7A444] mx-auto mt-2 w-24 h-1"></div>
          </h2>

          <div className="mobile:flex tablet:flex mobile:flex-col tablet:flex-col mobile:justify-center mobile:items-center gap-8 grid grid-cols-12">
            {/* Main doctor */}
            <div className="justify-center col-span-5 w-full h-full hover:scale-110 transition">
              <CldImage
                className="w-full h-full object-cover"
                src={mainDoctor?.image || ""}
                alt={mainDoctor?.name || ""}
                width={1200}
                height={1200}
              />
            </div>
            {/* Other doctors */}
            <div className="flex flex-col justify-between gap-0 mobile:gap-4 tablet:gap-8 col-span-7">
              <div className="relative justify-center items-center">
                {/* <p className="font-normal font-robotoflex text-[#D7A444] italic">
                  {mainDoctor?.role}
                </p> */}
                <p className="font-normal font-robotoflex text-white mini-laptop:text-xs mobile:text-black tablet:text-black">
                  {mainDoctor?.role}
                </p>
              </div>
              <div className="mt-8 place-self-end">
                <Carousel
                  plugins={[
                    Autoplay({
                      delay: 2000,
                    }),
                  ]}
                  opts={{
                    align: "start",
                    loop: true,
                    containScroll: false,
                  }}
                  setApi={setApi}
                  className="relative w-full max-w-5xl laptop:max-w-[52rem] mini-laptop:max-w-3xl"
                >
                  <CarouselContent>
                    {otherDoctors.map((doctor, index) => (
                      <CarouselItem
                        key={index}
                        className="relative basis-1/3 mobile:basis-1/2 tablet:basis-1/2"
                      >
                        <Card className="rounded-xl w-full h-full">
                          <CldImage
                            src={doctor.image}
                            alt={doctor.name}
                            width={400}
                            height={300}

                            className="w-full h-[200px] mobile:h-[200px] object-cover"
                          />
                          <CardFooter className="mt-4">
                            {/* Gradient overlay */}
                            {/* <div className="bottom-0 absolute inset-x-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl h-1/3" /> */}
                            <div className="right-0 bottom-0 left-0 absolute py-2">
                              {/* <p className="font-bold font-robotoslab text-base text-black text-center mobile:text-sm tablet:text-sm uppercase">
                                {doctor.role}
                              </p> */}
                              <p className="font-bold font-robotoslab text-base text-black text-center mobile:text-sm tablet:text-sm uppercase">
                                {doctor.name}
                              </p>
                            </div>
                          </CardFooter>
                        </Card>

                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-0 hover:bg-[#D7A444] active:bg-[#C2943D] hover:text-white active:text-white" />
                  <CarouselNext className="right-0 hover:bg-[#D7A444] active:bg-[#C2943D] hover:text-white active:text-white" />
                  
                  {/* Dot Navigator */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                    {otherDoctors.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => api?.scrollTo(index)}
                        className={`
                h-2 w-2 rounded-full transition-all duration-300
                ${current === index
                            ? 'bg-[#D7A444] w-4'
                            : 'bg-gray-400 hover:bg-gray-600'}
              `}
                      />
                    ))}
                  </div>
                  
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
