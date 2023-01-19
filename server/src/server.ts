import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";
import Fastify from "fastify";

const app = Fastify();
const prisma = new PrismaClient();
app.register(cors);

app.get("/", (req, res) => {
  const habit = prisma.habit.findMany();
  return habit;
});

app
  .listen({
    port: 3333,
  })
  .then(() => console.log("listening on port 3333 "));
