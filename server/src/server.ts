import Fastify from "fastify";

const app = Fastify();

app.get("/", (req, res) => {});

app
  .listen({
    port: 3333,
  })
  .then(() => console.log("listening on port 3333 "));
