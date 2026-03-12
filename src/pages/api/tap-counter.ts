import type { APIRoute } from "astro";
import { Redis } from "@upstash/redis";

export const prerender = false;

const COUNTER_KEY = "face-tap-counter";

const responseHeaders = {
  "Content-Type": "application/json",
  "Cache-Control": "no-store",
};

function getEnvVar(
  name: "UPSTASH_REDIS_REST_URL" | "UPSTASH_REDIS_REST_TOKEN",
) {
  return process.env[name] ?? import.meta.env[name];
}

function isKvConfigured() {
  return Boolean(
    getEnvVar("UPSTASH_REDIS_REST_URL") &&
    getEnvVar("UPSTASH_REDIS_REST_TOKEN"),
  );
}

function getRedisClient() {
  const url = getEnvVar("UPSTASH_REDIS_REST_URL");
  const token = getEnvVar("UPSTASH_REDIS_REST_TOKEN");

  if (!url || !token) {
    return null;
  }

  return new Redis({ url, token });
}

async function readCount() {
  const redis = getRedisClient();
  if (!redis) return 0;

  const value = await redis.get<number>(COUNTER_KEY);
  return typeof value === "number" ? value : 0;
}

export const GET: APIRoute = async () => {
  if (!isKvConfigured()) {
    return new Response(JSON.stringify({ count: 0, configured: false }), {
      status: 200,
      headers: responseHeaders,
    });
  }

  const count = await readCount();

  return new Response(JSON.stringify({ count, configured: true }), {
    status: 200,
    headers: responseHeaders,
  });
};

export const POST: APIRoute = async ({ request }) => {
  if (!isKvConfigured()) {
    return new Response(JSON.stringify({ count: 0, configured: false }), {
      status: 200,
      headers: responseHeaders,
    });
  }

  const body = await request.json().catch(() => ({}));
  const interaction =
    body && typeof body.interaction === "string" ? body.interaction : "unknown";

  if (!["hover", "tap"].includes(interaction)) {
    return new Response(
      JSON.stringify({ error: "Invalid interaction type." }),
      {
        status: 400,
        headers: responseHeaders,
      },
    );
  }

  const redis = getRedisClient();
  if (!redis) {
    return new Response(JSON.stringify({ count: 0, configured: false }), {
      status: 200,
      headers: responseHeaders,
    });
  }

  const count = await redis.incr(COUNTER_KEY);

  return new Response(JSON.stringify({ count, configured: true }), {
    status: 200,
    headers: responseHeaders,
  });
};
