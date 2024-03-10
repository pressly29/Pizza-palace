"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prismaClientSingleton = () => {
    return new client_1.PrismaClient();
};
const db = globalThis.prisma ?? prismaClientSingleton();
exports.default = db;
if (process.env.NODE_ENV !== "production")
    globalThis.prisma = db;
//# sourceMappingURL=db.js.map