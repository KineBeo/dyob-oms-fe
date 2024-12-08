'use client'
import WhyChoosing from "@/components/homepage/WhyChoosing";
import Solutions from "@/components/homepage/Solutions";
import OurMembers from "@/components/homepage/OurMembers";
import Address from "@/components/homepage/Address";
import CustomerFeedback from "@/components/homepage/Feedback";
import Service from "@/components/homepage/Service";
import * as strapi from '@/utils/globalApi';
import useSWR from "swr";
import { CldImage } from 'next-cloudinary';
import Articles from "@/components/homepage/Articles";
import Loading from "@/components/Loading";
import Script from 'next/script';
import Image from "next/image";
import ContactIcons from "@/components/ContactIcon";
import MoreAritcles from "@/components/homepage/MoreArticles";
import OtherVideos from "@/components/homepage/OtherVideos";
const cloudinaryLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
  const params = ['f_auto', 'c_limit', 'w_' + width, 'q_' + (quality || 75)];
  return `https://res.cloudinary.com/dbwhznb11/image/upload/${params.join(',')}/${src}`;
};
export default function Home() {

  const { data, error, isLoading } = useSWR("homepage", async () => {
    const response: HomepageRespone = await strapi.getHomepage();
    return response;
  });

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading homepage data</div>;

  const homepageData = data?.data;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Homepage',
    name: homepageData?.Why_choosing_title,
    description: homepageData?.Why_choosing_description,
    services: homepageData?.Services_title,
    services_description: homepageData?.services_content?.map((card) => card.Description),
  }

  const desktopImageId = homepageData?.Hero_section_image?.provider_metadata?.public_id || '';
  const mobileImageId = homepageData?.Mobile_hero_section_image?.provider_metadata?.public_id || 'banner_web_mobile_134318e89b';
  console.log(mobileImageId);

  return (
    <div>
      {/* Hero section  */}
      <div className="flex justify-center mobile:hidden tablet:hidden w-full h-full">
        <Image
          loader={cloudinaryLoader}
          src={desktopImageId}
          alt="Hero section"
          priority
          width={1920}
          height={1080}
          loading="eager"
          layout="responsive"
          sizes="100vw"
          className={`
            object-cover
            duration-700 ease-in-out
          `}
          quality={80}
        />
      </div>
      {/* Mobile hero section  */}
      <div className="mobile:flex tablet:flex justify-center hidden w-full h-full">
        <Image
          loader={cloudinaryLoader}
          src={mobileImageId}
          alt="Hero section"
          priority
          width={768}
          height={1024}
          loading="eager"
          layout="responsive"
          sizes="(max-width: 768px) 100vw, 768px"
          className={`
            object-cover
            duration-700 ease-in-out
          `}
          quality={80}
        />
      </div>

      <Service
        title={homepageData?.Services_title || ""}
        services={
          homepageData?.services_content?.map((card) => ({
            title: card.Title || "",
            description: card.Description || "",
            image: card.Image?.provider_metadata.public_id || "",
          })) || []
        }
      />

      <WhyChoosing
        title={homepageData?.Why_choosing_title || ""}
        description={homepageData?.Why_choosing_description || ""}
        cards={
          homepageData?.Why_choosing_cards?.map((card) => {
            return {
              image_url: card.Image?.provider_metadata.public_id || "",
              title: card.Title,
            };
          }) || []
        }
      />

      {!isLoading && <Articles homepageLoaded={true} />}

      <OurMembers
        title={homepageData?.Employee_introduction_title || ""}
        teamMembers={
          homepageData?.Employees?.map((employee, index) => {
            return {
              name: employee.Name,
              role: employee.Position || "",
              image: employee.Image.provider_metadata.public_id,
              isMain: index === 0,
              width: employee.Image.width,
              height: employee.Image.height,
            };
          }) || []
        }
      />

      {/* <Solutions
        title={homepageData?.Solution_title || ""}
        description={homepageData?.Solution_description || ""}
        icons={
          homepageData?.Solution_card?.map((card) => ({
            id: card.id,
            name: card.Title,
            icon: card.Icon?.provider_metadata.public_id || "",
            width: card.Icon?.width || 0,
            height: card.Icon?.height || 0,
          })) || []
        }
      /> */}

      <Address
        title={homepageData?.Location_title || ""}
        description={homepageData?.Location_description || ""}
        cards={
          homepageData?.Location_card?.map((card) => {
            return {
              image_url: card.Image?.provider_metadata.public_id || "",
              location: card.Location,
              google_maps_url: card.googlemap_url || "#",
            };
          }) || []
        }
      />
      <CustomerFeedback
        videos={
          homepageData?.Review?.map((video) => ({
            videoId: video.view_url,
            title: video.Title,
          })) || []
        }
      />
      <MoreAritcles/>
      <ContactIcons />
      <OtherVideos
        videos={
          homepageData?.Review?.map((video) => ({
            videoId: video.view_url,
            title: video.Title,
          })) || []
        }
      />
      <Script
        id="homepage-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}

