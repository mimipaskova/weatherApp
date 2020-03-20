import Koa from "koa";

import db from "./models/db-connector";
import { forecast } from "./controllers/forecast";
import { home } from "./routes";
import bodyParser from "koa-bodyparser";
// import "./seed";

console.log(db);
const app = new Koa();

app.use(forecast.routes());

app.use(bodyParser());

app.use(home.routes());

const PORT = process.env.PORT || "3001";

app.listen(PORT, () => {
  console.log(
    `\n\n\n🚀  Node Server running at http://localhost:${PORT}.\n\n\n`
  );
});
