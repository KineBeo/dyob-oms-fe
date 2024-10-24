"use client";

import { Card, CardHeader, CardBody, CardFooter, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { IoCartOutline } from "react-icons/io5";
import { CardDescription, CardTitle } from "../ui/card";

interface ProductCardProps {
    image_url: string,
    title: string,
    price: string,
    slug: string
}

export default function ProductCard(props: ProductCardProps) {
    const router = useRouter();
    return (
        <Card className="shadow-xl hover:shadow-2xl p-0 w-fit h-full cursor-pointer">
            <div onClick={() => router.push(`/products/${props.slug}`)}>
                <CardHeader className="flex-col items-center bg-[#FBF6EC] px-4 py-8">
                    <img
                        alt="Card background"
                        className="rounded-xl"
                        src={props.image_url}
                        width={320}
                        height={195}
                    />
                </CardHeader>
                <CardBody className="items-left pt-2 h-full">
                    <div className="flex flex-col justify-between">
                        <CardTitle className="line-clamp-1 font-bold text-[#7A0505] text-lg">{props.title}</CardTitle>
                        <CardDescription className="font-bold text-sm">{Number(props.price.replace(/[^0-9.-]+/g, "")).toLocaleString('vi-VN')}</CardDescription>
                    </div>
                </CardBody>
            </div>

            <CardFooter className="flex-row justify-center items-center gap-4 px-4 pt-0">
                <Button className="bg-[#7A0505] rounded-full w-3/5 font-bold text-white" size="sm">
                    Mua ngay
                </Button>
                <Button className="bg-[#F0E0CA] rounded-full w-2/5" size="sm" isIconOnly aria-label="Add to Cart">
                    <IoCartOutline className="text-[#7A0505] size-4" />
                </Button>
            </CardFooter>
        </Card>
    )
}