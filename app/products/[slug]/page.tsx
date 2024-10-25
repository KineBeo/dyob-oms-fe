"use client";

import { useParams } from 'next/navigation';
import * as strapi from '../../../utils/globalApi';
import useSWR from 'swr';
import { ProductResponse } from '@/utils/api/Product.interface';
import ProductInfo from '@/components/specific-product-page/ProductInfo';
import MoreDetails from '@/components/specific-product-page/MoreDetails';
import OtherProducts from '@/components/specific-product-page/OtherProduct';
import Loading from '../../../components/Loading';

export default function SpecificProduct() {
    const { slug } = useParams<{ slug: string }>(); // Use useParams to get the slug

    // Fetch the product data
    const { data, isLoading, error } = useSWR('products', async () => {
        const response: ProductResponse = await strapi.getOneProduct(slug);
        console.log(response);
        return response;
    });

    if (isLoading) return <Loading />;
    if (error) return <div>Error loading product data</div>;

    const product = data?.data.find((product) => product.slug === slug);

    if (!product) return <div>Product not found</div>;

    return (
        <div>
            <ProductInfo images={[product.Main_image.url, product.Main_image.url, product.Main_image.url]} name={product.Name} price={product.Price} />
            <MoreDetails markdown={product.Product_details} image={product.Main_image.url} />
            <OtherProducts />
        </div>
    );
}
