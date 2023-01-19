import { FastifyInstance } from "fastify";
import { prisma } from "./lib/prisma";

export async function AppRoutes(app: FastifyInstance) {
  app.get("/", async () => {
    const habit = await prisma.habit.findMany();
    return habit;
  });
}
