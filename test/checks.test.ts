import { describe, expect, it } from 'vitest';
import { check } from '@/practice/checks';
import { readQuantity, sigFig, formulaRich, sciRich } from '@/practice/quantity';

const v = (spec: Parameters<typeof check>[0], raw: string) => check(spec, raw);

describe('reading quantities', () => {
  it('reads numbers, powers of ten, units and significant figures', () => {
    expect(readQuantity('1.5 x 10^-4')).toMatchObject({ sci: true, sig: 2 });
    expect(readQuantity('1.5 x 10^-4')?.v).toBeCloseTo(1.5e-4, 12);
    expect(readQuantity('1.5e-4')?.v).toBeCloseTo(1.5e-4);
    expect(readQuantity('2.000 mol')).toMatchObject({ v: 2, unit: 'mol', sig: 4 });
    expect(readQuantity('0.500')?.sig).toBe(3);
    expect(readQuantity('44.01 g/mol')).toMatchObject({ v: 44.01, unit: 'g/mol' });
    expect(readQuantity('1.5 × 10^−4')?.v).toBeCloseTo(1.5e-4);
    expect(readQuantity('abc')).toBeNull();
  });
  it('formats', () => {
    expect(sigFig(0.5, 3)).toBe('0.500');
    expect(sigFig(2, 4)).toBe('2.000');
    expect(sigFig(0.068446, 3)).toBe('0.0684');
    expect(formulaRich('Ca(NO3)2')).toBe('Ca(NO<sub>3</sub>)<sub>2</sub>');
    expect(sciRich(1.5e-4)).toBe('1.5 × 10<sup>−4</sup>');
  });
});

describe('moles from grams names the slip', () => {
  const spec = { type: 'moles', grams: 36.04, molarMass: 18.02, sig: 4 } as const;
  it.each([
    ['2.000 mol', 'ok', 'Right'],
    ['2 mol', 'part', '4 significant figures'],
    ['2.000', 'part', 'Add the unit'],
    ['649.4', 'no', 'multiplied'],
    ['0.5', 'no', 'Upside down'],
    ['1.204e24', 'no', 'molecules'],
    ['3 mol', 'no', 'Not quite'],
    ['', 'no', 'Type your answer'],
  ])('%s → %s', (raw, verdict, text) => {
    const r = v(spec, raw);
    expect(r.verdict).toBe(verdict);
    expect(r.message).toContain(text);
  });
});

describe('grams from moles', () => {
  const spec = { type: 'grams', moles: 0.25, molarMass: 16.04, sig: 3 } as const;
  it('accepts 4.01 g and names dividing', () => {
    expect(v(spec, '4.01 g').verdict).toBe('ok');
    expect(v(spec, '0.0156').message).toContain('divided');
    expect(v(spec, '4.01').verdict).toBe('part');
  });
});

describe('molar mass', () => {
  it('CO2: right, counted-once slip, missing unit', () => {
    const spec = { type: 'molarMass', formula: 'CO2' } as const;
    expect(v(spec, '44.01 g/mol').verdict).toBe('ok');
    expect(v(spec, '44.0 g/mol').verdict).toBe('ok');
    expect(v(spec, '28.01').message).toContain('counted each element once');
    expect(v(spec, '44.01').verdict).toBe('part');
    expect(v(spec, '40.02 g/mol').verdict).toBe('no');
  });
});

describe('scientific notation', () => {
  const spec = { type: 'sci', value: 1.5e-4 } as const;
  it.each([
    ['1.5 x 10^-4', 'ok'], ['1.5e-4', 'ok'], ['15 × 10^-5', 'part'], ['0.00015', 'part'], ['1.5e4', 'no'], ['2', 'no'],
  ])('%s → %s', (raw, verdict) => expect(v(spec, raw).verdict).toBe(verdict));
});

describe('expressions and counts', () => {
  it('rearranging d = m ÷ V', () => {
    const spec = { type: 'expr', accept: ['d*v', 'dv'], slips: [['d/v', 'Don’t divide.']], hint: 'h', explain: 'e' } as const;
    expect(v(spec as never, 'm = d × V').verdict).toBe('ok');
    expect(v(spec as never, 'dV').verdict).toBe('ok');
    expect(v(spec as never, 'd/V').message).toContain('Don’t divide');
  });
  it('counting atoms', () => {
    const spec = { type: 'count', answer: 6, slips: [[3, 'both groups']], hint: 'count' } as const;
    expect(v(spec as never, '6').verdict).toBe('ok');
    expect(v(spec as never, '3').message).toContain('both groups');
  });
});

describe('feedback keeps the given numbers as written', () => {
  it('22.0 g stays 22.0 g; 0.250 mol stays 0.250 mol', () => {
    expect(check({ type: 'moles', grams: 22.0, molarMass: 44.01, sig: 3 }, '0.500 mol').message).toContain('22.0 g ÷ 44.01');
    expect(check({ type: 'grams', moles: 0.25, molarMass: 16.04, sig: 3 }, '4.01 g').message).toContain('0.250 mol × 16.04');
  });
});
