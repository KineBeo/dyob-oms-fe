import StoreCard from "../cards/StoreCard";

export default function Address() {

return (
  <div className="max-w-7xl mx-auto px-4 py-12 w-full">
    <h1 className="text-4xl font-bold text-center text-red-800 mb-6">
      HỆ THỐNG CƠ SỞ ĐÔNG Y ÔNG BỤT
    </h1>
    <div className="w-24 h-1 bg-[#D7A444] mx-auto mb-8"></div>

    <p className="text-center text-black font-robotoflex font-medium mb-8 max-w-3xl mx-auto">
      Đông Y Ông Bụt với hệ thống 2 phòng khám tại Hà Nội và Hồ Chí Minh, được
      Sở Y Tế cấp phép hoạt động, địa chỉ rõ ràng, mỗi năm tiếp đón hàng chục
      ngàn lượt bệnh nhân
    </p>

    <div className="grid md:grid-cols-2 mobile:gap-y-6 tablet:gap-y-6 gap-8">
      <StoreCard image_url="/images/homepage/address.png" location="Hà Nội" />
      <StoreCard
        image_url="/images/homepage/address.png"
        location="Hồ Chí Minh"
      />
    </div>
  </div>
);

}