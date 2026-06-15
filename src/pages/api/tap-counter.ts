import type { APIRoute } from "astro";
import { Redis } from "@upstash/redis";

export const prerender = false;

const COUNTER_KEY = "face-tap-counter";
const RATE_LIMIT_MAX = 50; // max tap per window
const RATE_LIMIT_WINDOW_S = 60; // per 60 detik
const MAX_AMOUNT_PER_REQUEST = 20; // sesuai MAX_BATCH_SIZE di client

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
  if (!url || !token) return null;
  return new Redis({ url, token });
}

function getClientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("cf-connecting-ip") ?? // kalau pakai Cloudflare
    "unknown"
  );
}

async function checkRateLimit(
  redis: Redis,
  ip: string,
  amount: number,
): Promise<{ allowed: boolean; remaining: number }> {
  const key = `rl:clacks:${ip}`;

  // Pakai pipeline biar 1 roundtrip
  const pipe = redis.pipeline();
  pipe.incrby(key, amount);
  pipe.ttl(key);
  const [newTotal, ttl] = await pipe.exec<[number, number]>();

  // Set expiry hanya saat key baru dibuat (ttl === -1)
  if (ttl === -1) {
    await redis.expire(key, RATE_LIMIT_WINDOW_S);
  }

  const remaining = Math.max(0, RATE_LIMIT_MAX - newTotal);
  return { allowed: newTotal <= RATE_LIMIT_MAX, remaining };
}

async function readCount(redis: Redis) {
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

  const redis = getRedisClient()!;
  const count = await readCount(redis);

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

  // Clamp amount: minimal 1, maksimal MAX_BATCH_SIZE
  const rawAmount =
    body && typeof body.amount === "number" ? Math.trunc(body.amount) : 1;
  const amount = Math.min(Math.max(1, rawAmount), MAX_AMOUNT_PER_REQUEST);

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

  // Rate limit check
  const ip = getClientIp(request);
  const { allowed, remaining } = await checkRateLimit(redis, ip, amount);

  if (!allowed) {
    return new Response(
      JSON.stringify({ error: "Too many taps. Slow down!", remaining: 0 }),
      {
        status: 429,
        headers: {
          ...responseHeaders,
          "Retry-After": String(RATE_LIMIT_WINDOW_S),
        },
      },
    );
  }

  const count =
    amount === 1
      ? await redis.incr(COUNTER_KEY)
      : await redis.incrby(COUNTER_KEY, amount);

  return new Response(JSON.stringify({ count, configured: true, remaining }), {
    status: 200,
    headers: responseHeaders,
  });
};
