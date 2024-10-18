"use client";

const TreatmentIcon = ({ name, icon }: { name: string; icon: string }) => (
  <div className="flex flex-col items-center ">
    <div
      className="w-24 h-24 mobile:w-20 mobile:h-20
                    tablet:w-22 tablet:h-22
                    rounded-full bg-[#D7A444] hover:border-1 hover:border-[#7A0505] flex items-center justify-center mb-1"
    >
      <img
        src={icon}
        alt={name}
        className="w-18 h-18 mobile:w-16 mobile:h-16 "
      />
    </div>
    <span className="text-sm text-center text-[#3F291B] font-medium">
      {name}
    </span>
  </div>
);
const iconData = [
  { id: 1, name: "Thần Kinh", icon: "/images/homepage/icon-than-kinh.svg" },
  { id: 2, name: "Da Liễu", icon: "/images/homepage/icon-da-lieu.svg" },
  { id: 3, name: "Phụ Khoa", icon: "/images/homepage/icon-phu-khoa.svg" },
  { id: 4, name: "Tai Mũi Họng", icon: "/images/homepage/icon-tai-mui-hong.svg",},
  { id: 5, name: "Tiêu Hóa", icon: "/images/homepage/icon-tieu-hoa.svg" },
  { id: 6, name: "Thận", icon: "/images/homepage/icon-than.svg" },
  { id: 7, name: "Nam Khoa", icon: "/images/homepage/icon-nam-khoa.svg" },
  { id: 8, name: "Xương Khớp", icon: "/images/homepage/icon-xuong-khop.svg" },
]; 

export default function Solutions() {
    return (
      <div className="bg-[#FBF6EC]">
        <section className="max-w-4xl desktop:max-w-5xl mx-auto px-4 py-12 ">
          <div className=" flex flex-col laptop:flex-row desktop:flex-row gap-8">
            {/* Left content */}
            <div className="laptop:w-1/3 desktop:w-1/3">
              <h2 className="text-2xl font-bold text-[#7A0505] mb-4 text-left font-robotoslab">
                GIẢI PHÁP ĐIỀU TRỊ
                <div className="w-24 h-1 bg-[#D7A444] mt-2"></div>
              </h2>

              <p className="text-sm mb-6 font-[450] font-robotoflex">
                Ứng dụng học thuyết của Thần Y Hải Thượng Lãn Ông kết hợp với
                khoa học hiện đại để chữa Thần kinh Y học hiện đại. Dùng các
                thiết bị máy móc trị liệu hiện đại để trị liệu khoa thương hàn
                đảm và cung cấp năng lượng từ dưỡng cho cơ thể. Ứng dụng công
                nghệ sinh học phân tử Pháp xuất cải hoạt chất sinh học có nguồn
                gốc từ thảo dược thiên nhiệp tốt phát triển người Việt.
              </p>
              <button className="px-6 py-2 bg-[#7A0505] text-white font-bold rounded-full hover:bg-opacity-80">
                XEM THÊM
              </button>
            </div>

            {/* Right content - Icons grid */}
            <div className="laptop:w-3/5 desktop:w-3/5">
              <div className="grid grid-cols-4 mobile:grid-cols-2 mobile:gap-y-6 tablet:grid-cols-3 gap-y-2">
                {iconData.map((item) => (
                  <TreatmentIcon
                    key={item.id}
                    name={item.name}
                    icon={item.icon}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
}