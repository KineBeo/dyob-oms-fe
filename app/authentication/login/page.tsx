import AuthInput from "@/components/form/AuthInput";
import Image from "next/image";
export default function Login() {
    return (
        <div className="relative">
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
                    <h1 className="font-bold desktop:text-3xl mobile:text-3xl mini-laptop:text-3xl laptop:text-3xl tablet:text-3xl">Đăng nhập</h1>
                    {/* <p className="mt-4 font-semibold text-[#3F291B] text-center laptop:text-xl mini-laptop:text-xl">
                        Chào mừng bạn đến với hệ thống tiếp thị liên kết của chúng tôi. Vui lòng đọc kỹ chính sách bên dưới.
                    </p> */}
                </div>
                <div>
                    <form className="space-y-4 mx-auto mt-8 mb-0 max-w-md">
                        <div className="flex flex-col">
                            <div className="mb-4">
                                <AuthInput id="tel" label="Số điện thoại" type="tel" placeholder={"Nhập số điện thoại"} />
                                <AuthInput id="pasword" label="Mật khẩu" type="password" placeholder={"Nhập mật khẩu"} />
                            </div>
                            <div className="flex justify-between items-center">
                                <button
                                    type="submit"
                                    className="laptop:hover:scale-105 desktop:hover:scale-105 bg-[#8B0000] px-8 py-3 w-full font-medium text-white transition"
                                >
                                    Đăng nhập
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
