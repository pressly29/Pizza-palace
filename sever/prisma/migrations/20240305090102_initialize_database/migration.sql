-- CreateEnum
CREATE TYPE "Size" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- CreateEnum
CREATE TYPE "ToppingType" AS ENUM ('BASIC', 'DELUXE');

-- CreateTable
CREATE TABLE "pizza" (
    "id" TEXT NOT NULL,
    "size" "Size" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pizza_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "topping" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "small" DOUBLE PRECISION NOT NULL,
    "medium" DOUBLE PRECISION NOT NULL,
    "large" DOUBLE PRECISION NOT NULL,
    "type" "ToppingType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "topping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order" (
    "id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "pizza_id" TEXT NOT NULL,
    "toppings" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "active" BOOLEAN NOT NULL DEFAULT true,
    "name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "metadata" JSONB DEFAULT '{}'
);

-- CreateIndex
CREATE UNIQUE INDEX "order_order_id_key" ON "order"("order_id");

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_pizza_id_fkey" FOREIGN KEY ("pizza_id") REFERENCES "pizza"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
