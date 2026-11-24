// Keystatic: legt fest, welche Inhalte im CMS bearbeitet werden können.
// Bearbeiter sehen nur diese Felder. Layout, Farben und Schriften bleiben im Code.
//
// Zwei Speicherorte:
// - Lokal (npm run dev): http://localhost:4321/keystatic speichert direkt in die Dateien.
// - Online: https://<live-adresse>/keystatic, Anmeldung mit GitHub, jede Speicherung
//   wird ein Commit im Repository. Cloudflare baut die Seite danach automatisch neu.
//   Für die einmalige Einrichtung der GitHub-App lokal mit
//   PUBLIC_KEYSTATIC_STORAGE=github npm run dev starten.
import { collection, config, fields, singleton } from '@keystatic/core';
import { block } from '@keystatic/core/content-components';

const timePattern = {
  regex: /^([01]\d|2[0-3]):[0-5]\d$/,
  message: 'Bitte im Format HH:MM eingeben, z. B. 07:30',
};

const useGitHub = !import.meta.env.DEV || import.meta.env.PUBLIC_KEYSTATIC_STORAGE === 'github';

export default config({
  storage: useGitHub
    ? { kind: 'github', repo: { owner: 'TobiSailer', name: 'madmen-testseite' } }
    : { kind: 'local' },

  ui: {
    brand: { name: 'Schreinerei Huber' },
    navigation: {
      Seiten: ['startseite', 'leistungen', 'ueberUns'],
      Ratgeber: ['ratgeber'],
      Einstellungen: ['kontakt'],
    },
  },

  collections: {
    ratgeber: collection({
      label: 'Ratgeber-Artikel',
      path: 'src/content/ratgeber/*',
      slugField: 'title',
      format: { contentField: 'content' },
      entryLayout: 'content',
      columns: ['title', 'pubDate'],
      previewUrl: '/ratgeber/{slug}/',
      schema: {
        title: fields.slug({
          name: {
            label: 'Titel (H1)',
            validation: { isRequired: true, length: { max: 90 } },
          },
          slug: {
            label: 'URL-Kürzel',
            description: 'Wird Teil der Adresse: /ratgeber/url-kuerzel/. Nach der Veröffentlichung nicht mehr ändern.',
          },
        }),
        seoTitle: fields.text({
          label: 'SEO-Titel (optional)',
          description: 'Titel im Browser-Tab und in Google, falls abweichend vom Titel. Höchstens 60 Zeichen.',
          validation: { length: { max: 60 } },
        }),
        description: fields.text({
          label: 'Beschreibung',
          description: 'Meta-Description und Teaser auf der Übersicht. Ideal 140 bis 160 Zeichen.',
          multiline: true,
          validation: { isRequired: true, length: { min: 80, max: 170 } },
        }),
        pubDate: fields.date({ label: 'Veröffentlicht am', validation: { isRequired: true } }),
        updatedDate: fields.date({ label: 'Aktualisiert am (optional)' }),
        author: fields.text({ label: 'Autor', defaultValue: 'Michael Huber', validation: { isRequired: true } }),
        category: fields.select({
          label: 'Kategorie',
          options: [
            { label: 'Möbel nach Maß', value: 'Möbel nach Maß' },
            { label: 'Küchen', value: 'Küchen' },
            { label: 'Innenausbau', value: 'Innenausbau' },
            { label: 'Türen und Fenster', value: 'Türen und Fenster' },
            { label: 'Treppen', value: 'Treppen' },
            { label: 'Holz und Pflege', value: 'Holz und Pflege' },
          ],
          defaultValue: 'Möbel nach Maß',
        }),
        draft: fields.checkbox({
          label: 'Entwurf',
          description: 'Angehakt: Artikel wird nicht veröffentlicht.',
          defaultValue: false,
        }),
        content: fields.mdx({
          label: 'Artikeltext',
          extension: 'mdx',
          options: {
            heading: [2, 3],
            bold: true,
            italic: true,
            strikethrough: false,
            code: false,
            codeBlock: false,
            image: false,
            blockquote: true,
            orderedList: true,
            unorderedList: true,
            table: true,
            link: true,
            divider: true,
          },
          components: {
            DachschraegeInfografik: block({
              label: 'Infografik: Einbauschrank unter der Dachschräge',
              description: 'Fertige Grafik mit vier Höhenzonen. Inhalt und Aussehen sind fest.',
              schema: {},
            }),
          },
        }),
      },
    }),
  },

  singletons: {
    startseite: singleton({
      label: 'Startseite',
      path: 'src/content/cms/startseite',
      schema: {
        headline: fields.text({
          label: 'Headline',
          description: 'Große Überschrift oben auf der Startseite (H1). Höchstens 70 Zeichen.',
          validation: { isRequired: true, length: { min: 10, max: 70 } },
        }),
        intro: fields.text({
          label: 'Einleitungstext',
          description: 'Ein bis zwei Sätze unter der Headline. Höchstens 280 Zeichen.',
          multiline: true,
          validation: { isRequired: true, length: { min: 40, max: 280 } },
        }),
        heroImage: fields.image({
          label: 'Hero-Bild',
          description: 'Bild rechts neben der Headline. Hochformat oder quadratisch wirkt am besten, ideal ca. 1000 × 1200 Pixel.',
          directory: 'public/images/startseite',
          publicPath: '/images/startseite/',
          validation: { isRequired: true },
        }),
        heroImageAlt: fields.text({
          label: 'Bildbeschreibung (Alternativtext)',
          description: 'Beschreibt das Bild für Screenreader und Suchmaschinen, z. B. "Schreiner beim Hobeln einer Eichenplatte".',
          validation: { isRequired: true, length: { max: 140 } },
        }),
      },
    }),

    leistungen: singleton({
      label: 'Leistungen',
      path: 'src/content/cms/leistungen',
      schema: {
        items: fields.array(
          fields.object({
            title: fields.text({
              label: 'Titel',
              validation: { isRequired: true, length: { max: 40 } },
            }),
            short: fields.text({
              label: 'Kurzbeschreibung',
              description: 'Erscheint auf den Karten der Startseite. Höchstens 160 Zeichen.',
              multiline: true,
              validation: { isRequired: true, length: { max: 160 } },
            }),
            image: fields.image({
              label: 'Bild',
              description: 'Querformat, ideal ca. 1200 × 750 Pixel.',
              directory: 'public/images/leistungen',
              publicPath: '/images/leistungen/',
              validation: { isRequired: true },
            }),
            long: fields.text({
              label: 'Ausführliche Beschreibung (optional)',
              description: 'Wird auf der Seite "Leistungen" angezeigt. Ohne Eintrag erscheint dort die Kurzbeschreibung.',
              multiline: true,
              validation: { length: { max: 600 } },
            }),
            points: fields.array(
              fields.text({ label: 'Stichpunkt', validation: { isRequired: true, length: { max: 60 } } }),
              {
                label: 'Stichpunkte (optional)',
                description: 'Kurze Aufzählung auf der Seite "Leistungen", höchstens 5.',
                itemLabel: (props) => props.value || 'Neuer Stichpunkt',
                validation: { length: { max: 5 } },
              },
            ),
          }),
          {
            label: 'Leistungen',
            description: 'Reihenfolge per Ziehen ändern. Die Reihenfolge gilt für Startseite und Leistungsseite.',
            itemLabel: (props) => props.fields.title.value || 'Neue Leistung',
            validation: { length: { min: 1, max: 12 } },
          },
        ),
      },
    }),

    ueberUns: singleton({
      label: 'Über uns',
      path: 'src/content/cms/ueber-uns',
      schema: {
        heroTitle: fields.text({
          label: 'Überschrift (H1)',
          validation: { isRequired: true, length: { max: 70 } },
        }),
        heroText: fields.text({
          label: 'Einleitung',
          multiline: true,
          validation: { isRequired: true, length: { max: 280 } },
        }),
        sections: fields.array(
          fields.object({
            heading: fields.text({ label: 'Zwischenüberschrift', validation: { isRequired: true, length: { max: 80 } } }),
            text: fields.text({
              label: 'Text',
              description: 'Absätze durch eine Leerzeile trennen. Höchstens 1200 Zeichen.',
              multiline: true,
              validation: { isRequired: true, length: { max: 1200 } },
            }),
          }),
          {
            label: 'Textabschnitte',
            itemLabel: (props) => props.fields.heading.value || 'Neuer Abschnitt',
            validation: { length: { min: 1, max: 4 } },
          },
        ),
        facts: fields.array(
          fields.object({
            value: fields.text({ label: 'Zahl', description: 'z. B. 1987 oder 8', validation: { isRequired: true, length: { max: 8 } } }),
            label: fields.text({ label: 'Beschriftung', validation: { isRequired: true, length: { max: 50 } } }),
          }),
          {
            label: 'Kennzahlen',
            description: 'Erscheinen als Kästen neben dem Text, höchstens 4.',
            itemLabel: (props) => `${props.fields.value.value} ${props.fields.label.value}`.trim() || 'Neue Kennzahl',
            validation: { length: { max: 4 } },
          },
        ),
        valuesTitle: fields.text({
          label: 'Überschrift "Werte"',
          validation: { isRequired: true, length: { max: 70 } },
        }),
        values: fields.array(
          fields.object({
            title: fields.text({ label: 'Titel', validation: { isRequired: true, length: { max: 40 } } }),
            text: fields.text({ label: 'Text', multiline: true, validation: { isRequired: true, length: { max: 280 } } }),
          }),
          {
            label: 'Werte',
            itemLabel: (props) => props.fields.title.value || 'Neuer Wert',
            validation: { length: { max: 4 } },
          },
        ),
      },
    }),

    kontakt: singleton({
      label: 'Kontaktdaten',
      path: 'src/content/cms/kontakt',
      schema: {
        street: fields.text({
          label: 'Straße und Hausnummer',
          validation: { isRequired: true },
        }),
        zip: fields.text({
          label: 'PLZ',
          validation: { isRequired: true, pattern: { regex: /^\d{5}$/, message: 'Bitte eine fünfstellige PLZ eingeben' } },
        }),
        city: fields.text({ label: 'Ort', validation: { isRequired: true } }),
        phone: fields.text({
          label: 'Telefon',
          description: 'So, wie es auf der Seite erscheinen soll, z. B. 08171 123456',
          validation: {
            isRequired: true,
            pattern: { regex: /^\+?[\d\s/()-]{6,}$/, message: 'Bitte nur Ziffern, Leerzeichen, +, / oder - verwenden' },
          },
        }),
        email: fields.text({
          label: 'E-Mail',
          validation: {
            isRequired: true,
            pattern: { regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Bitte eine gültige E-Mail-Adresse eingeben' },
          },
        }),
        openingHours: fields.array(
          fields.object({
            days: fields.multiselect({
              label: 'Tage',
              options: [
                { label: 'Montag', value: 'Mo' },
                { label: 'Dienstag', value: 'Tu' },
                { label: 'Mittwoch', value: 'We' },
                { label: 'Donnerstag', value: 'Th' },
                { label: 'Freitag', value: 'Fr' },
                { label: 'Samstag', value: 'Sa' },
                { label: 'Sonntag', value: 'Su' },
              ],
              defaultValue: [],
            }),
            opens: fields.text({ label: 'Von', validation: { isRequired: true, pattern: timePattern } }),
            closes: fields.text({ label: 'Bis', validation: { isRequired: true, pattern: timePattern } }),
          }),
          {
            label: 'Öffnungszeiten',
            itemLabel: (props) =>
              `${props.fields.days.value.join(', ') || 'Tage wählen'}: ${props.fields.opens.value || '?'} bis ${props.fields.closes.value || '?'}`,
          },
        ),
        hoursNote: fields.text({
          label: 'Hinweis zu den Öffnungszeiten (optional)',
          description: 'z. B. "Termine vor Ort nach Vereinbarung"',
          validation: { length: { max: 80 } },
        }),
      },
    }),
  },
});
