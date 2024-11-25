import { Divider } from "@nextui-org/react";
import Image from "next/image";

interface ImageAndDesProps {
  introTitle: string;
  introDescript: string;
}

export default function NewSloganAndDes(props: ImageAndDesProps) {
  return (
    <div className="mx-auto px-4 pt-12 pb-4 w-full max-w-4xl tablet:max-w-lg mini-laptop:max-w-2xl desktop:max-w-5xl">
      <div className="flex flex-col justify-center items-center mb-6 mobile:mb-4 tablet:mb-4 w-full"></div>

      <div className="justify-between items-start gap-4 grid grid-cols-2 mobile:grid-cols-1 tablet:grid-cols-1">
        {/* Text content */}

        <div className="space-y-4 w-full">
          <p className=" font-bold font-robotoslab text-[#4A2511] italic text-2xl text-left mobile:text-3xl tablet:text-3xl">
            {props.introTitle}
          </p>
          <p className="font-robotoflex text-lg desktop:text-lg mobile:text-base tablet:text-base">
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
