import Router from "koa-router";
import { ROLES, User } from "../models/user";

export const users = new Router({
  prefix: "/api/users"
});

users.get("/isAdmin", async (ctx: any, next) => {
  if (ctx.session.passport.user.role != ROLES.admin) {
    ctx.body = { isAdmin: false };
  } else {
    ctx.body = { isAdmin: true };
  }
});

users.delete("/delete/:googleId", async (ctx: any, next) => {
  console.log(ctx.params.googleId);
  const deleted = await User.deleteOne({ googleId: ctx.params.googleId });
  console.log(deleted);
  ctx.body = deleted;
});

users.get("/", async (ctx: any, next) => {
  if (ctx.session.passport.user.role != ROLES.admin) {
    ctx.response.status = 403;
  } else {
    const allUsers = await User.find({ role: ROLES.user });
    console.log(allUsers);
    ctx.body = allUsers;
  }
});
