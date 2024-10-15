"use client";
import { useState } from "react";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
const teamMembers = [
  {
    id: 1,
    name: "NHỮ ĐÌNH TÚ",
    role: "Tổng Giám đốc",
    image: "/images/homepage/boss.png",
    isMain: true,
  },
  {
    id: 2,
    name: "Bác sĩ A",
    role: "Chuyên khoa",
    image: "/images/homepage/doctor.png",
  },
  {
    id: 3,
    name: "Bác sĩ B",
    role: "Chuyên khoa",
    image: "/images/homepage/doctor.png",
  },
  {
    id: 4,
    name: "Bác sĩ D",
    role: "Chuyên khoa",
    image: "/images/homepage/doctor.png",
  },
  {
    id: 4,
    name: "Bác sĩ E",
    role: "Chuyên khoa",
    image: "/images/homepage/doctor.png",
  },
  {
    id: 4,
    name: "Bác sĩ F",
    role: "Chuyên khoa",
    image: "/images/homepage/doctor.png",
  },
];

export default function OurMembers() {
  const mainDoctor = teamMembers.find((member) => member.isMain);
  const otherDoctors = teamMembers.filter((member) => !member.isMain);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <div className="relative">
      {/* Split background */}
      <div className="absolute inset-0">
        <div className="h-1/2 bg-[#3F291B]" />
        <div className="h-1/2 bg-[#FDFAF4]" />
      </div>

      <section className="relative z-10 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            ĐỘI NGŨ ĐÔNG Y ÔNG BỤT
            <div className="w-24 h-1 bg-[#D7A444] mx-auto mt-2"></div>
          </h2>

          <div className="flex flex-row mobile:flex-col tablet:flex-col gap-8">
            {/* Main doctor */}
            <div className=" w-fit flex justify-center items-start mx-4 ">
              <img
                src={mainDoctor?.image}
                alt={mainDoctor?.name}
                width={800}
                height={800}
              />
            </div>
            {/* Other doctors */}
            <div className="grid grid-rows-3 gap-0">
              <div className=" relative justify-center items-center  ">
                <h3 className="text-2xl font-bold text-white mobile:text-[#3F291B] tablet:text-[#3F291B] ">
                  {mainDoctor?.name}
                </h3>
                <p className="text-[#D7A444] italic font-normal">
                  {mainDoctor?.role}
                </p>
              </div>
              <div className=" row-span-2 grid grid-rows-1 gap-4 mt-6 place-self-end ">
                <Carousel
                  opts={{
                    align: "start",
                  }}
                  className="relative w-full mini-laptop:max-w-3xl laptop:max-w-[52rem] max-w-7xl "
                >
                  <CarouselContent>
                    {otherDoctors.map((doctor, index) => (
                      <CarouselItem
                        key={index}
                        className="relative basis-1/3 mobile:basis-1/2 tablet:basis-1/2 grid grid-rows-1"
                      >
                        <img
                          src={doctor.image}
                          alt={doctor.name}
                          className="w-full h-auto"
                        />
                        <div className="absolute bottom-0 left-0 right-0  text-[#3F291B] font-bold text-lg text-center py-2">
                          {doctor.name}
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className=" mobile:hidden tablet:hidden left-0 " />
                  <CarouselNext className=" mobile:hidden  tablet:hidden right-0 " />
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
