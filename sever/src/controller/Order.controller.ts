import { Order } from "@prisma/client";
import { RequestHandler } from "express";
import { OrderDaoImpl } from "../dao/Order.dao";
import { OrderRequest, newOrder } from "../domain/Order.domain";

type CreateOrderRequest = OrderRequest | OrderRequest[];

interface CreateManyOrdersResponse {
  count: number;
}

type GetOrderByIdRequest = {
  id: string;
};

type DeleteOrderResponse = {
  id: string;
  active: boolean;
};

type ErrorResponseBody = {
  message: string;
};

export interface OrderController {
  createOrder: RequestHandler<
    never,
    Order | ErrorResponseBody | CreateManyOrdersResponse,
    CreateOrderRequest
  >;
  getOrderById: RequestHandler<
    GetOrderByIdRequest,
    Order | ErrorResponseBody,
    never
  >;
  getOrders: RequestHandler<never, Order[] | ErrorResponseBody, never>;
  updateOrder: RequestHandler<
    GetOrderByIdRequest,
    Order | ErrorResponseBody,
    never
  >;
  deleteOrder: RequestHandler<
    GetOrderByIdRequest,
    DeleteOrderResponse | ErrorResponseBody,
    never
  >;
}

export class OrderControllerImpl implements OrderController {
  private readonly orderDao: OrderDaoImpl;

  constructor() {
    this.orderDao = new OrderDaoImpl();
  }

  createOrder: RequestHandler<
    never,
    Order | ErrorResponseBody | CreateManyOrdersResponse,
    CreateOrderRequest
  > = async (req, res, next) => {
    try {
      const orderRequest = req.body;

      // If the request is an array, create multiple orders
      if (Array.isArray(orderRequest)) {
        const orders = orderRequest.map((order) => {
          const { pizzaId, toppings, email, name, amount } = order;
          return newOrder({ pizzaId, toppings, email, name, amount });
        });

        const response = await this.orderDao.createManyOrders(orders);

        res.status(201).json({ count: response.count });
        return;
      }

      const { pizzaId, toppings, email, name, amount } = orderRequest;
      const order = newOrder({ pizzaId, toppings, email, name, amount });
      const createdOrder = await this.orderDao.createOrder(order);

      res.status(201).json(createdOrder);
    } catch (error) {
      next(error);
    }
  };

  getOrderById: RequestHandler<
    GetOrderByIdRequest,
    Order | ErrorResponseBody,
    never
  > = async (req, res, next) => {
    try {
      const { id } = req.params;

      const order = await this.orderDao.getOrderById(id);

      if (!order) {
        res.status(404).json({ message: "Order not found" });
        return;
      }

      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  };

  getOrders: RequestHandler<never, Order[] | ErrorResponseBody, never> = async (
    _req,
    res,
    next
  ) => {
    try {
      const orders = await this.orderDao.getOrders();

      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  };

  updateOrder: RequestHandler<
    GetOrderByIdRequest,
    Order | ErrorResponseBody,
    never
  > = async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await this.orderDao.getOrderById(id);

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  };

  deleteOrder: RequestHandler<
    GetOrderByIdRequest,
    DeleteOrderResponse | ErrorResponseBody,
    never
  > = async (req, res, next) => {
    try {
      const { id } = req.params;

      const order = await this.orderDao.deleteOrder(id);

      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  };
}
