import { Divider } from "@nextui-org/react";
import Image from "next/image";

interface ImageAndDesProps {
  introTitle: string;
  introDescript: string;
}

export default function ImageAndDes(props: ImageAndDesProps) {
  return (
    <div className="mx-auto px-4 pt-12 pb-4 w-full max-w-4xl tablet:max-w-lg mini-laptop:max-w-2xl desktop:max-w-5xl">
      <div className="flex flex-col justify-center items-center mb-6 mobile:mb-4 tablet:mb-4 w-full">
        <p className="p-2 font-bold font-robotoslab text-[#4A2511] text-4xl text-center mobile:text-3xl tablet:text-3xl">
          {props.introTitle}
        </p>
        <Divider className="bg-[#D7A444] w-24 h-1" />
      </div>

      <div className="justify-between items-start gap-4 grid grid-cols-2 mobile:grid-cols-1 tablet:grid-cols-1">
        {/* Text content */}
        <div className="space-y-4 w-full">
          <p className="font-robotoflex text-lg desktop:text-xl mobile:text-base tablet:text-base">
            {props.introDescript}
          </p>
        </div>
        {/* Image container */}
        <div className="w-full">
          <img
            src="images/aboutusnormal/placeholder.png"
            alt="Traditional healing"
            className="shadow-md rounded-lg w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}
