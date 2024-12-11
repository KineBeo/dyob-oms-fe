import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Check, X } from 'lucide-react';

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
    passwordValidation?: boolean; // New prop to enable password validation
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
    options,
    passwordValidation = false // Default to false
}: AuthInputProps) {
    const [showPassword, setShowPassword] = useState(false);
    
    // Password validation states
    const [passwordConditions, setPasswordConditions] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        specialChar: false
    });

    // Function to validate password
    const validatePassword = (password: string) => {
        return {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /\d/.test(password),
            specialChar: /[@$!%*?&]/.test(password)
        };
    };

    // Effect to validate password when value changes
    useEffect(() => {
        if (type === 'password' && passwordValidation) {
            const conditions = validatePassword(value);
            setPasswordConditions(conditions);
        }
    }, [value, type, passwordValidation]);

    // Determine the actual input type
    const getInputType = () => {
        if (type === "phone") return "tel";
        if (type === "password") return showPassword ? "text" : "password";
        return type;
    };

    // Render password validation conditions
    const renderPasswordValidation = () => {
        if (type !== 'password' || !passwordValidation) return null;

        const conditionLabels = [
            { key: 'length', label: 'Ít nhất 8 ký tự' },
            { key: 'uppercase', label: 'Một chữ cái viết hoa' },
            { key: 'lowercase', label: 'Một chữ cái viết thường' },
            { key: 'number', label: 'Một số' },
            { key: 'specialChar', label: 'Một ký tự đặc biệt (@$!%*?&)' }
        ];

        return (
            <div className="mt-2 space-y-1">
                {conditionLabels.map((condition) => (
                    <div 
                        key={condition.key} 
                        className={`flex items-center text-sm ${
                            passwordConditions[condition.key as keyof typeof passwordConditions] 
                                ? 'text-green-600' 
                                : 'text-red-600'
                        }`}
                    >
                        {passwordConditions[condition.key as keyof typeof passwordConditions] ? (
                            <Check className="w-4 h-4 mr-2" />
                        ) : (
                            <X className="w-4 h-4 mr-2" />
                        )}
                        {condition.label}
                    </div>
                ))}
            </div>
        );
    };

    // Select input rendering (unchanged from previous implementation)
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
                        className={`border-[#7A0505] bg-[#EDEFFE] shadow-sm px-3 py-4 border w-full text-sm appearance-none pr-8 ${error ? 'border-red-500' : ''}`}
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

    // Regular input rendering with password validation
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
                    className={`border-[#7A0505] bg-[#EDEFFE] shadow-sm p-4 ${type === 'password' ? 'pr-12' : 'pr-4'} border w-full text-sm ${error ? 'border-red-500' : ''}`}
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
            {renderPasswordValidation()}
        </div>
    );
}