export default function Login() {
    return (
        <form className="space-y-4 mx-auto mt-8 mb-0 max-w-md">
            <div className="flex flex-col">
                <div className="mb-4">
                    <label htmlFor="tel" className="block font-medium text-black text-sm">
                        Số điện thoại
                        <span className="text-[#7A0505]"> *</span>
                    </label>
                    <div className="relative flex mt-1">
                        <input
                            type="text"
                            id="tel"
                            className="border-[#7A0505] bg-[#EDEFFE] shadow-sm p-4 pr-12 border w-full text-sm"
                            placeholder="Vui lòng nhập SDT của bạn"
                        />
                        <button
                            type="button"
                            className="top-0 laptop:hover:scale-105 desktop:hover:scale-105 right-1 absolute bg-[#8B0000] mt-1 mb-1 w-4/12 h-5/6 font-medium text-sm text-white transition" >
                            Gửi OTP
                        </button>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="otp" className="inline-block mt-4 font-medium text-black text-sm">
                            Mã xác thực
                            <span className="text-[#7A0505]"> *</span>
                        </label>
                        <input
                            type="text"
                            id="otp"
                            className="border-[#7A0505] bg-[#EDEFFE] shadow-sm p-4 pr-12 border w-full text-sm"
                            placeholder="Nhập mã OTP vừa gửi đến SDT của bạn"
                        />
                    </div>
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
    )
}