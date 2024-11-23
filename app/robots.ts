import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const domain = "https://dongyongbut.com.vn";

  return {
    rules: [
      {
        userAgent: "Googlebot",
        allow:[
          "/",
          "/sitemap.xml",
          "/favicon.ico",
          "/products",
          "/about-us-normal",
          "/about-us",
        ],
        disallow: [
          "/cart/",
          "/orders/",
          "/authentication/login",
          "/authentication/register",
          "/checkout",
          "/order-success",
          "/admin-dashboard",
          "/affiliate-dashboard",
        ],
      },
      {
        userAgent: "GPTBot",
        disallow: ["/"],    // Block AI crawling if desired
      },
      {
        userAgent: "Bingbot",
        allow: ["/"],
        crawlDelay: 1,      // Rate limiting for Bing bot
      },
    ],
    sitemap: `${domain}/sitemap.xml`,    // Main sitemap
    host: domain,                         // Specify preferred domain
  };
}
