import type { APIRoute } from "astro";
import { kv } from "@vercel/kv";

export const prerender = false;

const COUNTER_KEY = "face-tap-counter";

const responseHeaders = {
  "Content-Type": "application/json",
  "Cache-Control": "no-store",
};

function isKvConfigured() {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

async function readCount() {
  const value = await kv.get<number>(COUNTER_KEY);
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

  const count = await kv.incr(COUNTER_KEY);

  return new Response(JSON.stringify({ count, configured: true }), {
    status: 200,
    headers: responseHeaders,
  });
};
