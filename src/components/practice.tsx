// The practice layer (docs/practice-layer.md): answer first, checked answers that name the slip,
// fading that follows the learner, linked views, recall mode and the learner's own line.
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import type { FadeProblem, Question, Rich as RichText, SectionContent } from '@/content/types';
import { check, type Result } from '@/practice/checks';
import { useProgress } from '@/store/progress';
import { color, font, PAD, TAP } from '@/theme';
import { Rich } from './Rich';
import { Eyebrow, Small } from './ui';

/** Input + Check. Feedback names the slip; the worked answer shows after a try. */
export function AnswerCheck({ q, label, onResult }: { q: Question; label?: string; onResult?(r: Result): void }) {
  const { record } = useProgress();
  const [text, setText] = useState('');
  const [res, setRes] = useState<Result | null>(null);
  const [shown, setShown] = useState(false);
  const submit = () => {
    const r = check(q.spec, text);
    setRes(r);
    if (text.trim()) record(q.id, r.verdict);
    onResult?.(r);
  };
  return (
    <View style={p.card}>
      {label ? <Text style={p.qk}>{label.toUpperCase()}</Text> : null}
      <Rich style={p.q}>{q.prompt}</Rich>
      <View style={p.ask}>
        <TextInput
          value={text} onChangeText={setText} onSubmitEditing={submit} placeholder={q.placeholder ?? 'Your answer'}
          placeholderTextColor={color.axis} style={p.input} autoCapitalize="none" autoCorrect={false} returnKeyType="done"
          accessibilityLabel={`Answer: ${q.prompt.replace(/<[^>]+>/g, '')}`}
        />
        <Pressable onPress={submit} style={({ pressed }) => [p.go, pressed && { opacity: 0.75 }]} accessibilityRole="button"><Text style={p.goText}>Check</Text></Pressable>
      </View>
      {res ? <Rich style={[p.fb, res.verdict === 'ok' ? p.ok : res.verdict === 'part' ? p.part : p.no]}>{res.message}</Rich> : null}
      {res && res.verdict !== 'ok' && !shown ? (
        <Pressable onPress={() => setShown(true)} style={p.show} accessibilityRole="button"><Text style={p.showText}>Show the worked answer</Text></Pressable>
      ) : null}
      {shown ? <Rich style={p.answer}>{q.answer}</Rich> : null}
    </View>
  );
}

/**
 * Simple tab with fading. Level 0 = fully worked; level k = the last k steps are the learner's.
 * All right → the next problem hides one more step. A miss → that step comes back worked, and the level drops by one.
 */
export function FadingSteps({ sectionId, problems }: { sectionId: string; problems: FadeProblem[] }) {
  const { p: prog, setFade } = useProgress();
  const max = Math.max(...problems.map((x) => x.steps.length));
  const level = Math.min(prog.fade[sectionId] ?? 0, max);
  const index = Math.min(prog.problem[sectionId] ?? 0, problems.length - 1);
  const prob = problems[index]!;
  const yours = prob.steps.length - Math.min(level, prob.steps.length);
  const [state, setState] = useState<Record<number, Result>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const finished = prob.steps.every((_, i) => i < yours || state[i]?.verdict === 'ok' || state[i]?.verdict === 'part' || revealed[i]);
  const missed = Object.values(revealed).some(Boolean);
  const isLast = index === problems.length - 1;

  const next = () => {
    const nextLevel = missed ? Math.max(1, level - 1) : level + 1;
    setFade(sectionId, Math.min(nextLevel, max), isLast ? 0 : index + 1);
    setState({}); setRevealed({});
  };

  return (
    <View>
      <View style={p.fadeBar} accessibilityLabel={`Problem ${index + 1} of ${problems.length}. ${level === 0 ? 'Fully worked.' : level >= max ? 'Solo.' : `The last ${level} step${level > 1 ? 's are' : ' is'} yours.`}`}>
        {Array.from({ length: max + 1 }, (_, i) => <View key={i} style={[p.fadeSeg, i < level && p.fadeDone, i === level && p.fadeNow]} />)}
      </View>
      <View style={p.fadeKey}><Text style={p.fadeKeyText}>worked</Text><Text style={p.fadeKeyText}>your steps</Text><Text style={p.fadeKeyText}>solo</Text></View>
      <Rich style={[p.q, { marginTop: 14, fontSize: 16.5, lineHeight: 25 }]}>{`Problem ${index + 1}. ${prob.prompt}`}</Rich>
      {prob.steps.map((st, i) => {
        const mine = i >= yours && !revealed[i];
        const r = state[i];
        return (
          <View key={i} style={[p.step, mine && p.stepYou]}>
            <Text style={p.stepN}>{i + 1}</Text>
            <View style={{ flex: 1, minWidth: 0 }}>
              {mine && r?.verdict !== 'ok' && r?.verdict !== 'part' ? (
                <>
                  <Rich style={p.work}>{st.ask}</Rich>
                  <Small>{`Your step. ${st.why}`}</Small>
                  <StepInput onSubmit={(t) => {
                    const res = check(st.check, t);
                    setState((s) => ({ ...s, [i]: res }));
                    if (res.verdict === 'no') setRevealed((v) => ({ ...v, [i]: false }));
                  }} />
                  {r ? <Rich style={[p.fb, p.no]}>{r.message}</Rich> : null}
                  {r?.verdict === 'no' ? (
                    <Pressable onPress={() => setRevealed((v) => ({ ...v, [i]: true }))} style={p.show} accessibilityRole="button"><Text style={p.showText}>Show this step worked</Text></Pressable>
                  ) : null}
                </>
              ) : (
                <>
                  <Rich style={p.work}>{st.work}</Rich>
                  <Small>{st.why}</Small>
                  {r && (r.verdict === 'ok' || r.verdict === 'part') ? <Rich style={[p.fb, r.verdict === 'ok' ? p.ok : p.part]}>{r.message}</Rich> : null}
                </>
              )}
            </View>
          </View>
        );
      })}
      {finished ? (
        <View style={{ marginTop: 14 }}>
          <Small>{level === 0 && !missed ? 'That one was fully worked. The next one leaves the last step to you.' : missed ? 'That step comes back worked in the next problem too.' : level + 1 >= max ? 'Next: you do every step.' : 'Next problem hides one more step.'}</Small>
          <Pressable onPress={next} style={({ pressed }) => [p.next, pressed && { opacity: 0.75 }]} accessibilityRole="button">
            <Text style={p.goText}>{isLast ? 'Start again from problem 1' : 'Next problem'}</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}

function StepInput({ onSubmit }: { onSubmit(t: string): void }) {
  const [t, setT] = useState('');
  return (
    <View style={p.ask}>
      <TextInput value={t} onChangeText={setT} onSubmitEditing={() => onSubmit(t)} placeholder="number and unit" placeholderTextColor={color.axis} style={p.input} autoCapitalize="none" autoCorrect={false} accessibilityLabel="Your step" />
      <Pressable onPress={() => onSubmit(t)} style={({ pressed }) => [p.go, pressed && { opacity: 0.75 }]} accessibilityRole="button"><Text style={p.goText}>Check</Text></Pressable>
    </View>
  );
}

/** See it · Particles · Symbols: tap a part and the same thing lights up in every view. */
export function LinkedViews({ views }: { views: NonNullable<SectionContent['views']> }) {
  const [on, setOn] = useState<string | null>(null);
  return (
    <View>
      {views.cols.map((c) => (
        <View key={c.label} style={p.view}>
          <Text style={p.viewK}>{c.label.toUpperCase()}</Text>
          <View style={p.viewV}>
            {c.parts.map((part, i) => part.link ? (
              <Pressable key={i} onPress={() => setOn(on === part.link ? null : part.link!)} accessibilityRole="button" accessibilityState={{ selected: on === part.link }} hitSlop={8}>
                <Rich style={[p.lk, on === part.link && p.lkOn]}>{part.text}</Rich>
              </Pressable>
            ) : <Rich key={i} style={p.viewText}>{part.text}</Rich>)}
          </View>
        </View>
      ))}
      <Rich style={p.linkCap}>{on ? views.caption[on]! : 'Tap any underlined part to see the same thing in all three views.'}</Rich>
    </View>
  );
}

/** The chapter at a glance, with a "Test me" mode that hides each formula until tapped. */
export function GlanceList({ items }: { items: { eq: RichText; note: RichText; from: string }[] }) {
  const [test, setTest] = useState(false);
  const [shown, setShown] = useState<Record<number, boolean>>({});
  return (
    <View>
      <View style={p.glanceHead}>
        <Eyebrow>The chapter at a glance</Eyebrow>
        <Pressable onPress={() => { setTest(!test); setShown({}); }} style={[p.testme, test && p.testmeOn]} accessibilityRole="switch" accessibilityState={{ checked: test }}>
          <Text style={[p.testmeText, test && { color: color.onInk }]}>{test ? 'Show all' : 'Test me'}</Text>
        </Pressable>
      </View>
      {items.map((g, i) => {
        const hidden = test && !shown[i];
        return (
          <View key={i} style={[p.glance, i === items.length - 1 && { borderBottomWidth: 0 }]}>
            {hidden ? (
              <Pressable onPress={() => setShown({ ...shown, [i]: true })} style={p.hidden} accessibilityRole="button" accessibilityLabel="Hidden formula. Say it to yourself, then tap to check.">
                <Text style={p.hiddenText}>Say it, then tap</Text>
              </Pressable>
            ) : <Rich style={p.glanceEq}>{g.eq}</Rich>}
            <Rich style={p.glanceNote}>{g.note}</Rich>
            <Text style={p.glanceFrom}>{g.from}</Text>
          </View>
        );
      })}
    </View>
  );
}

export function WriteOneLine({ chapter }: { chapter: string }) {
  const { p: prog, setOneLine } = useProgress();
  return (
    <View>
      <Rich style={[p.q, { marginTop: 6 }]}>Where could you use this? Write one line.</Rich>
      <TextInput
        value={prog.oneLine[chapter] ?? ''} onChangeText={(t) => setOneLine(chapter, t)} multiline
        placeholder="e.g. checking how much sugar is in my drink" placeholderTextColor={color.axis}
        style={p.oneLine} accessibilityLabel="Where could you use this? Write one line."
      />
      <Small style={{ marginTop: 4 }}>Saved only on this device.</Small>
    </View>
  );
}

/** Flat particle pictures in the liked style: H as outline rings, O filled terracotta, atoms touching. */
export function WaterMolecule({ size = 38 }: { size?: number }) {
  return (
    <Svg width={size} height={size * 30 / 38} viewBox="0 0 38 30">
      <Circle cx={8} cy={9} r={6.5} fill={color.elH} stroke={color.axis} strokeWidth={1.2} />
      <Circle cx={30} cy={9} r={6.5} fill={color.elH} stroke={color.axis} strokeWidth={1.2} />
      <Circle cx={19} cy={18} r={10} fill={color.elO} stroke={color.ground} strokeWidth={1} />
    </Svg>
  );
}

export function WaterMolePicture({ caption }: { caption?: RichText }) {
  return (
    <View accessible accessibilityLabel="18.02 grams of water is one mole: 6.022 times 10 to the 23 water molecules.">
      <View style={p.recipe}>
        <View style={p.recipePart}>
          <Svg width={26} height={32} viewBox="0 0 24 30"><Path d="M12 2 C12 2 3 13 3 19.5 a9 9 0 0 0 18 0 C21 13 12 2 12 2 z" fill={color.water} /></Svg>
          <Rich style={[p.cap, { color: color.mass }]}>{'18.02 g'}</Rich>
        </View>
        <Text style={p.op}>=</Text>
        <View style={p.recipePart}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, minHeight: 34 }}>
            <WaterMolecule />
            <Rich style={p.times}>{'× 6.022 × 10<sup>23</sup>'}</Rich>
          </View>
          <Rich style={[p.cap, { color: color.mol }]}>{'1 mol H<sub>2</sub>O'}</Rich>
        </View>
      </View>
      {caption ? <Rich style={[p.glanceNote, { textAlign: 'center', marginTop: 10 }]}>{caption}</Rich> : null}
    </View>
  );
}

/** A prerequisite in "Ready? You need": done, needs review, or not yet known. */
export function ReadyItem({ state, title, sub, onReview }: { state: 'done' | 'review' | 'unknown'; title: RichText; sub: string; onReview?(): void }) {
  return (
    <View style={p.stop}>
      <View style={[p.dot, state === 'done' && p.dotDone, state === 'review' && p.dotNow]}>
        <Text style={[p.dotText, state === 'done' && { color: color.onInk }, state === 'review' && { color: color.coral, fontFamily: font.sansBold }]}>{state === 'done' ? '✓' : state === 'review' ? '!' : '?'}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Rich style={p.stopT}>{title}</Rich>
        <Text style={p.stopS}>{sub}</Text>
      </View>
      {state === 'review' && onReview ? <Pressable onPress={onReview} hitSlop={10} accessibilityRole="link"><Text style={p.reviewTag}>Review</Text></Pressable> : null}
    </View>
  );
}

export const p = StyleSheet.create({
  card: { marginTop: 10, borderWidth: 1, borderColor: color.line, borderRadius: 14, padding: 12, backgroundColor: color.card },
  qk: { fontFamily: font.sans, fontSize: 11, letterSpacing: 1.4, color: color.ink2, marginBottom: 2 },
  q: { fontFamily: font.sans, fontSize: 15.5, lineHeight: 23, color: color.ink },
  ask: { flexDirection: 'row', gap: 8, marginTop: 8 },
  input: { flex: 1, minWidth: 0, minHeight: TAP, borderWidth: 1.5, borderColor: color.ink, borderRadius: 12, backgroundColor: color.card, paddingHorizontal: 12, fontFamily: font.chem, fontSize: 18, color: color.ink },
  go: { minHeight: TAP, paddingHorizontal: 16, borderRadius: 22, backgroundColor: color.ink, justifyContent: 'center' },
  goText: { fontFamily: font.sansMedium, fontSize: 15, color: color.onInk },
  fb: { fontFamily: font.sans, fontSize: 14, lineHeight: 21, marginTop: 6 },
  ok: { color: color.mol }, part: { color: color.ink2 }, no: { color: color.shu },
  show: { minHeight: TAP, justifyContent: 'center', alignSelf: 'flex-start' },
  showText: { fontFamily: font.sans, fontSize: 13, color: color.ink2, textDecorationLine: 'underline' },
  answer: { fontFamily: font.sans, fontSize: 14, lineHeight: 21, color: color.ink2 },
  fadeBar: { flexDirection: 'row', gap: 4, marginTop: 14 },
  fadeSeg: { flex: 1, height: 6, borderRadius: 3, backgroundColor: color.line },
  fadeDone: { backgroundColor: color.ink2 }, fadeNow: { backgroundColor: color.coral },
  fadeKey: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
  fadeKeyText: { fontFamily: font.sans, fontSize: 11.5, color: color.ink2 },
  step: { flexDirection: 'row', gap: 12, paddingVertical: 11, borderBottomWidth: 1, borderColor: color.line },
  stepYou: { backgroundColor: color.band, marginHorizontal: -PAD, paddingHorizontal: PAD - 3, borderLeftWidth: 3, borderLeftColor: color.coral },
  stepN: { width: 22, fontFamily: font.serif, fontSize: 17, color: color.ink2 },
  work: { fontFamily: font.chem, fontSize: 17, lineHeight: 25, color: color.ink },
  next: { alignSelf: 'center', minHeight: TAP, paddingHorizontal: 22, borderRadius: 22, backgroundColor: color.ink, justifyContent: 'center', marginTop: 12 },
  view: { borderWidth: 1, borderColor: color.line, borderRadius: 12, paddingVertical: 10, paddingHorizontal: 12, backgroundColor: color.card, marginTop: 8, alignItems: 'center' },
  viewK: { fontFamily: font.sans, fontSize: 10.5, letterSpacing: 1.4, color: color.ink2 },
  viewV: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'baseline', gap: 10, marginTop: 6 },
  viewText: { fontFamily: font.chem, fontSize: 17, color: color.ink },
  lk: { fontFamily: font.chem, fontSize: 17, color: color.ink, textDecorationLine: 'underline', textDecorationStyle: 'dotted', textDecorationColor: color.axis },
  lkOn: { color: color.shu, textDecorationStyle: 'solid', textDecorationColor: color.shu },
  linkCap: { fontFamily: font.sans, fontSize: 13.5, lineHeight: 20, color: color.ink2, marginTop: 8, minHeight: 40 },
  glanceHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  testme: { minHeight: 34, paddingHorizontal: 12, borderRadius: 17, borderWidth: 1, borderColor: color.line, backgroundColor: color.band, justifyContent: 'center' },
  testmeOn: { backgroundColor: color.ink, borderColor: color.ink },
  testmeText: { fontFamily: font.sans, fontSize: 13, color: color.ink },
  glance: { paddingVertical: 12, borderBottomWidth: 1, borderColor: color.line },
  glanceEq: { fontFamily: font.chem, fontSize: 20, lineHeight: 28, color: color.ink },
  glanceNote: { fontFamily: font.sans, fontSize: 13.5, lineHeight: 20, color: color.ink2, marginTop: 2 },
  glanceFrom: { fontFamily: font.sans, fontSize: 12.5, color: color.mass, marginTop: 3 },
  hidden: { minHeight: TAP, borderRadius: 8, backgroundColor: '#ece6da', justifyContent: 'center', paddingHorizontal: 12 },
  hiddenText: { fontFamily: font.sans, fontSize: 13, color: color.ink2 },
  oneLine: { minHeight: 64, marginTop: 8, borderWidth: 1.5, borderColor: color.line, borderRadius: 12, backgroundColor: color.card, padding: 10, fontFamily: font.sans, fontSize: 15, lineHeight: 22, color: color.ink, textAlignVertical: 'top' },
  recipe: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', gap: 10, paddingTop: 6 },
  recipePart: { alignItems: 'center', gap: 6 },
  op: { fontFamily: font.chem, fontSize: 20, color: color.ink2, paddingBottom: 26 },
  cap: { fontFamily: font.chem, fontSize: 17 },
  times: { fontFamily: font.chem, fontSize: 16, color: color.ink },
  stop: { flexDirection: 'row', gap: 14, paddingVertical: 11, borderBottomWidth: 1, borderColor: color.line, alignItems: 'center' },
  dot: { width: 26, height: 26, borderRadius: 13, borderWidth: 1.5, borderColor: color.line, alignItems: 'center', justifyContent: 'center', backgroundColor: color.ground },
  dotDone: { backgroundColor: color.ink, borderColor: color.ink },
  dotNow: { borderWidth: 2, borderColor: color.coral },
  dotText: { fontFamily: font.sans, fontSize: 12, color: color.axis },
  stopT: { fontFamily: font.sansMedium, fontSize: 15, lineHeight: 21, color: color.ink },
  stopS: { fontFamily: font.sans, fontSize: 13, lineHeight: 19, color: color.ink2 },
  reviewTag: { fontFamily: font.sans, fontSize: 13, color: color.coral, paddingVertical: 10 },
});
