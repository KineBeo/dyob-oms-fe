import { Divider } from "@nextui-org/react";
import OurDestinyCard from "../cards/OurDestinyCard";

export default function ImageAndDes() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-4">
      <div className="w-full mobile:mb-4 tablet:mb-4 mb-6 items-center justify-center flex flex-col">
        <p className="mobile:text-3xl tablet:text-3xl text-4xl font-robotoslab font-bold text-center p-2 text-[#4A2511]">
          Tầm nhìn và sứ mệnh
        </p>
        <Divider className="w-24 h-1 bg-[#D7A444]" />
      </div>

      <div className="laptop:px-8 desktop:px-12 flex justify-center items-center">
        <div className="grid grid-cols-3 mobile:grid-cols-1 tablet:grid-cols-1 mobile:p-4 gap-8 desktop:gap-12">
          <OurDestinyCard />
          <OurDestinyCard />
          <OurDestinyCard />
        </div>
      </div>
      
    </div>
  );
}
