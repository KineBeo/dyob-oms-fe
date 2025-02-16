import toast from "react-hot-toast";
import api from "../config";
export const userTransactionService = {
  async getPersonalTransactionData() {
    try {
      const response = await api.get(`/user-transactions/user/me`);
      return response.data;
    } catch (error) {
      toast.error("Không thể tìm thấy giao dịch cá nhân");
      console.error(error);
    }
  },
  async getAllUserTransactionData() {
    try {
      const response = await api.get(`/user-transactions`);
      return response.data;
    } catch (error) {
      toast.error("Không thể tìm thấy giao dịch người dùng");
      console.error(error);
    }
  },
};
