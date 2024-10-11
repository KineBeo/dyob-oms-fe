export default function PaymentInfo() {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Delivery Information - Left half */}
          <div className="w-full md:w-1/2 px-4">
            <h2 className="text-xl font-semibold mb-4">Thông tin nhận hàng</h2>
            <form className="space-y-4 ">
              <div>
                <label htmlFor="name" className="block mb-1">
                  Họ và tên
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-red-800"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block mb-1">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-red-800"
                />
              </div>

              <div>
                <label htmlFor="address" className="block mb-1">
                  Nhập số nhà, tên đường
                </label>
                <input
                  type="text"
                  id="address"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-red-800"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Tỉnh/Thành"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-red-800"
                />
                <input
                  type="text"
                  placeholder="Quận/Huyện"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-red-800"
                />
                <input
                  type="text"
                  placeholder="Phường/Xã"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-red-800 sm:col-span-2 lg:col-span-1"
                />
              </div>

              <div>
                <label htmlFor="note" className="block mb-1">
                  Ghi chú
                </label>
                <textarea
                  id="note"
                  rows={4}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:bg-[#7A0505]"
                />
              </div>
            </form>
          </div>

          {/* Payment Information - Right half */}
          <div className="w-full md:w-1/2  px-4">
            <h2 className="text-xl font-semibold mb-4">Thông tin thanh toán</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="bank-transfer"
                  name="payment"
                  className="w-4 h-4 text-[#7A0505]"
                  defaultChecked
                />
                <label htmlFor="bank-transfer">Chuyển khoản</label>
              </div>

              <div className="bg-gray-100 p-4 rounded">
                <p className="text-sm">
                  Thực hiện thanh toán vào ngày tài khoản ngân hàng của chúng
                  tôi. Vui lòng sử dụng Mã đơn hàng của bạn trong phần Nội dung
                  thanh toán. Đơn hàng sẽ được giao sau khi tiền đã chuyển.
                </p>
                 <div className="mt-4 flex gap-4">
                <div className="space-y-1">
                  <p className="font-semibold">Mã đơn hàng: TA1727168357</p>
                  <p>Quét mã để chuyển tiền đến</p>
                  <p>Nguyen Van Hung</p>
                  <p>012456789</p>
                  <p>Ngân hàng TMCP Việt Nam Thịnh Vượng</p>
                </div>
                <div className="flex-shrink-0">
                  <img 
                    src="/images/cart/qrcode.png" 
                    alt="QR Code for payment" 
                    className="w-[150px] h-[150px]"
                  />
                </div>
              </div>
            </div>

              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="cash-on-delivery"
                  name="payment"
                  className="w-4 h-4  text-[#7A0505]"
                />
                <label htmlFor="cash-on-delivery">
                  Thanh toán khi nhận hàng
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Order Button */}
        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            className="px-12 py-3 bg-[#7A0505] text-white rounded-full hover:bg-red-700 transition-colors"
          >
            ĐẶT HÀNG
          </button>
        </div>
      </div>
    );
}