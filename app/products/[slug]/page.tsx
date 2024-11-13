"use client";

import { useParams, usePathname } from 'next/navigation';
import * as strapi from '../../../utils/globalApi';
import useSWR from 'swr';
import { ProductResponse } from '@/utils/api/Product.interface';
import ProductInfo from '@/components/specific-product-page/ProductInfo';
import MoreDetails from '@/components/specific-product-page/MoreDetails';
import OtherProducts from '@/components/specific-product-page/OtherProduct';
import Loading from '../../../components/Loading';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { useEffect } from 'react';

// Hàm tạo slug thân thiện với SEO
const createSEOFriendlySlug = (text: string): string => {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[đĐ]/g, 'd')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .trim();
};

export default function SpecificProduct() {
    const { slug } = useParams<{ slug: string }>();
    const router = useRouter();
    const pathname = usePathname();

    const { data, isLoading, error } = useSWR(
        `products/${slug}`,
        async () => {
            const response: ProductResponse = await strapi.getOneProduct(slug);
            return response;
        },
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: 3600000, // Cache 1 giờ
        }
    );

    const product = data?.data.find((product) => product.slug === slug);

    // Tự động chuyển hướng nếu slug không đúng định dạng
    useEffect(() => {
        if (product && slug !== createSEOFriendlySlug(product.Name)) {
            router.replace(`/products/${createSEOFriendlySlug(product.Name)}`, { scroll: false });
        }
    }, [product, slug, router]);

    if (isLoading && !data) return <Loading />;
    if (error) return <div>Error loading product data</div>;
    if (!product) return <div>Product not found</div>;

    return (
        <>
            <Head>
                <title>{`${product.Name} | Your Store Name`}</title>
                <meta name="description" content={product.Product_details?.substring(0, 155) || 'Product description'} />
                <link rel="canonical" href={pathname} />
                <meta property="og:title" content={product.Name} />
                <meta property="og:description" content={product.Product_details?.substring(0, 155) || 'Product description'} />
                <meta property="og:url" content={pathname} />
                <meta property="og:image" content={product.Main_image.provider_metadata.public_id} />
                <meta property="og:type" content="product" />
                <meta name="robots" content="index, follow" />
            </Head>
            <div>
                <ProductInfo
                    images={[product.Main_image.provider_metadata.public_id,
                    product.Main_image.provider_metadata.public_id,
                    product.Main_image.provider_metadata.public_id]}
                    name={product.Name}
                    price={product.Price}
                />
                <MoreDetails
                    markdown={product.Product_details ?? ''}
                    image={product.Main_image.provider_metadata.public_id || ''}
                />
                <OtherProducts />
            </div>
        </>
    );
}