import CompanyImageSlider from "@/components/about-us-normal/CompanyImageSlider";
import ImageAndDes from "@/components/about-us-normal/ImageAndDes";
import LegalDoc from "@/components/about-us-normal/LegalDoc";
import Vision from "@/components/about-us-normal/Vision";

export default function AboutUsNormal() {
return (
  <div>
    <div className="place-content-center w-full mobile:h-32 tablet:h-40 h-48 bg-[#3F291B]"></div>
    <div className="bg-paper">
      {/* Image and description */}
      <ImageAndDes />

      {/* Tam nhin va su menh */}
      <Vision />

      {/* image slide */}
      <CompanyImageSlider />

        {/* legal doc */}
        <LegalDoc/>
    </div>
  </div>
);
}