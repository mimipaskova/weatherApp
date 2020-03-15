import Router from "koa-router";
import fetch from "node-fetch";
import { URLSearchParams } from "url";
import { config } from "./config";

export const forecast = new Router({
  prefix: "/forecast"
});

forecast.get("/", async (ctx, next) => {
  const params = new URLSearchParams({
    q: ctx.query.city || "Sofia",
    appid: config.get("appId"),
    units: "metric"
  });

  const url = `http://api.openweathermap.org/data/2.5/forecast?${params}`;

  const res = await fetch(url);
  if (res.status < 200 || res.status >= 300) {
    throw new Error("Weather API error");
  }
  ctx.body = await res.json();
});
