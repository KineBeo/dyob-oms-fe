
    "use client";
    import useSWR from "swr";
    import { useRouter } from "next/navigation";
    import Loading from "../Loading";
    import * as strapi from "@/utils/globalApi";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { CldImage } from "next-cloudinary";


    export default function MoreAritcles(){
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
      <div className="max-w-5xl mx-auto gap-4 grid grid-cols-2 mobile:grid-cols-1 tablet:grid-cols-1 mobile:gap-2 ">
        <div className="flex flex-col items-start">
          <h1 className=" font-bold font-robotoslab text-[#7A0505] text-2xl text-center mobile:text-xl tablet:text-xl mini-laptop:text-xl">
            THÔNG TIN SỨC KHỎE
          </h1>
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
                    className="h-full flex flex-col"
                    onClick={() => router.push(`/articles/${article.seoUrl}`)}
                  >
                    <CardBody className="overflow-hidden p-0 flex-grow">
                      <Image
                        alt={article.title}
                        className="w-full object-cover h-[170px]" // Tăng chiều cao cố định
                        radius="lg"
                        shadow="sm"
                        src={article.image.url}
                        width="100%"
                      />
                    </CardBody>
                    <CardFooter className="text-small justify-between">
                      <p className="line-clamp-2 font-bold text-[#3F291B]">
                        {article.title}
                      </p>
                    </CardFooter>
                  </Card>
                </div>
              ))}
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className=" font-bold font-robotoslab text-[#7A0505] text-2xl text-center mobile:text-xl tablet:text-xl mini-laptop:text-xl">
            TIN TỨC SỰ KIỆN
          </h1>
          <div className="flex flex-col items-start ">
            {articleList
              ?.filter((article) => article.topic?.title === "tin-tuc-su-kien")
              .map((article) => (
                <div key={article.id} className=" h-full">
                  {Event(article.image.url, article.title, article.seoUrl)}
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
      tablet:text-center
      tablet:items-center
      tablet:justify-center
      tablet:flex-row
      tablet:p-4
      p-4
      flex-row  
      justify-start
      items-start
      "
          onClick={() => router.push(`/articles/${seoUrl}`)}
        >
          <div className="flex justify-start items-start">
            <CldImage
              src={imageUrl ?? "images/homgepage/boss.png"}
              alt="default alt text"
              width={170}
              height={220}
              className="object-cover rounded-lg hover:scale-110 transition"
            />
          </div>
          <div className="flex px-4 mobile:items-center mobile:justify-center tablet:items-center tablet:justify-center items-start justify-center">
            <p className="font-bold mobile:max-w-48  tablet:max-w-48 max-w-60 text-[#3F291B] cursor-pointer ">
              {title}
            </p>
          </div>
        </div>
      );
    }