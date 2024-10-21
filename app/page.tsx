import Image from "next/image";
import WhyChoosing from "@/components/homepage/WhyChoosing";
import Solutions from "@/components/homepage/Solutions";
import OurMembers from "@/components/homepage/OurMembers";
import Address from "@/components/homepage/Address";
import CustomerFeedback from "@/components/homepage/Feedback";
import Service from "@/components/homepage/Service";
export default function Home() {
  

  return (
    <div>
      {/* Hero section  */}
      <div className="w-full mobile:hidden tablet:hidden">
        <Image
          src="/images/herosection-homepage.jpg"
          width={1920}
          height={698}
          style={{ height: "100%", width: "100%" }}
          alt="Herosection"
        />
      </div>
      <div className="relative w-full hidden mobile:block tablet:block ">
        <Image
          src="/images/homepage/herosection_mini.jpg"
          objectFit="cover"
          width={618}
          height={644}
          style={{ height: "100%", width: "100%" }}
          alt="Herosection"
        />
      </div>
      <Solutions />
      <Service />
      <WhyChoosing />
      <OurMembers />
      <Address />
      <CustomerFeedback />
    </div>
  );
}

