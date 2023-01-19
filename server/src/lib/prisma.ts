// Connect Prisma database

import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient({
  log: ["query"],
});
