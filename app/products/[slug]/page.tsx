"use client";
import { useEffect, useState } from 'react';
import StrapiAPI from '@/utils/globalApi';
import { useRouter } from 'next/router';

export default function SpecificProduct() {

    const route = useRouter();
    const { slug } = route.query;

    interface Product {
        name: string;
        description: string;
        // Add other properties as needed
    }

    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        StrapiAPI.getOneProduct(String(slug)).then((res: any) => {
            setProduct(res?.data);
        }).catch((error) => {
            console.error("Error fetching product:", error);
        });
    }, [slug]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Product: {slug}</h1>
            {product && (
                <div>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                </div>
            )}
        </div>
    );
}
