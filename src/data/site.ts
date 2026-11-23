// Feste Angaben zur Firma, die nicht im CMS bearbeitet werden.
// Kontaktdaten, Öffnungszeiten, Startseiten-Texte und Leistungen
// werden in Keystatic gepflegt (src/content/cms/, Zugriff über src/lib/cms.ts).

export const site = {
  name: 'Schreinerei Huber',
  claim: 'Möbel und Innenausbau aus Wolfratshausen',
  description:
    'Schreinerei Huber aus Wolfratshausen: Möbel nach Maß, Küchen, Innenausbau, Türen und Reparaturen. Handwerk aus dem Isartal seit 1987.',
  founded: '1987',
  owner: 'Michael Huber', // fiktiv
  region: 'Bayern',
  country: 'DE',
  geo: { lat: 47.9134, lng: 11.4213 }, // ungefähre Ortsmitte Wolfratshausen
  serviceArea: ['Wolfratshausen', 'Geretsried', 'Bad Tölz', 'Starnberg', 'Münsing', 'Icking'],
};

export const navigation = [
  { href: '/', label: 'Start' },
  { href: '/leistungen/', label: 'Leistungen' },
  { href: '/ueber-uns/', label: 'Über uns' },
  { href: '/ratgeber/', label: 'Ratgeber' },
  { href: '/kontakt/', label: 'Kontakt' },
];

export const legalNavigation = [
  { href: '/impressum/', label: 'Impressum' },
  { href: '/datenschutz/', label: 'Datenschutz' },
];
