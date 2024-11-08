"use client"
import { Divider } from "@nextui-org/react";
import OurDestinyCard from "../cards/OurDestinyCard";
import useSWR from "swr";
import * as strapi from "../../utils/globalApi";
import Loading from "../Loading";
interface Vision {
  title: string;
  text: VisionItem[];
}
interface VisionItem{
  text: string,
  id : string,
}
export default function Vision() {
   const { data : VisionData , isLoading, error } = useSWR("about-us-normal-vision", async () => {
     const response = await strapi.getAllVisions();
     return response?.data;
   });
    const { data : MissionData, isLoading : MissionLoanding, error : MisssionError } = useSWR("about-us-normal-mission", async () => {
     const response = await strapi.getAllMissions();
     return response?.data;
   });

   if (error || MisssionError) return <div>Failed to load</div>;
   if (isLoading || MissionLoanding) return <Loading />;

   const vision: Vision = VisionData.visions ;
   const mission: Vision = MissionData.missions;
  return (
    <div className="w-full max-w-4xl desktop:max-w-5xl mx-auto px-4 py-4">
      <div className="w-full mobile:mb-4 tablet:mb-4 mb-6 items-center justify-center flex flex-col">
        <p className="mobile:text-3xl tablet:text-3xl text-4xl font-robotoslab font-bold text-center p-2 text-[#4A2511]">
          Tầm nhìn và sứ mệnh
        </p>
        <Divider className="w-24 h-1 bg-[#D7A444]" />
      </div>

      <div className="laptop:px-8 desktop:px-12 flex justify-center items-center">
        <div className="grid grid-cols-2 mobile:grid-cols-1 tablet:grid-cols-1 mobile:p-4 gap-8 desktop:gap-12">
          <OurDestinyCard title={vision.title } text={vision.text} />
          <OurDestinyCard title={mission.title} text={mission.text} />
        </div>
      </div>
    </div>
  );
}
