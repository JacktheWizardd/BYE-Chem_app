# L. What went wrong building BYE Math, and the rules BYE Chem starts with

*2026-11-07. Written from three read-only searches:*
- *the app's git history: about 310 commits over Nov 4–6, across 69 worktrees;*
- *the engine's history (17 commits) and its hand-off docs;*
- *Claude's saved memory and past session transcripts.*

*Every point cites a commit or file. Where something is a guess rather than a recorded fact, it says "Inference". Commit hashes are in `BYE-Math_app` unless marked "engine".*

BYE Chem uses the same stack as BYE Math: Expo, React Native, Expo Router, a figure engine linked from a sibling folder, a Cloudflare website, and many Claude sessions working at once. Almost every problem below will come back unless a rule stops it on day one. The checklist at the end is that set of rules.

---

## 1. Many sessions in one repo

**What happened**
- **A late deploy could replace an earlier one.** A slow branch shipped late could deploy over work a fast branch had already shipped. The Shipping rules in AGENTS.md were written only after this came close to happening (`b1600fd`, minutes after the merge commit `b756860`).
- **Another session's file got committed.** A commit made in the shared main folder swept in a file from a different session, which had to be untracked afterwards (`84cdd5a`).
- **Someone else's work went live.** A failed fast-forward merge was followed by a push, which sent another session's unreviewed commit live. The user asked "why the welcome animation got changed?" (memory: *shared-checkout-commits*).
- **Builds mixed up worktrees.** Metro's shared cache let one worktree's build pick up another's routes, which wasted about an hour of test runs (memory: *worktree-metro-cache*).
- **Two copies of React.** Engines reached through `.claude/worktrees/` symlinks loaded the main folder's `node_modules`, so the app ran two copies of React and crashed. It needed a custom resolver (`bb2355b`, `metro.config.js`).
- **Usage ran out.** Seven writing sessions at once burned through the usage limit, and six of them hit it (memory: *delegate-mechanical-work*).

**Cost:** live regressions, reverts, lost hours and a usage scare.

**BYE Chem rule:**
- Start with the Shipping and worktree rules on day one.
- Never commit in the main folder.
- Stage files by path.
- Chain merge and push with `&&`.
- Build with `--clear`, and use `127.0.0.1`.
- Run at most two writing sessions at once.

## 2. One central list that every session edits

**What happened**
- **Constant merge conflicts.** `src/content/catalog.ts` was changed by **125 commits** and `problems.ts` by 93. Almost every chapter merge conflicted in `catalog.ts`, `learnCalc.ts`, `problems.ts` and `reads.ts`.
- **Work lost while resolving them.** Problem lists for B1 and B2 were dropped during a conflict, and two sessions each wrote the A2/A3 mistakes, leaving two copies (`d9209dc`).
- **Workarounds.** One session copied another branch's wiring line for line just to keep the conflict to one line (`01c0842`).

**BYE Chem rule:** no hand-edited central lists. Each chapter or section lives in its own file and registers itself, and the app builds its lists from those files.

## 3. Fonts and text

**What happened**
- **Blank page while fonts loaded.** The full Japanese fonts were 13 MB, and the page stayed blank until they arrived. This was fixed by cutting the fonts down to the characters used, waiting at most 1.2 s, and showing a fallback font meanwhile (`ec9ca72`).
- **Wrong measurements.** Text measured in the fallback font came out the wrong width and broke the alignment of equals signs, so it had to be measured again once the real font arrived (`3171b73`).
- **Font files rebuilt on every content change.** The cut-down font files had to be rebuilt about **12 times**, after each content change (e.g. `ca20299`, `211a276`, `70f56e0`). Their file names change each time, so branches kept conflicting. Inference: each branch's font file lacked the other branches' characters.
- **Missing characters.** iOS clipped the ∫ sign because the chosen font doesn't contain it, so it is now drawn as a shape (`MathLine.tsx`). Unicode subscripts (₂) also fall back to another font and break the line height; this happened again in the chemistry mockups.
- **Engine guesses text widths.** The engine estimates plain-text widths rather than measuring them, and the first estimate ran about 15% wide (engine `aa673e9`). Inference: any font change quietly breaks label fitting.

**BYE Chem rule:**
- Cut the fonts down only when deploying, never as files committed on branches.
- Measure text only after the fonts have loaded.
- Before writing any content, check that every chemistry character exists in the chosen fonts: subscripts, superscripts, charges, →, ⇌, ⇄, Δ, °, ‡, ·.
- Write formulas with real subscript markup, never Unicode ₂.

## 4. Notation, worked out one case at a time

**What happened**
- **Line breaking.** How long equation rows wrap was patched about **10 times**, for example `6c7bba0`, `2fe5f62`, `54f6ecf` (shrink before wrapping), `abc4f6b` (lines stayed shrunk after fonts loaded) and `57be77d` (|x| bars dropped).
- **The notation reader.** It grew one case at a time:
  - roots inside fractions (`e7f6b83`);
  - letter exponents (`4fe0241`);
  - two look-alike slash characters (`a16bbde`);
  - "but" drawn in italics, and units that should be upright (`be795c6`).

**BYE Chem rule:** write the chemistry notation spec, with a test file of examples, before any content. It covers:
- formulas, charges and oxidation states;
- states of matter (s, l, g, aq);
- reaction arrows, including equilibrium;
- units and significant figures;
- isotopes and electron configurations.

## 5. Content mistakes found late

**What happened**
- **Markup shown as text.** Raw markup that the app doesn't support showed up in content: a literal `^` in 40 strings (`ccee2f2`), and `{a:f}` printed as text in 28 notes (`fe76d68`).
- **Wrong working.** Some working rows weren't true equations, for example prose on the left of the equals sign (`3ebd23e`, `be663b7`), and one problem asked a different question from the one its working answered (`e48a5aa`).
- **Labels placed by eye.** Overlapping figure labels were moved by hand, one at a time (`8c2fa85`, `48698e8`, `325d14c`, `92b7e11`).
- **Copied exercises.** About **177 problems** are textbook (Stewart) exercises, which blocks the App Store (`docs/app-store-readiness.md`).
- **Checks too weak.** Each existing check covers less than its name suggests:
  - `check:learn` only checks the template's structure;
  - `check:figures` only runs the engine's validator;
  - `smoke:web` is read by eye.

  Nothing checks correctness, leaked markup, label overlap or copying.

**BYE Chem rule:**
- Every problem is original, and OpenStax is used for topic order only.
- Automatic checks fail on leaked markup, figures that don't validate, overlapping labels, and chemistry facts that can be checked by code: balanced equations, atom counts, molar masses and units.

## 6. The engine

**What happened**
- **No room for app extras.** The strict figure schema had no place for features the app adds, so the app's step-by-step figure build-up needed a pre-processor that strips its markers before the engine sees them (`figureAtStep.ts`, `4c1a7c8`).
- **No version change.** The spec stayed at version 0 while fields were added. Inference: an older engine would reject newer figures.
- **Limits raised under pressure.** Hard limits had to be raised twice, as real content outgrew them (engine `aa673e9`, `32406cd`).
- **Label placement, the biggest bug source.** Three bugs surfaced in a bug hunt and were fixed in one go (engine `6745144`), and the weighting was then re-tuned against all 351 app figures (engine `485122e`). Before that, the app was moving labels by hand.
- **Collisions never fail a check.** The engine reports label collisions, but the app never reads that report (no use of `labelCollisions` anywhere). The engine also tests figures only at a 338 px width, which the app never uses (it draws at 323 and 375 px).
- **Labels piled up on iOS.** Every TeX label was drawn in the figure's top-left corner on iOS, because iOS ignores the position of a nested `<Svg>` (engine `ed4c6cf`).
- **Too big to load up front.** The engine is about 2.4 MB of JS, so it had to be loaded lazily (`f4f58dd`).
- **Stale build output.** The built `lib/` folder is git-ignored and older than the label fix. Inference: anyone installing the engine from GitHub would get old code.
- **Android never checked.** Every stage was checked on the iPhone simulator and on web, never on Android.

**BYE Chem rule:**
- Give the figure spec a version number from the start, plus a supported place for app extras.
- Keep limits as named constants, set from real content.
- Report collisions from day one, and make them fail the check, at every width the app ships.
- Keep heavy libraries behind lazy-loaded entry points.
- Ship the TypeScript source, so there is no build output to go stale.
- "Done" means iOS, Android and web.

## 7. Speed and taps

**What happened**
- **Motion slowed taps.** Adding motion made going from Home to a section take 253 ms instead of 37 ms (`0d76bf8`). Halving the animation times didn't bring it back (`c822553`, `docs/benchmarks.md`).
- **Safari held taps.** On iPhone Safari, the tab role held each tap about 33 ms, and the first sound started 75–110 ms late (`42a0018`).
- **3D stalls.** A per-frame loop delayed taps on the chemistry lab screen, and each new 3D shader stalled 100–500 ms the first time it was used (`bb2355b`, `1b4be4b`).
- **Noisy benchmark.** The "open problem" timing swings between 330 and 450 ms run to run (`docs/benchmarks.md`).

**BYE Chem rule:**
- Take a benchmark reading before and after any motion or per-frame work.
- Never run per-frame JS on a screen that has buttons.
- Warm up 3D shaders when the 3D view opens.
- Treat a single benchmark run as noise.

## 8. Checks that only ran when someone remembered

**What happened**
- There is no CI, no unit tests in the app, and no `eas.json`.
- Typecheck and lint failures were only found after merging: a web-only style broke the typecheck (`abfb55b`), and unescaped apostrophes broke lint (`4e946d2`).

**BYE Chem rule:** set up CI with the first commit, running the typecheck, lint, tests and content checks on every push.

## 9. Design churn

**What happened**
- **Card panel:** a card panel for the working went in and was reverted **4 minutes later** (`e518f64`).
- **"Start here":** it was added and then removed 10 hours later (`2fd5b0e` → `3faa63d`).
- **Sound:** volume went to 25%, then to 7% with a softening filter (`39cc5bc` → `e897acb`).
- **Intro:** redone three times (`7b40ee3`, `f8fe38b`, `bd82464`).
- **Algebra:** renumbered across 85 files (`627868a`).

**Pattern:** the user decides by seeing something, not from a written proposal (memory: *design-preferences*, *local-preview-first*).

**BYE Chem rule:**
- Settle every look in an HTML mockup or demo board the user can see, before building it in the app.
- Default to the topic page and flat diagrams the user already chose.
- Show changes on the local preview (web and simulator) before merging or deploying.

## 10. How the work was run

**What happened**
- **No status in view.** The user couldn't see what running work was doing ("would be nice if I can see real time status").
- **Leftover servers.** A Metro server left running for about 2 hours made a stale preview look as if Chapter 1 had vanished (memory: *local-preview-first*).
- **Laptop sleep.** Long test runs broke when the laptop went to sleep.
- **Website address change.** Renaming the workers.dev subdomain made the old address stop working, and the user asked "am I banned?" (`43aa40f`).
- **Artifact tools broke.** They stopped working mid-session, so sharing fell back to screenshots.
- **Wrong status claim.** Claude once told the user the engine wasn't in the app yet, then had to correct itself.

**BYE Chem rule:**
- Give a short status after each step.
- Stop servers when done.
- Keep the Mac awake for long runs.
- Use a new, distinct Worker name, and never deploy over an existing one.
- Check memory and the repo before stating what state something is in.

---

## Day-one checklist for BYE Chem

**Repo and workflow**
- [ ] Copy the Shipping rules and the "Choosing a model" (CAMAE) table from BYE Math's AGENTS.md into BYE Chem's AGENTS.md.
- [ ] One task per branch and worktree, and never commit in the main folder.
- [ ] Stage files by path, and chain merge and push with `&&`.
- [ ] Deploy only a commit that contains `origin/main`.
- [ ] At most two writing sessions at once, with cheap models for runs and checks.
- [ ] Metro and TypeScript resolve the engine packages from the app (the resolver from `chem-sample`'s `metro.config.js`).
- [ ] Build with `npx expo export -p web --clear`, and use `127.0.0.1` for local servers.

**Structure**
- [ ] One file per chapter or section that registers itself, with no shared central lists.
- [ ] Lazy-load content and the engine from the start.

**Text and notation**
- [ ] Choose the fonts, then check every chemistry character exists in them (subscripts, charges, arrows, ⇌, Δ, °, ‡).
- [ ] Cut the fonts down at deploy time only, and measure text after the fonts have loaded.
- [ ] Write the chemistry notation spec and its example tests before any content.

**Content**
- [ ] All problems original, with OpenStax used for topic order only and never pasted into prompts.
- [ ] CI fails on:
  - leaked markup;
  - figures that don't validate;
  - label collisions at 323 and 375 px;
  - unbalanced equations, wrong atom counts, molar masses or units.

**Engine**
- [ ] A versioned spec with a slot for app extras.
- [ ] Limits as named constants.
- [ ] Collision report failing the check.
- [ ] TypeScript source exported, so there's no stale `lib/`.
- [ ] Peer dependencies declared.
- [ ] "Done" means iOS, Android and web.

**Speed**
- [ ] Benchmark before and after any motion or per-frame work.
- [ ] No per-frame JS on screens with buttons.
- [ ] 3D shaders warmed up when the view opens.

**Design and process**
- [ ] Mockup or demo board first, then the local preview, then ship.
- [ ] Topic page and flat diagrams as the default look.
- [ ] Short status after each step.
- [ ] Stop servers when done.
- [ ] Keep the Mac awake for long runs.
- [ ] Use a new Worker name, and never deploy over an existing one.
