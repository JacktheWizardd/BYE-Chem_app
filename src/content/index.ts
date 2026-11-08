// Content lookups (docs/learn-template.md "Adding a section").
// - The map (every chapter and section) is generated from docs/chapter-map.md.
// - Chapter parts register themselves: any src/content/chapters/chNN.ts is picked up (small, loaded with the app).
// - Sections register themselves too: src/content/sections/<n>/<n.m>.ts, each loaded on demand.
import { use } from 'react';
import { CHAPTER_MAP, CLASS_ORDER } from './map.generated';
import type { ChapterContent, MapChapter, MapSection, SectionContent } from './types';

type Ctx<T> = { keys(): string[]; (id: string): T };
type RequireWithContext = { context<T>(dir: string, deep: boolean, re: RegExp, mode?: 'sync' | 'lazy'): Ctx<T> };
// Metro only sees require.context when it is written literally (the cast disappears when compiled).

const chapterCtx = (require as unknown as RequireWithContext).context<Record<string, unknown>>('./chapters', false, /ch\d+\.ts$/);
const CHAPTERS: Record<number, ChapterContent> = {};
for (const key of chapterCtx.keys()) {
  for (const value of Object.values(chapterCtx(key))) {
    const c = value as ChapterContent;
    if (c && typeof c.num === 'number' && typeof c.promise === 'string') CHAPTERS[c.num] = c;
  }
}

const sectionCtx = (require as unknown as RequireWithContext).context<Promise<Record<string, unknown>>>('./sections', true, /\/\d+\.\d+\.ts$/, 'lazy');
/** Section id → its file key, e.g. "4.1" → "./4/4.1.ts". Known without loading the files. */
const SECTION_FILES: Record<string, string> = {};
for (const key of sectionCtx.keys()) {
  const id = key.match(/(\d+\.\d+)\.ts$/)?.[1];
  if (id) SECTION_FILES[id] = key;
}

export { CHAPTER_MAP, CLASS_ORDER };

export const mapChapter = (num: number): MapChapter | undefined => CHAPTER_MAP.find((c) => c.num === num);
export const chapterOf = (sectionId: string) => Number(sectionId.split('.')[0]);
export const mapSection = (id: string): MapSection | undefined => mapChapter(chapterOf(id))?.sections.find((s) => s.id === id);
export const chapterContent = (num: number): ChapterContent | undefined => CHAPTERS[num];
/** Whether a section has been written (its file exists). */
export const isWritten = (id: string) => id in SECTION_FILES;
export const writtenCount = (num: number) => (mapChapter(num)?.sections ?? []).filter((s) => isWritten(s.id)).length;

/** The section after this one in the map (crossing into the next chapter). */
export function nextSectionId(id: string): string | undefined {
  const all = CHAPTER_MAP.flatMap((c) => c.sections.map((s) => s.id));
  return all[all.indexOf(id) + 1];
}

const cache = new Map<string, Promise<SectionContent | undefined>>();

/** Loads a section's content (once); undefined when it isn't written yet. */
export function loadSection(id: string): Promise<SectionContent | undefined> {
  let p = cache.get(id);
  if (!p) {
    const key = SECTION_FILES[id];
    p = key
      ? sectionCtx(key).then((m) => Object.values(m).find((v) => (v as SectionContent)?.id === id) as SectionContent | undefined)
      : Promise.resolve(undefined);
    cache.set(id, p);
  }
  return p;
}

/** In a component under <Loading>: the section's content, suspending while it loads. */
export function useSection(id: string): SectionContent | undefined {
  return use(loadSection(id));
}

/** Fetches every written section of a chapter while the reader looks at the chapter page. */
export function preloadChapter(num: number): void {
  for (const s of mapChapter(num)?.sections ?? []) if (isWritten(s.id)) void loadSection(s.id);
}
