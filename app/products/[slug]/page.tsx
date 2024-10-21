"use client";
import { useEffect } from 'react';
import StrapiAPI from '@/utils/globalApi';
import { useRouter } from 'next/router';

export default function SpecificProduct() {

    const route = useRouter();
    const { slug } = route.query;

    useEffect(() => {
        StrapiAPI.getOneProduct(String(slug))
            .then((res) => {
                console.log("Product data:", res);
            });
    }, [slug]);


    return (
        <div>

        </div>
    );
}
