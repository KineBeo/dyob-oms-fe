'use client';
import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import ProductCard from "../cards/ProductCard";

interface Product {
  image_url: string;
  title: string;
  price: string;
}

const otherProducts: Product[] = [
  {
    image_url: "/images/otherproducts/Bai-gout.png",
    title: "Bài Gout Ông Bụt",
    price: "200.000đ",
  },
  {
    image_url: "/images/otherproducts/Tieu-khat-phuong.png",
    title: "Tiêu Khát Phương Ông Bụt",
    price: "200.000đ",
  },
  {
    image_url: "/images/otherproducts/Noi-tiet-nu.png",
    title: "Nội Tiết Nữ Ông Bụt",
    price: "200.000đ",
  },
  {
    image_url: "/images/otherproducts/Cam-mao-tieu-giao-tan.png",
    title: "Cảm Mạo Tiêu Giao Tán Ông Bụt",
    price: "200.000đ",
  },
  {
    image_url: "/images/otherproducts/Hoa-huyet-duong-nao.png",
    title: "Hỏa Huyết Dưỡng Não Ông Bụt",
    price: "200.000đ",
  },
  {
    image_url: "/images/otherproducts/Ich-tam-phuong.png",
    title: "Ích Tâm Phương Ông Bụt",
    price: "200.000đ",
  },
  {
    image_url: "/images/otherproducts/An-xoang.png",
    title: "An Xoang Ông Bụt",
    price: "200.000đ",
  },
];

const OtherProducts: React.FC = () => {
  // We will use React useRef hook to reference the wrapping div:
  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref); // Now we pass the reference to the useDraggable hook:

  return (
    <div className="max-w-7xl mx-auto pt-6">
      <div className="bg-[#f9f3ea] p-4 drop-shadow-md">
        <h2 className="text-2xl font-bold text-[#3F291B]">Sản phẩm khác</h2>
      </div>
      <div
        className="py-10 flex space-x-5 overflow-x-scroll scrollbar-hide"
        {...events}
        ref={ref} // add reference and events to the wrapping div
      >
        {otherProducts.map((otherProduct, index) => (
          <ProductCard
            key={index}
            image_url={otherProduct.image_url}
            title={otherProduct.title}
            price={otherProduct.price}
          />
        ))}
      </div>
    </div>
  );
};

export default OtherProducts;
