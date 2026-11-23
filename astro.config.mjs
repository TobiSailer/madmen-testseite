// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// Live-Adresse der Website auf Cloudflare. Wird für Canonical-Links und die
// Sitemap gebraucht. Bei einer eigenen Domain hier die Domain eintragen.
const SITE_URL = 'https://schreinerei-huber.t-sailer.workers.dev';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  integrations: [mdx(), sitemap()],
});
