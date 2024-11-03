'use client'
import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/store/store';

const CartSummary = () => {
  const router = useRouter();
  const items = useSelector((state: RootState) => state.cart.items);

  const subtotal = items.reduce(
    (sum, item) =>
      sum + Number(item.price.replace(/[^0-9.-]+/g, '')) * item.quantity,
    0
  );

  const shipping = 30000; // Fixed shipping cost
  const total = subtotal + shipping;

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-bold mb-4">Tổng đơn hàng</h2>
      <div className="space-y-2">
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
            <span>{total.toLocaleString('vi-VN')}đ</span>
          </div>
        </div>
      </div>
      <button
        onClick={() => router.push('/checkout')}
        className="w-full mt-4 bg-[#7A0505] text-white py-2 rounded-full font-bold hover:bg-[#900] transition"
      >
        Tiến hành đặt hàng
      </button>
    </div>
  );
};

export default CartSummary;