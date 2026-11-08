// Shared pieces. The press styles, Tabs, ListRow and buttons are BYE Math's (@ b49d14a,
// src/components/ui.tsx); see docs/ui-guide.md §2. BYE Chem adds Page, Tags and the text styles.
import { useEffect, useState, type ReactNode } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View, type PressableProps, type StyleProp, type TextStyle, type ViewStyle } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import type { Level } from '@/content/types';
import { tap } from '@/components/feedback';
import { enterFrom, SPRING } from '@/components/motion';
import { usePage, useLayout } from '@/layout';
import { color, font, space } from '@/theme';
import { Rich } from './Rich';

export function Eyebrow({ children, style }: { children: ReactNode; style?: StyleProp<TextStyle> }) {
  return <Text style={[styles.eyebrow, style]}>{children}</Text>;
}

type PressProps = Omit<PressableProps, 'style' | 'children'> & {
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
  /** The vibration on tap; null for none. */
  haptic?: 'select' | 'press' | null;
};

/** Runs the tap's vibration, then the action. Fired on release, so starting a scroll on a row never buzzes. */
const withTap = (onPress: PressableProps['onPress'], haptic: PressProps['haptic']): PressableProps['onPress'] =>
  onPress &&
  ((e) => {
    if (haptic) tap(haptic);
    onPress(e);
  });

/** A button that gives way as soon as a finger lands on it (4% smaller) and springs back on release. */
export function PressScale({ style, children, onPress, haptic = 'press', ...rest }: PressProps) {
  const scale = useSharedValue(1);
  const anim = useAnimatedStyle(() => ({ transform: [{ scale: scale.get() }] }));
  return (
    <Pressable
      {...rest}
      onPress={withTap(onPress, haptic)}
      onPressIn={() => scale.set(withTiming(0.96, { duration: 90, easing: Easing.out(Easing.quad) }))}
      onPressOut={() => scale.set(withSpring(1, SPRING))}
    >
      <Animated.View style={[style, anim]}>{children}</Animated.View>
    </Pressable>
  );
}

/** A row that tints the moment it's touched and fades back after. With a mouse it tints lightly on hover too. */
export function PressTint({ style, children, onPress, haptic = 'press', ...rest }: PressProps) {
  const tint = useSharedValue(0);
  const hover = useSharedValue(0);
  const anim = useAnimatedStyle(() => ({ opacity: Math.max(tint.get(), hover.get() * 0.7) }));
  const live = !!onPress && !rest.disabled;
  return (
    <Pressable
      {...rest}
      onPress={withTap(onPress, haptic)}
      onPressIn={() => tint.set(withTiming(1, { duration: 60 }))}
      onPressOut={() => tint.set(withTiming(0, { duration: 260 }))}
      onHoverIn={() => live && hover.set(withTiming(1, { duration: 90 }))}
      onHoverOut={() => hover.set(withTiming(0, { duration: 160 }))}
      style={style}
    >
      <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, styles.tint, anim]} />
      {children}
    </Pressable>
  );
}

/** A quiet control (back, a link) that dims while held. */
export function PressFade({ style, children, onPress, haptic = 'press', ...rest }: PressProps) {
  const dim = useSharedValue(1);
  const anim = useAnimatedStyle(() => ({ opacity: dim.get() }));
  return (
    <Pressable
      {...rest}
      onPress={withTap(onPress, haptic)}
      onPressIn={() => dim.set(withTiming(0.5, { duration: 60 }))}
      onPressOut={() => dim.set(withTiming(1, { duration: 200 }))}
      onHoverIn={() => dim.set(withTiming(0.7, { duration: 90 }))}
      onHoverOut={() => dim.set(withTiming(1, { duration: 160 }))}
    >
      <Animated.View style={[style, anim]}>{children}</Animated.View>
    </Pressable>
  );
}

/** Back to the parent page. On desktop the open sidebar does this job, so it isn't shown there. */
export function BackButton({ label, onPress }: { label: string; onPress: () => void }) {
  const { sidebar } = useLayout();
  if (sidebar === 'open') return null;
  return (
    <PressFade onPress={onPress} accessibilityRole="button" accessibilityLabel={`Back to ${label}`} hitSlop={8} style={styles.back}>
      <Svg width={20} height={14} viewBox="0 0 20 14" fill="none" stroke={color.ink2} strokeWidth={1.8} strokeLinecap="round">
        <Path d="M19 7H2M7 1L1 7l6 6" />
      </Svg>
      <Text style={styles.backText}>{label}</Text>
    </PressFade>
  );
}

export function Chevron({ size = 16, stroke = color.ink }: { size?: number; stroke?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={2} strokeLinecap="round">
      <Path d="M9 18l6-6-6-6" />
    </Svg>
  );
}

export function ArrowDown() {
  return (
    <Svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={color.onInk} strokeWidth={2.4} strokeLinecap="round">
      <Path d="M12 5v14M6 13l6 6 6-6" />
    </Svg>
  );
}

export interface TabItem {
  key: string;
  label: string;
}

/** Web: toggle buttons, because Safari on iPhone holds a tap on role "tab" for ~33 ms. The apps keep real tabs. */
const WEB = Platform.OS === 'web';

/** Text tabs: the active one in ink with a coral underline that slides between tabs, the rest in axis grey. */
export function Tabs({
  items,
  active,
  onChange,
  size = 16,
  gap = 26,
  label,
  hairline = true,
  style,
}: {
  items: TabItem[];
  active: string;
  onChange: (key: string) => void;
  size?: number;
  gap?: number;
  label: string;
  hairline?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const [boxes, setBoxes] = useState<Record<string, { x: number; w: number }>>({});
  const x = useSharedValue(0);
  const w = useSharedValue(0);
  const placed = useSharedValue(0);
  const box = boxes[active];
  const bx = box?.x;
  const bw = box?.w;
  useEffect(() => {
    if (bx == null || bw == null) return;
    if (placed.get() === 0) {
      x.set(bx);
      w.set(bw);
      placed.set(1);
    } else {
      x.set(withSpring(bx, SPRING));
      w.set(withSpring(bw, SPRING));
    }
  }, [bx, bw, x, w, placed]);
  const underline = useAnimatedStyle(() => ({ opacity: placed.get(), width: w.get(), transform: [{ translateX: x.get() }] }));

  return (
    <View role={WEB ? 'group' : 'tablist'} accessibilityLabel={label} style={[styles.tabs, { gap }, hairline && styles.tabsLine, style]}>
      {items.map((t) => {
        const on = t.key === active;
        return (
          <Pressable
            key={t.key}
            role={WEB ? 'button' : 'tab'}
            accessibilityState={WEB ? undefined : { selected: on }}
            aria-pressed={WEB ? on : undefined}
            onPress={() => {
              if (on) return;
              tap('select');
              onChange(t.key);
            }}
            onLayout={(e) => {
              const { x: lx, width } = e.nativeEvent.layout;
              setBoxes((b) => (b[t.key]?.x === lx && b[t.key]?.w === width ? b : { ...b, [t.key]: { x: lx, w: width } }));
            }}
            style={styles.tab}
          >
            <Animated.Text
              style={{
                fontFamily: font.sansMedium,
                fontSize: size,
                lineHeight: size + 7,
                color: on ? color.ink : color.axis,
                transitionProperty: 'color',
                transitionDuration: 180,
              }}
            >
              {t.label}
            </Animated.Text>
          </Pressable>
        );
      })}
      <Animated.View pointerEvents="none" style={[styles.underline, underline]} />
    </View>
  );
}

/** What a set of tabs shows. When the tab changes, the new content comes in from the side of the tab you went to. */
export function TabPanel({ tab, order, children }: { tab: string; order: readonly string[]; children: ReactNode }) {
  const [shown, setShown] = useState(tab);
  const [dir, setDir] = useState(0);
  if (tab !== shown) {
    setShown(tab);
    setDir(Math.sign(order.indexOf(tab) - order.indexOf(shown)) || 1);
  }
  return (
    <Animated.View key={tab} entering={dir ? enterFrom(dir) : undefined}>
      {children}
    </Animated.View>
  );
}

/** A list row: serif numeral, title, meta. Rows that aren't written yet are greyed and inert. */
export function ListRow({
  n,
  numeralWidth = 30,
  minHeight = 60,
  enabled,
  onPress,
  children,
  meta,
  last,
}: {
  n: string;
  numeralWidth?: number;
  minHeight?: number;
  enabled: boolean;
  onPress?: () => void;
  children: ReactNode;
  meta?: string;
  last?: boolean;
}) {
  return (
    <PressTint
      onPress={enabled ? onPress : undefined}
      disabled={!enabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: !enabled }}
      style={[styles.row, { minHeight }, last && { borderBottomWidth: 0 }]}
    >
      <Text style={[styles.numeral, { width: numeralWidth }, !enabled && { color: color.axis }]}>{n}</Text>
      <View style={styles.rowBody}>{children}</View>
      {meta != null && <Text style={[styles.meta, { color: enabled ? color.ink2 : color.axis }]}>{meta}</Text>}
    </PressTint>
  );
}

export function RowTitle({ enabled, children }: { enabled: boolean; children: string }) {
  return <Rich style={{ fontFamily: enabled ? font.sansMedium : font.sans, fontSize: 16, lineHeight: 22, color: enabled ? color.ink : color.axis }}>{children}</Rich>;
}

/** The one-line question or gist under a row title. */
export function RowSub({ children }: { children: string }) {
  return <Rich style={styles.rowSub}>{children}</Rich>;
}

export function PrimaryButton({ label, onPress, icon }: { label: string; onPress: () => void; icon?: ReactNode }) {
  return (
    <PressScale onPress={onPress} accessibilityRole="button" style={styles.primary}>
      <Text style={styles.primaryText}>{label}</Text>
      {icon}
    </PressScale>
  );
}

export function SecondaryButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <PressScale onPress={onPress} accessibilityRole="button" style={styles.secondary}>
      <Text style={styles.secondaryText}>{label}</Text>
    </PressScale>
  );
}

/** A scrolling page with the layout's padding (wide margins on desktop, so text stays READ_MAX wide). */
export function Page({ children }: { children: ReactNode }) {
  const P = usePage();
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={{ paddingHorizontal: P.pageX, paddingTop: P.top, paddingBottom: P.bottom }} keyboardShouldPersistTaps="handled">
      {children}
    </ScrollView>
  );
}

/** One part of a page, edge to edge. Every other part sits on a lighter band (BYE Math's learn/Band). */
export function Band({ tint, children, style }: { tint?: boolean; children: ReactNode; style?: StyleProp<ViewStyle> }) {
  const { pageX } = usePage();
  return <View style={[styles.band, { marginHorizontal: -pageX, paddingHorizontal: pageX }, tint && styles.bandTint, style]}>{children}</View>;
}

/** An Eyebrow with something on its right (a count, "tap to link"). */
export function Head({ eyebrow, meta, style }: { eyebrow: string; meta?: string; style?: StyleProp<ViewStyle> }) {
  return (
    <View style={[styles.head, style]}>
      <Eyebrow>{eyebrow}</Eyebrow>
      {meta ? <Text style={styles.meta}>{meta}</Text> : null}
    </View>
  );
}

export const Title = ({ children, size = 34 }: { children: string; size?: number }) => (
  <Rich style={[styles.title, { fontSize: size, lineHeight: Math.round(size * 1.2) }]} header>
    {children}
  </Rich>
);
export const Plain = ({ children, style }: { children: string; style?: StyleProp<TextStyle> }) => <Rich style={[styles.plain, style]}>{children}</Rich>;
export const Para = ({ children, style }: { children: string; style?: StyleProp<TextStyle> }) => <Rich style={[styles.para, style]}>{children}</Rich>;
export const Small = ({ children, style }: { children: string; style?: StyleProp<TextStyle> }) => <Rich style={[styles.small, style]}>{children}</Rich>;

const LEVEL_LABEL: Record<Level, string> = { Intro: 'Intro', '1A': 'Chem 1A', '1B': 'Chem 1B', AP: 'AP' };
/** Course tags (words, not just colour), and an optional note such as "Tro ch. 4". */
export function Tags({ levels, note }: { levels: Level[]; note?: string }) {
  return (
    <View style={styles.tags}>
      {levels.map((l) => (
        <Text key={l} style={[styles.tag, l === 'Intro' && styles.tagIntro, l === '1A' && styles.tag1A, l === 'AP' && styles.tagAP, l === '1B' && styles.tag1B]}>
          {LEVEL_LABEL[l]}
        </Text>
      ))}
      {note ? <Text style={styles.tagNote}>{note}</Text> : null}
    </View>
  );
}

export const styles = StyleSheet.create({
  eyebrow: { fontFamily: font.sans, fontSize: 12, lineHeight: 16, letterSpacing: 2.2, textTransform: 'uppercase', color: color.ink2 },
  back: { flexDirection: 'row', alignItems: 'center', gap: 10, minHeight: 44, alignSelf: 'flex-start' },
  backText: { fontFamily: font.sans, fontSize: 15, color: color.ink2 },
  tabs: { flexDirection: 'row' },
  tabsLine: { borderBottomWidth: 1, borderBottomColor: color.line },
  tab: { paddingBottom: 10, borderBottomWidth: 2, borderBottomColor: 'transparent', marginBottom: -1, minHeight: 44, justifyContent: 'flex-end' },
  underline: { position: 'absolute', left: 0, bottom: -1, height: 2, backgroundColor: color.coral },
  row: { flexDirection: 'row', alignItems: 'center', gap: 16, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: color.line },
  tint: { backgroundColor: color.note },
  rowBody: { flex: 1 },
  rowSub: { fontFamily: font.sans, fontSize: 13.5, lineHeight: 19, color: color.ink2, marginTop: 2 },
  numeral: { fontFamily: font.serif, fontSize: 17, color: color.ink2, alignSelf: 'flex-start', lineHeight: 22 },
  meta: { fontFamily: font.sans, fontSize: 13, color: color.ink2 },
  primary: { minHeight: 52, paddingHorizontal: 24, borderRadius: 26, backgroundColor: color.ink, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: space.sm },
  primaryText: { fontFamily: font.sansMedium, fontSize: 16, color: color.onInk },
  secondary: { minHeight: 52, paddingHorizontal: 22, borderRadius: 26, borderWidth: 1, borderColor: color.line, backgroundColor: color.ground, justifyContent: 'center' },
  secondaryText: { fontFamily: font.sans, fontSize: 16, color: color.ink },
  scroll: { flex: 1, backgroundColor: color.ground },
  band: { paddingVertical: 26 },
  bandTint: { backgroundColor: color.band, borderTopWidth: 1, borderBottomWidth: 1, borderColor: color.line },
  head: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, marginBottom: 6 },
  title: { fontFamily: font.serif, color: color.ink, marginTop: 6, marginBottom: 6 },
  plain: { fontFamily: font.sans, fontSize: 16, lineHeight: 26, color: color.ink2 },
  para: { fontFamily: font.sans, fontSize: 16, lineHeight: 27, color: color.ink, marginTop: 14 },
  small: { fontFamily: font.sans, fontSize: 13, lineHeight: 20, color: color.ink2 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 5, marginTop: 8 },
  tag: { fontFamily: font.sans, fontSize: 11, lineHeight: 16, letterSpacing: 0.4, paddingHorizontal: 7, borderRadius: 8, borderWidth: 1, borderColor: color.line, color: color.ink2, backgroundColor: color.band, overflow: 'hidden' },
  tagIntro: { borderColor: '#c9d6e6', color: color.ai },
  tag1A: { borderColor: '#bfd3c6', color: color.matsu },
  tag1B: { color: color.muted },
  tagAP: { borderColor: color.axis, color: color.ink },
  tagNote: { fontFamily: font.sans, fontSize: 12, lineHeight: 16, color: color.muted, marginLeft: 2 },
});
