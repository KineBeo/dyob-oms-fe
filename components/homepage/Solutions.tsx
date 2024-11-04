"use client";

import { Button } from "@nextui-org/react";
import { CldImage } from "next-cloudinary";

const TreatmentIcon = ({ name, icon, width, height }: { name: string; icon: string, width: number, height: number }) => (
  <div className="flex flex-col items-center">
    <div
      className="flex justify-center items-center hover:border-1 hover:border-[#7A0505] bg-[#D7A444] mb-1 rounded-full w-24 mobile:w-20 tablet:w-22 h-24 mobile:h-20 tablet:h-22"
    >
      <CldImage
        src={icon}
        width={width}
        height={height}
        alt={name}
        className="w-18 mobile:w-16 h-18 mobile:h-16"
      />
    </div>
    <span className="font-medium text-[#3F291B] text-center text-sm">
      {name}
    </span>
  </div>
);

interface TreatmentIconProps {
  id: number;
  name: string;
  icon: string;
  width: number;
  height: number;
}

interface SolutionsProps {
  title: string;
  description: string;
  icons: TreatmentIconProps[];
}

export default function Solutions({ title, description, icons }: SolutionsProps) {
  return (
    <div className="bg-[#FBF6EC]">
      <section className="mx-auto px-4 pt-4 max-w-4xl tablet:max-w-lg mini-laptop:max-w-2xl desktop:max-w-5xl">
        <div className="place-items-start gap-6 mobile:gap-4 grid grid-cols-3 mobile:grid-cols-2 pb-10 w-full h-fit">
          <div className="flex justify-center items-center w-full">
            <button className="bg-[#D7A444] hover:bg-[#40241A] rounded-bl-md rounded-br-md w-full h-12 font-bold font-robotoflex text-white">
              Xem thêm
            </button>
          </div>
          <div className="flex justify-center items-center w-full">
            <button className="bg-[#D7A444] hover:bg-[#40241A] rounded-bl-md rounded-br-md w-full h-12 font-bold font-robotoflex text-white">
              Xem thêm
            </button>
          </div>
          <div className="flex justify-center items-center mobile:col-span-2 w-full">
            <button className="bg-[#D7A444] hover:bg-[#40241A] rounded-bl-md rounded-br-md w-full h-12 font-bold font-robotoflex text-white">
              Xem thêm
            </button>
          </div>
        </div>
        <div className="flex desktop:flex-row laptop:flex-row flex-col gap-8 pb-4">
          {/* Left content */}
          <div className="desktop:w-1/3 laptop:w-1/3">
            <h2 className="mb-4 font-bold font-robotoslab text-[#7A0505] text-3xl text-left mobile:text-2xl tablet:text-2xl mini-laptop:text-2xl">
              {title}
              <div className="bg-[#D7A444] mt-2 w-24 h-1"></div>
            </h2>

            <p className="mb-6 font-robotoflex desktop:text-base laptop:text-base mobile:text-sm tablet:text-sm mini-laptop:text-sm">
              {description}
            </p>
            <Button variant="bordered" className="border-[#D7A444] hover:bg-[#D7A444] bg-none px-6 py-2 border rounded-full font-bold text-[#D7A444] hover:text-white transition-all">
              XEM THÊM
            </Button>
          </div>

          {/* Right content - Icons grid */}
          <div className="desktop:w-3/5 laptop:w-3/5 place-content-center">
            <div className="gap-y-2 mobile:gap-y-6 grid grid-cols-4 mobile:grid-cols-2">
              {icons.map((item) => (
                <TreatmentIcon
                  key={item.id}
                  name={item.name}
                  icon={item.icon}
                  width={item.width}
                  height={item.height}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}