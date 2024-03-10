import { Order } from "@prisma/client";
import db from "../../prisma/db";
import { Order as Orders } from "../domain/Order.domain";

interface OrderDao {
  createOrder(order: Orders): Promise<Order>;
  createManyOrders(orders: Orders[]): Promise<{ count: number }>;
  getOrderById(id: string): Promise<Order | null>;
  getOrders(): Promise<Order[]>;
  updateOrder(id: string, order: Order): Promise<Order>;
  deleteOrder(id: string): Promise<Order>;
}

export class OrderDaoImpl implements OrderDao {
  async createOrder(order: Orders): Promise<Order> {
    return await db.order.create({
      data: {
        orderId: order.orderId,
        pizzaId: order.pizzaId,
        toppings: order.toppings,
        amount: order.amount,
        name: order.name,
        email: order.email,
      },
    });
  }

  async createManyOrders(orders: Orders[]): Promise<{ count: number }> {
    return await db.order.createMany({
      data: orders,
    });
  }

  async getOrderById(id: string): Promise<Order | null> {
    return await db.order.findUnique({
      where: {
        orderId: id,
        AND: { active: true },
      },
    });
  }

  async getOrders(): Promise<Order[]> {
    return await db.order.findMany({
      where: { active: true },
    });
  }

  async updateOrder(id: string): Promise<Order> {
    const orderExists = await this.getOrderById(id);
    if (!orderExists) {
      throw new Error("Order not found");
    }

    return await db.order.update({
      where: { orderId: id },
      data: {
        updatedAt: new Date(),
      },
    });
  }

  async deleteOrder(id: string): Promise<Order> {
    return await db.order.update({
      where: { orderId: id },
      data: { active: false },
    });
  }
}
