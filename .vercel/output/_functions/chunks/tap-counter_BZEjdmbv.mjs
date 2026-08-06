import { Redis } from '@upstash/redis';

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": "https://ferdian.is-a.dev", "SSR": true};
const prerender = false;
const COUNTER_KEY = "face-tap-counter";
const RATE_LIMIT_MAX = 50;
const RATE_LIMIT_WINDOW_S = 60;
const MAX_AMOUNT_PER_REQUEST = 20;
const responseHeaders = {
  "Content-Type": "application/json",
  "Cache-Control": "no-store"
};
function getEnvVar(name) {
  return process.env[name] ?? Object.assign(__vite_import_meta_env__, { UPSTASH_REDIS_REST_URL: "https://oriented-kite-69889.upstash.io", UPSTASH_REDIS_REST_TOKEN: "gQAAAAAAAREBAAIncDIzYjY4YmJmNDZmZTQ0MjA2ODhmYzliMzdkMjE4ZTU3ZnAyNjk4ODk", OS: "Windows_NT" })[name];
}
function isKvConfigured() {
  return Boolean(
    getEnvVar("UPSTASH_REDIS_REST_URL") && getEnvVar("UPSTASH_REDIS_REST_TOKEN")
  );
}
function getRedisClient() {
  const url = getEnvVar("UPSTASH_REDIS_REST_URL");
  const token = getEnvVar("UPSTASH_REDIS_REST_TOKEN");
  if (!url || !token) return null;
  return new Redis({ url, token });
}
function getClientIp(request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? request.headers.get("cf-connecting-ip") ?? // kalau pakai Cloudflare
  "unknown";
}
async function checkRateLimit(redis, ip, amount) {
  const key = `rl:clacks:${ip}`;
  const pipe = redis.pipeline();
  pipe.incrby(key, amount);
  pipe.ttl(key);
  const [newTotal, ttl] = await pipe.exec();
  if (ttl === -1) {
    await redis.expire(key, RATE_LIMIT_WINDOW_S);
  }
  const remaining = Math.max(0, RATE_LIMIT_MAX - newTotal);
  return { allowed: newTotal <= RATE_LIMIT_MAX, remaining };
}
async function readCount(redis) {
  const value = await redis.get(COUNTER_KEY);
  return typeof value === "number" ? value : 0;
}
const GET = async () => {
  if (!isKvConfigured()) {
    return new Response(JSON.stringify({ count: 0, configured: false }), {
      status: 200,
      headers: responseHeaders
    });
  }
  const redis = getRedisClient();
  const count = await readCount(redis);
  return new Response(JSON.stringify({ count, configured: true }), {
    status: 200,
    headers: responseHeaders
  });
};
const POST = async ({ request }) => {
  if (!isKvConfigured()) {
    return new Response(JSON.stringify({ count: 0, configured: false }), {
      status: 200,
      headers: responseHeaders
    });
  }
  const body = await request.json().catch(() => ({}));
  const interaction = body && typeof body.interaction === "string" ? body.interaction : "unknown";
  const rawAmount = body && typeof body.amount === "number" ? Math.trunc(body.amount) : 1;
  const amount = Math.min(Math.max(1, rawAmount), MAX_AMOUNT_PER_REQUEST);
  if (!["hover", "tap"].includes(interaction)) {
    return new Response(
      JSON.stringify({ error: "Invalid interaction type." }),
      {
        status: 400,
        headers: responseHeaders
      }
    );
  }
  const redis = getRedisClient();
  if (!redis) {
    return new Response(JSON.stringify({ count: 0, configured: false }), {
      status: 200,
      headers: responseHeaders
    });
  }
  const ip = getClientIp(request);
  const { allowed, remaining } = await checkRateLimit(redis, ip, amount);
  if (!allowed) {
    return new Response(
      JSON.stringify({ error: "Too many taps. Slow down!", remaining: 0 }),
      {
        status: 429,
        headers: {
          ...responseHeaders,
          "Retry-After": String(RATE_LIMIT_WINDOW_S)
        }
      }
    );
  }
  const count = amount === 1 ? await redis.incr(COUNTER_KEY) : await redis.incrby(COUNTER_KEY, amount);
  return new Response(JSON.stringify({ count, configured: true, remaining }), {
    status: 200,
    headers: responseHeaders
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
