'use client';

import { ProductResponse } from "@/utils/api/Product.interface";
import ProductCard from "../cards/ProductCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import * as strapi from '../../utils/globalApi';
import useSWR from 'swr';


const OtherProducts: React.FC = () => {

  const { data, isLoading, error } = useSWR('products', async () => {
    const response: ProductResponse = await strapi.getAllProducts();
    return response;
  }, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const otherProducts = data?.data;

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error...</div>

  return (
    <div className="mx-auto pt-6 max-w-7xl">
      <div className="bg-[#f9f3ea] drop-shadow-md p-4">
        <h2 className="font-bold text-[#3F291B] text-2xl">Sản phẩm khác</h2>
      </div>

      <div>
        <Carousel
          opts={{
            align: "start",
          }}
          className="py-6 w-full"
        >
          <CarouselContent>
            {otherProducts?.map((otherProduct, index) => (
              <CarouselItem key={index} className="mobile:basis-1/2 tablet:basis-1/3 desktop:basis-1/5 basis-1/4">
                <ProductCard key={index}
                  image_url={otherProduct.Main_image.url}
                  title={otherProduct.Name}
                  price={otherProduct.Price}
                  slug={otherProduct.slug}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0" />
          <CarouselNext className="right-0" />
        </Carousel>
      </div>

    </div>
  );
};

export default OtherProducts;

