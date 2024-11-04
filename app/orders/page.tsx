// pages/OrdersPage.tsx
'use client'
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { RootState } from '@/store/store';
import OrderCard from '@/components/orders/OrderCard';
import { Order } from '@/interfaces/order';
import { orderService } from '@/utils/order/orderApi';

interface ApiError {
    response?: {
      status: number;
      data?: any;
    };
    message: string;
  }
  
const OrdersPage = () => {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.id) {
        toast.error('Vui lòng đăng nhập để xem đơn hàng');
        router.push('/login');
        return;
      }

      try {
        const data = await orderService.getOrderByUserID(user.id);
        setOrders(data);
      } catch (error: unknown) {
        const err = error as ApiError;
        console.error('Error fetching orders:', err);
        if (err.response?.status === 404) {
          setOrders([]);
        } else {
          toast.error('Không thể tải danh sách đơn hàng');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [user, router]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-gray-200 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Đơn hàng của tôi</h1>
      
      {(orders === undefined || orders.length === 0 ) ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">Bạn chưa có đơn hàng nào</p>
          <button
            onClick={() => router.push('/products')}
            className="px-6 py-2 bg-[#7A0505] text-white rounded-full font-bold hover:bg-[#900] transition"
          >
            Bắt đầu mua sắm
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;