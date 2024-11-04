import React from 'react';
import { useForm } from 'react-hook-form';

interface ShippingFormProps {
  onSubmit: (data: ShippingFormData) => void;
  isLoading: boolean;
}

interface ShippingFormData {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  note?: string;
}

const ShippingForm: React.FC<ShippingFormProps> = ({ onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-6">Thông tin giao hàng</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Họ và tên</label>
          <input
            type="text"
            {...register('fullName', { required: 'Vui lòng nhập họ tên' })}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#7A0505]"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Số điện thoại</label>
          <input
            type="tel"
            {...register('phone', {
              required: 'Vui lòng nhập số điện thoại',
              pattern: {
                value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                message: 'Số điện thoại không hợp lệ',
              },
            })}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#7A0505]"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            {...register('email', {
              required: 'Vui lòng nhập email',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email không hợp lệ',
              },
            })}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#7A0505]"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Địa chỉ</label>
          <input
            type="text"
            {...register('address', { required: 'Vui lòng nhập địa chỉ' })}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#7A0505]"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tỉnh/Thành phố</label>
          <input
            type="text"
            {...register('city', { required: 'Vui lòng nhập tỉnh/thành phố' })}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#7A0505]"
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Ghi chú</label>
          <textarea
            {...register('note')}
            rows={4}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#7A0505]"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full mt-6 bg-[#7A0505] text-white py-3 rounded-full font-bold hover:bg-[#900] transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Đang xử lý...' : 'Đặt hàng'}
      </button>
    </form>
  );
};

export default ShippingForm;