import { defineMiddleware } from "astro:middleware";
import { isr } from "@/utils/isr";

export const onRequest = defineMiddleware(async (context, next) => {
  const key = context.url.pathname;
  console.log("[Middleware] onRequest", key);

  let ttl: undefined | number;
  context.locals.cache = (seconds: number = 60) => (ttl = seconds);

  if (context.request.method !== "GET") return next();
  const cachedResponse = isr.get(key);
  if (cachedResponse) return cachedResponse;

  const response = await next();
  if (ttl !== undefined) isr.set(key, response, ttl);

  return response;
});
