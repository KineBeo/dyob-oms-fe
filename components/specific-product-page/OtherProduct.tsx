'use client';
import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";

interface Product {
  image_url: string;
  title: string;
  price: string;
}

interface ProductCardProps extends Product {
  key?: number;
}

const otherProducts: Product[] = [
  {
    image_url: "/images/product.png",
    title: "An vị khang",
    price: "200 000d",
  },
  {
    image_url: "/images/product.png",
    title: "An vị khang",
    price: "200 000d",
  },
  {
    image_url: "/images/product.png",
    title: "An vị khang",
    price: "200 000d",
  },
  {
    image_url: "/images/product.png",
    title: "An vị khang",
    price: "200 000d",
  },
  {
    image_url: "/images/product.png",
    title: "An vị khang",
    price: "200 000d",
  },
  {
    image_url: "/images/product.png",
    title: "An vị khang",
    price: "200 000d",
  },
  {
    image_url: "/images/product.png",
    title: "An vị khang",
    price: "200 000d",
  },
];

const ProductCard: React.FC<ProductCardProps> = ({
  image_url,
  title,
  price,
}) => (
  <div className="flex-shrink-0 w-48 bg-white rounded-lg overflow-hidden shadow-md">
    <img src={image_url} alt={title} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-lg font-semibold text-[#3F291B]">{title}</h3>
      <p className="text-sm text-gray-600 mt-2">{price}</p>
    </div>
  </div>
);

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
