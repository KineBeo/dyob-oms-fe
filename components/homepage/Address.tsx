import StoreCard from "../cards/StoreCard";

interface AddressProps {
  title: string;
  description: string;
  cards: {
    image_url: string;
    location: string;
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

      <div className="gap-8 mobile:gap-y-6 tablet:gap-y-6 grid md:grid-cols-2">
        {cards.map((card) => (
          <StoreCard image_url={card.image_url} location={card.location} />
        ))}
      </div>
    </div>
  );

}