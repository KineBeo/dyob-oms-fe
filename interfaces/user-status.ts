import { User } from "./auth";

export interface UserStatus {
  user: User;
  personal_referral_code: string;
  user_rank: string;
  user_class: string;
  referrer_name: string | null;
  rank_achievement_date: string;
  total_orders: number;
  total_purchase: number;
  total_sales: number;
  //   group_sales: number;
  commission: string;
  //   group_commission: string;
  referrals: Referral[];
  user_type: "NORMAL" | "AFFILIATE";
  createdAt: Date;
}

export interface Referral {
  id: string;
  fullname: string;
  personal_referral_code: string;
  referrer_name: string | null;
  total_purchase: string;
  user_rank: string;
  total_sales: number;
  referrals: Referral[];
  createdAt: Date;
}
