// Content numbers: every worked line, real use and molar mass is recomputed from the engine's atomic
// weights (CIAAW), and the map stays consistent. A wrong number fails the build.
import { molarMass } from 'bye-chem-engine/chem';
import { describe, expect, it } from 'vitest';
import { CHAPTER_MAP } from '@/content/map.generated';
import type { ChapterContent, SectionContent, Use } from '@/content/types';

const SECTIONS = Object.values(import.meta.glob<Record<string, unknown>>('../src/content/sections/*/*.ts', { eager: true })).flatMap((m) => Object.values(m)) as SectionContent[];
const CHAPTERS = Object.values(import.meta.glob<Record<string, unknown>>('../src/content/chapters/ch*.ts', { eager: true })).flatMap((m) => Object.values(m)) as ChapterContent[];
const plainRich = (src: string) => src.replace(/<\/?(sub|sup|b|i|g|m)>/g, '');

/** "6.022 × 10<sup>23</sup>" → 6.022e23; "0.500 mol" → 0.5. Text is Rich; NBSPs are spaces. */
function nums(rich: string): number[] {
  const s = rich.replace(/ /g, ' ').replace(/<sup>(−|-)?(\d+)<\/sup>/g, (_, m, d) => `e${m ? '-' : ''}${d}`).replace(/<[^>]+>/g, '');
  return [...s.matchAll(/(\d+(?:\.\d*)?)(?:\s*×\s*10e(-?\d+))?/g)].map(([, a, e]) => Number(a) * (e ? 10 ** Number(e) : 1));
}
/** Rich → plain text: NBSPs and digit-group spaces (U+202F, or U+2009 in long numbers) handled, <sup>n</sup> → ^n, tags dropped. */
const plain = (rich: string) =>
  rich
    .replace(/(\d)[\u202f\u2009](?=\d)/g, '$1')
    .replace(/[\u00a0\u202f\u2009]/g, ' ')
    .replace(/<sup>(−|-)?(\d+)<\/sup>/g, '^$1$2')
    .replace(/<[^>]+>/g, '');

/** The first number in a result, with how precisely it is written: half a unit in its last digit. */
function shown(rich: string): { v: number; tol: number } {
  const s = plain(rich).trim();
  const bare = s.match(/^10\^([−-]?\d+)/); // "10^7": an exact power
  if (bare) {
    const v = 10 ** Number(bare[1]!.replace('−', '-'));
    return { v, tol: v * 1e-9 };
  }
  const m = s.match(/^([−-])?(\d+)(?:\.(\d*))?(?:\s*×\s*10\^([−-]?\d+))?/)!;
  const exp = m[4] ? Number(m[4].replace('−', '-')) : 0;
  const decimals = m[3] !== undefined ? m[3].length : 0;
  const v = (m[1] ? -1 : 1) * Number(`${m[2]}.${m[3] ?? ''}`) * 10 ** exp;
  return { v, tol: 0.5 * 10 ** (exp - decimals) };
}

/** Units that may sit beside a number; anything else with letters is not arithmetic. */
const UNITS = /(?<![A-Za-z])(?:g|mg|kg|mol|mmol|m|cm|mm|µm|nm|pm|km|s|L|mL|J|kJ|K|atm|molecules|atoms)(?:\/(?:mol|s|mL|L|g|cm\^3))?(?![A-Za-z])/g;

/** Evaluates "9.01 g ÷ 18.02 g/mol", "1.7 × 10^21 × 3.0 × 10^−23", "12 × 12.011 + 22 × 1.008", "21 + (−23)"; undefined if it isn't arithmetic. */
function evaluate(text: string): number | undefined {
  const s = text.replace(UNITS, ' ').replace(/%/g, ' ').replace(/−/g, '-');
  if (/[A-Za-z]/.test(s)) return undefined;
  // "a × 10^n" and a bare "10^n" are single numbers, so ÷ never splits them.
  const flat = s.replace(/(?<![\^\d.])(\d+(?:\.\d*)?)\s*×\s*10\^(-?\d+)/g, (_, a, n) => ` ${a}e${n} `).replace(/10\^(-?\d+)/g, (_, n) => ` 1e${n} `);
  if (flat.replace(/[\d.e×÷+\-()\s]/g, '') !== '') return undefined;
  const tokens = flat.match(/\d+(?:\.\d*)?(?:e-?\d+)?|[×÷+\-()]/g);
  if (!tokens) return undefined;
  let i = 0;
  const atom = (): number => {
    const t = tokens[i++];
    if (t === '(') {
      const v = sum();
      i++;
      return v;
    }
    if (t === '-') return -atom();
    return Number(t);
  };
  const product = (): number => {
    let v = atom();
    while (tokens[i] === '×' || tokens[i] === '÷') v = tokens[i++] === '×' ? v * atom() : v / atom();
    return v;
  };
  const sum = (): number => {
    let v = product();
    while (tokens[i] === '+' || tokens[i] === '-') v = tokens[i++] === '+' ? v + product() : v - product();
    return v;
  };
  const v = sum();
  return i === tokens.length && Number.isFinite(v) ? v : undefined;
}

/** Checks that `left` (arithmetic) equals `result` to the precision shown. Strict: it must be arithmetic. */
function checkRelation(left: string, result: string, where: string, strict = true) {
  const L = plain(left);
  const got = shown(result);
  const exact = evaluate(L);
  if (exact === undefined && !strict) return;
  expect(exact, `${where}: arithmetic the test can follow ("${L}")`).toBeDefined();
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

/** A real use's `eq` with "=" is arithmetic and must compute; without "=" it is a statement ("seawater → water + salt"). */
function checkUses(uses: Use[], where: string) {
  for (const u of uses) {
    const parts = plain(u.eq).split(' = ');
    if (parts.length < 2) continue;
    checkRelation(parts.at(-2)!, parts.at(-1)!, `${where} ${u.where}`);
  }
}

describe('the arithmetic checker', () => {
  it.each([
    ['9.01 g ÷ 18.02 g/mol', '0.500 mol'],
    ['0.01461 mol × 6.022 × 10<sup>23</sup>', '8.80 × 10<sup>21</sup> molecules'],
    ['1.5 × 10<sup>11</sup> m ÷ 3.0 × 10<sup>8</sup> m/s', '5.0 × 10<sup>2</sup> s'],
    ['10<sup>3</sup> × 10<sup>4</sup>', '10<sup>7</sup>'],
    ['−23 + 23', '0'],
    ['21 + (−23)', '−2'],
    ['1\u202f700\u202f000', '1.7 × 10<sup>6</sup>'],
    ['0.000\u202f52', '5.2 × 10<sup>−4</sup>'],
  ])('%s = %s', (l, r) => checkRelation(l, r, 'checker'));
  it('rejects wrong arithmetic and non-arithmetic', () => {
    expect(() => checkRelation('10<sup>3</sup> × 10<sup>4</sup>', '10<sup>12</sup>', 'checker')).toThrow();
    expect(() => checkRelation('0.000\u202f52', '5.2 × 10<sup>4</sup>', 'checker')).toThrow();
    expect(evaluate('2 bonded atoms + 2 lone pairs')).toBeUndefined();
  });
});

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
