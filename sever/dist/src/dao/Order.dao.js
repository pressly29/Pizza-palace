"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDaoImpl = void 0;
const db_1 = __importDefault(require("../../prisma/db"));
class OrderDaoImpl {
    async createOrder(order) {
        return await db_1.default.order.create({
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
    async createManyOrders(orders) {
        return await db_1.default.order.createMany({
            data: orders,
        });
    }
    async getOrderById(id) {
        return await db_1.default.order.findUnique({
            where: {
                orderId: id,
                AND: { active: true },
            },
        });
    }
    async getOrders() {
        return await db_1.default.order.findMany({
            where: { active: true },
        });
    }
    async updateOrder(id) {
        const orderExists = await this.getOrderById(id);
        if (!orderExists) {
            throw new Error("Order not found");
        }
        return await db_1.default.order.update({
            where: { orderId: id },
            data: {
                updatedAt: new Date(),
            },
        });
    }
    async deleteOrder(id) {
        return await db_1.default.order.update({
            where: { orderId: id },
            data: { active: false },
        });
    }
}
exports.OrderDaoImpl = OrderDaoImpl;
//# sourceMappingURL=Order.dao.js.map