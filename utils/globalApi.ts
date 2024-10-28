import { default as axios } from "axios";
import { ProductResponse } from "./api/Product.interface";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
  },
});

export const getHomepage = async () => {
  const response: HomepageRespone = await axiosClient
    .get(
      "https://dyob-cms.onrender.com/api/homepage?fields[0]=Why_choosing_title&fields[1]=Why_choosing_description&fields[2]=Solution_title&fields[3]=Solution_description&fields[4]=Employee_introduction_title&fields[5]=Location_title&fields[6]=Location_description&fields[7]=Services_title&populate[Why_choosing_cards][populate][Image][fields]=width, height, provider_metadata&populate[Solution_card][populate][Icon][fields]=width, height, provider_metadata&populate[Hero_section_image][fields]=width, height, provider_metadata&populate[Employees][populate][Image][fields]=width, height, provider_metadata&populate[services_content][populate][Image][fields]=width, height, provider_metadata&populate[Location_card][populate][Image][fields]=width, height, provider_metadata&populate[Review]=*"
    )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error("Error fetching homepage data:", error);
    });
  return response;
};

export const getAffiliate = async () => {
  const response = await axiosClient
    .get("affiliate?populate=*")
    .catch((error) => {
      console.error("Error fetching affiliate data:", error);
    });
  return response;
};

export const getAboutUsNormal = async () => {
  const response = await axiosClient
    .get("about-us-normal?populate=*")
    .catch((error) => {
      console.error("Error fetching about us normal data:", error);
    });
  return response;
};

export const getAboutUs = async () => {
  const response = await axiosClient.get("about-us?populate[slide][populate]=Image");
  return response.data;
};

export const getOneProduct = async (slug: string) => {
  const response: ProductResponse = await axiosClient
    .get(`/products?filters[slug][$eq]=${slug}&populate=*`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error("Error fetching product data:", error);
    });

  return response;
};

export const getAllProducts = async () => {
  const response: ProductResponse = await axiosClient
    .get("products?populate=*")
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error("Error fetching all products data:", error);
    });

  return response;
};
