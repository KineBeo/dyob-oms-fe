// types/service.ts
type Service = {
  title: string;
  description: string;
  image: string;
};

// components/ServiceSection.tsx
import { Card, CardBody, Button } from "@nextui-org/react";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";

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
      'Cách kê đơn bốc thuốc tuân theo nguyên tắc "chọn lọc phương cổ y học cổ truyền từ ngàn đời nay, tức là dựa vào tình trạng bệnh cụ thể của bệnh nhân để xây dựng phương thuốc điều trị, rồi kê đơn sau đó mới bốc thuốc cho bệnh nhân.',
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
    <section className="relative  py-8  mx-auto max-w-4xl desktop:max-w-5xl mb-20">
      {/* Background layers */}
      <div className="absolute inset-0">
        <div className="h-1/3 bg-white rounded-xl"></div>
        <div className="h-2/3 bg-[#40241A] rounded-xl"></div>
      </div>

      <div className="relative z-10 container max-w-4xl mx-auto ">
        {/* Title with decorative line */}
        <div className="text-center mb-16">
          <h2 className="text-2xl mobile:text-2xl tablet:text-sm mini-laptop:text-sm font-bold text-[#7A0505] relative inline-block">
            DỊCH VỤ CỦA ĐÔNG Y ÔNG BỤT
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#D7A444]"></div>
          </h2>
        </div>

        {/* Services grid desktop */}
        <div className="grid mobile:hidden tablet:hidden mini-laptop:grid-cols-3 laptop:grid-cols-3 desktop:grid-cols-3 gap-8 px-2">
          {services.map((service, index) => (
            <div key={index}>
              <Card
                key={index}
                className=" bg-transparent border-white border-3 hover:translate-y-[-8px] hover:scale-105 transition-all duration-300 overflow-hidden"
                isHoverable
              >
                <CardBody className="p-0">
                  <div className="relative h-48 w-full">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </CardBody>
              </Card>
              <div className="p-2">
                <h3 className="text-base font-bold text-[#D7A444] mb-4 text-center">
                  {service.title}
                </h3>
                <p className="text-xs text-white text-justify">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile */}
        <div className=" laptop:hidden desktop:hidden mini-laptop:hidden  grid grid-rows-1 gap-4 px-8 ">
          <Carousel
            opts={{
              align: "start",
            }}
            className="relative w-full  "
          >
            <CarouselContent>
              {services.map((service, index) => (
                <CarouselItem
                  key={index}
                  className="relative basis-full tablet:basis-1/2 grid grid-rows-1"
                >
                  <div key={index}>
                    <Card
                      key={index}
                      className=" bg-transparent border-white border-3 hover:translate-y-[-8px] hover:scale-105 transition-all duration-300 overflow-hidden"
                      isHoverable
                    >
                      <CardBody className="p-0">
                        <div className="relative h-48 w-full">
                          <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </CardBody>
                    </Card>
                    <div className="p-2">
                      <h3 className="text-base font-bold text-[#D7A444] mb-4 text-center">
                        {service.title}
                      </h3>
                      <p className="text-xs text-white text-justify">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className=" mobile:hidden tablet:hidden left-0 " />
            <CarouselNext className=" mobile:hidden  tablet:hidden right-0 " />
          </Carousel>
        </div>

        {/* Button */}
        <div className="text-center mt-6">
          <Button
            size="md"
            className="px-6 py-2 bg-[#D7A444] text-white font-bold rounded-full hover:bg-opacity-80"
          >
            XEM CHI TIẾT
          </Button>
        </div>
      </div>
    </section>
  );
};
export default ServiceSection;