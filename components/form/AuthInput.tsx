import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface AuthInputProps {
    id: string;
    label: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    error?: string;
    disabled?: boolean;
    options?: { value: string; label: string }[];
}

export default function AuthInput({
    id,
    label,
    type,
    placeholder,
    value,
    onChange,
    error,
    disabled,
    options
}: AuthInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    // Determine the actual input type
    const getInputType = () => {
        if (type === "phone") return "tel";
        if (type === "password") return showPassword ? "text" : "password";
        return type;
    };

    // Render select input for user class
    if (type === 'select') {
        return (
            <div className="mb-4">
                <label htmlFor={id} className="block font-medium text-black text-sm">
                    {label}
                    <span className="text-[#7A0505]"> </span>
                </label>
                <div className="relative">
                    <select
                        id={id}
                        value={value}
                        onChange={onChange}
                        className={`border-[#7A0505] bg-[#EDEFFE] shadow-sm px-3 py-4 border w-full text-sm appearance-none pr-8 ${error ? 'border-red-500' : ''
                            }`}
                        disabled={disabled}
                    >
                        {options?.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <div className="right-3 absolute inset-y-0 flex items-center px-2 text-gray-700 pointer-events-none">
                        <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                    </div>
                </div>
                {error && (
                    <p className="mt-1 text-red-500 text-sm">{error}</p>
                )}
            </div>
        );
    }

    // Regular input rendering remains the same as before
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block font-medium text-black text-sm">
                {label}
                <span className="text-[#7A0505]"> </span>
            </label>
            <div className="relative flex mt-1">
                <input
                    type={getInputType()}
                    id={id}
                    value={value}
                    onChange={onChange}
                    className={`border-[#7A0505] bg-[#EDEFFE] shadow-sm p-4 ${type === 'password' ? 'pr-12' : 'pr-4'} border w-full text-sm ${error ? 'border-red-500' : ''
                        }`}
                    placeholder={placeholder}
                    pattern={type === "tel" ? "[0-9]{10}" : undefined}
                    disabled={disabled}
                />
                {type === 'password' && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="top-1/2 right-4 absolute text-[#7A0505] hover:text-[#550303] transition-colors -translate-y-1/2"
                    >
                        {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                        ) : (
                            <Eye className="w-5 h-5" />
                        )}
                    </button>
                )}
            </div>
            {error && (
                <p className="mt-1 text-red-500 text-sm">{error}</p>
            )}
        </div>
    );
}