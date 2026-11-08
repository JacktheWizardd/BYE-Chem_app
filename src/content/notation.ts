// The notation rules a machine can check (docs/notation.md, "What validateRich catches").
// validateRich returns one "name: message" string per issue; an empty list means the string is fine.

/** The only tags Rich renders (src/components/Rich.tsx). */
export const RICH_TAGS = ['sub', 'sup', 'b', 'i', 'g', 'm'] as const;
type RichTag = (typeof RICH_TAGS)[number];
const isRichTag = (t: string): t is RichTag => (RICH_TAGS as readonly string[]).includes(t);

const TAG_AT = /<(\/?)([A-Za-z][A-Za-z0-9]*)([^<>]*)>/y;
const hex = (ch: string) => `U+${ch.codePointAt(0)!.toString(16).toUpperCase().padStart(4, '0')}`;

/** Rules on the whole string: [issue name, pattern, message]. */
const TEXT_RULES: [string, RegExp, string][] = [
  ['unicode-script', /[⁰-₟¹²³ᴬ-ᵪ]/g, 'is a Unicode sub/superscript; use <sub> or <sup>'],
  ['times-x', /\d\s*[xX*]\s*\d/g, 'uses x or * as a times sign; use × (U+00D7)'],
  ['minus-hyphen', /(?:^|[\s(=+×÷])-(?=\d)/g, 'uses a hyphen as a minus sign; use − (U+2212)'],
  ['ascii-arrow', /<?[-=]{1,2}>/g, 'is a typed arrow; use → (U+2192), ⇌ (U+21CC) or ↔ (U+2194)'],
  ['state-styled', /<(sub|sup|i)>\s*\((?:s|l|g|aq)\)\s*<\/\1>|\(<i>(?:s|l|g|aq)<\/i>\)/g, 'styles a state symbol; write (aq), (s), (l), (g) full size and upright'],
  ['unit-glued', /(?:^|[^\w.])\d+(?:\.\d+)?(?:mmol|mol|mL|mg|kg|kJ|kPa|atm|nm|pm|g|L|J|°C)(?![A-Za-z])/g, 'has no space between the number and its unit'],
  ['kelvin-degree', /°\s?K(?![A-Za-z])/g, 'puts a degree sign on kelvin; write 298 K'],
  ['e-notation', /(?:^|[^\w.])\d+(?:\.\d+)?[eE][+−-]?\d+(?!\w)/g, 'uses E notation; write × 10<sup>n</sup>'],
  ['wrong-dot', /[⋅∙]|(?:<\/sub>|[A-Za-z)])[.*]\d*H<sub>2<\/sub>O/g, 'uses the wrong dot; join a hydrate with · (U+00B7)'],
];

export function validateRich(src: string): string[] {
  const issues: string[] = [];
  const add = (name: string, msg: string) => issues.push(`${name}: ${msg}`);

  // Tags: known, balanced, closed in order, not empty. Collect the text inside <sup> as we go.
  const open: { tag: RichTag; at: number; kids: number }[] = [];
  let supText = '';
  let last = 0;
  const text = (s: string) => {
    if (!s) return;
    if (open.length) open[open.length - 1]!.kids++;
    if (open.some((o) => o.tag === 'sup')) supText += s;
  };
  for (let i = src.indexOf('<'); i !== -1; i = src.indexOf('<', i + 1)) {
    if (!/[A-Za-z/]/.test(src[i + 1] ?? '')) continue; // "pH < 7" and "<=>" are not tags
    TAG_AT.lastIndex = i;
    const m = TAG_AT.exec(src);
    if (!m) {
      add('tag-broken', `"${src.slice(i, i + 8)}…" at ${i} starts a tag but never closes it with >`);
      continue;
    }
    text(src.slice(last, i));
    last = i + m[0].length;
    const [whole, close, name, rest] = m as unknown as [string, string, string, string];
    if (!isRichTag(name) || rest) {
      add('tag-unknown', `${whole} is not a Rich tag (only ${RICH_TAGS.map((t) => `<${t}>`).join(' ')})`);
      continue;
    }
    if (!close) {
      if (open.length) open[open.length - 1]!.kids++;
      open.push({ tag: name, at: i, kids: 0 });
      continue;
    }
    const depth = open.map((o) => o.tag).lastIndexOf(name);
    if (depth === -1) {
      add('tag-stray-close', `</${name}> at ${i} closes nothing`);
      continue;
    }
    if (depth !== open.length - 1) {
      add('tag-crossed', `</${name}> at ${i} closes before <${open[open.length - 1]!.tag}> inside it`);
    }
    const node = open.splice(depth)[0]!;
    if (node.kids === 0) add('tag-empty', `<${name}> at ${node.at} has nothing inside`);
  }
  text(src.slice(last));
  for (const o of open) add('tag-unclosed', `<${o.tag}> at ${o.at} is never closed`);

  // A charge or a power needs a real minus.
  for (const ch of supText.match(/[-‐‑–]/g) ?? []) {
    add('charge-hyphen', `${hex(ch)} in a superscript is not a minus sign; use − (U+2212)`);
  }

  for (const [name, re, msg] of TEXT_RULES) {
    for (const m of src.matchAll(re)) {
      const shown = name === 'unicode-script' ? `${m[0]} (${hex(m[0])})` : `"${m[0].trim()}"`;
      add(name, `${shown} ${msg}`);
    }
  }
  return issues;
}
