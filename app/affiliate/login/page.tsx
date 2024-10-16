import Image from "next/image";
export default function Login() {
  return (
    <div className="relative">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/productbg.png"
          alt=""
          layout="fill"
          objectFit="cover"
          className="h-full w-full"
        />
      </div>
      <div className=" relative z-10 mx-auto max-w-screen-xl px-4 py-16 mobile:px-8 desktop:px-8 text-[#3F291B]">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="desktop:text-3xl font-bold mobile:text-3xl mini-laptop:text-3xl laptop:text-3xl tablet:text-3xl">Đăng nhập</h1>
          <p className="mt-4 text-[#3F291B] font-semibold text-center laptop:text-xl mini-laptop:text-xl">
            Chào mừng bạn đến với hệ thống tiếp thị liên kết của chúng tôi. Vui lòng đọc kỹ chính sách bên dưới.
          </p>
        </div>
        <div>
          <form className="mx-auto mb-0 mt-8 max-w-md space-y-4">
            <div className="flex flex-col">
              <div className="mb-4">
                <label htmlFor="tel" className="block text-sm font-medium text-black ">
                  Số điện thoại
                  <span className="text-[#7A0505]"> *</span>
                </label>
                <div className="relative mt-1 flex ">
                  <input
                    type="text"
                    id="tel"
                    className="w-full border border-[#7A0505] p-4 pr-12 text-sm shadow-sm bg-[#EDEFFE] "
                    placeholder="Vui lòng nhập SDT của bạn"
                  />
                  <button
                    type="button"
                    className=" absolute right-1 top-0 mt-1 mb-1 w-4/12 h-5/6 bg-[#8B0000] text-sm font-medium text-white laptop:hover:scale-105 desktop:hover:scale-105 transition" >
                    Gửi OTP
                  </button>
                </div>
                <div className="mb-4">
                  <label htmlFor="otp" className=" mt-4 inline-block text-sm font-medium text-black">
                    Mã xác thực
                    <span className="text-[#7A0505]"> *</span>
                  </label>
                  <input
                    type="text"
                    id="otp"
                    className="w-full  border border-[#7A0505] p-4 pr-12 text-sm shadow-sm bg-[#EDEFFE]"
                    placeholder="Nhập mã OTP vừa gửi đến SDT của bạn"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="w-full bg-[#8B0000] font-medium text-white px-8 py-3 laptop:hover:scale-105 desktop:hover:scale-105 transition"
                >
                  Đăng nhập
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className=" text-black mt-20 space-y-2 ">
          <p className="font-semibold">ĐIỀU KHOẢN VÀ ĐIỀU KIỆN HỢP TÁC CHƯƠNG TRÌNH AFFILIATE</p>

          Chương trình Tiếp thị liên kết BiboMart được tổ chức bởi Công ty Cổ phần BiboMart TM;
          hoạt động theo Giấy chứng nhận Đăng ký doanh nghiệp số: 0108024302 được cấp bởi Sở Kế
          hoạch và Đầu tư thành phố Hà Nội (sau đây gọi tắt là “BiboMart”); là đơn vị vận hành
          Nền tảng BiboMart theo Thỏa thuận chung về Tiếp thị Liên kết này và/hoặc theo chương
          trình mà BiboMart công bố tại từng thời điểm (“Thỏa thuận Tiếp thị Liên kết”).
          Tham gia Chương trình Tiếp thị liên kết BiboMart, Bạn sẽ trở thành người cung cấp dịch
          vụ tiếp thị liên kết và nhận lại khoản phí hoa hồng được chi trả bởi BiboMart. Điều khoản
          chung này cùng với bất kỳ chính sách khác được công khai trên website của BiboMart và bất kỳ
          điều khoản và tài liệu nào khác được viện dẫn tại Thỏa thuận Tiếp thị Liên kết này có thể
          được sửa đổi, bổ sung hoặc thay thế tùy từng thời điểm (sau đây gọi chung là “Điều khoản Tiếp thị Liên kết”)
          được giao kết giữa Bạn và BiboMart điều chỉnh việc cung cấp Điều khoản Tiếp thị Liên kết.
          Bằng cách đăng ký tài khoản để trở thành Người Tiếp thị Liên kết, Bạn được xem là đã đồng ý
          với Thỏa thuận Tiếp thị Liên kết này. Bạn cũng đồng ý rằng Thỏa thuận Tiếp thị Liên kết này
          xác lập như một hợp đồng điện tử, có giá trị pháp lý theo quy định của pháp luật.
          <p className="font-semibold">1. ĐỊNH NGHĨA </p>
          <p className="font-semibold">1.1. Tiếp thị liên kết (TTLK)</p>
          Là một mô hình quảng bá hàng hóa, sản phẩm của BiboMart mà Người Tiếp thị liên kết
          thực hiện các hoạt động phù hợp thúc đẩy tiếp thị, quảng cáo, thu hút người mua mua hàng hóa,
          sản phẩm của BiboMart và từ đó nhận được hoa hồng với mỗi Giao dịch Thành công.
          <p className="font-semibold">1.2. Người Tiếp thị Liên kết (Người TTLK)</p>
          Là các cá nhân, pháp nhân đăng ký tham gia Chương Tiếp thị Liên kết BiboMar.
          <p className="font-semibold">1.3. Nền tảng BiboMart</p>
          Là bất kỳ nền tảng nào được vận hành bởi BiboMart, bao gồm nhưng không giới hạn ở website
          và ứng dụng di động của BiboMart nhằm phục vụ Chương trình Bibo Affiliate.<br></br>
          <p className="font-semibold">1.4. Sản Phẩm</p>
          Là bất kỳ hàng hóa, sản phẩm nào được đăng tải trên Nền tảng BiboMart để bán cho Khách Hàng.<br></br>
          <p className="font-semibold">1.5. Khách Hàng</p>
          Là những người mua Sản Phẩm từ Link Tiếp thị Liên kết.<br></br>
          <p className="font-semibold">1.6. Tài khoản TTLK</p>
          Là tài khoản mà Người TTLK đăng ký sử dụng trên Nền tảng BiboMart và có đăng ký tham gia
          Chương trình Tiếp thị Liên kết BiboMart.<br></br>
          <p className="font-semibold">1.7. Link Tiếp thị Liên kết (Link TTLK)</p>
          Bao gồm các tài liệu truyền thông/quảng cáo mà BiboMart cung cấp cho Người TTLK thông qua
          Chương trình Tiếp thị Liên kết BiboMart, không giới hạn ở hình ảnh, hình vẽ, chữ, các tập tin,
          đường link URLs và HTML hoặc mã Javascript.<br></br>
          <p className="font-semibold">1.8.Phương tiện Tiếp thị Liên kết (Phương tiện TTLK)</p>
          Bao gồm tất cả các phương tiện truyền thông, bao gồm nhưng không giới hạn ở các website,
          ứng dụng di động, cũng như các thư thông (newsletters) của Người TTLK, các phương tiện
          truyền thông do Người TTLK sở hữu hoặc kết nối được sử dụng để đăng tải, đính kèm Link TTLK.<br></br>
          <p className="font-semibold">1.9. Giao dịch Thành công</p>
          Là giao dịch được Khách Hàng đặt mua Sản Phẩm trực tiếp từ Link TTLK theo quy định tại Mục 3.1 Thỏa thuận TTLK này.<br></br>
          <p className="font-semibold">1.10. Phí Hoa hồng</p>
          Là loại phí BiboMart trả cho Người TTLK khi có Giao dịch Thành công như quy đinh tại Mục 3 Thỏa thuận TTLK.
        </div>
      </div>
    </div>
  );
}
