// Section page (docs/ui-guide.md §4, docs/learn-template.md): intro, Understand it (the reads),
// the recap, worked examples, you need first, where it shows up. A textbook: no level tabs.
import { router, useLocalSearchParams, type Href } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { chapterOf, mapChapter, mapSection, useSection } from '@/content';
import type { MapSection, SectionContent } from '@/content/types';
import { Frames, Mistakes, SectionLink, ShowsUp, SpotIt } from '@/components/learn/Recap';
import { Loading, NotFound } from '@/components/Loading';
import { Rich } from '@/components/Rich';
import { BackButton, Band, Eyebrow, Head, ListRow, Page, Plain, PrimaryButton, RowSub, RowTitle, Title } from '@/components/ui';
import { color, font } from '@/theme';

export { LoadFailed as ErrorBoundary } from '@/components/Loading';

export default function SectionRoute() {
  return (
    <Loading>
      <LoadSection />
    </Loading>
  );
}

function LoadSection() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const map = mapSection(id);
  const content = useSection(id);
  if (!map) return <NotFound />;
  return content ? <SectionPage map={map} c={content} /> : <NotWritten map={map} />;
}

function Header({ map }: { map: MapSection }) {
  const n = chapterOf(map.id);
  return (
    <>
      <BackButton label={`Chapter ${n}`} onPress={() => router.push(`/chapter/${n}` as Href)} />
      <Eyebrow style={{ marginTop: 8 }}>{`Chapter ${n} · Section ${map.id}`}</Eyebrow>
      <Title size={34}>{map.title}</Title>
      <Text style={st.tro}>{`In your book: Tro ${map.tro.join(', ')}`}</Text>
    </>
  );
}

function NotWritten({ map }: { map: MapSection }) {
  const n = chapterOf(map.id);
  return (
    <Page>
      <Header map={map} />
      <Plain style={{ marginTop: 14 }}>{map.question}</Plain>
      <Band tint style={{ marginTop: 22 }}>
        <Plain>This section is being written.</Plain>
        <View style={{ marginTop: 18, alignItems: 'flex-start' }}>
          <PrimaryButton label={`Back to ${mapChapter(n)?.title ?? `Chapter ${n}`}`} onPress={() => router.push(`/chapter/${n}` as Href)} />
        </View>
      </Band>
    </Page>
  );
}

function SectionPage({ map, c }: { map: MapSection; c: SectionContent }) {
  const minutes = c.reads.reduce((m, r) => m + r.minutes, 0);
  return (
    <Page>
      <Header map={map} />
      <Rich style={st.intro}>{c.intro}</Rich>

      <Band tint style={{ marginTop: 22 }}>
        <Head eyebrow="Understand it" meta={`${c.reads.length} short reads · ${minutes} min`} />
        {c.reads.map((r, i) => (
          <ListRow key={r.id} n={String(i + 1)} enabled meta={`${r.minutes} min`} onPress={() => router.push(`/learn/${c.id}/${r.id}` as Href)} last={i === c.reads.length - 1}>
            <RowTitle enabled>{r.title}</RowTitle>
            <RowSub>{r.gist}</RowSub>
          </ListRow>
        ))}
      </Band>

      <View style={{ marginTop: 28 }}>
        <Eyebrow>The recap</Eyebrow>
        {c.tool && (
          <>
            <Rich style={st.tool}>{c.tool}</Rich>
            {c.toolNote && <Rich style={st.toolNote}>{c.toolNote}</Rich>}
          </>
        )}
        <Eyebrow style={{ marginTop: 26 }}>Key ideas</Eyebrow>
        {c.ideas.map((idea, i) => (
          <View key={idea.title} style={st.idea}>
            <Text style={st.ideaN}>{i + 1}</Text>
            <View style={{ flex: 1 }}>
              <Text style={st.ideaT}>{idea.title}</Text>
              <Rich style={st.ideaD}>{idea.body}</Rich>
            </View>
          </View>
        ))}
      </View>

      <Band tint style={{ marginTop: 28 }}>
        <Frames frames={c.why} flush />
      </Band>

      <SpotIt clues={c.spot.clues} lookAlikes={c.spot.lookAlikes} />
      <Mistakes mistakes={c.mistakes} />

      {c.examples.length > 0 && (
        <Band tint style={{ marginTop: 28 }}>
          <Head eyebrow="Worked examples" meta={`${c.examples.length} · read-only`} />
          {c.examples.map((e, i) => (
            <ListRow key={e.id} n={String(i + 1)} enabled meta={`${e.steps.length} steps`} onPress={() => router.push(`/example/${e.id}` as Href)} last={i === c.examples.length - 1}>
              <Rich style={st.exQ}>{e.question}</Rich>
              <RowSub>{e.level}</RowSub>
            </ListRow>
          ))}
        </Band>
      )}

      {map.needs.length > 0 && (
        <View style={{ marginTop: 28 }}>
          <Eyebrow>You need first</Eyebrow>
          {map.needs.map((id) => (
            <SectionLink key={id} id={id} />
          ))}
        </View>
      )}

      <ShowsUp uses={c.realUses} next={c.next} />

      <View style={st.start}>
        <PrimaryButton label="Start with read 1  →" onPress={() => router.push(`/learn/${c.id}/${c.reads[0]!.id}` as Href)} />
      </View>
    </Page>
  );
}

const st = StyleSheet.create({
  tro: { fontFamily: font.sans, fontSize: 12, color: color.muted },
  intro: { fontFamily: font.sans, fontSize: 16, lineHeight: 27, color: color.ink, marginTop: 14 },
  tool: { marginTop: 10, paddingVertical: 14, borderTopWidth: 1, borderBottomWidth: 1, borderColor: color.line, fontFamily: font.chem, fontSize: 23, lineHeight: 32, color: color.ink, textAlign: 'center' },
  toolNote: { marginTop: 8, fontFamily: font.sans, fontSize: 13.5, lineHeight: 20, color: color.ink2, textAlign: 'center' },
  idea: { flexDirection: 'row', gap: 14, paddingVertical: 12, borderBottomWidth: 1, borderColor: color.line },
  ideaN: { width: 22, fontFamily: font.serif, fontSize: 17, color: color.ink2 },
  ideaT: { fontFamily: font.sansMedium, fontSize: 15.5, color: color.ink },
  ideaD: { fontFamily: font.sans, fontSize: 14, lineHeight: 21, color: color.ink2, marginTop: 2 },
  exQ: { fontFamily: font.chem, fontSize: 17, lineHeight: 24, color: color.ink },
  start: { alignItems: 'center', marginTop: 32 },
});
