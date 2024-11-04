import api from "../config";
import { CartItem } from "@/interfaces/cart";
import { isAuthenticated } from "../config";
import toast from "react-hot-toast";
export const cartService = {
  async getCart(userId: number) {
    const response = await api.get(`/cart/id/${userId}`);
    return response.data;
  },

  async addToCart(cartItem: Omit<CartItem, 'id'>) {
    if (!isAuthenticated()) {
      toast.error('Vui lòng đăng nhập để thêm vào giỏ hàng');
      throw new Error('User not authenticated');
    }
    const response = await api.post('/cart', cartItem);
    return response.data;
  },

  async updateCartItem(cartItem: CartItem) {
    const response = await api.put(`/cart/id/${cartItem.user_id}`, cartItem);
    return response.data;
  },

  async removeFromCart(userId: number, productId: number) {
    const response = await api.delete(`/cart/all/id/${userId}/product/${productId}`);
    return response.data;
  },

  async clearCart(userId: number) {
    const response = await api.delete(`/cart/id/${userId}`);
    return response.data;
  }
};