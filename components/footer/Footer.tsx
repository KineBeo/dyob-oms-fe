import { SiTiktok } from "react-icons/si";
import { FaYoutube } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";
import { FaHouse } from "react-icons/fa6";
import { Link } from "@nextui-org/react";
const moreLinks = [
  {
    title: "Về chúng tôi",
    href: "/about-us-normal",
  },
  {
    title: "Giấy phép hoạt động",
    href: "/about-us-normal#legal-document",
  },
  {
    title: "Chính sách và bảo mật",
    href: "#",
  },
  {
    title: "Tiếp thị liên kết",
    href: "/affiliate",
  },
];

const addressLinks = [
  {
    title: "Cơ sở chính",
    name: "Vườn chữa lành thân tâm Ông Bụt",
    address_name: "Thôn An Đông, Xã Thái Hoà, Huyện Bình Giảng, Tỉnh Hải Dương.",
    href_map: "https://maps.app.goo.gl/hbwdh2eKiaig3ofH9",
  },
  {
    title: "Cơ sở 2",
    name: "Trung tâm chăm sóc sức khỏe Đông Y Ông Bụt",
    address_name: "Ga Phạm Xá, Xã Tuấn Việt, Huyện Kim Thành, Tỉnh Hải Dương",
    href_map: "https://maps.app.goo.gl/jz7gwnJKsgTA2Nzi6",
  },
  {
    title: "Cơ sở 3",
    name: "Vườn chữa lành thân tâm Ông Bụt",
    address_name: "J14 Camelia, đường số 8, Phường Bình Hưng, Quận Bình Chánh, HCM",
    href_map: "https://maps.app.goo.gl/GxUbpakd76epKgqu8",
  },
  {
    title: "Cơ sở 4",
    name: "Trung Tâm chăm sóc sức khỏe Đông Y Ông Bụt",
    address_name: "Số 155 A4, Phố Nguyễn Cảnh Dị, Khu ĐTM Đại Kim - Định Công, Phường Định Công, Quận Hoàng Mai, TP Hà Nội",
    href_map: "https://maps.app.goo.gl/bgAicJk6DhaPFYxq8",
  },

];

export default function Footer() {
  return (
    <div>
      <footer className="bg-[#3F291B]">
        <div className="mx-auto max-w-screen-xl px-4 pb-6 pt-16 mobile:px-6 tablet:px-8 tablet:pt-24 mini-laptop:px-32 laptop:px-8">
          <div
            className="grid grid-cols-1 gap-8 
                    laptop:flex
                    desktop:grid-cols-3
                    "
          >
            <div>
              <p className="text-left text-lg font-bold text-[#FFFFFF]">
                QUÁN TÂM AN BỆNH ĐÔNG Y ÔNG BỤT
              </p>
              <p
                className="mt-3 text-[#F6F4F1]
                            mobile:text-left
                            mini-laptop:max-w-xs 
                            laptop:max-w-xs 
                            desktp:max-w-xs"
              >
                Giấy đăng ký kinh doanh số: 0801417620 do UBND Huyện Bình Giang - Tỉnh Hải
                Dương cấp ngày 21/03/2024
              </p>
              <div>
                {addressLinks.map((location, index) => (
                  <div key={index} className="text-white mt-4">
                    <div className="w-full border-b border-white border-dashed border-opacity-50">
                      <p className="text-center font-bold w-28 h-7 bg-[#D7A444]">
                        {location.title}
                      </p>
                    </div>

                    <ul className="mt-4 space-y-4 text-sm">
                      <li className="flex items-start justify-center gap-1.5">
                        <div className="flex items-center justify-center">
                          <FaHouse className="w-4 h-4 text-[#D7A444]" />
                        </div>

                        <p className="-mt-0.5 flex-1 not-italic text-white">
                          {location.name}
                        </p>
                      </li>

                      <li className="flex items-start justify-center gap-1.5">
                        <a
                          href={location.href_map}
                          rel="noreferrer"
                          target="_blank"
                          className="text-white"
                        >
                          <div className="flex items-center justify-center">
                            <FaLocationPin className="w-4 h-4 text-[#D7A444]" />
                          </div>
                        </a>
                        <address className="-mt-0.5 flex-1 not-italic text-white">
                          Địa chỉ: {location.address_name}{" "}
                          <Link className="text-[#D7A444] italic" href={location.href_map}>(Xem bản đồ)</Link>
                        </address>
                      </li>

                      {/* <li>
                        <div className="flex items-center justify-center gap-1.5">
                          <a
                            href={`tel:${location.phone}`}
                            rel="noreferrer"
                            target="_blank"
                            className="text-white"
                          >
                            <div className="flex items-center justify-center">
                              <FaPhone className="w-4 h-4 text-[#D7A444]" />
                            </div>
                          </a>
                          <span className="flex-1">
                            Hotline:{" "}
                            <b className="text-[#D7A444]">{location.phone}</b>
                          </span>
                        </div>
                      </li> */}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="grid grid-cols-1 gap-sm:grid-cols-2 mobile:ml-0 mini-laptop:ml-0 laptop:ml-0 tablet:ml-0
                        tablet:grid-cols-2 
                        mini-laptop:grid-cols-2
                        desktop:grid-cols-2
                        laptop:grid-cols-2
                        lg:col-span-2
                        "
            >
              <div className="text-justify pl-16 mobile:pl-0 mini-laptop:pl-0 tablet:pl-0">
                <p className="text-lg font-bold text-[#F6F4F1]">
                  TÌM HIỂU THÊM
                </p>

                <div className="mt-6 space-y-4 text-sm font-bold flex flex-col mobile:mt-4">
                  {moreLinks.map((links, index) => (
                    <Link
                      key={index}
                      href={links.href}
                      className="before:content-['•'] before:text-[#FFFFFF] before:mr-2"
                    >
                      <div className="text-[#D7A444] transition hover:text-[#F6F4F1] hover:underline">
                        {links.title}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div
                className="mobile:text-left w-full mt-4
                            tablet:mt-0
                            mini-laptop:mt-0 
                            desktop:mt-0
                            laptop:mt-0
                            "
              >
                <div>
                  <p className="text-lg font-bold text-[#F6F4F1]">KẾT NỐI</p>
                </div>
                <div className=" bg-[#563624] mt-4 ">
                  <div className=" px-4  py-2 space-y-4 text-sm text-[#F6F4F1]">
                    <div className="pb-4 border-white border-dashed border-opacity-50 border-b">
                      <p>Làm việc tất cả các ngày trong tuần</p>
                    </div>
                    <div>
                      <div className="justify-between">
                        <div>
                          <b className="text-[#D7A444]">Sáng:</b> 8h00 - 12h00
                        </div>
                        <div>
                          <b className="text-[#D7A444]">Chiều:</b> 13h30 -
                          17h30
                        </div>
                      </div>
                    </div>
                    <div>
                      <a className="text-[#F6F4F1]" href="#">
                        Bệnh nhân đến sau 17h30 vui lòng liên hệ trước để đặt
                        lịch <small>(Có chỗ để ô tô)</small>
                      </a>
                    </div>
                  </div>
                </div>

                <ul className="mt-5 flex justify-left gap-4 sm:justify-start md:gap-4">
                  <div>
                    <a
                      href="#"
                      rel="noreferrer"
                      target="_blank"
                      className="text-[#FFFFFF]"
                    >
                      <div className="bg-[#D7A444] w-8 h-8 flex items-center justify-center hover:bg-black">
                        <FaYoutube className="w-4 h-4 text-[#FFFFFF]" />
                      </div>
                    </a>
                  </div>
                  <div>
                    <a
                      href="https://www.facebook.com/profile.php?id=61560826497465&mibextid=LQQJ4d"
                      rel="noreferrer"
                      target="_blank"
                      className="text-[#FFFFFF]"
                    >
                      <div className="bg-[#D7A444] w-8 h-8 flex items-center justify-center hover:bg-black">
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
                      <div className="bg-[#D7A444] w-8 h-8 flex items-center justify-center hover:bg-black">
                        <SiTiktok className="w-4 h-4 text-[#FFFFFF] " />
                      </div>
                    </a>
                  </div>
                </ul>

                <div className="flex items-center justify-center mt-4 gap-2">
                  <a
                    href={`tel:${"0888 280 000"}`}
                    rel="noreferrer"
                    target="_blank"
                    className="text-white"
                  >
                    <div className="flex items-center justify-center">
                      <FaPhone className="w-4 h-4 text-[#D7A444]" />
                    </div>
                  </a>
                  <span className="flex-1 text-white">
                    Hotline:{" "}
                    <b className="text-[#D7A444]">0888 280 000</b>
                  </span>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-[#D7A444] pt-4 bg-[#563624] item-center justify-center text-[#FFFFFF] pb-4">
          <div className="text-center">
            &copy; Bản quyền nội dung thuộc về{" "}
            <b className="text-[#D7A444]">Cyslabs</b>
          </div>
        </div>
      </footer>
    </div>
  );

}