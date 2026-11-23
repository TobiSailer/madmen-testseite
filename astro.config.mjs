// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Die spätere Live-Adresse der Website. Wird für Canonical-Links und die
// Sitemap gebraucht. Nach dem ersten Cloudflare-Deployment hier die echte
// Adresse eintragen (z. B. https://schreinerei-huber.pages.dev).
const SITE_URL = 'https://schreinerei-huber.pages.dev';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  integrations: [sitemap()],
});
