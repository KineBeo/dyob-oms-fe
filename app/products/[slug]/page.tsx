"use client";
import { useEffect, useState } from 'react';
import StrapiAPI from '@/utils/globalApi';

export default function SpecificProduct({ params }: { params: { slug: string } }) {
    const slug = params.slug;

    interface Product {
        [x: string]: any;
        // Add other properties of the product here
    }

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                console.log('Fetching product...');
                const data = await StrapiAPI.getOneProduct(slug); // Resolve the Promise
                console.log(data);
                setProduct(data); // Set the fetched product to state
                setLoading(false);
            } catch (err) {
                setError('Failed to load product');
                setLoading(false);
            }
        };

        fetchProduct();
    }, [slug]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            {product ? (
                <>
                    <p>Name: {product.data[0]?.Name}</p>
                    <p>Price: {product.data[0]?.Price}</p>
                </>
            ) : (
                <p>No product found</p>
            )}
        </div>
    );
}
