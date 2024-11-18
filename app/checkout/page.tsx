'use client'
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { clearCart } from '@/redux/features/cart/cartSlice';
import { RootState } from '@/store/store';
import OrderSummary from '../../components/checkout/OrderSummary';
import { orderService } from '@/utils/order/orderApi';
import AddressSelector from '@/components/checkout/AddressSelector';
import { userAddressService } from '@/utils/user-address/userAddressApi';
import { ShippingFormData, UserAddress } from '@/interfaces/user-address';
import AddressDialog from '@/components/affiliate-dashboard/AddressDialog';

const CheckoutPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.cart);
  const user = useSelector((state: RootState) => state.auth.user);
  
  const [isLoading, setIsLoading] = useState(false);
  const [addresses, setAddresses] = useState<UserAddress[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<UserAddress | null>(null);
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);

  useEffect(() => {
    if (user?.id) {
      loadUserAddresses();
    }
  }, [user]);

  const loadUserAddresses = async () => {
    try {
      const addresses = await userAddressService.getUserAddresses(user!.id);
      if (addresses.length === 0) {
        setIsAddressDialogOpen(true);
      }
      setAddresses(addresses);
    } catch (error) {
      console.error('Failed to load addresses:', error);
      toast.error('Không thể tải danh sách địa chỉ');
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
        referralCode,
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

  const handleAddressSubmit = async (data: ShippingFormData) => {
    try {
      const newAddress = await userAddressService.createAddress(data);
      await loadUserAddresses(); // Reload the addresses list
      setIsAddressDialogOpen(false);
      toast.success('Thêm địa chỉ mới thành công');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Có lỗi xảy ra khi thêm địa chỉ';
      toast.error(errorMessage);
    }
  };

  if (!user) {
    router.push('/authentication/login');
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Thanh toán</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <AddressSelector
            userId={user.id}
            addresses={addresses}
            onAddressSelect={setSelectedAddress}
            onCreateNew={() => setIsAddressDialogOpen(true)}
            onOrder={handleOrderWithSelectedAddress}
            isLoading={isLoading}
          />

          <AddressDialog
            isOpen={isAddressDialogOpen}
            onClose={() => setIsAddressDialogOpen(false)}
            onSubmit={handleAddressSubmit}
            initialData={{
              user_id: user.id,
              receiver_name: user.fullname || '',
              phone_number: user.phone_number || '',
              province: '',
              district: '',
              ward: '',
              street_address: '',
              notes: '',
              is_default: addresses.length === 0 // Set as default if it's the first address
            }}
          />
        </div>
        <div>
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;