"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Product, Size, Topping, Pizza } from "../page";
import React, { useState } from 'react';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Sidebar from "../sideBar";


const formSchema = z.object({
  pizzaId: z.string(),
  toppings: z.array(z.string()),
  name: z.string(),
  email: z.string().email(),
});

const UserForm = ({ pizzas, toppings }: Product) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pizzaId: "",
      toppings: [],
      name: "",
      email: "",
    },
  });

  

  const UserForm: React.FC<UserFormProps> = ({ pizzas, toppings }) => {
    const [chosenPizza, setChosenPizza] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const [tax, setTax] = useState(0);

  const handlePlaceOrder = async () => {
    // Implement logic to place the final order
    // You can use the data from the form or any other necessary data
    // Example: call an API to place the order
  };


  function getPizzaPrice(pizzaId: string, pizzas: Pizza[]): number {
    const pizza = pizzas.find((pizza) => pizza.id === pizzaId);
    return pizza ? pizza.price : 0;
  }

  function getPizzaSize(pizzaId: string, pizzas: Pizza[]): Size | null {
    const pizza = pizzas.find((pizza) => pizza.id === pizzaId);
    return pizza ? pizza.size : null;
  }

  function getToppingsPrice(
    toppingIds: string[],
    pizzaSize: string,
    toppings: Topping[]
  ): number {
    let total = 0;
    toppingIds.forEach((id) => {
      const topping = toppings.find((topping) => topping.id === id);
      if (topping) {
        switch (pizzaSize) {
          case Size.SMALL:
            total += topping.small;
            break;
          case Size.MEDIUM:
            total += topping.medium;
            break;
          case Size.LARGE:
            total += topping.large;
            break;
        }
      }
    });
    return total;
  }

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const pizzaPrice = getPizzaPrice(data.pizzaId, pizzas);
    const pizzaSize = getPizzaSize(data.pizzaId, pizzas);
    const toppingsPrice = getToppingsPrice(data.toppings, pizzaSize!, toppings);

    const total = pizzaPrice + toppingsPrice;

    const finalData = {
      ...data,
      amount: total * 1.05,
    };


    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/create_order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalData),
        }
      );
      const data = await response.json();
      console.log(data);
      toast("Order has been placed successfully");
    } catch (error) {
      toast("Something went wrong");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="pizzaId"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Select a Pizza Size</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  {pizzas.map((pizza) => (
                    <FormItem
                      className="flex items-center space-x-3 space-y-0"
                      key={pizza.id}
                    >
                      <FormControl>
                        <RadioGroupItem value={pizza.id} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {pizza.size}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="toppings"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Toppings</FormLabel>
                <FormDescription>
                  Select the toppings you want to display in the sidebar.
                </FormDescription>
              </div>
              {toppings.map((topping) => (
                <FormField
                  key={topping.id}
                  control={form.control}
                  name="toppings"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={topping.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(topping.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, topping.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== topping.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {topping.name}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="md:flex md:items-start md:justify-between md:gap-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Customer Name</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormDescription>Customer&apos;s Name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Customer&apos;s Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormDescription>Customer&apos;s Email</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

    <div className="container">
      <Sidebar
        pizza={ChosenPizza}
        total={TotalPrice}
        tax={Tax}
        onPlaceOrder={handlePlaceOrder}
      />
    </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default UserForm;
