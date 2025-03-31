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
    provider_metadata: {
      public_id: string;
    };
  };
  Name: string;
  Price: string; // Using string since the price comes as a string from API
  Product_details?: string;
  Product_details_title?: string | null;
  Sub_images?: null | any[]; // Replace 'any' with proper type if sub_images structure is known
  slug: string;
  old_price?: string | null;
  category: {
    id: number;
  };
}

// interfaces/product.ts
interface PaginationMeta {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

interface ProductResponse {
  data: Product[];
  meta: PaginationMeta;
}

interface FilterCategory {
  name: string;
  filter: string;
  id: number;
  documentId: string;
}

interface CategoriesResponse {
  data: FilterCategory[];
}

export type { Product, ProductResponse, FilterCategory, CategoriesResponse };
