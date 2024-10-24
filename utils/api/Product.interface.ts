// ProductTypes.ts

// Interface for the main image
interface MainImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  // Add other image properties as needed
}

// Interface for a single product
interface Product {
  id: number;
  Main_image: {
    url: string;
  };
  Name: string;
  Price: string; // Using string since the price comes as a string from API
  Product_details: string;
  Product_details_title: string | null;
  Sub_images: null | any[]; // Replace 'any' with proper type if sub_images structure is known
  slug: string;
  filter: string;
}

// Main response interface
interface ProductResponse {
  data: Product[];
}

export type { Product, ProductResponse };
