// Content numbers: every worked line, real use and molar mass is recomputed from the engine's atomic
// weights (CIAAW), and the map stays consistent. A wrong number fails the build.
import { molarMass } from 'bye-chem-engine/chem';
import { describe, expect, it } from 'vitest';
import { CHAPTER_MAP } from '@/content/map.generated';
import type { ChapterContent, SectionContent, Use } from '@/content/types';

const SECTIONS = Object.values(import.meta.glob<Record<string, unknown>>('../src/content/sections/*/*.ts', { eager: true })).flatMap((m) => Object.values(m)) as SectionContent[];
const CHAPTERS = Object.values(import.meta.glob<Record<string, unknown>>('../src/content/chapters/ch*.ts', { eager: true })).flatMap((m) => Object.values(m)) as ChapterContent[];
const NA = 6.022e23;
const plainRich = (src: string) => src.replace(/<\/?(sub|sup|b|i|g|m)>/g, '');

/** "6.022 × 10<sup>23</sup>" → 6.022e23; "0.500 mol" → 0.5. Text is Rich; NBSPs are spaces. */
function nums(rich: string): number[] {
  const s = rich.replace(/ /g, ' ').replace(/<sup>(−|-)?(\d+)<\/sup>/g, (_, m, d) => `e${m ? '-' : ''}${d}`).replace(/<[^>]+>/g, '');
  return [...s.matchAll(/(\d+(?:\.\d*)?)(?:\s*×\s*10e(-?\d+))?/g)].map(([, a, e]) => Number(a) * (e ? 10 ** Number(e) : 1));
}
/** The first number in a result, with how precisely it is written: half a unit in its last digit. */
function shown(rich: string): { v: number; tol: number } {
  const s = rich.replace(/\u00a0/g, ' ').replace(/<sup>(−|-)?(\d+)<\/sup>/g, (_, m, d) => `e${m ? '-' : ''}${d}`).replace(/<[^>]+>/g, '');
  const m = s.match(/(\d+)(?:\.(\d*))?(?:\s*×\s*10e(-?\d+))?/)!;
  const exp = m[3] ? Number(m[3]) : 0;
  const decimals = m[2] !== undefined ? m[2].length : 0;
  return { v: Number(`${m[1]}.${m[2] ?? ''}`) * 10 ** exp, tol: 0.5 * 10 ** (exp - decimals) };
}
const plain = (rich: string) => rich.replace(/ /g, ' ').replace(/<sup>(−|-)?(\d+)<\/sup>/g, '^$1$2').replace(/<[^>]+>/g, '');

/** Checks "a g ÷ b g/mol = c", "a mol × 6.022 × 10^23 = c", "a × b + c × d = e" and "a ÷ b × 100 = c%". */
function checkRelation(left: string, result: string, where: string, strict = true) {
  const L = plain(left);
  const got = shown(result);
  let exact: number | undefined;
  let m: RegExpMatchArray | null;
  if ((m = L.match(/^([\d.]+) g ÷ ([\d.]+) g\/mol$/))) exact = Number(m[1]) / Number(m[2]);
  else if ((m = L.match(/^([\d.]+) mol × 6\.022 × 10\^23$/))) exact = Number(m[1]) * NA;
  else if ((m = L.match(/^([\d.]+) mol × ([\d.]+) g\/mol$/))) exact = Number(m[1]) * Number(m[2]);
  else if ((m = L.match(/^([\d.]+) ÷ ([\d.]+) × 100$/))) exact = (Number(m[1]) / Number(m[2])) * 100;
  else if (/^[\d.]+( × [\d.]+)?( \+ [\d.]+( × [\d.]+)?)+$/.test(L)) exact = L.split(' + ').reduce((sum, t) => sum + t.split(' × ').reduce((p, x) => p * Number(x), 1), 0);
  if (exact === undefined && !strict) return;
  expect(exact, `${where}: a relation the test knows ("${L}")`).toBeDefined();
  // Within the precision shown, plus a little for an intermediate kept to one extra figure.
  expect(Math.abs(got.v - exact!) <= got.tol * 1.02 + 1e-12, `${where}: ${L} = ${got.v}, but it is ${exact}`).toBe(true);
}

/** A formula written in a Rich string, e.g. "C<sub>12</sub>H<sub>22</sub>O<sub>11</sub>" → "C12H22O11" (the last one). */
function formulaIn(rich: string): string | undefined {
  const s = rich.replace(/<sub>(\d+)<\/sub>/g, '$1').replace(/<[^>]+>/g, '');
  return s.match(/\b(?:[A-Z][a-z]?\d*){2,}\b/g)?.pop();
}

describe.each(SECTIONS.map((s) => [s.id, s] as const))('Section %s numbers', (_id, s) => {
  it('every worked example line follows from the one before', () => {
    for (const e of s.examples)
      for (const st of e.steps)
        st.lines.forEach((ln, i) => {
          const nextLine = st.lines[i + 1];
          if (nextLine && !nextLine.left) checkRelation(ln.right, nextLine.right, `${e.id} ${st.move}`);
        });
  });
  it('each example’s molar mass matches the engine for the formula in its question', () => {
    for (const e of s.examples) {
      const f = formulaIn(e.question);
      const M = e.steps.find((st) => st.lines[0]!.left === 'M');
      if (!f || !M) continue;
      const shown = nums(M.lines[M.lines.length - 1]!.right)[0]!;
      expect(shown.toFixed(2), `${e.id}: M(${f})`).toBe(molarMass(f).toFixed(2));
    }
  });
  it('real uses compute', () => checkUses(s.realUses, s.id));
  it('worked lines inside reads compute', () => {
    for (const r of s.reads)
      for (const b of r.blocks)
        if ('work' in b || 'eq' in b) {
          const lines = 'work' in b ? b.work.map(([l]) => l) : b.eq;
          for (const l of lines) {
            const [lhs, rhs] = plain(l).split(' = ').slice(-2);
            if (lhs && rhs && /\d/.test(lhs) && /\d/.test(rhs) && !/[A-Za-z]{3,}/.test(lhs.replace(/ g\/mol| g| mol/g, ''))) checkRelation(lhs.replace(/^.*?: /, ''), rhs, `${s.id} ${r.id}`, false);
          }
        }
  });
});

function checkUses(uses: Use[], where: string) {
  for (const u of uses) {
    const [lhs, rhs] = plain(u.eq).split(' = ');
    checkRelation(lhs!, rhs!, `${where} ${u.where}`);
  }
}

describe.each(CHAPTERS.filter((c) => c.uses).map((c) => [c.num, c] as const))('Chapter %s numbers', (_n, c) => {
  it('real uses compute', () => checkUses(c.uses!, `Chapter ${c.num}`));
});

describe('molar masses used in the content match the engine (CIAAW weights)', () => {
  it.each([
    ['H2O', '18.02'], ['CO2', '44.01'], ['NaCl', '58.44'], ['CH4', '16.04'],
    ['C12H22O11', '342.30'], ['C6H8O6', '176.12'], ['FeSO4', '151.90'], ['Ca(NO3)2', '164.09'],
  ])('%s = %s g/mol', (f, want) => expect(molarMass(f).toFixed(2)).toBe(want));
});

describe('notation and the map', () => {
  const all = JSON.stringify([SECTIONS, CHAPTERS]);
  it('no Unicode subscripts or superscripts in content (use <sub>/<sup>)', () => {
    expect(all).not.toMatch(/[₀-₉⁰¹²³⁴-⁹]/);
  });
  it('Rich tags are balanced in every string', () => {
    const strings = all.match(/"(?:[^"\\]|\\.)*"/g) ?? [];
    for (const s of strings) for (const t of ['sub', 'sup', 'b', 'i', 'g', 'm']) expect((s.match(new RegExp(`<${t}>`, 'g')) ?? []).length, s).toBe((s.match(new RegExp(`</${t}>`, 'g')) ?? []).length);
    expect(plainRich('H<sub>2</sub>O')).toBe('H2O');
  });
  it('the map has 26 chapters and every prerequisite comes earlier', () => {
    expect(CHAPTER_MAP).toHaveLength(26);
    const key = (s: string) => s.split('.').map(Number) as [number, number];
    const before = (a: string, b: string) => { const [x1, y1] = key(a); const [x2, y2] = key(b); return x1 < x2 || (x1 === x2 && y1 < y2); };
    for (const c of CHAPTER_MAP) for (const s of c.sections) for (const n of s.needs) expect(before(n, s.id), `${s.id} needs ${n}`).toBe(true);
  });
});
