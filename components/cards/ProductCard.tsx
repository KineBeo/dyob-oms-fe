"use client";

import { Card, CardHeader, CardBody, CardFooter, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { IoCartOutline } from "react-icons/io5";
import { CardDescription, CardTitle } from "../ui/card";
import { CldImage } from "next-cloudinary";

interface ProductCardProps {
    image_url: string,
    title: string,
    price: string,
    slug: string
}

export default function ProductCard(props: ProductCardProps) {
    const router = useRouter();
    return (
        <Card className="shadow-xl hover:shadow-2xl p-0 w-60 h-full cursor-pointer">
            <div onClick={() => router.push(`/products/${props.slug}`)}>
                <CardHeader className="flex justify-center items-center bg-[#FBF6EC] px-4 py-8 h-52">
                    <CldImage
                        alt="Card background"
                        className="w-auto h-full object-contain"
                        src={props.image_url}
                        width={320}
                        height={208}
                        priority
                    />
                </CardHeader>
                <CardBody className="items-left pt-2 h-full">
                    <div className="flex flex-col justify-between">
                        <CardTitle className="line-clamp-1 font-bold text-[#7A0505] text-lg">{props.title}</CardTitle>
                        <CardDescription className="mt-2 font-bold text-lg">{Number(props.price.replace(/[^0-9.-]+/g, "")).toLocaleString('vi-VN')}đ</CardDescription>
                    </div>
                </CardBody>
            </div>

            <CardFooter className="flex-row justify-center items-center gap-4 px-4 pt-0">

            </CardFooter>
        </Card>
    )
}