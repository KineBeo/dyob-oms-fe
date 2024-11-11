"use client"
import { useParams } from "next/navigation";
import * as strapi from "../../../utils/globalApi";
import useSWR from "swr";
import ReactMarkdown from "react-markdown";
import Loading from "@/components/Loading";


export default function Article() {
  const { seoUrl } = useParams<{ seoUrl: string }>();
  console.log(seoUrl)
  const { data, isLoading, error } = useSWR("articles" + { seoUrl }, async () => {
    const response: ArticleResponse = await strapi.getOneArticle(seoUrl);
    console.log(response);
    return response;
  });

  if (error) return <div>Error loading article data</div>;

  const article = data?.data.find((article) => article.seoUrl === seoUrl);
  if (!article) return <Loading />;
  if (isLoading) return <Loading />;


  return (
    <div className="mx-auto max-w-none prose">
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
                <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>
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
  );
}