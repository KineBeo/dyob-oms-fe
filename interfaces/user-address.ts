export interface UserAddress {
  id: number;
  user_id: number;
  receiver_name: string;
  phone_number: string;
  province: string;
  district: string;
  ward: string;
  street_address: string;
  notes?: string;
  is_default: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface ShippingFormData  {
  user_id: number;
  receiver_name: string;
  phone_number: string;
  province: string;
  district: string;
  ward: string;
  street_address: string;
  notes?: string;
  is_default?: boolean;
  referralCode?: string;
}

export interface ExistingAddress extends ShippingFormData {
  id: number;
  created_at: Date;
  updated_at: Date;
}