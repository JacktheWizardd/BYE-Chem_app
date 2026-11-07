// Tool · Molar mass: every atom added up, then grams to moles. Uses the engine's formula parser and CIAAW weights.
import { element, parseFormula } from 'bye-chem-engine/chem';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Rich } from '@/components/Rich';
import { Back, Head, Plain, Screen, Small, Title } from '@/components/ui';
import { formulaRich, readQuantity, sigFig } from '@/practice/quantity';
import { color, font, TAP } from '@/theme';

const EXAMPLES = ['H2O', 'CO2', 'C6H12O6', 'NaCl', 'Ca(NO3)2', 'CuSO4·5H2O'];

export default function MolarMass() {
  const [f, setF] = useState('Ca(NO3)2');
  const [grams, setGrams] = useState('10.0');
  const calc = useMemo(() => {
    try {
      const counts = parseFormula(f);
      const rows = Object.entries(counts).map(([sym, n]) => ({ sym, n, w: element(sym)!.weight, name: element(sym)!.name }));
      return { rows, total: rows.reduce((m, r) => m + r.n * r.w, 0), error: null as string | null };
    } catch (e) {
      return { rows: [], total: 0, error: (e as Error).message };
    }
  }, [f]);
  const g = readQuantity(grams);
  const sig = g ? Math.max(1, Math.min(g.sig, 6)) : 3;

  return (
    <Screen>
      <Back href="/?tab=tools" label="Tools" />
      <Title size={30}>Molar mass</Title>
      <Plain>Type a formula. Brackets and hydrates work.</Plain>
      <Text style={t.label}>FORMULA</Text>
      <TextInput value={f} onChangeText={setF} style={t.input} autoCapitalize="none" autoCorrect={false} accessibilityLabel="Formula" />
      <View style={t.chips}>
        {EXAMPLES.map((x) => (
          <Pressable key={x} onPress={() => setF(x)} style={t.chip} accessibilityRole="button" accessibilityLabel={`Use ${x}`}>
            <Rich style={t.chipText}>{formulaRich(x)}</Rich>
          </Pressable>
        ))}
      </View>

      {calc.error ? <Text style={t.err}>{calc.error}</Text> : (
        <>
          <Rich style={t.pretty}>{formulaRich(f.replace(/\s+/g, ''))}</Rich>
          <View style={t.tr}>
            <Text style={[t.th, { flex: 1.2 }]}>ATOM</Text><Text style={[t.th, t.r]}>COUNT</Text><Text style={[t.th, t.r]}>× MASS</Text><Text style={[t.th, t.r, { flex: 1.2 }]}>= G/MOL</Text>
          </View>
          {calc.rows.map((r) => (
            <View key={r.sym} style={t.tr}>
              <Text style={[t.td, { flex: 1.2 }]}>{r.sym} <Text style={t.name}>{r.name}</Text></Text>
              <Text style={[t.td, t.r]}>{r.n}</Text>
              <Text style={[t.td, t.r]}>{r.w}</Text>
              <Text style={[t.td, t.r, { flex: 1.2 }]}>{(r.n * r.w).toFixed(3)}</Text>
            </View>
          ))}
          <View style={[t.tr, { borderBottomWidth: 0 }]}>
            <Text style={[t.td, { flex: 1 }, t.total]}>Molar mass</Text>
            <Text style={[t.td, t.r, t.total]}>{`${calc.total.toFixed(2)} g/mol`}</Text>
          </View>

          <Head eyebrow="Grams to moles" />
          <View style={t.conv}>
            <TextInput value={grams} onChangeText={setGrams} style={[t.input, { flex: 1, minWidth: 0, marginTop: 0 }]} keyboardType="decimal-pad" accessibilityLabel="Grams" />
            <Text style={t.arrow}>g →</Text>
            <Text style={t.out} accessibilityLiveRegion="polite">{g && calc.total ? `${sigFig(g.v / calc.total, sig)} mol` : '—'}</Text>
          </View>
          <Small style={{ marginTop: 10 }}>{`moles = grams ÷ ${calc.total.toFixed(2)} g/mol, kept to ${sig} significant figures like the grams you typed. Taught in §4.1 The Mole and Molar Mass.`}</Small>
        </>
      )}
      <Small style={{ marginTop: 16 }}>Standard atomic weights (CIAAW), as used in most textbooks. Your class table may differ in the last digit.</Small>
    </Screen>
  );
}

const t = StyleSheet.create({
  label: { fontFamily: font.sans, fontSize: 12, letterSpacing: 1.6, color: color.ink2, marginTop: 16 },
  input: { marginTop: 8, minHeight: 50, borderWidth: 1.5, borderColor: color.ink, borderRadius: 14, backgroundColor: color.card, paddingHorizontal: 14, fontFamily: font.chem, fontSize: 22, color: color.ink },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 10 },
  chip: { minHeight: TAP, paddingHorizontal: 11, borderRadius: 22, borderWidth: 1, borderColor: color.line, backgroundColor: color.band, justifyContent: 'center' },
  chipText: { fontFamily: font.chem, fontSize: 15, color: color.ink },
  err: { marginTop: 12, fontFamily: font.sans, fontSize: 14, lineHeight: 20, color: color.shu },
  pretty: { fontFamily: font.chem, fontSize: 30, lineHeight: 40, color: color.ink, marginTop: 14 },
  tr: { flexDirection: 'row', borderBottomWidth: 1, borderColor: color.line, paddingVertical: 8, alignItems: 'baseline' },
  th: { flex: 1, fontFamily: font.sans, fontSize: 11, letterSpacing: 1.2, color: color.ink2 },
  td: { flex: 1, fontFamily: font.chem, fontSize: 17, color: color.ink },
  name: { fontFamily: font.sans, fontSize: 12, color: color.ink2 },
  r: { textAlign: 'right' },
  total: { fontSize: 20 },
  conv: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 8 },
  arrow: { fontFamily: font.chem, fontSize: 17, color: color.ink2 },
  out: { flex: 1, minWidth: 0, minHeight: 50, borderWidth: 1, borderStyle: 'dashed', borderColor: color.line, borderRadius: 14, paddingHorizontal: 12, textAlignVertical: 'center', lineHeight: 48, fontFamily: font.chem, fontSize: 20, color: color.ink, backgroundColor: color.band },
});
