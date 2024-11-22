import api from "../config";
import toast from "react-hot-toast";
import { OrderStatus } from "@/interfaces/order";

export const orderService = {
  async createOrder(
    user_id: number,
    referral_code_of_referrer: string,
    shipping_address_id: number
  ) {
    try {
      const createOrderDto = {
        user_id,
        referral_code_of_referrer,
        shipping_address_id,
      };
      const response = await api.post(`/orders`, createOrderDto);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  async getOrderByUserID(user_id: number) {
    try {
      const response = await api.get(`/orders/user/getAll/${user_id}`);
      return response.data;
    } catch (error) {
      // toast.error("Bạn chưa có đơn hàng nào!");
      console.error(error);
    }
  },
  async getAllOrders() {
    try {
      const response = await api.get('/orders');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  async updateOrderStatusAdmin(order_id: number, status: OrderStatus) {
    try {
      const updateOrderStatusDto = {
        status,
      };
      const response = await api.patch(
        `/orders/id/updateOrderAdmin/${order_id}`,
        updateOrderStatusDto
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  
};
