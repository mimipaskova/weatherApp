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

users.get("/me", async (ctx: any, next) => {
  ctx.body = ctx.session.passport.user; // TODO: filter fields
});

users.delete("/delete/:googleId", async (ctx: any, next) => {
  const deleted = await User.deleteOne({ googleId: ctx.params.googleId });
  ctx.body = deleted;
});

users.get("/", async (ctx: any, next) => {
  if (ctx.session.passport.user.role != ROLES.admin) {
    ctx.response.status = 403;
  } else {
    const allUsers = await User.find({ role: ROLES.user });
    ctx.body = allUsers;
  }
});
