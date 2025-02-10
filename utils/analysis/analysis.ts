import toast from "react-hot-toast";
import api from "../config";

export const analysisService = {
  async getAnalysisData(startDate: string, endDate: string) {
    try {
      const response = await api.get(
        `/analysis?start=${startDate}&end=${endDate}`
      );
      return response.data;
    } catch (error) {
      toast.error("Không thể tìm thấy dữ liệu phân tích");
      console.error(error);
    }
  },
};
