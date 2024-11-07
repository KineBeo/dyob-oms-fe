import api from "../config";
import toast from "react-hot-toast";
export const userStatusService = {
  async getUserStatusById(user_id: number) {
    try {
      const response = await api.get(`/user-status/${user_id}`);
      return response.data;
    } catch (error) {
      toast.error("Không thể tìm thấy trạng thái người dùng");
      console.error(error);
    }
  },
};

