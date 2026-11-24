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
| `src/content/cms/` | Im CMS gepflegte Inhalte: Startseite, Leistungen, Kontaktdaten |
| `keystatic.config.ts` | Felder und Regeln der CMS-Oberfläche |
| `src/data/site.ts` | Feste Firmendaten (Name, Gründung, Region) und Navigation |
| `src/pages/` | Eine Datei pro Seite |
| `src/components/` | Wiederverwendbare Bausteine (Header, Footer, Hero, Karten, Kontakt) |
| `src/layouts/BaseLayout.astro` | Rahmen jeder Seite inkl. SEO-Angaben und noindex |
| `src/styles/global.css` | Farben, Schriften, Grundstil |
| `public/` | Dateien, die unverändert ausgeliefert werden (Favicon, robots.txt, `_headers` für Cloudflare) |
| `astro.config.mjs` | Projekteinstellungen, Live-Adresse für Sitemap und Canonical |

## Inhalte bearbeiten mit Keystatic (CMS)

### Online (GitHub-Modus)

1. https://schreinerei-huber.t-sailer.workers.dev/keystatic öffnen und mit GitHub anmelden. Bearbeiten darf nur, wer Schreibrechte auf dieses Repository hat.
2. Inhalte ändern und auf **Save** klicken. Jede Speicherung wird ein Commit im Repository.
3. Cloudflare baut die Seite automatisch neu, nach etwa einer Minute ist die Änderung live.

Technik: Die Seiten sind statisches HTML. Nur `/keystatic` und `/api/keystatic` laufen als Server-Teil auf Cloudflare (Astro-Adapter `@astrojs/cloudflare`, nur im Build aktiv). Die GitHub-App heißt wie in `.env.production` angegeben. Ihre geheimen Zugangsdaten liegen lokal in `.env` (nicht im Repository) und bei Cloudflare unter Worker „schreinerei-huber“ → Settings → Variables and Secrets: `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`.

Wichtig: Wer online speichert, ändert das Repository. Vor lokaler Arbeit deshalb immer zuerst `git pull` ausführen, sonst gibt es beim nächsten `git push` Konflikte.

### Lokal

Die Bearbeitungsoberfläche läuft auch auf dem eigenen Rechner und speichert dort direkt in die Dateien.

1. `npm run dev` starten und http://localhost:4321/keystatic öffnen. (Im GitHub-Modus lokal: `PUBLIC_KEYSTATIC_STORAGE=github npm run dev`.)
2. Inhalte ändern und oben rechts auf **Save** klicken. Keystatic speichert direkt in die Dateien unter `src/content/cms/` (Texte) und `public/images/` (Bilder). Die lokale Vorschau zeigt die Änderung sofort.
3. Veröffentlichen: Änderungen per Git committen und mit `git push` hochladen. Cloudflare baut die Seite danach automatisch neu.

Bearbeitbar sind:

| Bereich in Keystatic | Inhalte | Datei |
|---|---|---|
| Startseite | Headline, Einleitungstext, Hero-Bild mit Alternativtext | `src/content/cms/startseite.yaml` |
| Leistungen | Liste mit Titel, Kurzbeschreibung, Bild, optional ausführlicher Text und Stichpunkte. Hinzufügen, löschen, per Ziehen sortieren | `src/content/cms/leistungen.yaml` |
| Über uns | Überschrift, Einleitung, Textabschnitte, Kennzahlen, Werte | `src/content/cms/ueber-uns.yaml` |
| Ratgeber-Artikel | Artikel anlegen, bearbeiten, löschen. Titel, URL-Kürzel, SEO-Titel, Beschreibung, Datum, Kategorie, Entwurf, Text mit Zwischenüberschriften (H2/H3), Listen, Tabellen, Tipp-Kästen, Links. Infografik als fertiger Block einfügbar | `src/content/ratgeber/*.mdx` |
| Kontaktdaten | Adresse, Telefon, E-Mail, Öffnungszeiten, Hinweis. Gilt für Header, Footer, Kontaktbereich, Impressum, Datenschutz und Schema.org | `src/content/cms/kontakt.yaml` |

Welche Felder es gibt und welche Grenzen gelten (z. B. Zeichenanzahl), steht in `keystatic.config.ts`. Gelesen werden die Inhalte über `src/lib/cms.ts`. Design, Layout und Farben sind im CMS nicht bearbeitbar.

## Ratgeber-Artikel anlegen

1. Neue Datei in `src/content/ratgeber/` anlegen, z. B. `holzpflege-im-winter.mdx`. Der Dateiname wird zur URL (`/ratgeber/holzpflege-im-winter/`).
2. Oben die Angaben eintragen (Vorlage: vorhandener Artikel): `title`, `seoTitle` (optional), `description`, `pubDate`, `author`, `category`. Mit `draft: true` bleibt ein Artikel unveröffentlicht.
3. Text in Markdown schreiben. Eigene Bausteine wie Infografiken werden in `src/pages/ratgeber/[slug].astro` bereitgestellt und in `keystatic.config.ts` als Block angemeldet. Im Artikel steht dann nur `<NameDesBausteins />`, keine `import`-Zeile (die kann Keystatic nicht verarbeiten).
   Einfacher geht es über Keystatic unter „Ratgeber-Artikel“.
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
- Platzhalter in Keystatic (Kontaktdaten, Bilder) und in `src/data/site.ts` ersetzen
