import { ShippingFormData } from '@/interfaces/user-address';
import React from 'react';
import { useForm } from 'react-hook-form';

interface ShippingFormProps {
  onSubmit: (data: ShippingFormData) => void;
  isLoading: boolean;
  defaultValues?: Partial<ShippingFormData>;
}

const ShippingForm: React.FC<ShippingFormProps> = ({ onSubmit, isLoading, defaultValues }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ShippingFormData>({
    defaultValues: {
      user_id: defaultValues?.user_id || 0,
      receiver_name: defaultValues?.receiver_name || '',
      phone_number: defaultValues?.phone_number || '',
      province: defaultValues?.province || '',
      district: defaultValues?.district || '',
      ward: defaultValues?.ward || '',
      street_address: defaultValues?.street_address || '',
      notes: defaultValues?.notes || '',
      is_default: defaultValues?.is_default || false,
      referralCode: defaultValues?.referralCode || '',
    },
  });

  const formValues = watch();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6bg-white p-6 rounded-lg shadow">
      {/* Thông tin cá nhân */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Thông tin cá nhân</h2>

        {/* Họ và tên */}
        <div>
          <label htmlFor="receiver_name" className="block text-sm font-medium text-gray-700">
            Họ và tên <span className="text-red-500">*</span>
          </label>
          <input
            id="receiver_name"
            type="text"
            {...register('receiver_name', {
              required: 'Vui lòng nhập họ tên',
              minLength: {
                value: 6,
                message: 'Họ tên phải có ít nhất 6 ký tự',
              },
              maxLength: {
                value: 50,
                message: 'Họ tên không được quá 50 ký tự',
              },
            })}
            className={`mt-1 block w-full rounded-md border ${
              errors.receiver_name ? 'border-red-300' : 'border-gray-300'
            } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
          />
          {errors.receiver_name && (
            <p className="mt-1 text-sm text-red-600">{errors.receiver_name.message}</p>
          )}
        </div>

        {/* Số điện thoại */}
        <div>
          <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
            Số điện thoại <span className="text-red-500">*</span>
          </label>
          <input
            id="phone_number"
            type="tel"
            {...register('phone_number', {
              required: 'Vui lòng nhập số điện thoại',
              pattern: {
                value: /^0\d{9}$/,
                message: 'Số điện thoại không hợp lệ',
              },
            })}
            className={`mt-1 block w-full rounded-md border ${
              errors.phone_number ? 'border-red-300' : 'border-gray-300'
            } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
          />
          {errors.phone_number && (
            <p className="mt-1 text-sm text-red-600">{errors.phone_number.message}</p>
          )}
        </div>
      </div>

      {/* Thông tin giao hàng */}
      <div className="space-y-4 pt-4">
        <h2 className="text-xl font-semibold text-gray-900">Thông tin giao hàng</h2>

        {/* Tỉnh/Thành phố */}
        <div>
          <label htmlFor="province" className="block text-sm font-medium text-gray-700">
            Tỉnh/Thành phố <span className="text-red-500">*</span>
          </label>
          <input
            id="province"
            type="text"
            {...register('province', {
              required: 'Vui lòng nhập tỉnh/thành phố',
            })}
            className={`mt-1 block w-full rounded-md border ${
              errors.province ? 'border-red-300' : 'border-gray-300'
            } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
          />
          {errors.province && (
            <p className="mt-1 text-sm text-red-600">{errors.province.message}</p>
          )}
        </div>

        {/* Quận/Huyện */}
        <div>
          <label htmlFor="district" className="block text-sm font-medium text-gray-700">
            Quận/Huyện <span className="text-red-500">*</span>
          </label>
          <input
            id="district"
            type="text"
            {...register('district', {
              required: 'Vui lòng nhập quận/huyện',
            })}
            className={`mt-1 block w-full rounded-md border ${
              errors.district ? 'border-red-300' : 'border-gray-300'
            } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
          />
          {errors.district && (
            <p className="mt-1 text-sm text-red-600">{errors.district.message}</p>
          )}
        </div>

        {/* Xã/Phường */}
        <div>
          <label htmlFor="ward" className="block text-sm font-medium text-gray-700">
            Xã/Phường <span className="text-red-500">*</span>
          </label>
          <input
            id="ward"
            type="text"
            {...register('ward', {
              required: 'Vui lòng nhập xã/phường',
            })}
            className={`mt-1 block w-full rounded-md border ${
              errors.ward ? 'border-red-300' : 'border-gray-300'
            } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
          />
          {errors.ward && (
            <p className="mt-1 text-sm text-red-600">{errors.ward.message}</p>
          )}
        </div>

        {/* Địa chỉ */}
        <div>
          <label htmlFor="street_address" className="block text-sm font-medium text-gray-700">
            Địa chỉ <span className="text-red-500">*</span>
          </label>
          <input
            id="street_address"
            type="text"
            {...register('street_address', {
              required: 'Vui lòng nhập địa chỉ',
              minLength: {
                value: 5,
                message: 'Địa chỉ phải có ít nhất 5 ký tự',
              },
            })}
            className={`mt-1 block w-full rounded-md border ${
              errors.street_address ? 'border-red-300' : 'border-gray-300'
            } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
            placeholder="Số nhà, tên đường"
          />
          {errors.street_address && (
            <p className="mt-1 text-sm text-red-600">{errors.street_address.message}</p>
          )}
        </div>

        {/* Ghi chú */}
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
            Ghi chú
          </label>
          <textarea
            id="notes"
            {...register('notes')}
            rows={3}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
          />
        </div>

        {/* Mã giới thiệu */}
        <div>
          <label htmlFor="referralCode" className="block text-sm font-medium text-gray-700">
            Mã giới thiệu (không bắt buộc)
          </label>
          <input
            id="referralCode"
            type="text"
            {...register('referralCode')}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Nhập mã giới thiệu nếu có"
          />
        </div>
      </div>

      {/* Button đặt hàng */}
      <div className="pt-6">
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full rounded-md px-4 py-3 text-base font-medium text-white shadow-sm ${
            isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Đang xử lý...
            </div>
          ) : (
            'Đặt hàng'
          )}
        </button>
      </div>
    </form>
  );
};

export default ShippingForm;