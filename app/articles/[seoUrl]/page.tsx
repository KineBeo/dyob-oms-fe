"use client"
import { useParams } from "next/navigation";
import * as strapi from "../../../utils/globalApi";
import useSWR from "swr";
import ReactMarkdown from "react-markdown";
import Loading from "@/components/Loading";
import { FaCalendarAlt } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";



export default function Article() {
  const { seoUrl } = useParams<{ seoUrl: string }>();
  console.log(seoUrl)

  const { data, isLoading, error } = useSWR("article" + { seoUrl }, async () => {
    const response: ArticleResponse = await strapi.getOneArticle(seoUrl);
    console.log(response);
    return response;
  });

  const { data : articlesData , isLoading : isLoadingArticles , error : errorArticles } = useSWR(
      "otherarticle",
     async () => {
       const response: ArticleResponse = await strapi.getAllArticles();
       return response;
     }
   );

  if (isLoading || isLoadingArticles) return <Loading />;
  if (error || errorArticles) return <div>Error loading article data</div>;
  const otherArticelList = articlesData?.data
  const article = data?.data.find((article) => article.seoUrl === seoUrl);
  if (!article) return <Loading />;
  const date = new Date(article?.createdAt);

  // Lấy ngày
  const day = date.getDate(); // 15

  // Lấy tháng (lưu ý: tháng trong JS bắt đầu từ 0)
  const month = date.getMonth() + 1; // 2

  // Lấy năm
  const year = date.getFullYear(); // 2024
  // Định dạng đầy đủ
  const formattedDate = `${day}/${month}/${year}`; 
  return (
    <div>
      {/* header */}
      <div className="flex flex-col items-center justify-center bg-[#3F291B] w-full h-36 mobile:h-32 tablet:h-40">
        <p className=" font-robotoslab text-[#D7A444] font-semibold text-2xl text-left mobile:text-2xl tablet:text-2xl mini-laptop:text-2xl">
          {" "}
          Câu chuyện khách hàng{" "}
        </p>
      </div>
      <div className="grid grid-cols-5 mobile:flex mobile:flex-col tablet:flex tablet:flex-col">
        <div className="mx-auto max-w-none prose col-span-4 ">
          {/* title */}

          <div className="max-w-4xl mx-auto px-4 pt-8">
            <p className="text-2xl font-bold text-[#3F291B] ">{article.name}</p>
            <div className="flex flex-row py-1 px-4 rounded-4xl  bg-slate-200 ">
              <FaCalendarAlt className="mt-1 text-[#D7A444]" />
              <p className="px-4 ">{formattedDate}</p>
              <RxAvatar className="mt-1 text-[#D7A444] " />
              <p className="px-2">Tác giả: Đỗ Minh Đường</p>
            </div>
          </div>
          {/* content */}
          <article className="mx-auto px-4 py-8 max-w-4xl">
            <div className="max-w-none prose prose-lg prose-slate">
              <ReactMarkdown
                components={{
                  h3: ({ children }) => (
                    <h3 className="mb-6 font-bold text-3xl text-gray-900">
                      {children}
                    </h3>
                  ),
                  h4: ({ children }) => (
                    <h4 className="mb-4 font-semibold text-2xl text-gray-800">
                      {children}
                    </h4>
                  ),
                  p: ({ children }) => (
                    <p className="mb-4 text-gray-700 leading-relaxed">
                      {children}
                    </p>
                  ),
                  img: ({ src, alt }) => (
                    <div className="relative my-8">
                      <img
                        src={src}
                        alt={alt || "Article image"}
                        className="shadow-lg rounded-lg w-full max-h-[500px] object-cover"
                        loading="lazy"
                      />
                    </div>
                  ),
                }}
              >
                {article.content}
              </ReactMarkdown>
            </div>
          </article>
        </div>
        {/* Tin khác */}
        <div className="flex flex-col">
          <p className="font-bold text-[#3F291B] text-2xl py-8 mobile:py-2 tablet:py-2 mobile:px-4 tablet:px-4 ">
            Tin khác
          </p>
          {otherArticelList?.map((article) => (
            <div key={article.id}>
              {OtherArticles(article.image.url, article.name, article.seoUrl)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


function OtherArticles(imageUrl : string , title : string , seoUrl : string){
   const router = useRouter();
  return (
    <div
      className="flex flex-col mobile:flex-row tablet:flex-row cursor-pointer px-4 py-4"
      onClick={() => router.push(`/articles/${seoUrl}`)}
    >
      <CldImage
        src={imageUrl ?? "images/homgepage/boss.png"}
        alt="default alt text"
        width={200}
        height={100}
        className="object-cover"
      />
      <p className="font-semibold max-w-48">{title}</p>
    </div>
  );
}