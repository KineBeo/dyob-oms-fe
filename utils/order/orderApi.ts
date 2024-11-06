import api from "../config";
import toast from "react-hot-toast";
export const orderService = {


 async createOrder(user_id: number, referral_code_of_referrer: string, address: string) {
   try {
     const createOrderDto = {
       user_id,
       referral_code_of_referrer,
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
     const response = await api.get(`/orders/user/getAll/${user_id}`);
     return response.data;
   } catch (error) {
     toast.error("Bạn chưa có đơn hàng nào!");
     console.error(error);
   }
 }
};
