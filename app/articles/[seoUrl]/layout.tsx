import { Metadata } from "next";
import * as strapi from '../../../utils/globalApi';

interface GenerateMetadataProps {
    params: { seoUrl: string }
  }
  
  export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
    try {
      const response: ArticleResponse = await strapi.getOneArticle(params.seoUrl);
      const article = response.data.find((a) => a.seoUrl === params.seoUrl);
  
      if (!article) {
        return {
          title: 'Article Not Found',
          description: 'The requested article could not be found'
        };
      }
  
      return {
        title: article.title,
        description: article.quote || article.content.substring(0, 155),
        openGraph: {
          title: article.title,
          description: article.quote || article.content.substring(0, 155),
          type: 'article',
          images: [
            {
              url: article.image.url,
              width: 1200,
              height: 630,
              alt: article.title,
            }
          ],
        },
        twitter: {
          card: 'summary_large_image',
          title: article.title,
          description: article.quote,
          images: [article.image.url],
        }
      };
    } catch (error) {
      return {
        title: 'Error',
        description: 'Error loading article data',
      };
    }
  }
  
  export default function ArticleLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return children;
  }