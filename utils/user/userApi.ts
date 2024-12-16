import { User } from "@/interfaces/user";
import { CreateUserDto, UpdateUserDto } from "@/interfaces/user";
import api from "../config";
import toast from "react-hot-toast";

interface PaginationResponse<T> {
  data: T[];
  totalPages: number;
  currentPage: number;
  totalUsers: number;
}

export const userService = {
  async create(userData: CreateUserDto): Promise<User> {
    try {
      const response = await api.post<User>("/users", userData);
      toast.success("Tạo người dùng thành công");
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Không thể tạo người dùng");
      throw error;
    }
  },

  // Admin: Lấy danh sách tất cả người dùng
  async getAll(): Promise<User[]> {
    try {
      const response = await api.get<User[]>("/users");
      return response.data;
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Không thể lấy danh sách người dùng"
      );
      throw error;
    }
  },

  async getAllPagination(query: {
    page: number;
    pageSize: number;
    search: string;
  }): Promise<PaginationResponse<User>> {
    try {
      console.log(query);
      const response = await api.get<PaginationResponse<User>>("/users/page", {
        params: {
          page: query.page || 1,
          pageSize: query.pageSize || 100,
          search: query.search || "",
        },
      });
      console.log(response);
      return response.data;
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Không thể lấy danh sách người dùng"
      );
      throw error;
    }
  },

  // Lấy thông tin người dùng theo ID (người dùng chỉ có thể xem thông tin của chính mình)
  async getById(id: number): Promise<User> {
    try {
      const response = await api.get<User>(`/users/id/${id}`);
      return response.data;
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Không thể lấy thông tin người dùng"
      );
      throw error;
    }
  },

  async adminUpdate(id: number, updateData: UpdateUserDto): Promise<User> {
    try {
      const response = await api.patch<User>(
        `/users/admin/id/${id}`,
        updateData
      );
      toast.success("Cập nhật thông tin thành công");
      return response.data;
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Không thể cập nhật thông tin người dùng"
      );
      throw error;
    }
  },

  // Cập nhật thông tin người dùng (người dùng chỉ có thể cập nhật thông tin của chính mình)
  async update(id: number, updateData: UpdateUserDto): Promise<User> {
    try {
      const response = await api.patch<User>(`/users/id/${id}`, updateData);
      toast.success("Cập nhật thông tin thành công");
      return response.data;
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Không thể cập nhật thông tin người dùng"
      );
      throw error;
    }
  },

  // Admin: Xóa người dùng
  async remove(id: number): Promise<void> {
    try {
      await api.delete(`/users/id/${id}`);
      toast.success("Xóa người dùng thành công");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Không thể xóa người dùng");
      throw error;
    }
  },

  // Admin: Tìm người dùng theo số điện thoại
  async findByPhone(phoneNumber: string): Promise<User> {
    try {
      const response = await api.get<User>("/users/phone", {
        params: { phone_number: phoneNumber },
      });
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Không tìm thấy người dùng");
      throw error;
    }
  },
};
