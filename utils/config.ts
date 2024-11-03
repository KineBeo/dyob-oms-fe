import { ApiError } from "@/interfaces/auth";
import axios, { AxiosError, AxiosResponse } from "axios";

const api = axios.create({
  // Make sure this matches your backend URL exactly
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  // Add timeout
  timeout: 10000,
});

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("access_token");
  return !!token;
};

api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem("access_token");

    // If token exists, add it to headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError<ApiError>) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      // If there's no original request or it's already been retried, redirect to login
      if (!originalRequest || (originalRequest as any)._retry) {
        // Clear tokens
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        // You can either throw an error or redirect to login
        throw new Error("Not authenticated");
      }

      try {
        // Mark request as retried
        (originalRequest as any)._retry = true;

        // Get refresh token
        const refreshToken = localStorage.getItem("refresh_token");

        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        // Attempt to refresh the token
        const response = await api.post<{ accessToken: string }>(
          "/auth/refresh",
          {
            refresh_token: refreshToken,
          }
        );

        // Store new access token
        const newAccessToken = response.data.accessToken;
        localStorage.setItem("access_token", newAccessToken);

        // Update authorization header
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        // Clear tokens on refresh failure
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        throw new Error("Session expired. Please login again.");
      }
    }

    // For other errors, return a formatted error message
    const errorMessage = error.response?.data?.message || "An error occurred";
    throw new Error(errorMessage);
  }
);
export default api;
