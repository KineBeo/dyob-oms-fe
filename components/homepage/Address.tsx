import StoreCard from "../cards/StoreCard";

export default function Address() {
  
return (
  <div className="tablet:max-w-lg mini-laptop:max-w-2xl max-w-4xl desktop:max-w-5xl mx-auto px-4 py-6 w-full">
    <h1 className="mobile:text-2xl 
                    tablet:text-2xl
                    mini-laptop:text-2xl text-3xl font-bold text-center font-robotoslab text-[#7A0505] mb-2">
      HỆ THỐNG CƠ SỞ ĐÔNG Y ÔNG BỤT
    </h1>
    <div className="w-24 h-1 bg-[#D7A444] mx-auto mb-8 mobile:mb-4 tablet:mb-4 mini-laptop:mb-6"></div>

    <p className="text-center text-black font-robotoflex mobile:text-sm text-base mb-8 mx-auto">
      Đông Y Ông Bụt với hệ thống 2 phòng khám tại Hà Nội và Hồ Chí Minh, được
      Sở Y Tế cấp phép hoạt động, địa chỉ rõ ràng, mỗi năm tiếp đón hàng chục
      ngàn lượt bệnh nhân
    </p>

    <div className="grid md:grid-cols-2 mobile:gap-y-6 tablet:gap-y-6 gap-8">
      <StoreCard image_url="/images/homepage/address.png" location="Đông Y Ông Bụt - Hà Nội" />
      <StoreCard
        image_url="/images/homepage/address.png"
        location="Đông Y Ông Bụt - Hồ Chí Minh"
      />
    </div>
  </div>
);

}