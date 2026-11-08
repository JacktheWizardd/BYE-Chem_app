// A read (docs/learn-template.md): Eyebrow "Section · i of n", title, gist, the blocks, then
// Before / Next / Done. One screen of reading plus a picture or two. No checks.
import { router, useLocalSearchParams, type Href } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { mapSection, useSection } from '@/content';
import { Blocks } from '@/components/learn/Blocks';
import { Loading, NotFound } from '@/components/Loading';
import { Rich } from '@/components/Rich';
import { BackButton, Chevron, Eyebrow, Page, PressTint, Title } from '@/components/ui';
import { color, font } from '@/theme';

export { LoadFailed as ErrorBoundary } from '@/components/Loading';

export default function ReadRoute() {
  return (
    <Loading>
      <LoadRead />
    </Loading>
  );
}

function LoadRead() {
  const { id, topic } = useLocalSearchParams<{ id: string; topic: string }>();
  const map = mapSection(id);
  const c = useSection(id);
  const i = c?.reads.findIndex((r) => r.id === topic) ?? -1;
  if (!map || !c || i < 0) return <NotFound />;
  const read = c.reads[i]!;
  const before = c.reads[i - 1];
  const next = c.reads[i + 1];
  return (
    <Page key={read.id}>
      <BackButton label={`Section ${id}`} onPress={() => router.push(`/section/${id}` as Href)} />
      <Eyebrow style={{ marginTop: 8 }}>{`Section ${id} · ${i + 1} of ${c.reads.length}`}</Eyebrow>
      <Title size={32}>{read.title}</Title>
      <Rich style={st.gist}>{read.gist}</Rich>
      <Blocks blocks={read.blocks} />
      <View style={st.nav}>
        {before && <NavRow label="Before" title={before.title} onPress={() => router.replace(`/learn/${id}/${before.id}` as Href)} />}
        {next ? (
          <NavRow label="Next" title={next.title} onPress={() => router.replace(`/learn/${id}/${next.id}` as Href)} />
        ) : (
          <NavRow label="Done" title={c.examples.length ? 'Back to the section: the recap and worked examples' : 'Back to the section'} onPress={() => router.push(`/section/${id}` as Href)} />
        )}
      </View>
    </Page>
  );
}

function NavRow({ label, title, onPress }: { label: string; title: string; onPress: () => void }) {
  return (
    <PressTint onPress={onPress} accessibilityRole="link" style={st.row}>
      <View style={{ flex: 1 }}>
        <Text style={st.k}>{label.toUpperCase()}</Text>
        <Rich style={st.t}>{title}</Rich>
      </View>
      <Chevron size={14} stroke={color.axis} />
    </PressTint>
  );
}

const st = StyleSheet.create({
  gist: { fontFamily: font.sans, fontSize: 16, lineHeight: 26, color: color.ink2 },
  nav: { marginTop: 30, borderTopWidth: 1, borderColor: color.line },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, minHeight: 60, paddingVertical: 10, borderBottomWidth: 1, borderColor: color.line },
  k: { fontFamily: font.sans, fontSize: 11, letterSpacing: 1.6, color: color.ink2 },
  t: { fontFamily: font.sansMedium, fontSize: 16, lineHeight: 22, color: color.ink, marginTop: 2 },
});
