"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const zod_express_middleware_1 = require("zod-express-middleware");
const Order_controller_1 = require("../controller/Order.controller");
const orderRouter = (0, express_1.Router)();
const orderController = new Order_controller_1.OrderControllerImpl();
orderRouter.post("/create_order", [
    (0, zod_express_middleware_1.validateRequest)({
        body: zod_1.z
            .object({
            pizzaId: zod_1.z.string(),
            toppings: zod_1.z.array(zod_1.z.string()).optional(),
            name: zod_1.z.string(),
            email: zod_1.z.string().email(),
            amount: zod_1.z.number(),
        })
            .or(zod_1.z.array(zod_1.z.object({
            pizzaId: zod_1.z.string(),
            toppings: zod_1.z.array(zod_1.z.string()).optional(),
            name: zod_1.z.string(),
            email: zod_1.z.string().email(),
            amount: zod_1.z.number(),
        }))),
    }),
], orderController.createOrder);
orderRouter.get(`/get_order/:id`, [
    (0, zod_express_middleware_1.validateRequest)({
        params: zod_1.z.object({
            id: zod_1.z.string(),
        }),
    }),
], orderController.getOrderById);
orderRouter.get(`/get_orders`, orderController.getOrders);
exports.default = orderRouter;
//# sourceMappingURL=order.route.js.map