import { Card, CardHeader, CardBody, CardFooter, Button } from "@nextui-org/react";
import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";
import { BiDetail } from "react-icons/bi";

interface StoreCardProps {
    image_url: string,
    location: string
}

export default function StoreCard(props: StoreCardProps) {
    return (
        <Card className="m-4 desktop:mx-16 py-0 bg-[#D7A444] h-full">
            <CardBody className="items-center justify-center p-0">
                <Image
                    alt="Store"
                    className="w-full h-full object-fill rounded-xl"
                    src={props.image_url}
                    width={500}
                    height={500}
                />
                <h2 className="font-semibold text-large text-[#F0E0CA] p-2">{props.location}</h2>
            </CardBody>

            <CardFooter className="pb-2 pt-0 flex-row gap-2 items-center justify-center">
                <Button className="w-2/5 tablet: rounded-full text-[14px] font-bold text-[#D7A444] bg-white desktop:text-[18px]" size="md" startContent={<FaLocationDot />} aria-label="Find location">
                    Tìm đường
                </Button>
                <Button className="w-2/5 rounded-full text-[14px] font-bold text-[#D7A444] bg-white desktop:text-[18px]" size="md" startContent={<BiDetail />} aria-label="More details">
                    Chi tiết
                </Button>
            </CardFooter>
        </Card>
    )
}