import { default as axios } from "axios";
import { ProductResponse } from "./api/Product.interface";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
  },
});

export const getHomepage = async () => {
  console.log("getHomepage");
  const response = await axiosClient
    .get("homepage?populate=*")
    .catch((error) => {
      console.error("Error fetching homepage data:", error);
    });
  console.log(response);
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
  const response = await axiosClient.get("about-us?populate=*");
  return response;
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
