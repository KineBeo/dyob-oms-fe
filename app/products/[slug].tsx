// pages/products/[id].tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function SpecificProduct() {
    const router = useRouter();
    const { id } = router.query;  // Lấy id từ route

    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (id) {
            // Gọi API lấy thông tin sản phẩm dựa trên ID
            axios.get(`/api/products/${id}`)
                .then((response) => {
                    setProduct(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching product data:", error);
                });
        }
    }, [id]);

    if (!product) return <div>Loading...</div>;

    return (
        <div>
            DONE
        </div>
    );
};