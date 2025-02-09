import api from "../config";
import toast from "react-hot-toast";
export const userStatusService = {
  async getUserStatusById(user_id: number) {
    try {
      const response = await api.get(`/user-status/${user_id}`);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      toast.error("Không thể tìm thấy trạng thái người dùng");
      console.error(error);
    }
  },
  async getReferrerData(user_id: number) {
    try {
      const response = await api.get(`/user-status/referrer/${user_id}`);
      // console.log(response);
      return response.data;
    } catch (error) {
      toast.error("Không thể tìm thấy người giới thiệu");
      console.error(error);
    }
  },
  async getMonthlyStats(userId: number, month: number, year: number) {
    const response = await api.get(
      `/api/user-status/${userId}/stats?month=${month}&year=${year}`
    );
    return response.data;
  },
};
