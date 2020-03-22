import Koa from "koa";

import { init } from "./models/db-connector";
import { forecast } from "./controllers/forecast";
import { home } from "./routes";
import bodyParser from "koa-bodyparser";
import session from "koa-session";
import "./controllers/googleOAuth";
import passport from "koa-passport";

import route from "koa-route";

import "./controllers/googleOAuth";
import { users } from "./controllers/users";

const app = new Koa();

init();

// sessions
app.keys = ["your-session-secret"];
app.use(session({}, app));

// body parser
app.use(bodyParser());

// authentication
app.use(passport.initialize());
app.use(passport.session());

app.use(
  route.get(
    "/api/auth/google",

    (ctx, next) => {
      const { returnTo } = ctx.query;
      const state = returnTo
        ? new Buffer(JSON.stringify({ returnTo })).toString("base64")
        : undefined;

      const authenticator = passport.authenticate("google", {
        scope: ["profile"],
        state
      });

      authenticator(ctx, next);
    }
  )
);

app.use(
  route.get(
    `/api/auth/google/callback`,
    passport.authenticate("google", { failureRedirect: "/api/auth/google" })
  )
);
app.use(
  route.get(`/api/auth/google/callback`, (ctx, next) => {
    try {
      const { state } = ctx.query;
      const { returnTo } = JSON.parse(new Buffer(state, "base64").toString());
      if (typeof returnTo === "string" && returnTo.startsWith("/")) {
        return ctx.redirect(returnTo);
      }
    } catch {
      ctx.redirect("/api/auth/google");
    }
    ctx.redirect("/");
  })
);

// Require authentication for now
app.use(function(ctx, next) {
  if (ctx.isAuthenticated()) {
    return next();
  } else {
    ctx.response.status = 401;
  }
});

// routes
app.use(forecast.routes());
app.use(users.routes());
app.use(home.routes());

app.use(
  route.get("/api/logout", function(ctx: any) {
    ctx.logout();
    ctx.redirect("/");
  })
);

const PORT = process.env.PORT || "3001";

app.listen(PORT, () => {
  console.log(
    `\n\n\n🚀  Node Server running at http://localhost:${PORT}.\n\n\n`
  );
});
