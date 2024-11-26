import React from 'react';
import Link from 'next/link';
import { FaCheckCircle } from 'react-icons/fa';

const OrderSuccessPage = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <FaCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
      <h1 className="text-3xl font-bold mb-4">Đặt hàng thành công!</h1>
      <p className="text-black mb-8">
        Cảm ơn anh/chị đã đặt hàng. Nhân viên của chúng tôi sẽ liên hệ với anh/chị để xác nhận đơn hàng trong thời gian sớm nhất.
      </p>
      <div className="space-x-4">
        <Link
          href="/products"
          className="inline-block px-6 py-2 bg-[#7A0505] text-white rounded-full font-bold hover:bg-[#900] transition"
        >
          Tiếp tục mua sắm
        </Link>
        <Link
          href="/orders"
          className="inline-block px-6 py-2 border border-[#7A0505] text-[#7A0505] rounded-full font-bold hover:bg-[#7A0505] hover:text-white transition"
        >
          Xem đơn hàng
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccessPage;