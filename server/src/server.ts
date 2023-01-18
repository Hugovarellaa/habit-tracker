import Fastify from "fastify";

const app = Fastify();

app.get("/", (req, res) => {
  return "Hello World!";
});

app
  .listen({
    port: 3333,
  })
  .then(() => console.log("HTTP server running on port 3333"));
