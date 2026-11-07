// Where an element sits in periods 1–4, and its ground-state electron configuration (with Cr and Cu handled).
const ORDER = ['1s', '2s', '2p', '3s', '3p', '4s', '3d', '4p'] as const;
const CAP: Record<string, number> = { s: 2, p: 6, d: 10 };

export function position(z: number): { period: number; group: number } | null {
  if (z === 1) return { period: 1, group: 1 };
  if (z === 2) return { period: 1, group: 18 };
  if (z <= 10) return { period: 2, group: z <= 4 ? z - 2 : z + 8 };
  if (z <= 18) return { period: 3, group: z <= 12 ? z - 10 : z };
  if (z <= 36) return { period: 4, group: z - 18 };
  return null;
}

/** "[Ar] 4s<sup>1</sup> 3d<sup>5</sup>" for chromium. Periods 1–4 only. */
export function configuration(z: number): string {
  const out: [string, number][] = [];
  let left = z;
  for (const o of ORDER) {
    if (left <= 0) break;
    const n = Math.min(CAP[o[1]!]!, left);
    out.push([o, n]);
    left -= n;
  }
  if (z === 24 || z === 29) {
    const s = out.find((x) => x[0] === '4s')!;
    const d = out.find((x) => x[0] === '3d')!;
    s[1] = 1;
    d[1] += 1;
  }
  const core: [string, number] | null = z > 18 ? ['[Ar]', 18] : z > 10 ? ['[Ne]', 10] : z > 2 ? ['[He]', 2] : null;
  let skip = core ? core[1] : 0;
  const shown: string[] = [];
  for (const [o, n] of out) {
    if (core && skip >= n) { skip -= n; continue; }
    shown.push(`${o}<sup>${n}</sup>`);
  }
  return (core ? `${core[0]} ` : '') + shown.join(' ');
}
