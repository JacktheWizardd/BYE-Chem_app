// Home: Learn · Lab · Tools (docs/ui-guide.md §4). A textbook: no gap check, no review queue.
import { router, useLocalSearchParams, type Href } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CHAPTER_MAP, CLASS_ORDER, mapChapter, writtenCount } from '@/content';
import { Rich } from '@/components/Rich';
import { SoundsSwitch } from '@/components/SoundsSwitch';
import { Eyebrow, ListRow, Page, PressTint, RowSub, RowTitle, TabPanel, Tabs, Tags } from '@/components/ui';
import { color, font, space } from '@/theme';

const TABS = ['learn', 'lab', 'tools'] as const;
type Tab = (typeof TABS)[number];

export default function Home() {
  const params = useLocalSearchParams<{ tab?: string }>();
  const tab: Tab = TABS.includes(params.tab as Tab) ? (params.tab as Tab) : 'learn';
  return (
    <Page>
      <View style={h.brand}>
        <Text style={h.wordmark}>
          BYE<Text style={{ color: color.too }}>.</Text>
        </Text>
        <View style={h.rule} />
        <View>
          <Text style={h.sub}>Chem</Text>
          <Text style={[h.sub, { fontSize: 14 }]}>一歩ずつ</Text>
        </View>
      </View>
      <Tabs
        label="Home"
        items={[
          { key: 'learn', label: 'Learn' },
          { key: 'lab', label: 'Lab' },
          { key: 'tools', label: 'Tools' },
        ]}
        active={tab}
        onChange={(k) => router.setParams({ tab: k })}
        style={{ marginTop: space.section }}
      />
      <TabPanel tab={tab} order={TABS}>
        {tab === 'learn' ? <Learn /> : tab === 'lab' ? <Lab /> : <Tools />}
      </TabPanel>
      <SoundsSwitch />
    </Page>
  );
}

function Learn() {
  const [classOrder, setClassOrder] = useState(false);
  return (
    <View>
      <Text style={h.hero}>Chemistry, one step at a time.</Text>
      <Rich style={h.lead}>A textbook from zero to Chem 1A, 1B and AP. Every word is explained the first time it shows up.</Rich>
      <Eyebrow style={{ marginTop: 28 }}>Start here</Eyebrow>
      <Start icon="→" title="Learn from zero" sub="Never studied chemistry, or it’s been years? Start at Chapter 0 and read in order." onPress={() => router.push('/chapter/0')} />
      <Start
        icon="1A"
        title="I’m taking Chem 1A"
        sub={classOrder ? 'Showing your book’s order (Tro). Tap again for ours.' : 'The same chapters in your book’s order (Tro).'}
        onPress={() => setClassOrder(!classOrder)}
      />
      {classOrder ? <ClassOrder /> : (
        <>
          <View style={h.listHead}>
            <Eyebrow>Chapters</Eyebrow>
            <Text style={h.meta}>our order · Tro 6e refs</Text>
          </View>
          {CHAPTER_MAP.map((c, i) => {
            const n = writtenCount(c.num);
            return (
              <ListRow key={c.num} n={String(c.num)} enabled onPress={() => router.push(`/chapter/${c.num}` as Href)} last={i === CHAPTER_MAP.length - 1}>
                <RowTitle enabled>{c.title}</RowTitle>
                <RowSub>{c.question}</RowSub>
                <Tags levels={c.levels} note={n ? `${n} of ${c.sections.length} written · Tro ${c.tro}` : `Soon · Tro ${c.tro}`} />
              </ListRow>
            );
          })}
        </>
      )}
    </View>
  );
}

/** Our chapters in the class book's order. Tro 10 and 11 are one "Bonding" unit across our Chapters 9 and 12. */
function ClassOrder() {
  const rows: { tro: string; ours: string }[] = [];
  for (const r of CLASS_ORDER) {
    if (r.tro === '11') rows[rows.length - 1] = { tro: '10–11', ours: 'Bonding: 9.1–9.7, 12.1–12.6' };
    else rows.push(r);
  }
  return (
    <View>
      <View style={h.listHead}>
        <Eyebrow>Your book’s order</Eyebrow>
        <Text style={h.meta}>Tro 6e chapter → ours</Text>
      </View>
      {rows.map((r) => {
        const nums = [...new Set((r.ours.match(/(?:^|,\s*|:\s*)(\d+)/g) ?? []).map((m) => Number(m.replace(/\D/g, ''))))];
        const first = nums[0];
        const titles = nums.map((n) => mapChapter(n)?.title).filter(Boolean).join(' · ');
        return (
          <ListRow key={r.tro} n={r.tro} numeralWidth={44} enabled={first !== undefined} onPress={() => router.push(`/chapter/${first}` as Href)}>
            <RowTitle enabled={first !== undefined}>{titles || 'Not covered yet'}</RowTitle>
            <RowSub>{`Ours: ${r.ours}`}</RowSub>
          </ListRow>
        );
      })}
    </View>
  );
}

function Start({ icon, title, sub, onPress }: { icon: string; title: string; sub: string; onPress?: () => void }) {
  return (
    <PressTint onPress={onPress} disabled={!onPress} accessibilityRole="button" style={h.start}>
      <Text style={h.ic}>{icon}</Text>
      <View style={{ flex: 1 }}>
        <Text style={h.t}>{title}</Text>
        <Rich style={h.s}>{sub}</Rich>
      </View>
    </PressTint>
  );
}

function Lab() {
  return (
    <View>
      <Text style={h.hero}>Play first. The words can come later.</Text>
      <Rich style={h.lead}>Turn molecules, mix things, squeeze them. Nothing breaks, nothing spills.</Rich>
      <View style={h.listHead}>
        <Eyebrow>Sandboxes</Eyebrow>
        <Text style={h.meta}>free play + challenges</Text>
      </View>
      <ListRow n="1" enabled onPress={() => router.push('/lab/molecule')}>
        <RowTitle enabled>Molecule viewer</RowTitle>
        <RowSub>Turn real molecules in 3D: ball-and-stick, cut open, or real size.</RowSub>
      </ListRow>
      <ListRow n="2" enabled={false} meta="Soon">
        <RowTitle enabled={false}>Mix and react</RowTitle>
        <RowSub>Fill a box, react it, see what’s left over · Ch 4–5</RowSub>
      </ListRow>
      <ListRow n="3" enabled={false} meta="Soon">
        <RowTitle enabled={false}>Gas in a box</RowTitle>
        <RowSub>Heat it, squeeze it, add more: watch the pressure · Ch 7</RowSub>
      </ListRow>
      <ListRow n="4" enabled={false} meta="Soon" last>
        <RowTitle enabled={false}>Lab balance</RowTitle>
        <RowSub>Weigh anything; the molecule counter climbs with it · Ch 4</RowSub>
      </ListRow>
    </View>
  );
}

function Tools() {
  return (
    <View>
      <Text style={h.hero}>The things you look up, in one place.</Text>
      <Rich style={h.lead}>Every tool links back to the section that explains it.</Rich>
      <Eyebrow style={{ marginTop: 28 }}>Calculate</Eyebrow>
      <ListRow n="1" enabled onPress={() => router.push('/tools/molar-mass')}>
        <RowTitle enabled>Molar mass</RowTitle>
        <RowSub>Type a formula, see every atom added up, then change grams to moles</RowSub>
      </ListRow>
      <Eyebrow style={{ marginTop: 28 }}>Look up</Eyebrow>
      <ListRow n="2" enabled onPress={() => router.push('/tools/periodic-table')}>
        <RowTitle enabled>Periodic table</RowTitle>
        <RowSub>Tap an element: mass, electrons, family</RowSub>
      </ListRow>
      <ListRow n="3" enabled={false} meta="Soon">
        <RowTitle enabled={false}>Formula sheet</RowTitle>
        <RowSub>Every chapter’s “at a glance”, in one list</RowSub>
      </ListRow>
      <ListRow n="4" enabled={false} meta="Soon" last>
        <RowTitle enabled={false}>Glossary</RowTitle>
        <RowSub>Every word in plain English, with where it’s taught</RowSub>
      </ListRow>
    </View>
  );
}

const h = StyleSheet.create({
  brand: { flexDirection: 'row', alignItems: 'center', gap: 14, marginTop: 8 },
  wordmark: { fontFamily: font.grotesk, fontSize: 30, letterSpacing: -0.8, color: color.ink },
  rule: { width: 1, height: 34, backgroundColor: color.line },
  sub: { fontFamily: font.sans, fontSize: 15, lineHeight: 17, color: color.ink2 },
  hero: { fontFamily: font.serif, fontSize: 40, lineHeight: 48, letterSpacing: -0.5, color: color.ink, marginTop: 30, marginBottom: 10 },
  lead: { fontFamily: font.sans, fontSize: 16, lineHeight: 25, color: color.ink2 },
  listHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 28 },
  meta: { fontFamily: font.sans, fontSize: 13, color: color.ink2 },
  start: { flexDirection: 'row', gap: 14, paddingVertical: 13, borderBottomWidth: 1, borderColor: color.line, alignItems: 'flex-start', minHeight: 60 },
  ic: { width: 28, fontFamily: font.chem, fontSize: 19, lineHeight: 22, color: color.coral, textAlign: 'center' },
  t: { fontFamily: font.sansMedium, fontSize: 16, lineHeight: 22, color: color.ink },
  s: { fontFamily: font.sans, fontSize: 13.5, lineHeight: 20, color: color.ink2, marginTop: 2 },
});
