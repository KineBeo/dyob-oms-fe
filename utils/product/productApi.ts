import toast from "react-hot-toast";
import api from "../config";
import { Product } from "@/interfaces/product";
export class ProductService {
  //  * PUBLIC ENDPOINTS
  async findOneByName(name: string): Promise<Product> {
    try {
      const response = await api.get(`/products/byName/${name}`);
      const product = response.data;
      if (!product) {
        throw new Error("product not found with name you provided");
      }

      return product;
    } catch (error) {
      toast.error("lỗi khi tìm kiếm sản phẩm");
      throw new Error("cannot find product from name");
    }
  }
}

export const productService = new ProductService();
