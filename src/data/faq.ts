// Häufige Fragen. Werden auf der Startseite angezeigt und gleichzeitig
// als Schema.org FAQPage ausgegeben. Fiktive Testinhalte.

export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: 'Wie lange dauert ein Möbelstück nach Maß vom ersten Gespräch bis zur Montage?',
    answer:
      'Bei einem Einbauschrank rechnen wir meist mit sechs bis zehn Wochen. Darin enthalten sind Aufmaß, Entwurf, Abstimmung mit Ihnen, Materialbestellung, Fertigung in der Werkstatt und die Montage. Bei Küchen kommt die Lieferzeit der Elektrogeräte hinzu. Den genauen Zeitplan nennen wir Ihnen mit dem Angebot.',
  },
  {
    question: 'Ist das Aufmaß vor Ort kostenlos?',
    answer:
      'Erstgespräch und Aufmaß sind im Umkreis von 25 Kilometern um Wolfratshausen kostenlos und unverbindlich. Für weiter entfernte Orte sprechen wir die Anfahrt vorher mit Ihnen ab.',
  },
  {
    question: 'Was kostet ein Einbauschrank nach Maß?',
    answer:
      'Das hängt vor allem von Größe, Holzart, Oberfläche und Innenausstattung ab. Ein Schrank mit Schubladen und Auszügen kostet mehr als einer mit Fachböden. Nach dem Aufmaß erhalten Sie ein schriftliches Angebot, in dem jede Position nachvollziehbar aufgeführt ist. Ändert sich während der Planung etwas, sprechen wir vorher mit Ihnen.',
  },
  {
    question: 'Welche Holzarten verarbeiten Sie?',
    answer:
      'Am häufigsten arbeiten wir mit Eiche, Buche, Esche, Ahorn, Nussbaum und Fichte, wo möglich aus bayerischer Herkunft. Für lackierte Fronten verwenden wir Plattenwerkstoffe, die sich formstabil verarbeiten lassen. Welches Material passt, besprechen wir mit Ihnen anhand von Mustern.',
  },
  {
    question: 'Schließen Sie bei einer neuen Küche auch die Geräte an?',
    answer:
      'Wir bauen Spüle und Elektrogeräte ein und schließen die Geräte an vorhandene Anschlüsse an. Arbeiten an der Elektro- oder Wasserinstallation, etwa neue Leitungen oder Starkstromanschlüsse, übernehmen Fachbetriebe aus der Region, mit denen wir regelmäßig zusammenarbeiten.',
  },
  {
    question: 'Reparieren Sie auch Möbel, die nicht von Ihnen stammen?',
    answer:
      'Ja. Wir reparieren Massivholzmöbel, Türen und Beschläge unabhängig davon, wer sie gebaut hat. Schicken Sie uns am besten vorab ein Foto, dann können wir einschätzen, ob sich eine Reparatur lohnt.',
  },
];
