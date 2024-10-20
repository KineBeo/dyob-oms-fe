"use client"

import ProductCard from "@/components/cards/ProductCard";
import { Card, CardBody, Link, Image } from "@nextui-org/react";
import React from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";


const categories = [
    { name: 'Thần kinh', image: '/images/products/thankinh.png', href: '/products/benh-he-than-kinh' },
    { name: 'Xương khớp', image: '', href: '/products/benh-he-xuong-khop' },
    { name: 'Tiêu hóa', image: '', href: '/products/benh-he-tieu-hoa' },
    { name: 'Tủ thuốc ', image: '', href: '/products/tu-thuoc-ong-but' }
];

export default function Products() {


    return (
        <>
            <div className="bg-[#4A2511] h-32 flex justify-center items-center text-white text-lg">
                San pham Dong y ong but
            </div>

            <div className="bg-paper px-4">
                <div className="py-4 flex justify-center">
                    <div className="w-full mini-laptop:max-w-2xl laptop:max-w-[52rem] max-w-6xl">
                        <p className="font-robotoslab mobile:text-lg tablet:text-xl text-2xl font-bold uppercase text-[#4A2511]">
                            Danh mục
                        </p>
                        <div className="grid mobile:grid-cols-2 grid-cols-4 gap-4 py-2">
                            {categories.map((category) => (
                                <Link href={category.href} key={category.name}>
                                    <Card className="w-full h-full transition-shadow">
                                        <CardBody className="p-0">
                                            <Image
                                                src={category.image}
                                                alt={category.name}
                                                className="object-fill h-28 w-auto"
                                            />
                                            <p className="text-center pb-2 text-sm font-medium font-robotoflex">{category.name}</p>
                                        </CardBody>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                
                {/* Than kinh */}
                <div className="flex flex-col justify-center py-4">
                    <div className="flex justify-center">
                        <div className="flex justify-between items-center w-full mini-laptop:max-w-2xl laptop:max-w-[52rem] max-w-6xl">
                            <p className="mobile:text-lg tablet:text-xl text-2xl font-bold uppercase font-robotoslab text-[#4A2511]">Bệnh hệ thần kinh</p>
                            <Link className="mobile:text-sm tablet:text-sm text-base text-black font-medium" href="/products/benh-he-than-kinh">Xem tất cả</Link>
                        </div>
                    </div>

                    <div className="justify-center items-center flex py-4">
                        <Carousel
                            opts={{
                                align: "start"
                            }}
                            className="w-full mini-laptop:max-w-2xl laptop:max-w-[52rem] max-w-6xl">
                            <CarouselContent>
                                {Array.from({ length: 10 }).map((_, index) => (
                                    <CarouselItem key={index} className="mobile:basis-1/2 tablet:basis-1/3 mini-laptop:basis-1/3 basis-1/4 desktop:basis-1/5">
                                        <div className="p-0">
                                            <ProductCard image_url="/images/product.png" title="An vị khang Ông Bụt" price="200.000đ" />
                                        </div>
                                    </CarouselItem>
                                ))}

                            </CarouselContent>
                            <CarouselPrevious className="ml-12" />
                            <CarouselNext className="mr-12" />
                        </Carousel>
                    </div>
                </div>

                {/* Xuong khop */}
                <div className="flex flex-col justify-center py-4">
                    <div className="flex justify-center">
                        <div className="flex justify-between items-center w-full mini-laptop:max-w-2xl laptop:max-w-[52rem] max-w-6xl">
                            <p className="mobile:text-lg tablet:text-xl text-2xl font-bold uppercase font-robotoslab text-[#4A2511]">Bệnh hệ xương khớp</p>
                            <Link className="mobile:text-sm tablet:text-sm text-base text-black font-medium" href="/products/benh-he-xuong-khop">Xem tất cả</Link>
                        </div>
                    </div>

                    <div className="justify-center items-center flex py-4">
                        <Carousel
                            opts={{
                                align: "start"
                            }}
                            className="w-full mini-laptop:max-w-2xl laptop:max-w-[52rem] max-w-6xl">
                            <CarouselContent>
                                {Array.from({ length: 10 }).map((_, index) => (
                                    <CarouselItem key={index} className="mobile:basis-1/2 tablet:basis-1/3 mini-laptop:basis-1/3 basis-1/4 desktop:basis-1/5">
                                        <div className="p-0">
                                            <ProductCard image_url="/images/product.png" title="An vị khang Ông Bụt" price="200.000đ" />
                                        </div>
                                    </CarouselItem>
                                ))}

                            </CarouselContent>
                            <CarouselPrevious className="ml-12" />
                            <CarouselNext className="mr-12" />
                        </Carousel>
                    </div>
                </div>

                {/* Tieu hoa */}
                <div className="flex flex-col justify-center py-4">
                    <div className="flex justify-center">
                        <div className="flex justify-between items-center w-full mini-laptop:max-w-2xl laptop:max-w-[52rem] max-w-6xl">
                            <p className="mobile:text-lg tablet:text-xl text-2xl font-bold uppercase font-robotoslab text-[#4A2511]">Bệnh hệ tiêu hóa</p>
                            <Link className="mobile:text-sm tablet:text-sm text-base text-black font-medium" href="/products/benh-he-tieu-hoa">Xem tất cả</Link>
                        </div>
                    </div>

                    <div className="justify-center items-center flex py-4">
                        <Carousel
                            opts={{
                                align: "start"
                            }}
                            className="w-full mini-laptop:max-w-2xl laptop:max-w-[52rem] max-w-6xl">
                            <CarouselContent>
                                {Array.from({ length: 10 }).map((_, index) => (
                                    <CarouselItem key={index} className="mobile:basis-1/2 tablet:basis-1/3 mini-laptop:basis-1/3 basis-1/4 desktop:basis-1/5">
                                        <div className="p-0">
                                            <ProductCard image_url="/images/product.png" title="An vị khang Ông Bụt" price="200.000đ" />
                                        </div>
                                    </CarouselItem>
                                ))}

                            </CarouselContent>
                            <CarouselPrevious className="ml-12" />
                            <CarouselNext className="mr-12" />
                        </Carousel>
                    </div>
                </div>

                {/* Tu thuoc */}
                <div className="flex flex-col justify-center py-4">
                    <div className="flex justify-center">
                        <div className="flex justify-between items-center w-full mini-laptop:max-w-2xl laptop:max-w-[52rem] max-w-6xl">
                            <p className="mobile:text-lg tablet:text-xl text-2xl font-bold uppercase font-robotoslab text-[#4A2511]">Tủ thuốc ông bụt</p>
                            <Link className="mobile:text-sm tablet:text-sm text-base text-black font-medium" href="/products/tu-thuoc-ong-but">Xem tất cả</Link>
                        </div>
                    </div>

                    <div className="justify-center items-center flex py-4">
                        <Carousel
                            opts={{
                                align: "start"
                            }}
                            className="w-full mini-laptop:max-w-2xl laptop:max-w-[52rem] max-w-6xl">
                            <CarouselContent>
                                {Array.from({ length: 10 }).map((_, index) => (
                                    <CarouselItem key={index} className="mobile:basis-1/2 tablet:basis-1/3 mini-laptop:basis-1/3 basis-1/4 desktop:basis-1/5">
                                        <div className="p-0">
                                            <ProductCard image_url="/images/product.png" title="An vị khang Ông Bụt" price="200.000đ" />
                                        </div>
                                    </CarouselItem>
                                ))}

                            </CarouselContent>
                            <CarouselPrevious className="ml-12" />
                            <CarouselNext className="mr-12" />
                        </Carousel>
                    </div>
                </div>
            </div>
        </>
        
    )
}
