// Bewertungen und Auszeichnungen für die Trust-Elemente.
// ACHTUNG: Beispieldaten für die interne Demo. Die Schreinerei ist fiktiv,
// Bewertungen und Auszeichnungen sind ausgedacht. Vor einem echten Einsatz
// durch nachweisbare Werte ersetzen (z. B. echtes Google-Unternehmensprofil).

export const isDemoData = true;

export const googleRating = {
  score: 5.0,
  count: 110,
};

export type Award = {
  image: string;
  title: string; // erscheint als Bildunterschrift und Alttext
  text: string;
};

export const awards: Award[] = [
  {
    image: '/images/auszeichnungen/meisterbetrieb.svg',
    title: 'Meisterbetrieb seit 1987',
    text: 'Geführt von Schreinermeistern',
  },
  {
    image: '/images/auszeichnungen/kundenliebling-2026.svg',
    title: 'Kundenliebling 2026',
    text: 'Gewählt von Kunden der Region',
  },
  {
    image: '/images/auszeichnungen/ausbildungsbetrieb-2025.svg',
    title: 'Top-Ausbildungsbetrieb 2025',
    text: 'Nachwuchs aus der eigenen Werkstatt',
  },
  {
    image: '/images/auszeichnungen/regionales-holz.svg',
    title: 'Holz aus der Region',
    text: 'Aus Wäldern im Isartal und Oberland',
  },
];

/** 5 -> "5,0", 4.8 -> "4,8" */
export function formatScore(score: number): string {
  return score.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}
