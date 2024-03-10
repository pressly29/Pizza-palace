import UserForm from "./form/userForm";

export enum Size {
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
  LARGE = "LARGE",
}

enum ToppingType {
  BASIC = "BASIC",
  DELUXE = "DELUXE",
}

export interface Pizza {
  id: string;
  size: Size;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Topping {
  id: string;
  name: string;
  small: number;
  medium: number;
  large: number;
  type: ToppingType;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  size: Size;
  pizzas: Pizza[];
  toppings: Topping[];
  price: number;
}

export interface UseFormProps{
  pizzas: Product[];
  toppings: Topping[];
}

async function getProducts(): Promise<Product> {
  const [pizzasResponse, toppingsResponse, nameResponse, priceResponse] = await Promise.all([
    fetch("http://localhost:4000/pizzas", {
      cache: "no-store",
    }),
    fetch("http://localhost:4000/toppings", {
      cache: "no-store",
    }),
    fetch("http://localhost:4000/size", {
      cache: "no-store",
    }),
    fetch("http://localhost:4000/price", {
      cache: "no-store",
    }),
  ]);

  const pizzas = await pizzasResponse.json();
  const toppings = await toppingsResponse.json();
  const size = await nameResponse.json();
  const price = await priceResponse.json();

  return { pizzas, toppings, size, price};
}

export default async function Home() {
  const { pizzas, toppings } = await getProducts();

  return (
    <main className="p-4">
      <h1 className="text-4xl font-bold">Pizza Palace</h1>
      <UserForm pizzas={pizzas} toppings={toppings} />
    </main>
  );
}
