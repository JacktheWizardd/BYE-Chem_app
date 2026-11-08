# The Learn template (BYE Chem)

Every section is written to this template, so each one is written once and they all read the same way. It is BYE Math's Learn template (`BYE-Math_app@b49d14a:docs/learn-template.md`), adapted for a chemistry **textbook**: there are **no self-checks, quizzes or answer boxes**, and worked examples are read-only.

- **Pattern sections:**
  - §4.1, a calculation section;
  - §0.1, maths;
  - §9.6, shapes and the 3D viewer;
  - §1.2, descriptive.
- Copy their shape; never their words.
- `test/structure.test.ts` checks everything marked **(checked)** below. `npm run check` runs it. A section isn't done until it passes and every picture has been looked at on a phone-width preview.

## Sources and voice

- **Our own words only.**
  - The class book, Tro *Chemistry: A Molecular Approach* 6e, gives each section's coverage: its section numbers are in `docs/chapter-map.md`.
  - Open textbooks and chemistry-education research are for structure and for the mistakes students really make.
  - Never copy text, worked solutions, numbers from worked examples, exercises or figures from any of them, and never paste their pages into a prompt. Take the idea, then write and draw it fresh.
- Plain, short sentences, second person, no jargon before it is earned. Say **why** before how.
- **Show three levels, one at a time:** what you see, the particles, the symbols. Label which one a picture shows.
- **One running example through all the reads.** §4.1 uses 36.04 g of water: 2.000 mol, then 1.204 × 10<sup>24</sup> molecules. A new idea gets its own small example only when the running one can't show it. The recap reuses the same example.
- Notation: `docs/notation.md` (real `<sub>` and `<sup>`, units upright, × not x).

## What a section page shows, in order

| On the page | Field | Notes |
|---|---|---|
| Intro | `intro` | 2–3 plain sentences: what the section is about. |
| **Understand it** (the reads) | `reads` | 4–7 short reads **(checked)**. Each row shows `title`, `gist` and minutes. |
| **The recap**: the tool | `tool`, `toolNote` | The key relation in `Rich` (`<m>moles</m> = <g>grams</g> ÷ molar mass`), with one line on its parts. Descriptive sections may have no tool. |
| Key ideas | `ideas` | 3–5 numbered ideas, a title plus one or two sentences each. |
| **Why it works** | `why` | One picture in 2–4 frames **(checked)**: the section's reason, the reads in miniature. |
| **How to spot it** | `spot` | 3–5 clues **(checked)**, each `{ text, example, note }`, plus 2–3 look-alikes `{ looks, use, why, link }`. |
| **Common mistakes** | `mistakes` | 3–5 `{ wrong, right, why }` **(checked)**, from what students actually do (research, common-error lists). |
| **Worked examples** | `examples` | 3 **(checked)**: easy, typical, harder. 0–1 for purely descriptive sections. |
| You need first | from the map | `needs` in `docs/chapter-map.md`; nothing to write. |
| **Where it shows up** | `realUses`, `next` | 4–6 `{ where, what, eq }` **(checked: `eq` required)**, then links to later sections (`next`). |

## A read

```ts
{ id: 'counting-by-weighing',      // used in the link: /learn/4.1/counting-by-weighing
  title: 'Counting by weighing',
  gist: 'Why chemists weigh things to count atoms they can never see.',
  minutes: 2,
  blocks: [ … ] }
```

Every read has **(checked)**:
1. a **gist**: one line saying what you'll understand (not what the page contains);
2. at least one **paragraph** (`p`);
3. at least one **picture**: `particles`, `frames`, `graph` or `molecule`;
4. **no check, question or answer box.** This is a textbook.

A good read runs: a question or a picture → the idea in words → the picture → the idea as a relation (`eq` or `key`) → the running example (`work`).
- Keep it to one screen of reading plus a picture or two (2–4 minutes).
- The last read is the bridge to the worked examples, "Using it well": when the idea applies, and the moves in Example 1.

### Blocks

| Block | Shape | Use it for |
|---|---|---|
| `p` | `{ p: Rich }` | A paragraph. Only `<sub>`, `<sup>`, `<b>` and `<i>`; no colour tags. |
| `h` | `{ h: string }` | A small heading inside a longer read. |
| `eq` | `{ eq: Rich[] }` | Centred relations or equations, one per line. |
| `key` | `{ key: Rich }` | The read's key fact, boxed (`note`, radius 10). At most one or two per read. |
| `particles` | `{ particles: ParticleScene, caption?: Rich }` | A flat particle picture (`src/figures/Particles.tsx`). |
| `frames` | `{ frames: Frame[], label: string }` | A picture built up in 2–4 frames, captions saying what's new ("Picture it"). |
| `graph` | `{ graph: Plot2d }` | A BYE Math Engine `plot2d` (heating curve, Boyle's law, rate vs time). |
| `molecule` | `{ molecule: Molecule3dInput }` | BYE Chem Engine's 3D viewer. The detailed view, used sparingly. |
| `work` | `{ work: [Rich, Rich][] }` | A short worked line or two inside a read: the line, then a margin note. |
| `views` | `{ views: … }` | One quantity three ways: see it · particles · symbols. Tapping a part highlights the same part in all three. |
| `table` | `{ table: { head, rows } }` | A small table; the last column is the one to watch. |

## Pictures

- **Particle pictures are the default.** Flat circles with no shading or grid. H is a white ring with a grey edge, O terracotta, C near-black, N blue, as in `docs/design-guide.md`. Each molecule's atoms touch, and the formula sits under it with real subscripts.
  - A `ParticleScene` is a list of molecules (`formula`, `at`, optional `label`) and boxes. Atoms are laid out from the formula's shape (`H2O` bent, `CO2` linear, `CH4` tetrahedral seen flat).
- **Every picture needs `describe`** **(checked)**: its accessibility text.
- **Colours keep their meaning:** grams `ai` blue, moles `matsu` green, a measured or highlighted value `shu` (a ring, never recolouring an atom), "where you are" coral.
- **Pictures only add** (frames): each frame keeps what was there. Earlier parts stay, or fade to grey with `fade: n`. Prefer `fade` over `until`. Captions are 1–2 sentences on what's new, with the relation in `eq`, not in the caption.
- **Check every picture at 323 and 375 px.** Labels never overlap.

## The recap parts

- **Why it works** (`why`): 2–4 frames, the whole section's reason in short.
- **How to spot it** (`spot`): clues with an `example` of what it looks like on the page (Rich) and a short `note`; look-alikes that need a different section, with a link.
- **Common mistakes** (`mistakes`): `wrong` and `right` are the same line, done wrong and done right (shown on `wrongTint` and `rightTint`). `why` is one line. Use real student errors: mass vs moles, subscripts vs coefficients, upside-down factors, forgetting the 2 in O<sub>2</sub>.
- **Where it shows up** (`realUses`): 4–6, each with a worked `eq` such as `0.500 g ÷ 176.12 g/mol = 0.00284 mol`. Every number in it is recomputed by the content test.

## Worked examples (read-only)

Shown on the step-by-step screen (`example/[id]`): tap to reveal each line, with the step's explanation below. Nothing to type.

```ts
{ id: '4.1-1',
  question: 'How many moles of water are in 9.01 g?',
  level: 'easy',                        // easy | typical | harder
  steps: [
    { move: 'Molar mass',               // the name in the method bar
      say: 'Add up every atom in the formula: two H and one O.',
      lines: [ { left: 'M(H<sub>2</sub>O)', right: '2 × 1.008 + 15.999' },
               { right: '18.02 g/mol' } ],      // no `left`: a continuation, "=" lines up
      why?: [[question, answer], …] },          // optional "Common questions", tap to open
    { move: 'Divide',
      say: 'Grams ÷ grams per mole leaves moles.',
      lines: [ { left: 'n', right: '9.01 g ÷ 18.02 g/mol', op: '÷ M' },
               { right: '0.500 mol' } ] },
  ] }
```

- **Steps:** 2–5 steps **(checked)**. Each has a `move` (2–3 words), `say` (1–2 sentences: why this move), and its lines. `op` is the operation written in the shu margin.
- **Numbers:** every number in the working is recomputed by `test/content.test.ts` from the engine (`molarMass`, constants). Significant figures follow the data.
- **The three examples:** easy uses the running example's numbers or close to them; typical is a fresh case; harder adds one twist (reverse direction, a hydrate, two steps chained).

## Chapter page

The top is BYE Chem's liked topic page; the rest are BYE Math's overview bands (`docs/ui-guide.md` §4).

| Part | Field | Notes |
|---|---|---|
| Promise | `promise` | One line: what the chapter lets you do. |
| What this lets you do | `letsYouDo` | A concrete task and a flat particle picture. |
| Ready? You need | from the map | Plain links to earlier sections. |
| The story | `story` | 3–5 paragraphs naming each section as (4.1), (4.2)…, with the chapter picture as `frames`. Come back to the promise. |
| The road map | `groups` | Sections in 2–4 named groups; every section in exactly one **(checked)**. Rows show the map's question. |
| At a glance | `glance` | 5–8 `{ eq, note, from }`, in section order. |
| Where it shows up | `uses`, `next` | 3–4 real uses of the whole chapter, each with an `eq`; then the next chapter. |
| Play with it | `lab` | The Lab sandbox, challenge first (optional). |

## Adding a section

1. Write it in `src/content/sections/<n>/<n.m>.ts` (one file per section, loaded on demand). It registers itself; there is no central list to edit.
2. Chapter parts go in `src/content/chapters/chNN.ts`.
3. Run `npm run check` (map, types, lint, notation, structure and content numbers).
4. Look at every read, picture and example on the local preview at 323 / 375 px and on desktop, then on the iOS simulator.
