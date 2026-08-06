import tailwindcss from '@tailwindcss/vite';
import { defineConfig, fontProviders  } from 'astro/config';
import sanity from '@sanity/astro';
import vercel from "@astrojs/vercel";
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  output: "server",
  site: "https://ferdian.is-a.dev",
  vite: {
      plugins: [tailwindcss()],
    },

  integrations: [sanity({
    projectId: "xu9a264e",
    dataset: "production",
    useCdn: false, // for static builds
  }), sitemap()],
});