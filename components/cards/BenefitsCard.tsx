import { Card } from "@nextui-org/react";
import { FaCheckCircle } from "react-icons/fa";
import { IconType } from "react-icons/lib";

interface BenefitsCardProps {
    icon_url: IconType,
    title: string,
    benefit: string,
}

export default function BenefitsCard(prop: BenefitsCardProps) {
    const IconComponent = prop.icon_url;
    return (
        <Card className="p-6 h-full w-full">
            <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-[#7A0505] rounded-full flex items-center justify-center mb-4">
                    <IconComponent className="text-white text-2xl" />
                </div>
                <p className="font-bold font-robotoflex mb-4 text-center mobile:text-base tablet:text-medium text-lg desktop:text-xl">{prop.title}</p>
                <li className="flex flex-col gap-3 items-start mb-2">
                    <div className="flex items-center justify-center gap-2">
                        <FaCheckCircle className="text-[#7A0505] flex-shrink-0 mini-laptop:size-5 laptop:size-5 desktop:size-6" />
                        <p className="font-robotoflex text-sm">{prop.benefit}</p>
                    </div>
                </li>
            </div>
        </Card>
    )
}