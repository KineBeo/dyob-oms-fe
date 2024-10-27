"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CldImage } from "next-cloudinary";

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
  return (
    <div className="relative">
      {/* Split background */}
      <div className="absolute inset-0">
        <div className="bg-[#3F291B] h-1/2" />
        <div className="bg-[#FDFAF4] h-1/2" />
      </div>

      <section className="relative z-10 py-12">
        <div className="mx-auto px-4 max-w-4xl tablet:max-w-lg mini-laptop:max-w-2xl desktop:max-w-5xl">
          <h2 className="mb-12 font-bold font-robotoslab text-3xl text-center text-white mobile:text-2xl tablet:text-2xl mini-laptop:text-2xl">
            {title}
            <div className="bg-[#D7A444] mx-auto mt-2 w-24 h-1"></div>
          </h2>

          <div className="flex flex-row mobile:flex-col tablet:flex-col mobile:justify-center mobile:items-center gap-8">
            {/* Main doctor */}
            <div className="flex justify-center w-fit">
              <CldImage
                src={mainDoctor?.image || ""}
                alt={mainDoctor?.name || ""}
                width={600}
                height={600}
              />
            </div>
            {/* Other doctors */}
            <div className="gap-0 grid grid-rows-3 mobile:grid-rows-5 tablet:grid-rows-6">
              <div className="relative justify-center items-center">
                <h3 className="font-bold font-robotoflex text-white text-xl mobile:text-[#3F291B] tablet:text-[#3F291B]">
                  {mainDoctor?.name}
                </h3>
                <p className="font-normal font-robotoflex text-[#D7A444] italic">
                  {mainDoctor?.role}
                </p>
              </div>
              <div className="gap-4 grid grid-rows-1 row-span-2 mobile:row-span-4 tablet:row-span-5 place-self-end">
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  className="relative w-full max-w-5xl laptop:max-w-[52rem] mini-laptop:max-w-3xl"
                >
                  <CarouselContent>
                    {otherDoctors.map((doctor, index) => (
                      <CarouselItem
                        key={index}
                        className="relative basis-1/3 mobile:basis-1/2 tablet:basis-1/2 grid grid-rows-1"
                      >
                        <CldImage
                          src={doctor.image}
                          alt={doctor.name}
                          width={600}
                          height={800}

                          className=""
                        />
                        <div className="right-0 bottom-0 left-0 absolute py-2 font-bold text-center text-lg text-white">
                          {doctor.name}
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-0 hover:bg-[#D7A444] active:bg-[#C2943D] hover:text-white active:text-white" />
                  <CarouselNext className="right-0 hover:bg-[#D7A444] active:bg-[#C2943D] hover:text-white active:text-white" />
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
