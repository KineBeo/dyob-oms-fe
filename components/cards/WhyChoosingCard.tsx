import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { CldImage } from "next-cloudinary";
interface WhyChoosingCardProps {
  image_url: string,
  title: string
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
      <CardBody className="items-center pt-0 pb-4">
        <p className="font-bold text-[#D7A444] text-center text-lg laptop:text-small uppercase">
          {props.title}
        </p>
      </CardBody>
    </Card>
  );
}