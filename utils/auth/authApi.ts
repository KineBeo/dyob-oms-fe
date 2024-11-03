import api from "../config";

import { LoginCredentials, LoginResponse } from "@/interfaces/auth";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

class AuthService {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const res = await api.post<LoginResponse>("/auth/login", credentials);
    this.setTokens(res.data.access_token, res.data.refresh_token);
    this.setAuthHeader(res.data.access_token);
    return res.data;
  }

  logout(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    this.removeAuthHeader();
  }

  setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  setAuthHeader(token: string): void {
    api.defaults.headers["Authorization"] = `Bearer ${token}`;
  }
  removeAuthHeader(): void {
    delete api.defaults.headers.common["Authorization"];
  }

  initializeAuth(): void {
    const token = this.getAccessToken();
    if (token) {
      this.setAuthHeader(token);
    }
  }
}
export const authService = new AuthService();
