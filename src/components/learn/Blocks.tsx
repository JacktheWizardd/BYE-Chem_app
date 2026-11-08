// The blocks a read is made of (docs/learn-template.md "Blocks"). Pictures sit on a lighter band,
// so a read alternates reading and looking (BYE Math's TopicBlocks).
import { lazy, Suspense, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Block, Views } from '@/content/types';
import { tap } from '@/components/feedback';
import { Rich } from '@/components/Rich';
import { Band, Eyebrow } from '@/components/ui';
import { Particles } from '@/figures/Particles';
import { color, FIGURE_MAX, font } from '@/theme';
import { Frames } from './Recap';

// The 3D engine (three.js) loads only when a read uses it.
const ChemFigure = lazy(() => import('bye-chem-engine/native3d').then((m) => ({ default: m.ChemFigure })));

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <View>
      {blocks.map((b, i) => (
        <BlockView key={i} b={b} />
      ))}
    </View>
  );
}

function BlockView({ b }: { b: Block }) {
  if ('p' in b) return <Rich style={s.p}>{b.p}</Rich>;
  if ('h' in b) return <Text style={s.h}>{b.h}</Text>;
  if ('eq' in b)
    return (
      <View style={s.eqBox}>
        {b.eq.map((m) => (
          <Rich key={m} style={s.eq}>
            {m}
          </Rich>
        ))}
      </View>
    );
  if ('key' in b) return <Rich style={s.key}>{b.key}</Rich>;
  if ('work' in b)
    return (
      <View style={s.work}>
        {b.work.map(([line, note], i) => (
          <View key={i} style={s.workRow}>
            <Rich style={s.workLine}>{line}</Rich>
            <Rich style={s.workNote}>{note}</Rich>
          </View>
        ))}
      </View>
    );
  if ('particles' in b)
    return (
      <Band tint style={s.band}>
        <Eyebrow>{`Picture it${b.level ? ` · ${b.level}` : ''}`}</Eyebrow>
        <Particles scene={b.particles} />
        {b.caption ? <Rich style={s.caption}>{b.caption}</Rich> : null}
      </Band>
    );
  if ('frames' in b)
    return (
      <Band tint style={s.band}>
        <Frames frames={b.frames} label={b.label} flush />
      </Band>
    );
  if ('molecule' in b)
    return (
      <Band tint style={s.band}>
        <Eyebrow>In 3D · drag to turn</Eyebrow>
        <View style={s.figure}>
          <Suspense fallback={<View style={{ aspectRatio: 1.05 }} />}>
            <ChemFigure figure={{ kind: 'molecule3d', describe: b.molecule.describe, molecule: b.molecule.formula, size: b.molecule.size ?? 'model' }} />
          </Suspense>
        </View>
      </Band>
    );
  if ('figure' in b)
    return (
      <Band tint style={s.band}>
        <View style={s.figure}>
          <Suspense fallback={<View style={{ aspectRatio: 1.4 }} />}>
            <ChemFigure figure={b.figure.spec} />
          </Suspense>
        </View>
      </Band>
    );
  if ('views' in b) return <LinkedViews views={b.views} />;
  if ('table' in b)
    return (
      <View style={s.table}>
        <View style={s.tr}>
          {b.table.head.map((h, i) => (
            <Rich key={i} style={[s.th, i === b.table.head.length - 1 && s.watch]}>
              {h}
            </Rich>
          ))}
        </View>
        {b.table.rows.map((r, ri) => (
          <View key={ri} style={s.tr}>
            {r.map((c, i) => (
              <Rich key={i} style={[s.td, i === r.length - 1 && s.watch]}>
                {c}
              </Rich>
            ))}
          </View>
        ))}
      </View>
    );
  return null;
}

/** See it · particles · symbols: tap a part and the same thing lights up in every view. */
export function LinkedViews({ views }: { views: Views }) {
  const [on, setOn] = useState<string | null>(null);
  return (
    <View style={{ marginTop: 22 }}>
      <View style={s.viewsHead}>
        <Eyebrow>{views.title}</Eyebrow>
        <Text style={s.hint}>tap to link</Text>
      </View>
      {views.cols.map((c) => (
        <View key={c.label} style={s.view}>
          <Text style={s.viewK}>{c.label.toUpperCase()}</Text>
          <View style={s.viewV}>
            {c.parts.map((part, i) =>
              part.link ? (
                <Pressable
                  key={i}
                  onPress={() => {
                    tap('select');
                    setOn(on === part.link ? null : part.link!);
                  }}
                  accessibilityRole="button"
                  accessibilityState={{ selected: on === part.link }}
                  hitSlop={8}
                >
                  <Rich style={[s.lk, on === part.link && s.lkOn]}>{part.text}</Rich>
                </Pressable>
              ) : (
                <Rich key={i} style={s.viewText}>
                  {part.text}
                </Rich>
              ),
            )}
          </View>
        </View>
      ))}
      <Rich style={s.linkCap}>{on ? views.caption[on]! : 'Tap any underlined part to see the same thing in all three views.'}</Rich>
    </View>
  );
}

const s = StyleSheet.create({
  p: { fontFamily: font.sans, fontSize: 16, lineHeight: 27, color: color.ink, marginTop: 14 },
  h: { fontFamily: font.sansMedium, fontSize: 16, color: color.ink, marginTop: 24 },
  eqBox: { marginTop: 16, paddingVertical: 10, borderTopWidth: 1, borderBottomWidth: 1, borderColor: color.line, gap: 6 },
  eq: { fontFamily: font.chem, fontSize: 20, lineHeight: 28, color: color.ink, textAlign: 'center' },
  key: { marginTop: 18, backgroundColor: color.note, borderRadius: 10, padding: 16, fontFamily: font.sans, fontSize: 15.5, lineHeight: 24, color: color.ink },
  work: { marginTop: 14 },
  workRow: { flexDirection: 'row', alignItems: 'baseline', gap: 10, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: color.line },
  workLine: { flex: 1, fontFamily: font.chem, fontSize: 18, lineHeight: 26, color: color.ink },
  workNote: { maxWidth: 110, fontFamily: font.sans, fontSize: 12, lineHeight: 16, color: color.shu, textAlign: 'right' },
  band: { marginTop: 22 },
  caption: { fontFamily: font.sans, fontSize: 13.5, lineHeight: 20, color: color.ink2, textAlign: 'center', marginTop: 6 },
  figure: { width: '100%', maxWidth: FIGURE_MAX, alignSelf: 'center', marginTop: 10 },
  table: { marginTop: 16, borderTopWidth: 1, borderColor: color.line },
  tr: { flexDirection: 'row', borderBottomWidth: 1, borderColor: color.line },
  th: { flex: 1, paddingVertical: 8, paddingHorizontal: 6, fontFamily: font.sans, fontSize: 12, letterSpacing: 1, color: color.ink2 },
  td: { flex: 1, paddingVertical: 8, paddingHorizontal: 6, fontFamily: font.chem, fontSize: 17, color: color.ink },
  watch: { backgroundColor: color.note },
  viewsHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  hint: { fontFamily: font.sans, fontSize: 12, color: color.axis },
  view: { borderWidth: 1, borderColor: color.line, borderRadius: 10, paddingVertical: 10, paddingHorizontal: 12, backgroundColor: color.card, marginTop: 8, alignItems: 'center' },
  viewK: { fontFamily: font.sans, fontSize: 10.5, letterSpacing: 1.4, color: color.ink2 },
  viewV: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'baseline', gap: 10, marginTop: 6 },
  viewText: { fontFamily: font.chem, fontSize: 17, color: color.ink },
  lk: { fontFamily: font.chem, fontSize: 17, color: color.ink, textDecorationLine: 'underline', textDecorationStyle: 'dotted', textDecorationColor: color.axis },
  lkOn: { color: color.shu, textDecorationStyle: 'solid', textDecorationColor: color.shu },
  linkCap: { fontFamily: font.sans, fontSize: 13.5, lineHeight: 20, color: color.ink2, marginTop: 8, minHeight: 40 },
});
