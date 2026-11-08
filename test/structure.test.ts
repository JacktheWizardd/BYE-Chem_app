// Enforces docs/learn-template.md for every written section and chapter (like BYE Math's check:learn).
import { describe, expect, it } from 'vitest';
import { CHAPTER_MAP } from '@/content/map.generated';
import type { Block, ChapterContent, SectionContent } from '@/content/types';

const sectionMods = import.meta.glob<Record<string, unknown>>('../src/content/sections/*/*.ts', { eager: true });
const chapterMods = import.meta.glob<Record<string, unknown>>('../src/content/chapters/ch*.ts', { eager: true });
export const SECTIONS = Object.values(sectionMods).flatMap((m) => Object.values(m)) as SectionContent[];
const CHAPTERS = Object.values(chapterMods).flatMap((m) => Object.values(m)) as ChapterContent[];
const MAP_IDS = new Set(CHAPTER_MAP.flatMap((c) => c.sections.map((s) => s.id)));

const isPicture = (b: Block) => 'particles' in b || 'frames' in b || 'molecule' in b || 'figure' in b || 'views' in b;
const between = (n: number, lo: number, hi: number) => n >= lo && n <= hi;

describe.each(SECTIONS.map((s) => [s.id, s] as const))('Section %s', (id, s) => {
  it('is in the chapter map, and its file is named after it', () => {
    expect(MAP_IDS.has(id)).toBe(true);
    const file = Object.entries(sectionMods).find(([, m]) => Object.values(m).includes(s))![0];
    expect(file.endsWith(`/${id}.ts`)).toBe(true);
  });
  it('has 4–7 reads, each with a gist, a paragraph and a picture', () => {
    expect(between(s.reads.length, 4, 7)).toBe(true);
    expect(new Set(s.reads.map((r) => r.id)).size).toBe(s.reads.length);
    for (const r of s.reads) {
      expect(r.gist.length, r.id).toBeGreaterThan(10);
      expect(r.blocks.some((b) => 'p' in b), `${r.id}: a paragraph`).toBe(true);
      expect(r.blocks.some(isPicture), `${r.id}: a picture`).toBe(true);
      expect(between(r.minutes, 1, 5), `${r.id}: minutes`).toBe(true);
      expect(r.blocks.filter((b) => 'key' in b).length, `${r.id}: at most two key boxes`).toBeLessThanOrEqual(2);
    }
  });
  it('has the recap parts within their limits', () => {
    expect(between(s.why.length, 2, 4)).toBe(true);
    expect(between(s.spot.clues.length, 3, 5)).toBe(true);
    expect(between(s.spot.lookAlikes.length, 2, 3)).toBe(true);
    expect(between(s.mistakes.length, 3, 5)).toBe(true);
    expect(between(s.realUses.length, 4, 6)).toBe(true);
    for (const u of s.realUses) expect(u.eq.length, u.where).toBeGreaterThan(0);
    for (const l of s.spot.lookAlikes) if (l.link) expect(MAP_IDS.has(l.link), l.link).toBe(true);
    for (const n of s.next ?? []) expect(MAP_IDS.has(n.id), n.id).toBe(true);
  });
  it('has 3 worked examples (0–1 for a descriptive section), each 2–5 steps', () => {
    if (s.tool) expect(s.examples.length).toBe(3);
    else expect(s.examples.length).toBeLessThanOrEqual(1);
    s.examples.forEach((e, i) => {
      expect(e.id).toBe(`${id}-${i + 1}`);
      expect(between(e.steps.length, 2, 5), e.id).toBe(true);
      for (const st of e.steps) {
        expect(st.move.split(/\s+/).length, `${e.id}: move name`).toBeLessThanOrEqual(3);
        expect(st.lines.length, `${e.id}: lines`).toBeGreaterThan(0);
        expect(st.lines[0]!.left, `${e.id} ${st.move}: the first line has a left side`).toBeTruthy();
      }
    });
    expect(s.examples.map((e) => e.level)).toEqual(s.examples.length === 3 ? ['easy', 'typical', 'harder'] : s.examples.map((e) => e.level));
  });
  it('every picture is described for screen readers', () => {
    const scenes = [...s.reads.flatMap((r) => r.blocks), ...s.why.map((f) => ({ frames: [f] }) as Block)].flatMap((b) =>
      'particles' in b ? [b.particles] : 'frames' in b ? b.frames.flatMap((f) => (f.particles ? [f.particles] : [])) : [],
    );
    for (const sc of scenes) expect(sc.describe.length).toBeGreaterThan(10);
  });
  it('a frame set has a picture on every frame or on none (no empty picture band)', () => {
    const sets = [s.why, ...s.reads.flatMap((r) => r.blocks.flatMap((b) => ('frames' in b ? [b.frames] : [])))];
    for (const set of sets) {
      const pictured = set.filter((f) => f.particles).length;
      expect(pictured === 0 || pictured === set.length, set[0]?.caption).toBe(true);
    }
  });
});

describe.each(CHAPTERS.map((c) => [c.num, c] as const))('Chapter %s', (num, c) => {
  const map = CHAPTER_MAP.find((x) => x.num === num)!;
  it('is in the map', () => expect(map).toBeTruthy());
  it('road map groups hold every section exactly once', () => {
    if (!c.groups) return;
    const ids = c.groups.flatMap((g) => g.ids).sort();
    expect(ids).toEqual(map.sections.map((s) => s.id).sort());
  });
  it('glance rows point at the chapter’s sections', () => {
    for (const g of c.glance ?? []) expect(map.sections.some((s) => s.id === g.from), g.from).toBe(true);
  });
});
