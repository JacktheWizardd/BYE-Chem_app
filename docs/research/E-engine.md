# E. BYE Chem Engine: research and design proposal

Date: 2026-11-06. Research only; no code changed. Facts from the math engine are read from `/Users/thewizardd/Documents/Project/BYE-Math_engine` (files cited). Library facts are from the GitHub API / pages cited; anything I could not confirm is marked UNVERIFIED. Licence notes are not legal advice.

## 1. The existing BYE Math Engine

### Pipeline (BYE_MATH_ENGINE.md §3, src/core/figure.ts)
```
JSON figure -> validateSpec (zod, src/spec) -> typed Figure
            -> compile (plot2d only: expressions, dependency graph, src/core/model.ts)
            -> layout -> Scene { primitives[], describe, theme, plot, width, height }   (pure TS, src/core/scene.ts + kinds/*)
            -> renderer: SceneSvg (react-native-svg) | glRenderer (three.js on expo-gl, plot3d only)
```
- `figureToScene(input, {width, theme, measure})` never throws; returns `{ok:true, scene}` or `{ok:false, errors:[{path,message}]}` (figure.ts). Each kind has its own `*Scene` function in `src/core/kinds/` (numberLine, signChart, chart, plot3d).
- Scene primitives are a closed set: `polyline, polygon, line, circle (hollow option), text, mathLabel` (core/layout.ts), each carrying a `role` (style token, not a colour), `clip`, optional `anim`. The renderer is thus tiny (`native/renderScene.tsx`, 150 lines) and any new kind that emits only these primitives gets rendering, animation, theme and a11y for free.
- Entry points (package.json `exports`): `/spec`, `/expr`, `/core`, `/native`, `/native3d`.
- `ByeFigure` (native/ByeFigure.tsx): measures container width, runs `figureToScene`, shows `FigureError` (a box with `describe`) on bad input, wires `accessibilityLabel = scene.describe`, runs the animation clock (rAF), respects Reduce Motion, supports a scroll mode for wide figures, and has `registerFigureRenderer(kind, Component)` so other renderers (3D) plug in per kind.

### Design rules (from the brief and README)
1. Figure = plain JSON written by an AI; nothing positioned by hand, "every pixel comes from the math".
2. Own code; reference libraries (Mafs, JSXGraph) for design only; THIRD_PARTY_NOTICES.md lists every dependency; never take LGPL code.
3. Native first (react-native-svg), no WebView. Renderer swappable because problems only describe figures.
4. `describe` is required and is the accessibility label (schema refuses a figure without it, spec/common.ts `figureBase`).
5. Never crash, never blank: validation errors -> error box showing `describe`.
6. `spec: 0` version field; `kind` discriminates; `strictObject` everywhere so typos fail loudly with hints.
7. Style by `role` (f, F, area, bound, note, text), single `ByeTheme` object (warm paper `#f6f3ec`, ai blue `#2f4b7c`, shu red `#b5462a`, matsu green `#2f6b4a`), thin lines, no legends, label in place, no shadows.
8. Labels placed by a collision-aware placer (core/labels.ts) and reported in `scene.labelCollisions` so content checks can fail on overlap.
9. Animation by step: per-element `animate` (`draw|fill|move|fade|grow`, `duration`, `delay`); `timeline(scene)` / `frameAt(scene, ms)` are pure; final frame is identical to static scene; Reduce Motion shows the final state (core/animate.ts). "Step/until/fade" in the task description maps to delay sequencing + fade; the engine itself has no explicit `step` or `until` field (UNVERIFIED that the app layer adds one; the engine sequences with `delay`).
10. Math labels via TeX -> SVG (react-native-mathjax-svg, MathJax, Apache-2.0).

### What it draws today
- plot2d elements: `function, region, point, segment, line, text, mathLabel, tangent, intersection, contour, vector` (spec/plot2d.ts). Expressions with derivatives, adaptive sampling, gap splitting.
- numberLine (inequalities, intervals), signChart, chart (`bar, histogram, box, dot, scatter` with linear fit), plot3d (`surface, paramSurface, plane, tangentPlane, curve, point, vector, segment, contour`) on three.js + expo-gl with drag rotate.

## 2. Which chemistry figures plot2d already handles

| Figure | plot2d today? | Notes |
|---|---|---|
| Concentration vs time (exp. decay, 1st/2nd order, integrated rate laws) | Yes | `function` with `exp`, `1/(1/A0 + k*x)`; `point`, `tangent` for initial rate; `segment` for half-life markers. |
| Arrhenius (ln k vs 1/T), Eyring, Beer-Lambert, calibration lines | Yes | `line`/`scatter` (chart `scatter` with `fit: linear` gives slope, r). Axis labels via chart `axes`; plot2d `axes.labels` is boolean only, so named axes ("1/T (1/K)") need `text`/`mathLabel` elements or a small spec addition. |
| Maxwell-Boltzmann distributions | Yes | Closed-form function `4*pi*(m/(2*pi*k*T))^1.5 * x^2 * exp(-m*x^2/(2*k*T))`; region under curve past Ea for "fraction with enough energy". Several T curves need roles/colours beyond f/F/bound (only 6 roles). |
| Energy / reaction-coordinate diagrams | Mostly | Smooth curve = function (e.g. sum of Gaussians or a cubic); `segment` for levels, `vector`/`segment` for Ea and dH arrows, `text` labels. Authors would hand-write a profile expression; a dedicated kind computes it from (E_reactants, E_TS, E_products) and is better (see `energyProfile`). |
| Titration curves (strong/weak acid-base) | Partly | A piecewise or implicit pH(V) expression is awkward; strong-strong has closed form, weak acid needs buffer/Henderson regions with jumps. Equivalence point = `intersection`/`point`. A `titration` generator (solve charge balance numerically) would be much more reliable. |
| Heating/cooling curves | Partly | Piecewise linear: draw as `segment`s or a `function` with a piecewise helper; there is no polyline-from-points element (only segment). Add a `polyline` element. Plateaus labelled with `text`. |
| Phase diagrams (P vs T) | Partly | Curves are `function`s of T (Clausius-Clapeyron-like) with `region` fills for phases, triple/critical `point`s; works if the log pressure axis is handled by the author. No log scale in the view (UNVERIFIED: not in spec/plot2d.ts view). Add `scale: "log"` option. |
| Equilibrium Q vs K, ICE bar charts | Yes | `chart bar`. |
| Spectra (IR, mass, NMR) | Partly | sticks = `segment`s; a `spectrum` element would auto-draw peaks. Probably out of Chem 1A beginner scope. |

Gaps in plot2d for chemistry in general: no polyline element, no log axes, no per-axis named labels in plot2d, limited role palette, no reversed axis (IR, ppm). All of these are small additions to the existing kind, not new kinds.

## 3. Figure kinds a beginner to Chem 1A needs, and how to lay them out from data

Principle: author gives chemistry (formula, SMILES, electron config, counts); engine produces geometry. Never coordinates.

### 3.1 particleBox (atoms/molecules in a container; before/after; gas)
- Shows: container (rect), N particles of each species as circles (or small molecule glyphs), counts per species, optional "before | arrow | after" panels, optional piston/lid, optional temperature cue (speed ticks) for gas.
- Layout: deterministic seeded packing. Poisson-disc / relaxation (a few dozen iterations of pairwise repulsion with a seeded PRNG) so no overlaps, even spread, same picture every render. Counts come from the data (e.g. `{ "H2": 6, "O2": 3 }`), so the picture is always stoichiometrically right. Compound particles reuse the `molecule2d` glyph at reduced scale; "gas" = loose spacing, "liquid" = tight random packing, "solid" = lattice (square/hex) placement.
- Constraint check in core: before/after atom counts conserved per element, else validation error (a strong content check; mirrors the math engine's exactness tests).
- Animate: particles `fade` in; a reaction step can `move` reactants toward centre then `fade` products (use existing `move`/`fade`).

### 3.2 reaction ("recipe" with molecules as balls)
- Shows: reactants + products with coefficients, arrow, each molecule as ball-and-stick glyphs, coefficient numbers, optional conditions above arrow.
- Layout: horizontal row (wrap to rows at phone width). Each species laid out by the molecule2d algorithm and scaled to a common bond length; auto-balance check: count atoms each side from formulas, error if unbalanced (unless `unbalanced: true`). Coefficient n draws n copies when `copies: true` (ball-picture style) or a numeral otherwise.

### 3.3 molecule2d / molecule3d (ball-and-stick, space-filling, VSEPR)
- Shows: atoms as circles coloured by element (CPK-style) with symbol, bonds as 1/2/3 parallel lines, lone pairs optional, partial charges / dipole arrow optional, wedge/dash bonds for 3D hint.
- 2D layout options: (a) from SMILES with a 2D coordinate generator (RDKit/OpenChemLib/SmilesDrawer, see §4); (b) for the small beginner set (diatomics, H2O, CO2, NH3, CH4, SO2, BF3, PCl5, SF6, small organics) generate from a central atom + ligand list using VSEPR (below) projected to 2D with wedges. (b) is tiny to write and deterministic, so it is the recommended start.
- 3D: VSEPR gives unit direction vectors per electron-domain geometry; bond lengths from a covalent radius table; draw via three.js (reuse native3d: sphere meshes + cylinders + lights; the engine already uses three + expo-gl). Space-filling = van der Waals radii spheres. Drag-rotate already exists in `ByeFigure3D`.
- VSEPR from steric number (standard textbook table; no source needed beyond a textbook, e.g. LibreTexts https://chem.libretexts.org is CC BY-NC-SA 4.0 for text, so do not copy text; the angles are facts):

| steric number | electron geometry (ideal angles) | lone pairs -> molecular shape |
|---|---|---|
| 2 | linear 180 | 0 linear |
| 3 | trigonal planar 120 | 0 trigonal planar; 1 bent (<120) |
| 4 | tetrahedral 109.5 | 0 tetrahedral; 1 trigonal pyramidal (~107); 2 bent (~104.5) |
| 5 | trigonal bipyramidal 90/120 | 0 TBP; 1 seesaw; 2 T-shaped; 3 linear (lone pairs go equatorial) |
| 6 | octahedral 90 | 0 octahedral; 1 square pyramidal; 2 square planar (lone pairs opposite) |

  Steric number = bonded atoms + lone pairs on central atom; lone pairs = (valence electrons - bonds-to-ligands formal accounting)/2. Direction vectors: tetrahedron (1,1,1),(1,-1,-1),(-1,1,-1),(-1,-1,1) normalised, etc. Slight angle compression per lone pair is a table of nominal values, with an option `exact: false` that keeps ideal angles.

### 3.4 lewis (dots, bonds, lone pairs, formal charges)
- Shows: element symbols, bond lines (single/double/triple), lone pairs as dot pairs, formal charge circled, brackets with overall charge for ions, resonance arrows between structures.
- Layout: skeleton from the same VSEPR 2D projection (central atom + ligands arranged at 2D angles by steric number, ignoring lone pairs for angle choice or using them as extra directions to place the dots). Lone pair dots sit in the free angular slots (placement uses the same collision placer logic). Electron counting is done in core: valence electrons, octet fill, formal charge = V - L - B/2; validation error if the figure's declared charges/dots don't add up. Autogeneration of Lewis structure from formula (octet-completion search with formal-charge minimisation) is a bounded search for small molecules; allow author to give `bonds` explicitly and have the engine validate, and generate only as a convenience. Clearly flag resonance/expanded-octet cases as author-specified.

### 3.5 orbitalBox and energy-level diagrams
- orbitalBox: boxes grouped by subshell (1s, 2s, 2p x3 ...), arrows up/down, filled by Aufbau + Hund's rule + Pauli from an electron count or element symbol; exceptions (Cr, Cu) from a small table. Layout is a straight grid with subshells ordered by energy (stacked bottom to top) or row-by-row; labels on left. Author passes `{element:"N"}` or `{config:"1s2 2s2 2p3"}` and optionally `highlight` / `animate` order for step-by-step filling (`fade` per arrow in fill order). Core validates electron count <= capacity.
- energyLevels: Bohr hydrogen levels E_n = -13.6/n^2 eV (computed), transition arrows (emission/absorption) with wavelength computed from Rydberg; or multi-electron sublevels. Layout: log-ish y scale per n so levels are readable (compressed spacing); arrows from level to level; colour of arrow from wavelength (visible spectrum mapping). Can partially be built on plot2d (`segment`, `vector`), but a dedicated kind gives auto labels and the wavelength maths.

### 3.6 periodicTable (+ trend heat maps)
- Shows: 18-column grid (with f-block row separated), symbol, atomic number, optionally mass; highlight sets (a group, a block, a few elements), colour by category or by numeric property (electronegativity, atomic radius, IE) with legend-less in-place numbers, arrows for trends (radius, IE direction).
- Layout: pure grid from (period, group) data. On a phone (338pt wide, 18 columns ~ 18pt each) it is too small to read symbols at 11pt min, so use the engine's scroll mode (`scene.scroll`) or show a window of elements (`range: "1-18"`, `period: 2-3`, or `focus: ["Na","Mg","Al"]`). Heat map: sequential colour ramp from the theme (single hue, e.g. ai blue tint steps), values from the data table.

### 3.7 atomTally (atom-count tally)
- Shows: per element a row/column of tally blocks or dots (e.g. left vs right side of equation), balanced/unbalanced state per element, total counts. Layout: bar-like grid of unit circles, colour per element. Computed from formulas + coefficients (parse "Ca(OH)2" with nested parentheses and hydrates "·5H2O" in core). Could reuse `chart bar` internals; separate kind for the clean look.

### 3.8 bohr model
- Shows: nucleus (p+ n0 counts), concentric shells with electrons in them (2, 8, 8, 18...), optional highlight of valence shell. Layout: circles at radii r_n = r0 * sqrt(n) or linear step; electrons evenly spaced on each ring with a start angle offset per shell so they do not line up; shell occupancy from Aufbau-by-shell table. Animate: electrons `fade` in, optionally orbit (the engine has no orbit animation, a `move` along a circle path would work as a loop; keep static for now).

### 3.9 unitChain (unit-cancel chain)
- Shows: a horizontal chain of fractions `(value unit / value unit) x (...) = result`, with units that cancel struck through (diagonal line) in the same colour, final unit remaining. Layout: each factor stacked numerator over denominator using `mathLabel`/`text` primitives, measured by the existing `Measure` hook; matching units across numerator and denominator are cancelled by core (unit algebra on strings, exponents), significant figures optionally computed. Animate: cancel strokes `draw` in step order. Pure core logic; renders with existing primitives plus `line`.

Further small kinds likely needed later: `lab` glassware (beaker with level, buret), `isotopes`/`massSpec` bars, `crystalLattice` (3D, native3d), `molecule3d` reaction coordinates, `phaseParticles` triplet (s/l/g) which is `particleBox` presets.

## 4. Library survey (licences from GitHub API / pages; re-check LICENSE files before adoption)

| Library | Licence | RN feasibility | Maintenance | Use? |
|---|---|---|---|---|
| RDKit MinimalLib / `@rdkit/rdkit` https://github.com/rdkit/rdkit , https://www.npmjs.com/package/@rdkit/rdkit | BSD-3-Clause (GitHub API https://api.github.com/repos/rdkit/rdkit; npm listing via search result https://npmjs.com/package/@rdkit/rdkit) | WASM (`RDKit_minimal.wasm` + `.js`); npm package unpacked 13.8 MB (search summary; wasm size alone not found). React Native's Hermes has no WebAssembly support as far as I know (UNVERIFIED for the current RN 0.88 / Hermes); would need a WebView or JSC. Violates "no WebView". | Active, pushed 2026-11-06 | No for runtime. Could be used offline at build/authoring time to precompute 2D coords from SMILES and ship coords in the figure JSON. |
| OpenChemLib JS https://github.com/cheminfo/openchemlib-js | BSD-3-Clause (API https://api.github.com/repos/cheminfo/openchemlib-js) | JS build of the Java library (GWT-style output, I believe; UNVERIFIED), not WASM; DOM-free core with `Molecule.fromSmiles`, `inventCoordinates`, `toSVG`. Bundle size UNVERIFIED (known to be large, in the MB range). No documented RN support; would need a trial in Hermes. | Active, pushed 2026-11-03 | Best candidate if SMILES -> 2D coords is wanted at runtime; test in Expo first. Otherwise offline precompute. |
| SmilesDrawer https://github.com/reymond-group/smilesDrawer | MIT (API https://api.github.com/repos/reymond-group/smilesDrawer) | Pure JS; but the drawer targets Canvas/SVG DOM. The parser + graph + layout stages are separable in principle but depend on the library's internals; no stated RN support (UNVERIFIED). Size "small" per its description. | Active, pushed 2026-10-29 | Possible: use parser+layout only and emit our own primitives. Needs a spike. |
| Kekule.js https://github.com/partridgejiang/Kekule.js | MIT (API https://api.github.com/repos/partridgejiang/Kekule.js) | Pure JS but DOM/canvas oriented widget toolkit; heavy. | Pushed 2026-09-21 | No: overkill, DOM-bound. |
| 3Dmol.js https://github.com/3dmol/3Dmol.js | BSD per README ("licensed under the BSD license"); GitHub reports "Other"/NOASSERTION, variant not stated (https://github.com/3dmol/3Dmol.js) | WebGL + DOM, own renderer; not RN. | Active | No: we already have three.js + expo-gl. |
| Ketcher https://github.com/epam/ketcher | Apache-2.0 (API https://api.github.com/repos/epam/ketcher) | Browser editor (React/DOM), uses Indigo WASM for chemistry. | Active, pushed 2026-11-06 | No: an editor, not a figure renderer. |
| ChemDoodle Web Components https://web.chemdoodle.com | GPLv3, proprietary licence sold for closed products; SVG output reserved for paying customers (https://web.chemdoodle.com/installation/license, https://web.chemdoodle.com/store/proprietary-licensing as summarised in a search) | Canvas/WebGL, DOM | n/a | No: GPL / paid. |
| PhET simulations https://github.com/phetsims | HTML sim executables CC BY 4.0 for sims released before 2026-03-29, modifications not permitted, PhET logo must stay, promo use needs a separate licence (https://phet.colorado.edu/en/licensing/html). Source code: GPL-3.0 for HTML sim source and MIT for some common code per PhET terms (secondary summary, https://phet.colorado.edu/about/software-agreement_v7.htm); `phetsims/molecule-shapes` repo has no LICENSE file in GitHub metadata (API shows null) and its README says it is no longer maintained (https://github.com/phetsims/molecule-shapes). UNVERIFIED per-repo. | Own scenery/Joist framework, DOM. | Moved to a monorepo | Reference only for particle/VSEPR design; copying code is GPL-3 -> never. Do not adopt their art. |
| JSmol / Jmol https://github.com/BobHanson/Jmol-SwingJS | LGPL-2.1 (API https://api.github.com/repos/BobHanson/Jmol-SwingJS) | Java-to-JS (SwingJS), DOM/WebGL, huge. | Active | No: LGPL + heavy + DOM. Same rule the math engine applies to JSXGraph's LGPL option. |

Recommendation: do not take a runtime cheminformatics dependency in stage 1. Write our own VSEPR + small-molecule layout. If SMILES is needed later, add a build-time step (RDKit or OpenChemLib in Node, BSD-3) that emits coordinates into the figure JSON, which keeps the app free of WASM/WebView and keeps "nothing positioned by hand" true for authors (coordinates are generated, not typed). Re-evaluate openchemlib-js at runtime after an Expo/Hermes spike.

## 5. Data

- **Atomic weights.** IUPAC CIAAW "Standard Atomic Weights 2024" table at https://ciaaw.org/atomic-weights.htm; page shows only "© CIAAW, 2007-2024" and links to privacy/impressum; I found no explicit reuse licence (UNVERIFIED terms). Values are facts, but check the CIAAW terms and cite the source in THIRD_PARTY_NOTICES. Format caveats: elements with natural variation are intervals (e.g. H [1.00784, 1.00811]) with a "conventional" single value for textbooks; no standard weight for Tc and Po onward (mass number of the longest-lived isotope is used in textbooks). Use conventional values rounded to 4-5 sig. figs. and say so.
- **PubChem periodic table** https://pubchem.ncbi.nlm.nih.gov/periodic-table/ : page blocked by a browser check during research (UNVERIFIED terms). NCBI policy (https://www.ncbi.nlm.nih.gov/home/about/policies/): NCBI places no restrictions on molecular data it holds, but PubChem content may be copyrighted by sources, and users must follow data-source terms. Its element properties come from various sources; treat as a reference, not the primary source.
- **Open element JSON.** Bowserinator/Periodic-Table-JSON https://github.com/Bowserinator/Periodic-Table-JSON : GitHub reports no licence (NOASSERTION) -> treat as not reusable until clarified; do not copy.
- **CPK / Jmol colours.** Overview and comparison of CPK/Jmol/RasMol colour tables: https://en.wikipedia.org/wiki/CPK_coloring ; Jmol's default element colours are published at https://jmol.sourceforge.net/jscolors . Jmol code is LGPL-2.1 (see above); the colour table is a list of facts (RGB per element), but I did not find an explicit licence on it (UNVERIFIED). Recommendation: define our own muted palette keyed to the BYE theme (C grey-ink, H white/pale, O shu red, N ai blue, S ochre, etc.), consistent with "colors that mean something", instead of copying Jmol's saturated set. That avoids the issue and fits the warm paper look.
- **Other tables we'd compile ourselves** from textbook facts (no copying of text): electronegativity (Pauling), covalent and van der Waals radii, valence electrons, Aufbau order and exceptions, common ion charges, group/period layout. Prefer citing primary sources (IUPAC, CRC Handbook) and note them in the notices file. Verify each value against two sources; ship as a small TS/JSON module with a test.
- **VSEPR rules**: facts, see §3.3 table; no licence issue as long as we write our own tables.

## 6. Proposed BYE Chem Engine

### 6.1 Package shape (mirror of the math engine)
```
bye-chem-engine/spec      zod schema + types (ChemFigure union), validateSpec, figureJsonSchema()
bye-chem-engine/chem      pure TS chemistry core: element data, formula parser, VSEPR, electron config, balance, unit algebra
bye-chem-engine/core      validateFigure, figureToScene (kinds -> Scene), re-exports the math engine's Scene/timeline/frameAt/theme
bye-chem-engine/native    <ChemFigure> (thin wrapper) + SceneSvg re-use
bye-chem-engine/native3d  molecule3d / crystal on three.js + expo-gl (reuse math native3d helpers)
```
Decision to take: either (A) a separate package that depends on `bye-math-engine` and registers its kinds, or (B) add chem kinds into the math engine itself (`kind` union grows). I'd pick (A) in one repo/workspace, with the chem package exporting `chemFigureToScene` and a `ChemFigure` that dispatches: if `kind` is a chem kind use chem core, otherwise hand the figure to `ByeFigure` (plot2d, chart etc). This gives "plot2d reuse" for free and keeps chemistry data out of the math package. Requires bye-math-engine to export what chem needs (see 6.3), since `FIGURE_KINDS` is a closed tuple and `validateSpec` throws "Unknown figure kind" for anything else (spec/index.ts). A small refactor there (pluggable kind registry) is the main cross-repo change.

### 6.2 Draft figure kinds with JSON examples (spec 0)
All carry `describe`; coordinates are never given by the author.

particleBox
```json
{ "spec": 0, "kind": "particleBox", "seed": 3,
  "panels": [
    { "label": "before", "contents": { "H2": 6, "O2": 3 }, "phase": "gas" },
    { "label": "after",  "contents": { "H2O": 6 },         "phase": "gas" } ],
  "arrow": "reaction", "conserve": true,
  "describe": "Six H2 and three O2 molecules in a box become six H2O molecules." }
```
reaction
```json
{ "spec": 0, "kind": "reaction",
  "reactants": [ {"formula": "N2", "n": 1}, {"formula": "H2", "n": 3} ],
  "products":  [ {"formula": "NH3", "n": 2} ],
  "show": "balls", "check": "balanced", "condition": "Fe, 450 C",
  "describe": "One N2 and three H2 make two NH3." }
```
molecule2d
```json
{ "spec": 0, "kind": "molecule2d",
  "formula": "H2O", "style": "ballStick", "lonePairs": true, "polarity": true,
  "labels": ["O", "H", "H"],
  "describe": "Water: bent, 104.5 degrees, with two lone pairs on oxygen." }
```
molecule3d (native3d)
```json
{ "spec": 0, "kind": "molecule3d",
  "center": "S", "ligands": ["F","F","F","F"], "lonePairs": 1,
  "style": "ballStick", "rotate": true, "showAngles": [[1,0,2]],
  "describe": "SF4 seesaw: four fluorines around sulfur with one lone pair." }
```
(Also `"smiles": "CC(=O)O"` as an alternative to `formula`/`center`, laid out via precomputed coordinates, see 6.4.)

lewis
```json
{ "spec": 0, "kind": "lewis",
  "central": "C", "ligands": [ {"atom":"O","bond":2}, {"atom":"O","bond":2} ],
  "check": true, "charge": 0,
  "describe": "Lewis structure of CO2: carbon double-bonded to two oxygens, each with two lone pairs." }
```
orbitalBox
```json
{ "spec": 0, "kind": "orbitalBox", "element": "N", "layout": "stacked",
  "highlight": "valence", "animate": { "order": "aufbau" },
  "describe": "Orbital box diagram of nitrogen: 1s2 2s2 2p3 with three unpaired 2p electrons." }
```
periodicTable
```json
{ "spec": 0, "kind": "periodicTable",
  "window": { "periods": [1, 3] },
  "color": { "by": "electronegativity", "ramp": "ai" },
  "highlight": ["Na", "Cl"], "trendArrow": "right",
  "describe": "First three periods shaded by electronegativity, increasing to the right." }
```
plot2d reuse (concentration vs time; unchanged math-engine spec, just chemistry content)
```json
{ "spec": 0, "kind": "plot2d", "view": { "x": [0, 60], "y": [0, 1.2] }, "grid": { "x": 10, "y": 0.2 },
  "elements": [
    { "id": "A", "type": "function", "y": "1.0*exp(-0.05*x)", "label": { "tex": "[A]", "at": 40 } },
    { "type": "tangent", "to": "A", "at": 0, "length": 14, "role": "bound" },
    { "type": "segment", "from": ["ln(2)/0.05", 0], "to": ["ln(2)/0.05", 0.5], "role": "note",
      "label": { "text": "half-life 13.9 s", "at": "below" } } ],
  "describe": "First-order decay of A with half-life about 13.9 s." }
```
Others (not yet drafted): `atomTally`, `bohr`, `unitChain`, `energyLevels`, `energyProfile`, `titration`, `heatingCurve`.

### 6.3 What to share from bye-math-engine
- Spec building blocks: `figureBase` (spec, aspect, required `describe`), `Id`, `Role`, `Animate`, `Label`, `elementBase`.
- `Scene` and `Primitive` types, `SceneOptions`, `Measure` (text/tex measurement), `ByeTheme` (add chem roles: element colours, bond, lonePair, charge, electron, nucleus), `textPrim`, `centeredBox`, label placer `placeLabels` and `labelCollisions`, `FigureError`.
- Animation: `timeline`, `frameAt`, `PrimAnim` kinds, `useFigureClock`, `rafDriver`, Reduce Motion.
- Renderer: `SceneSvg` (draws every kind that emits the existing six primitives), `ByeFigure` shell (container measurement, error box, a11y label, scroll mode), `MathLabel` for subscripts/charges via TeX (`H_2O`, `SO_4^{2-}`, or a lighter formula formatter to avoid MathJax cost for chemical formulas).
- native3d: `createGLScene`, camera, expo-gl wiring and the renderer hack for expo-gl/three WebGL2; molecules are spheres + cylinders under the same lights; `registerFigureRenderer('molecule3d', ...)`.
- plot2d/chart kinds for kinetics, Arrhenius, Maxwell-Boltzmann, scatter fits.

Needed in math engine (small changes): pluggable kind registry in `validateSpec`/`figureToScene` (currently hard-coded switch/union), a `circle` primitive variant with `fill` role or per-primitive colour (roles are now fixed by name), an optional `arc`/`path` primitive (curved arrows, orbits, wedge bonds need `polygon` today which works but arcs would be cleaner), `polyline` and log-axis options in plot2d, extra roles.

### 6.4 Libraries vs write ourselves
| Need | Choice | Reason |
|---|---|---|
| Element data, formula parser, balancing, electron configs, VSEPR geometry, Lewis electron accounting, unit algebra | Write ourselves (`bye-chem-engine/chem`) | Small, deterministic, testable, no licence risk, no bundle cost |
| 2D molecule layout for simple molecules | Write ourselves (VSEPR projection) | Covers beginner set; same geometry feeds 3D |
| 2D layout for arbitrary SMILES (rings, organics) | Build-time tool using RDKit or OpenChemLib (BSD-3) emitting coords into figure JSON; evaluate openchemlib-js at runtime in a spike | WASM and WebView excluded; BSD-3 allows it, needs notice entry |
| Rendering | Existing SceneSvg + three.js/expo-gl | Already shipped and licensed (MIT) |
| TeX/formula labels | react-native-mathjax-svg (existing) or a tiny formula formatter | Subscript-heavy text is simple enough to format directly |
| Element colours, radii | Own palette, own table | Avoids unverified licences, fits BYE look |
| Never | ChemDoodle (GPL/paid), JSmol/Jmol (LGPL), PhET code (GPL-3) | Same policy as the math engine's rule against LGPL code |

### 6.5 Risks
1. **Cross-repo coupling.** Math engine's kind list is closed; chem needs a registry change there. Version/stability of the shared `Primitive` set matters (changing it breaks both).
2. **SMILES at runtime.** Likely requires heavy JS or WASM; Hermes/WebAssembly support is UNVERIFIED. Decide early: precompute coords at author time (recommended).
3. **Correctness of chemistry** (balancing, formal charge, expanded octets, resonance, exceptions in electron configs, VSEPR angle deviations). Mitigate with core validation errors and unit tests against textbook cases; AI-written figures will be wrong sometimes, so check functions matter more than in math.
4. **Label clutter on a phone.** Periodic table (18 columns), big molecules, many particles; needs scroll or windowing and 11pt minimum text. The collision placer may not suffice for dense atom labels.
5. **Colour and accessibility.** Element colours must be distinguishable (colour-blind safe) and not carry meaning alone; symbols always printed; `describe` must be auto-checked for presence and non-trivial text.
6. **Data licence uncertainty** for CIAAW and PubChem; Periodic-Table-JSON has no licence. Compile our own table with cited sources.
7. **3D cost.** expo-gl and three increase bundle and need a development build or Expo Go support; run only where rotation helps (VSEPR) and fall back to 2D with wedges.
8. **Particle randomness.** Must be seeded so the same figure renders identically and screenshots/tests are stable; before/after panels must keep particle identity for reaction animation.
9. **Scope creep to organic chemistry** (stereochemistry, aromatic rings): out of scope for Chem 1A beginner stage; keep SMILES path optional.
10. **PhET naming/branding:** do not use PhET art or names; their sims are only inspiration.
