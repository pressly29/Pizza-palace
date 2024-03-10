"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newOrder = void 0;
const ulid_1 = require("ulid");
const newOrder = ({ pizzaId, toppings, amount, name, email, }) => {
    return {
        orderId: `order_${(0, ulid_1.ulid)()}`,
        pizzaId,
        toppings,
        amount,
        name,
        email,
    };
};
exports.newOrder = newOrder;
//# sourceMappingURL=Order.domain.js.map