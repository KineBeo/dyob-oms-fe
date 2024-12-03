'use client';
import { useState } from 'react';
import AuthInput from "@/components/form/AuthInput";
import Image from "next/image";
import { authService } from '@/utils/auth/authApi';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { loginStart } from '@/redux/features/auth/authSlice';
import { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { LoginCredentials } from '@/interfaces/auth';
import axios from 'axios';
interface FormErrors {
    phone_number?: string;
    password?: string;
    general?: string;
}

export default function Login() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state: RootState) => state.auth);
    const [loginCredentials, setLoginCredentials] = useState<LoginCredentials>({
        phone_number: '',
        password: ''
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        // // Email validation
        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // if (!loginCredentials.email) {
        //     newErrors.email = 'Email không được để trống';
        // } else if (!emailRegex.test(loginCredentials.email)) {
        //     newErrors.email = 'Email không hợp lệ';
        // }
        const phoneRegex = /^0\d{9}$/;
        if (!loginCredentials.phone_number) {
            newErrors.phone_number = 'Số điện thoại không được để trống';
        } else if (!phoneRegex.test(loginCredentials.phone_number) || loginCredentials.phone_number.length !== 10) {
            newErrors.phone_number = 'Số điện thoại không hợp lệ (phải là số điện thoại Việt Nam gồm 10 chữ số bắt đầu bằng 0)';
        }

        // Password validation
        if (!loginCredentials.password) {
            newErrors.password = 'Mật khẩu không được để trống';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setLoginCredentials(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        dispatch(loginStart());

        try {
            await authService.login(loginCredentials);
            toast.success('Đăng nhập thành công!');
            router.push('/');
        } catch (error: unknown) {
            let errorMessage = 'Đã có lỗi xảy ra';

            if (axios.isAxiosError(error)) {
                // Handle specific error scenarios from backend
                const backendError = error.response?.data;

                switch (backendError?.statusCode) {
                    case 400:
                        errorMessage = 'Thông tin đăng nhập không hợp lệ';
                        break;
                    case 401:
                        errorMessage = 'Tài khoản hoặc mật khẩu không chính xác';
                        break;
                    case 403:
                        errorMessage = 'Tài khoản của bạn đã bị khóa';
                        break;
                    case 404:
                        errorMessage = 'Tài khoản không tồn tại';
                        break;
                    default:
                        // Use backend error message if available
                        errorMessage = backendError?.message ||
                            error.response?.data?.error ||
                            'Đăng nhập thất bại. Vui lòng thử lại';
                }
            }

            setErrors(prev => ({ ...prev, general: errorMessage }));
        }
    };
    return (
        <div className="relative">
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
                        Đăng nhập
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
                                    id="phone_number"
                                    label="Số điện thoại"
                                    type="text"
                                    placeholder="Nhập số điện thoại"
                                    value={loginCredentials.phone_number}
                                    onChange={handleChange}
                                    error={errors.phone_number}
                                />
                                <AuthInput
                                    id="password"
                                    label="Mật khẩu"
                                    type="password"
                                    placeholder="Nhập mật khẩu"
                                    value={loginCredentials.password}
                                    onChange={handleChange}
                                    error={errors.password}
                                />
                            </div>
                            <div className="flex flex-col space-y-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`laptop:hover:scale-105 desktop:hover:scale-105 bg-[#8B0000] px-8 py-3 w-full font-medium text-white transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {loading ? 'Đang xử lý...' : 'Đăng nhập'}
                                </button>
                                <div className="text-center">
                                    <button
                                        type="button"
                                        onClick={() => router.push('/authentication/register')}
                                        className="text-[#8B0000] text-sm hover:underline"
                                    >
                                        Chưa có tài khoản? Đăng ký ngay
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}