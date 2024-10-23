'use client';

import ProductCard from "../cards/ProductCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";

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
    title: "Hòa Huyết Dưỡng Não Ông Bụt",
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
  return (
    <div className="max-w-7xl mx-auto pt-6">
      <div className="bg-[#f9f3ea] p-4 drop-shadow-md">
        <h2 className="text-2xl font-bold text-[#3F291B]">Sản phẩm khác</h2>
      </div>

      <div>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full py-6"
        >
          <CarouselContent>
            {otherProducts.map((otherProduct, index) => (
              <CarouselItem key={index} className="mobile:basis-1/2 tablet:basis-1/3 basis-1/4 desktop:basis-1/5">
                  <ProductCard key={index}
                    image_url={otherProduct.image_url}
                    title={otherProduct.title}
                    price={otherProduct.price}
                  />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0"/>
          <CarouselNext className="right-0"/>
        </Carousel>
      </div>
      
    </div>
  );
};

export default OtherProducts;

