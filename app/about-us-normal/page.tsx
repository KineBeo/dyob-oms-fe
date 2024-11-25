"use client"
import CompanyImageSlider from "@/components/about-us-normal/CompanyImageSlider";
import ImageAndDes from "@/components/about-us-normal/ImageAndDes";
import LegalDoc from "@/components/about-us-normal/LegalDoc";
import Vision from "@/components/about-us-normal/Vision";
import * as strapi from "../../utils/globalApi";
import Loading from "../../components/Loading";
import useSWR from "swr";
import { Button, Divider } from "@nextui-org/react";
import Link from "next/link";
import NewSloganAndDes from "@/components/about-us-normal/NewSloganAndDes";
import NewSloganAndDes2 from "@/components/about-us-normal/NewSloganAndDes2";
import NewProducts from "@/components/about-us-normal/NewProducts";



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

  const documents = [
    {
      "id": 1,
      "title": "22.07 Vn tỉnh thức",
      "date": "11/11/2024",
      "filePath": "/pdf/22-07-vn-tinh-thuc.pdf"
    },
    {
      "id": 2,
      "title": "BCB Milk calcium CX",
      "date": "9/11/2023",
      "filePath": "/pdf/bcb-milk-calcium-cx.pdf"
    },
    {
      "id": 3,
      "title": "BCB Tulixo ChlorophyII",
      "date": "9/11/2023",
      "filePath": "/pdf/bcb-tulixo-chlorophyii.pdf"
    },
    {
      "id": 4,
      "title": "Bản công bố Astrojoi moi 2019",
      "date": "1/11/2019",
      "filePath": "/pdf/ban-cong-bo-astrojoi-moi-2019.pdf"
    },
    {
      "id": 5,
      "title": "GCN BQ. ONG BUT",
      "date": "11/11/2024",
      "filePath": "/pdf/gcn-bq-ong-but.pdf"
    },
    {
      "id": 6,
      "title": "GCN. BQ. DONG Y ONG BUT",
      "date": "11/11/2024",
      "filePath": "/pdf/gcn-bq-dong-y-ong-but.pdf"
    },
    {
      "id": 7,
      "title": "TCB_Sâm ngọc linh Thanh Xuân",
      "date": "9/28/2023",
      "filePath": "/pdf/tcb-sam-ngoc-linh-thanh-xuan.pdf"
    },
    {
      "id": 8,
      "title": "Thực phẩm bổ sung Ahlozen protein",
      "date": "9/11/2023",
      "filePath": "/pdf/thuc-pham-bo-sung-ahlozen-protein.pdf"
    },
    {
      "id": 9,
      "title": "Thực phẩm bổ sung Breast lady plus",
      "date": "9/11/2023",
      "filePath": "/pdf/thuc-pham-bo-sung-breast-lady-plus.pdf"
    },
    {
      "id": 10,
      "title": "Thực phẩm bổ sung Multivitamin pluszzs-fruits",
      "date": "9/11/2023",
      "filePath": "/pdf/thuc-pham-bo-sung-multivitamin-pluszzs-fruits.pdf"
    },
    {
      "id": 11,
      "title": "Thực phẩm bổ sung Viên sủi Actiso râu ngô rau má",
      "date": "9/11/2023",
      "filePath": "/pdf/thuc-pham-bo-sung-vien-sui-actiso-rau-ngo-rau-ma.pdf"
    }
  ];

  return (
    <div>
      <div className="flex flex-col items-center justify-center bg-[#3F291B] w-full h-36 mobile:h-32 tablet:h-40">
        <p className=" font-robotoslab text-[#D7A444] font-semibold text-2xl text-left mobile:text-2xl tablet:text-2xl mini-laptop:text-2xl">
          {" "}
          ĐÔNG Y ÔNG BỤT{" "}
        </p>
        <p className="font-robotoslab text-[#D7A444] font-semibold text-3xl text-left mobile:text-2xl tablet:text-2xl mini-laptop:text-2xl">
          {" "}
          QUÁN TÂM AN BỆNH{" "}
        </p>
      </div>
      <div className="bg-paper">
        {/* Image and description */}
        <NewSloganAndDes
          introTitle={Introduction_title}
          introDescript={Introduction_description}
        />
        <NewSloganAndDes2
          introTitle={Introduction_title}
          introDescript={Introduction_description}
        />

        {/* Tam nhin va su menh */}
        {/* <Vision /> */}
        <NewProducts />
        {/* image slide */}
        <CompanyImageSlider images={images} />
        <NewSloganAndDes
          introTitle={Introduction_title}
          introDescript={Introduction_description}
        />
        {/* legal doc */}
        {/* Tạm thời ẩn  */}
        {/* <LegalDoc documents={documents} /> */}
        <div className="flex flex-col  items-center justify-center p-4 mt-4">
          <div className="p-2 font-bold font-robotoslab text-[#4A2511] text-4xl text-center mobile:text-3xl tablet:text-3xl">
            Bạn có muốn đồng hành cùng Ông Bụt chữa bệnh cứu người?
          </div>
          <Divider className="w-24 h-1 bg-[#D7A444]" />
          <div className="mt-10 mobile:p-6 tablet:p-8 mini-laptop:p-8 laptop:p-10 p-10">
            <Link href="https://zalo.me/0888280000">
              <Button
                size="lg"
                className="bg-[#D7A444] hover:bg-[#7A0505] font-robotoflex text-gray-50 font-bold 
              mobile:text-base
              tablet:text-xl
              mini-laptop:text-2xl
              laptop:text-2xl
              desktop:text-2xl"
              >
                Liên hệ với Ông Bụt ngay!
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}