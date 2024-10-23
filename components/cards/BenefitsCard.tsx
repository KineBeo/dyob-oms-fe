import { Card } from "@nextui-org/react";
import { FaCheckCircle, FaDollarSign } from "react-icons/fa";

export default function BenefitsCard() {
    return (
        <Card className="p-6 h-full w-full">
            <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-[#7A0505] rounded-full flex items-center justify-center mb-4">
                    <FaDollarSign className="text-white text-2xl" />
                </div>
                <p className="font-bold font-robotoflex mb-4 text-center mobile:text-base tablet:text-medium text-lg desktop:text-xl">Tạo thu nhập cho bạn</p>
                <li className="flex flex-col gap-3 items-start mb-2">
                    <div className="flex items-center justify-center gap-2">
                        <FaCheckCircle className="text-[#7A0505] flex-shrink-0 mini-laptop:size-5 laptop:size-5 desktop:size-6" />
                        <p className="font-robotoflex mobile:text-sm">Nhờ tỉ lệ hoa hồng hấp dẫn lên đến 25%</p>
                    </div>

                    <div className="flex items-center justify-center gap-2">
                        <FaCheckCircle className="text-[#7A0505] flex-shrink-0 mini-laptop:size-5 laptop:size-5 desktop:size-6" />
                        <p className="font-robotoflex mobile:text-sm">Không giới hạn hoa hồng</p>
                    </div>

                    <div className="flex items-center justify-center gap-2">
                        <FaCheckCircle className="text-[#7A0505] flex-shrink-0 mini-laptop:size-5 laptop:size-5 desktop:size-6" />
                        <p className="font-robotoflex mobile:text-sm">Hợp tác với các thương hiệu nổi tiếng</p>
                    </div>
                </li>
            </div>
        </Card>
    )
}