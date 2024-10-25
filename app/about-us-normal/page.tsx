"use client"
import CompanyImageSlider from "@/components/about-us-normal/CompanyImageSlider";
import ImageAndDes from "@/components/about-us-normal/ImageAndDes";
import LegalDoc from "@/components/about-us-normal/LegalDoc";
import Vision from "@/components/about-us-normal/Vision";
import * as strapi from "../../utils/globalApi";
import useSWR from "swr";



export default function AboutUsNormal() {
    const { data, isLoading, error } = useSWR("about-us-normal", async () => {
      const response = await strapi.getAboutUsNormal();
      return response?.data?.data;
    });

    if (error) return <div>Failed to load</div>;
    if (isLoading) return <div>Loading...</div>;

    // const {
    //   Introduction_title,
    //   Introduction_description,
    //   Vision_title_mission,
    //   Company_image_title,
    //   Company_image = [],
    //   Legal_documents_title,
    //   Legal_documents,
    // } = data || {};
    const {
      Introduction_title,
      Introduction_description,
      Company_image = [],
    } = data || {};

    // Ensure images have the correct structure
    const images = Company_image.map((img: { url: string; }) => ({
      src: img.url,
    }));

 
  return (
    <div>
      <div className="place-content-center w-full mobile:h-32 tablet:h-40 h-48 bg-[#3F291B]"></div>
      <div className="bg-paper">
        {/* Image and description */}
        <ImageAndDes
          introTitle={Introduction_title}
          introDescript={Introduction_description}
        />

        {/* Tam nhin va su menh */}
        <Vision />

        {/* image slide */}
        <CompanyImageSlider images={images} />

        {/* legal doc */}
        <LegalDoc />
      </div>
    </div>
  );
}