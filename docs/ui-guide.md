# BYE Chem UI guide

How the app looks, moves and reads. It is BYE Math's current guideline adapted to a chemistry textbook, so the BYE apps feel like one family.

**Source:** `BYE-Math_app@b49d14a` (GitHub `main`, 2026-11-08). BYE Math keeps its guideline in code, not in its AGENTS.md. Each section below names the file it comes from, so it can be re-synced: `git -C ../BYE-Math_app fetch && git -C ../BYE-Math_app show origin/main:<file>`.

**The other guides:**
- `docs/design-guide.md`: chemistry figures (3D, particles, graphs, spectra) and lab reading.
- `docs/notation.md`: how chemistry is written.
- `docs/learn-template.md`: how a section is written.
- `docs/chapter-map.md`: what the chapters are.

**BYE Chem is a textbook.** It has reads, a recap, and read-only worked examples. There are no quizzes, scores, answer boxes or review queues (decided 2026-11-08). Lab (sandboxes) and Tools (look-ups) stay.

---

## 1. Foundations (`src/theme.ts`)

### Colours: light theme only, one meaning each

| Token | Hex | In BYE Chem |
|---|---|---|
| `ground` | #f6f3ec | Page background; everything sits directly on it. Also the splash colour and PWA theme colour. |
| `card` | #fffdf8 | A rare raised surface (inputs on Tools, Lab panels) |
| `band` | #fcfaf5 | Every other part of a page, so parts don't blend together |
| `note` | #efeadf | Press tint, the key-fact box, the highlighted table column |
| `track` / `grid` | #ece6da | Tracks, grid lines, the hidden-formula fill |
| `line` | #e3dccf | 1 px hairlines: the main structuring device |
| `axis` | #8a8378 | Disabled and "Soon" rows, inactive tabs, hints |
| `ink` / `ink2` | #1e1c19 / #5a554d | Text / secondary text (`muted` #6b655b where 4.5:1 matters) |
| `onInk` | #f6f3ec | Text on the ink pill button |
| `coral` | #d9846a | **Where you are:** active tab, current step, the current sidebar row |
| `too` | #f3b63f | The dot in "BYE." and nothing else |
| `ai` | #2f4b7c | **Grams / mass**; links |
| `matsu` | #2f6b4a | **Moles / amount**; the new part on a frame |
| `shu` | #b5462a | **A measured, plugged-in or carried value**; the operation in the margin; highlight rings in figures |
| `wrongTint` / `rightTint` | #f6e7e1 / #e6efe8 | Behind a common mistake's wrong line / right line |

- Element colours in figures follow `docs/design-guide.md`: H white with a grey ring, O terracotta, C near-black, N blue.
- Colour never carries meaning alone. Text says "g" and "mol", and atoms carry their letters in labelled views.

### Type: `font`, `src/fonts.ts`

| Role | Font | Sizes |
|---|---|---|
| Display: titles, hooks, numerals | Shippori Mincho 400 (`serif`) | Hero 40/48 (desktop 54/62), chapter title 40/48, section title 34/42, read title 32/40, step title 26/31, hook 22/31, list numerals 17–18 |
| UI and body | Zen Kaku Gothic New 400/500/700 (`sans*`) | Body 16/25–27, notes 14/22, meta 13, hints 12, row title `sansMedium` 16/22 |
| Chemistry and numbers | STIX Two Text 400 + italic (`chem`) | Working 20, tool 22–24, glance 20, molecule chips 16 |
| Wordmark | Schibsted Grotesk 700 (`grotesk`) | 30, letterSpacing −0.8 |

- **Eyebrow:** `sans` 12/16, letterSpacing 2.2, UPPERCASE, `ink2`. It labels every part.
- **Web fonts:** cut to the characters used, at deploy time only (`scripts/build-web.mjs`). Text is measured only after the fonts load.

### Spacing and widths

| Token | Value |
|---|---|
| `space` | xs 6 · sm 10 · md 14 · lg 22 · pageX 26 · section 34 |
| `MAX_WIDTH` | 520: the phone column, centred on anything wider, with 1 px `line` borders left and right above 520 |
| Desktop: `DESKTOP_MIN` | 900 |
| Desktop: `SIDEBAR_W` | 280 (256 below 1200) |
| Desktop: `RAIL_W` | 60, on the example screen |
| Desktop: `READ_MAX` | 680, the reading line length |
| Desktop: `FIGURE_MAX` | 560 |
| Desktop: `PROBLEM_MAX` | 1180, the example screen |

`usePage()` (`src/layout.tsx`):
- **Phone:** top = inset + 4, bottom = inset + 48, sides 26.
- **Desktop:** `pageX = max(40, (contentW − 680) / 2)`, top = inset + 36, bottom = inset + 72.

### Structure
- **Hairlines, not boxes.** Rows, the tool, figures and working sit between 1 px `line` rules.
- **Bands** (`Band`) run edge to edge (`marginHorizontal: −pageX`) with 26 px vertical padding. Every other part sits on a `band`-coloured band with hairlines top and bottom, so the page alternates reading and looking.
- **Radii, only these:** 26 (pill buttons), 10 (key box), 8 (mistake rows), 7 px circles (frame dots).
- **Icons:** drawn inline in SVG, stroke only, round caps. Back arrow 20×14 at stroke 1.8, chevron at stroke 2, down arrow at stroke 2.4. No icon library.

## 2. Components (`src/components/ui.tsx`, `motion.ts`, `feedback.ts`)

- **Press styles.** Each takes `haptic: 'select' | 'press' | null`, fired **on release**, so starting a scroll on a row never buzzes.
  - `PressScale` (buttons): 0.96 over 90 ms, quad-out, springs back on `SPRING`.
  - `PressTint` (rows): `note` tint, 60 ms in and 260 ms out; with a mouse, hover at 0.7.
  - `PressFade` (quiet controls): opacity 0.5 while held; hover 0.7.
- **`Tabs`:**
  - text tabs, the active one in ink and the rest in axis grey, with a 180 ms colour change;
  - **one 2 px coral underline slides** on `SPRING` (it doesn't slide on first placement);
  - on the web they are toggle buttons (`aria-pressed`), because Safari holds a tap on `role=tab`.
- **`TabPanel`:** new content enters from the side of the tab you went to (240 ms).
- **`ListRow`:**
  - serif numeral, title (`sansMedium` 16), a one-line question or gist, meta on the right, a bottom hairline;
  - minHeight 60;
  - unbuilt rows are greyed and inert, and say "Soon".
- **`PrimaryButton`:** ink pill, minHeight 52, radius 26, `sansMedium` 16 in `onInk`. **`SecondaryButton`:** pill on `ground` with a `line` border.
  - Labels say where they go, with two spaces before the arrow: "Start with Section 4.1  →", "Next: Round to 3 figures  ↓".
- **`BackButton`:** the arrow and a label in `ink2`, minHeight 44, hitSlop 8. Hidden on desktop while the sidebar is open.
- **`Band`, `SteadyHeight`** (never let stepping frames change the page height), **`WhyItWorks`** (frames, swipe or tap, 7 px dots), **`SpotIt`**, **`Mistakes`** (wrong on `wrongTint` with a 3 px shu bar; right on `rightTint` with a 3 px matsu bar; one line why), **`ShowsUp`**.
- **Example screen parts** (`problem/*` in BYE Math):
  - `MethodBar`: steps done in ink, the current one in coral, the rest in grey. 3 px segments, labels `sans` 11, bold for the current one.
  - `WorkRow`: like on paper. The = signs line up, the operation is written in the margin in `shu`, and the move's name sits under it. minHeight 58 with a hairline; a new line fades in over 450 ms.
  - `StepDetail`: Eyebrow "Step n · Move", serif title, the explanation at 16/26, a figure only where the picture carries the idea, and "Common questions" accordions.
- **Loading and errors:**
  - `Loading`: an empty `ground` page.
  - `LoadFailed`: "Not loaded" / "This page didn't load." / Try again.
  - `NotFound`: "Page not found" / "This page isn't here." / "Go to the start  →".
- **Desktop:** `desktop/Sidebar.tsx` shows the book down the left (wordmark 22, Learn · Lab · Tools, chapters, the open chapter's sections, the current section's reads and examples).
  - The current row has a 3 px coral bar.
  - Group heads are `sans` 11 uppercase in axis.
  - On the example screen it folds to a 60 px rail and opens over the page (scrim `rgba(30,28,25,0.12)`); Esc closes it.

## 3. Motion, sound and haptics

- **One feel, "Snappy":** springs that settle fast with almost no bounce.
  - `SPRING` stiffness 620, damping 42, mass 1.
  - `glide`: native spring 340/37; web `LinearTransition` 240 ms.
- **Durations:**

| What | Time |
|---|---|
| Tab panel | 240 ms |
| Something opened | fade in 200 ms, out 120 ms |
| New working line | rises 8 px while fading in, 450 ms cubic-out |
| Step explanation refresh | 200 ms |
| Tab colour | 180 ms |
| Method bar colour (web) | 260 ms |
| "Done" sound after the last line | 150 ms delay |

- **Web screen change:** `ScreenEnter` fades each screen in while it rises 8 px, 220 ms cubic-out. Phones use the native slide.
- **Figures:**
  - **pictures only add**: what is new animates in, and earlier parts stay or fade to grey;
  - stepping back rewinds at 1.6×;
  - no slide-in of moved or plugged-in numbers (user preference). A gentle fade of a new line is fine.
- **Reduce Motion:** Reanimated follows it, so everything jumps to its end.
- **Haptics:** `select` for tabs, frame dots, accordions and choosing a molecule; `press` for buttons and rows. Fired on release; on the web only on touch screens.
- **Sound:**
  - optional, **off by default** (the Sounds switch on Home);
  - it plays *before* the vibration;
  - the sounds are **BYE Math's own** (the user's choice, 2026-11-07, over three recorded lab sets): `assets/sounds/tap.wav` for buttons and rows, `tap-select.wav` for tabs and choices, and `done.wav` when an example's last line appears. They are synthesized by `scripts/make-sounds.mjs`, copied from BYE Math @ b49d14a with `src/sound.ts` (expo-audio), `src/sound.web.ts` (Web Audio) and the Sounds switch, at volume 0.07.
- **Launch intro:** none yet. A chemistry intro comes later, from its own mockup.

## 4. Page anatomies

- **Home** (`src/app/index.tsx`):
  - wordmark row "BYE." | "Chem / 一歩ずつ";
  - Tabs **Learn · Lab · Tools**;
  - **Learn:** serif hero and sub line, then *Start here* (*Learn from zero* → Chapter 0, *I'm taking Chem 1A* → the chapters in the class book's order), then the numbered chapter list with level tags and its Tro chapter;
  - footer: the Sounds switch;
  - desktop: hero plus chapter cards in two columns, max 1000 px.
- **Chapter page:** BYE Chem's liked topic page on top, then BYE Math's overview bands.
  1. Back, Eyebrow, serif title, the one-line promise, level tags, "In your book: Tro …".
  2. *What this lets you do*: a concrete task and a flat particle picture (band).
  3. *Ready? You need*: plain links to earlier sections (no questions).
  4. *The story*: 3–5 paragraphs naming each section, with the chapter picture.
  5. *The road map*: sections in 2–4 named groups. Each row shows its question and "n min read", or "Soon".
  6. "Start with Section x.1  →".
  7. *The chapter at a glance*: 5–8 formula rows.
  8. *Where it shows up*.
  9. *Play with it*: the Lab sandbox, challenge first.
- **Section page:**
  1. Back, Eyebrow "Chapter n · Section n.m", serif title, Tro reference.
  2. Intro, 2–3 sentences.
  3. *Understand it*: rows of the reads with gist and minutes.
  4. *The recap*: the tool and its note, key ideas, why it works, how to spot it, common mistakes, where it shows up.
  5. *Worked examples*: rows "Example n.m.1" with the question and "n steps".
  6. *You need first*.
  7. "Start with read 1  →".
  - No level tabs.
- **Read** (`learn/[id]/[topic]`): Back, Eyebrow "Section · i of n", serif 32 title, gist, then the blocks, then Before / Next / Done rows. One screen of reading plus a picture or two.
- **Worked example** (`example/[id]`, watch-only):
  - **pinned header:** Back, "Step k of N", the question in `chem` 22–26;
  - **body:** `MethodBar`, the working revealed one line per tap (scrolled into view about 120 px below the top), `StepDetail` below;
  - **bottom bar:** a 46 px fade into `ground`, a one-line preview, and "Next: <step>  ↓" or "Next line".
    - At the end: "From step 1" and "Next example / Back to the section  →".
    - **The bottom bar always says what comes next.**
  - **Desktop:** two panes (working | explanation), keys → / Space / Enter, Esc.

## 5. Accessibility and platforms
- **Targets:** controls ≥ 44 px; small links 32–36 px with hitSlop 8; buttons 52 px.
- **Screen readers:**
  - every figure has `describe`;
  - `Rich` text speaks plain ("H2O");
  - titles have `accessibilityRole="header"`;
  - selected, expanded and disabled states are set;
  - Sounds is a switch.
- **Contrast:** 4.5:1 for text, so use `muted` (#6b655b), not `axis`, for readable small text.
- **Web:**
  - toggle buttons instead of tabs;
  - vibration only on coarse pointers;
  - `noSelect` on swiped areas;
  - re-measure after fonts load;
  - noindex on the demo.
- **iOS:**
  - check on the simulator, not only the web preview;
  - react-native-svg doesn't fill `%` sizes, so use explicit sizes;
  - subscripts on native are inline views moved 0.4 em down (`Rich`).
- **Layout:** portrait only, light only. Desktop mode starts at 900 px (iPad landscape counts). Check every page at 323, 375 and ≥ 900 px.

## 6. Writing
- Own words only. Plain, short sentences, second person, no jargon before it is earned. Say why before how.
- Hooks are one concrete question, not a definition. Road-map questions are one plain line ending in "?".
- Write "Section 4.1", not "§4.1" (the sans font draws § wide).
- App words: "Soon", "n min read", "Start with …  →", "Next: …".
- Chemistry notation follows `docs/notation.md`: real sub/superscripts, units upright with a space, × not x.

## 7. Where BYE Chem differs from BYE Math

| BYE Math | BYE Chem |
|---|---|
| `MathLine` with ∫ drawn as a path | `Rich` for formulas, charges and units; no integrals |
| Graphs everywhere | Particle pictures first (flat, the liked style), graphs where they help, the 3D viewer as the deeper view |
| Practice levels Simple / Medium / Hard with tutored problems | Textbook: read-only worked examples, no levels, no answers to type |
| Subject tabs Calculus / Algebra | Learn · Lab · Tools |
| Launch intro | Later |
