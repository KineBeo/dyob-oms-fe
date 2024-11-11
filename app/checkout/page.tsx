'use client'
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { clearCart } from '@/redux/features/cart/cartSlice';
import { RootState } from '@/store/store';
import OrderSummary from '../../components/checkout/OrderSummary';
import ShippingForm, { ShippingFormData } from '../../components/checkout/ShippingForm';
import { orderService } from '@/utils/order/orderApi';
import AddressSelector from '@/components/checkout/AddressSelector';
import { userAddressApi } from '@/utils/user-address/userAddressApi';
import { UserAddress } from '@/interfaces/user-address';

interface ShippingInfo {
  user_id: number;
  referral_code_of_referrer: string;
  shipping_address_id: number;
}

const CheckoutPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.cart);
  const user = useSelector((state: RootState) => state.auth.user);
  const [isLoading, setIsLoading] = useState(false);
  const [addresses, setAddresses] = useState<UserAddress[]>([]);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<UserAddress | null>(null);

  useEffect(() => {
    if (user?.id) {
      loadUserAddresses();
    }
  }, [user]);

  const loadUserAddresses = async () => {
    try {
      const addresses = await userAddressApi.getUserAddresses(user!.id);
      setAddresses(addresses);

      if (addresses.length === 0) {
        setShowNewAddressForm(true);
      }
    } catch (error) {
      console.error('Failed to load addresses:', error);
    }
  };

  const handleOrderWithSelectedAddress = async (referralCode: string) => {
    if (!selectedAddress || !user?.id) {
      toast.error('Vui lòng chọn địa chỉ giao hàng');
      return;
    }

    setIsLoading(true);
    try {
      const order = await orderService.createOrder(
        user.id,
        referralCode, // Sử dụng referralCode được truyền vào
        selectedAddress.id
      );

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


  const handleSubmitOrder = async (data: ShippingFormData) => {
    setIsLoading(true);
    try {
      if (!user?.id) {
        toast.error('Vui lòng đăng nhập để đặt hàng');
        router.push('/authentication/login');
        return;
      }

      let addressId: number;

      if (showNewAddressForm) {
        // Create new address
        const newAddress = await userAddressApi.createAddress(data);
        addressId = newAddress.id;
      } else {
        if (!selectedAddress) {
          toast.error('Vui lòng chọn địa chỉ giao hàng');
          return;
        }
        addressId = selectedAddress.id;
      }

      // Create order with the address
      const order = await orderService.createOrder(
        user.id,
        data.referralCode || '',
        addressId
      );

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

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Thanh toán</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {!showNewAddressForm && addresses.length > 0 ? (
            <AddressSelector
              userId={user?.id || 0}
              addresses={addresses}
              onAddressSelect={setSelectedAddress}
              onCreateNew={() => setShowNewAddressForm(true)}
              onOrder={handleOrderWithSelectedAddress}
              isLoading={isLoading}
            />
          ) : (
            <ShippingForm
              onSubmit={handleSubmitOrder}
              isLoading={isLoading}
              defaultValues={{
                user_id: user?.id || 0,
                receiver_name: user?.fullname || '',
                phone_number: user?.phone_number || '',
                province: '',
                district: '',
                ward: '',
                street_address: '',
                notes: '',
                referralCode: '',
              }}
            />
          )}
        </div>
        <div>
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;