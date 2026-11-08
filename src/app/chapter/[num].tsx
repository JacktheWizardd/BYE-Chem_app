// Chapter page (docs/ui-guide.md §4): BYE Chem's liked topic-page top (promise, what this lets you
// do, Ready? as plain links), then BYE Math's overview bands (story, grouped road map, Start, at a
// glance, where it shows up) and the Lab.
import { router, useLocalSearchParams, type Href } from 'expo-router';
import { Suspense, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { chapterContent, isWritten, mapChapter, mapSection, preloadChapter, useSection } from '@/content';
import type { MapSection } from '@/content/types';
import { Blocks } from '@/components/learn/Blocks';
import { SectionLink, ShowsUp } from '@/components/learn/Recap';
import { NotFound } from '@/components/Loading';
import { Rich } from '@/components/Rich';
import { BackButton, Band, Eyebrow, Head, ListRow, Page, Plain, PrimaryButton, RowSub, RowTitle, Tags, Title } from '@/components/ui';
import { Particles } from '@/figures/Particles';
import { color, font } from '@/theme';

export default function Chapter() {
  const { num } = useLocalSearchParams<{ num: string }>();
  const n = Number(num);
  const map = mapChapter(n);
  const c = chapterContent(n);
  useEffect(() => preloadChapter(n), [n]);
  if (!map) return <NotFound />;

  // "Ready? You need": prerequisites from outside this chapter, in map order.
  const own = new Set(map.sections.map((s) => s.id));
  const key = (id: string) => id.split('.').map(Number) as [number, number];
  const needs = [...new Set(map.sections.flatMap((s) => s.needs).filter((id) => !own.has(id)))].sort((a, b) => key(a)[0] - key(b)[0] || key(a)[1] - key(b)[1]);
  const groups = c?.groups ?? [{ name: '', ids: map.sections.map((s) => s.id) }];
  const first = map.sections.find((s) => isWritten(s.id));

  return (
    <Page>
      <BackButton label="Chemistry" onPress={() => router.push('/')} />
      <Eyebrow style={{ marginTop: 8 }}>{`Chapter ${n}`}</Eyebrow>
      <Title size={40}>{map.title}</Title>
      <Plain>{c?.promise ?? map.question}</Plain>
      <Tags levels={map.levels} note={`In your book: Tro ${map.tro}`} />

      {c?.letsYouDo && (
        <Band tint style={{ marginTop: 22 }}>
          <Eyebrow>What this lets you do</Eyebrow>
          <Rich style={st.task}>{c.letsYouDo.task}</Rich>
          {c.letsYouDo.particles && <Particles scene={c.letsYouDo.particles} />}
          {c.letsYouDo.caption && <Rich style={st.caption}>{c.letsYouDo.caption}</Rich>}
        </Band>
      )}

      {needs.length > 0 && (
        <View style={{ marginTop: 26 }}>
          <Eyebrow>Ready? You need</Eyebrow>
          {needs.map((id) => (
            <SectionLink key={id} id={id} note={mapSection(id)?.question.replace(/<[^>]+>/g, '')} />
          ))}
        </View>
      )}

      {c?.story && (
        <View style={{ marginTop: 26 }}>
          <Eyebrow>The story</Eyebrow>
          <Blocks blocks={c.story} />
        </View>
      )}

      <Band tint style={{ marginTop: 26 }}>
        <Head eyebrow="The road map" meta={`${map.sections.length} sections`} />
        {groups.map((g) => (
          <View key={g.name || 'all'}>
            {g.name ? <Text style={st.group}>{g.name}</Text> : null}
            {g.ids.map((id) => {
              const s = map.sections.find((x) => x.id === id)!;
              return (
                <Suspense key={id} fallback={<RoadRow s={s} />}>
                  {isWritten(id) ? <RoadRowLoaded s={s} /> : <RoadRow s={s} />}
                </Suspense>
              );
            })}
          </View>
        ))}
      </Band>

      {first ? (
        <View style={st.start}>
          <PrimaryButton label={`Start with Section ${first.id}  →`} onPress={() => router.push(`/section/${first.id}` as Href)} />
        </View>
      ) : (
        <Plain style={{ marginTop: 22 }}>This chapter is being written. Its sections are listed above, each with the part of your book it matches.</Plain>
      )}

      {c?.glance && (
        <Band tint style={{ marginTop: 26 }}>
          <Eyebrow>The chapter at a glance</Eyebrow>
          {c.glance.map((g, i) => (
            <View key={i} style={[st.glance, i === c.glance!.length - 1 && { borderBottomWidth: 0 }]}>
              <Rich style={st.glanceEq}>{g.eq}</Rich>
              <Rich style={st.glanceNote}>{g.note}</Rich>
              <Text style={st.glanceFrom}>{`Section ${g.from}`}</Text>
            </View>
          ))}
        </Band>
      )}

      {c?.uses && <ShowsUp uses={c.uses} />}

      {c?.lab && (
        <View style={{ marginTop: 32 }}>
          <Head eyebrow="Play with it" meta="Lab" />
          <View style={st.lab}>
            <Rich style={st.try}>{c.lab.challenge}</Rich>
            <Text style={st.labT}>{c.lab.title}</Text>
            <Rich style={st.caption}>{c.lab.body}</Rich>
          </View>
        </View>
      )}
    </Page>
  );
}

function RoadRowLoaded({ s }: { s: MapSection }) {
  const content = useSection(s.id);
  const minutes = content?.reads.reduce((m, r) => m + r.minutes, 0);
  return <RoadRow s={s} minutes={minutes} />;
}

function RoadRow({ s, minutes }: { s: MapSection; minutes?: number }) {
  const live = isWritten(s.id);
  return (
    <ListRow n={s.id} numeralWidth={36} enabled={live} meta={live ? (minutes ? `${minutes} min` : '') : 'Soon'} onPress={() => router.push(`/section/${s.id}` as Href)}>
      <RowTitle enabled={live}>{s.title}</RowTitle>
      <RowSub>{s.question}</RowSub>
    </ListRow>
  );
}

const st = StyleSheet.create({
  task: { fontFamily: font.sans, fontSize: 16, lineHeight: 27, color: color.ink, marginTop: 8 },
  caption: { fontFamily: font.sans, fontSize: 13.5, lineHeight: 20, color: color.ink2, textAlign: 'center', marginTop: 4 },
  group: { marginTop: 16, fontFamily: font.sansMedium, fontSize: 14, color: color.ink },
  start: { alignItems: 'center', marginTop: 28 },
  glance: { paddingVertical: 12, borderBottomWidth: 1, borderColor: color.line },
  glanceEq: { fontFamily: font.chem, fontSize: 20, lineHeight: 28, color: color.ink },
  glanceNote: { fontFamily: font.sans, fontSize: 13.5, lineHeight: 20, color: color.ink2, marginTop: 2 },
  glanceFrom: { fontFamily: font.sans, fontSize: 12.5, color: color.ai, marginTop: 3 },
  lab: { borderWidth: 1, borderColor: color.line, borderRadius: 10, padding: 12, backgroundColor: color.band, marginTop: 8 },
  try: { fontFamily: font.sans, fontSize: 13.5, lineHeight: 20, color: color.shu, marginBottom: 4 },
  labT: { fontFamily: font.sansMedium, fontSize: 16, color: color.ink },
});
