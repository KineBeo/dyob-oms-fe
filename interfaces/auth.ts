// types/auth.ts
export interface RegisterDto {
  name: string;
  phone: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  user: {
    id: number;
    fullname: string;
    email: string;
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
