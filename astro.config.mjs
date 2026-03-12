// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  adapter: vercel(),
  site: "https://example.com",
  integrations: [mdx(), sitemap(), react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
