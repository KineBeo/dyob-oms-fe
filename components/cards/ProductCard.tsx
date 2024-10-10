import { Card, CardHeader, CardBody, CardFooter, Button } from "@nextui-org/react";
import Image from "next/image";
import { IoCartOutline } from "react-icons/io5";

interface ProductCardProps {
    image_url: string,
    title: string,
    price: string,
}

export default function ProductCard(props: ProductCardProps) {
    return (
        <Card className="m-8 p-0 h-fit w-fit">
            <CardHeader className="py-8 px-4 flex-col items-center bg-[#FBF6EC]">
                <Image
                    alt="Card background"
                    className="rounded-xl"
                    src={props.image_url}
                    width={320}
                    height={195}
                />
            </CardHeader>
            <CardBody className="pt-2 items-left">
                <p className="font-bold text-lg text-[#7A0505]">{props.title}</p>
                <p className="text-sm font-bold">{props.price}</p>
            </CardBody>

            <CardFooter className="px-4 pt-0 flex-row gap-4 items-center justify-center">
                <Button className="w-3/5 rounded-full font-bold text-white bg-[#7A0505]" size="sm">
                    Mua ngay
                </Button>
                <Button className="w-2/5 rounded-full bg-[#F0E0CA]" size="sm" isIconOnly aria-label="Add to Cart">
                    <IoCartOutline className="size-4 text-[#7A0505]" />
                </Button>
            </CardFooter>
        </Card>
    )
}