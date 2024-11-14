import StoreCard from "../cards/StoreCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";

interface AddressProps {
  title: string;
  description: string;
  cards: {
    image_url: string;
    location: string;
    google_maps_url?: string;
  }[];
}

export default function Address({ title, description, cards }: AddressProps) {

  return (
    <div className="mx-auto px-4 py-6 w-full max-w-4xl tablet:max-w-lg mini-laptop:max-w-2xl desktop:max-w-5xl">
      <h1 className="mb-2 font-bold font-robotoslab text-[#7A0505] text-3xl text-center mobile:text-2xl tablet:text-2xl mini-laptop:text-2xl">
        {title}
      </h1>
      <div className="mini-laptop:mb-6 bg-[#D7A444] mx-auto mb-8 mobile:mb-4 tablet:mb-4 w-24 h-1"></div>

      <p className="mx-auto mb-8 font-robotoflex text-base text-black text-center mobile:text-sm">
        {description}
      </p>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="relative w-full max-w-5xl laptop:max-w-[52rem] mini-laptop:max-w-3xl bg-transparent"
      >
        <CarouselContent className="">
          {cards.map((card, index) => (
            <CarouselItem
              key={index}
              className="relative basis-1/2 mobile:basis-full tablet:basis-full"
            >
              <StoreCard
                key={index}
                image_url={card.image_url}
                location={card.location}
                google_maps_url={card.google_maps_url || "#"}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 hover:bg-[#D7A444] active:bg-[#C2943D] hover:text-white active:text-white" />
        <CarouselNext className="right-0 hover:bg-[#D7A444] active:bg-[#C2943D] hover:text-white active:text-white" />
      </Carousel>
    </div>
  );

}