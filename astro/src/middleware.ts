import type { MiddlewareHandler } from "astro";
import { isr } from "@/utils/isr";

export const onRequest: MiddlewareHandler = async (req, next) => {
  const key = req.url.pathname;
  console.log("[Middleware] onRequest", key);

  let ttl: undefined | number;
  req.locals.cache = (seconds: number = 60) => (ttl = seconds);

  if (req.request.method !== "GET") return next();

  const cachedResponse = isr.get(key);
  if (cachedResponse) return cachedResponse;

  const response = await next();
  if (ttl !== undefined) isr.set(key, response, ttl);

  return response;
};
