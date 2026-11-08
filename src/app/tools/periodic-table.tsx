import { router } from 'expo-router';
// Tool · Periodic table, periods 1–4: every tile carries its symbol, and the card names the family in words.
import { ELEMENTS, type Element } from 'bye-chem-engine/chem';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Rich } from '@/components/Rich';
import { BackButton, Page, Plain, Small, Title } from '@/components/ui';
import { configuration, position } from '@/practice/table';
import { color, font } from '@/theme';

const CELL = 30;
const GAP = 3;
const FAMILY: Record<Element['family'], string> = {
  hydrogen: 'hydrogen (its own family)', nonmetal: 'nonmetal', halogen: 'halogen', noble: 'noble gas', alkali: 'alkali metal',
  'alkaline-earth': 'alkaline earth metal', metalloid: 'metalloid', transition: 'transition metal', 'post-transition': 'post-transition metal', actinide: 'actinide',
};
const TINT: Partial<Record<Element['family'], string>> = { nonmetal: '#eaf0f6', halogen: '#eaf0f6', hydrogen: '#eaf0f6', noble: '#eee9f3', metalloid: '#f1eee6' };
const TILES = Object.values(ELEMENTS).filter((e) => e.z <= 36).map((e) => ({ e, pos: position(e.z)! }));

export default function PeriodicTable() {
  const [pick, setPick] = useState<Element>(ELEMENTS.C!);
  return (
    <Page>
      <BackButton label="Tools" onPress={() => router.push('/?tab=tools')} />
      <Title size={30}>Periodic table</Title>
      <Plain>Tap an element. Swipe sideways across the table; periods 1–4 shown.</Plain>
      <ScrollView horizontal style={{ marginTop: 14 }} contentContainerStyle={{ width: 18 * (CELL + GAP), height: 4 * (CELL + 4 + GAP) }} accessibilityLabel="Periodic table, periods 1 to 4">
        {TILES.map(({ e, pos }) => (
          <Pressable
            key={e.symbol} onPress={() => setPick(e)} accessibilityRole="button" accessibilityLabel={`${e.name}, ${e.symbol}`} accessibilityState={{ selected: pick.symbol === e.symbol }}
            style={[pt.el, { left: (pos.group - 1) * (CELL + GAP), top: (pos.period - 1) * (CELL + 4 + GAP), backgroundColor: TINT[e.family] ?? color.card }, pick.symbol === e.symbol && pt.pick]}
          >
            <Text style={pt.sym}>{e.symbol}</Text>
          </Pressable>
        ))}
      </ScrollView>
      <View style={pt.key}>
        {[['metal', color.card], ['nonmetal', '#eaf0f6'], ['metalloid', '#f1eee6'], ['noble gas', '#eee9f3']].map(([k, c]) => (
          <View key={k} style={pt.keyItem}><View style={[pt.swatch, { backgroundColor: c }]} /><Text style={pt.keyText}>{k}</Text></View>
        ))}
      </View>

      <View style={pt.card} accessibilityLiveRegion="polite">
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 14 }}>
          <Text style={pt.big}>{pick.symbol}</Text>
          <Text style={pt.name}>{pick.name[0]!.toUpperCase() + pick.name.slice(1)}</Text>
        </View>
        <Info k="Atomic number" v={String(pick.z)} />
        <Info k="Atomic mass" v={`${pick.weight} u`} />
        <Info k="Family" v={FAMILY[pick.family]} />
        <Info k="Electrons" v={configuration(pick.z)} />
      </View>
      <Small style={{ marginTop: 12 }}>Electron configurations follow the filling order, with chromium and copper’s exceptions. Taught in Chapters 2 and 11.</Small>
    </Page>
  );
}

function Info({ k, v }: { k: string; v: string }) {
  return (
    <View style={pt.info}>
      <Text style={pt.k}>{k}</Text>
      <Rich style={pt.v}>{v}</Rich>
    </View>
  );
}

const pt = StyleSheet.create({
  el: { position: 'absolute', width: CELL, height: CELL + 4, borderRadius: 5, borderWidth: 1, borderColor: color.line, alignItems: 'center', justifyContent: 'center' },
  pick: { borderColor: color.coral, borderWidth: 1.5, backgroundColor: color.coralSoft },
  sym: { fontFamily: font.chem, fontSize: 13, color: color.ink },
  key: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 10 },
  keyItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  swatch: { width: 12, height: 12, borderRadius: 3, borderWidth: 1, borderColor: color.line },
  keyText: { fontFamily: font.sans, fontSize: 12, color: color.ink2 },
  card: { marginTop: 14, borderTopWidth: 1, borderColor: color.line, paddingTop: 12 },
  big: { fontFamily: font.chem, fontSize: 44, lineHeight: 50, color: color.ink },
  name: { fontFamily: font.serif, fontSize: 22, color: color.ink },
  info: { flexDirection: 'row', gap: 14, marginTop: 8, alignItems: 'baseline' },
  k: { width: 110, fontFamily: font.sans, fontSize: 14, color: color.ink2 },
  v: { flex: 1, fontFamily: font.chem, fontSize: 16, color: color.ink },
});
