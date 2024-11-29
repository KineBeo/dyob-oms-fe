import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { CldImage } from "next-cloudinary";
interface WhyChoosingCardProps {
  image_url: string,
  title: string,
  fixed_text: string
}
export default function WhyChoosingCard(props: WhyChoosingCardProps) {
  return (
    <Card
      className="bg-[#F0E0CA] hover:scale-110 mobile:flex-shrink-0 mobile:snap-center w-full h-full">
      <CardHeader className="flex-col items-center p-8 pb-4">
        <CldImage
          alt="icon card"
          className="rounded-xl size-20"
          src={props.image_url}
          width={125}
          height={125}
        />
      </CardHeader>
      <div className="my-1">
        <p className="font-bold text-[#7A0505] text-center text-3xl laptop:text-4xl desktop:text-5xl uppercase">
          {props.fixed_text}
        </p>
      </div>
      <CardBody className="items-center pt-0 pb-4">
        <p className="font-bold text-[#D7A444] text-center text-xl laptop:text-small uppercase">
          {props.title}
        </p>
      </CardBody>
    </Card>
  );
}