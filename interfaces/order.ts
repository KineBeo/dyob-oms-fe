// interfaces/order.ts
export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: number;
  type: string;
  attributes: object;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderProduct {
  id: number;
  quantity: number;
  price: string;
  product: Product;
}

export interface Order {
  id: number;
  total_amount: string;
  address: string;
  status: OrderStatus;
  createdAt: Date;
  updateAt: Date;
  orderProduct: OrderProduct[];
}

export enum OrderStatus {
  NOT_START_YET = 'NOT_START_YET',
  ON_GOING = 'ON_GOING',
  COMPLETED = 'COMPLETED',
}