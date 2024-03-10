import { Router } from "express";
import { z } from "zod";
import { validateRequest } from "zod-express-middleware";
import {
  OrderController,
  OrderControllerImpl,
} from "../controller/Order.controller";

const orderRouter = Router();

const orderController: OrderController = new OrderControllerImpl();

orderRouter.post(
  "/create_order",
  [
    validateRequest({
      body: z
        .object({
          pizzaId: z.string(),
          toppings: z.array(z.string()).optional(),
          name: z.string(),
          email: z.string().email(),
          amount: z.number(),
        })
        .or(
          z.array(
            z.object({
              pizzaId: z.string(),
              toppings: z.array(z.string()).optional(),
              name: z.string(),
              email: z.string().email(),
              amount: z.number(),
            })
          )
        ),
    }),
  ],
  orderController.createOrder
);

orderRouter.get(
  `/get_order/:id`,
  [
    validateRequest({
      params: z.object({
        id: z.string(),
      }),
    }),
  ],
  orderController.getOrderById
);

orderRouter.get(`/get_orders`, orderController.getOrders);

export default orderRouter;
