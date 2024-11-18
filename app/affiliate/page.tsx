'use client'
import React from 'react';
import { Card, Button } from '@nextui-org/react';
import BenefitsCard from '@/components/cards/BenefitsCard';
import { useRouter } from "next/navigation";
import { FaDollarSign } from 'react-icons/fa';
import { MdGroups } from "react-icons/md";
import { BsMegaphoneFill } from "react-icons/bs";

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
            {/* Hero Section */}
            <div className="mx-auto mobile:px-4 tablet:px-4 w-full max-w-3xl tablet:max-w-xl mini-laptop:max-w-2xl desktop:max-w-7xl">
                <div className="py-12">
                    <div className="justify-between items-center grid grid-cols-2 mobile:gap-2 gap-4 desktop:gap-0">
                        {/* Left side content */}
                        <div className="space-y-4 desktop:space-y-6 laptop:space-y-6 w-full">
                            <p className="font-bold font-robotoslab text-[#4A2511] text-4xl mobile:text-2xl tablet:text-3xl mini-laptop:text-3xl">
                                Chương trình tiếp thị liên kết
                            </p>
                            <p className="font-robotoflex text-xl mobile:text-sm mini-laptop:text-lg tablet:text-medium">
                                Tham gia chương trình Affiliate của chúng tôi để kiếm hoa hồng hấp dẫn trên mỗi đơn hàng thành công!
                                <br />
                                Đăng ký dễ dàng và theo dõi doanh thu minh bạch.
                            </p>
                            <Button className="bg-[#7A0505] px-8 py-3 rounded-2xl h-full font-medium text-lg text-white mini-laptop:text-base mobile:text-sm tablet:text-medium"
                                onClick={() => router.push('/authentication/register')}
                            >
                                Đăng kí ngay
                            </Button>
                        </div>

                        {/* Right side content */}
                        <div className="flex justify-center">
                            <img
                                className=""
                                src="/images/affiliate/marketing.png"
                                alt="megaphone"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Benefits earn */}
            <div className="desktop:py-12 laptop:py-12 mx-auto mobile:px-4 tablet:px-4 py-8 w-full max-w-3xl tablet:max-w-xl mini-laptop:max-w-2xl desktop:max-w-7xl">
                <div className="border-1 bg-[#F0E0CA] drop-shadow-lg mb-8 border-black w-full text-[#4A2511]">
                    <p className="p-2 font-bold font-robotoslab text-4xl text-center mobile:text-2xl tablet:text-3xl mini-laptop:text-3xl">Lợi ích bạn nhận được</p>
                </div>
                <p className="desktop:my-16 my-12 mobile:my-10 font-medium font-robotoflex text-center text-lg mobile:text-sm desktop:text-xl tablet:text-medium">
                    Nhận hoa hồng hấp dẫn, công cụ quảng bá miễn phí, và hỗ trợ tận tâm!
                    <br />
                    Liên hệ với chúng tôi để biết thêm thông tin
                </p>
                <div className="flex justify-center">
                    <div className="gap-8 grid grid-cols-1 desktop:grid-cols-3 laptop:grid-cols-3">
                        <BenefitsCard icon_url={FaDollarSign} title='Thu nhập cao' benefit='Hoa hồng cao và thanh toán định kỳ minh bạch.'/>
                        <BenefitsCard icon_url={BsMegaphoneFill} title='Quảng cáo mọi người' benefit='Bộ công cụ quảng bá liên kết miễn phí.'/>
                        <BenefitsCard icon_url={MdGroups} title='Đội ngũ tận tâm' benefit='Hỗ trợ cá nhân hóa từ đội ngũ chuyên nghiệp.'/>
                    </div>
                </div>
            </div>

            {/* How to join */}
            <div className="desktop:py-12 mx-auto mobile:px-4 tablet:px-4 py-8 w-full max-w-3xl tablet:max-w-xl mini-laptop:max-w-2xl desktop:max-w-7xl">
                <div className="border-1 bg-[#F0E0CA] drop-shadow-lg mb-8 border-black w-full text-[#4A2511]">
                    <p className="p-2 font-bold font-robotoslab text-4xl text-center mobile:text-2xl tablet:text-3xl mini-laptop:text-3xl">Làm sao để tham gia</p>
                </div>
                <p className="desktop:my-16 my-12 mobile:my-10 font-medium font-robotoflex text-center text-xl mobile:text-sm mini-laptop:text-lg tablet:text-medium">
                    Chỉ cần đăng ký tài khoản, nhận liên kết cá nhân hóa và chia sẻ đến khách hàng tiềm năng của bạn.
                    <br />
                    Hãy bắt đầu hành trình kiếm tiền ngay hôm nay!
                </p>
                <div className="relative">
                    <div className="gap-8 grid grid-cols-1 md:grid-cols-3">
                        {steps.map((step, index) => (
                            <div key={step.number} className="flex flex-col items-center">
                                <div className="relative flex justify-center w-full">
                                    {/* Left connecting line */}
                                    {index > 0 && (
                                        <div className="md:block top-6 right-1/2 absolute hidden bg-black w-full h-0.5" />
                                    )}
                                    {/* Right connecting line */}
                                    {index < steps.length - 1 && (
                                        <div className="md:block top-6 left-1/2 absolute hidden bg-black w-full h-0.5" />
                                    )}
                                    <div className="relative z-10 flex justify-center items-center bg-[#7A0505] mb-4 rounded-full w-12 h-12 font-bold text-white text-xl">
                                        {step.number}
                                    </div>
                                </div>
                                <Card className="mt-4 mobile:mt-0 p-6 w-full h-full">
                                    <p className="font-medium font-robotoflex text-center text-lg mini-laptop:text-medium mobile:text-sm tablet:text-base">{step.description}</p>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-12 text-center">
                    <Button className="bg-[#7A0505] px-8 py-3 rounded-2xl h-full font-medium text-lg text-white mini-laptop:text-base mobile:text-sm tablet:text-medium"
                        onClick={() => router.push('/authentication/register')}
                    >
                        Đăng kí ngay
                    </Button>
                </div>
            </div>
        </div>
    );
}