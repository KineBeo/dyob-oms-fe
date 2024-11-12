import Image from "next/image";

export default function PolicyPage() {
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
          <h1 className="font-bold desktop:text-3xl mobile:text-3xl mini-laptop:text-3xl laptop:text-3xl tablet:text-3xl">
            Chính sách kinh doanh
          </h1>
          <p className="mt-4 font-semibold text-[#3F291B] text-center laptop:text-xl mini-laptop:text-xl">
            Chào mừng bạn đến với hệ thống của chúng tôi. Vui lòng đọc kỹ chính sách bên dưới.
          </p>
        </div>

        <div className="space-y-6 mt-20 text-black">
          <section>
            <h2 className="mb-4 font-semibold text-xl">Bảng Tích lũy Doanh số & Thăng cấp</h2>
            <div className="overflow-x-auto">
              <table className="border-2 border-collapse border-black min-w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border-2 p-2 border-black">Vai trò</th>
                    <th className="border-2 p-2 border-black">Doanh số (VNĐ)</th>
                    <th className="border-2 p-2 border-black">Giới thiệu (người)</th>
                    <th className="border-2 p-2 border-black">Chiết khấu</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-2 p-2 border-black">Người tiêu dùng</td>
                    <td className="border-2 p-2 border-black">-</td>
                    <td className="border-2 p-2 border-black">-</td>
                    <td className="border-2 p-2 border-black">10%</td>
                  </tr>
                  <tr>
                    <td className="border-2 p-2 border-black">NVKD</td>
                    <td className="border-2 p-2 border-black">3,000,000</td>
                    <td className="border-2 p-2 border-black">1</td>
                    <td className="border-2 p-2 border-black">10%</td>
                  </tr>
                  <tr>
                    <td className="border-2 p-2 border-black">TP</td>
                    <td className="border-2 p-2 border-black">50,000,000</td>
                    <td className="border-2 p-2 border-black">5</td>
                    <td className="border-2 p-2 border-black">5%</td>
                  </tr>
                  <tr>
                    <td className="border-2 p-2 border-black">GĐKD</td>
                    <td className="border-2 p-2 border-black">150,000,000</td>
                    <td className="border-2 p-2 border-black">3</td>
                    <td className="border-2 p-2 border-black">5%</td>
                  </tr>
                  <tr>
                    <td className="border-2 p-2 border-black">GĐV</td>
                    <td className="border-2 p-2 border-black">500,000,000</td>
                    <td className="border-2 p-2 border-black">3</td>
                    <td className="border-2 p-2 border-black">3%</td>
                  </tr>
                  <tr>
                    <td className="border-2 p-2 border-black">GĐKV</td>
                    <td className="border-2 p-2 border-black">1,000,000,000</td>
                    <td className="border-2 p-2 border-black">2</td>
                    <td className="border-2 p-2 border-black">2%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8">
              <h3 className="mb-4 font-semibold text-lg">Quyền lợi của các Vai trò Kinh doanh</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold">1. Người tiêu dùng (NTD):</p>
                  <p className="pl-4">Được quyền thăm khám, sử dụng dịch vụ, có điểm tích lũy và chiết khấu khi mua hàng</p>
                </div>

                <div>
                  <p className="font-semibold">2. Nhân viên kinh doanh (NVKD):</p>
                  <p className="pl-4">Khi mua hàng tích lũy đạt 3,000,000 VNĐ sẽ có thêm chức năng {"nâng cấp tài khoản"} và chuyển từ NTD lên NVKD</p>
                </div>

                <div>
                  <p className="font-semibold">3. Trường hợp đặc biệt:</p>
                  <p className="pl-4">Khi người được giới thiệu thăng tiến vượt bậc so với người giới thiệu:</p>
                  <ul className="pl-8 list-disc">
                    <li>Người giới thiệu nhận 1% từ doanh số tích lũy của người được giới thiệu trong 2 năm</li>
                    <li>Người được giới thiệu sẽ được đặt vào vai trò tương ứng trong bảng tích lũy doanh số</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold">4. Ví dụ thu nhập Trưởng Phòng kinh doanh:</p>
                  <ul className="pl-8 list-disc">
                    <li>Yêu cầu doanh số: 1 tháng đạt 50,000,000 VNĐ</li>
                    <li>Yêu cầu nhân sự: giới thiệu hoặc tích lũy 5 thành viên</li>
                    <li>Quyền lợi:
                      <ul className="pl-8 list-circle">
                        <li>Chủ động: nhận chiết khấu khi mua hàng, sử dụng dịch vụ</li>
                        <li>Thụ động: nhận 5% trong tổng số tích lũy (50tr) = 2,5tr đồng</li>
                      </ul>
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold">5. Điểm cần chú ý:</p>
                  <ul className="pl-8 list-disc">
                    <li>Phân hạng dựa trên tích lũy và thu nhập theo tháng</li>
                    <li>Doanh số được tính khi tiền về và có xác nhận từ kế toán</li>
                    <li>Các hệ thống khác khi kết nối/bán sản phẩm: Giảm tối đa 10%</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}