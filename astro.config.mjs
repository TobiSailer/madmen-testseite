// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';

// Live-Adresse der Website auf Cloudflare. Wird für Canonical-Links und die
// Sitemap gebraucht. Bei einer eigenen Domain hier die Domain eintragen.
const SITE_URL = 'https://schreinerei-huber.t-sailer.workers.dev';

// Keystatic (CMS) läuft im lokalen Modus nur mit "npm run dev" unter /keystatic.
// Beim Build für Cloudflare wird es nicht eingebunden: Die Live-Seite bleibt
// rein statisch und hat keine Admin-Oberfläche.
const isDev = process.argv.includes('dev');

export default defineConfig({
  site: SITE_URL,
  // Live: Adressen immer mit Schrägstrich am Ende (/leistungen/).
  // Lokal locker, weil die Keystatic-Oberfläche Adressen ohne Schrägstrich nutzt.
  trailingSlash: isDev ? 'ignore' : 'always',
  integrations: [mdx(), sitemap(), ...(isDev ? [react(), keystatic()] : [])],
});
