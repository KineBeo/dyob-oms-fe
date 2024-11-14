import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/cart/",
          "/orders/",
          "/authentication/login",
          "/authentication/register",
          "/checkout",
          "/order-success",
        ],
      },
    ],
    sitemap: "https://dongyongbut.com.vn/sitemap.xml",
  };
}
