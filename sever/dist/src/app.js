"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const bodyParser = __importStar(require("body-parser"));
const env_1 = __importDefault(require("./config/env"));
const order_route_1 = __importDefault(require("./routes/order.route"));
const db_1 = __importDefault(require("../prisma/db"));
const { PORT } = env_1.default;
class App {
    constructor(appInit) {
        this.app = (0, express_1.default)();
        this.port = appInit.port;
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(bodyParser.json());
    }
    routes() {
        this.app.get("/pizzas", async (_req, res) => {
            try {
                const pizzas = await db_1.default.pizza.findMany();
                res.json(pizzas);
            }
            catch (error) {
                res.status(500).json({ error });
            }
        });
        this.app.get("/toppings", async (_req, res) => {
            try {
                const toppings = await db_1.default.topping.findMany();
                res.json(toppings);
            }
            catch (error) {
                res.status(500).json({ error });
            }
        });
        this.app.use("/api", order_route_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the http://localhost:${this.port}`);
        });
    }
}
new App({ port: PORT }).listen();
//# sourceMappingURL=app.js.map