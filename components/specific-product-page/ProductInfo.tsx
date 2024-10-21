"use client"
import { Button } from "@nextui-org/react";
import { useState } from "react";
import {
  FaStar,
  FaChevronLeft,
  FaChevronRight,
  FaShoppingCart,
  FaMinus,
  FaPlus,
} from "react-icons/fa";

const ProductInfo = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("30 viên");

  const sizes = [
    { label: "30 viên", price: "200000đ" },
    { label: "50 viên", price: "300000đ" },
    { label: "100000 viên", price: "400000đ" },
  ];

  const images = [
    "/images/product.png",
    "/images/product.png",
    "/images/product.png",
  ];

  return (
    <div className="flex flex-col laptop:flex-row desktop:flex-row gap-8 p-4 max-w-7xl mx-auto">
      {/* Left side - Image gallery */}
      <div className="md:w-1/2">
        <div className="mb-4">
          <img
            src="/images/product.png"
            alt="Product"
            className="h-full w-full rounded-lg"
          />
        </div>
        <div className="relative">
          <div className="flex gap-4 overflow-hidden justify-center">
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Thumbnail ${index + 1}`}
                className="w-24 h-24 rounded-lg border cursor-pointer"
              />
            ))}
          </div>
          <button className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow">
            <FaChevronLeft className="w-4 h-4" />
          </button>
          <button className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow">
            <FaChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Right side - Product details */}
      <div className="md:w-1/2">
        <h1 className="text-3xl font-bold text-red-900 mb-4">
          An vị khang Ông bụt
        </h1>

        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="w-5 h-5 text-yellow-400" />
          ))}
          <span className="ml-2 text-gray-600">15 reviews</span>
        </div>

        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-4">200000đ</h2>
          <div className="flex gap-4 mb-4">
            {sizes.map((size) => (
              <button
                key={size.label}
                className={`px-4 py-2 rounded border ${
                  selectedSize === size.label
                    ? "border-[#7A0505] text-[#7A0505]"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedSize(size.label)}
              >
                <div>{size.price}</div>
                <div className="text-sm">{size.label}</div>
              </button>
            ))}
          </div>

          <div className="flex gap-4 items-center mb-4">
            <div className="flex border rounded">
              <button
                className="px-3 py-1 border-r flex items-center justify-center"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <FaMinus className="w-3 h-3" />
              </button>
              <input
                type="number"
                className="w-16 text-center"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              />
              <button
                className="px-3 py-1 border-l flex items-center justify-center"
                onClick={() => setQuantity(quantity + 1)}
              >
                <FaPlus className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="grid grid-flow-col gap-4">
            <Button className="bg-[#7A0505] text-white font-bold px-6 py-2 rounded-full  items-center justify-center ">
              Mua ngay
            </Button>
            <Button className="border border-[#7A0505] text-[#7A0505] p-2 rounded-full flex items-center justify-center">
              <FaShoppingCart className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
