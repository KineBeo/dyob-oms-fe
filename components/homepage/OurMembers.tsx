"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@nextui-org/react";
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
    <div className="relative ">
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

          <div className="grid grid-cols-12 mobile:flex mobile:flex-col tablet:flex tablet:flex-col mobile:justify-center mobile:items-center gap-8">
            {/* Main doctor */}
            <div className="justify-center w-full h-full col-span-5">
              <CldImage
                src={mainDoctor?.image || ""}
                alt={mainDoctor?.name || ""}
                width={600}
                height={600}
              />
            </div>
            {/* Other doctors */}
            <div className="col-span-7 flex flex-col justify-between gap-0 mobile:gap-4 tablet:gap-8">
              <div className="relative justify-center items-center">
                <h3 className="font-bold font-robotoflex text-white text-xl mobile:text-[#3F291B] tablet:text-[#3F291B]">
                  {mainDoctor?.name}
                </h3>
                <p className="font-normal font-robotoflex text-[#D7A444] italic">
                  {mainDoctor?.role}
                </p>
                <p className="font-normal font-robotoflex text-white mobile:text-black tablet:text-black mini-laptop:text-xs">
                  Nhà khoa học và doanh nhân ở nhiều lĩnh vực, tự nghiên cứu và ứng dụng khoa học công nghệ hiện đại kết hợp đông y Hải Thượng Lãn Ông để tạo ra các sản phẩm chất lượng, hiệu quả.
                </p>
              </div>
              <div className="place-self-end">
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
                        className="relative basis-1/3 mobile:basis-1/2 tablet:basis-1/2"
                      >
                        <Card className="w-full h-full rounded-xl">
                          <CldImage
                            src={doctor.image}
                            alt={doctor.name}
                            width={800}
                            height={600}

                            className="object-fill w-full h-full rounded-xl"
                          />

                          {/* Gradient overlay */}
                          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent rounded-xl" />

                          <div className="right-0 bottom-0 left-0 absolute py-2">
                            <p className="font-bold text-center text-base text-white font-robotoslab uppercase">
                              {doctor.role}
                            </p>
                            <p className="font-bold text-center text-base text-white font-robotoslab uppercase">
                              {doctor.name}
                            </p>
                          </div>
                        </Card>

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
