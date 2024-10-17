'use client'
import React from 'react';
import { Card, Button } from '@nextui-org/react';
import BenefitsCard from '@/components/cards/BenefitsCard';
import { useRouter } from "next/navigation";

const steps = [
    {
        number: 1,
        description: "Đăng ký tài khoản và cung cấp các thông tin cần thiết"
    },
    {
        number: 2,
        description: "Đọc và hiểu rõ các chính sách của chúng tôi"
    },
    {
        number: 3,
        description: "Chia sẻ sản phẩm tới mọi người và nhận hoa hồng"
    }
];

export default function Affiliate() {
    const router = useRouter()
    return (
        <div className="bg-paper">
            <div className="w-full max-w-[100rem] mx-auto">
                <div className="px-4 py-12">
                    <div className="grid grid-cols-2 items-center justify-between">
                        {/* Left side content */}
                        <div className="w-full space-y-4 mini-laptop:space-y-8 laptop:space-y-8 desktop:space-y-12">
                            <p className="
                            mobile:text-2xl 
                            tablet:text-3xl 
                            mini-laptop:text-3xl
                            laptop:text-4xl
                            desktop:text-5xl font-bold font-robotoslab text-[#4A2511]">
                                Chương trình tiếp thị liên kết
                            </p>
                            <p className="
                            mobile:text-sm 
                            tablet:text-md 
                            mini-laptop:text-lg 
                            laptop:text-xl 
                            desktop:text-2xl font-robotoflex">
                                Chúng tôi luôn mong muốn tìm kiếm những đối tác mới.
                                Hãy tham gia cùng chúng tôi ngay.
                            </p>
                            <Button className="bg-[#7A0505] text-white font-medium py-3 px-8 rounded-2xl text-xs 
                            mobile:text-md
                            tablet:text-base
                            mini-laptop:text-lg
                            laptop:text-lg 
                            desktop:text-xl h-full"
                                onClick={() => router.push('/affiliate/login')}
                            >
                                Đăng kí ngay
                            </Button>
                        </div>
                        <div>
                            <img
                                src="/images/affiliate/megaphone.png"
                                alt="megaphone"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full max-w-[100rem] mx-auto px-4 py-8 laptop:py-12 desktop:py-12">
                <div className="w-full bg-[#F0E0CA] mb-8 drop-shadow-lg border-1 border-black text-[#4A2511]">
                    <p className="
                    mobile:text-2xl 
                    tablet:text-3xl
                    mini-laptop:text-3xl
                    laptop:text-4xl
                    desktop:text-5xl font-robotoslab font-bold text-center p-2">Lợi ích bạn nhận được</p>
                </div>
                <p className="text-center font-robotoflex font-medium mobile:my-10 my-12 desktop:my-16 
                mobile:text-sm
                tablet:text-md
                mini-laptop:text-lg
                laptop:text-xl
                desktop:text-2xl">
                    Chúng tôi thích làm việc với các đối tác có ảnh hưởng và đa dạng. Chúng tôi luôn tìm kiếm các đề xuất hợp tác.
                    <br />
                    Liên hệ với chúng tôi để biết thêm thông tin
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <BenefitsCard />
                    <BenefitsCard />
                    <BenefitsCard />
                </div>
            </div>
            <div className="w-full max-w-[100rem] mx-auto px-4 py-8 desktop:py-12">
                <div className="w-full bg-[#F0E0CA] mb-8 drop-shadow-lg border-1 border-black text-[#4A2511]">
                    <p className="
                    mobile:text-2xl 
                    tablet:text-3xl
                    mini-laptop:text-3xl
                    laptop:text-4xl
                    desktop:text-5xl font-robotoslab font-bold text-center p-2">Làm sao để tham gia</p>
                </div>
                <p className="text-center font-robotoflex font-medium mobile:my-10 my-12 desktop:my-16 
                mobile:text-sm
                tablet:text-md
                mini-laptop:text-lg
                laptop:text-xl
                desktop:text-2xl">
                    Chúng tôi thích làm việc với các đối tác có ảnh hưởng và đa dạng. Chúng tôi luôn tìm kiếm các đề xuất hợp tác.
                    <br />
                    Liên hệ với chúng tôi để biết thêm thông tin
                </p>
                <div className="relative">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {steps.map((step, index) => (
                            <div key={step.number} className="flex flex-col items-center">
                                <div className="relative flex justify-center w-full">
                                    {/* Left connecting line */}
                                    {index > 0 && (
                                        <div className="absolute top-6 right-1/2 w-full h-0.5 bg-black hidden md:block" />
                                    )}
                                    {/* Right connecting line */}
                                    {index < steps.length - 1 && (
                                        <div className="absolute top-6 left-1/2 w-full h-0.5 bg-black hidden md:block" />
                                    )}
                                    <div className="w-12 h-12 rounded-full bg-[#7A0505] text-white flex items-center justify-center text-xl font-bold mb-4 z-10 relative">
                                        {step.number}
                                    </div>
                                </div>
                                <Card className="w-full p-6 mobile:mt-0 mt-4 h-full">
                                    <p className="font-robotoflex font-medium text-center 
                                    mobile:text-sm
                                    tablet:text-md
                                    mini-laptop:text-lg 
                                    laptop:text-xl
                                    desktop:text-2xl">{step.description}</p>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="text-center mt-12">
                    <Button className="bg-[#7A0505] text-white font-medium py-3 px-8 rounded-2xl 
                    mobile:text-lg 
                    tablet:text-lg
                    mini-laptop:text-lg
                    laptop:text-xl
                    desktop:text-2xl h-full">
                        Đăng kí ngay
                    </Button>
                </div>
            </div>
        </div>
    );
}