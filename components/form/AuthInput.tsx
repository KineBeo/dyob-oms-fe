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
    const inputType = type === "phone" ? "tel" : type;

    return (
        <div className="mb-4">
            <label htmlFor={id} className="block font-medium text-black text-sm">
                {label}
                <span className="text-[#7A0505]"> *</span>
            </label>
            <div className="relative flex mt-1">
                <input
                    type={inputType}
                    id={id}
                    value={value}
                    onChange={onChange}
                    className={`border-[#7A0505] bg-[#EDEFFE] shadow-sm p-4 pr-4 border w-full text-sm ${error ? 'border-red-500' : ''
                        }`}
                    placeholder={placeholder}
                    pattern={type === "tel" ? "[0-9]{10}" : undefined}
                />
            </div>
            {error && (
                <p className="mt-1 text-red-500 text-sm">{error}</p>
            )}
        </div>
    );
}