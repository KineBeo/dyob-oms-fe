import { Card, CardBody, CardFooter, Button } from "@nextui-org/react";
import { FaLocationDot } from "react-icons/fa6";
import { BiDetail } from "react-icons/bi";
import { CldImage } from "next-cloudinary";

interface StoreCardProps {
    image_url: string,
    location: string,
    google_maps_url?: string
}

export default function StoreCard(props: StoreCardProps) {
    return (
        <Card className="bg-[#D7A444] py-0 h-full transition">
            <CardBody className="justify-center items-center overflow-hidden p-0">
                <CldImage
                    alt="Store"
                    className="relative rounded-xl w-full h-64 object-fill transition-transform transform hover:scale-110 duration-500"
                    src={props.image_url}
                    crop={"auto"}
                    width={500}
                    height={300}
                />
            </CardBody>
            <CardBody>
                <h2 className="font-semibold text-center text-large mobile:text-base tablet:text-base mini-laptop:text-small text-white">{props.location}</h2>  
            </CardBody>
            <CardFooter className="flex-row justify-center items-center gap-2 pt-0 pb-4">
                <Button
                    onClick={() => window.open(props.google_maps_url || '', '_blank')}
                    className="bg-white rounded-full w-2/5 font-bold text-[#D7A444] text-[14px] desktop:text-[18px] mini-laptop:text-xs"
                    size="md"
                    startContent={<FaLocationDot />}
                    aria-label="Find location"
                >
                    Tìm đường
                </Button>

                {/* <Button className="bg-white rounded-full w-2/5 font-bold text-[#D7A444] text-[14px] desktop:text-[18px]" size="md" startContent={<BiDetail />} aria-label="More details">
                    Chi tiết
                </Button> */}
            </CardFooter>
        </Card>
    )
}