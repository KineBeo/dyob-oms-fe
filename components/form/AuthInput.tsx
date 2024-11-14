import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface AuthInputProps {
    id: string;
    label: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}

export default function AuthInput({
    id,
    label,
    type,
    placeholder,
    value,
    onChange,
    error
}: AuthInputProps) {
    const [showPassword, setShowPassword] = useState(false);
    
    // Determine the actual input type
    const getInputType = () => {
        if (type === "phone") return "tel";
        if (type === "password") return showPassword ? "text" : "password";
        return type;
    };

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
                    className={`border-[#7A0505] bg-[#EDEFFE] shadow-sm p-4 ${type === 'password' ? 'pr-12' : 'pr-4'} border w-full text-sm ${
                        error ? 'border-red-500' : ''
                    }`}
                    placeholder={placeholder}
                    pattern={type === "tel" ? "[0-9]{10}" : undefined}
                />
                {type === 'password' && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7A0505] hover:text-[#550303] transition-colors"
                    >
                        {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                        ) : (
                            <Eye className="h-5 w-5" />
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