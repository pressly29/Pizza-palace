import { PrismaClient, Size, ToppingType } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await Promise.all([
    prisma.pizza.createMany({
      data: [
        {
          size: Size.SMALL,
          price: 12,
        },
        {
          size: Size.MEDIUM,
          price: 14,
        },
        {
          size: Size.LARGE,
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
          type: ToppingType.BASIC,
        },
        {
          name: "Pepperoni",
          small: 0.5,
          medium: 0.75,
          large: 1.0,
          type: ToppingType.BASIC,
        },
        {
          name: "Ham",
          small: 0.5,
          medium: 0.75,
          large: 1.0,
          type: ToppingType.BASIC,
        },
        {
          name: "Pineapple",
          small: 0.5,
          medium: 0.75,
          large: 1.0,
          type: ToppingType.BASIC,
        },
        {
          name: "Saussage",
          small: 2.0,
          medium: 3.0,
          large: 4.0,
          type: ToppingType.DELUXE,
        },
        {
          name: "Feta Cheese",
          small: 2.0,
          medium: 3.0,
          large: 4.0,
          type: ToppingType.DELUXE,
        },
        {
          name: "Tomatoes",
          small: 2.0,
          medium: 3.0,
          large: 4.0,
          type: ToppingType.DELUXE,
        },
        {
          name: "Pineapple",
          small: 2.0,
          medium: 3.0,
          large: 4.0,
          type: ToppingType.DELUXE,
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
