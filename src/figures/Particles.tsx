// Flat particle pictures in the liked style (docs/design-guide.md, docs/learn-template.md "Pictures"):
// flat circles, no shading or grid; H a white ring with a grey edge, O terracotta, C near-black,
// N blue; each molecule's atoms touching; its formula under it with real subscripts.
import { Fragment } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import type { Particle, ParticleScene } from '@/content/types';
import { Rich } from '@/components/Rich';
import { formulaRich } from '@/practice/quantity';
import { color, font } from '@/theme';

type Atom = { el: string; x: number; y: number };

const FILL: Record<string, string> = { H: color.elH, O: color.elO, C: color.elC, N: color.elN, Cl: color.elCl, Na: color.elNa, S: '#d8b23a', F: '#7fae5a', He: '#d9cfe8', Ne: '#d9cfe8', Ar: '#d9cfe8' };
const radius = (el: string) => (el === 'H' ? 6.5 : el === 'Cl' || el === 'Na' || el === 'S' ? 11 : 10);
const touch = (a: string, b: string) => radius(a) + radius(b) - 1.5;

/** Atom positions for the molecules the textbook draws; anything else becomes a touching row. */
export function layout(formula: string): Atom[] {
  const at = (el: string, x: number, y: number): Atom => ({ el, x, y });
  const ring = (center: string, outer: string, n: number, start: number, spread: number) => {
    const d = touch(center, outer);
    return [at(center, 0, 0), ...Array.from({ length: n }, (_, i) => {
      const a = ((start + (i * spread) / Math.max(1, n - 1)) * Math.PI) / 180;
      return at(outer, d * Math.cos(a), d * Math.sin(a));
    })];
  };
  switch (formula) {
    case 'H2O': return ring('O', 'H', 2, -142, 104).map((a) => (a.el === 'O' ? { ...a } : a));
    case 'SO2': return ring('S', 'O', 2, -150, 120);
    case 'CO2': return [at('O', -touch('C', 'O'), 0), at('C', 0, 0), at('O', touch('C', 'O'), 0)];
    case 'CH4': return ring('C', 'H', 4, 0, 270);
    case 'NH3': return ring('N', 'H', 3, 30, 120);
    case 'NaCl': return [at('Na', 0, 0), at('Cl', touch('Na', 'Cl'), 0)];
  }
  const two = formula.match(/^([A-Z][a-z]?)2$/); // H2, O2, N2, Cl2
  if (two) return [at(two[1]!, 0, 0), at(two[1]!, touch(two[1]!, two[1]!), 0)];
  const pair = formula.match(/^([A-Z][a-z]?)([A-Z][a-z]?)$/); // HCl, CO
  if (pair) return [at(pair[1]!, 0, 0), at(pair[2]!, touch(pair[1]!, pair[2]!), 0)];
  // A single atom, or a fallback row of touching atoms.
  const atoms = [...formula.matchAll(/([A-Z][a-z]?)(\d*)/g)].flatMap(([, el, n]) => Array.from({ length: Number(n || 1) }, () => el!));
  let x = 0;
  return atoms.map((el, i) => {
    if (i > 0) x += touch(atoms[i - 1]!, el);
    return at(el, x, 0);
  });
}

function Molecule({ p }: { p: Particle }) {
  const atoms = layout(p.formula);
  const pad = 2;
  const xs = atoms.map((a) => [a.x - radius(a.el), a.x + radius(a.el)]).flat();
  const ys = atoms.map((a) => [a.y - radius(a.el), a.y + radius(a.el)]).flat();
  const minX = Math.min(...xs) - pad, minY = Math.min(...ys) - pad;
  const w = Math.max(...xs) - minX + pad, h = Math.max(...ys) - minY + pad;
  const ringR = Math.max(w, h) / 2 + 4;
  // Draw H last so its ring sits on top of the atom it touches, as in the liked picture.
  const order = [...atoms].sort((a, b) => (a.el === 'H' ? 1 : 0) - (b.el === 'H' ? 1 : 0));
  return (
    <View style={[styles.mol, p.faded && { opacity: 0.35 }]}>
      <Svg width={p.ring ? ringR * 2 : w} height={p.ring ? ringR * 2 : h} viewBox={p.ring ? `${minX + w / 2 - ringR} ${minY + h / 2 - ringR} ${ringR * 2} ${ringR * 2}` : `${minX} ${minY} ${w} ${h}`}>
        {p.ring && <Circle cx={minX + w / 2} cy={minY + h / 2} r={ringR - 1.5} fill="none" stroke={color.shu} strokeWidth={1.5} />}
        {order.map((a, i) => (
          <Circle key={i} cx={a.x} cy={a.y} r={radius(a.el)} fill={FILL[a.el] ?? color.axis} stroke={a.el === 'H' ? color.axis : color.ground} strokeWidth={a.el === 'H' ? 1.2 : 1} />
        ))}
      </Svg>
    </View>
  );
}

export function Particles({ scene }: { scene: ParticleScene }) {
  return (
    <View style={styles.scene} accessible accessibilityRole="image" accessibilityLabel={scene.describe}>
      {scene.groups.map((g, gi) => (
        <Fragment key={gi}>
          {gi > 0 && <Text style={styles.op}>{scene.ops?.[gi - 1] ?? '+'}</Text>}
          <View style={styles.group}>
            <View style={styles.items}>
              {g.items.map((p, i) => (
                <View key={i} style={styles.item}>
                  <Molecule p={p} />
                  {!g.label && <Rich style={styles.cap}>{p.label ?? formulaRich(p.formula)}</Rich>}
                </View>
              ))}
            </View>
            {g.label ? <Rich style={styles.cap}>{g.label}</Rich> : null}
          </View>
        </Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  scene: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'center', columnGap: 10, rowGap: 12, paddingVertical: 8 },
  group: { alignItems: 'center', gap: 6 },
  items: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-end', gap: 6, maxWidth: 260 },
  item: { alignItems: 'center', gap: 6 },
  mol: { minHeight: 26, justifyContent: 'flex-end' },
  op: { fontFamily: font.chem, fontSize: 20, color: color.ink2, paddingBottom: 26 },
  cap: { fontFamily: font.chem, fontSize: 16, color: color.ink, textAlign: 'center' },
});
