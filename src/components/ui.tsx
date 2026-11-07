// Shared pieces in the BYE look (design/chem-chapters.html).
import { Link, type Href } from 'expo-router';
import type { ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, type StyleProp, type TextStyle, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { Level } from '@/content/types';
import { color, font, MAX_WIDTH, PAD, TAP } from '@/theme';
import { Rich } from './Rich';

export function Screen({ children }: { children: ReactNode }) {
  const inset = useSafeAreaInsets();
  return (
    <ScrollView style={s.scroll} contentContainerStyle={[s.content, { paddingTop: inset.top + 8, paddingBottom: inset.bottom + 48 }]} keyboardShouldPersistTaps="handled">
      <View style={s.column}>{children}</View>
    </ScrollView>
  );
}

export function Back({ href, label }: { href: Href; label: string }) {
  return (
    <Link href={href} asChild>
      <Pressable style={s.back} accessibilityRole="link" accessibilityLabel={`Back to ${label}`} hitSlop={8}>
        <View style={s.backChev} />
        <Text style={s.backText}>{label}</Text>
      </Pressable>
    </Link>
  );
}

export const Eyebrow = ({ children, style }: { children: string; style?: StyleProp<TextStyle> }) => <Text style={[s.eyebrow, style]}>{children.toUpperCase()}</Text>;

export function Head({ eyebrow, meta, right }: { eyebrow: string; meta?: string; right?: ReactNode }) {
  return (
    <View style={s.head}>
      <Eyebrow>{eyebrow}</Eyebrow>
      {right ?? (meta ? <Text style={s.meta}>{meta}</Text> : null)}
    </View>
  );
}

export const Title = ({ children, size = 34 }: { children: string; size?: number }) => (
  <Text style={[s.title, { fontSize: size, lineHeight: Math.round(size * 1.24) }]} accessibilityRole="header">{children}</Text>
);

export const Plain = ({ children, style }: { children: string; style?: StyleProp<TextStyle> }) => <Rich style={[s.plain, style]}>{children}</Rich>;
export const Para = ({ children, style }: { children: string; style?: StyleProp<TextStyle> }) => <Rich style={[s.para, style]}>{children}</Rich>;
export const Small = ({ children, style }: { children: string; style?: StyleProp<TextStyle> }) => <Rich style={[s.small, style]}>{children}</Rich>;

const LEVEL_LABEL: Record<Level, string> = { Intro: 'Intro', '1A': 'Chem 1A', '1B': 'Chem 1B', AP: 'AP' };
export function Tags({ levels, tro }: { levels: Level[]; tro?: string }) {
  return (
    <View style={s.tags}>
      {levels.map((l) => (
        <Text key={l} style={[s.tag, l === 'Intro' && s.tagIntro, l === '1A' && s.tag1A, l === 'AP' && s.tagAP, l === '1B' && s.tag1B]}>{LEVEL_LABEL[l]}</Text>
      ))}
      {tro ? <Text style={s.tro}>{tro}</Text> : null}
    </View>
  );
}

export function Band({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  return <View style={[s.band, style]}>{children}</View>;
}

/** A tappable list row with a chevron (or a quiet "soon" row when there is no href). */
export function Row({ href, num, title, sub, children, muted }: { href?: Href; num?: string; title: string; sub?: string; children?: ReactNode; muted?: boolean }) {
  const body = (
    <View style={s.row}>
      {num !== undefined ? <Text style={[s.rowNum, muted && s.mutedText]}>{num}</Text> : null}
      <View style={{ flex: 1 }}>
        <Rich style={[s.rowTitle, muted && s.mutedText]}>{title}</Rich>
        {sub ? <Rich style={s.rowSub}>{sub}</Rich> : null}
        {children}
      </View>
      {href ? <View style={s.chev} /> : null}
    </View>
  );
  if (!href) return body;
  return (
    <Link href={href} asChild>
      <Pressable accessibilityRole="link" style={({ pressed }) => [pressed && { opacity: 0.6 }]}>{body}</Pressable>
    </Link>
  );
}

export function Button({ label, onPress, href, ghost }: { label: string; onPress?: () => void; href?: Href; ghost?: boolean }) {
  const btn = (
    <Pressable onPress={onPress} accessibilityRole="button" style={({ pressed }) => [s.btn, ghost && s.btnGhost, pressed && { opacity: 0.75 }]}>
      <Text style={[s.btnText, ghost && { color: color.ink }]}>{label}</Text>
    </Pressable>
  );
  return href ? <Link href={href} asChild>{btn}</Link> : btn;
}

/** Underlined tabs (Home's Learn · Lab · Tools, a section's Learn · Simple · Medium · Hard). */
export function Tabs<T extends string>({ tabs, value, onChange, labels }: { tabs: readonly T[]; value: T; onChange(t: T): void; labels?: Partial<Record<T, string>> }) {
  return (
    <View style={s.tabs} accessibilityRole="tablist">
      {tabs.map((t) => (
        <Pressable key={t} onPress={() => onChange(t)} accessibilityRole="tab" accessibilityState={{ selected: t === value }} style={[s.tab, t === value && s.tabOn]} hitSlop={6}>
          <Text style={[s.tabText, t === value && s.tabTextOn]}>{labels?.[t] ?? t}</Text>
        </Pressable>
      ))}
    </View>
  );
}

export const s = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: color.ground },
  content: { paddingHorizontal: PAD, alignItems: 'center' },
  column: { width: '100%', maxWidth: MAX_WIDTH },
  back: { flexDirection: 'row', alignItems: 'center', gap: 10, minHeight: TAP, alignSelf: 'flex-start' },
  backChev: { width: 8, height: 8, borderLeftWidth: 1.5, borderBottomWidth: 1.5, borderColor: color.ink2, transform: [{ rotate: '45deg' }] },
  backText: { fontFamily: font.sans, fontSize: 15, color: color.ink2 },
  eyebrow: { fontFamily: font.sans, fontSize: 12, lineHeight: 16, letterSpacing: 2.2, color: color.ink2 },
  head: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, marginBottom: 4, gap: 12 },
  meta: { fontFamily: font.sans, fontSize: 13, color: color.ink2 },
  title: { fontFamily: font.serif, color: color.ink, marginTop: 6, marginBottom: 6 },
  plain: { fontFamily: font.sans, fontSize: 16, lineHeight: 26, color: color.ink2 },
  para: { fontFamily: font.sans, fontSize: 15.5, lineHeight: 25, color: color.ink, marginTop: 10 },
  small: { fontFamily: font.sans, fontSize: 13, lineHeight: 20, color: color.ink2 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 5, marginTop: 6 },
  tag: { fontFamily: font.sans, fontSize: 11, lineHeight: 16, letterSpacing: 0.4, paddingHorizontal: 7, borderRadius: 8, borderWidth: 1, borderColor: color.line, color: color.ink2, backgroundColor: color.band, overflow: 'hidden' },
  tagIntro: { borderColor: '#c9d6e6', color: color.mass },
  tag1A: { borderColor: '#bfd3c6', color: color.mol },
  tag1B: { color: color.muted },
  tagAP: { borderColor: color.axis, color: color.ink },
  tro: { fontFamily: font.sans, fontSize: 11.5, lineHeight: 16, color: color.muted, marginLeft: 2 },
  band: { marginHorizontal: -PAD, paddingHorizontal: PAD, paddingVertical: 18, marginTop: 20, backgroundColor: color.band, borderTopWidth: 1, borderBottomWidth: 1, borderColor: color.line },
  row: { flexDirection: 'row', gap: 14, paddingVertical: 12, borderBottomWidth: 1, borderColor: color.line, alignItems: 'flex-start', minHeight: TAP },
  rowNum: { width: 34, fontFamily: font.serif, fontSize: 18, lineHeight: 22, color: color.ink2 },
  rowTitle: { fontFamily: font.sansMedium, fontSize: 16, lineHeight: 21, color: color.ink },
  rowSub: { fontFamily: font.sans, fontSize: 13.5, lineHeight: 19, color: color.ink2, marginTop: 2 },
  mutedText: { color: color.muted },
  chev: { alignSelf: 'center', width: 7, height: 7, borderRightWidth: 1.5, borderTopWidth: 1.5, borderColor: color.axis, transform: [{ rotate: '45deg' }], marginRight: 3 },
  btn: { alignSelf: 'center', minHeight: 50, paddingHorizontal: 24, borderRadius: 25, backgroundColor: color.ink, justifyContent: 'center', marginTop: 22 },
  btnGhost: { backgroundColor: 'transparent', borderWidth: 1, borderColor: color.line },
  btnText: { fontFamily: font.sansMedium, fontSize: 16, color: color.onInk },
  tabs: { flexDirection: 'row', gap: 24, marginTop: 20, borderBottomWidth: 1, borderColor: color.line },
  tab: { paddingBottom: 10, minHeight: TAP, justifyContent: 'flex-end', borderBottomWidth: 2, borderColor: 'transparent', marginBottom: -1 },
  tabOn: { borderColor: color.coral },
  tabText: { fontFamily: font.sans, fontSize: 16, color: color.muted },
  tabTextOn: { color: color.ink },
});
