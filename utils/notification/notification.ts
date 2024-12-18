import { ShippingFormData } from "@/interfaces/user-address";
import api from "../config";
import toast from "react-hot-toast";

export const notificationService = {
  async getNotification() {
    try {
      const response = await api.get("/notifications");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async markAsRead(notificationId: number) {
    try {
      await api.patch(`/notifications/read/${notificationId}`);
    } catch (error) {
      throw error;
    }
  },
  async deleteNotification(notificationId: number) {
    try {
      await api.delete(`/notifications/${notificationId}`);
    } catch (error) {
      throw error;
    }
  },
  async clearAllNotifications() {
    try {
      await api.delete("/notifications/all");
    } catch (error) {
      throw error;
    }
  },
};
