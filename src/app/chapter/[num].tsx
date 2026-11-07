// Chapter page: the liked topic-page layout (promise → what this lets you do → Ready? → lessons),
// then Play with it, the chapter at a glance, where it shows up, and the learner's own line.
import { router, useLocalSearchParams, type Href } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { chapterContent, isBuilt, mapChapter, mapSection } from '@/content';
import { AnswerCheck, GlanceList, ReadyItem, WaterMolePicture, WriteOneLine } from '@/components/practice';
import { Rich } from '@/components/Rich';
import { Back, Band, Button, Eyebrow, Head, Para, Plain, Row, Screen, Small, Tags, Title } from '@/components/ui';
import NotFound from '../+not-found';
import { useProgress } from '@/store/progress';
import { color, font } from '@/theme';

export default function Chapter() {
  const { num } = useLocalSearchParams<{ num: string }>();
  const n = Number(num);
  const map = mapChapter(n);
  const c = chapterContent(n);
  const { p } = useProgress();
  if (!map) return <NotFound />;

  // "Ready? You need": prerequisites from outside this chapter, in map order.
  const own = new Set(map.sections.map((s) => s.id));
  const needs = [...new Set(map.sections.flatMap((s) => s.needs).filter((id) => !own.has(id)))]
    .sort((a, b) => Number(a.split('.')[0]) - Number(b.split('.')[0]) || Number(a.split('.')[1]) - Number(b.split('.')[1]));
  const recallMissed = c?.recall && p.answers[c.recall.id]?.last === 'no';
  const firstBuilt = map.sections.find((s) => isBuilt(s.id));

  return (
    <Screen>
      <Back href="/" label="Chemistry" />
      <Eyebrow style={{ marginTop: 8 }}>{`Chapter ${n}`}</Eyebrow>
      <Title>{map.title}</Title>
      <Plain>{c?.promise ?? map.question}</Plain>
      <Tags levels={map.levels} tro={`In your book: Tro ${map.tro}`} />

      {c?.letsYouDo ? (
        <Band>
          <Eyebrow>What this lets you do</Eyebrow>
          <Para>{c.letsYouDo.task}</Para>
          {c.letsYouDo.picture === 'water-mole' ? <View style={{ marginTop: 12 }}><WaterMolePicture caption={c.letsYouDo.caption} /></View> : null}
        </Band>
      ) : null}

      {!c ? (
        <Band>
          <Para style={{ marginTop: 0 }}>This chapter is coming soon. Its sections are listed below, each with the part of your book it matches.</Para>
          <Button label="Try Chapter 4: the mole" href="/chapter/4" />
        </Band>
      ) : null}

      {needs.length || c?.recall ? <Head eyebrow="Ready? You need" /> : null}
      {c?.recall ? <AnswerCheck q={c.recall} label={`Quick recall · from ${c.recall.from}`} /> : null}
      {needs.map((id) => {
        const s = mapSection(id);
        const state = p.done.includes(id) ? 'done' : recallMissed && id === c?.recall?.from ? 'review' : 'unknown';
        return <ReadyItem key={id} state={state} title={s?.title ?? id} sub={`${id}${s ? ` · ${s.question.replace(/<[^>]+>/g, '')}` : ''}`} onReview={() => router.push(`/section/${id}` as Href)} />;
      })}

      <Head eyebrow="The lessons" meta={String(map.sections.length)} />
      {map.sections.map((s, i) => {
        const built = isBuilt(s.id);
        const done = p.done.includes(s.id);
        return (
          <Row key={s.id} href={built ? (`/section/${s.id}` as Href) : undefined} num={String(i + 1)} title={s.title} sub={`${s.question} · Tro ${s.tro.join(', ')}${built ? (done ? ' · done ✓' : '') : ' · coming soon'}`} muted={!built} />
        );
      })}
      {firstBuilt ? <Button label={`Start with ${firstBuilt.id}`} href={`/section/${firstBuilt.id}` as Href} /> : null}

      {c?.lab ? (
        <>
          <Head eyebrow="Play with it" meta="Lab" />
          <View style={st.lab}>
            <Rich style={st.try}>{c.lab.challenge}</Rich>
            <Text style={st.labT}>{c.lab.title}</Text>
            <Small>{c.lab.body}</Small>
          </View>
        </>
      ) : null}

      {c?.glance ? <Band><GlanceList items={c.glance} /></Band> : null}

      {c?.uses ? (
        <>
          <Head eyebrow="Where it shows up" />
          {c.uses.map((u, i) => (
            <View key={i} style={[st.use, i === c.uses!.length - 1 && { borderBottomWidth: 0 }]}>
              <Text style={st.where}>{u.where}</Text>
              <Rich style={st.what}>{u.what}</Rich>
              <Rich style={st.eq}>{u.eq}</Rich>
            </View>
          ))}
        </>
      ) : null}

      {c?.writeOneLine ? (
        <>
          <Head eyebrow="Your turn" meta="optional" />
          <WriteOneLine chapter={String(n)} />
        </>
      ) : null}
    </Screen>
  );
}

const st = StyleSheet.create({
  lab: { borderWidth: 1, borderColor: color.line, borderRadius: 14, padding: 12, backgroundColor: color.band, marginTop: 8 },
  try: { fontFamily: font.sans, fontSize: 13.5, lineHeight: 20, color: color.shu, marginBottom: 4 },
  labT: { fontFamily: font.sansMedium, fontSize: 16, color: color.ink },
  use: { paddingVertical: 12, borderBottomWidth: 1, borderColor: color.line },
  where: { fontFamily: font.sansMedium, fontSize: 15, color: color.ink },
  what: { fontFamily: font.sans, fontSize: 14, lineHeight: 21, color: color.ink2, marginTop: 3, marginBottom: 4 },
  eq: { fontFamily: font.chem, fontSize: 17, color: color.ink },
});
