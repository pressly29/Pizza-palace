import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envVariablesSchema = z.object({
  PORT: z.string().transform(Number),
  NODE_ENV: z.string(),
  DATABASE_URL: z.string(),
});

const validateEnvVariables = () => {
  const envVars = process.env;
  const validatedEnvVars = envVariablesSchema.parse(envVars);
  return validatedEnvVars;
};

export const initializeConfig = (): z.infer<typeof envVariablesSchema> => {
  try {
    // Validate the environment variables using the validateEnv function
    const config = validateEnvVariables();
    return config;
  } catch (error: any) {
    console.error(error.message);
    throw new Error("Invalid environment variables");
  }
};

// Call the initializeConfig function immediately when this module is imported
const config = initializeConfig();

export default config;
