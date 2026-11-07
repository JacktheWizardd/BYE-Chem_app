// Content checks: numbers recomputed from the engine's atomic weights, every question answerable,
// real subscripts only, and the built content consistent with the generated chapter map.
import { molarMass } from 'bye-chem-engine/chem';
import { describe, expect, it } from 'vitest';
import { ch00 } from '@/content/chapters/ch00';
import { ch04 } from '@/content/chapters/ch04';
import { CHAPTER_MAP } from '@/content/map.generated';
import type { ChapterContent, QuestionSpec } from '@/content/types';
import { check } from '@/practice/checks';
import { sigFig } from '@/practice/quantity';

const BUILT: ChapterContent[] = [ch00, ch04];
const r2 = (f: string) => molarMass(f).toFixed(2);

/** The answer a careful learner would type. */
function rightAnswer(s: QuestionSpec): string {
  switch (s.type) {
    case 'moles': return `${sigFig(s.grams / s.molarMass, s.sig)} mol`;
    case 'grams': return `${sigFig(s.moles * s.molarMass, s.sig)} g`;
    case 'molarMass': return `${r2(s.formula)} g/mol`;
    case 'sci': { const e = Math.floor(Math.log10(Math.abs(s.value))); return `${(s.value / 10 ** e).toPrecision(4)} x 10^${e}`; }
    case 'count': return String(s.answer);
    case 'number': return `${s.target} ${s.unit ?? ''}`;
    case 'expr': return s.accept[0]!;
  }
}

describe('molar masses in Chapter 4 match the engine (CIAAW weights)', () => {
  it.each([
    ['H2O', '18.02'], ['CO2', '44.01'], ['NaCl', '58.44'], ['CH4', '16.04'],
    ['C12H22O11', '342.30'], ['C6H8O6', '176.12'], ['FeSO4', '151.90'], ['Ca(NO3)2', '164.09'],
  ])('%s = %s g/mol', (f, want) => expect(r2(f)).toBe(want));

  it('the worked numbers in "Where it shows up" hold', () => {
    expect(sigFig(4.0 / molarMass('C12H22O11'), 3)).toBe('0.0117');
    expect((4.0 / molarMass('C12H22O11')) * 6.022e23).toBeCloseTo(7.04e21, -19);
    expect(sigFig(0.5 / molarMass('C6H8O6'), 3)).toBe('0.00284');
    expect(((55.845 / molarMass('FeSO4')) * 100).toFixed(1)).toBe('36.8');
  });
});

describe('every question accepts its right answer', () => {
  for (const c of BUILT) {
    const qs = [...Object.values(c.sections).flatMap((s) => s.check), ...(c.review ?? []), ...(c.recall ? [c.recall] : [])];
    it.each(qs.map((q) => [q.id, q] as const))('%s', (_, q) => expect(check(q.spec, rightAnswer(q.spec)).verdict).toBe('ok'));
    const steps = Object.values(c.sections).flatMap((s) => (s.simple ?? []).flatMap((p) => p.steps.map((st, i) => [`${p.id} step ${i + 1}`, st] as const)));
    if (steps.length) it.each(steps)('%s', (_, st) => expect(check(st.check, rightAnswer(st.check)).verdict).toBe('ok'));
  }
});

describe('notation and structure', () => {
  const allText = JSON.stringify(BUILT);
  it('no Unicode subscripts or superscripts in content (use <sub>/<sup>)', () => {
    expect(allText).not.toMatch(/[₀-₉⁰¹²³⁴-⁹]/);
  });
  it('every built section exists in the chapter map', () => {
    const ids = new Set(CHAPTER_MAP.flatMap((c) => c.sections.map((s) => s.id)));
    for (const c of BUILT) for (const id of Object.keys(c.sections)) expect(ids.has(id)).toBe(true);
  });
  it('"where it shows up" points to real sections', () => {
    const ids = new Set(CHAPTER_MAP.flatMap((c) => c.sections.map((s) => s.id)));
    for (const c of BUILT) for (const s of Object.values(c.sections)) for (const u of s.showsUp ?? []) expect(ids.has(u.id)).toBe(true);
  });
  it('question ids are unique', () => {
    const ids = BUILT.flatMap((c) => [...Object.values(c.sections).flatMap((s) => s.check.map((q) => q.id)), ...(c.review ?? []).map((q) => q.id), ...(c.recall ? [c.recall.id] : [])]);
    expect(new Set(ids).size).toBe(ids.length);
  });
  it('the map has 26 chapters and every prerequisite comes earlier', () => {
    expect(CHAPTER_MAP).toHaveLength(26);
    const key = (s: string) => s.split('.').map(Number) as [number, number];
    const before = (a: string, b: string) => { const [x1, y1] = key(a); const [x2, y2] = key(b); return x1 < x2 || (x1 === x2 && y1 < y2); };
    for (const c of CHAPTER_MAP) for (const s of c.sections) for (const n of s.needs) expect(before(n, s.id), `${s.id} needs ${n}`).toBe(true);
  });
});
