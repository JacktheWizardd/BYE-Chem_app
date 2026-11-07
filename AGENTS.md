# BYE Chem

A chemistry learning app and website for everyone, from complete beginners and returning adults up to community-college Chem 1A (PCC CHEM 001A). It has the same structure and look as BYE Math. It is an Expo / React Native app: prioritise mobile-first patterns, speed and cross-platform behaviour.

## Status (keep this current)
- **No app code yet.** This repo holds the research, design guide, mockups and rules. The Expo app gets scaffolded here only when the user says go.
- **Content base (2026-11-07):** the friend's class book, Tro, *Chemistry: A Molecular Approach*, AP Edition, 6th ed., used for references only (see Content). BYE Chem follows **our own beginner order** in `docs/chapter-map.md`, with the matching Tro sections on every chapter and section. The user chose this order over Tro's.
- **Waiting on the user:** they review `docs/chapter-map.md` and the updated `design/chem-chapters.html`. **Build no app code, and change nothing in BYE Chem Engine, until the user says go.**
- **Demo site:** live at https://bye-chem-preview.byelabs.workers.dev (own Worker `bye-chem-preview`). It is still built from BYE-Math_app's `chem-sample` worktree (`npm run build:chem-preview`, then `npm run deploy:chem-preview` only on the user's go), because `/lab-demo` runs inside the BYE Math app. It moves here once this app exists.
- **Engine:** `../BYE-Chem_engine`. Piece 1 (the `molecule3d` viewer) is built; an independent review's fixes wait for the go. See its AGENTS.md.
- **One piece at a time:** the user reviews each piece before the next starts.

## Where things are
- `docs/chapter-map.md`: **the chapter map**, our order. Each chapter and section has its question, Tro sections, level tags (Intro / 1A / 1B / AP), "Ready? You need" prerequisites, and Lab links. It also has the class-order table for *I'm taking Chem 1A*. Edit the map first; the mockup's map table is generated from it.
- `docs/research/M-tro-6e-contents.md`: Tro 6e's 26 chapters and 229 sections (titles and pages only).
- `docs/research/`: sourced research. Start with `README.md` (summary in `summary.html`). `L-lessons-from-bye-math.md` explains why each rule below exists. `first-pass.md` is the earliest overview.
- `docs/design-guide.md` and `design/chem-design-guide.html`: the look, notation and figure rules.
- `design/`: the HTML mockups. `chem-app-flow.html` has the liked topic page and flat particle diagram. `chem-chapters.html` has chapters, Lab and Tools. `chem-render-styles.html` and `chem-technical-styles.html` hold the 3D looks; Drafting table was chosen.
- `design/screens/` and `design/molecule-viewer/`: screenshots of the mockups and the viewer.
- Still only on BYE-Math_app's `chem-sample` branch: the in-app Chemistry tab sample (`{c:}` token, §4.3), `/lab-demo`, and the demo site (`preview/`, `scripts/build-chem-preview.mjs`). Never merge `chem-sample` into BYE Math without the user.

## Start every task with CAMAE
Before the first step of any task, sort its steps into this table and say in one line who does what. Then follow it.

| Work | Who | Model · effort |
|---|---|---|
| Builds, serving a build, step-throughs, content checks, typecheck, lint, benchmarks, screenshots | `runner` subagent | Haiku · low |
| Reading textbook pages and listing their topics in our own words | `textbook-scan` subagent | Haiku · low |
| Applying an already-decided change across many files, then running the checks | `pattern-editor` subagent | Sonnet · medium |
| Writing Learn reads or problems in the house style from a written pattern | fresh session, **two at a time at most** | Sonnet · medium |
| Design choices, chemistry correctness, debugging, anything surprising, reviewing a subagent's result, merges, deploys, pushes | main session | main model |

- Cheap agents report; they don't decide. A runner stops at the first unexpected result and returns it word for word.
- Check every subagent result before relying on it: open one page and read the numbers.
- Never delegate anything that deploys, merges, pushes or rewrites git history, or anything the user is deciding.

## Expo has changed: do not trust your training data
Read the `expo` major version in `package.json`. Then fetch `https://docs.expo.dev/versions/v<major>.0.0/` and https://docs.expo.dev/llms.txt before touching any Expo, EAS or React Native API.

Install packages with `npx expo install <package>`, never npm/yarn add. Use Expo Router; routes live in `src/app/`. Never hand-edit `ios/` or `android/`.

## Shipping (one live site, many sessions)
- **One worktree per task.** Every task works on its own branch in its own worktree (`.claude/worktrees/`). Never commit in the main folder.
- **Deploy only what's on `origin/main`.** The live site must always equal `origin/main`. To ship:
  1. `git fetch origin`, then merge `origin/main` into the branch.
  2. Run the checks.
  3. Rebuild with `npx expo export -p web --clear`.
  4. Deploy, then push that same commit to `main`.

  Deploy only a commit where `git merge-base --is-ancestor origin/main HEAD` succeeds.
- **Push only your own work.** List what goes out (`git log origin/main..HEAD`) and push only your own work. Chain merge and push with `&&`.
- **Stage by path.** Never use `git add -A` in a shared folder.
- **Worktree hygiene.** Always build with `--clear` in a worktree (Metro's cache is shared). Use `127.0.0.1`, not `localhost`. Stop the servers you start.
- **Never deploy over an existing Cloudflare Worker.** BYE Chem gets its own, new Worker name.

## Day-one structure rules
- **No central lists.** Each chapter and section lives in its own file and registers itself. Nobody hand-edits a shared catalog: BYE Math's `catalog.ts` caused 125 commits of merge conflicts.
- **Lazy loading:** load content and the figure engines lazily from the start.
- **The engines:**
  - **BYE Chem Engine** (`../BYE-Chem_engine`) and **BYE Math Engine** (`../BYE-Math_engine`) are linked through Metro.
  - Engine imports resolve packages from this app (`resolveRequest` in `metro.config.js`), so there is never a second React.
  - Check figures at 323 and 375 px.

## Text and notation
- **Glyphs first:** before writing content, check that every chemistry character exists in the chosen fonts. That means subscripts, superscripts, charges, →, ⇌, Δ, °, ‡ and ·.
- **Fonts at deploy only:** cut the web fonts down to the characters used **at deploy time only**, never as committed files on branches. Measure text only after the fonts load.
- **Real subscripts:** formulas use real sub/superscript markup, never Unicode ₂ (it falls back to another font and breaks the line height).
- **Notation spec first:** the chemistry notation spec and its example test file come **before** any content. It covers formulas, charges, oxidation states, states of matter, reaction arrows, units, significant figures, isotopes and electron configurations.

## Content
- **All original:** every problem, read and figure is written by us.
- **The textbook:** Tro, *Chemistry: A Molecular Approach*, AP Edition, 6th ed. (Pearson, all rights reserved). It is used only for section references, coverage and topic lists.
  - Never copy its wording, worked examples, exercises or figures.
  - Never paste its pages into prompts for agents that write content.
  - The PDF lives outside the repo, at `../resources/`; never commit it.
  - It is a phone scan with no text layer. Render the pages you need with `pdftoppm -r 150 -f <first> -l <last> -png` into the scratchpad and read the images. PDF page = printed page + 32 in chapter 1 (check near the page you need).
  - The `textbook-scan` agent does this and reports in its own words.
- **OpenStax Chemistry 2e** (CC BY-NC-SA) was the earlier reference. Don't paste its text into prompts either.
- **Automatic checks fail on:** leaked markup, figures that don't validate, overlapping labels, and chemistry that code can check (unbalanced equations, wrong atom counts, molar masses, units).
- **The default look:**
  - The topic page: a one-line promise, then "What this lets you do" with a particle picture, then "Ready? You need" with a review link, then numbered lessons.
  - Clean flat particle diagrams.
  - The detailed 3D viewer is the deeper option, not the default.

## Checks and speed
- **Before every merge:** CI from the first commit runs `npx tsc --noEmit`, `npx expo lint`, the tests and the content checks. Run them before every merge too.
- **Benchmarks:** take a benchmark row before and after any motion or per-frame work. Treat a single run as noise.
- **No per-frame JS loops** on a screen with buttons.
- **Platforms:** done means checked on the iOS simulator (Expo Go), Android and web.

## Working with the user
- **Show before building:** the user decides by seeing. Settle every new look in an HTML mockup or demo board first, then show it on the local preview (Metro, web and simulator) before merging or deploying.
- **Questions are questions:** when the user asks a question, answer it; don't build.
- **Keep them informed:** give a short status after each step. Keep the Mac awake for long runs.
- **Check before stating:** check memory and the repo before saying what state something is in.

## Git
- **Local commits only.** This repo has no remote yet; ask before pushing or creating one.
- **Stage files by path.** Write commit messages in plain words, describing what changed for the user.
