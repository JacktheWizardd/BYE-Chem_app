# BYE Chem research: summary

*2026-11-06. Five research tracks, each in its own file in this folder, all spot-checked by the main session (see "How this was checked"). The audience is everyone: complete beginners, older and returning learners, and community-college Chem 1A students.*

| File | What it answers |
|---|---|
| [A-course.md](A-course.md) | What Chem 1A at PCC covers, the beginner course before it, and the verified OpenStax section list |
| [B-problem-types.md](B-problem-types.md) | Every kind of problem, with its named steps, common slips, and the picture that helps |
| [C-learning.md](C-learning.md) | What chemistry-education research says beginners need |
| [D-apps.md](D-apps.md) | What existing apps do, and the gap |
| [E-engine.md](E-engine.md) | How to build a chemistry figure engine alongside BYE Math Engine |
| [L-lessons-from-bye-math.md](L-lessons-from-bye-math.md) | **Read before building.** What went wrong building BYE Math and its engine, and the day-one rules BYE Chem starts with (2026-11-07) |

## 1. The course (verified)

**Pasadena City College** fits "PCC Chem 1A" (the friend's campus is still to be confirmed). From the [PCC catalog](https://curriculum.pasadena.edu/course-descriptions/chem/chem.pdf):

| Course | Units | Prerequisites | Covers |
|---|---|---|---|
| **CHEM 022** Introductory Chemistry | 4 | Intermediate algebra | The beginner course (C-ID CHEM 101), described as preparation for 001A |
| **CHEM 001A** General Chemistry and Chemical Analysis I | 5 (54 h lecture, 108 h lab) | Intermediate algebra **and** CHEM 022 or placement | Atomic structure and bonding, stoichiometry, gases, liquids, solids, solutions; intro to equilibrium and organic; quantitative lab analysis. C-ID CHEM 110 |
| **CHEM 001B** | 5 | 001A | Kinetics, equilibrium, thermodynamics, electrochemistry, and more |

The statewide [C-ID CHEM 110](https://data-c-idsystem.org/descriptors/final/show/297) descriptor lists the required content: nomenclature, atomic structure, quantum theory and electronic structure, periodic properties, reactions, stoichiometry, gas laws, structure and bonding, states of matter, and aqueous solutions. That makes it the checklist for "Chem 1A level".

**Course map.** A-course.md maps 001A to OpenStax *Chemistry 2e* chapters 1–11, plus 13.1–13.3 and 20. All **114 section titles** in it were checked against live openstax.org pages. This replaces the earlier list written from memory.

**Path from zero:**
- **Stage 0, maths floor:** arithmetic, fractions, percent, ratios, scientific notation, rearranging formulas. PCC requires intermediate algebra; the specific skills are inferred.
- **Stage 1, the C-ID CHEM 101 intro list:** matter and atoms → nomenclature → measurement → bonds → structure → reactions → stoichiometry → energy and states → gas laws → aqueous systems → solutions → acids and bases.
- **Stage 2:** the 001A topics again, in more depth.

## 2. Problem types (the worked-example spec)

There are 74 problem types across 12 topics (B-problem-types.md), and they reduce to a few repeating step patterns:

1. **The mole spine:** grams → moles → mole ratio → moles → grams. Mass–mass problems, limiting reactant, solutions, titration and gas stoichiometry all use it.
2. **Tally, compare, fix:** balancing, net ionic equations, charge balance.
3. **Mole table, divide by the smallest:** empirical formulas, hydrates, combustion analysis.
4. **Before / change / after table:** limiting reactant and precipitation; later the ICE table for equilibrium.
5. **Name what's conserved, write one equation:** dilution, calorimetry, Hess's law, gas laws.

Layouts by how many problem types they cover:

| Layout | Problem types |
|---|---|
| Unit-cancel chain | about 30 |
| Column tables (atom tally, mole table, BCA, before/after) | about 25 |
| Particle pictures | about 10 |
| Energy diagrams | about 8 |
| Lewis structures with 3D shapes | about 7 |
| Orbital boxes | about 5 |

*Caveat:* the methods are standard, but the "two independent sources per topic" goal wasn't met. Most rows have one checked source plus links to whole sites. Rows 5.8, 6.7, 8.5 and 8.8 are the thinnest.

## 3. What beginners need (evidence-backed)

From C-learning.md. Strength is how strong the evidence is.

| # | Principle | Evidence | Strength |
|---|---|---|---|
| 1 | Show one level at a time (what you see / particles / symbols) and label it | [Johnstone 1991](https://doi.org/10.1111/j.1365-2729.1991.tb00230.x), [2000](https://doi.org/10.1039/A9RP90001B) | Strong as a framework |
| 2 | One new idea per revealed step (working memory) | Johnstone & El-Banna; Sweller | Moderate–strong |
| 3 | Start fully worked, then **fade** to partial steps, then to solo problems | Worked-example and fading research | Strong in general, moderate in chemistry |
| 4 | Worked examples don't beat practice with feedback; they mainly save time, so practice is needed too | McLaren, Lim & Koedinger 2008 | Moderate |
| 5 | Pair every calculation with a particle picture or a "why" check | [Nurrenbern & Pickering 1987](https://doi.org/10.1021/ed064p508) | Strong for the gap |
| 6 | Subscripts are fixed; draw balanced equations as atom counts | Yarroch 1985 | Moderate |
| 7 | Build in conservation-of-mass checks | Kind 2004 (RSC) | Moderate |
| 8 | Teach the mole as a counting unit that bridges mass, amount and particles, and give it extra time | Furió 2000; [Ralph & Lewis 2018](https://doi.org/10.1039/C8RP00115D) | Moderate |
| 9 | Show units at every step, with "for every…" reasoning alongside | Mixed studies | Weak |
| 10 | A short maths refresher up front; maths skill predicts success | [Williamson 2020](https://doi.org/10.1039/C9RP00077A) | Strong that maths predicts success |
| 11 | Pictures must teach: say what to notice, because novices read surface features | Kozma & Russell 1997 | Moderate–strong |
| 12 | Never use colour alone; 4.5:1 contrast; text that scales to 200%; 44 px tap targets | WCAG 2.2 | Standard |

**Not found:** any research on returning adult learners, or on maths anxiety, in general chemistry.

## 4. The market gap

From D-apps.md. Many store and forum pages blocked automated reading, so several prices and ratings there are marked UNVERIFIED.

**The gap:**
- **Nobody does paced, named, tap-to-reveal steps.** Solvers dump every step at once, videos narrate continuously, and ALEKS's explanations are criticised as dense.
- **Particle pictures live in simulations** (PhET), cut off from the calculation.
- **No short Learn path** is aligned to a community-college Chem 1A, or aimed at returning adults.
- **Assigned platforms feel punitive or cost a lot:** ALEKS has progress resets; Mastering codes are around $147 at retail.
- **Solver apps encourage copying answers** and bill weekly. Chem AI, for example, is $5.99 a week (4.4★, 822 ratings, rechecked on the App Store).

**Risks:**
- Free general AI is the biggest. BYE Chem has to win on checked correctness, pacing and pictures.
- Classes that mandate ALEKS or Mastering make BYE Chem a supplement, not a replacement.
- Khan Academy could improve its chemistry.

## 5. The chemistry figure engine

From E-engine.md: a separate **`bye-chem-engine`** package that depends on `bye-math-engine`. Like the math engine, it takes a JSON description, validates it, lays it out as a scene, and draws it with react-native-svg (three.js for 3D). Same rules: the description doubles as the accessibility label, and bad input shows an error box, never a crash.

**New figure kinds**, each laid out from data, with chemistry checks built in:
- `particleBox` (checks atoms are conserved) and `reaction` (checks the equation balances);
- `molecule2d` / `molecule3d` (shape from VSEPR);
- `lewis` (electron counting and formal charge);
- `orbitalBox` (Aufbau, Hund and Pauli rules);
- `periodicTable`, `atomTally`, `bohr`, `unitChain`.

**Already possible in the math engine's `plot2d`:** concentration vs time, Arrhenius plots, Maxwell–Boltzmann curves, most energy profiles. Titration and heating curves partly work. Phase diagrams need log axes.

**Changes the math engine needs first:**
- figure kinds are a fixed `switch` today (confirmed in `src/core/figure.ts`), so they need a pluggable registry;
- per-element colours or more style roles;
- an arc primitive.

**Libraries:** write our own element data, formula parser, VSEPR, electron configuration, balancing and unit algebra. For SMILES, use OpenChemLib JS (BSD-3, pure JS) or RDKit (BSD-3, WASM) at **build time** to generate coordinates. Avoid ChemDoodle (GPL or paid) and anything DOM- or WebView-only. Licences were rechecked on GitHub; 3Dmol's licence is unlabelled there.

**Data:** the licences of the IUPAC atomic-weight tables and of PubChem's periodic-table page are unclear. Atomic weights are scientific facts, but build our own table and colour palette rather than copying a dataset.

## 6. What the first design got right, and what it missed

The first design is the [beginner-flow artifact](https://claude.ai/artifact/5vF771K1LwRRd1EjiAFKQR).

**Held up by the research:**
- Have / Want chips, plus the working as unit-cancel tiles. The cancel chain is the most-used layout (~30 types), and small steps match principle 2.
- The four-station route bar is the mole spine (pattern 1).
- The three-views Learn page (principle 1).
- The atom-tally table with locked subscripts (pattern 2, principle 6).
- The mole as "a chemist's dozen" (principle 8), and the mass-in = mass-out check (principle 7).
- "2 waters per oxygen" written beside the ratio tile (principle 9).

**Missed or wrong:**
1. **The beginner path starts in the wrong place.** The real intro order begins with measurement, units and sig figs, and needs a **maths refresher before anything** (principle 10). The design started at "Matter and atoms".
2. **The Chem 1A track was guessed.** The real 001A list adds nomenclature, electronic structure and quantum, bonding and VSEPR, liquids and solids, intermolecular forces, solutions, and intro equilibrium and organic. Thermochemistry comes in mostly through calorimetry lab work. The home screen should follow the verified map in §1.
3. **No fading.** The design shows only fully worked problems. It needs the path fully worked → partly worked → try it yourself (principle 3). Practice with feedback matters too (principle 4), which means answer entry with a unit-aware checker; BYE Math has no answer entry either.
4. **Two key layouts are missing:** the **BCA table** (limiting reactant, and ICE later) and the **mole table** (empirical formulas). Together they serve about 25 problem types.
5. **Colour carries meaning alone** in two places: grams vs moles (the text says g and mol, which helps), and the atom balls. Put the element letter on each atom, or offer a labelled mode, for colour-blind users (principle 12).
6. **Accessibility sizes are unchecked:** the small grey captions and tap targets need checking against 4.5:1 contrast and 44 px.

## How this was checked

- **Course:** the PCC catalog PDF was read directly. The C-ID descriptors are on c-idsystem.org. All 114 OpenStax section titles resolve on openstax.org.
- **Problem types:** the 32 OpenStax pages cited were tested. 31 were correct; one invented page was fixed.
- **Learning research:** seven key papers were confirmed on Crossref (titles, journals, years).
- **Apps:** Chem AI's rating was confirmed through Apple's lookup API. Trustpilot couldn't be re-read; the ALEKS figure stays dated and attributed.
- **Engine:** the licences of OpenChemLib, RDKit, SmilesDrawer and Ketcher were confirmed on GitHub. The math engine's fixed figure-kind `switch` was confirmed in its code.
- **Still UNVERIFIED** (full lists in each file):
  - which PCC the friend attends;
  - PCC's detailed course outline of record and its textbook;
  - UC transfer equivalents (ASSIST couldn't be read);
  - second sources for most problem types;
  - several paper details;
  - store and forum opinions;
  - data licences for IUPAC and PubChem.
