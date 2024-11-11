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

  const documents = [
    {
      "id": 1,
      "title": "22.07 Vn tỉnh thức",
      "date": "2024-11-11",
      "filePath": "public/pdf/22.07 Vn tỉnh thức.pdf"
    },
    {
      "id": 2,
      "title": "BCB Milk calcium CX",
      "date": "2023-11-09",
      "filePath": "public/pdf/BCB Milk calcium CX.pdf"
    },
    {
      "id": 3,
      "title": "BCB Tulixo ChlorophyII",
      "date": "2023-11-09",
      "filePath": "public/pdf/BCB Tulixo ChlorophyII.pdf"
    },
    {
      "id": 4,
      "title": "Bản công bố Astrojoi moi 2019",
      "date": "2019-11-01",
      "filePath": "public/pdf/Bản công bố Astrojoi moi 2019.pdf"
    },
    {
      "id": 5,
      "title": "Công bố TX gửi Ông Bụt",
      "date": "2024-11-11",
      "filePath": "public/pdf/Công bố TX gửi Ông Bụt.zip"
    },
    {
      "id": 6,
      "title": "GCN BQ. ONG BUT",
      "date": "2024-11-11",
      "filePath": "public/pdf/GCN BQ. ONG BUT.pdf"
    },
    {
      "id": 7,
      "title": "GCN. BQ. DONG Y ONG BUT",
      "date": "2024-11-11",
      "filePath": "public/pdf/GCN. BQ. DONG Y ONG BUT.pdf"
    },
    {
      "id": 8,
      "title": "TCB_Sâm ngọc linh Thanh Xuân",
      "date": "2023-09-28",
      "filePath": "public/pdf/TCB_Sâm ngọc linh Thanh Xuân.pdf"
    },
    {
      "id": 9,
      "title": "Thực phẩm bổ sung Ahlozen protein",
      "date": "2023-11-09",
      "filePath": "public/pdf/Thực phẩm bổ sung Ahlozen protein.pdf"
    },
    {
      "id": 10,
      "title": "Thực phẩm bổ sung Breast lady plus",
      "date": "2023-11-09",
      "filePath": "public/pdf/Thực phẩm bổ sung Breast lady plus.pdf"
    },
    {
      "id": 11,
      "title": "Thực phẩm bổ sung Multivitamin pluszzs-fruits",
      "date": "2023-11-09",
      "filePath": "public/pdf/Thực phẩm bổ sung Multivitamin pluszzs-fruits.pdf"
    },
    {
      "id": 12,
      "title": "Thực phẩm bổ sung Viên sủi Actiso râu ngô rau má",
      "date": "2023-11-09",
      "filePath": "public/pdf/Thực phẩm bổ sung Viên sủi Actiso râu ngô rau má.pdf"
    }
  ]

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
        <LegalDoc
          documents={documents}
        />
      </div>
    </div>
  );
}