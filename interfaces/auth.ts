export interface RegisterDto {
  name: string;
  phone: string;
  // email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  user: {
    id: number;
    fullname: string;
    // email: string;
    phone_number: string;
  };
}

export interface ApiError {
  message: string;
  statusCode: number;
  error: string;
}

export interface ApiErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
}

// * LOGIN
export interface LoginCredentials {
  // email: string;
  phone_number: string;
  password: string;
}

export interface User {
  id: number,
  // email: string,
  fullname: string,
  phone_number: string,
  role: string,
}

export interface LoginResponse {
  user: User;
  access_token: string;
  refresh_token: string;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
}

export interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
}

export interface RegisterFormData {
  fullname: string;
  phone_number: string;
  // email: string;
  password_hash: string;
  confirmPassword: string;
  referral_code_of_referrer?: string;
}

export interface RegisterResponse {
  user: {
      id: number;
      // email: string;
      fullname: string;
      phone_number: string;
  }
}

export interface FormErrors {
  fullname?: string;
  phone_number?: string;
  // email?: string;
  password_hash?: string;
  confirmPassword?: string;
  referral_code_of_referrer?: string;
  general?: string;
}