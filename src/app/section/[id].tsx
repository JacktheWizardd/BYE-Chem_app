// Section page: Learn · Simple · Medium · Hard. Learn ends with "Check yourself"; Simple fades.
import { useLocalSearchParams, type Href } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { chapterOf, isBuilt, mapChapter, mapSection, sectionContent } from '@/content';
import { AnswerCheck, FadingSteps, LinkedViews } from '@/components/practice';
import { Rich } from '@/components/Rich';
import { Back, Band, Button, Eyebrow, Head, Para, Plain, Row, Screen, Small, Tabs, Title } from '@/components/ui';
import type { Verdict } from '@/practice/checks';
import { useProgress } from '@/store/progress';
import { color, font } from '@/theme';
import NotFound from '../+not-found';

const TABS = ['learn', 'simple', 'medium', 'hard'] as const;
type Tab = (typeof TABS)[number];
const LABELS: Record<Tab, string> = { learn: 'Learn', simple: 'Simple', medium: 'Medium', hard: 'Hard' };

export default function Section() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const map = mapSection(id);
  const c = sectionContent(id);
  const n = chapterOf(id);
  const [tab, setTab] = useState<Tab>('learn');
  const { markDone, p } = useProgress();
  const [results, setResults] = useState<Record<string, Verdict>>({});
  if (!map) return <NotFound />;

  const header = (
    <>
      <Back href={`/chapter/${n}` as Href} label={`Chapter ${n}`} />
      <Eyebrow style={{ marginTop: 8 }}>{`Chapter ${n} · §${id}`}</Eyebrow>
      <Title size={30}>{map.title}</Title>
      <Text style={ss.tro}>{`In your book: Tro ${map.tro.join(', ')}`}</Text>
    </>
  );

  if (!c) {
    return (
      <Screen>
        {header}
        <Plain style={{ marginTop: 12 }}>{map.question}</Plain>
        <Band><Para style={{ marginTop: 0 }}>This section is coming soon.</Para><Button label={`Back to ${mapChapter(n)?.title ?? `Chapter ${n}`}`} href={`/chapter/${n}` as Href} /></Band>
      </Screen>
    );
  }

  const answered = c.check.filter((q) => results[q.id] === 'ok' || results[q.id] === 'part').length;
  const done = p.done.includes(id);

  return (
    <Screen>
      {header}
      <Tabs<Tab> tabs={TABS} value={tab} labels={LABELS} onChange={setTab} />

      {tab === 'learn' ? (
        <View>
          <Rich style={ss.intro}>{c.intro}</Rich>
          {c.tool ? (<><Head eyebrow="The tool" /><Rich style={ss.tool}>{c.tool}</Rich></>) : null}

          <Head eyebrow="Key ideas" meta={String(c.ideas.length)} />
          {c.ideas.map((idea, i) => (
            <View key={i} style={ss.idea}>
              <Text style={ss.ideaN}>{i + 1}</Text>
              <View style={{ flex: 1 }}>
                <Text style={ss.ideaT}>{idea.title}</Text>
                <Rich style={ss.ideaD}>{idea.body}</Rich>
              </View>
            </View>
          ))}

          {c.views ? (<><Head eyebrow={c.views.title} meta="tap to link" /><LinkedViews views={c.views} /></>) : null}

          {c.lab ? (
            <>
              <Head eyebrow="In the lab" meta="2 minutes" />
              <View style={ss.lab}>
                <Rich style={ss.try}>{c.lab.challenge}</Rich>
                <Text style={ss.labT}>{c.lab.title}</Text>
                <Small>{c.lab.body}</Small>
              </View>
            </>
          ) : null}

          <Head eyebrow="Check yourself" meta={`${c.check.length} questions`} />
          {c.check.map((q, i) => (
            <AnswerCheck key={q.id} q={q} label={`${i + 1} of ${c.check.length}`} onResult={(r) => {
              const next = { ...results, [q.id]: r.verdict };
              setResults(next);
              if (c.check.every((x) => next[x.id] === 'ok' || next[x.id] === 'part')) markDone(id);
            }} />
          ))}
          {done || answered === c.check.length ? (
            <View style={ss.done}><Text style={ss.doneText}>{`§${id} done. It will come back in Today’s review.`}</Text>{c.simple ? <Button label="Practise: Simple" onPress={() => setTab('simple')} /> : null}</View>
          ) : null}

          {c.showsUp?.length ? (
            <>
              <Head eyebrow="Where it shows up" />
              {c.showsUp.map((u) => {
                const s = mapSection(u.id);
                return <Row key={u.id} href={isBuilt(u.id) ? (`/section/${u.id}` as Href) : undefined} num={u.id} title={s?.title ?? u.id} sub={u.note} />;
              })}
            </>
          ) : null}
        </View>
      ) : tab === 'simple' && c.simple ? (
        <View>
          <Small style={{ marginTop: 12 }}>Problems start fully worked. Each right answer hides one more step, from the end; a miss brings the step back.</Small>
          <FadingSteps sectionId={id} problems={c.simple} />
        </View>
      ) : (
        <Band><Para style={{ marginTop: 0 }}>{`${LABELS[tab]} problems for §${id} are coming soon. They start partly worked and mix in earlier sections.`}</Para></Band>
      )}
    </Screen>
  );
}

const ss = StyleSheet.create({
  tro: { fontFamily: font.sans, fontSize: 12, color: color.muted },
  intro: { fontFamily: font.sans, fontSize: 16.5, lineHeight: 27, color: color.ink, marginTop: 16 },
  tool: { fontFamily: font.chem, fontSize: 22, lineHeight: 30, color: color.ink, textAlign: 'center', paddingVertical: 12, borderBottomWidth: 1, borderColor: color.line },
  idea: { flexDirection: 'row', gap: 14, paddingVertical: 12, borderBottomWidth: 1, borderColor: color.line },
  ideaN: { width: 22, fontFamily: font.serif, fontSize: 17, color: color.ink2 },
  ideaT: { fontFamily: font.sansMedium, fontSize: 15.5, color: color.ink },
  ideaD: { fontFamily: font.sans, fontSize: 14, lineHeight: 21, color: color.ink2, marginTop: 2 },
  lab: { borderWidth: 1, borderColor: color.line, borderRadius: 14, padding: 12, backgroundColor: color.band, marginTop: 8 },
  try: { fontFamily: font.sans, fontSize: 13.5, lineHeight: 20, color: color.shu, marginBottom: 4 },
  labT: { fontFamily: font.sansMedium, fontSize: 16, color: color.ink },
  done: { marginTop: 14, padding: 12, borderRadius: 14, backgroundColor: color.molSoft },
  doneText: { fontFamily: font.sansMedium, fontSize: 15, color: color.mol, textAlign: 'center' },
});
