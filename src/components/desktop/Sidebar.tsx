// Desktop: the book down the left side (BYE Math @ b49d14a, src/components/desktop/Sidebar.tsx).
// The wordmark, Learn · Lab · Tools, the chapters, the open chapter's sections, and under the current
// section its reads and worked examples. On a worked example it folds to a rail that opens over the page.
import { router, useGlobalSearchParams, usePathname, type Href } from 'expo-router';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { CHAPTER_MAP, chapterOf, isWritten, useSection } from '@/content';
import { SPRING } from '@/components/motion';
import { Rich } from '@/components/Rich';
import { SoundsSwitch } from '@/components/SoundsSwitch';
import { PressFade, PressTint, Tabs } from '@/components/ui';
import { useLayout } from '@/layout';
import { color, font, SIDEBAR_W, space, RAIL_W } from '@/theme';

/** Which chapter, section, read or example the current page is, read off the route. */
function useWhere() {
  const pathname = usePathname();
  const params = useGlobalSearchParams<{ tab?: string }>();
  return useMemo(() => {
    const [, kind, a, b] = pathname.split('/');
    let chapter: number | undefined;
    let section: string | undefined;
    let read: string | undefined;
    let example: string | undefined;
    if (kind === 'chapter') chapter = Number(a);
    if (kind === 'section' && a) section = a;
    if (kind === 'learn' && a) [section, read] = [a, b];
    if (kind === 'example' && a) [section, example] = [a.split('-')[0], a];
    if (section) chapter = chapterOf(section);
    const tab = kind ? 'learn' : params.tab === 'lab' || params.tab === 'tools' ? params.tab : 'learn';
    return { pathname, chapter, section, read, example, tab };
  }, [pathname, params.tab]);
}
type Where = ReturnType<typeof useWhere>;

export function Sidebar() {
  const L = useLayout();
  const where = useWhere();
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === where.pathname;
  const setOpen = (o: boolean) => setOpenOn(o ? where.pathname : null);
  useEffect(() => {
    if (Platform.OS !== 'web' || !open) return;
    const esc = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      e.stopPropagation();
      e.preventDefault();
      setOpenOn(null);
    };
    document.addEventListener('keydown', esc, true);
    return () => document.removeEventListener('keydown', esc, true);
  }, [open]);
  if (L.sidebar === 'open') return <Panel where={where} width={L.sideW} />;
  return <Rail where={where} open={open} setOpen={setOpen} />;
}

function Rail({ where, open, setOpen }: { where: Where; open: boolean; setOpen: (o: boolean) => void }) {
  const insets = useSafeAreaInsets();
  const x = useSharedValue(-SIDEBAR_W - 40);
  const fade = useSharedValue(0);
  useEffect(() => {
    x.set(withSpring(open ? 0 : -SIDEBAR_W - 40, SPRING));
    fade.set(withTiming(open ? 1 : 0, { duration: 180 }));
  }, [open, x, fade]);
  const panel = useAnimatedStyle(() => ({ transform: [{ translateX: x.get() }] }));
  const scrim = useAnimatedStyle(() => ({ opacity: fade.get() }));
  return (
    <View style={[styles.rail, { paddingTop: insets.top + 18 }]}>
      <PressFade onPress={() => router.push('/')} accessibilityRole="link" accessibilityLabel="BYE Chem home" hitSlop={8}>
        <Text style={[styles.wordmark, { fontSize: 22 }]}>
          B<Text style={{ color: color.too }}>.</Text>
        </Text>
      </PressFade>
      <PressFade onPress={() => setOpen(true)} accessibilityRole="button" accessibilityLabel="Open the book" style={styles.menu} haptic="select">
        <Svg width={20} height={14} viewBox="0 0 20 14" fill="none" stroke={color.ink} strokeWidth={1.6} strokeLinecap="round">
          <Path d="M1 1h18M1 7h18M1 13h18" />
        </Svg>
      </PressFade>
      <Animated.View pointerEvents={open ? 'auto' : 'none'} style={[styles.scrim, scrim]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={() => setOpen(false)} accessibilityLabel="Close the book" />
      </Animated.View>
      <Animated.View pointerEvents={open ? 'auto' : 'none'} aria-hidden={!open} style={[styles.overlay, open && styles.overlayShadow, panel]}>
        <Panel where={where} width={SIDEBAR_W} />
      </Animated.View>
    </View>
  );
}

function Panel({ where, width }: { where: Where; width: number }) {
  const insets = useSafeAreaInsets();
  const onHub = where.pathname === '/';
  return (
    <View style={[styles.panel, { width }]}>
      <View style={[styles.brand, { paddingTop: insets.top + 14 }]}>
        <PressFade onPress={() => !onHub && router.push('/')} accessibilityRole="link" accessibilityLabel="BYE Chem home" style={styles.brandRow}>
          <Text style={styles.wordmark}>
            BYE<Text style={{ color: color.too }}>.</Text>
          </Text>
          <View style={styles.brandRule} />
          <View>
            <Text style={styles.brandSub}>Chem</Text>
            <Text style={[styles.brandSub, { fontSize: 14 }]}>一歩ずつ</Text>
          </View>
        </PressFade>
      </View>
      <Tabs
        label="Home"
        items={[
          { key: 'learn', label: 'Learn' },
          { key: 'lab', label: 'Lab' },
          { key: 'tools', label: 'Tools' },
        ]}
        active={where.tab}
        onChange={(k) => router.push(`/?tab=${k}` as Href)}
        size={14}
        gap={22}
        style={styles.tabs}
      />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingVertical: 14 }}>
        <Text style={styles.head}>Chapters · our order</Text>
        {CHAPTER_MAP.map((c) => {
          const isOpen = where.chapter === c.num;
          return (
            <View key={c.num}>
              <Row n={String(c.num)} title={c.title} cur={isOpen && !where.section} open={isOpen} onPress={() => router.push(`/chapter/${c.num}` as Href)} />
              {isOpen &&
                c.sections.map((s) => {
                  const cur = s.id === where.section;
                  return (
                    <View key={s.id}>
                      <Row n={s.id} title={s.title} level={1} open={cur} cur={cur && !where.read && !where.example} soon={!isWritten(s.id)} onPress={isWritten(s.id) ? () => router.push(`/section/${s.id}` as Href) : undefined} />
                      {cur && isWritten(s.id) && (
                        <Suspense fallback={null}>
                          <SectionParts id={s.id} where={where} />
                        </Suspense>
                      )}
                    </View>
                  );
                })}
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.foot}>
        <SoundsSwitch />
      </View>
    </View>
  );
}

/** Under the current section: its reads, then its worked examples. */
function SectionParts({ id, where }: { id: string; where: Where }) {
  const c = useSection(id);
  if (!c) return null;
  return (
    <>
      {c.reads.map((r, i) => (
        <Row key={r.id} n={String(i + 1)} title={r.title} level={2} cur={where.read === r.id} onPress={() => router.push(`/learn/${id}/${r.id}` as Href)} />
      ))}
      {c.examples.map((e, i) => (
        <Row key={e.id} n={`E${i + 1}`} title={`Example ${i + 1} · ${e.level}`} level={2} cur={where.example === e.id} onPress={() => router.push(`/example/${e.id}` as Href)} />
      ))}
    </>
  );
}

function Row({ n, title, level = 0, cur, open, soon, onPress }: { n?: string; title: string; level?: 0 | 1 | 2; cur?: boolean; open?: boolean; soon?: boolean; onPress?: () => void }) {
  return (
    <PressTint
      onPress={onPress}
      disabled={!onPress}
      haptic="select"
      accessibilityRole="link"
      accessibilityState={{ selected: !!cur, disabled: !onPress }}
      style={[styles.row, { paddingLeft: [space.lg + 2, 50, 80][level] }]}
    >
      {cur && <View style={styles.curBar} />}
      {n != null && <Text style={[styles.n, level > 0 && styles.nSmall]}>{n}</Text>}
      <Rich
        style={[
          styles.title,
          level > 0 && styles.titleSmall,
          (open || cur) && { color: color.ink, fontFamily: cur ? font.sansBold : font.sansMedium },
          soon && { color: color.axis },
        ]}
      >
        {title}
      </Rich>
      {soon && <Text style={styles.meta}>Soon</Text>}
    </PressTint>
  );
}

const styles = StyleSheet.create({
  panel: { flexShrink: 0, height: '100%', backgroundColor: color.ground, borderRightWidth: 1, borderRightColor: color.line },
  brand: { paddingHorizontal: space.pageX, paddingBottom: 18 },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 14, alignSelf: 'flex-start' },
  wordmark: { fontFamily: font.grotesk, fontSize: 30, letterSpacing: -0.8, color: color.ink },
  brandRule: { width: 1, height: 34, backgroundColor: color.line },
  brandSub: { fontFamily: font.sans, fontSize: 15, lineHeight: 17, color: color.ink2 },
  tabs: { paddingHorizontal: space.lg + 2 },
  head: { paddingHorizontal: space.lg + 2, paddingTop: 12, paddingBottom: 8, fontFamily: font.sans, fontSize: 11, letterSpacing: 1.8, textTransform: 'uppercase', color: color.axis },
  row: { flexDirection: 'row', alignItems: 'baseline', gap: 8, paddingRight: 18, paddingVertical: 8, minHeight: 36 },
  curBar: { position: 'absolute', left: 0, top: 6, bottom: 6, width: 3, borderTopRightRadius: 3, borderBottomRightRadius: 3, backgroundColor: color.coral },
  n: { width: 22, fontFamily: font.serif, fontSize: 14, color: color.axis },
  nSmall: { width: 28, fontFamily: font.sans, fontSize: 12 },
  title: { flex: 1, fontFamily: font.sans, fontSize: 14.5, lineHeight: 20, color: color.ink },
  titleSmall: { fontSize: 13.5, lineHeight: 19, color: color.ink2 },
  meta: { fontFamily: font.sans, fontSize: 12, color: color.axis },
  foot: { borderTopWidth: 1, borderTopColor: color.line, paddingHorizontal: space.lg + 2, paddingTop: 2, paddingBottom: 10 },
  rail: { width: RAIL_W, height: '100%', alignItems: 'center', gap: 14, borderRightWidth: 1, borderRightColor: color.line, backgroundColor: color.ground, zIndex: 10 },
  menu: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  scrim: { position: 'absolute', top: 0, bottom: 0, left: 0, width: 4000, backgroundColor: 'rgba(30,28,25,0.12)' },
  overlay: { position: 'absolute', top: 0, bottom: 0, left: 0, width: SIDEBAR_W },
  overlayShadow: { boxShadow: '12px 0 40px -24px rgba(30,28,25,0.45)' },
});
