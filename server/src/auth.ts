import Koa from "koa";

export const middleware = {
  ensureSession: function(
    ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext>,
    next: Koa.Next
  ) {
    if (ctx.isAuthenticated()) {
      return next();
    } else {
      ctx.response.status = 401;
    }
  }
};
