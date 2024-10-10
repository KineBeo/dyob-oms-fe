import Image from "next/image";
import WhyChoosing from "@/components/homepage/WhyChoosing";
import Solutions from "@/components/homepage/Solutions";
import OurMembers from "@/components/homepage/OurMembers";
import Address from "@/components/homepage/Address";
export default function Home() {
  
  
  return (
    <div>
      {/* Hero section  */}
      <div className="w-full">
        <Image
          src="/images/herosection-homepage.jpg"
          width={1920}
          height={698}
          style={{ height: "100%", width: "100%" }}
          alt="Herosection"
        />
      </div>
      <WhyChoosing/>
      <Solutions/>
      <OurMembers/>
      <Address/>
    </div>
  );
}
