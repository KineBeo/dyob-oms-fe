import ProductCard from "@/components/cards/ProductCard";
import { Card } from "@/components/ui/card";
import { Pagination } from "@nextui-org/react";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

export default function Products() {
    return (
        <div>
            <div className="place-content-center w-full mobile:h-32 h-48 bg-red-900">
                <p className="text-center font-bold text-2xl"> Đông Y Ông bụt</p>
                <p className="text-center font-bold">Quán tâm an bệnh</p>
            </div>


            <div className="my-8 text-center font-semibold font-serif">
                <p className="text-xl">Sản phẩm</p>
                <p className="text-2xl">Đông y ông bụt</p>
            </div>

            <div className="my-4">
                {/* Desktop */}
                <div className="justify-center items-center flex bg-red-500 mobile:hidden tablet:hidden">
                    <Carousel
                        opts={{
                            align: "start"
                        }}
                        className="w-full mini-laptop:max-w-2xl laptop:max-w-[50rem] max-w-6xl">
                        <CarouselContent>
                            {Array.from({ length: 10 }).map((_, index) => (
                                <CarouselItem key={index} className="mini-laptop:basis-1/3 basis-1/4 grid grid-rows-2">
                                    <div className="p-1">
                                        <Card>
                                            <ProductCard image_url="/images/product.png" title="An vị khang Ông Bụt" price="200.000đ" />
                                        </Card>
                                    </div>
                                    <div className="p-1">
                                        <Card>
                                            <ProductCard image_url="/images/product.png" title="Than y Ông Bụt" price="200.000đ" />
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}

                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </div>

            <div className="flex flex-shrink-0 overflow-x-auto items-center my-4 bg-red-500 mini-laptop:hidden laptop:hidden desktop:hidden">
                 {/* Mobile Tablet */}
                <div className="flex flex-shrink-0 overflow-x-scroll">
                    <ProductCard image_url="/images/product.png" title="An vị khang Ông Bụt" price="200.000đ" />
                    <ProductCard image_url="/images/product.png" title="An khang Ông Bụt" price="200.000đ" />
                    <ProductCard image_url="/images/product.png" title="vị khang Ông Bụt" price="200.000đ" />
                    <ProductCard image_url="/images/product.png" title="khang Ông Bụt" price="200.000đ" />
                    <ProductCard image_url="/images/product.png" title="Ông Bụt" price="200.000đ" />
                    <ProductCard image_url="/images/product.png" title="A vị khang Ông Bụt" price="200.000đ" />
                    <ProductCard image_url="/images/product.png" title="hang Ông Bụt" price="200.000đ" />
                </div>
            </div>

            <Pagination className="flex justify-center items-center" total={10} initialPage={1} />
        </div>
    )
}
