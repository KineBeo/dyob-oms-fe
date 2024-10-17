import Image from "next/image";
import WhyChoosing from "@/components/homepage/WhyChoosing";
import Solutions from "@/components/homepage/Solutions";
import OurMembers from "@/components/homepage/OurMembers";
import Address from "@/components/homepage/Address";
import CustomerFeedback from "@/components/homepage/Feedback";
export default function Home() {
  

  return (
    <div>
      {/* Hero section  */}
      <div className="w-full mobile:hidden tablet:hidden mini-laptop:hidden">
        <Image
          src="/images/herosection-homepage.jpg"
          width={1920}
          height={698}
          style={{ height: "100%", width: "100%" }}
          alt="Herosection"
        />
      </div>
      <div className="relative w-full h-64 tablet:h-96 mini-laptop:h-156 hidden mobile:block tablet:block mini-laptop:block">
        <Image
          src="/images/herosection-homepage.jpg"
          objectFit="cover"
          layout="fill"
          objectPosition="center"
          alt="Herosection"
        />
      </div>
      <WhyChoosing />
      <Solutions />
      <OurMembers />
      <Address />
      <CustomerFeedback />
    </div>
  );
}

