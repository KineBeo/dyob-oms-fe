// types/service.ts
type Service = {
  title: string;
  description: string;
  image: string;
};

// components/ServiceSection.tsx
import { Card, CardBody, Button } from "@nextui-org/react";
import Image from "next/image";

const services: Service[] = [
  {
    title: "BẮT MẠCH THĂM KHÁM",
    description:
      "Chẩn đoán mạch học trong Y Học Cổ Truyền chính là kỹ thuật định hướng giúp đánh giá tình trạng sức khỏe tổng quát và những rối loạn của tạng phủ bên trong cơ thể. Bắt mạch khám bệnh là một trong những bước đầu tiên trong chẩn đoán bệnh của Y Học Cổ Truyền.",
    image: "/images/homepage/thamkham.jpg",
  },
  {
    title: "KÊ ĐƠN BỐC THUỐC",
    description:
      'Cách kê đơn bốc thuốc ĐỖ MINH ĐƯỜNG tuân theo nguyên tắc "chọn lọc phương cổ y học cổ truyền từ ngàn đời nay, tức là dựa vào tình trạng bệnh cụ thể của bệnh nhân để xây dựng phương thuốc điều trị, rồi kê đơn sau đó mới bốc thuốc cho bệnh nhân.',
    image: "/images/homepage/kedon.jpg",
  },
  {
    title: "CHÂM CỨU BẤM HUYỆT",
    description:
      "Châm cứu bấm huyệt là phương pháp chữa bệnh không dùng thuốc có tác dụng giảm đau. Những người mắc các bệnh lý mãn tính như đau đầu, đau nhức xương khớp,... việc dùng thuốc kết hợp châm cứu bấm huyệt sẽ mang lại hiệu quả tuyệt vời, rút ngắn thời gian điều trị",
    image: "/images/homepage/chamcuu.jpg",
  },
];
const ServiceSection = () => {
  return (
    <section className="relative px-8 py-8 mx-auto max-w-5xl mb-20">
      {/* Background layers */}
      <div className="absolute inset-0">
        <div className="h-1/2 bg-white rounded-xl"></div>
        <div className="h-1/2 bg-[#40241a] rounded-xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Title with decorative line */}
        <div className="text-center mb-16">
          <h2 className="text-xl md:text-3xl font-bold text-[#40241a] relative inline-block">
            DỊCH VỤ CỦA NHÀ THUỐC ĐỖ MINH ĐƯỜNG
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-amber-500"></div>
          </h2>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="bg-white shadow-xl hover:translate-y-[-8px] transition-all duration-300 overflow-hidden"
              isHoverable
            >
              <CardBody className="p-0">
                <div className="relative h-56 w-full">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-amber-600 mb-4 text-center">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600 text-justify">
                    {service.description}
                  </p>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Button */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-amber-500 text-white hover:bg-amber-600 transition-colors px-6 py-2 rounded-full font-semibold"
          >
            XEM CHI TIẾT
          </Button>
        </div>
      </div>
    </section>
  );
};
export default ServiceSection;