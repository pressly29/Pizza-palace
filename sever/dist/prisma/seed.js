"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    await Promise.all([
        prisma.pizza.createMany({
            data: [
                {
                    size: client_1.Size.SMALL,
                    price: 12,
                },
                {
                    size: client_1.Size.MEDIUM,
                    price: 14,
                },
                {
                    size: client_1.Size.LARGE,
                    price: 16,
                },
            ],
        }),
        prisma.topping.createMany({
            data: [
                {
                    name: "Cheese",
                    small: 0.5,
                    medium: 0.75,
                    large: 1.0,
                    type: client_1.ToppingType.BASIC,
                },
                {
                    name: "Pepperoni",
                    small: 0.5,
                    medium: 0.75,
                    large: 1.0,
                    type: client_1.ToppingType.BASIC,
                },
                {
                    name: "Ham",
                    small: 0.5,
                    medium: 0.75,
                    large: 1.0,
                    type: client_1.ToppingType.BASIC,
                },
                {
                    name: "Pineapple",
                    small: 0.5,
                    medium: 0.75,
                    large: 1.0,
                    type: client_1.ToppingType.BASIC,
                },
                {
                    name: "Saussage",
                    small: 2.0,
                    medium: 3.0,
                    large: 4.0,
                    type: client_1.ToppingType.DELUXE,
                },
                {
                    name: "Feta Cheese",
                    small: 2.0,
                    medium: 3.0,
                    large: 4.0,
                    type: client_1.ToppingType.DELUXE,
                },
                {
                    name: "Tomatoes",
                    small: 2.0,
                    medium: 3.0,
                    large: 4.0,
                    type: client_1.ToppingType.DELUXE,
                },
                {
                    name: "Pineapple",
                    small: 2.0,
                    medium: 3.0,
                    large: 4.0,
                    type: client_1.ToppingType.DELUXE,
                },
            ],
        }),
    ]);
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
//# sourceMappingURL=seed.js.map