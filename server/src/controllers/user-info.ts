import Router from "koa-router";
import User from "./../models/user";

export const home = new Router({
  prefix: "/api/home"
});

home.get("/", async (ctx: any) => {
  const title = "login home";
  ctx.body = title;
});

home.post("/", async (ctx: any) => {
  let result = {
    success: false,
    message: "user does not exist"
  };
  //   console.log(ctx.request);
  const { username, password } = ctx.request.body;
  await User.findOne(
    {
      username
    },
    (err: any, user: any) => {
      if (err) {
        throw err;
      }
      if (!user) {
        ctx.body = result;
      } else {
        //Determine whether the password is correct
        if (password === user.password) {
          ctx.body = { success: true, message: "Login Success" };
        } else {
          ctx.body = { success: false, message: "Password error" };
        }
      }
    }
  );
});
