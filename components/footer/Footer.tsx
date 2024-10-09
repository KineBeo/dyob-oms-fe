import { SiTiktok } from "react-icons/si";
import { FaYoutube } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";
export default function Footer() {
    return (
        <div >
            <footer className="bg-[#3F291B]">
                <div className="mx-auto max-w-screen-xl px-4 pb-6 pt-16 mobile:px-6 tablet:px-8 tablet:pt-24">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        <div>
                            <p className="text-left font-bold text-[#FFFFFF]">QUÁN TÂM AN BỆNH ĐÔNG Y ÔNG BỤT</p>
                            <p className="mt-3 text-[#F6F4F1]
                            mobile:text-left
                            mini-laptop:max-w-xs 
                            laptop:max-w-xs 
                            desktp:max-w-xs">
                                Giấy đăng ký kinh doanh số:  410803511 do UBND QUẬN X - TP Hải Dương cấp ngày 00/00/0000
                            </p>
                            <div className="text-[#FFFFFF] mt-4">
                                <p className="text-center font-bold w-28 h-8 bg-[#D7A444]">Trụ sở chính</p>
                                <ul className="mt-8 space-y-4 text-sm">
                                    <li
                                        className="flex items-start justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                                    >
                                        <a
                                            href="#"
                                            rel="noreferrer"
                                            target="_blank"
                                            className="text-[#FFFFFF]">
                                            <div className="flex items-center justify-center">
                                                <FaLocationPin className="w-4 h-4 text-[#D7A444]" />
                                            </div>
                                        </a>
                                        <address className="-mt-0.5 flex-1 not-italic text-[#FFFFFF]">
                                            Địa chỉ:  Số XX Ngõ XX, XX, XX, Hải Dương <i className="text-[#D7A444]">(Xem bản đồ)</i>
                                        </address>
                                    </li>
                                    <li>
                                        <div
                                            className="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                                        >
                                            <a href="#"
                                                rel="noreferrer"
                                                target="_blank"
                                                className="text-[#FFFFFF]">
                                                <div className="flex items-center justify-center">
                                                    <FaPhone className="w-4 h-4 text-[#D7A444]" />
                                                </div>

                                            </a>
                                            <span className="flex-1 ">Hotline: <b className="text-[#D7A444]">0938 449 768 - 0932 088 186</b></span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="text-[#FFFFFF] mt-4">
                                <p className="text-center font-bold w-28 h-8 bg-[#D7A444]">Trụ sở chính</p>
                                <ul className="mt-8 space-y-4 text-sm">
                                    <li
                                        className="flex items-start justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                                    >
                                        <a
                                            href="#"
                                            rel="noreferrer"
                                            target="_blank"
                                            className="text-[#FFFFFF]">
                                            <div className="flex items-center justify-center">
                                                <FaLocationPin className="w-4 h-4 text-[#D7A444]" />
                                            </div>
                                        </a>
                                        <address className="-mt-0.5 flex-1 not-italic text-[#FFFFFF]">
                                            Địa chỉ: Số XX Ngõ XX, XX, XX, Hải Dương <i className="text-[#D7A444]">(Xem bản đồ)</i>
                                        </address>
                                    </li>
                                    <li>
                                        <div
                                            className="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                                        >
                                            <a href="#"
                                                rel="noreferrer"
                                                target="_blank"
                                                className="text-[#FFFFFF]">
                                                <div className="flex items-center justify-center">
                                                    <FaPhone className="w-4 h-4 text-[#D7A444]" />
                                                </div>
                                            </a>
                                            <span className="flex-1">Hotline: <b className="text-[#D7A444]">0938 449 768 - 0932 088 186</b></span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-sm:grid-cols-2 md:grid-cols-2 lg:col-span-2 md:ml-10">
                            <div className="mobile:text-left sm:text-left ">
                                <p className="text-lg font-bold text-[#F6F4F1]">TÌM HIỂU THÊM</p>

                                <div className="mt-8 space-y-4 text-sm font-bold">

                                    <div className="before:content-['•'] before:text-[#FFFFFF] before:mr-2">
                                        <a className="text-[#D7A444] transition hover:text-[#F6F4F1] hover:underline" href="#">
                                            Về chúng tôi
                                        </a>
                                    </div>

                                    <div className="before:content-['•'] before:text-[#FFFFFF] before:mr-2">
                                        <a className="text-[#D7A444] transition hover:text-[#F6F4F1] hover:underline" href="#">
                                            Tiểu sử ban đầu
                                        </a>
                                    </div>

                                    <div className="before:content-['•'] before:text-[#FFFFFF] before:mr-2">
                                        <a className="text-[#D7A444] transition hover:text-[#F6F4F1] hover:underline" href="#">
                                            Giấy phép hoạt động
                                        </a>
                                    </div>

                                    <div className="before:content-['•'] before:text-[#FFFFFF] before:mr-2">
                                        <a className="text-[#D7A444] transition hover:text-[#F6F4F1] hover:underline" href="#">
                                            Chính sách và điều khoản
                                        </a>
                                    </div>

                                    <div className="before:content-['•'] before:text-[#FFFFFF] before:mr-2">
                                        <a className="text-[#D7A444] transition hover:text-[#F6F4F1] hover:underline" href="#">
                                            Chính sách bảo mật
                                        </a>
                                    </div>

                                    <div className="before:content-['•'] before:text-[#FFFFFF] before:mr-2">
                                        <a className="text-[#D7A444] transition hover:text-[#F6F4F1] hover:underline" href="#">
                                            Liên hệ
                                        </a>
                                    </div>

                                </div>
                            </div>

                            <div className="mobile:text-left w-full mt-4 md:mt-0">
                                <div>
                                    <p className="text-lg font-bold text-[#F6F4F1]">KẾT NỐI</p>
                                </div>
                                <div className=" bg-[#563624] mt-4 ">
                                    <div className=" p-4 space-y-4 text-sm text-[#F6F4F1]">
                                        <div>
                                            <p>
                                                Làm việc tất cả các ngày trong tuần
                                            </p>
                                        </div>
                                        <div>
                                            <div className="justify-between">
                                                <div>
                                                    <b className="text-[#D7A444]" >Sáng:</b> 8h00 - 12h00
                                                </div>
                                                <div>
                                                    <b className="text-[#D7A444]">Chiều:</b> 13h30 - 17h30
                                                </div>
                                            </div>

                                        </div>
                                        <div>
                                            <a className="text-[#F6F4F1]" href="#">
                                                Bệnh nhân đến sau 17h30 vui lòng liên hệ trước để đặt lịch <small>(Có chỗ để ô tô)</small>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <ul className="mt-5 flex justify-left gap-4 sm:justify-start md:gap-4">
                                    <div>
                                        <a href="#"
                                            rel="noreferrer"
                                            target="_blank"
                                            className="text-[#FFFFFF]">
                                            <div className="bg-[#D7A444] w-8 h-8 flex items-center justify-center">
                                                <FaYoutube className="w-4 h-4 text-[#FFFFFF]" />
                                            </div>

                                        </a>
                                    </div>
                                    <div>
                                        <a
                                            href="#"
                                            rel="noreferrer"
                                            target="_blank"
                                            className="text-[#FFFFFF]"
                                        >
                                            <div className="bg-[#D7A444] w-8 h-8 flex items-center justify-center">
                                                <FaFacebook className="w-4 h-4 text-[#FFFFFF]" />
                                            </div>

                                        </a>
                                    </div>
                                    <div>
                                        <a
                                            href="#"
                                            rel="noreferrer"
                                            target="_blank"
                                            className="text-[#FFFFFF]"
                                        >
                                            <div className="bg-[#D7A444] w-8 h-8 flex items-center justify-center">
                                                <SiTiktok className="w-4 h-4 text-[#FFFFFF]" />
                                            </div>

                                        </a>
                                    </div>
                                </ul>
                            </div>
                            <div>
                            </div >
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-100 pt-4 item-center justify-center text-[#F6F4F1]">
                    <div className="text-center ">
                        &copy; Bản quyền nội dung thuộc về <b className="text-[#D7A444]">Cyslabs</b>
                    </div>
                </div>
            </footer>
        </div>

    )

}