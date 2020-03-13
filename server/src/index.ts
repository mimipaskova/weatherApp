import Koa from "koa";
const app = new Koa();

console.log("startup");

app.use(async ctx => {
  ctx.body = "Hello World";
});

const PORT = process.env.PORT || "3001";

app.listen(PORT, () => {
  console.log(
    `\n\n\n🚀  Node Server running at http://localhost:${PORT}.\n\n\n`
  );
});
