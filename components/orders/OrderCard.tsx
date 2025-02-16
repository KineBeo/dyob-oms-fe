import React from 'react';
import { format } from 'date-fns-tz';
import { vi } from 'date-fns/locale';
import { Order, OrderStatus } from '@/interfaces/order';
import ReactMarkdown from 'react-markdown';
import { Button } from '@nextui-org/react';
import { addToCart } from '@/redux/features/cart/cartSlice';
import { cartService } from '@/utils/cart/cartApi';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import CartItems from '../cartpage/CartItem';
import { RootState } from '@/store/store';
import ProductCard from '../cards/ProductCard';

interface OrderCardProps {
  order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.NOT_START_YET:
        return 'bg-yellow-100 text-yellow-800';
      case OrderStatus.ON_GOING:
        return 'bg-blue-100 text-blue-800';
      case OrderStatus.COMPLETED:
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.NOT_START_YET:
        return 'Chờ xử lý';
      case OrderStatus.ON_GOING:
        return 'Đang xử lý';
      case OrderStatus.COMPLETED:
        return 'Hoàn thành';
      default:
        return status;
    }
  };

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return '';
    try {
      return format(new Date(date), 'dd MMMM yyyy, HH:mm', { locale: vi });
    } catch (error) {
      console.error('Date formatting error:', error);
      return '';
    }
  };

  const handleRepurchase = async (order: Order) => {
    try {
      // Add each product from the order back to cart
      for (const item of order.orderProduct || []) {
        dispatch(
          addToCart({
            id: item.product.id,
            product_id: item.product.id,
            quantity: item.quantity,
            name: item.product.name,
            price: item.price,
            image: 'We dont need this',
            user_id: user?.id || 0
          })
        );
        
        await cartService.addToCart({
          user_id: user?.id || 0,
          product_id: item.product.id,
          quantity: item.quantity
        });
      }

      toast.success('Đã thêm sản phẩm vào giỏ hàng');
      router.push('/cart');
    } catch (error) {
      console.error('Error repurchasing order:', error);
      toast.error('Có lỗi xảy ra khi thêm vào giỏ hàng');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold">Đơn hàng #{order.id || 'N/A'}</h3>
          <p className="text-sm text-gray-600">
            {formatDate(order.createdAt)}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status as OrderStatus)}`}
        >
          {getStatusText(order.status as OrderStatus)}
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Người nhận hàng</h4>
          <p className="text-gray-600">{order.snapshot_receiver_name || 'Không có địa chỉ'}</p>
        </div>
        <div>
          <h4 className="font-medium mb-2">Số điện thoại</h4>
          <p className="text-gray-600">{order.snapshot_phone_number || 'Không có địa chỉ'}</p>
        </div>
        <div>
          <h4 className="font-medium mb-2">Địa chỉ giao hàng</h4>
          <p className="text-gray-600">{order.snapshot_full_address || 'Không có địa chỉ'}</p>
        </div>

        <div>
          <h4 className="font-medium mb-2">Sản phẩm</h4>
          <div className="space-y-3">
            {order.orderProduct?.map((item) => (
              <div key={item.id} className="border-b pb-3">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h5 className="font-medium">{item.product.name}</h5>
                    <div className="text-sm text-gray-600">
                      <ReactMarkdown className="line-clamp-2">
                        {item.product.description || 'Không có mô tả'}
                      </ReactMarkdown>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-medium">
                      {Number(item.price).toLocaleString('vi-VN')}đ x {item.quantity}
                    </p>
                    <p className="text-[#7A0505] font-bold">
                      {(Number(item.price) * item.quantity).toLocaleString('vi-VN')}đ
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between">
            <span className="font-bold">Tổng cộng</span>
            <span className="font-bold text-[#7A0505]">
              {Number(order.total_amount).toLocaleString('vi-VN')}đ
            </span>
          </div>
        </div>
        <div className='flex justify-end'>
          <Button className='bg-[#7A0505] font-bold text-white'
            radius='sm'
            size='md'
            onClick={() => handleRepurchase(order)}
          > Mua lại </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;