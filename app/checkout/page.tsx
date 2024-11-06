'use client'
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { clearCart } from '@/redux/features/cart/cartSlice';
import { RootState } from '@/store/store';
import OrderSummary from '../../components/checkout/OrderSummary';
import ShippingForm from '../../components/checkout/ShippingForm';
import { orderService } from '@/utils/order/orderApi';

interface ShippingInfo {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  note?: string;
  referralCode?: string;
}

const CheckoutPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.cart);
  const user = useSelector((state: RootState) => state.auth.user);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   if (items.length === 0) {
  //     toast.error('Giỏ hàng trống');
  //     router.push('/cart');
  //   }
  // }, [items, router]);

  const handleSubmitOrder = async (shippingInfo: ShippingInfo) => {
    setIsLoading(true);
    try {
      if (!user?.id) {
        toast.error('Vui lòng đăng nhập để đặt hàng');
        router.push('/authentication/login');
        return;
      }

      const refferal_code_of_referrer = shippingInfo.referralCode || '';
      const address = `${shippingInfo.address}, ${shippingInfo.city}`;

      const order = await orderService.createOrder(user.id, refferal_code_of_referrer, address);
      
      if (order) {
        dispatch(clearCart());
        toast.success('Đặt hàng thành công!');
        router.push('/order-success');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Có lỗi xảy ra khi đặt hàng';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // if (items.length === 0) {
  //   return null;
  // }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Thanh toán</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ShippingForm onSubmit={handleSubmitOrder} isLoading={isLoading} defaultValues={
            {
              fullName: user?.fullname || '',
              phone: user?.phone_number || '',
              email: user?.email || '',
            }
          }/>
        </div>
        <div>
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;