// Checks a typed answer against a QuestionSpec. A wrong answer names the likely slip; it never just says "wrong".
import { molarMass, parseFormula, element } from 'bye-chem-engine/chem';
import type { QuestionSpec, Rich } from '@/content/types';
import { formulaRich, near, readQuantity, sciRich, sigFig } from './quantity';

export type Verdict = 'ok' | 'part' | 'no';
export interface Result { verdict: Verdict; message: Rich }

const ok = (message: Rich): Result => ({ verdict: 'ok', message });
const part = (message: Rich): Result => ({ verdict: 'part', message });
const no = (message: Rich): Result => ({ verdict: 'no', message });
const AVOGADRO = 6.022e23;
const norm = (s: string) => s.trim().replace(/[−–]/g, '-').replace(/[×x·*]/g, '*').replace(/\s+/g, '').toLowerCase();

export function check(spec: QuestionSpec, raw: string): Result {
  if (!raw.trim()) return no('Type your answer first.');
  switch (spec.type) {
    case 'moles': {
      const { grams: g, molarMass: M, sig } = spec;
      const want = g / M;
      const q = readQuantity(raw);
      if (!q) return no('Type a number, then its unit (mol).');
      if (near(q.v, g * M)) return no('You multiplied by the molar mass. Grams <b>÷</b> grams per mole leaves moles.');
      if (near(q.v, M / g)) return no('Upside down: it is grams ÷ molar mass, not molar mass ÷ grams.');
      if (near(q.v, want * AVOGADRO, 0.01)) return no('That is the number of molecules. The question asks for moles.');
      if (!near(q.v, want, 0.003)) return no(`Not quite. Divide ${sigFig(g, sig)} g by ${M} g/mol.`);
      if (!/^mol/.test(q.unit)) return part(`Right number. Add the unit: ${sigFig(want, sig)} mol.`);
      if (q.sig < sig) return part(`Right. Keep ${sig} significant figures, as in the data: ${sigFig(want, sig)} mol.`);
      return ok(`Right: ${sigFig(g, sig)} g ÷ ${M} g/mol = ${sigFig(want, sig)} mol.`);
    }
    case 'grams': {
      const { moles: n, molarMass: M, sig } = spec;
      const want = n * M;
      const q = readQuantity(raw);
      if (!q) return no('Type a number, then its unit (g).');
      if (near(q.v, n / M)) return no('You divided. To go from moles to grams, <b>multiply</b> by the molar mass.');
      if (near(q.v, M / n)) return no('Upside down. Grams = moles × grams per mole.');
      if (!near(q.v, want, 0.003)) return no(`Not quite. Multiply ${sigFig(n, sig)} mol by ${M} g/mol.`);
      if (!/^g\b|^g$|^gram/.test(q.unit)) return part(`Right number. Add the unit: ${sigFig(want, sig)} g.`);
      if (q.sig < sig) return part(`Right. Keep ${sig} significant figures: ${sigFig(want, sig)} g.`);
      return ok(`Right: ${sigFig(n, sig)} mol × ${M} g/mol = ${sigFig(want, sig)} g.`);
    }
    case 'molarMass': {
      const counts = parseFormula(spec.formula);
      const want = molarMass(spec.formula);
      const onceEach = Object.keys(counts).reduce((m, s) => m + element(s)!.weight, 0);
      const q = readQuantity(raw);
      const f = formulaRich(spec.formula);
      if (!q) return no('Type a number, then its unit (g/mol).');
      if (Object.values(counts).some((n) => n > 1) && near(q.v, onceEach, 0.001))
        return no(`You counted each element once. In ${f} the small numbers say how many of each atom.`);
      if (!near(q.v, want, 0.0006)) {
        const sum = Object.entries(counts).map(([s, n]) => `${n > 1 ? `${n} × ` : ''}${element(s)!.weight}`).join(' + ');
        return no(`Add every atom: ${sum}.`);
      }
      if (!/^g\s*\/\s*mol|^g\s*mol/.test(q.unit)) return part(`Right number. Molar mass is grams per mole: ${want.toFixed(2)} g/mol.`);
      return ok(`Right: ${f} is ${want.toFixed(2)} g/mol.`);
    }
    case 'sci': {
      const q = readQuantity(raw);
      const want = sciRich(spec.value);
      if (!q) return no('Write a number times a power of ten, like 2.3 × 10^-5.');
      const right = near(q.v, spec.value);
      if (right && q.sci && Math.abs(q.mantissa) >= 1 && Math.abs(q.mantissa) < 10) return ok(`Right: ${want}.`);
      if (right && q.sci) return part(`Right value. In scientific notation one digit comes before the point: ${want}.`);
      if (right) return part(`Same value, but write it with a power of ten: ${want}.`);
      if (near(q.v, 1 / spec.value, 0.01)) return no('Check the sign of the power: numbers smaller than 1 have a negative power.');
      return no('Count how many places the point moves.');
    }
    case 'count': {
      const n = Number(raw.trim());
      if (n === spec.answer) return ok(`Right: ${spec.answer}.`);
      const slip = spec.slips?.find(([v]) => v === n);
      return no(slip ? slip[1] : spec.hint);
    }
    case 'number': {
      const q = readQuantity(raw);
      if (!q) return no(spec.hint);
      if (near(q.v, spec.target, 0.003)) {
        if (spec.unit && q.unit && !q.unit.startsWith(spec.unit.toLowerCase())) return part(`Right number, but the unit is ${spec.unit}. ${spec.explain}`);
        return ok(`Right. ${spec.explain}`);
      }
      const slip = spec.slips?.find(([v]) => near(q.v, v, 0.01));
      return no(slip ? slip[1] : spec.hint);
    }
    case 'expr': {
      const s = norm(raw).replace(/^[a-z]=/, '');
      if (spec.accept.map(norm).includes(s)) return ok(`Right. ${spec.explain}`);
      const slip = spec.slips?.find(([v]) => norm(v) === s);
      return no(slip ? slip[1] : spec.hint);
    }
  }
}
