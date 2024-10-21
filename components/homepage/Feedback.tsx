import React from "react";
import { Card, CardBody } from "@nextui-org/react";

const SideVideos = () => {
  return (
    <Card className="h-fit shadow-lg border border-black">
    <CardBody className="grid grid-cols-2 gap-2">
      <img src="/images/herosection.png" alt="no" className="w-full h-full object-cover" />
        <p className="text-md font-medium h-full">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eleifend at ante et sagittis.</p>
    </CardBody>
  </Card>
  )
}

export default function CustomerFeedback() {
  return (
    <div className="mx-auto px-4 py-8 max-w-4xl desktop:max-w-5xl">
      <h1 className="mobile:text-2xl 
                    tablet:text-2xl
                    mini-laptop:text-2xl text-3xl font-bold font-robotoslab text-[#7A0505] text-center mb-2">
        PHẢN HỒI KHÁCH HÀNG
      </h1>
      <div className="w-24 h-1 bg-[#D7A444] mx-auto mb-8"></div>

      <div className="w-full grid grid-cols-3 mobile:flex-col mobile:flex tablet:flex tablet:flex-col gap-4">
        <div className="col-span-2">
          <Card className="w-full h-full">
            <CardBody>
              <img src="/images/herosection.png" alt="no" className="w-full h-full object-cover mb-4" />
              <p className="mobile:text-md text-lg font-medium">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eleifend at ante et sagittis.</p>
            </CardBody>
          </Card>
        </div>

        <div className="w-full grid grid-rows-4 tablet:grid-cols-2 tablet:grid-rows-2 gap-4">
          <SideVideos />
          <SideVideos />
          <SideVideos />
          <SideVideos />
        </div>
      </div>
    </div>
  );
}