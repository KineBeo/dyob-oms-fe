import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { authService } from "./auth/authApi";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000,
});

// Single request interceptor that handles both token presence and expiration
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const accessToken = authService.getAccessToken();
    
    // Skip token check for auth endpoints
    if (config.url?.includes('/auth/login') || config.url?.includes('/auth/refresh')) {
      return config;
    }

    try {
      if (!accessToken) {
        throw new Error('No access token available');
      }

      if (authService.isTokenExpired(accessToken)) {
        const newTokens = await authService.refreshToken();
        config.headers.Authorization = `Bearer ${newTokens.access_token}`;
      } else {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    } catch (error) {
      // If there's any error in token handling, redirect to login
      authService.logout();
      // if (typeof window !== 'undefined') {
      //   window.location.href = '/authentication/login';
      // }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Simplified response interceptor focusing only on error handling
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    
    if (!originalRequest || (originalRequest as any)._retry) {
      return Promise.reject(error);
    }

    // Handle 401 errors only if they're not from auth endpoints
    if (error.response?.status === 401 && 
        !originalRequest.url?.includes('/auth/login') && 
        !originalRequest.url?.includes('/auth/refresh')) {
      try {
        (originalRequest as any)._retry = true;
        const newTokens = await authService.refreshToken();
        originalRequest.headers.Authorization = `Bearer ${newTokens.access_token}`;
        return api(originalRequest);
      } catch (refreshError) {
        authService.logout();
        // if (typeof window !== 'undefined') {
        //   window.location.href = '/authentication/login';
        // }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;