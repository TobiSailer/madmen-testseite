// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import cloudflare from '@astrojs/cloudflare';

// Live-Adresse der Website auf Cloudflare. Wird für Canonical-Links und die
// Sitemap gebraucht. Bei einer eigenen Domain hier die Domain eintragen.
const SITE_URL = 'https://schreinerei-huber.t-sailer.workers.dev';

// "npm run dev" (lokal) oder "npm run build" (für Cloudflare)?
const isDev = process.argv.includes('dev');

export default defineConfig({
  site: SITE_URL,

  // Die Seiten werden als Ordner gebaut (/leistungen/index.html) und von
  // Cloudflare mit Schrägstrich ausgeliefert. Die Regel bleibt locker,
  // weil die Keystatic-Oberfläche Adressen ohne Schrägstrich nutzt.
  trailingSlash: 'ignore',

  // Alle Seiten bleiben statisches HTML. Nur /keystatic und /api/keystatic
  // laufen online als kleiner Server-Teil auf Cloudflare. Lokal ohne Adapter,
  // damit Keystatic im lokalen Modus direkt in die Dateien speichern kann.
  // Keine Zusatzdienste: kein Sitzungsspeicher (KV), kein Cloudflare-Bilddienst.
  adapter: isDev ? undefined : cloudflare({ prerenderEnvironment: 'node', imageService: 'passthrough' }),
  session: false,

  integrations: [mdx(), sitemap(), react(), keystatic()],
});
