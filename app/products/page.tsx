"use client"

import ProductCard from "@/components/cards/ProductCard";
import { Button } from "@nextui-org/react";
import React, { useState } from 'react';
import { LuBrain } from "react-icons/lu";
import { LuBone } from "react-icons/lu";
import { GiStomach } from "react-icons/gi";
import * as strapi from '../../utils/globalApi';
import useSWR from 'swr';
import { ProductResponse } from "@/utils/api/Product.interface";
import Loading from "@/components/Loading";

interface FilterCategory {
    icon: React.ReactNode;
    name: string;
    action: () => void;
}

const filterCategories = [
    { icon: <LuBrain />, name: "Thần kinh", action: () => console.log("Bộ lọc filter applied") },
    { icon: <LuBone />, name: "Xương khớp", action: () => console.log("Sẵn hàng filter applied") },
    { icon: <GiStomach />, name: "Tiêu hóa", action: () => console.log("Giá filter applied") },
    { icon: <LuBrain />, name: "Thần kin", action: () => console.log("Bộ lọc filter applied") },
    { icon: <LuBone />, name: "Xương khớ", action: () => console.log("Sẵn hàng filter applied") },
    { icon: <GiStomach />, name: "Tiêu hó", action: () => console.log("Giá filter applied") },
];

export default function Products() {
    // const [activeFilter, setActiveFilter] = useState(null);

    // const handleFilterClick = (filter: { name: any; action: any; }) => {
    //     setActiveFilter(activeFilter === filter.name ? null : filter.name);
    //     filter.action(); // Execute the specific action for this filter
    // };
    const [activeFilter, setActiveFilter] = useState<string | null>(null);

    const handleFilterClick = (filter: FilterCategory) => {
        setActiveFilter(activeFilter === filter.name ? null : filter.name);
        filter.action();
    };

    const { data, isLoading, error } = useSWR('products', async () => {
        const response: ProductResponse = await strapi.getAllProducts();
        console.log(response)
        return response;
    }, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });
    if (isLoading) return <Loading />
    if (error) return <div>Error...</div>

    const products = data?.data;
    if (!products) return <div>No products found</div>




    return (
        <>
            <div className="flex justify-center items-center bg-[#4A2511] h-32 text-lg text-white">
                San pham Dong y ong but
            </div>

            <div className="bg-paper px-4">
                <div className="flex justify-center py-4">
                    <div className="w-full max-w-6xl laptop:max-w-[52rem] mini-laptop:max-w-2xl">
                        <p className="font-bold font-robotoslab text-[#4A2511] text-2xl mobile:text-lg tablet:text-xl uppercase">
                            Danh mục
                        </p>

                        <div className="flex flex-wrap gap-2 py-2">
                            {filterCategories.map((filter, index) => (
                                <Button
                                    key={index}
                                    startContent={filter.icon}
                                    onPress={() => handleFilterClick(filter)}
                                    className={`text-sm font-robotoflex font-medium ${activeFilter === filter.name ? 'bg-[#4A2511] text-white' : ''}`}
                                >
                                    {filter.name}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex justify-center py-4">
                    <div className="w-full max-w-6xl laptop:max-w-[52rem] mini-laptop:max-w-2xl">
                        <p className="font-bold font-robotoslab text-[#4A2511] text-2xl mobile:text-lg tablet:text-xl uppercase">
                            Danh sách sản phẩm
                        </p>

                        <div className="gap-6 grid grid-cols-3 desktop:grid-cols-5 laptop:grid-cols-4 mobile:grid-cols-2 py-4">
                            {products?.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    image_url={product.Main_image.url}
                                    title={product.Name}
                                    price={product.Price}
                                    slug={product.slug}
                                />
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </>

    )
}
