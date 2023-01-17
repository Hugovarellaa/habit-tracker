// Back-end API RESTfull
import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";
import fastify from "fastify";

const app = fastify();
const prisma = new PrismaClient();
app.register(cors);

app.get("/", async (req, res) => {
  const habits = await prisma.habit.findMany({
    where: {
      title: {
        startsWith: "Beber",
      },
    },
  });
  return habits;
});

app
  .listen({
    port: 3333,
  })
  .then(() => console.log("HTTP server running on port 3333"));
