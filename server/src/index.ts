import Koa from "koa";
import { forecast } from "./forecast";

const app = new Koa();

app.use(forecast.routes());

const PORT = process.env.PORT || "3001";

app.listen(PORT, () => {
  console.log(
    `\n\n\n🚀  Node Server running at http://localhost:${PORT}.\n\n\n`
  );
});
