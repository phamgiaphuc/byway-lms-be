import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";
import { env } from "@/lib/env";

const connectionString = env.DATABASE_URL;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

prisma
  .$connect()
  .then(() => {
    console.log("✅ Connected to database");
  })
  .catch((err) => {
    console.error("❌ Failed to connect to database", err);
  });

export { prisma };
