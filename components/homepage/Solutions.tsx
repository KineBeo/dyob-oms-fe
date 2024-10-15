"use client";

const TreatmentIcon = ({ name, icon }: { name: string; icon: string }) => (
  <div className="flex flex-col items-center">
    <div
      className="w-16 h-16 mobile:w-20 mobile:h-20
                    tablet:w-22 tablet:h-22
                    rounded-full bg-[#D7A444] flex items-center justify-center"
    >
      <img
        src={icon}
        alt={name}
        className="w-10 h-10 mobile:w-16 mobile:h-16 "
      />
    </div>
    <span className="text-sm text-center text-[#3F291B] font-medium">
      {name}
    </span>
  </div>
);
const iconData = [
  { id: 1, name: "Thần Kinh", icon: "/images/homepage/thankinh.png" },
  { id: 2, name: "Dạ Tràng", icon: "/images/homepage/thankinh.png" },
  { id: 3, name: "Xương Khớp", icon: "/images/homepage/thankinh.png" },
  { id: 4, name: "Viêm họng", icon: "/images/homepage/thankinh.png" },
  { id: 5, name: "Thần Kinh", icon: "/images/homepage/thankinh.png" },
  { id: 6, name: "Viêm họng", icon: "/images/homepage/thankinh.png" },
  { id: 7, name: "Dạ Tràng", icon: "/images/homepage/thankinh.png" },
  { id: 8, name: "Xương Khớp", icon: "/images/homepage/thankinh.png" },
]; 

export default function Solutions() {
    return (
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left content */}
          <div className="md:w-1/3">
            <h2 className="text-2xl font-bold text-[#7A0505] mb-4 text-left font-robotoslab">
              GIẢI PHÁP ĐIỀU TRỊ
              <div className="w-24 h-1 bg-[#D7A444] mt-2"></div>
            </h2>

            <p className="text-sm mb-6 font-[450] font-robotoflex">
              Ứng dụng học thuyết của Thần Y Hải Thượng Lãn Ông kết hợp với khoa
              học hiện đại để chữa Thần kinh Y học hiện đại. Dùng các thiết bị
              máy móc trị liệu hiện đại để trị liệu khoa thương hàn đảm và cung
              cấp năng lượng từ dưỡng cho cơ thể. Ứng dụng công nghệ sinh học
              phân tử Pháp xuất cải hoạt chất sinh học có nguồn gốc từ thảo dược
              thiên nhiệp tốt phát triển người Việt.
            </p>
            <button className="px-6 py-2 bg-[#7A0505] text-white rounded-md hover:bg-opacity-90">
              XEM THÊM
            </button>
          </div>

          {/* Right content - Icons grid */}
          <div className="md:w-2/3">
            <div className="grid grid-cols-4 mobile:grid-cols-2 mobile:gap-y-6 tablet:grid-cols-3 gap-y-4">
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
    );
}