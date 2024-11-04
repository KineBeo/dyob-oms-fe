import React from 'react';
import { useSelector } from 'react-redux';
import { CldImage } from 'next-cloudinary';
import { RootState } from '@/store/store';

const OrderSummary = () => {
  const items = useSelector((state: RootState) => state.cart.items);

  const subtotal = items.reduce(
    (sum, item) =>
      sum + Number(item.price.replace(/[^0-9.-]+/g, '')) * item.quantity,
    0
  );

  const shipping = 0; // Fixed shipping cost
  const total = subtotal + shipping;

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-bold mb-4">Đơn hàng của bạn</h2>
      
      <div className="space-y-4 mb-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center">
            <div className="w-16 h-16 flex-shrink-0">
              <CldImage
                src={item.image}
                width={64}
                height={64}
                alt={item.name}
                className="rounded-lg object-cover"
              />
            </div>
            <div className="ml-4 flex-grow">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-gray-600">SL: {item.quantity}</p>
              <p className="text-sm font-medium">
                {(
                  Number(item.price.replace(/[^0-9.-]+/g, '')) * item.quantity
                ).toLocaleString('vi-VN')}
                đ
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between">
          <span>Tạm tính:</span>
          <span>{subtotal.toLocaleString('vi-VN')}đ</span>
        </div>
        <div className="flex justify-between">
          <span>Phí vận chuyển:</span>
          <span>{shipping.toLocaleString('vi-VN')}đ</span>
        </div>
        <div className="border-t pt-2 mt-2">
          <div className="flex justify-between font-bold">
            <span>Tổng cộng:</span>
            <span className="text-[#7A0505]">
              {total.toLocaleString('vi-VN')}đ
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;