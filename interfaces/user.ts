export interface User {
  id: number;
  fullname: string;
  phone_number: string;
  password_hash: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserDto {
  fullname: string;
  phone_number: string;
  password_hash: string;
  referral_code_of_referrer?: string;
}

export interface UpdateUserDto {
  fullname?: string;
  phone_number?: string;
  password_hash?: string;
}
