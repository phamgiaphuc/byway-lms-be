import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
import "dotenv/config";

export const env = createEnv({
  server: {
    PORT: z.coerce.number().default(3000),
    NODE_ENV: z.string().default("development"),
    DATABASE_URL: z.string(),
    JWT_SECRET: z.string().default("secret"),
    RESEND_API_KEY: z.string(),
  },
  runtimeEnv: process.env,
});
