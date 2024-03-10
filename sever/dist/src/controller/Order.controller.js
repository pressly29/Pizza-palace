"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderControllerImpl = void 0;
const Order_dao_1 = require("../dao/Order.dao");
const Order_domain_1 = require("../domain/Order.domain");
class OrderControllerImpl {
    constructor() {
        this.createOrder = async (req, res, next) => {
            try {
                const orderRequest = req.body;
                // If the request is an array, create multiple orders
                if (Array.isArray(orderRequest)) {
                    const orders = orderRequest.map((order) => {
                        const { pizzaId, toppings, email, name, amount } = order;
                        return (0, Order_domain_1.newOrder)({ pizzaId, toppings, email, name, amount });
                    });
                    const response = await this.orderDao.createManyOrders(orders);
                    res.status(201).json({ count: response.count });
                    return;
                }
                const { pizzaId, toppings, email, name, amount } = orderRequest;
                const order = (0, Order_domain_1.newOrder)({ pizzaId, toppings, email, name, amount });
                const createdOrder = await this.orderDao.createOrder(order);
                res.status(201).json(createdOrder);
            }
            catch (error) {
                next(error);
            }
        };
        this.getOrderById = async (req, res, next) => {
            try {
                const { id } = req.params;
                const order = await this.orderDao.getOrderById(id);
                if (!order) {
                    res.status(404).json({ message: "Order not found" });
                    return;
                }
                res.status(200).json(order);
            }
            catch (error) {
                next(error);
            }
        };
        this.getOrders = async (_req, res, next) => {
            try {
                const orders = await this.orderDao.getOrders();
                res.status(200).json(orders);
            }
            catch (error) {
                next(error);
            }
        };
        this.updateOrder = async (req, res, next) => {
            try {
                const { id } = req.params;
                const order = await this.orderDao.getOrderById(id);
                if (!order) {
                    return res.status(404).json({ message: "Order not found" });
                }
                res.status(200).json(order);
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteOrder = async (req, res, next) => {
            try {
                const { id } = req.params;
                const order = await this.orderDao.deleteOrder(id);
                res.status(200).json(order);
            }
            catch (error) {
                next(error);
            }
        };
        this.orderDao = new Order_dao_1.OrderDaoImpl();
    }
}
exports.OrderControllerImpl = OrderControllerImpl;
//# sourceMappingURL=Order.controller.js.map