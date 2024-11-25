"use client";

import { ProductResponse } from "@/utils/api/Product.interface";
import ProductCard from "../cards/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import * as strapi from "../../utils/globalApi";
import useSWR from "swr";

const NewProducts: React.FC = () => {
  const { data, isLoading, error } = useSWR(
    "products",
    async () => {
      const response: ProductResponse = await strapi.getAllProducts();
      return response;
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const otherProducts = data?.data;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  return (
    <div className="mx-auto pt-12 max-w-5xl">
    
    <h2 className="font-bold text-[#3F291B] text-3xl text-center italic">
        "Mỗi bài thuốc đều là câu chuyện của lòng đam mê"
    </h2>

      <div>
        <Carousel
          opts={{
            align: "start",
          }}
          className="py-6 w-full px-8"
        >
          <CarouselContent>
            {otherProducts?.map((otherProduct, index) => (
              <CarouselItem
                key={index}
                className="mobile:basis-1/2 tablet:basis-1/3 pb-12 basis-1/4"
              >
                <ProductCard
                  key={index}
                  image_url={
                    otherProduct.Main_image.provider_metadata.public_id
                  }
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

export default NewProducts;
