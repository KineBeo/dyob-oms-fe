"use client"
import { CldImage } from "next-cloudinary";
import { useState } from "react";
import {
  FaStar,
  FaChevronLeft,
  FaChevronRight,
  FaMinus,
  FaPlus,
} from "react-icons/fa";

interface ProductInfoProps {
  name: string;
  price: string;
  images: string[];
}

const ProductInfo = (productInfo: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  // const [selectedSize, setSelectedSize] = useState("30 viên");

  // const sizes = [
  //   { label: "30 viên", price: "200.000đ" },
  //   { label: "50 viên", price: "300.000đ" },
  //   { label: "100000 viên", price: "400.000đ" },
  // ];

  return (
    <div className="flex desktop:flex-row laptop:flex-row mini-laptop:flex-row flex-col gap-8 mx-auto p-4 max-w-7xl">
      {/* Left side - Image gallery */}
      <div className="md:w-1/2">
        <div className="mb-4">
          <CldImage
            src={productInfo.images[0]}
            width={500}
            height={500}
            alt="Product"
            className="rounded-lg w-full h-full"
          />
        </div>
        <div className="relative">
          <div className="flex justify-center gap-4 overflow-hidden">
            {productInfo.images.map((src, index) => (
              <CldImage
                key={index}
                src={src}
                width={100}
                height={100}
                alt={`Thumbnail ${index + 1}`}
                className="border rounded-lg w-24 h-24 cursor-pointer"
              />
            ))}
          </div>
          <button className="top-1/2 left-0 absolute bg-white shadow p-2 rounded-full -translate-y-1/2">
            <FaChevronLeft className="w-4 h-4 hover:scale-105 transition" />
          </button>
          <button className="top-1/2 right-0 absolute bg-white shadow p-2 rounded-full -translate-y-1/2">
            <FaChevronRight className="w-4 h-4 hover:scale-105 transition" />
          </button>
        </div>
      </div>

      {/* Right side - Product details */}
      <div className="md:w-1/2">
        <h1 className="mb-4 font-bold text-3xl text-red-900">
          {productInfo.name}
        </h1>

        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="w-5 h-5 text-yellow-400" />
          ))}
          <span className="ml-2 text-gray-600">15 reviews</span>
        </div>

        <div className="mb-6">
          <h2 className="mb-4 font-bold text-3xl">{Number(productInfo.price.replace(/[^0-9.-]+/g, "")).toLocaleString('vi-VN')}đ</h2>
          <div className="flex gap-4 mb-4">
            {/* {sizes.map((size) => (
              <button
                key={size.label}
                className={`px-4 py-2 rounded border ${selectedSize === size.label
                    ? "border-[#7A0505] text-[#7A0505]"
                    : "border-gray-300"
                  }`}
                onClick={() => setSelectedSize(size.label)}
              >
                <div>{size.price}</div>
                <div className="text-sm">{size.label}</div>
              </button>
            ))} */}
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex border rounded">
              <button
                className="flex justify-center items-center px-3 py-1 border-r"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <FaMinus className="w-3 h-3" />
              </button>
              <input
                type="text"
                className="w-16 text-center"
                value={quantity}
                readOnly
              />
              <button
                className="flex justify-center items-center px-3 py-1 border-l"
                onClick={() => setQuantity(quantity + 1)}
              >
                <FaPlus className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="gap-4 grid grid-flow-col">
            <button className="justify-center items-center bg-[#7A0505] px-6 py-2 rounded-full font-bold text-white hover:scale-105 transition">
              Mua ngay
            </button>
            <button className="justify-center items-center border-[#7A0505] px-6 py-2 border rounded-full font-bold text-[#7A0505] hover:scale-105 transition">
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
