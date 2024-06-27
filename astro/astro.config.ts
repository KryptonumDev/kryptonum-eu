import { defineConfig } from 'astro/config';
import vercel from "@astrojs/vercel/serverless";
import sitemap from "@astrojs/sitemap";
import { DOMAIN } from './src/global/constants';

export default defineConfig({
  site: DOMAIN,
  integrations: [sitemap()],
  image: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'cdn.sanity.io'
    }]
  },
  output: "server",
  adapter: vercel({
    isr: {
      bypassToken: "005556d774a8005556d774a8005556d7",
    }
  })
});
