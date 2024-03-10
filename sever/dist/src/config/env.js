"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeConfig = void 0;
const zod_1 = require("zod");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const envVariablesSchema = zod_1.z.object({
    PORT: zod_1.z.string().transform(Number),
    NODE_ENV: zod_1.z.string(),
    DATABASE_URL: zod_1.z.string(),
});
const validateEnvVariables = () => {
    const envVars = process.env;
    const validatedEnvVars = envVariablesSchema.parse(envVars);
    return validatedEnvVars;
};
const initializeConfig = () => {
    try {
        // Validate the environment variables using the validateEnv function
        const config = validateEnvVariables();
        return config;
    }
    catch (error) {
        console.error(error.message);
        throw new Error("Invalid environment variables");
    }
};
exports.initializeConfig = initializeConfig;
// Call the initializeConfig function immediately when this module is imported
const config = (0, exports.initializeConfig)();
exports.default = config;
//# sourceMappingURL=env.js.map