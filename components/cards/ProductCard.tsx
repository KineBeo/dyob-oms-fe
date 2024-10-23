"use client";

import { Card, CardHeader, CardBody, CardFooter, Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoCartOutline } from "react-icons/io5";
import { CardDescription, CardTitle } from "../ui/card";

interface ProductCardProps {
    image_url: string,
    title: string,
    price: string,
}

export default function ProductCard(props: ProductCardProps) {
    const router = useRouter();
    return (
        <Card className="p-0 w-fit h-full shadow-xl hover:shadow-2xl cursor-pointer">
            <div onClick={() => router.push("/specific-product")}>
                <CardHeader className="py-8 px-4 flex-col items-center bg-[#FBF6EC]">
                    <Image
                        alt="Card background"
                        className="rounded-xl"
                        src={props.image_url}
                        width={320}
                        height={195}
                    />
                </CardHeader>
                <CardBody className="h-full pt-2 items-left">
                    <div className="flex flex-col justify-between">
                        <CardTitle className="font-bold text-lg text-[#7A0505] line-clamp-1">{props.title}</CardTitle>
                        <CardDescription className="text-sm font-bold">{props.price}</CardDescription>
                    </div>
                </CardBody>
            </div>
            
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