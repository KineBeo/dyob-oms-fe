import { default as axios } from "axios";
import { CategoriesResponse, ProductResponse } from "./api/Product.interface";
import qs from "qs";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
  },
});

export const getHomepage = async () => {
  const response: HomepageRespone = await axiosClient
    .get(
      "homepage?fields[0]=Why_choosing_title&fields[1]=Why_choosing_description&fields[2]=Solution_title&fields[3]=Solution_description&fields[4]=Employee_introduction_title&fields[5]=Location_title&fields[6]=Location_description&fields[7]=Services_title&populate[Why_choosing_cards][populate][Image][fields]=width, height, provider_metadata&populate[Solution_card][populate][Icon][fields]=width, height, provider_metadata&populate[Hero_section_image][fields]=width, height, provider_metadata&populate[Employees][populate][Image][fields]=width, height, provider_metadata&populate[services_content][populate][Image][fields]=width, height, provider_metadata&populate[Location_card][populate][Image][fields]=width, height, provider_metadata&populate[Review]=*"
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
  const response = await axiosClient.get(
    "about-us?populate[slide][populate]=Image"
  );
  return response.data;
};

export const getOneProduct = async (slug: string) => {
  const response: ProductResponse = await axiosClient
    .get(
      `products?fields=id,Name,Price,slug,Product_details&populate[Main_image][fields]=width, height, provider_metadata&populate[Sub_images][fields]=width, height, provider_metadata&populate[category][fields]=name&filters[slug][$eq]=${slug}`
    )
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
    .get(
      "products?fields=id,Name,Price,slug,Product_details&populate[Main_image][fields]=width,height,provider_metadata&populate[Sub_images][fields]=width,height,provider_metadata&populate[category][fields]=name&pagination[pageSize]=100"
    )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error("Error fetching all products data:", error);
    });

  return response;
};

export const getPageOfProducts = async (page = 1, pageSize = 20) => {
  try {
    const response: ProductResponse = await axiosClient.get(
      `products?fields=id,Name,Price,slug,Product_details&populate[Main_image][fields]=width, height, provider_metadata&populate[Sub_images][fields]=width, height, provider_metadata&populate[category][fields]=name&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
    );
    return response;
  } catch (error) {
    console.error("Error fetching all products data:", error);
    throw error;
  }
};

export const getAllCategories = async () => {
  const response = await axiosClient
    .get("categories?fields=name")
    .catch((error) => {
      console.error("Error fetching all categories data:", error);
      return null;
    });

  if (!response) {
    throw new Error("Failed to fetch categories");
  }

  return response.data as CategoriesResponse;
};

export const getAllArticles = async () => {
  const response: ArticleResponse = await axiosClient
    .get("articles?populate=*")
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error("Error fetching all products data:", error);
    });
  return response;
};

export const getOneArticle = async (seoUrl: string) => {
  const response: ArticleResponse = await axiosClient
    .get(`/articles?filters[seoUrl][$eq]=${seoUrl}&populate=*`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error("Error fetching article data:", error);
    });

  return response;
};
export const getAllVisions = async () => {
  const response = await axiosClient
    .get("about-us-normal?populate=visions.text")
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error("Error fetching all visions data:", error);
    });
  return response;
};
export const getAllMissions = async () => {
  const response = await axiosClient
    .get("about-us-normal?populate=missions.text")
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error("Error fetching all mission data:", error);
    });
  return response;
};
