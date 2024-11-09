"use client"
import CompanyImageSlider from "@/components/about-us-normal/CompanyImageSlider";
import ImageAndDes from "@/components/about-us-normal/ImageAndDes";
import LegalDoc from "@/components/about-us-normal/LegalDoc";
import Vision from "@/components/about-us-normal/Vision";
import * as strapi from "../../utils/globalApi";
import Loading from "../../components/Loading";
import useSWR from "swr";



export default function AboutUsNormal() {
  const { data, isLoading, error } = useSWR("about-us-normal", async () => {
    const response = await strapi.getAboutUsNormal();
    return response?.data?.data;
  });

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <Loading />

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
  const images = Company_image.map((img: {
    width: number;
    height: number;
    provider_metadata: {
      public_id: string;
    }
  }) => ({
    src: img.provider_metadata.public_id,
    width: img.width,
    height: img.height
  }));


  return (
    <div>
      <div className="place-content-center bg-[#3F291B] w-full h-48 mobile:h-32 tablet:h-40"></div>
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