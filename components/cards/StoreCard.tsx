import { Card, CardBody, CardFooter, Button } from "@nextui-org/react";
import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";
import { BiDetail } from "react-icons/bi";
import { CldImage } from "next-cloudinary";

interface StoreCardProps {
    image_url: string,
    location: string
}

export default function StoreCard(props: StoreCardProps) {
    return (
        <Card className="bg-[#D7A444] py-0 h-full hover:scale-105 transition">
            <CardBody className="justify-center items-center p-0">
                <CldImage
                    alt="Store"
                    className="rounded-xl w-full h-full object-fill"
                    src={props.image_url}
                    crop={"auto"}
                    width={500}
                    height={300}
                />
                <h2 className="p-2 font-semibold text-large text-white">{props.location}</h2>
            </CardBody>

            <CardFooter className="flex-row justify-center items-center gap-2 pt-0 pb-2">
                <Button className="w-2/5 tablet: bg-white rounded-full font-bold text-[#D7A444] text-[14px] desktop:text-[18px]" size="md" startContent={<FaLocationDot />} aria-label="Find location">
                    Tìm đường
                </Button>
                <Button className="bg-white rounded-full w-2/5 font-bold text-[#D7A444] text-[14px] desktop:text-[18px]" size="md" startContent={<BiDetail />} aria-label="More details">
                    Chi tiết
                </Button>
            </CardFooter>
        </Card>
    )
}