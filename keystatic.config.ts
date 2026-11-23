// Keystatic: legt fest, welche Inhalte im CMS bearbeitet werden können.
// Bearbeiter sehen nur diese Felder. Layout, Farben und Schriften bleiben im Code.
// Admin-Oberfläche (nur lokal): http://localhost:4321/keystatic
import { config, fields, singleton } from '@keystatic/core';

const timePattern = {
  regex: /^([01]\d|2[0-3]):[0-5]\d$/,
  message: 'Bitte im Format HH:MM eingeben, z. B. 07:30',
};

export default config({
  storage: { kind: 'local' },

  ui: {
    brand: { name: 'Schreinerei Huber' },
    navigation: {
      Seiten: ['startseite', 'leistungen'],
      Einstellungen: ['kontakt'],
    },
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
