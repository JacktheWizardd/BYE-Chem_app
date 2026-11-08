// A worked example, watch-only (BYE Math @ b49d14a, src/app/problem/[id].tsx; docs/ui-guide.md §4):
// a pinned header, the method bar, the working revealed one line per tap, the focused step's
// explanation, and a bottom bar that always says what comes next. Desktop: two panes and keys.
import { router, useLocalSearchParams, type Href } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, View, type ScrollViewInstance } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { nextSectionId, useSection } from '@/content';
import type { Example } from '@/content/types';
import { MethodBar, StepDetail, WorkRow } from '@/components/example/parts';
import { finished } from '@/components/feedback';
import { Loading, NotFound } from '@/components/Loading';
import { Rich, plainRich } from '@/components/Rich';
import { ArrowDown, BackButton, PrimaryButton, SecondaryButton } from '@/components/ui';
import { useKeys } from '@/components/useKeys';
import { useLayout } from '@/layout';
import { color, font, PROBLEM_MAX, space } from '@/theme';

export { LoadFailed as ErrorBoundary } from '@/components/Loading';

const FADE = 46;

export default function ExampleRoute() {
  return (
    <Loading>
      <LoadExample />
    </Loading>
  );
}

function LoadExample() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const sectionId = id.split('-')[0]!;
  const c = useSection(sectionId);
  const ex = c?.examples.find((e) => e.id === id);
  if (!c || !ex) return <NotFound />;
  const order = c.examples.map((e) => e.id);
  return <ExampleScreen key={ex.id} ex={ex} sectionId={sectionId} nextId={order[order.indexOf(id) + 1]} />;
}

function ExampleScreen({ ex, sectionId, nextId }: { ex: Example; sectionId: string; nextId?: string }) {
  const insets = useSafeAreaInsets();
  const L = useLayout();
  const wide = L.desktop;
  const frameW = wide ? Math.min(L.contentW, PROBLEM_MAX) : L.contentW;
  const sideX = Math.floor((L.contentW - frameW) / 2);
  const padX = !wide ? space.pageX : frameW < 1000 ? 28 : 40;
  const width = wide ? Math.floor(frameW / 2) : L.contentW;
  const N = ex.steps.length;

  const [shown, setShown] = useState(1); // steps revealed so far
  const [lines, setLines] = useState(1); // lines of the newest step revealed so far
  const [focus, setFocus] = useState(1); // the step explained below the working
  const [fresh, setFresh] = useState<[number, number] | null>(null); // the line just added
  const [open, setOpen] = useState<Record<number, boolean>>({});
  const scroll = useRef<ScrollViewInstance>(null);

  const linesIn = (n: number) => ex.steps[n - 1]!.lines.length;
  const focusStep = (n: number) => {
    setFocus(n);
    setOpen({});
  };
  const showNext = () => {
    if (lines < linesIn(shown)) {
      setLines(lines + 1);
      setFresh([shown, lines]);
      if (shown === N && lines + 1 === linesIn(shown)) setTimeout(finished, 150);
      return;
    }
    const n = shown + 1;
    setShown(n);
    setLines(1);
    setFresh([n, 0]);
    focusStep(n);
    if (n === N && linesIn(n) <= 1) setTimeout(finished, 150);
  };
  const restart = () => {
    setShown(1);
    setLines(1);
    setFresh(null);
    focusStep(1);
    scroll.current?.scrollTo({ y: 0, animated: true });
  };
  const moreLines = lines < linesIn(shown);
  const next = shown < N ? ex.steps[shown] : null;
  const hasNext = moreLines || next != null;
  const done = !hasNext;
  const after = nextId ? undefined : nextSectionId(sectionId);
  const backToSection = () => router.push(`/section/${sectionId}` as Href);
  const goNext = () => (nextId ? router.replace(`/example/${nextId}` as Href) : backToSection());

  useKeys((key) => {
    if (key === 'Escape') return backToSection(), true;
    if (!(key === 'ArrowRight' || key === ' ' || key === 'Enter')) return false;
    if (hasNext) showNext();
    else goNext();
    return true;
  });

  const detailScroll = useRef<ScrollViewInstance>(null);
  useEffect(() => {
    detailScroll.current?.scrollTo({ y: 0, animated: false });
  }, [focus]);

  // The = signs line up at the right edge of the left column, sized from the longest left side.
  const size = 19;
  const longest = Math.max(1, ...ex.steps.flatMap((s) => s.lines.map((l) => plainRich(l.left ?? '').length)));
  const lhsCol = Math.min(110, Math.max(22, Math.ceil(longest * size * 0.55) + 4));

  const working = (
    <View>
      {ex.steps.flatMap((s, si) =>
        s.lines.map((line, li) => {
          const n = si + 1;
          if (n > shown || (n === shown && li >= lines)) return null;
          const isFresh = !!fresh && fresh[0] === n && fresh[1] === li;
          return <WorkRow key={`${n}-${li}`} line={line} move={li === 0 ? s.move : undefined} lhsCol={lhsCol} size={size} focused={n === focus} fresh={isFresh} onPress={() => focusStep(n)} />;
        }),
      )}
      {done && <Rich style={st.answer}>{ex.answer}</Rich>}
    </View>
  );
  const detail = <StepDetail n={focus} step={ex.steps[focus - 1]!} open={open} onToggle={(i) => setOpen((o) => ({ ...o, [i]: !o[i] }))} />;

  const bottom = (
    <View style={[st.bottom, { paddingBottom: insets.bottom + (wide ? 18 : 26), paddingHorizontal: padX }]} pointerEvents="box-none">
      <Svg width={width - (wide ? 1 : 0)} height={FADE} style={st.fade} pointerEvents="none">
        <Defs>
          <LinearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={color.ground} stopOpacity={0} />
            <Stop offset="1" stopColor={color.ground} stopOpacity={1} />
          </LinearGradient>
        </Defs>
        <Rect x={0} y={0} width={width - (wide ? 1 : 0)} height={FADE} fill="url(#fade)" />
      </Svg>
      <View style={st.solid} pointerEvents="none" />
      {hasNext ? (
        moreLines ? (
          <>
            <Text style={st.preview}>{`Line ${lines + 1} of ${linesIn(shown)} in this step`}</Text>
            <PrimaryButton label="Next line" onPress={showNext} icon={<ArrowDown />} />
          </>
        ) : (
          <>
            <Rich style={st.preview} numberOfLines={2}>
              {next!.say}
            </Rich>
            <PrimaryButton label={`Next: ${next!.move}`} onPress={showNext} icon={<ArrowDown />} />
          </>
        )
      ) : (
        <View style={{ flexDirection: 'row', gap: space.sm, flexWrap: 'wrap', justifyContent: 'center' }}>
          <SecondaryButton label="From step 1" onPress={restart} />
          <PrimaryButton label={nextId ? 'Next example  →' : after ? 'Back to the section  →' : 'Back to the section'} onPress={goNext} />
        </View>
      )}
      {wide && Platform.OS === 'web' && <Text style={st.keys}>{hasNext ? '→ or Space' : 'Esc: back to the section'}</Text>}
    </View>
  );

  return (
    <View style={st.screen}>
      <View style={[st.header, { paddingTop: insets.top + (wide ? 18 : 4), paddingHorizontal: sideX + padX }]}>
        <View style={st.topRow}>
          <BackButton label={`Section ${sectionId}`} onPress={backToSection} />
          <Text style={st.counter}>{`Step ${shown} of ${N}`}</Text>
        </View>
        <Text style={st.eyebrow}>{`EXAMPLE ${ex.id.replace('-', '.')} · ${ex.level.toUpperCase()}`}</Text>
        <Rich style={st.question}>{ex.question}</Rich>
      </View>

      {wide ? (
        <View style={[st.panes, { paddingHorizontal: sideX }]}>
          <View style={[st.paneLeft, { width }]}>
            <MethodBar steps={ex.steps} focus={focus} padX={padX} />
            <ScrollView ref={scroll} style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: padX, paddingTop: 6, paddingBottom: 170 }}>
              {working}
            </ScrollView>
            {bottom}
          </View>
          <ScrollView ref={detailScroll} style={{ width: frameW - width }} contentContainerStyle={{ paddingHorizontal: padX, paddingBottom: 60 }}>
            {detail}
          </ScrollView>
        </View>
      ) : (
        <>
          <MethodBar steps={ex.steps} focus={focus} />
          <ScrollView ref={scroll} style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: space.pageX, paddingTop: 6, paddingBottom: insets.bottom + 190 }}>
            {working}
            {detail}
          </ScrollView>
          {bottom}
        </>
      )}
    </View>
  );
}

const st = StyleSheet.create({
  screen: { flex: 1, backgroundColor: color.ground },
  header: { backgroundColor: color.ground, borderBottomWidth: 1, borderBottomColor: color.line, paddingBottom: 14 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', minHeight: 44 },
  counter: { fontFamily: font.sans, fontSize: 13, color: color.ink2 },
  eyebrow: { fontFamily: font.sans, fontSize: 12, letterSpacing: 2.2, color: color.ink2, marginTop: 4 },
  question: { fontFamily: font.chem, fontSize: 22, lineHeight: 30, color: color.ink, marginTop: 6 },
  answer: { marginTop: 16, fontFamily: font.sansMedium, fontSize: 16, lineHeight: 25, color: color.matsu },
  bottom: { position: 'absolute', left: 0, right: 0, bottom: 0, paddingTop: 34, alignItems: 'center', gap: space.sm },
  keys: { fontFamily: font.sans, fontSize: 12, color: color.axis },
  panes: { flex: 1, flexDirection: 'row', minHeight: 0 },
  paneLeft: { minHeight: 0, borderRightWidth: 1, borderRightColor: color.line },
  fade: { position: 'absolute', top: 0, left: 0 },
  solid: { position: 'absolute', top: FADE, left: 0, right: 0, bottom: 0, backgroundColor: color.ground },
  preview: { fontFamily: font.sans, fontSize: 13, lineHeight: 19, color: color.ink2, textAlign: 'center' },
});
