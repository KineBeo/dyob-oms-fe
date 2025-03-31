"use client";

import { Card, CardHeader, CardBody, CardFooter, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { IoCartOutline } from "react-icons/io5";
import { CardDescription, CardTitle } from "../ui/card";
import { CldImage } from "next-cloudinary";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import toast from "react-hot-toast";
import { productService } from "@/utils/product/productApi";
import { useState } from "react";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { cartService } from "@/utils/cart/cartApi";

interface ProductCardProps {
    image_url: string,
    title: string,
    price: string,
    old_price: string,
    slug: string
}

export default function ProductCard(props: ProductCardProps) {
    const router = useRouter();
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const user = useSelector((state: RootState) => state.auth.user);

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity >= 1 && newQuantity <= 100) {
          setQuantity(newQuantity);
        }
      };

    const handleAddToCart = async () => {
        if (!user || user.id <= 0) {
          toast.error('Vui lòng đăng nhập để thêm vào giỏ hàng');
          router.push('/authentication/login');
          return;
        }
    
        try {
          const product_id_from_backend = await productService.findOneByName(props.title);
    
          const cartItem = {
            id: Date.now(),
            product_id: product_id_from_backend.id,
            quantity,
            name: props.title,
            price: props.price,
            old_price: props.old_price,
            user_id: user?.id ?? 0,
            image: props.image_url,
          };
    
          dispatch(addToCart(cartItem));
          await cartService.addToCart({
            user_id: cartItem.user_id,
            product_id: cartItem.product_id,
            quantity: cartItem.quantity,
          });
          toast.success('Thêm vào giỏ hàng thành công!');
          router.push("/cart");
        } catch (error) {
          console.log('Error adding to cart:', error);
          toast.error('Có lỗi xảy ra khi thêm vào giỏ hàng');
        }
      };

      const handleBuyNow = async () => {
        try {
            await handleAddToCart();
            router.push('/cart');
          } catch (error) {
            toast.error('Có lỗi xảy ra');
          }
      }
    return (
        <Card className="shadow-xl hover:shadow-2xl p-0 w-full h-full cursor-pointer">
            <div onClick={() => router.push(`/products/${props.slug}`)}>
                <CardHeader className="mini-laptop:p-0 flex justify-center items-center bg-[#FBF6EC] px-4 py-4 mobile:p-0 tablet:p-0 h-52">
                    <CldImage
                        alt="Card background"
                        className="w-auto h-full object-contain rounded-xl"
                        src={props.image_url}
                        width={320}
                        height={208}
                        priority
                    />
                </CardHeader>
                <CardBody className="items-left pt-2 h-full">
                    <div className="flex flex-col justify-between">
                        <CardTitle className="line-clamp-1 font-bold text-[#7A0505] text-lg">{props.title}</CardTitle>
                        <CardDescription className="mt-2 font-bold text-lg">
                          <div className="flex flex-col">
                          {props.old_price &&
                            <div className="text-sm line-through opacity-85">
                            {Number(props.old_price.replace(/[^0-9.-]+/g, "")).toLocaleString('vi-VN')}đ
                            </div>
                            }
                            <div className="text-[#7A0505]">
                            {Number(props.price.replace(/[^0-9.-]+/g, "")).toLocaleString('vi-VN')}đ
                            </div>
                          </div>
                          </CardDescription>
                    </div>
                </CardBody>
            </div>

            <CardFooter className="flex-row justify-center items-center gap-4 px-4 pt-0">
                <Button className="bg-[#7A0505] rounded-full w-3/5 font-bold text-white" size="sm" aria-label="Buy now"
                onClick={handleBuyNow}>
                    Mua ngay
                </Button>
                <Button className="bg-[#F0E0CA] rounded-full w-2/5" size="sm" isIconOnly aria-label="Add to Cart"
                onClick={handleAddToCart}>
                    <IoCartOutline className="text-[#7A0505] size-4" />
                </Button>
            </CardFooter>
        </Card>
    )
}