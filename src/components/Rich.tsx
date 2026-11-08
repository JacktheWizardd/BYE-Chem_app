// Text with a little markup: <sub>, <sup>, <b>, <i>, <g> (grams, blue) and <m> (moles, green).
// Subscripts are real: smaller text moved below the baseline, never Unicode ₂ (it falls back to another font).
import { Fragment, type ReactNode } from 'react';
import { Platform, Text, View, type StyleProp, type TextStyle } from 'react-native';
import { color, font } from '@/theme';

type Tag = 'sub' | 'sup' | 'b' | 'i' | 'g' | 'm';
type Node = string | { tag: Tag; kids: Node[] };

const TOKEN = /<(\/?)(sub|sup|b|i|g|m)>/g;

/** Characters iOS draws as emoji (↔ becomes a blue tile) unless a text-style selector (U+FE0E) follows. */
const EMOJI_PRONE = /([\u2194-\u2199\u21A9\u21AA\u2122\u2139\u00A9\u00AE\u203C\u2049\u25B6\u25C0\u2934\u2935])(?!\uFE0E)/g;
export const asText = (s: string) => s.replace(EMOJI_PRONE, '$1\uFE0E');

export function parseRich(src: string): Node[] {
  const root: Node[] = [];
  const stack: { tag: Tag; kids: Node[] }[] = [];
  const top = () => (stack.length ? stack[stack.length - 1]!.kids : root);
  let last = 0;
  for (const m of src.matchAll(TOKEN)) {
    if (m.index! > last) top().push(asText(src.slice(last, m.index)));
    const [, close, tag] = m as unknown as [string, string, Tag];
    if (close) {
      const node = stack.pop();
      if (node) top().push(node);
    } else stack.push({ tag, kids: [] });
    last = m.index! + m[0].length;
  }
  if (last < src.length) top().push(asText(src.slice(last)));
  while (stack.length) top().push(stack.pop()!);
  return root;
}

/** Plain text for screen readers ("H2O"). */
export const plainRich = (src: string) => src.replace(TOKEN, '');

function Script({ kind, size, style, children }: { kind: 'sub' | 'sup'; size: number; style: StyleProp<TextStyle>; children: ReactNode }) {
  const small = Math.round(size * 0.7 * 10) / 10;
  if (Platform.OS === 'web') {
    // On the web a nested span can sit on its own baseline.
    return <Text style={[style, { fontSize: small, lineHeight: 0, verticalAlign: kind === 'sub' ? 'sub' : 'super' } as unknown as TextStyle]}>{children}</Text>;
  }
  // On iOS and Android an inline View can be moved off the baseline; nested Text cannot.
  return (
    // An inline View sits with its bottom on the baseline, so the subscript needs to drop by more than a span would.
    <View style={{ transform: [{ translateY: kind === 'sub' ? size * 0.4 : -size * 0.3 }] }}>
      <Text style={[style, { fontSize: small, lineHeight: small * 1.15 }]}>{children}</Text>
    </View>
  );
}

function render(nodes: Node[], size: number, base: StyleProp<TextStyle>): ReactNode[] {
  return nodes.map((n, i) => {
    if (typeof n === 'string') return <Fragment key={i}>{n}</Fragment>;
    const kids = render(n.kids, n.tag === 'sub' || n.tag === 'sup' ? size * 0.7 : size, base);
    switch (n.tag) {
      case 'sub':
      case 'sup':
        return <Script key={i} kind={n.tag} size={size} style={base}>{kids}</Script>;
      case 'b':
        return <Text key={i} style={{ fontFamily: font.sansBold }}>{kids}</Text>;
      case 'i':
        return <Text key={i} style={{ fontStyle: 'italic' }}>{kids}</Text>;
      case 'g':
        return <Text key={i} style={{ color: color.ai }}>{kids}</Text>;
      case 'm':
        return <Text key={i} style={{ color: color.matsu }}>{kids}</Text>;
    }
    return null;
  });
}

export function Rich({ children, style, numberOfLines, header }: { children: string; style?: StyleProp<TextStyle>; numberOfLines?: number; header?: boolean }) {
  const flat = (Array.isArray(style) ? Object.assign({}, ...style.filter(Boolean)) : style ?? {}) as TextStyle;
  const size = flat.fontSize ?? 16;
  // Children inherit colour and family from the outer Text; the script pieces need them passed explicitly.
  const base: TextStyle = { color: flat.color ?? color.ink, fontFamily: flat.fontFamily ?? font.sans };
  return (
    <Text style={style} numberOfLines={numberOfLines} accessibilityLabel={plainRich(children)} accessibilityRole={header ? 'header' : undefined}>
      {render(parseRich(children), size, base)}
    </Text>
  );
}
