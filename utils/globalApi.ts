import { default as axios } from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:1337/api",
});

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

const StrapiAPI = {
  getHomepage,
  getAffiliate,
  getAboutUsNormal,
  getAboutUs,
};

export default StrapiAPI;
