# Schreinerei Huber (Testseite)

Fiktive Beispiel-Website, gebaut mit [Astro](https://astro.build). Dient intern als Lernprojekt für Astro und Cloudflare. Alle Seiten stehen auf `noindex`.

Live: https://schreinerei-huber.t-sailer.workers.dev

## Veröffentlichung

Cloudflare (Workers mit statischen Dateien) ist mit diesem GitHub-Repository verbunden. Jeder `git push` auf `main` baut die Seite automatisch neu und veröffentlicht sie nach ein bis zwei Minuten. Einstellungen dazu stehen in `wrangler.jsonc`, Build-Protokolle im Cloudflare-Dashboard unter Workers & Pages → schreinerei-huber → Deployments.

## Wichtige Befehle

| Befehl | Was passiert |
|---|---|
| `npm install` | Lädt alle benötigten Pakete (einmalig nach dem Herunterladen) |
| `npm run dev` | Startet den lokalen Vorschau-Server unter http://localhost:4321 |
| `npm run build` | Erzeugt die fertige Website im Ordner `dist/` |
| `npm run preview` | Zeigt die gebaute Version aus `dist/` lokal an |

## Wo was liegt

| Pfad | Inhalt |
|---|---|
| `src/data/site.ts` | Firmendaten, Navigation, Leistungen (zentral pflegen) |
| `src/pages/` | Eine Datei pro Seite |
| `src/components/` | Wiederverwendbare Bausteine (Header, Footer, Hero, Karten, Kontakt) |
| `src/layouts/BaseLayout.astro` | Rahmen jeder Seite inkl. SEO-Angaben und noindex |
| `src/styles/global.css` | Farben, Schriften, Grundstil |
| `public/` | Dateien, die unverändert ausgeliefert werden (Favicon, robots.txt, `_headers` für Cloudflare) |
| `astro.config.mjs` | Projekteinstellungen, Live-Adresse für Sitemap und Canonical |

## Ratgeber-Artikel anlegen

1. Neue Datei in `src/content/ratgeber/` anlegen, z. B. `holzpflege-im-winter.mdx`. Der Dateiname wird zur URL (`/ratgeber/holzpflege-im-winter/`).
2. Oben die Angaben eintragen (Vorlage: vorhandener Artikel): `title`, `seoTitle` (optional), `description`, `pubDate`, `author`, `category`. Mit `draft: true` bleibt ein Artikel unveröffentlicht.
3. Text in Markdown schreiben. Eigene Bausteine wie Infografiken lassen sich per `import` einbinden.
4. Übersicht, Startseiten-Vorschau, Sitemap und Schema.org werden automatisch aktualisiert.

FAQ der Startseite: `src/data/faq.ts`. Sichtbarer Text und Schema.org-FAQPage kommen aus derselben Liste.

## SEO-Grundlagen

- Eigener Title und Meta-Description je Seite, genau eine H1
- Canonical-Link, Open-Graph-Angaben
- Schema.org als JSON-LD: `LocalBusiness` auf allen Seiten, `FAQPage` auf der Startseite, `Blog` auf der Ratgeber-Übersicht, `BlogPosting` und `BreadcrumbList` auf Artikelseiten
- Sitemap unter `/sitemap-index.xml`
- `noindex, nofollow` als Meta-Tag und zusätzlich als HTTP-Header über `public/_headers`
- Schriften lokal über Fontsource, keine externen Dienste

## Vor einer echten Veröffentlichung

- Bei eigener Domain: Adresse in `astro.config.mjs` und `public/robots.txt` anpassen
- noindex in `BaseLayout.astro` und `public/_headers` entfernen
- Impressum und Datenschutz vollständig befüllen und rechtlich prüfen lassen
- Platzhalter in `src/data/site.ts` ersetzen
