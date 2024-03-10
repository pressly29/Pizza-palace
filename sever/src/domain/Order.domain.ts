import { ulid } from "ulid";

export interface OrderRequest {
  pizzaId: string;
  toppings: string[];
  name: string;
  email: string;
  amount: number;
}

export interface Order extends OrderRequest {
  orderId: string;
}

export interface NewOrder {
  id: string;
  pizzaId: string;
  toppings: string[];
}

export const newOrder = ({
  pizzaId,
  toppings,
  amount,
  name,
  email,
}: OrderRequest): Order => {
  return {
    orderId: `order_${ulid()}`,
    pizzaId,
    toppings,
    amount,
    name,
    email,
  };
};
