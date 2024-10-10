import WhyChoosingCard from "../cards/WhyChoosingCard";

export default function WhyChoosing() {
    
  const benefits = [
    {
      image_url: "/images/homepage/whychosing.png",
      title: "DƯỢC LIỆU SẠCH 100%",
    },
    {
      image_url: "/images/homepage/whychosing.png",
      title: "DƯỢC LIỆU SẠCH 100%",
    },
    {
      image_url: "/images/homepage/whychosing.png",
      title: "DƯỢC LIỆU SẠCH 100%",
    },
    {
      image_url: "/images/homepage/whychosing.png",
      title: "DƯỢC LIỆU SẠCH 100%",
    },
    {
      image_url: "/images/homepage/whychosing.png",
      title: "DƯỢC LIỆU SẠCH 100%",
    },
  ];
return (
  <div>
    <div className="relative">
      {/* Split background */}
      <div className="absolute inset-0">
        <div className="h-3/5 bg-[#3F291B]"></div>
        <div className="h-2/5 bg-white"></div>
      </div>
      <div className="relative z-10 text-center py-8 px-4 justify-items-center ">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 text-center">
          VÌ SAO NÊN CHỌN ĐÔNG Y ÔNG BỤT
        </h2>
        <p className="text-white/80 text-sm md:text-base mb-8 max-w-3xl mx-auto">
          Phát triển nền tảng Đông y Hải Thượng Lãn Ông dựa trên công nghệ khoa
          học hiện đại. Xây dựng một hệ sinh thái toàn diện về Đông y 4.0. Giúp
          người Việt chữa lành thân tâm qua hệ thống &quot;Vườn chữa lành Ông
          Bụt&quot;
        </p>
        <div
          className="grid grid-cols-5 
                        mobile:flex mobile:overflow-x-auto 
                        mobile:whitespace-normal mobile:w-full
                        tablet:grid tablet:grid-cols-2 
                        mini-laptop:grid-cols-3 px-0 mx-0 w-fit
                        gap-4 "
        >
          {benefits.map((benefit, index) => (
            <WhyChoosingCard
              key={index}
              image_url={benefit.image_url}
              title={benefit.title}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);
}
