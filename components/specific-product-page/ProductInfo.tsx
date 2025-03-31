import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CldImage } from 'next-cloudinary';
import { FaStar, FaChevronLeft, FaChevronRight, FaMinus, FaPlus, FaFacebookMessenger } from 'react-icons/fa';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { cartService } from '@/utils/cart/cartApi';
import { RootState } from '@/store/store';
import { productService } from '@/utils/product/productApi';
import Link from 'next/link';
import { SiZalo } from 'react-icons/si';

interface ProductInfoProps {
  name: string;
  price: string;
  old_price?: string;
  images: string[];
}

const ProductInfo: React.FC<ProductInfoProps> = ({ name, price,old_price, images }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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
      const product_id_from_backend = await productService.findOneByName(name);

      const cartItem = {
        id: Date.now(),
        product_id: product_id_from_backend.id,
        quantity,
        name,
        price,
        image: images[0],
        user_id: user?.id ?? 0,
      };

      dispatch(addToCart(cartItem));
      await cartService.addToCart({
        user_id: cartItem.user_id,
        product_id: cartItem.product_id,
        quantity: cartItem.quantity,
      });
      toast.success('Thêm vào giỏ hàng thành công!');
      router.push('/cart');
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
  };

  return (
    <div className="flex desktop:flex-row laptop:flex-row mini-laptop:flex-row flex-col gap-8 mx-auto p-4 max-w-7xl">
      <div className="md:w-1/2 flex flex-col justify-between">
        <div className="mb-4 flex justify-center items-center ">
          <CldImage
            src={images[currentImageIndex]}
            width={500}
            height={500}
            alt={name}
            className="rounded-lg w-full h-full max-h-[500px] object-contain"
          />
        </div>
        <div className="relative">
          <div className="flex justify-center gap-4 overflow-hidden">
            {images.map((src, index) => (
              <CldImage
                key={index}
                src={src}
                width={100}
                height={100}
                alt={`${name} thumbnail ${index + 1}`}
                className={`border rounded-lg w-24 h-24 cursor-pointer ${currentImageIndex === index ? "border-[#7A0505]" : ""
                  }`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
          <button
            className="top-1/2 left-0 absolute bg-white shadow p-2 rounded-full -translate-y-1/2"
            onClick={() =>
              setCurrentImageIndex((prev) =>
                prev === 0 ? images.length - 1 : prev - 1
              )
            }
          >
            <FaChevronLeft className="w-4 h-4 hover:scale-105 transition" />
          </button>
          <button
            className="top-1/2 right-0 absolute bg-white shadow p-2 rounded-full -translate-y-1/2"
            onClick={() =>
              setCurrentImageIndex((prev) =>
                prev === images.length - 1 ? 0 : prev + 1
              )
            }
          >
            <FaChevronRight className="w-4 h-4 hover:scale-105 transition" />
          </button>
        </div>
      </div>

      <div className="md:w-1/2">
        <h1 className="mb-4 font-bold text-3xl text-red-900">{name}</h1>

        {/* <div className="flex items-center mb-4">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="w-5 h-5 text-yellow-400" />
          ))}
          <span className="ml-2 text-gray-600">15 reviews</span>
        </div> */}

        <div className="mb-6">
          <div className='flex flex-row gap-2'>
          <div className=''>
            <div className='items-center justify-center font-semibold desktop:text-xl'>
              Chat với chúng tôi để nhận tư vấn
            </div>
          </div>
          <div className='flex flex-row gap-2 items-center'>
              <Link
                href="https://zalo.me/0888280000"
                target="blank"
                className="w-7 h-7 desktop:w-8 desktop:h-8 rounded-full bg-blue-500 flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-all relative z-10"
                aria-label="Zalo"
              >
                <SiZalo className="text-white text-xl" />
              </Link>
              <Link
                href="https://www.facebook.com/profile.php?id=61560826497465&mibextid=LQQJ4d"
                target="blank"
                className="w-7 h-7 desktop:w-8 desktop:h-8 rounded-full bg-blue-500 flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-all relative z-10"
                aria-label="Messenger"
              >
                <FaFacebookMessenger className="text-white text-xl" />
              </Link>
            </div>
            </div>
          <h2 className="mb-4 font-bold text-3xl">
            <div className='flex flex-row gap-2 items-baseline'>
              <div className="text-[#7A0505]">
                {Number(price.replace(/[^0-9.-]+/g, "")).toLocaleString("vi-VN")}đ
              </div>
              <div className="text-lg line-through font-medium opacity-85">
                {Number(old_price?.replace(/[^0-9.-]+/g, "")).toLocaleString("vi-VN")}đ
              </div>
            </div>
          </h2>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex border rounded">
              <button
                className="flex justify-center items-center px-3 py-1 border-r"
                onClick={() => handleQuantityChange(quantity - 1)}
              >
                <FaMinus className="w-3 h-3" />
              </button>
              <input
                type="text"
                className="w-16 text-center"
                value={quantity}
                readOnly
              />
              <button
                className="flex justify-center items-center px-3 py-1 border-l"
                onClick={() => handleQuantityChange(quantity + 1)}
              >
                <FaPlus className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="gap-4 grid grid-flow-col">
            <button
              onClick={handleBuyNow}
              className="justify-center items-center bg-[#7A0505] px-6 py-2 rounded-full font-bold text-white hover:scale-105 transition"
            >
              Mua ngay
            </button>
            <button
              onClick={handleAddToCart}
              className="justify-center items-center border-[#7A0505] px-6 py-2 border rounded-full font-bold text-[#7A0505] hover:scale-105 transition"
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;