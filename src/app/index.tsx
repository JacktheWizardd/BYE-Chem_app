// Home: Learn · Lab · Tools.
import { router, useLocalSearchParams, type Href } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CHAPTER_MAP, CLASS_ORDER, chapterContent, mapChapter, reviewPool } from '@/content';
import { Rich } from '@/components/Rich';
import { Head, Row, Screen, Tags, Tabs } from '@/components/ui';
import { useProgress } from '@/store/progress';
import { color, font, TAP } from '@/theme';

const TABS = ['learn', 'lab', 'tools'] as const;
type Tab = (typeof TABS)[number];
const LABELS: Record<Tab, string> = { learn: 'Learn', lab: 'Lab', tools: 'Tools' };

export default function Home() {
  const params = useLocalSearchParams<{ tab?: string }>();
  const tab: Tab = TABS.includes(params.tab as Tab) ? (params.tab as Tab) : 'learn';
  return (
    <Screen>
      <View style={h.brand}>
        <Text style={h.wordmark}>BYE<Text style={{ color: color.too }}>.</Text></Text>
        <View style={h.rule} />
        <View><Text style={h.sub}>Chem</Text><Text style={[h.sub, { fontSize: 14 }]}>一歩ずつ</Text></View>
      </View>
      <Tabs<Tab> tabs={TABS} value={tab} labels={LABELS} onChange={(t) => router.setParams({ tab: t })} />
      {tab === 'learn' ? <Learn /> : tab === 'lab' ? <Lab /> : <Tools />}
    </Screen>
  );
}

function Learn() {
  const { p } = useProgress();
  const [classOrder, setClassOrder] = useState(false);
  const due = Math.min(5, reviewPool().length);
  return (
    <View>
      <Text style={h.hero}>Chemistry, one step at a time.</Text>
      <Rich style={h.lead}>From zero to Chem 1A, 1B and AP. Every word is explained the first time it shows up.</Rich>

      <Head eyebrow="Start here" />
      <Start icon="◎" title="Find your gaps" sub="About 15 questions that adapt as you go. It names the skills to brush up. Coming soon." />
      <Start icon="→" title="Learn from zero" sub="Never studied chemistry, or it’s been years? Start at Chapter 0 and go in order." href="/chapter/0" />
      <Start icon="1A" title="I’m taking Chem 1A" sub={classOrder ? 'Showing your book’s order (Tro). Tap again for ours.' : 'The same chapters in your book’s order (Tro), with your course’s tags.'} onPress={() => setClassOrder(!classOrder)} on={classOrder} />
      <Start icon="↻" title="Today’s review" sub={`${due} mixed questions from chapters you’ve started · about 4 minutes`} href="/review" />

      {classOrder ? <ClassOrderList /> : (
        <>
          <Head eyebrow="Chapters" meta="our order · Tro 6e refs" />
          {CHAPTER_MAP.map((c) => {
            const built = !!chapterContent(c.num);
            const done = c.sections.filter((s) => p.done.includes(s.id)).length;
            return (
              <Row key={c.num} href={`/chapter/${c.num}` as Href} num={String(c.num)} title={c.title} sub={c.question} muted={!built}>
                <Tags levels={c.levels} tro={built ? (done ? `${done} of ${c.sections.length} done · Tro ${c.tro}` : `Tro ${c.tro}`) : 'Coming soon'} />
              </Row>
            );
          })}
        </>
      )}
    </View>
  );
}

/** Our chapters in the class book's order. Tro 10 and 11 are one "Bonding" unit across our Chapters 9 and 12. */
function ClassOrderList() {
  const rows: { tro: string; ours: string }[] = [];
  for (const r of CLASS_ORDER) {
    if (r.tro === '11') rows[rows.length - 1] = { tro: '10–11', ours: 'Bonding: 9.1–9.7, 12.1–12.6' };
    else rows.push(r);
  }
  return (
    <View>
      <Head eyebrow="Your book’s order" meta="Tro 6e chapter → ours" />
      {rows.map((r) => {
        const nums = [...new Set((r.ours.match(/(?:^|,\s*|:\s*)(\d+)/g) ?? []).map((m) => Number(m.replace(/\D/g, ''))))];
        const first = nums[0];
        const titles = nums.map((n) => mapChapter(n)?.title).filter(Boolean).join(' · ');
        return (
          <Row key={r.tro} num={`Tro ${r.tro}`} title={titles || 'Not covered yet'} sub={`Ours: ${r.ours}`} href={first !== undefined ? (`/chapter/${first}` as Href) : undefined} muted={first === undefined} />
        );
      })}
    </View>
  );
}

function Start({ icon, title, sub, href, onPress, on }: { icon: string; title: string; sub: string; href?: Href; onPress?(): void; on?: boolean }) {
  const press = onPress ?? (href ? () => router.push(href) : undefined);
  return (
    <Pressable onPress={press} disabled={!press} accessibilityRole={press ? 'button' : 'text'} accessibilityState={on !== undefined ? { selected: on } : undefined} style={({ pressed }) => [h.start, pressed && { opacity: 0.6 }]}>
      <Text style={[h.ic, on && { color: color.ink }]}>{icon}</Text>
      <View style={{ flex: 1 }}>
        <Text style={[h.t, !press && { color: color.muted }]}>{title}</Text>
        <Rich style={h.s}>{sub}</Rich>
      </View>
    </Pressable>
  );
}

function Lab() {
  return (
    <View>
      <Text style={[h.hero, { fontSize: 32, lineHeight: 40 }]}>Play first. The words can come later.</Text>
      <Rich style={h.lead}>Turn molecules, mix things, squeeze them. Nothing breaks, nothing spills.</Rich>
      <Head eyebrow="Sandboxes" meta="free play + challenges" />
      <Row href="/lab/molecule" title="Molecule viewer" sub="Turn real molecules in 3D: ball-and-stick, cut open, or real size. Try this: find the molecule whose angle is exactly 180°." />
      <Row title="Mix and react" sub="Fill a box, react it, see what’s left over · Ch 4–5 · Soon" muted />
      <Row title="Gas in a box" sub="Heat it, squeeze it, add more: watch the pressure · Ch 7 · Soon" muted />
      <Row title="Lab balance" sub="Weigh anything; the molecule counter climbs with it · Ch 4 · Soon" muted />
    </View>
  );
}

function Tools() {
  return (
    <View>
      <Text style={[h.hero, { fontSize: 32, lineHeight: 40 }]}>The things you look up, in one place.</Text>
      <Rich style={h.lead}>Every tool links back to the section that explains it.</Rich>
      <Head eyebrow="Calculate" />
      <Row href="/tools/molar-mass" title="Molar mass" sub="Type a formula, see every atom added up, then change grams to moles" />
      <Head eyebrow="Look up" />
      <Row href="/tools/periodic-table" title="Periodic table" sub="Tap an element: mass, electrons, family" />
      <Row title="Formula sheet" sub="Every chapter’s “at a glance”, in one list · Soon" muted />
      <Row title="Glossary" sub="Every word in plain English, with where it’s taught · Soon" muted />
    </View>
  );
}

const h = StyleSheet.create({
  brand: { flexDirection: 'row', alignItems: 'center', gap: 14, marginTop: 8 },
  wordmark: { fontFamily: font.grotesk, fontSize: 30, letterSpacing: -0.8, color: color.ink },
  rule: { width: 1, height: 34, backgroundColor: color.line },
  sub: { fontFamily: font.sans, fontSize: 15, lineHeight: 18, color: color.ink2 },
  hero: { fontFamily: font.serif, fontSize: 36, lineHeight: 44, color: color.ink, marginTop: 24, marginBottom: 10 },
  lead: { fontFamily: font.sans, fontSize: 16, lineHeight: 25, color: color.ink2 },
  start: { flexDirection: 'row', gap: 14, paddingVertical: 13, borderBottomWidth: 1, borderColor: color.line, alignItems: 'flex-start', minHeight: TAP },
  ic: { width: 28, fontFamily: font.chem, fontSize: 19, lineHeight: 22, color: color.coral, textAlign: 'center' },
  t: { fontFamily: font.sansMedium, fontSize: 16, lineHeight: 22, color: color.ink },
  s: { fontFamily: font.sans, fontSize: 13.5, lineHeight: 20, color: color.ink2, marginTop: 2 },
});
