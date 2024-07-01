import { defineConfig } from 'astro/config';
import vercel from "@astrojs/vercel/serverless";
import sitemap from "@astrojs/sitemap";
import { DOMAIN } from './src/global/constants';
import { isPreviewDeployment } from '@/utils/is-preview-deployment';

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
    ...!isPreviewDeployment && {
      isr: {
        bypassToken: process.env.ISR_BYPASS_TOKEN
      }
    }
  })
});
