import { Divider } from "@nextui-org/react";
import Image from "next/image";

interface ImageAndDesProps {
  introTitle: string;
  introDescript: string;
}

export default function NewSloganAndDes2(props: ImageAndDesProps) {
  return (
    <div className="mx-auto px-4 pt-6 pb-4 w-full max-w-4xl tablet:max-w-lg mini-laptop:max-w-2xl desktop:max-w-5xl">
      <div className="flex flex-col justify-center items-center mb-6 mobile:mb-4 tablet:mb-4 w-full"></div>

      <div className="justify-between items-start gap-4 grid grid-cols-2 mobile:grid-cols-1 tablet:grid-cols-1">
        {/* Image container */}
        <div className="w-full">
          <img
            src="images/aboutusnormal/placeholder.png"
            alt="Traditional healing"
            className="shadow-md rounded-lg w-full h-auto"
          />
        </div>

        {/* Text content */}
        <div className="space-y-4 w-full">
          <p className=" font-bold font-robotoslab text-[#4A2511] italic text-2xl text-left mobile:text-3xl tablet:text-3xl">
            &quot;Cùng nhau lan tỏa tử tế, xây dựng một cộng đồng khỏe
            mạnh.&quot;
          </p>
          <p className="font-robotoflex text-lg desktop:text-lg mobile:text-base tablet:text-base">
            Chúng tôi mong muốn kết nối những tâm hồn cùng chung chí hướng, cùng
            nhau chia sẻ tri thức và đam mê, giúp nhau nâng cao sức khỏe thể
            chất và tinh thần. Chúng tôi không chỉ trị bệnh mà còn mang tới sự
            an yên, bình an trong cuộc sống.
          </p>
        </div>
      </div>
    </div>
  );
}
