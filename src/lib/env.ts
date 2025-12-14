import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
import "dotenv/config";

export const env = createEnv({
  server: {
    PORT: z.coerce.number().default(3000),
    NODE_ENV: z.string().default("development"),
    DATABASE_URL: z.string(),
    JWT_SECRET: z.string().default("secret"),
    SESSION_SECRET: z.string().default("secret"),
    RESEND_API_KEY: z.string(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    R2_ACCESS_KEY_ID: z.string(),
    R2_SECRET_ACCESS_KEY: z.string(),
    R2_BUCKET_NAME: z.string(),
    R2_ACCOUNT_ID: z.string(),
    R2_PUBLIC_DOMAIN: z.string().url(),
    CLIENT_URL: z.string().default("http://localhost:5173"),
  },
  runtimeEnv: process.env,
});
