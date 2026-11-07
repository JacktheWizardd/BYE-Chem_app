// Lab · Molecule viewer: BYE Chem Engine's molecule3d, as is (the engine is on hold; no changes to it).
// SF6 and PCl5 are left out until the engine's angle-mark fix is approved.
import { namedMolecule } from 'bye-chem-engine/chem';
import { ChemFigure } from 'bye-chem-engine/native3d';
import type { Molecule3dInput } from 'bye-chem-engine/spec';
import { useState } from 'react';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { Rich } from '@/components/Rich';
import { Back, Head, Plain, Screen, Small, Title } from '@/components/ui';
import { formulaRich } from '@/practice/quantity';
import { color, font, TAP } from '@/theme';

const MOLECULES = ['H2O', 'CO2', 'CH4', 'NH3', 'BF3', 'C2H4', 'H2CO', 'SO2', 'HCl'] as const;
const SIZES = [
  { key: 'model', label: 'Model' },
  { key: 'cut', label: 'Cut open' },
  { key: 'real', label: 'Real size' },
] as const;
type Size = (typeof SIZES)[number]['key'];

export default function MoleculeLab() {
  const [formula, setFormula] = useState<(typeof MOLECULES)[number]>('H2O');
  const [size, setSize] = useState<Size>('model');
  const [bond, setBond] = useState(true);
  const [angle, setAngle] = useState(true);
  const info = namedMolecule(formula);
  const showDims = size !== 'real'; // the bond/angle switches do nothing in real size
  const figure: Molecule3dInput = {
    kind: 'molecule3d',
    describe: `${info?.name ?? formula}, ${info?.shape ?? ''}, ${SIZES.find((s) => s.key === size)!.label.toLowerCase()} view`,
    molecule: formula,
    size,
    dimensions: { ...(showDims && bond ? {} : { bond: false }), ...(showDims && angle ? {} : { angle: false }) },
  };
  return (
    <Screen>
      <Back href="/?tab=lab" label="Lab" />
      <Title size={30}>Molecule viewer</Title>
      <Plain>Drag to turn it. Every length and angle is measured, from NIST’s tables.</Plain>
      <Text style={m.try}>Try this: find the molecule whose angle is exactly 180°.</Text>

      <View style={m.chips} accessibilityRole="radiogroup">
        {MOLECULES.map((f) => (
          <Pressable key={f} onPress={() => setFormula(f)} style={[m.chip, f === formula && m.chipOn]} accessibilityRole="radio" accessibilityState={{ checked: f === formula }}>
            <Rich style={[m.chipText, f === formula && { color: color.onInk }]}>{formulaRich(f)}</Rich>
          </Pressable>
        ))}
      </View>

      <View style={m.figure}><ChemFigure figure={figure} /></View>
      {info ? <Small style={{ marginTop: 8 }}>{`${info.name[0]!.toUpperCase()}${info.name.slice(1)}: ${info.shape}. Source: ${info.source}.`}</Small> : null}

      <Head eyebrow="View" />
      <View style={m.seg} accessibilityRole="radiogroup">
        {SIZES.map((s) => (
          <Pressable key={s.key} onPress={() => setSize(s.key)} style={[m.segBtn, s.key === size && m.segOn]} accessibilityRole="radio" accessibilityState={{ checked: s.key === size }}>
            <Text style={[m.segText, s.key === size && { color: color.onInk }]}>{s.label}</Text>
          </Pressable>
        ))}
      </View>
      {showDims ? (
        <>
          <Toggle label="Bond length" value={bond} onChange={setBond} />
          <Toggle label="Bond angle" value={angle} onChange={setAngle} />
        </>
      ) : <Small style={{ marginTop: 10 }}>Real size shows how much room each atom takes up, so the measuring lines are off.</Small>}
    </Screen>
  );
}

function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange(v: boolean): void }) {
  return (
    <View style={m.toggle}>
      <Text style={m.toggleText}>{label}</Text>
      <Switch value={value} onValueChange={onChange} trackColor={{ true: color.ink, false: color.line }} accessibilityLabel={label} />
    </View>
  );
}

const m = StyleSheet.create({
  try: { fontFamily: font.sans, fontSize: 13.5, lineHeight: 20, color: color.shu, marginTop: 8 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 14 },
  chip: { minHeight: TAP, minWidth: TAP, paddingHorizontal: 12, borderRadius: 22, borderWidth: 1, borderColor: color.line, backgroundColor: color.band, alignItems: 'center', justifyContent: 'center' },
  chipOn: { backgroundColor: color.ink, borderColor: color.ink },
  chipText: { fontFamily: font.chem, fontSize: 16, color: color.ink },
  figure: { marginTop: 14 },
  seg: { flexDirection: 'row', gap: 6, marginTop: 8 },
  segBtn: { flex: 1, minHeight: TAP, borderRadius: 12, borderWidth: 1, borderColor: color.line, backgroundColor: color.band, alignItems: 'center', justifyContent: 'center' },
  segOn: { backgroundColor: color.ink, borderColor: color.ink },
  segText: { fontFamily: font.sans, fontSize: 14, color: color.ink },
  toggle: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', minHeight: TAP, borderBottomWidth: 1, borderColor: color.line },
  toggleText: { fontFamily: font.sans, fontSize: 15, color: color.ink },
});
