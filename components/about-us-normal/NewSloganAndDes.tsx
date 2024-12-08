import { BreadcrumbItem, Breadcrumbs, Divider } from "@nextui-org/react";
import Image from "next/image";

interface ImageAndDesProps {
  introTitle: string;
  introDescript: string;
}

export default function NewSloganAndDes(props: ImageAndDesProps) {
  return (
    <div className="mx-auto px-4 pt-2 pb-4 w-full max-w-4xl tablet:max-w-lg mini-laptop:max-w-2xl desktop:max-w-5xl">
      <Breadcrumbs className="pt-2">
        <BreadcrumbItem className="font-medium">Trang chủ</BreadcrumbItem>
        <BreadcrumbItem className="text-[#D7A444] font-bold">
          Về chúng tôi
        </BreadcrumbItem>
      </Breadcrumbs>
      <div className="flex flex-col justify-center items-center mb-6 mobile:mb-4 tablet:mb-4 w-full"></div>

      <div className="justify-between items-start gap-4 grid grid-cols-2 mobile:grid-cols-1 tablet:grid-cols-1">
        {/* Text content */}

        <div className="space-y-4 w-full">
          <p className=" font-bold font-robotoslab text-[#4A2511] italic text-2xl text-left mobile:text-3xl tablet:text-3xl">
            &quot;Chữa bệnh cứu người, làm thiện nguyện qua hành động&quot;
          </p>
          <p className="font-robotoflex text-lg desktop:text-lg mobile:text-base tablet:text-base">
            Từ khi thành lập, Đông Y Ông Bụt đã mang trong mình một sứ mệnh cao
            cả - chữa lành thân và tâm cho mọi người, không chỉ ở Việt Nam mà
            còn hướng ra thế giới. Chúng tôi tin rằng, qua việc phục hồi sức
            khỏe thể chất, chúng ta cũng có thể giúp đỡ, nâng đỡ tinh thần của
            những người xung quanh. Chữa lành thân - chữa lành tâm, đó là cách
            chúng tôi hành đạo giúp đời, thấm nhuần đạo đức nghề nghiệp vào mỗi
            bước đi, từng sản phẩm và từng sự kiện.
          </p>
        </div>
        {/* Image container */}
        <div className="w-full">
          <img
            src="images/aboutusnormal/placeholder.png"
            alt="Traditional healing"
            className="shadow-md rounded-lg w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}
