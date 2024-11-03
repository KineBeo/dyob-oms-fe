export interface Order {
  id: number;
  user_id: number;
  total_amount: string;
  status: string;
  address: string;
  createdAt: Date;
  updateAt: Date;
}
