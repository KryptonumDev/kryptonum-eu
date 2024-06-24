import { defineConfig } from 'astro/config';
import sitemap from "@astrojs/sitemap";
import { DOMAIN } from './src/global/constants';

export default defineConfig({
  site: DOMAIN,
  integrations: [sitemap()]
});
