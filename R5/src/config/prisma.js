import { PrismaClient } from "../generated/prisma/index.js";

const globalPrisma = globalThis;

export const prisma =
  globalPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalPrisma.prisma = prisma;
}

export default prisma;
