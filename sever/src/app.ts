import express, { Express } from "express";
import cors from "cors";
import * as bodyParser from "body-parser";
import config from "./config/env";
import orderRouter from "./routes/order.route";
import db from "../prisma/db";
const { PORT } = config;

class App {
  public app: Express;
  public port: number;

  constructor(appInit: { port: number }) {
    this.app = express();
    this.port = appInit.port;

    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
  }

  private routes() {
    this.app.get("/pizzas", async (_req, res) => {
      try {
        const pizzas = await db.pizza.findMany();
        res.json(pizzas);
      } catch (error) {
        res.status(500).json({ error });
      }
    });

    this.app.get("/toppings", async (_req, res) => {
      try {
        const toppings = await db.topping.findMany();
        res.json(toppings);
      } catch (error) {
        res.status(500).json({ error });
      }
    });

    this.app.use("/api", orderRouter);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the http://localhost:${this.port}`);
    });
  }
}

new App({ port: PORT }).listen();
