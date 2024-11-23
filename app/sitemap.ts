import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://dongyongbut.com.vn/',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://dongyongbut.com.vn/favicon.ico',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 2,
    },
    {
      url: 'https://dongyongbut.com.vn/products',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://dongyongbut.com.vn/about-us-normal',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: 'https://dongyongbut.com.vn/about-us',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: 'https://dongyongbut.com.vn/products/bao-phe-ong-but-tre-em',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ]
}