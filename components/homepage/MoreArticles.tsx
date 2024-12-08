
"use client";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import Loading from "../Loading";
import * as strapi from "@/utils/globalApi";
import { Card, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import { CldImage } from "next-cloudinary";


export default function MoreAritcles() {
  const { data, isLoading, error } = useSWR(
    "article",
    async () => {
      const response: ArticleResponse = await strapi.getAllArticles();
      return response;
    }
  );
  const router = useRouter();

  if (error) return <div>Error loading homepage data</div>;
  if (isLoading) return <Loading />;

  const articleList = data?.data;

  return (
    <div className="py-8  max-w-5xl mx-auto gap-4 grid grid-cols-2 mobile:grid-cols-1 tablet:grid-cols-1 mobile:gap-6 tablet:gap-8 ">
      <div className="flex flex-col items-start mobile:items-center tablet:items-center mini-laptop:items-center">
        <h1 className=" font-bold font-robotoslab text-[#7A0505] text-center text-3xl mobile:text-2xl tablet:text-2xl mini-laptop:text-2xl">
          THÔNG TIN SỨC KHỎE
        </h1>
        <div className="mt-1 mb-3 bg-[#D7A444]  w-24 h-1"></div>
        <div className="grid grid-cols-2 gap-4 mobile:gap-2 px-2 justify-center items-center ">
          {articleList
            ?.filter(
              (article) => article.topic?.title === "thong-tin-suc-khoe"
            )
            .map((article) => (
              <div key={article.id} className="pt-2 h-full">
                <Card
                  key={article.id}
                  isPressable
                  shadow="sm"
                  className="h-full w-full flex flex-col"
                  onClick={() => router.push(`/articles/${article.seoUrl}`)}
                >
                  <CardBody className="p-0">
                    <Image
                      alt={article.title}
                      className="w-full h-48 object-cover" // Đặt chiều cao cố định và sử dụng object-cover
                      radius="lg"
                      shadow="sm"
                      src={article.image.url}
                    />
                  </CardBody>
                  <CardFooter className="text-small justify-center items-center">
                    <p className="line-clamp-2 font-bold text-[#3F291B]">
                      {article.name}
                    </p>
                  </CardFooter>
                </Card>
              </div>
            ))}
        </div>
      </div>
      <div className="flex flex-col items-start mobile:items-center tablet:items-center mini-laptop:items-center  ">
        <h1 className=" font-bold font-robotoslab text-[#7A0505] text-center text-3xl mobile:text-2xl tablet:text-2xl mini-laptop:text-2xl">
          TIN TỨC SỰ KIỆN
        </h1>
        <div className="mt-1 mb-3 bg-[#D7A444]  w-24 h-1"></div>
        <div className="flex flex-col items-start ">
          {articleList
            ?.filter((article) => article.topic?.title === "tin-tuc-su-kien")
            .map((article) => (
              <div key={article.id} className=" h-full">
                {Event(article.image.url, article.name, article.seoUrl)}
              </div>
            ))}
        </div>
      </div>
    </div>
  );

}

function Event(imageUrl: string, title: string, seoUrl: string) {
  const router = useRouter();
  return (
    <div
      className="
          flex
      mobile:text-center
      mobile:items-center 
      mobile:justify-center
      mobile:p-2
      tablet:items-center
      tablet:justify-center
      tablet:flex-row
      tablet:p-4
      flex-row  
      p-2
      justify-start
      items-start
      "
      onClick={() => router.push(`/articles/${seoUrl}`)}
    >
      <div className=" justify-start items-start">
        <CldImage
          src={imageUrl ?? "images/homgepage/boss.png"}
          alt="default alt text"
          width={200}
          height={250}
          className="object-cover rounded-lg hover:scale-110 transition"
        />
      </div>
      <div className="flex flex-col gap-4 px-4 mobile:items-start mobile:justify-start tablet:items-center tablet:justify-center justify-between">
        <p className="font-bold pl-2 mobile:p-0 text-left mobile:max-w-48 mobile:text-[14px] tablet:max-w-48 max-w-60 text-[#3F291B] cursor-pointer ">
          {title}
        </p>
        <Button
          onClick={() => router.push(`/articles/${seoUrl}`)}
          className="bg-white pt-4 mobile:pt-2 text-[12px] place-self-start font-bold text-[#D7A444] desktop:text-[16px] mini-laptop:text-xs"
          size="sm"
          aria-label="Find location"
        >
          XEM CHI TIẾT
        </Button>
      </div>
    </div>
  );
}