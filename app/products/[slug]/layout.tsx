import { Metadata } from 'next';
import * as strapi from '../../../utils/globalApi';
import { headers } from 'next/headers';

interface GenerateMetadataProps {
    params: { slug: string }
}

export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
    try {
        const response = await strapi.getOneProduct(params.slug);
        const product = response.data.find((p) => p.slug === params.slug);
        const headersList = headers();
        const domain = headersList.get('host') || '';
        const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
        const currentUrl = `${protocol}://${domain}`;

        if (!product) {
            return {
                title: 'Product Not Found | Đông Y Ông Bụt',
                description: 'The requested product could not be found',
                robots: {
                    index: false,
                    follow: false,
                },
            };
        }

        const canonicalUrl = `${currentUrl}/products/${params.slug}`;
        const seoDescription = product.Product_details?.substring(0, 155) || 'Product description';

        return {
            title: `${product.Name} | Đông Y Ông Bụt`,
            description: seoDescription,
            robots: {
                index: true,
                follow: true,
            },
            alternates: {
                canonical: canonicalUrl,
            },
            openGraph: {
                title: product.Name,
                description: seoDescription,
                url: canonicalUrl,
                images: [{
                    url: product.Main_image.provider_metadata.public_id,
                    width: 1200,
                    height: 630,
                    alt: product.Name,
                }],
                type: 'website',
            },
        };
    } catch (error) {
        return {
            title: 'Error | Your Store Name',
            description: 'Error loading product data',
            robots: {
                index: false,
                follow: false,
            },
        };
    }
}

export default function ProductLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}