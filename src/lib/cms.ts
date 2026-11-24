// Liest die im CMS (Keystatic) gepflegten Inhalte und bereitet sie für die Seiten auf.
// Die Rohdaten liegen in src/content/cms/*.yaml und werden beim Build gelesen.
import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../keystatic.config';

const reader = createReader(process.cwd(), keystaticConfig);

function required<T>(value: T | null, name: string): T {
  if (!value) throw new Error(`CMS-Inhalt "${name}" fehlt. Bitte in Keystatic anlegen.`);
  return value;
}

// ---------- Startseite ----------

export async function getStartseite() {
  return required(await reader.singletons.startseite.read(), 'Startseite');
}

// ---------- Über uns ----------

/** Teilt einen Text an Leerzeilen in Absätze. */
export const toParagraphs = (text: string) =>
  text
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s*\n\s*/g, ' ').trim())
    .filter(Boolean);

export async function getUeberUns() {
  const data = required(await reader.singletons.ueberUns.read(), 'Über uns');
  return {
    ...data,
    sections: data.sections.map((s) => ({ heading: s.heading, paragraphs: toParagraphs(s.text) })),
  };
}

// ---------- Leistungen ----------

export type Service = {
  id: string; // Sprungmarke, z. B. "moebel-nach-mass"
  title: string;
  short: string;
  long: string;
  image: string;
  imageAlt: string; // leer = Bild gilt als dekorativ
  points: string[];
};

/** Macht aus einem Titel eine URL-taugliche Sprungmarke. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export async function getLeistungen(): Promise<Service[]> {
  const data = required(await reader.singletons.leistungen.read(), 'Leistungen');
  return data.items.map((item) => ({
    id: slugify(item.title),
    title: item.title,
    short: item.short,
    long: item.long || item.short,
    image: item.image ?? '',
    imageAlt: item.imageAlt ?? '',
    points: item.points.filter(Boolean),
  }));
}

// ---------- Kontaktdaten ----------

const DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'] as const;
const DAY_NAMES: Record<string, string> = {
  Mo: 'Montag', Tu: 'Dienstag', We: 'Mittwoch', Th: 'Donnerstag', Fr: 'Freitag', Sa: 'Samstag', Su: 'Sonntag',
};
const SCHEMA_DAYS: Record<string, string> = {
  Mo: 'Monday', Tu: 'Tuesday', We: 'Wednesday', Th: 'Thursday', Fr: 'Friday', Sa: 'Saturday', Su: 'Sunday',
};

/** "Mo, Tu, We, Th" -> "Montag bis Donnerstag", "Mo, We" -> "Montag und Mittwoch" */
function formatDays(days: readonly string[]): string {
  const sorted = DAYS.filter((d) => days.includes(d));
  const runs: string[][] = [];
  for (const d of sorted) {
    const last = runs.at(-1);
    if (last && DAYS.indexOf(d) === DAYS.indexOf(last.at(-1) as (typeof DAYS)[number]) + 1) last.push(d);
    else runs.push([d]);
  }
  const parts = runs.map((r) =>
    r.length >= 3 ? `${DAY_NAMES[r[0]]} bis ${DAY_NAMES[r.at(-1)!]}` : r.map((d) => DAY_NAMES[d]).join(' und '),
  );
  return parts.length > 1 ? `${parts.slice(0, -1).join(', ')} und ${parts.at(-1)}` : (parts[0] ?? '');
}

/** "07:30" -> "7:30" */
const formatTime = (t: string) => t.replace(/^0(\d)/, '$1');

/** "08171 123456" -> "+498171123456" */
function toTelHref(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, '');
  const international = digits.startsWith('+') ? digits : digits.replace(/^0/, '+49');
  return `tel:${international}`;
}

export async function getKontakt() {
  const k = required(await reader.singletons.kontakt.read(), 'Kontaktdaten');
  const hours = k.openingHours
    .filter((h) => h.days.length > 0)
    .map((h) => ({
      days: formatDays(h.days),
      time: `${formatTime(h.opens)} bis ${formatTime(h.closes)} Uhr`,
      schema: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: DAYS.filter((d) => h.days.includes(d)).map((d) => SCHEMA_DAYS[d]),
        opens: h.opens,
        closes: h.closes,
      },
    }));

  return {
    street: k.street,
    zip: k.zip,
    city: k.city,
    phone: k.phone,
    phoneHref: toTelHref(k.phone),
    email: k.email,
    hours,
    hoursNote: k.hoursNote,
  };
}

export type Kontakt = Awaited<ReturnType<typeof getKontakt>>;
