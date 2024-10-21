"use client"

import ProductCard from "@/components/cards/ProductCard"; 
import { Button } from "@nextui-org/react";
import React, { useState } from 'react';
import { LuBrain } from "react-icons/lu";
import { LuBone } from "react-icons/lu";
import { GiStomach } from "react-icons/gi";

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

                <div className="py-4 flex justify-center">
                    <div className="w-full mini-laptop:max-w-2xl laptop:max-w-[52rem] max-w-6xl">
                        <p className="font-robotoslab mobile:text-lg tablet:text-xl text-2xl font-bold uppercase text-[#4A2511]">
                            Danh sách sản phẩm
                        </p>
                        
                        <div className="grid mobile:grid-cols-2 grid-cols-3 laptop:grid-cols-4 desktop:grid-cols-5 gap-6 py-4">
                            <ProductCard image_url="/images/product.png" title="An vị khang Ông Bụt" price="200.000đ" />
                            <ProductCard image_url="/images/product.png" title="An khang Ông Bụt" price="200.000đ" />
                            <ProductCard image_url="/images/product.png" title="vị khang Ông Bụt" price="200.000đ" />
                            <ProductCard image_url="/images/product.png" title="khang Ông Bụt" price="200.000đ" />
                            <ProductCard image_url="/images/product.png" title="Ông Bụt" price="200.000đ" />
                            <ProductCard image_url="/images/product.png" title="A vị khang Ông Bụt" price="200.000đ" />
                            <ProductCard image_url="/images/product.png" title="hang Ông Bụt" price="200.000đ" />
                        </div>

                    </div>
                </div>
            </div>
        </>
        
    )
}
