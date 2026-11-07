// Content lookups. The map (every chapter and section) is generated from docs/chapter-map.md;
// built chapters register themselves: any src/content/chapters/chNN.ts is picked up automatically.
import { CHAPTER_MAP, CLASS_ORDER } from './map.generated';
import type { ChapterContent, MapChapter, MapSection, Question, SectionContent } from './types';

type Ctx = { keys(): string[]; (id: string): Record<string, unknown> };
const ctx = (require as unknown as { context(dir: string, deep: boolean, re: RegExp): Ctx }).context('./chapters', false, /ch\d+\.ts$/);

const BUILT: Record<number, ChapterContent> = {};
for (const key of ctx.keys()) {
  for (const value of Object.values(ctx(key))) {
    const c = value as ChapterContent;
    if (c && typeof c.num === 'number' && c.sections) BUILT[c.num] = c;
  }
}

export { CHAPTER_MAP, CLASS_ORDER };

export const mapChapter = (num: number): MapChapter | undefined => CHAPTER_MAP.find((c) => c.num === num);
export const chapterOf = (sectionId: string) => Number(sectionId.split('.')[0]);
export const mapSection = (id: string): MapSection | undefined => mapChapter(chapterOf(id))?.sections.find((s) => s.id === id);
export const chapterContent = (num: number): ChapterContent | undefined => BUILT[num];
export const sectionContent = (id: string): SectionContent | undefined => BUILT[chapterOf(id)]?.sections[id];
export const isBuilt = (id: string) => !!sectionContent(id);
export const builtChapters = () => Object.keys(BUILT).map(Number).sort((a, b) => a - b);

/** Every question that can come back in Today's review: section checks plus chapter review extras. */
export function reviewPool(): Question[] {
  return builtChapters().flatMap((n) => {
    const c = BUILT[n]!;
    return [...Object.values(c.sections).flatMap((s) => s.check), ...(c.review ?? [])];
  });
}
