'use client'
import Image from "next/image";
import WhyChoosing from "@/components/homepage/WhyChoosing";
import Solutions from "@/components/homepage/Solutions";
import OurMembers from "@/components/homepage/OurMembers";
import Address from "@/components/homepage/Address";
import CustomerFeedback from "@/components/homepage/Feedback";
import Service from "@/components/homepage/Service";
import * as strapi from '@/utils/globalApi';
import useSWR from "swr";
import Loading from "@/components/Loading";
import { CldImage } from 'next-cloudinary';


export default function Home() {

  const { data, isLoading, error } = useSWR('products', async () => {
    const response: HomepageRespone = await strapi.getHomepage();
    return response;
  });

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading homepage data</div>;

  const homepageData = data?.data;

  console.log(homepageData);

  return (
    <div>
      {/* Hero section  */}
      <div className="mobile:hidden tablet:hidden w-full h-full">
        <CldImage
          src="herosection_homepage_e9cc4d5226"
          width={1920}
          height={698}
          alt="Herosection"

        />
      </div>
      <div className="mobile:block tablet:block relative hidden w-full">
        <Image
          src="/images/homepage/herosection_mini.jpg"
          objectFit="cover"
          width={618}
          height={644}
          style={{ height: "100%", width: "100%" }}
          alt="Herosection"
        />
      </div>
      <Solutions
        title={homepageData?.Solution_title || ''}
        description={homepageData?.Solution_description || ''}
        icons={homepageData?.Solution_card?.map((card) => ({
          id: card.id,
          name: card.Title,
          icon: card.Icon?.provider_metadata.public_id || '',
          width: card.Icon?.width || 0,
          height: card.Icon?.height || 0
        })) || []}
      />
      <Service title={homepageData?.Services_title || ''} services={homepageData?.services_content?.map((card) => ({
        title: card.Title || '',
        description: card.Description || '',
        image: card.Image?.provider_metadata.public_id || '',
      })) || []} />
      <WhyChoosing title={homepageData?.Why_choosing_title || ''} description={homepageData?.Why_choosing_description || ''} cards={homepageData?.Why_choosing_cards?.map((card) => {
        return {
          image_url: card.Image?.provider_metadata.public_id || '',
          title: card.Title,
        }
      }) || []} />
      <OurMembers title={homepageData?.Employee_introduction_title || ''} teamMembers={homepageData?.Employees?.map((employee, index) => {
        return {
          name: employee.Name,
          role: employee.Position || '',
          image: employee.Image.provider_metadata.public_id,
          isMain: index === 0,
          width: employee.Image.width,
          height: employee.Image.height
        }
      }) || []} />
      <Address />
      <CustomerFeedback />
    </div>
  );
}

