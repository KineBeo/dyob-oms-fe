import { default as axios } from "axios";
import useSWR from "swr";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
  },
});

const fetcher = (url: string) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
    },
  }).then((res) => res.json());

const getHomepage = async () => {
  console.log("getHomepage");
  const response = await axiosClient
    .get("homepage?populate=*")
    .catch((error) => {
      console.error("Error fetching homepage data:", error);
    });
  console.log(response);
  return response;
};

const getAffiliate = async () => {
  const response = await axiosClient
    .get("affiliate?populate=*")
    .catch((error) => {
      console.error("Error fetching affiliate data:", error);
    });
  return response;
};

const getAboutUsNormal = async () => {
  const response = await axiosClient
    .get("about-us-normal?populate=*")
    .catch((error) => {
      console.error("Error fetching about us normal data:", error);
    });
  return response;
};

const getAboutUs = async () => {
  const response = await axiosClient.get("about-us?populate=*");
  return response;
};

const getOneProduct = async (slug: string) => {
  const response = await axiosClient
    .get(`/products?filters[slug][$eq]=${slug}&populate=*`)
    .catch((error) => {
      console.error("Error fetching product data:", error);
    });

  return response;
};

const StrapiAPI = {
  getHomepage,
  getAffiliate,
  getAboutUsNormal,
  getAboutUs,
  getOneProduct,
};

export default StrapiAPI;
