# Chemistry in BYE Math: research

*2026-11-06. Written because a friend asked whether BYE Math could teach chemistry in the same step-by-step way. Goal: every level from the basics up to UC (University of California) general chemistry.*

## Short answer

Yes. Most of first-year chemistry is calculation by named moves, which is exactly what the problem screen shows:
- convert units;
- grams → moles → moles → grams;
- set up an ICE table;
- plug into PV = nRT;
- take −log for pH.

A working sample is on branch `chem-sample`: a Chemistry tab and §4.3 Reaction Stoichiometry with a Learn page and one problem per level. The app needed only two small changes for it: a chemical-formula notation and a third subject tab.

**Decision (2026-11-06):** chemistry will be its own app, "BYE Chem" (placeholder name), not a tab in BYE Math. It gets chemistry-shaped screens, designed for someone starting from zero: see the [beginner-flow design](https://claude.ai/artifact/5vF771K1LwRRd1EjiAFKQR) and §7. The sample tab on this branch stays as a reference for the notation and content format.

## 1. Level ladder

The ladder mirrors how the Algebra tab feeds Calculus: a foundations strip, then one course numbered by a textbook.

| Tier | Who | What | Source for order and scope |
|---|---|---|---|
| **F · Foundations** | Anyone starting chemistry | Measurement and units, significant figures, scientific notation, dimensional analysis, atoms and isotopes, reading the periodic table, formulas and naming, the mole, balancing equations | A beginning-chemistry book (Ball's *Beginning Chemistry*, chapters 1–5) and OpenStax 2e chapters 1–4 |
| **HS / AP** | High school, AP Chemistry | The 9 AP units (below) | College Board AP Chemistry course page |
| **UC · General chemistry** | First-year university (UC Chem 6A/B/C, 1A/1B, 2A/B/C, 14/20 series) | OpenStax *Chemistry 2e* chapters 1–17, 21 | OpenStax 2e numbering, as Calculus uses Stewart 9e |
| **Beyond** | Second year | Organic chemistry; physical chemistry (calculus-based thermodynamics, kinetics and quantum) | Later, only if wanted |

**Don't write the content three times.**
- **One course, numbered by OpenStax 2e.** AP and UC cover the same chapters at different depth.
- **Levels inside each section.** The existing Simple / Medium / Hard split maps naturally:
  - Simple ≈ intro or high-school depth;
  - Medium ≈ AP;
  - Hard ≈ UC (more steps, less given, a twist).
- **Foundations are their own short strip**, like Algebra's A1–A6. Every chemistry section's "Needs" can link back to them.

### AP Chemistry units → OpenStax chapters

| AP unit (exam weight) | OpenStax 2e chapters |
|---|---|
| 1 Atomic Structure and Properties (7–9%) | 2, 3.1, 6 |
| 2 Compound Structure and Properties (7–9%) | 7, 8 |
| 3 Properties of Substances and Mixtures (18–22%) | 9, 10, 11, 3.3–3.4 |
| 4 Chemical Reactions (7–9%) | 4 |
| 5 Kinetics (7–9%) | 12 |
| 6 Thermochemistry (7–9%) | 5 |
| 7 Equilibrium (7–9%) | 13, 15.1 |
| 8 Acids and Bases (11–15%) | 14 |
| 9 Thermodynamics and Electrochemistry (7–9%) | 16, 17 |

### What UC adds over AP

Only UC San Diego's catalog could be read. Berkeley's, UCLA's and Davis's catalog pages load by script or were down, so the rest of this is not cross-checked.
- **UCSD splits general chemistry into three courses:**
  - 6A: atomic theory, bonding, molecular geometry, stoichiometry, reaction types;
  - 6B: gases, liquids and solids, thermochemistry and thermodynamics, equilibria, solubility;
  - 6C: kinetics, acid–base, electrochemistry, coordination chemistry, intro nuclear.
- **The honors track adds** quantum mechanics and molecular orbital theory.
- **Calculus-based treatment waits** for upper-division physical chemistry (CHEM 130–132, which needs multivariable calculus).

So "up to UC" means OpenStax chapters 1–17, 19 and 21 at Hard level. Molecular orbital theory (§8.4) and coordination chemistry (ch. 19) are the main extras over AP.

**A link worth building on.** UC kinetics (integrated rate laws, half-life) uses ln and exponentials, and thermodynamics uses areas under curves. Those sections can link straight to the app's calculus and algebra sections, which a chemistry-only app couldn't do.

## 2. Course map (OpenStax Chemistry 2e)

Fit, for this app's format:
- **W · Worked fit:** a calculation with named moves. The current problem screen works as it is.
- **L · Learn fit:** mostly ideas. Learn pages and reads carry it, with fewer worked problems.
- **V · Needs new visuals:** a picture the figure engine can't draw yet.

The chapter list is verified against OpenStax. Section titles for chapters 1–2 were checked on the OpenStax site. Those for chapters 3–21 are written from knowledge of the book; **check each chapter's sections on openstax.org before building it.**

| Ch. | Title | Sections (short) | Fit | Tier |
|---|---|---|---|---|
| 1 | Essential Ideas | 1.1 Chemistry in context · 1.2 Phases and classification · 1.3 Physical/chemical properties · 1.4 Measurements · 1.5 Uncertainty, accuracy, precision · 1.6 Mathematical treatment of measurements | W (1.4–1.6: units, sig figs, dimensional analysis), L | F |
| 2 | Atoms, Molecules, and Ions | 2.1–2.2 Atomic theory · 2.3 Atomic structure and symbolism · 2.4 Formulas · 2.5 Periodic table · 2.6 Ionic and molecular compounds · 2.7 Nomenclature | L, W (2.3 average atomic mass), V (periodic table) | F |
| 3 | Composition of Substances and Solutions | 3.1 Formula mass and the mole · 3.2 Empirical and molecular formulas · 3.3 Molarity · 3.4 Other concentration units | **W** | F, AP |
| 4 | Stoichiometry of Chemical Reactions | 4.1 Balancing equations · 4.2 Classifying reactions · 4.3 Reaction stoichiometry · 4.4 Reaction yields · 4.5 Quantitative analysis (titration) | **W** (4.3 is the sample) | F, AP |
| 5 | Thermochemistry | 5.1 Energy basics · 5.2 Calorimetry · 5.3 Enthalpy (Hess's law) | **W**, V (energy diagrams: possible with plots) | AP |
| 6 | Electronic Structure and Periodic Properties | 6.1 Light · 6.2 Bohr model · 6.3 Quantum theory · 6.4 Electron configurations · 6.5 Periodic trends | W (6.1–6.2), L, **V** (orbital diagrams) | AP, UC |
| 7 | Chemical Bonding and Molecular Geometry | 7.1–7.2 Ionic and covalent bonding · 7.3 Lewis structures · 7.4 Formal charge, resonance · 7.5 Bond strengths · 7.6 Molecular shape and polarity | W-like (Lewis structures follow named moves), **V** (Lewis, VSEPR) | AP |
| 8 | Advanced Theories of Covalent Bonding | 8.1 Valence bond · 8.2 Hybridization · 8.3 Multiple bonds · 8.4 Molecular orbital theory | L, **V** | UC |
| 9 | Gases | 9.1 Pressure · 9.2 Ideal gas law · 9.3 Gas stoichiometry · 9.4 Effusion and diffusion · 9.5 Kinetic-molecular theory · 9.6 Non-ideal gases | **W**, V (Maxwell–Boltzmann: plots) | AP |
| 10 | Liquids and Solids | 10.1 Intermolecular forces · 10.2 Liquid properties · 10.3 Phase transitions · 10.4 Phase diagrams · 10.5–10.6 Solids and lattices | L, W (10.3 heating curves), V (phase diagrams: plots; lattices: 3D) | AP |
| 11 | Solutions and Colloids | 11.1 Dissolving · 11.2 Electrolytes · 11.3 Solubility · 11.4 Colligative properties · 11.5 Colloids | W (11.4), L | AP, UC |
| 12 | Kinetics | 12.1–12.2 Rates · 12.3 Rate laws · 12.4 Integrated rate laws · 12.5 Collision theory · 12.6 Mechanisms · 12.7 Catalysis | **W**, V (concentration–time and Arrhenius plots: the engine can draw these) | AP, UC |
| 13 | Fundamental Equilibrium Concepts | 13.1 Equilibria · 13.2 K · 13.3 Le Châtelier · 13.4 Equilibrium calculations (ICE) | **W** | AP |
| 14 | Acid–Base Equilibria | 14.1 Brønsted–Lowry · 14.2 pH and pOH · 14.3 Strengths, Ka/Kb · 14.4 Salts · 14.5 Polyprotic · 14.6 Buffers · 14.7 Titrations | **W**, V (titration curves: plots) | AP, UC |
| 15 | Equilibria of Other Reaction Classes | 15.1 Ksp · 15.2 Lewis acids and bases · 15.3 Coupled equilibria | W | AP, UC |
| 16 | Thermodynamics | 16.1 Spontaneity · 16.2 Entropy · 16.3 Second and third laws · 16.4 Free energy | **W** | AP, UC |
| 17 | Electrochemistry | 17.1 Redox · 17.2 Galvanic cells · 17.3 Cell potentials · 17.4 E°, ΔG°, K · 17.5–17.6 Batteries, corrosion · 17.7 Electrolysis | **W**, V (cell diagrams) | AP, UC |
| 18 | Representative Metals, Metalloids, and Nonmetals | descriptive chemistry | L (low priority) | — |
| 19 | Transition Metals and Coordination Chemistry | coordination compounds, crystal field | L, V | UC |
| 20 | Organic Chemistry | 20.1 Hydrocarbons · 20.2 Alcohols, ethers · 20.3 Carbonyls · 20.4 Amines, amides | L, **V** (skeletal structures) | Beyond (intro) |
| 21 | Nuclear Chemistry | 21.1 Stability · 21.2 Nuclear equations · 21.3 Decay and half-life · 21.4–21.6 Energy, uses, effects | W (21.2–21.3) | AP, UC |

**Worked fit is the bulk of the course.** It covers chapters 1, 3, 4, 5, 9, 12, 13, 14, 16 and 17, about 45 sections, and they work in today's problem screen with no new drawing.

## 3. What the app needs

| Need | Size | Status |
|---|---|---|
| **Chemical notation** in the math markup | Small | **Done in the sample.** `{c:…}` in `src/math/parse.ts` (see below). |
| **Formulas in plain prose** (step text, titles) | Small–medium | Open. The body and title fonts set ₂ low or with a gap. For now, titles name the substance ("water"), and prose uses the Unicode formula. Fix: allow `{c:…}` in `say` and render it with `MathLine`. |
| **A third subject** | Small | **Done** for the hub and sections. Open: chemistry chapter pages (`chapter/[id].tsx` hard-codes "Calculus" as its back label), the "Algebra used" tab name (should be "Skills used" for chemistry), and the "Math" next to the BYE wordmark. |
| **Units** | Small | Partly done: `mol` added. Check atm, kPa, M, K, kJ/mol and J/(g·°C) in the unit rules before writing chapters 5, 9 and 14. |
| **ICE tables in the working** | Medium | Open. Rows can fake it with `full` lines, but a real 3-row table (I / C / E) in the problem screen would read much better. Learn pages already have a `table` block. |
| **Plots** (titration and heating curves, concentration vs time, Arrhenius, Maxwell–Boltzmann, energy diagrams, phase diagrams) | Small each | Possible today: they are functions, segments and regions in the engine's `plot2d`. |
| **Molecule drawings** (Lewis structures, VSEPR shapes, orbital boxes, skeletal formulas) | Large | Open. A new figure kind in BYE Math Engine. The engine's three.js 3D view could do ball-and-stick VSEPR shapes. Lewis structures need a 2D layout of atoms, bonds and lone pairs. |
| **Periodic table reference screen** | Medium | Open. Needed from chapter 2 onwards: a tap-to-see element card with molar masses. |
| **Answer checking** | n/a | Same as Math: the app shows worked examples, with no answer input. |

### How the sample's notation works

Formulas are typed plainly inside `{c:…}`:
- digits after an element or bracket become subscripts;
- `^` marks a charge;
- leading numbers stay as coefficients.

| Typed | Shown |
|---|---|
| `{c:2H2 + O2 → 2H2O}` | 2H₂ + O₂ → 2H₂O |
| `{c:SO4^2-}`, `{c:Na^+(aq)}` | SO₄²⁻, Na⁺(aq) |
| `{c:Ca(OH)2}`, `{c:CuSO4·5H2O}` | Ca(OH)₂, CuSO₄·5H₂O |
| `{c:N2 + 3H2 ⇌ 2NH3}` | N₂ + 3H₂ ⇌ 2NH₃ |

Formulas work inside stacked unit fractions, (2 mol {c:H2O})/(1 mol {c:O2}), so dimensional analysis looks like it does on paper.

**No regressions.** The parser change was tested against all 46,088 math strings in the existing calculus and algebra content, and none render differently.

## 4. Sources and licensing

- **OpenStax's own page states *Chemistry 2e* is CC BY-NC-SA 4.0** (non-commercial, share-alike). The LibreTexts mirror labels it CC BY 4.0, and the 2019 front matter said CC BY 4.0. Treat it as **non-commercial** to be safe.
- **OpenStax's page also says** its books may not be used to train AI models or be fed into generative AI without written permission.
- **What this means for us:** follow OpenStax's **numbering and topic order only**, which are facts and not protected text. Write every word, problem and figure ourselves, as with Stewart. **Never paste OpenStax text into an AI prompt**, including the `textbook-scan` agent; chapter and section titles only. Credit the numbering ("Numbered by OpenStax Chemistry 2e") as the hub already does for Stewart.
- **Ball's *Beginning Chemistry*** (LibreTexts) is CC BY-NC-SA 3.0: use it for scope ideas only.

Sources read:
- [OpenStax Chemistry 2e, chapter 1](https://openstax.org/books/chemistry-2e/pages/1-introduction) and [chapter 2](https://openstax.org/books/chemistry-2e/pages/2-introduction)
- [Chemistry 2e on LibreTexts](https://chem.libretexts.org/Bookshelves/General_Chemistry/Chemistry_2e_(OpenStax)) (chapter list)
- [LibreTexts introductory chemistry shelf](https://chem.libretexts.org/Bookshelves/Introductory_Chemistry) and [Beginning Chemistry (Ball)](https://chem.libretexts.org/Bookshelves/Introductory_Chemistry/Beginning_Chemistry_(Ball))
- [AP Chemistry course overview](https://apcentral.collegeboard.org/courses/ap-chemistry/course) (units and weights)
- [UC San Diego chemistry courses](https://catalog.ucsd.edu/courses/CHEM.html) (CHEM 6A/6B/6C)
- **Not reachable:** UC Berkeley, UCLA and UC Davis catalog pages, which load by script or returned errors. Worth checking by hand if the friend is at one of those campuses.

## 5. Third tab or separate app?

| | Third tab in BYE Math | Separate "BYE Chem" app |
|---|---|---|
| Work to start | **Done** (the sample) | Split the shared code into a package, a second app config, a second site |
| Cross-links | Chemistry → Algebra (ratios, logs for pH, exponentials) and → Calculus (rate laws, thermodynamics) work as they do between Algebra and Calculus | Lost, or duplicated |
| Site and deploys | One Worker, one deploy | Two |
| App Store | One listing, but "BYE Math" undersells chemistry and its keywords are about math | Own name, keywords and screenshots |
| App size | Grows little: each section's problems load only when opened | Smaller |
| Hub | Three tabs fit on a phone (checked at 375 px) | A clean single-subject hub |

**Decided: a separate app.** The user chose a separate app after seeing the sample. The screens shaped for math (method bar, `lhs = rhs` rows, wordy problem on top) didn't fit chemistry, and the app should be built around a beginner's view of the subject. The content files (`learnChem.ts`, `problems/chem*.ts`) and the `{c:…}` notation carry over.

**Still open:** how much code to share. One option is a second build of the same codebase: an `app.config` variant with its own name, icon and screens, sharing the theme, motion, fonts and lazy loading. The other is a new repository that copies the shared pieces. Decide this when the design is approved.

## 6. Suggested build order

1. **Foundations F1–F6**: units and sig figs, dimensional analysis, atoms and isotopes, formulas and naming, the mole, balancing. Then **chapters 3 and 4**. All worked fit, no new drawing. The sample §4.3 is already written to this pattern.
2. **Chapters 5, 9, 13, 14**: worked fit plus engine plots. Add the ICE-table row and the extra units first.
3. **Periodic table screen**, then **chapters 2 and 6**.
4. **Molecule drawings** in the engine, then **chapters 7, 8 and 10**.
5. **UC depth: chapters 12, 16, 17, 21** (with calculus links), then 11, 15 and 19.
6. Chapter 20 (organic intro) and chapter 18 only if wanted.

**Writing.** Use the AGENTS.md split. Once §4.3's pattern is approved, write it into `docs/` as a chemistry addendum to `learn-template.md`. Sections can then be written by Sonnet sessions, two at a time, with every number re-checked by the main model. The sample shows where this goes wrong: a half-figure rounding slip (79.85 vs 79.84) came up and was fixed while writing it.

**Size.** About 20 Foundations and Chapter 1–4 sections are needed before chemistry feels like a course. The whole map is about 110 sections, twice Calculus's 52.

## 7. Designing for beginners

The [beginner-flow design](https://claude.ai/artifact/5vF771K1LwRRd1EjiAFKQR) (`design/chem-app-flow.html`) covers the whole flow: home, topic, Learn, three problem screens, balancing, glossary, molar-mass helper, and two alternative layouts for the working. What it rests on:
- **Three levels.** Chemistry is described at three levels: what you see, the particles, and the symbols (Johnstone, *J. Computer Assisted Learning* 7, 1991). Beginners lose their place moving between them, so the Learn page switches the level on one reaction, and problems show the particle recipe beside the symbols.
- **Working memory.** Wordy questions use it up before the chemistry starts. RSC Education advises stripping them at first and using partly completed, structured calculation layouts ([Parks, RSC Education](https://edu.rsc.org/feature/how-to-help-students-connect-maths-and-chemistry/4024316.article)). Hence the Have / Want chips, the four-station route bar, and factor tiles.
- **Classic slips designed out.** Subscripts are locked, and only the coefficient boxes can change. Grams and moles get two colours, and the recipe step only ever joins two mole stations.
- **Units do the checking.** Each quantity is a tile, and cancelled units are struck through. If a unit doesn't cancel, the tile is upside down.
