import Router from "koa-router";
import fetch from "node-fetch";
import { URLSearchParams } from "url";

const appid = "c8931a82f375503088eb77975609aad6";

export const forecast = new Router({
  prefix: "/forecast"
});

forecast.get("/", async (ctx, next) => {
  const params = new URLSearchParams({
    q: ctx.query.city || "Sofia",
    appid
  });

  const url = `http://api.openweathermap.org/data/2.5/forecast?${params}`;

  const res = await fetch(url);
  if (res.status < 200 || res.status >= 300) {
    throw new Error("Weather API error");
  }
  ctx.body = await res.json();
});
