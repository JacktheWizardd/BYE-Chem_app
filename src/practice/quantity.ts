// Reading a typed answer: "1.5 × 10^-4", "1.5e-4", "2.000 mol", "44.01 g/mol".

export interface Quantity {
  /** The value. */
  v: number;
  /** Whatever follows the number, lower-cased and trimmed ("mol", "g/mol", ""). */
  unit: string;
  /** Significant figures in the number as typed. */
  sig: number;
  /** Written with a power of ten. */
  sci: boolean;
  /** The number before "× 10^n" (or the whole number). */
  mantissa: number;
}

const NUM = /^([-+]?\d*\.?\d+)\s*(?:(?:[×x*·]\s*10\s*\^?\s*([-+]?\d+))|(?:e([-+]?\d+)))?\s*(.*)$/i;

export function readQuantity(raw: string): Quantity | null {
  const s = raw.trim().replace(/[−–]/g, '-').replace(/,/g, '');
  const m = NUM.exec(s);
  if (!m) return null;
  const exp = m[2] ?? m[3];
  const mantissa = parseFloat(m[1]!);
  const v = mantissa * (exp !== undefined ? Math.pow(10, parseInt(exp, 10)) : 1);
  const digits = m[1]!.replace(/^[-+]/, '');
  const sig = digits.includes('.')
    ? digits.replace('.', '').replace(/^0+/, '').length
    : digits.replace(/^0+/, '').replace(/0+$/, '').length || 1;
  return { v, unit: m[4]!.trim().toLowerCase(), sig, sci: exp !== undefined, mantissa };
}

/** Within a relative tolerance. */
export const near = (a: number, b: number, rel = 0.002) => Math.abs(a - b) <= Math.abs(b) * rel;

/** x to n significant figures, as text ("0.500", "2.000", "164.1"). */
export function sigFig(x: number, n: number): string {
  if (x === 0) return (0).toFixed(Math.max(0, n - 1));
  const d = n - 1 - Math.floor(Math.log10(Math.abs(x)));
  return d >= 0 ? x.toFixed(d) : String(Math.round(x / 10 ** -d) * 10 ** -d);
}

/** "1.5 × 10<sup>−4</sup>" */
export function sciRich(x: number, n = 2): string {
  const e = Math.floor(Math.log10(Math.abs(x)));
  const m = x / 10 ** e;
  return `${sigFig(m, n)} × 10<sup>${e < 0 ? '−' : ''}${Math.abs(e)}</sup>`;
}

/** "Ca(NO3)2" → "Ca(NO<sub>3</sub>)<sub>2</sub>": real subscripts, never Unicode ones. */
export function formulaRich(f: string): string {
  return f.replace(/([A-Za-z)\]])(\d+)/g, '$1<sub>$2</sub>');
}
