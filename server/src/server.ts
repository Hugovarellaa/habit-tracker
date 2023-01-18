import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";
import Fastify from "fastify";

const app = Fastify();
const prisma = new PrismaClient();
app.register(cors);

app.get("/", async (req, res) => {
  const habits = await prisma.habit.findMany();
  return habits;
});

app
  .listen({
    port: 3333,
  })
  .then(() => console.log("HTTP server running on port 3333"));