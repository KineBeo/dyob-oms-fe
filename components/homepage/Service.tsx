// components/ServiceSection.tsx
import { Card, CardBody, Button } from "@nextui-org/react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { CldImage } from "next-cloudinary";
import Autoplay from "embla-carousel-autoplay";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
}
interface ServiceSectionProps {
  title: string;
  services: ServiceCardProps[];
}

const ServiceSection = ({ title, services }: ServiceSectionProps) => {
  return (
    <section className="relative mx-auto mb-20 py-6 max-w-4xl tablet:max-w-lg mini-laptop:max-w-3xl desktop:max-w-6xl">
      {/* Background layers */}
      <div className="absolute inset-0">
        <div className="bg-white rounded-xl h-1/3"></div>
        <div className="bg-[#3F291B] rounded-xl h-2/3"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl container">
        {/* Title with decorative line */}
        <div className="mini-laptop:mb-10 mb-10 mobile:mb-8 tablet:mb-10 text-center">
          <h2 className="inline-block relative font-bold font-robotoslab text-[#7A0505] text-3xl mobile:text-2xl tablet:text-2xl mini-laptop:text-2xl uppercase">
            {title}
            <div className="-bottom-4 left-1/2 absolute bg-[#D7A444] w-24 h-1 transform -translate-x-1/2"></div>
          </h2>
        </div>

        {/* <p className="mx-auto mb-8 font-robotoflex text-base text-black text-center mobile:text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p> */}

        {/* Services grid desktop */}
        <div className="gap-4 mini-laptop:gap-4 mobile:hidden tablet:hidden grid desktop:grid-cols-3 laptop:grid-cols-3 mini-laptop:grid-cols-3 px-4">
          {services.map((service, index) => (
            <div key={index}>
              <Card
                key={index}
                className="border-3 border-white bg-transparent hover:translate-y-[-8px] hover:scale-105 transition-all duration-300 overflow-hidden"
                isHoverable
              >
                <CardBody className="p-0">
                  <div className="relative w-full h-48">
                    <CldImage
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </CardBody>
              </Card>
              <div className="p-2">
                <h3 className="mb-4 font-bold text-[#D7A444] text-lg desktop:text-xl text-center uppercase">
                  {service.title}
                </h3>
                <p className="text-justify text-white desktop:text-base mini-laptop:text-sm laptop:text-sm">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile */}
        <div className="justify-center items-center desktop:hidden laptop:hidden mini-laptop:hidden px-16">
          <Carousel
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
            opts={{
              align: "start",
              loop: true,
            }}
            className="relative w-full"
          >
            <CarouselContent>
              {services.map((service, index) => (
                <CarouselItem
                  key={index}
                  className="relative basis-full tablet:basis-full grid grid-rows-1"
                >
                  <div key={index}>
                    <Card
                      key={index}
                      className="border-3 border-white bg-transparent hover:translate-y-[-8px] hover:scale-105 transition-all duration-300 overflow-hidden"
                      isHoverable
                    >
                      <CardBody className="p-0">
                        <div className="relative w-full h-48">
                          <CldImage
                            src={service.image}
                            alt={service.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </CardBody>
                    </Card>
                    <div className="p-2">
                      <h3 className="mb-4 font-bold text-[#D7A444] text-lg tablet:text-base text-center uppercase">
                        {service.title}
                      </h3>
                      <p className="text-justify text-sm text-white tablet:text-base">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="active:bg-[#D7A444] active:text-white size-6" />
            <CarouselNext className="active:bg-[#D7A444] active:text-white size-6" />
          </Carousel>
        </div>

        {/* Button */}
        {/* <div className="mt-6 text-center">
          <Button
            size="md"
            className="bg-[#D7A444] hover:bg-opacity-80 px-6 py-2 rounded-full font-bold text-white"
          >
            XEM CHI TIẾT
          </Button>
        </div> */}
      </div>
    </section>
  );
};
export default ServiceSection;