import api from "../config";
import { isAuthenticated } from "../config";
import toast from "react-hot-toast";
export const orderService = {
  async getCart(userId: number) {
    const response = await api.get(`/cart/id/${userId}`);
    return response.data;
  },

  async createOrder(user_id: number, address: string) {
    try {
      if (!isAuthenticated()) {
        toast.error("Vui lòng đăng nhập để tạo đơn hàng");
        throw new Error("User not authenticated");
      }
      const createOrderDto = {
        user_id,
        address,
      };
      const response = await api.post(`/orders`, createOrderDto);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  async getOrderByUserID(user_id: number) {
    try {
      if (!isAuthenticated()) {
        toast.error("Vui lòng đăng nhập để xem đơn hàng");
        throw new Error("User not authenticated");
      }
      const response = await api.get(`/orders/user/getAll/${user_id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
};
