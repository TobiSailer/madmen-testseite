# Schreinerei Huber (Testseite)

Fiktive Beispiel-Website, gebaut mit [Astro](https://astro.build). Dient intern als Lernprojekt für Astro und Cloudflare. Alle Seiten stehen auf `noindex`.

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

## SEO-Grundlagen

- Eigener Title und Meta-Description je Seite, genau eine H1
- Canonical-Link, Open-Graph-Angaben
- Schema.org `LocalBusiness` als JSON-LD (`src/components/LocalBusinessSchema.astro`)
- Sitemap unter `/sitemap-index.xml`
- `noindex, nofollow` als Meta-Tag und zusätzlich als HTTP-Header über `public/_headers`
- Schriften lokal über Fontsource, keine externen Dienste

## Vor einer echten Veröffentlichung

- Live-Adresse in `astro.config.mjs` und `public/robots.txt` anpassen
- noindex in `BaseLayout.astro` und `public/_headers` entfernen
- Impressum und Datenschutz vollständig befüllen und rechtlich prüfen lassen
- Platzhalter in `src/data/site.ts` ersetzen
