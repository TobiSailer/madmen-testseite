// Zentrale Firmendaten. Alles, was hier steht, wird auf den Seiten,
// im Footer und im Schema.org-Code verwendet. Fiktive Testdaten.

export const site = {
  name: 'Schreinerei Huber',
  claim: 'Möbel und Innenausbau aus Wolfratshausen',
  description:
    'Schreinerei Huber aus Wolfratshausen: Möbel nach Maß, Küchen, Innenausbau, Türen und Reparaturen. Handwerk aus dem Isartal seit 1987.',
  founded: '1987',
  owner: 'Michael Huber', // fiktiv
  phone: '+49 8171 000000', // Platzhalter
  phoneDisplay: '08171 000000', // Platzhalter
  email: 'info@schreinerei-huber.example', // Platzhalter
  address: {
    street: 'Beispielstraße 12', // Platzhalter
    zip: '82515',
    city: 'Wolfratshausen',
    region: 'Bayern',
    country: 'DE',
  },
  geo: { lat: 47.9134, lng: 11.4213 }, // ungefähre Ortsmitte Wolfratshausen
  openingHours: [
    { days: 'Montag bis Donnerstag', time: '7:30 bis 17:00 Uhr', schema: 'Mo-Th 07:30-17:00' },
    { days: 'Freitag', time: '7:30 bis 13:00 Uhr', schema: 'Fr 07:30-13:00' },
  ],
  serviceArea: ['Wolfratshausen', 'Geretsried', 'Bad Tölz', 'Starnberg', 'Münsing', 'Icking'],
};

export const navigation = [
  { href: '/', label: 'Start' },
  { href: '/leistungen/', label: 'Leistungen' },
  { href: '/ueber-uns/', label: 'Über uns' },
  { href: '/kontakt/', label: 'Kontakt' },
];

export const legalNavigation = [
  { href: '/impressum/', label: 'Impressum' },
  { href: '/datenschutz/', label: 'Datenschutz' },
];

export type Service = {
  id: string;
  title: string;
  short: string;
  long: string;
  points: string[];
  icon: 'furniture' | 'kitchen' | 'interior' | 'door' | 'stairs' | 'repair';
};

export const services: Service[] = [
  {
    id: 'moebel-nach-mass',
    title: 'Möbel nach Maß',
    short: 'Schränke, Regale und Tische, die genau in Ihren Raum passen, auch unter Dachschrägen.',
    long: 'Wir planen und bauen Möbel, die sich nach dem Raum richten und nicht umgekehrt. Ob Einbauschrank unter der Dachschräge, Bücherwand oder Esstisch aus heimischer Eiche: Sie bekommen ein Stück, das genau passt und lange hält.',
    points: ['Einbauschränke und Garderoben', 'Regale und Bücherwände', 'Tische aus Massivholz'],
    icon: 'furniture',
  },
  {
    id: 'kuechen',
    title: 'Küchen',
    short: 'Küchen aus der eigenen Werkstatt, geplant nach Ihren Abläufen und Ihrem Budget.',
    long: 'Eine Küche wird täglich benutzt. Deshalb planen wir sie mit Ihnen gemeinsam nach Ihren Abläufen, wählen passende Geräte aus und bauen Fronten und Korpusse in der eigenen Werkstatt.',
    points: ['Planung vor Ort', 'Fronten in Holz, Lack oder Furnier', 'Montage inklusive Geräteeinbau'],
    icon: 'kitchen',
  },
  {
    id: 'innenausbau',
    title: 'Innenausbau',
    short: 'Wandverkleidungen, Decken und Akustiklösungen für Wohnräume, Praxen und Büros.',
    long: 'Holz verändert die Wirkung eines Raums. Wir verkleiden Wände und Decken, bauen Akustikelemente für bessere Raumakustik und statten Praxen, Kanzleien und Büros aus.',
    points: ['Wand- und Deckenverkleidungen', 'Akustikpaneele', 'Ladenbau und Praxisausstattung'],
    icon: 'interior',
  },
  {
    id: 'tueren-fenster',
    title: 'Türen und Fenster',
    short: 'Innentüren, Haustüren und Holzfenster, neu gefertigt oder fachgerecht aufgearbeitet.',
    long: 'Wir liefern und montieren Innentüren und Haustüren und fertigen Holzfenster für Alt- und Neubau. Bei denkmalgeschützten Gebäuden arbeiten wir bestehende Fenster und Türen auf.',
    points: ['Innen- und Haustüren', 'Holzfenster', 'Aufarbeitung im Bestand'],
    icon: 'door',
  },
  {
    id: 'treppen',
    title: 'Treppen',
    short: 'Holztreppen für Neubau und Renovierung, inklusive Belegung bestehender Betontreppen.',
    long: 'Ob neue Wangentreppe oder die Belegung einer bestehenden Betontreppe mit Holzstufen: Wir messen auf, planen und montieren Treppen, die sicher sind und zum Haus passen.',
    points: ['Wangen- und Faltwerktreppen', 'Stufenbelag auf Beton', 'Geländer in Holz und Metall'],
    icon: 'stairs',
  },
  {
    id: 'reparaturen',
    title: 'Reparaturen',
    short: 'Klemmende Türen, lose Scharniere oder beschädigte Möbel: Wir reparieren, statt zu ersetzen.',
    long: 'Viele Holzarbeiten lassen sich mit überschaubarem Aufwand reparieren. Wir kommen vorbei, schauen uns den Schaden an und sagen Ihnen offen, ob sich eine Reparatur lohnt.',
    points: ['Türen und Beschläge', 'Möbelreparatur', 'Kleine Arbeiten im Haus'],
    icon: 'repair',
  },
];
