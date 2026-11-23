// Hilfsfunktionen für den Ratgeber.
import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'ratgeber'>;

/** Alle veröffentlichten Artikel, neueste zuerst. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('ratgeber', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

/** Geschätzte Lesezeit in Minuten (ca. 200 Wörter pro Minute). */
export function readingTime(body = ''): number {
  const text = body
    .replace(/^import .*$/gm, '') // MDX-Importe nicht mitzählen
    .replace(/<[^>]+>/g, ' ');
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** Datum im deutschen Format, z. B. 23. November 2026. */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' });
}
