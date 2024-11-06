import React from 'react';
import { useForm } from 'react-hook-form';






const PHONE_REGEX = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;


interface ShippingFormData {
 fullName: string;
 phone: string;
 email: string;
 address: string;
 city: string;
 note?: string;
 referralCode?: string;
}


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
 } = useForm<ShippingFormData>(
   {
     defaultValues: {
       fullName: defaultValues?.fullName || '',
       phone: defaultValues?.phone || '',
       email: defaultValues?.email || '',
       address: defaultValues?.address || '',
       city: defaultValues?.city || '',
       note: defaultValues?.note || '',
       referralCode: defaultValues?.referralCode || ''
     }
   }
 );


 const formValues = watch();


 return (
   <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow">
     {/* Thông tin cá nhân */}
     <div className="space-y-4">
       <h2 className="text-xl font-semibold text-gray-900">Thông tin cá nhân</h2>


       {/* Họ và tên */}
       <div>
         <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
           Họ và tên <span className="text-red-500">*</span>
         </label>
         <input
           id="fullName"
           type="text"
           {...register('fullName', {
             required: 'Vui lòng nhập họ tên',
             minLength: {
               value: 2,
               message: 'Họ tên phải có ít nhất 2 ký tự'
             },
             maxLength: {
               value: 50,
               message: 'Họ tên không được quá 50 ký tự'
             }
           })}
           className={`mt-1 block w-full rounded-md border ${errors.fullName ? 'border-red-300' : 'border-gray-300'
             } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
         />
         {errors.fullName && (
           <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
         )}
       </div>


       {/* Số điện thoại */}
       <div>
         <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
           Số điện thoại <span className="text-red-500">*</span>
         </label>
         <input
           id="phone"
           type="tel"
           {...register('phone', {
             required: 'Vui lòng nhập số điện thoại',
             pattern: {
               value: PHONE_REGEX,
               message: 'Số điện thoại không hợp lệ'
             }
           })}
           className={`mt-1 block w-full rounded-md border ${errors.phone ? 'border-red-300' : 'border-gray-300'
             } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
         />
         {errors.phone && (
           <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
         )}
       </div>


       {/* Email */}
       <div>
         <label htmlFor="email" className="block text-sm font-medium text-gray-700">
           Email <span className="text-red-500">*</span>
         </label>
         <input
           id="email"
           type="email"
           {...register('email', {
             required: 'Vui lòng nhập email',
             pattern: {
               value: EMAIL_REGEX,
               message: 'Email không hợp lệ'
             }
           })}
           className={`mt-1 block w-full rounded-md border ${errors.email ? 'border-red-300' : 'border-gray-300'
             } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
         />
         {errors.email && (
           <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
         )}
       </div>
     </div>


     {/* Thông tin giao hàng */}
     <div className="space-y-4 pt-4">
       <h2 className="text-xl font-semibold text-gray-900">Thông tin giao hàng</h2>


       {/* Địa chỉ */}
       <div>
         <label htmlFor="address" className="block text-sm font-medium text-gray-700">
           Địa chỉ <span className="text-red-500">*</span>
         </label>
         <input
           id="address"
           type="text"
           {...register('address', {
             required: 'Vui lòng nhập địa chỉ',
             minLength: {
               value: 5,
               message: 'Địa chỉ phải có ít nhất 5 ký tự'
             }
           })}
           className={`mt-1 block w-full rounded-md border ${errors.address ? 'border-red-300' : 'border-gray-300'
             } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
           placeholder="Số nhà, tên đường"
         />
         {errors.address && (
           <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
         )}
       </div>


       {/* Thành phố */}
       <div>
         <label htmlFor="city" className="block text-sm font-medium text-gray-700">
           Thành phố <span className="text-red-500">*</span>
         </label>
         <select
           id="city"
           {...register('city', {
             required: 'Vui lòng chọn thành phố'
           })}
           className={`mt-1 block w-full rounded-md border ${errors.city ? 'border-red-300' : 'border-gray-300'
             } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
         >
           <option value="">Chọn thành phố</option>
           <option value="Hà Nội">Hà Nội</option>
           <option value="Hồ Chí Minh">Hồ Chí Minh</option>
           <option value="Đà Nẵng">Đà Nẵng</option>
           <option value="Hải Phòng">Hải Phòng</option>
           <option value="Cần Thơ">Cần Thơ</option>
         </select>
         {errors.city && (
           <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
         )}
       </div>


       {/* Ghi chú */}
       <div>
         <label htmlFor="note" className="block text-sm font-medium text-gray-700">
           Ghi chú
         </label>
         <textarea
           id="note"
           {...register('note')}
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
         className={`w-full rounded-md px-4 py-3 text-base font-medium text-white shadow-sm
         ${isLoading
             ? 'bg-gray-400 cursor-not-allowed'
             : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
           }`}
       >
         {isLoading ? (
           <div className="flex items-center justify-center">
             <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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