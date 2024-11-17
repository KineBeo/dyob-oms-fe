import { ShippingFormData } from "@/interfaces/user-address";
import api from "../config";
import toast from "react-hot-toast";

export const userAddressService = {
  async createAddress(data: ShippingFormData) {
    try {
      const response = await api.post("/user-address", data);
      return response.data;
    } catch (error) {
      toast.error("Không thể tạo địa chỉ mới!");
      throw error;
    }
  },

  async getUserAddresses(userId: number) {
    try {
      const response = await api.get(`/user-address/user/${userId}`);
      return response.data;
    } catch (error) {
      toast.error("Không thể lấy danh sách địa chỉ!");
      throw error;
    }
  },

  async getDefaultAddress(userId: number) {
    try {
      const response = await api.get(`/user-address/default/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Không tìm thấy địa chỉ mặc định");
      return null;
    }
  },

  async updateAddress(addressId: number, data: Partial<ShippingFormData>) {
    try {
      const response = await api.patch(`/user-address/${addressId}`, data);
      toast.success("Cập nhật địa chỉ thành công!");
      return response.data;
    } catch (error) {
      toast.error("Không thể cập nhật địa chỉ!");
      throw error;
    }
  },
  
  async deleteAddress(addressId: number) {
    try {
      const response = await api.delete(`/user-address/${addressId}`);
      toast.success("Xóa địa chỉ thành công!");
      return response.data;
    } catch (error) {
      toast.error("Không thể xóa địa chỉ!");
      throw error;
    }
  }
};
