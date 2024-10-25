"use client"

import ProductCard from "@/components/cards/ProductCard";
import { Button } from "@nextui-org/react";
import React, { useState, useEffect } from 'react';
import { LuBrain } from "react-icons/lu";
import { LuBone } from "react-icons/lu";
import { GiKidneys, GiLiver, GiStomach } from "react-icons/gi";
import * as strapi from '../../utils/globalApi';
import useSWR from 'swr';
import { Product, ProductResponse } from "@/utils/api/Product.interface";
import Loading from "@/components/Loading";
import { FaHeartPulse } from "react-icons/fa6";
import { PiMaskSadFill } from "react-icons/pi";

interface FilterCategory {
    icon: React.ReactNode;
    name: string;
    filter: string; // Added filter property to match with product filter
}

const filterCategories: FilterCategory[] = [
  { icon: <LuBrain />, name: "Thần kinh", filter: "than-kinh" },
  { icon: <LuBone />, name: "Xương khớp", filter: "xuong-khop" },
  { icon: <GiStomach />, name: "Tiêu hóa", filter: "tieu-hoa" },
  { icon: <FaHeartPulse />, name: "Tim mạch", filter: "tim-mach" },
  { icon: <PiMaskSadFill />, name: "Trầm cảm", filter: "tram-cam" },
  { icon: <GiKidneys />, name: "Thận tiết niệu", filter: "than-tiet-nieu"},
  { icon: <GiLiver/>, name: "Nội tiết", filter: "noi-tiet"},
];

export default function Products() {
    const [activeFilter, setActiveFilter] = useState<string | null>(null);
    const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);

    const { data, isLoading, error } = useSWR('products', async () => {
        const response: ProductResponse = await strapi.getAllProducts();
        return response;
    }, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });

    useEffect(() => {
        if (data?.data) {
            if (activeFilter) {
                const filtered = data.data.filter(product => {
                    if (product.filter) {
                        return product.filter === activeFilter;
                    }
                    return false;
                }
                );
                setDisplayedProducts(filtered);
            } else {
                setDisplayedProducts(data.data);
            }
        }
    }, [data, activeFilter]);

    const handleFilterClick = (filter: FilterCategory) => {
        setActiveFilter(activeFilter === filter.filter ? null : filter.filter);
    };

    if (isLoading) return <Loading />
    if (error) return <div>Error...</div>
    if (!data?.data) return (<div>No products found</div>);

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
                                    className={`text-sm font-robotoflex font-medium ${activeFilter === filter.filter ? 'bg-[#4A2511] text-white' : ''}`}
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
                            Danh sách sản phẩm {activeFilter && `- ${filterCategories.find(f => f.filter === activeFilter)?.name}`}
                        </p>

                        <div className="gap-6 grid grid-cols-3 desktop:grid-cols-5 laptop:grid-cols-4 mobile:grid-cols-2 py-4">
                            {displayedProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    image_url={product.Main_image.url}
                                    title={product.Name}
                                    price={product.Price}
                                    slug={product.slug}
                                />
                            ))}
                        </div>

                        {displayedProducts.length === 0 && (
                            <div className="py-8 text-center text-gray-500">
                                No products found for this category
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}