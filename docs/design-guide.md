# BYE Chem visual design guide

*2026-11-06, revised the same day after checking it against real chemistry tools and research (§11). How BYE Chem draws chemistry, independent of which engine ends up drawing it. The look is **図 Drafting table**, with three technical layers (engineering drawing, instrument readout, cut-away). Graphs are drawn by **BYE Math Engine**, so a chemistry graph looks exactly like a math graph. The 3D chemistry engine is **not decided**; this guide is what any engine must meet.*

Live reference: `design/chem-design-guide.html` (every rule drawn). The style concepts are in `design/chem-technical-styles.html`. The comparisons behind §11: `docs/research/I-tools-vs-guide.md` (real tools and standards) and `docs/research/J-research-vs-guide.md` (research).

## 1. The look

| Part | Rule |
|---|---|
| Ground | Paper `#f6f3ec`, hairline floor grid `#e8e2d6` / `#d9d1c2` in 3D, no dark backgrounds |
| Ink | Outlines and box edges `#1e1c19`; dimension and secondary lines `#5a554d` |
| Bonds | `#8a8378` (3.4:1 on paper; the old `#b9b1a3` was 1.9:1, below the 3:1 graphics minimum) |
| Atoms | **Every atom has a thin ink outline** (paper-white H is otherwise invisible on paper: 1.05:1). Every atom carries its element letter whenever it is bigger than about 16 px on screen |
| Measured / highlighted | Shu red `#b5462a` for angle arcs, dimension values and the value being read. **Highlights never recolour an atom**: a highlighted atom or molecule gets a shu ring or halo and keeps its element colour |
| Where you are | Coral `#d9846a`, UI only (tabs, current step). Never inside a molecule scene, where it would read as oxygen |
| Materials | Matte (Lambert-type), no gloss or metal; soft sky light plus one key light from upper left |
| Depth | Every 3D scene has a depth cue: the ink outline plus a soft contact shadow or ambient occlusion |
| Type | Formulas, numbers and units in STIX Two Text; labels in Zen Kaku Gothic New; titles in Shippori Mincho |
| Motion | Calm: things move only when the chemistry moves. Every animation has pause, step and replay; the quantity that is changing is cued (ring, readout). With Reduce Motion on, particles stand still and numbers still update |

### Element colours

The CPK/Jmol colour families chemists recognise (Jmol defaults: oxygen red, nitrogen blue, sulfur yellow, chlorine green, phosphorus orange), muted for paper. Our own values; no colour table is copied. Letter colours are chosen for at least 4.5:1 contrast.

| Element(s) | Colour | Letter | Letter contrast |
|---|---|---|---|
| H | `#fbf9f4` paper white | ink | 16.2 |
| C | `#4a4641` charcoal | white | 9.4 |
| N | `#6f86ad` slate | ink | 4.6 |
| O | `#cf7a62` clay | ink | 5.4 |
| S | `#d9b44a` ochre | ink | 8.6 |
| P | `#d98a3d` amber | ink | 6.2 |
| F, Cl | `#7fa36b` sage | ink | 6.0 |
| Br | `#9b5a4a` brick | white | 5.3 |
| I | `#7a5a8c` plum | white | 5.7 |
| Alkali metals | `#8e7cc3` violet | ink | 4.7 |
| Alkaline earths | `#6f9a8c` teal | ink | 5.4 |
| Transition metals | `#a3998a` steel | ink | 6.1 |
| Noble gases | `#b9a6c9` lilac | ink | 7.6 |

Oxygen (clay) and chlorine (sage) can look alike with red-green colour blindness; the letters carry the difference. Check every new scene with a colour-blindness simulator.

## 2. The three layers

| Layer | Shows | Use it for | Don’t |
|---|---|---|---|
| **製図 Engineering drawing** | Dimension lines with end ticks, angle arcs in shu, an axis triad, a title block (part, shape, scale) | Molecule shapes (Ch 7), bond lengths, unit cells (Ch 10), Learn pictures | Show more than one dimension and one angle at a time by default; add them step by step. A “show all” toggle is fine for confident learners |
| **計測 Instrument readout** | Velocity arrows, live gauges, a live graph under the scene | Gas and reaction sandboxes (Ch 4, 9, 12, 13) | Show a gauge without its unit, or a measured value without the theory value beside it |
| **断面 Cut-away** | Atoms at van der Waals size as faint shells, a clip that always faces the viewer, section planes | “Real size” toggle on any molecule; liquids, solids and solutions (Ch 2, 7, 10, 11) | Leave shells on in big scenes (cost); hide the ball-and-stick model inside |

## 3. Notation (how chemists write)

Rules follow IUPAC’s *Quantities, Units and Symbols in Physical Chemistry* (the “Green Book”, 3rd ed., 2007, [doi:10.1039/9781847557889](https://doi.org/10.1039/9781847557889)). Where BYE Chem deliberately follows the classroom form instead, it says so. The exact `Rich` markup for each rule, and the checks that enforce it, are in [notation.md](notation.md).

- **Quantity symbols italic, units upright:** *p* = 101.3 kPa, *T* = 298 K, *V* = 25.0 mL. Element symbols upright.
- **A space between number and unit**, including °C: 25 °C, 0.100 mol L⁻¹. No degree sign with K: 298 K.
- **Percent:** the Green Book puts a space before % (12 %). *Classroom exception:* running text writes 12% as US textbooks and ACS-style materials do; data tables follow the Green Book. Never put % in an axis label’s unit.
- **Concentration:** *c*(HCl) = 0.100 mol L⁻¹. *Classroom exception:* problems use M (0.100 M) because Chem 1A does; the first time M appears, it says “M means mol L⁻¹”. Square brackets [H⁺] for equilibrium concentrations.
- **Charges:** number before sign, raised: SO₄²⁻, Fe³⁺, Cl⁻.
- **State symbols** in round brackets: H₂O(l), NaCl(aq), CO₂(g), Fe(s).
- **Arrows:** → reaction; ⇌ equilibrium; ↔ resonance only; conditions above or below the arrow.
- **Isotopes:** mass number upper left, atomic number lower left: ¹⁴₆C.
- **Oxidation states:** Roman numerals in names, iron(III) chloride. IUPAC writes oxidation numbers as raised Roman numerals on the symbol (Fe^III); *classroom form:* when assigning them, signed numbers above the atoms (+3, −2), as Chem 1A textbooks do. Both are taught; the IUPAC form appears in the element card.
- **Numbers:** ×10ⁿ, never “E”; sig figs follow the data; thin-space digit groups in data tables (299 792 458).
- **Graph axes:** quantity / unit, e.g. *T* / K, *V*(NaOH) / mL. The plain name can lead: “Temperature, *T* / °C”.

## 4. Structures (2D)

Rules follow IUPAC’s *Graphical representation standards for chemical structure diagrams* (Pure Appl. Chem. 80, 277–410, 2008, [doi:10.1351/pac200880020277](https://doi.org/10.1351/pac200880020277)), and the common ChemDraw “ACS Document 1996” proportions (bond length ≈ 14.4 pt, line ≈ 0.6 pt, labels ≈ 10 pt, chains at 120°).

| Drawing | Rule |
|---|---|
| **Lewis structure** | Bonds as lines, lone pairs as dot pairs. Formal charge: a single + or − may be circled; any other charge (2+, 2−) is written plainly beside the atom, not circled. Resonance forms in square brackets joined by ↔ |
| **Condensed formula** | CH₃CH₂OH; groups in brackets with a subscript, (CH₃)₃C– |
| **Skeletal (line-angle)** | Zig-zag at 120°; carbons are corners and ends, not labelled; H on carbon not drawn; heteroatoms labelled with their H (OH, NH₂) |
| **Stereo bonds** | Solid wedge toward the viewer, hashed wedge away; narrow end at the stereocentre |
| **Line weights** | Bond strokes about the same weight as the letters’ strokes; all bonds the same length in 2D |
| **2D ↔ 3D link** | Every 2D structure has a “see it in 3D” view of the same molecule. Tapping an atom or bond highlights it in both, because translating between 2D drawings and 3D shapes (especially wedges and dashes) is a documented difficulty |
| **Alt text** | Every structure has a text description: formula, name, and what it shows (“water: O bonded to two H, two lone pairs on O”) |

## 5. 3D models

| Model | Rule |
|---|---|
| Ball-and-stick (default) | Ball radius = 0.3 × van der Waals radius (as ChimeraX does: H ≈ 0.36, C ≈ 0.51, N ≈ 0.47, O ≈ 0.46 Å); sticks 0.15–0.2 Å |
| Space-filling / real size | Bondi van der Waals radii (H 1.20, C 1.70, N 1.55, O 1.52 Å); the cut-away layer |
| VSEPR shapes | Ideal angle labelled: linear 180°, trigonal planar 120°, tetrahedral 109.5°, trigonal bipyramidal 90°/120°, octahedral 90°; molecules with lone pairs show the measured angle (NH₃ 107°, H₂O 104.5°) |
| Orbitals | Matte translucent lobes; phase in two tones *and* a + / − sign |
| Unit cells | Simple cubic, body-centred, face-centred; edge length dimensioned |
| Control | The learner turns the model (drag), and a reset button returns to the starting view. No single model type is best for learning; offer model / cut / real size and let the task choose the default |

Scale: 1 scene unit = 1 Å for molecules, stated in the title block. Gas boxes are drawn in nm with molecules enlarged; the scene says so.

## 6. Graphs (drawn by BYE Math Engine)

Each graph is an engine figure (`plot2d` for curves and areas, `chart` for bars and histograms), with the math app’s axes, labels, animation and accessibility.

| Graph | Chapter | Engine today |
|---|---|---|
| Heating / cooling curve | 1, 10 | plot2d segments: ready |
| Concentration vs time; ln[A] and 1/[A] vs t | 12 | plot2d function: ready |
| Arrhenius plot, ln *k* vs 1/*T* | 12 | plot2d / scatter with linear fit: ready |
| Energy (reaction-coordinate) diagram | 5, 12 | plot2d function + labels: ready |
| Maxwell–Boltzmann speed distribution | 9 | plot2d function (exp, pi) + bars as regions: ready |
| Titration curve, pH vs volume | 4, 14 | plot2d function: ready |
| Beer–Lambert calibration line | 4.5 | chart scatter with linear fit: ready |
| Emission / absorption line spectrum | 6 | plot2d segments: ready |
| Phase diagram | 10 | needs a log pressure axis: **engine addition** |
| IR (transmittance vs wavenumber) and NMR (δ / ppm) | later | need a reversed x-axis: **engine addition** |

Reading graphs is hard for students (titration and kinetics graphs especially), so graphs teach how to read them:
- **Callouts** on the features that matter (equivalence point, half-life, plateaus, *E*ₐ, Δ*H*).
- **A moving marker** that links the graph to the scene (the point on the titration curve moves as the buret drains).
- **Predict, then reveal:** where a graph is the answer, the learner sketches or picks a shape first.

## 7. The chemist’s toolkit: what BYE Chem should offer

| Tool | What it does | Chapters |
|---|---|---|
| Periodic table (IUPAC groups 1–18) | Any element; trend heat maps | 2, 6 |
| Element card | Z; standard atomic weight (abridged value, with the IUPAC interval on tap, e.g. H [1.00784, 1.00811]); configuration; oxidation states; electronegativity | 2, 6, 7 |
| Isotopes | Masses and natural abundances; average atomic mass worked out | 2 |
| Constants | *N*ₐ, *R*, *F*, *h*, *c*, *k*ᴮ: exact SI values since 2019; CODATA 2022 for the rest | all |
| Data tables | Polyatomic ions, solubility rules, ΔH°f, *K*ₐ/*K*ᵦ, *E*°, specific heats, bond energies | 2, 4, 5, 14, 17 |
| Compound lookup | Name ↔ formula ↔ structure for common compounds (a curated list; PubChem as a linked reference) | 2, 3 |
| Molar mass and mole converter | g ↔ mol ↔ particles, with the working | 3 |
| Percent composition and empirical formula | Mass % from a formula; formula from % or masses (the mole table) | 3 |
| Equation balancer | Atom tally left and right | 4 |
| Stoichiometry and limiting reactant | Grams in, grams out; which runs out; percent yield | 4 |
| Concentration and dilution | *M* = *n*/*V*; *M*₁*V*₁ = *M*₂*V*₂ | 3 |
| Titration | Unknown concentration from an endpoint; draws the curve | 4, 14 |
| Gas calculator | *pV* = *nRT* with units handled | 9 |
| Calorimetry and Hess’s law | *q* = *mc*Δ*T*; ΔH° from formation enthalpies | 5 |
| pH and buffers | pH, pOH, [H⁺], [OH⁻]; Henderson–Hasselbalch | 14 |
| Units and sig figs | Convert, keep the right figures | 1 |
| Structure builder | Lewis structures with an octet and formal-charge check | 7 |
| 3D viewer | Model / cut / real size; dimensions; 2D link | 7, 8 |
| Glassware reading | Read the meniscus at eye level, record one estimated digit; tolerance shown (a Class A 50 mL buret is ±0.05 mL) | 1, 4 |
| Safety | One signal word per hazard (Danger or Warning), the hazard and what to do; GHS pictograms referenced from the real label, not redrawn | lab |

**Data sources and reuse.** NIST’s Chemistry WebBook is copyrighted with no stated reuse licence, and citing it is not permission to copy it. BYE Chem builds its own tables of the facts it needs, checks each value against NIST, CRC or the IUPAC/CIAAW and CODATA tables, and names the source and conditions (298.15 K, 1 bar) on every table. PubChem is linked to, not copied in bulk.

## 8. Labels and layout

- A label never sits on an atom or another label; place it outside the arc or dimension, and hide it if it would collide.
- Labels stay upright and screen-sized while the model turns (overlay, not painted into 3D), and sit on the diagram next to what they name, not in a separate key (split attention).
- Captions don’t repeat what the labels already say (redundancy).
- At most one dimension, one angle and one tag at once by default; a “show all” toggle for confident learners.
- Every number has its unit and sensible significant figures; measured and theory values are labelled as such.

## 9. Accessibility

- Never colour alone: atoms carry letters; highlights use a ring, not a colour change; graphs and structures have text descriptions.
- Text contrast at least 4.5:1, graphics at least 3:1 against paper (atom outlines, bonds, axes). The letter colours in §1 are chosen to pass.
- Tap targets 44 pt (Apple’s guideline; WCAG’s minimum is 24 px). Everything scales with the system text size.
- Every scene has a one-line `describe` for screen readers, as BYE Math Engine figures do.

## 10. Engine-neutral requirements

Whatever draws the 3D chemistry must: take a plain description (atoms, bonds, scene, layer) and draw it the same on phone and web; never crash or go blank on bad input; reuse BYE Math Engine for graphs; support instancing for hundreds of atoms, clipping planes, transparent shells, outlines plus a contact-shadow or ambient-occlusion depth cue, and a label overlay; give pause/step/replay on any animation; keep 60 fps on a mid-range phone; and pass the accessibility rules above. The candidates and trade-offs are in `docs/research/H-sim-engine-plan.md`; the decision is open.

## 11. Checked against real tools and research (2026-11-06)

| Area | Real practice / research | Our first draft | Now |
|---|---|---|---|
| Atom letter contrast | WCAG: 4.5:1 for text | White letters on N, O, F/Cl, alkali, alkaline-earth atoms were 2.9–3.7:1 | Ink letters there (4.6–6.0:1) |
| Atom and bond visibility | WCAG 1.4.11: 3:1 for graphics | H on paper 1.05:1, bonds 1.9:1 | Ink outline on every atom; bonds `#8a8378` (3.4:1) |
| Colour clash | One colour, one meaning | Oxygen clay ≈ “where you are” coral; shu highlight recoloured atoms | Coral stays out of scenes; highlights are rings |
| Element colours | Jmol/CPK families | Same families, muted | Kept |
| Ball size | ChimeraX: 0.3 × vdW; Jmol sticks 0.15 Å | Balls 0.2–0.35 Å (small) | 0.3 × vdW, sticks 0.15–0.2 Å |
| Circled charges | IUPAC 2008: circle only a single + or − | “signed numbers in a circle” | Fixed |
| Oxidation numbers | IUPAC: raised Roman numerals | Signed numbers only | Both, labelled as classroom vs IUPAC |
| %, M | Green Book: space before %; M discouraged by NIST | Not stated as exceptions | Kept as stated classroom exceptions |
| Data reuse | NIST copyrighted, no reuse licence; CIAAW gives intervals | “cited to NIST” | Own tables, cross-checked; intervals on tap |
| Tools | Ptable, PubChem, Wolfram|Alpha offer more | 11 tools | Added isotopes, compound lookup, % composition and empirical formula, limiting reactant, titration, buffers |
| 2D ↔ 3D | Translating between them is hard (Wu & Shah 2004; Stieff 2011) | Separate rules | Linked views with shared highlight |
| Depth | Outlines + ambient occlusion aid depth (Tarini et al. 2006) | Matte light only | Depth cue required |
| Animation | Not automatically better than static (Tversky et al. 2002); cueing helps | Calm motion only | Pause/step/replay and cueing required |
| Graph reading | Documented difficulty | Graphs only | Callouts, moving marker, predict-then-reveal |
| Labels | Split-attention and redundancy effects | One-at-a-time rule | Plus on-diagram labels, no redundant captions, “show all” toggle |

Matched already: notation for charges, states, arrows and axes; Bondi radii; 120° skeletal chains and equal bond lengths; overlay labels; letters on atoms; one-thing-at-a-time; matte calm look. Evidence strength and sources for every row are in reports I and J; several findings rest on abstracts and are marked there.
