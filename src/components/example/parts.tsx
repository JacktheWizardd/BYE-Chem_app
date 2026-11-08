// The worked-example screen's parts, from BYE Math @ b49d14a (src/components/problem/MethodBar.tsx,
// WorkRow.tsx, StepDetail.tsx), adapted to chemistry `Rich` lines. Watch-only: nothing to type.
import { useState } from 'react';
import { Platform, StyleSheet, Text, View, type ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import type { ExampleStep, WorkLine } from '@/content/types';
import { fadeIn, fadeOut, glide, useEntranceStyle, useRefreshFade } from '@/components/motion';
import { Rich } from '@/components/Rich';
import { Eyebrow, PressTint } from '@/components/ui';
import { color, font, space } from '@/theme';

export const MARGIN_W = 84;
export const EQ_W = 22;

/** The named method under the question: done in ink, current in coral, what's left in grey. */
export function MethodBar({ steps, focus, padX = space.pageX }: { steps: ExampleStep[]; focus: number; padX?: number }) {
  const segColor = (n: number) => (n < focus ? color.ink : n === focus ? color.coral : color.line);
  return (
    <View accessibilityRole="list" accessibilityLabel="The method" style={[styles.bar, { paddingHorizontal: padX }]}>
      {steps.map((s, i) => {
        const n = i + 1;
        const cur = n === focus;
        return (
          <View key={n} style={styles.cell} accessibilityLabel={`Step ${n}, ${s.move}${cur ? ', current' : ''}`}>
            <Animated.View style={[styles.seg, { backgroundColor: segColor(n) }, styles.fill]} />
            <Text style={[styles.label, cur && styles.labelOn]}>{s.move}</Text>
          </View>
        );
      })}
    </View>
  );
}

/**
 * One line of the working, like on paper: = signs line up, the operation is written in the margin in
 * red, and the move's name under it (coral and bold when it's the focused step). A new line fades in.
 */
export function WorkRow({
  line,
  move,
  lhsCol,
  size,
  focused,
  fresh,
  onPress,
}: {
  line: WorkLine;
  /** The step's name, on its first line only. */
  move?: string;
  lhsCol: number;
  size: number;
  focused: boolean;
  fresh: boolean;
  onPress?: () => void;
}) {
  const enter = useEntranceStyle(fresh, 450);
  const text = { fontFamily: font.chem, fontSize: size, lineHeight: Math.round(size * 1.4), color: color.ink };
  return (
    <Animated.View style={enter}>
      <PressTint
        onPress={onPress}
        disabled={!onPress}
        haptic="select"
        accessibilityRole={onPress ? 'button' : undefined}
        accessibilityState={onPress ? { selected: focused } : undefined}
        accessibilityHint={onPress ? 'Shows this step' : undefined}
        style={styles.row}
      >
        <View style={styles.eqRow}>
          <View style={{ width: lhsCol, alignItems: 'flex-end' }}>{line.left ? <Rich style={text}>{line.left}</Rich> : null}</View>
          <Text style={[text, { width: EQ_W, textAlign: 'center' }]}>=</Text>
          <Rich style={[text, { flex: 1, minWidth: 0 }]}>{line.right}</Rich>
        </View>
        <View style={styles.margin}>
          {!!line.op && <Rich style={styles.op}>{line.op}</Rich>}
          {!!move && <Text style={[styles.move, focused && styles.moveOn]}>{move}</Text>}
        </View>
      </PressTint>
    </Animated.View>
  );
}

/** The focused step: what it does and why, then the questions readers ask. */
export function StepDetail({ n, step, open, onToggle }: { n: number; step: ExampleStep; open: Record<number, boolean>; onToggle: (i: number) => void }) {
  const refresh = useRefreshFade(n);
  // On the web a layout transition stretches a row that changes size; that row skips it there.
  const [last, setLast] = useState({ open, changed: [] as number[] });
  if (last.open !== open) {
    const keys = new Set([...Object.keys(open), ...Object.keys(last.open)].map(Number));
    setLast({ open, changed: [...keys].filter((i) => !!open[i] !== !!last.open[i]) });
  }
  const resized = (i: number) => Platform.OS === 'web' && last.changed.includes(i);
  return (
    <Animated.View style={[styles.wrap, refresh]}>
      <Eyebrow>
        Step {n} · {step.move}
      </Eyebrow>
      <Text style={styles.title} accessibilityRole="header">
        {step.move}
      </Text>
      <Rich style={styles.say}>{step.say}</Rich>
      {step.qs && step.qs.length > 0 && (
        <>
          <Eyebrow style={{ marginTop: 10 }}>
            Common questions <Text style={{ letterSpacing: 0 }}>なぜ？</Text>
          </Eyebrow>
          <View style={styles.qs}>
            {step.qs.map(([q, a], i) => (
              <Animated.View key={q} layout={resized(i) ? undefined : glide} style={styles.q}>
                <PressTint onPress={() => onToggle(i)} haptic="select" accessibilityRole="button" accessibilityState={{ expanded: !!open[i] }} style={styles.qHead}>
                  <Text style={styles.qText}>{q}</Text>
                  <Text style={styles.qSign}>{open[i] ? '−' : '+'}</Text>
                </PressTint>
                {open[i] && (
                  <Animated.View entering={fadeIn} exiting={fadeOut}>
                    <Rich style={styles.answer}>{a}</Rich>
                  </Animated.View>
                )}
              </Animated.View>
            ))}
          </View>
        </>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  bar: { flexDirection: 'row', gap: space.xs, paddingTop: 14, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: color.line },
  cell: { flex: 1, minWidth: 0, gap: 7 },
  seg: { height: 3, borderRadius: 2 },
  fill: { transitionProperty: 'backgroundColor', transitionDuration: 260 } as unknown as ViewStyle,
  label: { fontFamily: font.sans, fontSize: 11, lineHeight: 14, color: color.ink2 },
  labelOn: { fontFamily: font.sansBold, color: color.ink },
  row: { flexDirection: 'row', alignItems: 'center', minHeight: 58, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: color.line },
  eqRow: { flex: 1, minWidth: 0, flexDirection: 'row', alignItems: 'baseline' },
  margin: { width: MARGIN_W, paddingLeft: 12, alignItems: 'flex-end', gap: 4 },
  op: { fontFamily: font.sans, fontSize: 12, lineHeight: 17, color: color.shu, textAlign: 'right' },
  move: { fontFamily: font.sans, fontSize: 11, lineHeight: 14, color: color.ink2, textAlign: 'right' },
  moveOn: { fontFamily: font.sansBold, color: color.coral },
  wrap: { marginTop: 26, gap: 14 },
  title: { fontFamily: font.serif, fontSize: 26, lineHeight: 31, color: color.ink },
  say: { fontFamily: font.sans, fontSize: 16, lineHeight: 26, color: color.ink },
  qs: { borderTopWidth: 1, borderTopColor: color.line },
  q: { borderBottomWidth: 1, borderBottomColor: color.line },
  qHead: { minHeight: 50, flexDirection: 'row', alignItems: 'center', gap: 12 },
  qText: { flex: 1, fontFamily: font.sansMedium, fontSize: 15, lineHeight: 21, color: color.ink },
  qSign: { width: 14, textAlign: 'center', fontFamily: font.sans, fontSize: 18, color: color.ink2 },
  answer: { marginBottom: 14, fontFamily: font.sans, fontSize: 15, lineHeight: 24, color: color.ink2 },
});
