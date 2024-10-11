
const cartItems = [
  {
    id: 1,
    name: "An vị khang Ông Bụt",
    quantity: 1,
    price: 200000,
    image: "/images/cart/product-small.png",
  },
  {
    id: 2,
    name: "An vị khang Ông Bụt",
    quantity: 2,
    price: 200000,
    image: "/images/cart/product-small.png",
  },
  {
    id: 3,
    name: "An vị khang Ông Bụt",
    quantity: 2,
    price: 200000,
    image: "/images/cart/product-small.png",
  },
];
export default function YourProducts() {
   const total = cartItems.reduce(
     (sum, item) => sum + item.price * item.quantity,
     0
   );
  return (
    <div>
      <div className="place-content-center w-full mobile:h-32 tablet:h-40 h-48 bg-[#3F291B]"></div>
      <div className="my-8 text-center font-extrabold font-robotoslab text-[#813E3E]">
        <p className="text-xl">Đông Y Ông Bụt</p>
        <p className="text-2xl uppercase">Giỏ hàng của bạn</p>
      </div>
      <div className="max-w-6xl mx-auto p-4">
        <table className="w-full border-collapse rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-[#F0E0CA]  text-black">
              <th className="p-2 text-left">Ảnh sản phẩm</th>
              <th className="p-2 text-left">Tên sản phẩm</th>
              <th className="p-2 text-center">Số lượng</th>
              <th className="p-2 text-right">Giá</th>
              <th className="p-2 text-right">Tạm tính</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="p-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover"
                  />
                </td>
                <td className="p-2">{item.name}</td>
                <td className="p-2 text-center">{item.quantity}</td>
                <td className="p-2 text-right">
                  {item.price.toLocaleString("vi-VN")} ₫
                </td>
                <td className="p-2 text-right">
                  {(item.price * item.quantity).toLocaleString("vi-VN")} ₫
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-[#F0E0CA]">
              <td
                colSpan={4}
                className="p-2 text-right font-bold mobile:col-span-3 "
              >
                Tổng thanh toán
              </td>
              <td className="p-2 text-right text-[#7A0505] font-bold whitespace-nowrap">
                {total.toLocaleString("vi-VN")} ₫
              </td>
            </tr>
          </tfoot>
        </table>
        <div className="mt-4 text-right">
          <button className="bg-[#7A0505] text-white font-bold px-6 py-2 rounded-full hover:bg-red-700 transition-colors">
            Mua thêm
          </button>
        </div>
      </div>
    </div>
  );
}
