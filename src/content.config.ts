// Content Collections: legt fest, welche Angaben jeder Ratgeber-Artikel braucht.
// Fehlt z. B. das Datum, bricht der Build mit einer verständlichen Meldung ab.
// Die Artikel werden in Keystatic bearbeitet (siehe keystatic.config.ts).
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Leere optionale Felder aus dem CMS ("" oder null) wie "nicht ausgefüllt" behandeln
const emptyToUndefined = (v: unknown) => (v === '' || v === null ? undefined : v);

const ratgeber = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/ratgeber' }),
  schema: z.object({
    title: z.string(), // H1 des Artikels
    seoTitle: z.preprocess(emptyToUndefined, z.string().optional()), // <title>, falls abweichend vom H1
    description: z.string(), // Meta-Description und Teaser
    pubDate: z.coerce.date(),
    updatedDate: z.preprocess(emptyToUndefined, z.coerce.date().optional()),
    author: z.string(),
    category: z.string(),
    draft: z.boolean().default(false), // true: Artikel wird nicht veröffentlicht
  }),
});

export const collections = { ratgeber };
