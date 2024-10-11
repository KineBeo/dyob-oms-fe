import OurDestinyCard from "../cards/OurDestinyCard";

export default function ImageAndDes() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <p className="font-bold text-[#3F291B] text-3xl">Tầm nhìn và sứ mệnh</p>
      </div>
      <div className="grid grid-cols-3 mobile:grid-cols-1 tablet:grid-cols-1 justify-center items-center pt-6">
        <OurDestinyCard />
        <OurDestinyCard />
        <OurDestinyCard />
      </div>
    </div>
  );
}
