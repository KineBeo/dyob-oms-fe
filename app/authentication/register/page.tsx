'use client'
import AuthInput from "@/components/form/AuthInput";
import { ApiErrorResponse, FormErrors, RegisterFormData } from "@/interfaces/auth";
import api from "@/utils/config";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";

export default function Register() {
    const router = useRouter();
    const [formData, setFormData] = useState<RegisterFormData>({
        fullname: '',
        phone_number: '',
        email: '',
        password_hash: '',
        confirmPassword: '',
        referral_code_of_referrer: ''
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        // Fullname validation matching backend requirements
        if (!formData.fullname) {
            newErrors.fullname = 'Họ và tên không được để trống';
        } else if (formData.fullname.length < 6 || formData.fullname.length > 50) {
            newErrors.fullname = 'Họ và tên phải từ 6 đến 50 ký tự';
        }

        // Phone number validation matching backend requirements
        const phoneRegex = /^0\d{9}$/;
        if (!formData.phone_number) {
            newErrors.phone_number = 'Số điện thoại không được để trống';
        } else if (!phoneRegex.test(formData.phone_number) || formData.phone_number.length !== 10) {
            newErrors.phone_number = 'Số điện thoại không hợp lệ (phải là số điện thoại Việt Nam gồm 10 chữ số bắt đầu bằng 0)';
        }

        // Email validation matching backend requirements
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            newErrors.email = 'Email không được để trống';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Email không hợp lệ';
        }

        // Password validation matching backend requirements
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!formData.password_hash) {
            newErrors.password_hash = 'Mật khẩu không được để trống';
        } else if (!passwordRegex.test(formData.password_hash)) {
            newErrors.password_hash = 'Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt';
        }

        // Confirm password validation
        if (formData.password_hash !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Mật khẩu không khớp';
        }

        // Optional referral code validation
        if (formData.referral_code_of_referrer && !/^[A-Za-z0-9_]+$/.test(formData.referral_code_of_referrer)) {
            newErrors.referral_code_of_referrer = 'Mã giới thiệu không hợp lệ';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const { confirmPassword, ...registerData } = formData;
            const response = await api.post('/auth/register', registerData);
            console.log('Registration response:', response.data);

            toast.success('Đăng ký thành công! Vui lòng đăng nhập để tiếp tục');
            router.push('/authentication/login');

        } catch (error: unknown) {
            console.error('Registration error:', error);

            const isApiError = (error: unknown): error is ApiErrorResponse => {
                return (
                    typeof error === 'object' &&
                    error !== null &&
                    'response' in error &&
                    typeof (error as ApiErrorResponse).response === 'object'
                );
            };

            const errorMessage = isApiError(error)
                ? error.response?.data?.message || 'Đã có lỗi xảy ra'
                : 'Đã có lỗi xảy ra';

            setErrors(prev => ({ ...prev, general: errorMessage }));

        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="relative ">
            <div className="z-0 absolute inset-0">
                <Image
                    src="/images/productbg.png"
                    alt=""
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full"
                />
            </div>
            <div className="relative desktop:px-8 z-10 mx-auto px-4 mobile:px-8 py-16 max-w-screen-xl text-[#3F291B]">
                <div className="mx-auto max-w-lg text-center">
                    <h1 className="font-bold desktop:text-3xl mobile:text-3xl mini-laptop:text-3xl laptop:text-3xl tablet:text-3xl">
                        Đăng ký
                    </h1>
                </div>
                <div>
                    <form onSubmit={handleSubmit} className="space-y-4 mx-auto mt-8 mb-0 max-w-md">
                        {errors.general && (
                            <div className="relative bg-red-100 px-4 py-3 border border-red-400 rounded text-red-700" role="alert">
                                <span className="block sm:inline">{errors.general}</span>
                            </div>
                        )}
                        <div className="flex flex-col">
                            <div className="mb-4">
                                <AuthInput
                                    id="fullname"
                                    label="Họ và tên"
                                    type="text"
                                    placeholder="Nhập họ và tên"
                                    value={formData.fullname}
                                    onChange={handleChange}
                                    error={errors.fullname}
                                />
                                <AuthInput
                                    id="phone_number"
                                    label="Số điện thoại"
                                    type="tel"
                                    placeholder="Nhập số điện thoại"
                                    value={formData.phone_number}
                                    onChange={handleChange}
                                    error={errors.phone_number}
                                />
                                <AuthInput
                                    id="email"
                                    label="Email"
                                    type="email"
                                    placeholder="Nhập email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                />
                                <AuthInput
                                    id="password_hash"
                                    label="Mật khẩu"
                                    type="password"
                                    placeholder="Nhập mật khẩu"
                                    value={formData.password_hash}
                                    onChange={handleChange}
                                    error={errors.password_hash}
                                />
                                <AuthInput
                                    id="confirmPassword"
                                    label="Nhập lại mật khẩu"
                                    type="password"
                                    placeholder="Nhập lại mật khẩu"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    error={errors.confirmPassword}
                                />
                                <AuthInput
                                    id="referral_code_of_referrer"
                                    label="Mã giới thiệu (không bắt buộc)"
                                    type="text"
                                    placeholder="Nhập mã giới thiệu nếu có"
                                    value={formData.referral_code_of_referrer || ''}
                                    onChange={handleChange}
                                    error={errors.referral_code_of_referrer}
                                />
                            </div>
                            <div className="flex justify-between items-center">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`laptop:hover:scale-105 desktop:hover:scale-105 bg-[#8B0000] px-8 py-3 w-full font-medium text-white transition ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {isSubmitting ? 'Đang xử lý...' : 'Đăng ký'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}