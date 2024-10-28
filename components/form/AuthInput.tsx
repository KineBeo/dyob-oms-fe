interface AuthInputProps {
    id: string;
    label: string;
    type: string;
    placeholder: string;
}

export default function AuthInput({ id, label, type, placeholder }: AuthInputProps) {
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block font-medium text-black text-sm">
                {label}
                <span className="text-[#7A0505]"> *</span>
            </label>
            <div className="relative flex mt-1">
                <input
                    type={type}
                    id={id}
                    className="border-[#7A0505] bg-[#EDEFFE] shadow-sm p-4 pr-4 border w-full text-sm"
                    placeholder={placeholder}
                    pattern={type === "tel" ? "[0-9]{10}" : undefined}
                />
            </div>
        </div>
    );
}