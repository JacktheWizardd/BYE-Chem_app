// Builds the web site into dist/:
//   1. `expo export -p web --clear` (always --clear: the Metro cache is shared between worktrees);
//   2. cuts every font in dist/ down to the characters the app and the engines can show.
// The full fonts are ~16 MB (the Japanese ones carry thousands of kanji). The cut happens at
// deploy time only, in place and under the same file names, so nothing font-related is committed
// and the app code doesn't change (AGENTS.md: "Fonts at deploy only").
import { execSync } from 'node:child_process';
import { readdir, readFile, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';
import subsetFont from 'subset-font';

const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');

execSync('npx expo export -p web --clear', { cwd: root, stdio: 'inherit' });

async function walk(dir, test) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p, test)));
    else if (test(e.name)) out.push(p);
  }
  return out;
}

// Characters: everything in the app's and the engines' source, plus Latin, punctuation and maths,
// (the brand line "一歩ずつ" is in the source, so its characters are kept).
const range = (from, to) => Array.from({ length: to - from + 1 }, (_, i) => String.fromCodePoint(from + i)).join('');
const base = [
  range(0x20, 0x7e), range(0xa0, 0x17f), range(0x2000, 0x206f), range(0x2070, 0x209f),
  range(0x2190, 0x21ff), range(0x2200, 0x22ff), range(0x25a0, 0x25ff),
  'Åα–—’“”‘…·×÷−≈°⇌→←↻◎✓',
].join('');
const sources = [path.join(root, 'src'), path.resolve(root, '../BYE-Chem_engine/src'), path.resolve(root, '../BYE-Math_engine/src/native')];
let text = base;
for (const dir of sources) for (const f of await walk(dir, (n) => /\.(tsx?|json)$/.test(n))) text += await readFile(f, 'utf8');
const used = [...new Set(text)].filter((ch) => ch.codePointAt(0) >= 0x20).join('');

let before = 0;
let after = 0;
for (const file of await walk(dist, (n) => /\.(ttf|otf)$/i.test(n))) {
  const full = await readFile(file);
  const cut = await subsetFont(full, used, { targetFormat: 'truetype' });
  await writeFile(file, cut);
  before += full.length;
  after += cut.length;
  console.log(`${path.basename(file)}: ${(full.length / 1024).toFixed(0)} KB -> ${(cut.length / 1024).toFixed(0)} KB`);
}
const total = (await walk(dist, () => true)).length;
console.log(`Fonts: ${(before / 1048576).toFixed(1)} MB -> ${(after / 1024).toFixed(0)} KB for ${[...used].length} characters. dist/ has ${total} files.`);
if (!(await stat(path.join(dist, 'index.html')).catch(() => null))) throw new Error('dist/index.html is missing');
