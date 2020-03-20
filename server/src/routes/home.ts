import Router from "koa-router";

const userInfoController = require("./../controllers/user-info");

export const home = new Router({
  prefix: "/home"
});

home
  .get("/", async (ctx: any) => {
    const title = "login home";
    console.log(ctx);
    await ctx.render("home", {
      title
    });
  })
  .post("/signin", userInfoController.signIn);
