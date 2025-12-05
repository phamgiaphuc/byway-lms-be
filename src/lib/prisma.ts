import { PrismaPg } from "@prisma/adapter-pg";
import { env } from "@/lib/env";
import { PrismaClient } from "@/lib/generated/prisma/client";

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
