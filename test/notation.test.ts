// The notation spec, enforced: docs/notation.md's examples, the chapters' text, and the glyphs in the shipped fonts.
import { openSync } from 'fontkit';
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { CHAPTER_MAP } from '@/content/map.generated';
import { validateRich } from '@/content/notation';

const root = fileURLToPath(new URL('..', import.meta.url));
const doc = readFileSync(path.join(root, 'docs/notation.md'), 'utf8');
const lines = doc.split('\n');
const spans = (line: string) => [...line.matchAll(/`([^`]+)`/g)].map((m) => m[1]!);
const names = (issues: string[]) => issues.map((i) => i.split(':')[0]);

/** Code spans on "**Markup:**" lines: the right way to write each thing. */
const GOOD = lines.filter((l) => l.startsWith('**Markup:**')).flatMap(spans);
/** Code spans on "**Caught:**" lines, each followed by the issue it must raise in brackets. */
const BAD = lines
  .filter((l) => l.startsWith('**Caught:**'))
  .flatMap((l) => [...l.matchAll(/`([^`]+)`\s*\(([a-z-]+)\)/g)].map((m) => [m[1]!, m[2]!] as const));

/** Every string in a value, with where it sits. */
function strings(v: unknown, at: string, out: [string, string][] = []): [string, string][] {
  if (typeof v === 'string') out.push([at, v]);
  else if (Array.isArray(v)) v.forEach((x, i) => strings(x, `${at}[${i}]`, out));
  else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) strings(x, `${at}.${k}`, out);
  return out;
}

const chapterDir = path.join(root, 'src/content/chapters');
const chapterFiles = readdirSync(chapterDir).filter((f) => /^ch\d+\.ts$/.test(f)).sort();
const CHAPTERS: [string, [string, string][]][] = await Promise.all(
  chapterFiles.map(async (f) => [f, strings(await import(path.join(chapterDir, f)), f)] as [string, [string, string][]]),
);
const MAP_STRINGS = strings(CHAPTER_MAP, 'CHAPTER_MAP');

describe('docs/notation.md', () => {
  it('has examples to check', () => {
    expect(GOOD.length).toBeGreaterThan(40);
    expect(BAD.length).toBeGreaterThan(15);
  });
  it.each(GOOD)('passes: %s', (s) => expect(validateRich(s)).toEqual([]));
  it.each(BAD)('fails: %s (%s)', (s, issue) => expect(names(validateRich(s))).toContain(issue));
  it('lists every issue the validator can raise, and no others', () => {
    const table = doc.slice(doc.indexOf('## What `validateRich` catches'), doc.indexOf('## Glyph gaps'));
    const listed = [...table.matchAll(/^\| `([a-z-]+)` \|/gm)].map((m) => m[1]!).sort();
    const src = readFileSync(path.join(root, 'src/content/notation.ts'), 'utf8');
    const raised = [...new Set([...src.matchAll(/(?:add\(|\[)'([a-z]+-[a-z-]+)'/g)].map((m) => m[1]!))].sort();
    expect(raised).toHaveLength(16);
    expect(listed).toEqual(raised);
  });
});

describe('validateRich', () => {
  it.each([
    ['H<sub 2O', 'tag-broken'],
    ['H2O</sub>', 'tag-stray-close'],
    ['<b>moles<b>', 'tag-unclosed'],
    ['<sup>2</SUP>', 'tag-unknown'],
    ['<sub class="x">2</sub>', 'tag-unknown'],
    ['SO<sub>4</sub><sup>2-</sup>', 'charge-hyphen'],
    ['10<sup>‐3</sup>', 'charge-hyphen'],
    ['2.5 x 10<sup>3</sup>', 'times-x'],
    ['2 * 3', 'times-x'],
    ['CO₂', 'unicode-script'],
    ['Kᵦ', 'unicode-script'],
    ['2.0 x 10<sup>-3</sup>', 'times-x'],
  ])('%s → %s', (s, issue) => expect(names(validateRich(s))).toContain(issue));

  it('names every slip in a string with several', () => {
    expect(names(validateRich('2.0 x 10<sup>-3</sup> H₂O'))).toEqual(['charge-hyphen', 'unicode-script', 'times-x']);
  });

  it.each([
    'pH < 7 means acidic',
    'Tro 2.9, 3.8–3.10',
    'carbon-14',
    '4.1-s1',
    'e.g. 2.3 × 10^-5',
    'x = 3',
    '1s<sup>2</sup> 2s<sup>1</sup>',
    'e<sup>−<i>E</i><sub>a</sub>/<i>RT</i></sup>',
    '36.8% iron by mass',
    'a bond angle of 109.5°',
    '',
  ])('leaves alone: %s', (s) => expect(validateRich(s)).toEqual([]));
});

describe('content follows the notation', () => {
  it.each(CHAPTERS)('every string in src/content/chapters/%s', (_, all) => {
    const bad = all.map(([at, s]) => [at, validateRich(s)] as const).filter(([, issues]) => issues.length);
    expect(bad).toEqual([]);
  });
  it('every string in the chapter map', () => {
    const bad = MAP_STRINGS.map(([at, s]) => [at, validateRich(s)] as const).filter(([, issues]) => issues.length);
    expect(bad).toEqual([]);
  });
});

describe('glyphs: every character we show is in the shipped fonts', () => {
  const FONTS = path.join(root, 'node_modules/@expo-google-fonts');
  // The faces src/fonts.ts loads, by family.
  const FAMILIES: Record<string, string[]> = {
    'STIX Two Text': ['stix-two-text/400Regular/STIXTwoText_400Regular.ttf', 'stix-two-text/400Regular_Italic/STIXTwoText_400Regular_Italic.ttf'],
    'Zen Kaku Gothic New': [
      'zen-kaku-gothic-new/400Regular/ZenKakuGothicNew_400Regular.ttf',
      'zen-kaku-gothic-new/500Medium/ZenKakuGothicNew_500Medium.ttf',
      'zen-kaku-gothic-new/700Bold/ZenKakuGothicNew_700Bold.ttf',
    ],
    'Shippori Mincho': ['shippori-mincho/400Regular/ShipporiMincho_400Regular.ttf'],
  };
  const KEY = '→⇌Δ°‡·−×';
  const untag = (s: string) => s.replace(/<\/?[a-z]+>/g, '');
  const charsOf = (texts: string[]) => [...new Set([...KEY, ...texts.flatMap((t) => [...untag(t)])])].filter((c) => c.codePointAt(0)! > 0x20);

  const body = charsOf([...GOOD, ...CHAPTERS.flatMap(([, all]) => all.map(([, s]) => s)), ...MAP_STRINGS.map(([, s]) => s)]);
  const titles = charsOf(CHAPTER_MAP.flatMap((c) => [c.title, ...c.sections.map((s) => s.title)]));
  // Shippori Mincho only sets titles; the other two set any Rich text.
  const USED: Record<string, string[]> = { 'STIX Two Text': body, 'Zen Kaku Gothic New': body, 'Shippori Mincho': titles };

  const missing = (family: string) => {
    const faces = FAMILIES[family]!.map((f) => openSync(path.join(FONTS, f)));
    return USED[family]!.filter((c) => faces.some((face) => !face.hasGlyphForCodePoint(c.codePointAt(0)!)));
  };
  const gaps = doc.slice(doc.indexOf('## Glyph gaps'));
  const documented = Object.fromEntries([...gaps.matchAll(/^\| ([^|`]+?) \| `([^`]*)` \|$/gm)].map((m) => [m[1]!, m[2]!.split(' ').filter(Boolean)]));
  const hexOf = (cs: string[]) => cs.map((c) => `${c} U+${c.codePointAt(0)!.toString(16).toUpperCase().padStart(4, '0')}`).join(', ') || 'none';

  it('reports the key chemistry glyphs, font by font', () => {
    const report = Object.keys(FAMILIES).map((f) => `${f}: missing ${hexOf([...KEY].filter((c) => missing(f).includes(c)))}`);
    console.info(`Key glyphs ${KEY}\n  ${report.join('\n  ')}`);
    expect(report).toHaveLength(3);
  });

  it.each(Object.keys(FAMILIES))('%s is missing exactly the glyphs docs/notation.md lists', (family) => {
    const found = missing(family).sort();
    expect(found, `${family} is missing ${hexOf(found)}. Update the "Glyph gaps" table, or fix the fonts.`).toEqual((documented[family] ?? []).sort());
  });
});
