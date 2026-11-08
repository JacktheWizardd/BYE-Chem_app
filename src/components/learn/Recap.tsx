// The recap parts (BYE Math @ b49d14a, src/components/LearnParts.tsx), for chemistry: `Rich` text
// instead of MathLine, particle pictures instead of engine graphs. docs/ui-guide.md §2.
import { router, type Href } from 'expo-router';
import { useCallback, useState, type ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { mapSection, isWritten } from '@/content';
import type { Clue, Frame, LookAlike, Mistake, Use } from '@/content/types';
import { tap } from '@/components/feedback';
import { Rich } from '@/components/Rich';
import { Chevron, Eyebrow, PressFade } from '@/components/ui';
import { Particles } from '@/figures/Particles';
import { color, FIGURE_MAX, font } from '@/theme';
import { noSelect, useSwipeSteps } from './useSwipeSteps';

/** Shows items[current], but always as tall as the tallest item, so stepping frames never makes the page jump. */
export function SteadyHeight({ items, current, style }: { items: ReactNode[]; current: number; style?: StyleProp<ViewStyle> }) {
  const [heights, setHeights] = useState<number[]>([]);
  const tallest = heights.length ? Math.max(...heights) : 0;
  return (
    <View style={[style, { minHeight: tallest || undefined }]} accessibilityLiveRegion="polite">
      {items[current]}
      <View style={styles.measure} pointerEvents="none" aria-hidden importantForAccessibility="no-hide-descendants">
        {items.map((item, i) => (
          <View
            key={i}
            style={styles.measureItem}
            onLayout={(e) => {
              const h = Math.ceil(e.nativeEvent.layout.height);
              setHeights((hs) => (hs[i] === h ? hs : Object.assign([...hs], { [i]: h })));
            }}
          >
            {item}
          </View>
        ))}
      </View>
    </View>
  );
}

/** A picture built up frame by frame (Why it works, or "Picture it" in a read). Swipe or tap to step; pictures only add. */
export function Frames({ frames, label = 'Why it works', flush }: { frames: Frame[]; label?: string; flush?: boolean }) {
  const [frame, setFrame] = useState(1);
  const n = frames.length;
  const move = useCallback((by: 1 | -1) => setFrame((k) => Math.max(1, Math.min(n, k + by))), [n]);
  const swipe = useSwipeSteps(move);
  const hasPictures = frames.some((f) => f.particles);
  return (
    <View>
      <View style={[styles.head, { marginTop: flush ? 0 : 32 }]}>
        <Eyebrow>{label}</Eyebrow>
        {n > 1 && <Text style={styles.hint}>tap ‹ left · right › or swipe</Text>}
      </View>
      <View {...swipe} style={noSelect}>
        {hasPictures && (
          <SteadyHeight
            style={styles.figure}
            current={frame - 1}
            items={frames.map((f, i) => (
              <View key={i}>{f.particles ? <Particles scene={f.particles} /> : null}</View>
            ))}
          />
        )}
        <SteadyHeight
          style={[styles.frame, !hasPictures && styles.frameNoFigure]}
          current={frame - 1}
          items={frames.map((fr, i) => (
            <View key={i}>
              <Rich style={styles.caption}>{fr.caption}</Rich>
              {fr.eq?.map((m) => (
                <Rich key={m} style={styles.eq}>
                  {m}
                </Rich>
              ))}
            </View>
          ))}
        />
      </View>
      {n > 1 && (
        <View style={styles.controls}>
          <View style={styles.dots}>
            {frames.map((_, i) => (
              <Pressable
                key={i}
                onPress={() => {
                  tap('select');
                  setFrame(i + 1);
                }}
                hitSlop={8}
                accessibilityRole="button"
                accessibilityLabel={`Picture ${i + 1} of ${n}`}
                accessibilityState={{ selected: i + 1 === frame }}
                style={styles.dotHit}
              >
                <View style={[styles.dot, i + 1 === frame && styles.dotOn]} />
              </Pressable>
            ))}
          </View>
          <View style={frame === n && { opacity: 0.3 }}>
            <PressFade onPress={() => move(1)} disabled={frame === n} haptic="select" accessibilityRole="button" accessibilityState={{ disabled: frame === n }} hitSlop={8} style={styles.next}>
              <Text style={styles.nextText}>Next</Text>
              <Chevron size={13} stroke={color.ink2} />
            </PressFade>
          </View>
        </View>
      )}
    </View>
  );
}

/** A link to another section: blue and underlined when it's written, plain ink when it isn't yet. */
export function SectionLink({ id, note }: { id: string; note?: string }) {
  const s = mapSection(id);
  const live = isWritten(id);
  const body = (
    <>
      <Text style={styles.linkN}>{id}</Text>
      <View style={{ flex: 1 }}>
        <Rich style={[styles.linkT, live && styles.linkLive]}>{s?.title ?? id}</Rich>
        {note ? <Rich style={styles.linkNote}>{note}</Rich> : null}
      </View>
      {live && <Chevron size={13} stroke={color.ai} />}
    </>
  );
  if (!live) return <View style={styles.link}>{body}</View>;
  return (
    <PressFade onPress={() => router.push(`/section/${id}` as Href)} accessibilityRole="link" style={styles.link}>
      {body}
    </PressFade>
  );
}

/** "How to spot it": the clues that say "this section", each with what it looks like, then look-alikes. */
export function SpotIt({ clues, lookAlikes, flush }: { clues: Clue[]; lookAlikes: LookAlike[]; flush?: boolean }) {
  return (
    <View>
      <Eyebrow style={{ marginTop: flush ? 0 : 32 }}>How to spot it</Eyebrow>
      <View style={{ marginTop: 8 }}>
        {clues.map((c, i) => (
          <View key={c.text} style={styles.clue}>
            <Text style={styles.clueN}>{i + 1}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.body}>{c.text}</Text>
              <View style={styles.clueEg}>
                <Rich style={styles.eqLeft}>{c.example}</Rich>
                <Rich style={styles.clueNote}>{c.note}</Rich>
              </View>
            </View>
          </View>
        ))}
      </View>
      {lookAlikes.length > 0 && <Text style={styles.subhead}>Looks like it, but isn&apos;t</Text>}
      {lookAlikes.map((l) => (
        <View key={l.looks} style={styles.item}>
          <Rich style={styles.eqLeft}>{l.looks}</Rich>
          <Rich style={[styles.body, { marginTop: 8 }]}>{`<b>${l.use}.</b> ${l.why}`}</Rich>
          {l.link && <SectionLink id={l.link} />}
        </View>
      ))}
    </View>
  );
}

/** "Common mistakes": each slip shown wrong next to right, with why the wrong one is wrong. */
export function Mistakes({ mistakes, flush }: { mistakes: Mistake[]; flush?: boolean }) {
  return (
    <View>
      <Eyebrow style={{ marginTop: flush ? 0 : 32 }}>Common mistakes</Eyebrow>
      {mistakes.map((m) => (
        <View key={m.wrong} style={styles.item}>
          <View style={[styles.pair, styles.wrong]}>
            <Text style={[styles.mark, { color: color.shu }]}>Not</Text>
            <Rich style={[styles.eqLeft, { flex: 1, color: color.shu }]}>{m.wrong}</Rich>
          </View>
          <View style={[styles.pair, styles.right, { marginTop: 6 }]}>
            <Text style={[styles.mark, { color: color.matsu, fontFamily: font.sansMedium }]}>But</Text>
            <Rich style={[styles.eqLeft, { flex: 1 }]}>{m.right}</Rich>
          </View>
          <Rich style={[styles.body, { marginTop: 8 }]}>{m.why}</Rich>
        </View>
      ))}
    </View>
  );
}

/** "Where it shows up": real uses with a worked line, then later sections. */
export function ShowsUp({ uses, next, flush }: { uses: Use[]; next?: { id: string; note: string }[]; flush?: boolean }) {
  return (
    <View>
      <Eyebrow style={{ marginTop: flush ? 0 : 32 }}>Where it shows up</Eyebrow>
      {uses.map((u, i) => (
        <View key={u.where} style={styles.use}>
          <View style={styles.useHead}>
            <Text style={styles.useN}>{i + 1}</Text>
            <Text style={styles.useName}>{u.where}</Text>
          </View>
          <Rich style={styles.body}>{u.what}</Rich>
          <View style={styles.useEq}>
            <Rich style={styles.eqLeft}>{u.eq}</Rich>
          </View>
        </View>
      ))}
      {next && next.length > 0 && (
        <>
          <Text style={styles.subhead}>Later in the book</Text>
          {next.map((x) => (
            <SectionLink key={x.id} id={x.id} note={x.note} />
          ))}
        </>
      )}
    </View>
  );
}

export const styles = StyleSheet.create({
  head: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 },
  hint: { fontFamily: font.sans, fontSize: 12, color: color.axis },
  figure: { width: '100%', maxWidth: FIGURE_MAX, alignSelf: 'center', marginTop: 14, paddingVertical: 10, borderTopWidth: 1, borderBottomWidth: 1, borderColor: color.line },
  frame: { marginTop: 12, minHeight: 66 },
  frameNoFigure: { marginTop: 14, paddingTop: 14, borderTopWidth: 1, borderTopColor: color.line },
  measure: { position: 'absolute', left: 0, right: 0, top: 0, opacity: 0 },
  measureItem: { position: 'absolute', left: 0, right: 0, top: 0 },
  caption: { fontFamily: font.sans, fontSize: 15, lineHeight: 23, color: color.ink },
  eq: { marginTop: 10, fontFamily: font.chem, fontSize: 20, lineHeight: 28, color: color.ink, textAlign: 'center' },
  eqLeft: { fontFamily: font.chem, fontSize: 18, lineHeight: 26, color: color.ink },
  controls: { marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', minHeight: 44 },
  dots: { flexDirection: 'row', alignItems: 'center' },
  dotHit: { width: 22, height: 32, alignItems: 'center', justifyContent: 'center' },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: color.line },
  dotOn: { backgroundColor: color.ink2 },
  next: { flexDirection: 'row', alignItems: 'center', gap: 6, minHeight: 44, paddingLeft: 12 },
  nextText: { fontFamily: font.sans, fontSize: 15, color: color.ink2 },
  clue: { flexDirection: 'row', gap: 10, paddingVertical: 8 },
  clueN: { width: 22, fontFamily: font.serif, fontSize: 17, lineHeight: 23, color: color.axis },
  clueEg: { marginTop: 8, paddingVertical: 8, paddingHorizontal: 12, borderLeftWidth: 2, borderLeftColor: color.line },
  clueNote: { marginTop: 2, fontFamily: font.sans, fontSize: 12, lineHeight: 17, color: color.shu },
  body: { fontFamily: font.sans, fontSize: 15, lineHeight: 23, color: color.ink2 },
  subhead: { marginTop: 20, fontFamily: font.sansMedium, fontSize: 14, color: color.ink },
  item: { paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: color.line },
  pair: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  wrong: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, backgroundColor: color.wrongTint, borderLeftWidth: 3, borderLeftColor: color.shu },
  right: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, backgroundColor: color.rightTint, borderLeftWidth: 3, borderLeftColor: color.matsu },
  mark: { width: 32, fontFamily: font.sans, fontSize: 13, letterSpacing: 0.4 },
  use: { paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: color.line, gap: 6 },
  useHead: { flexDirection: 'row', alignItems: 'baseline', gap: 10 },
  useN: { fontFamily: font.serif, fontSize: 15, color: color.axis },
  useName: { fontFamily: font.sansMedium, fontSize: 15, color: color.ink },
  useEq: { marginTop: 4, paddingVertical: 8, paddingHorizontal: 12, borderLeftWidth: 2, borderLeftColor: color.line },
  link: { flexDirection: 'row', alignItems: 'center', gap: 10, minHeight: 44, paddingVertical: 6 },
  linkN: { width: 34, fontFamily: font.serif, fontSize: 15, color: color.ink2 },
  linkT: { fontFamily: font.sans, fontSize: 15, color: color.ink },
  linkLive: { color: color.ai, textDecorationLine: 'underline' },
  linkNote: { fontFamily: font.sans, fontSize: 13, lineHeight: 19, color: color.ink2 },
});
