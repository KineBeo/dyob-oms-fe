'use client'
import { useState } from 'react';
import AuthInput from "@/components/form/AuthInput";
import Image from "next/image";
import { authService } from '@/utils/auth/authApi';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { ApiErrorResponse } from '@/interfaces/auth';
import { loginStart, loginSuccess, loginFailure } from '@/redux/features/auth/authSlice';
import { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { LoginCredentials } from '@/interfaces/auth';
interface FormErrors {
    email?: string;
    password?: string;
    general?: string;
}

export default function Login() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state: RootState) => state.auth);
    const [loginCredentials, setLoginCredentials] = useState<LoginCredentials>({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!loginCredentials.email) {
            newErrors.email = 'Email không được để trống';
        } else if (!emailRegex.test(loginCredentials.email)) {
            newErrors.email = 'Email không hợp lệ';
        }

        // Password validation
        if (!loginCredentials.password) {
            newErrors.password = 'Mật khẩu không được để trống';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            const response = await authService.login(loginCredentials);

            // Dispatch loginSuccess with the correct payload structure
            dispatch(loginSuccess({
                user: response.user,
                access_token: response.access_token,
                refresh_token: response.refresh_token
            }));

            toast.success('Đăng nhập thành công!');
            router.push('/');

        } catch (error: unknown) {
            console.error('Login error:', error);

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

            dispatch(loginFailure(errorMessage));
            setErrors(prev => ({ ...prev, general: errorMessage }));
        } 
    };

    return (
        <div className="relative h-[70vh]">
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
                                    id="email"
                                    label="Email"
                                    type="email"
                                    placeholder="Nhập email"
                                    value={loginCredentials.email}
                                    onChange={handleChange}
                                    error={errors.email}
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