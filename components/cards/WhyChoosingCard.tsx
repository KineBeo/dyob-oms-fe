import { Card, CardHeader, CardBody } from "@nextui-org/react";
import Image from "next/image";
interface WhyChoosingCardProps {
    image_url: string,
    title: string
}
export default function WhyChoosingCard(props: WhyChoosingCardProps) {
    return (
      <Card 
      className="m-2 bg-[#F0E0CA] hover:scale-110 w-fit h-full mobile:flex-shrink-0 mobile:snap-center mobile:w-fit">
        <CardHeader className="p-8 pb-4 flex-col items-center">
          <Image
            alt="icon card"
            className="rounded-xl size-20"
            src={props.image_url}
            width={125}
            height={125}
          />
        </CardHeader>
        <CardBody className="pb-4 pt-0 items-center">
          <p className="text-[#D7A444] uppercase font-bold text-center text-lg laptop:text-small">
            {props.title}
          </p>
        </CardBody>
      </Card>
    );
}