# B. Problem types and standard methods (BYE Chem, Chem 1A scope)

Methods are described in my own words. No textbook prose is copied.

## Source honesty note (read first)

The web tools in this session were weak (web search returned mostly junk mirrors; LibreTexts deep links I guessed returned 404). So evidence is graded:

- **OS(slug)** = OpenStax *Chemistry 2e*, `https://openstax.org/books/chemistry-2e/pages/<slug>`. Slugs `4-3-reaction-stoichiometry`, `5-3-enthalpy`, `7-4-formal-charges-and-resonance`, `3-3-molarity` were **fetched and confirmed this session** (section and example titles read). All other OS slugs are from memory of the 2e table of contents and are **page-unchecked** (marked `OS*`). Fix by opening each one before relying on it.
- **KA** = Khan Academy chemistry hubs: `https://www.khanacademy.org/science/chemistry` and `https://www.khanacademy.org/science/ap-chemistry-beta`. Hub level only, not page-checked.
- **LT** = LibreTexts General Chemistry hub `https://chem.libretexts.org/Bookshelves/General_Chemistry` (deep links not verified; the exact chapter pages must be located by hand).
- **C1** = Chem1 Virtual Textbook (S. Lower), `https://www.chem1.com/acad/webtext/virtualtextbook.html`. Hub level, recalled.
- **CC** = ChemCollective stoichiometry tutorial, `https://chemcollective.org/activities/tutorials/stoich/dimensionalanalysis` (appeared in search results; not opened).
- No university learning-center handout was verified, so **none is cited**. Every row therefore reads "OS + KA/LT/C1 (hub)" at best. Treat the "2 sources" claim as **UNVERIFIED at page level** for all rows except where marked "1 source". The content of the Methods column is standard and consistent with the one OpenStax page read in full (4-3) plus the example titles read on 3-3, 5-3, 7-4.

> **Checked afterwards by the main session (2026-11-06):** every OpenStax slug cited below was tested against openstax.org. 31 of 32 are live pages and match the verified 2e section list in `A-course.md`; one invented slug (17.2 "balancing oxidation-reduction reactions") was corrected to `17-1-review-of-redox-chemistry`. So `OS*` now means "page exists and is the right section", but the page was still not read for its methods. The hub links (KA, LT, C1, CC) all resolve.

Tiers: B = Beginner, C = Chem 1A core, H = Chem 1A hard.

---

## 1. Measurement, units, sig figs

| # | Type | Given → Asked | Moves | Common slips | Picture/layout | Tier | Sources |
|---|---|---|---|---|---|---|---|
| 1.1 | Metric/SI prefix conversion | value in one prefix → value in another | Name both prefixes; Write the equality (1 km = 10³ m); Set up the cancel chain; Cancel and compute | Moving decimal the wrong way; squaring/cubing units (cm³→L) without cubing the factor | Unit-cancel chain; number line of prefixes | B | OS* `1-5-measurement-uncertainty-accuracy-and-precision`, `1-6-mathematical-treatment-of-measurement-results`; KA, LT (hub) |
| 1.2 | Counting sig figs | a written number → how many sig figs | Mark nonzero digits; Trapped zeros count; Leading zeros don't; Trailing zeros count only with a decimal point | Treating "1500" as 4 sf; counting leading zeros | Number strip with counted digits highlighted | B | OS* (same); KA, C1 (hub) |
| 1.3 | Sig figs in arithmetic | calculation → rounded answer | Identify operation type; Multiply/divide: fewest sf; Add/subtract: fewest decimal places; Round only at the end; Exact numbers ignored | Rounding in the middle; applying sf rule to addition | Stacked-decimal alignment for add/subtract | B | OS*; KA, LT (hub) |
| 1.4 | Dimensional analysis (single/multi-step) | quantity + equalities → quantity in new unit | Write given with unit; Pick equality; Write it as a fraction with wanted unit on top; Cancel; Compute; Check size/sf | Factor upside down; mixing up which side the unit goes | Unit-cancel chain (the main layout) | B | OS*; CC; KA |
| 1.5 | Density | mass, volume ↔ density | Pick the form (d=m/V); Convert to matching units; Solve; Use d as a conversion factor | Volume of irregular solid by displacement subtracted wrongly; unit mismatch mL vs L | Triangle/cancel chain; graduated cylinder before/after | B | OS*; KA, C1 |
| 1.6 | Temperature scales | °C/°F/K → another | Pick formula; Substitute; For K, add 273.15 | Using K = °C − 273; forgetting parentheses on (°F−32) | Number line with three scales | B | OS*; KA |

## 2. Atoms, isotopes, ions

| # | Type | Given → Asked | Moves | Slips | Picture | Tier | Sources |
|---|---|---|---|---|---|---|---|
| 2.1 | Protons/neutrons/electrons from symbol | isotope symbol → p, n, e | Read Z (protons); Read A; n = A − Z; e = p minus charge | Mixing mass number with atomic mass; sign of charge on electrons | Nuclide symbol with A/Z/charge labels; particle tally box | B | OS* `2-3-atomic-structure-and-symbolism`; KA |
| 2.2 | Average atomic mass | isotope masses + abundances → average mass | Convert % to fractions; Multiply each; Add; Check lies between masses | Not converting %; averaging without weights | Bar chart of abundances with weighted mark | C | OS* `2-2-evolution-of-atomic-theory`/`2-3`; KA, LT |
| 2.3 | Abundance from average mass (two isotopes) | average mass + 2 masses → % abundance | Let x and 1−x; Weighted sum = average; Solve; Convert to % | Forgetting 1−x; reporting fraction not % | Number line with weighted pivot (seesaw) | H | OS*; LT (hub) |

## 3. Nomenclature and formulas

| # | Type | Given → Asked | Moves | Slips | Picture | Tier | Sources |
|---|---|---|---|---|---|---|---|
| 3.1 | Binary ionic: name ↔ formula | name or formula | Find charges; Criss-cross/balance charges; Reduce; Name cation then anion(-ide) | Not reducing; forgetting Roman numeral for transition metals | Charge-balance tiles (+ and − blocks) | B | OS* `2-6-ionic-and-molecular-compounds`, `2-7-chemical-nomenclature`; KA |
| 3.2 | Polyatomic ionic | name ↔ formula | Recall ion + charge; Parentheses if count > 1; Balance charge; Name | Dropping parentheses: Mg(OH)₂ vs MgOH₂; misremembering -ate/-ite | Ion card list | C | OS*; KA, LT (hub) |
| 3.3 | Molecular (covalent) naming | formula ↔ name | Prefix for each count; Drop "mono" on first; Elide vowels; -ide on second | Using prefixes on ionic compounds | Prefix ladder 1–10 | B | OS*; KA |
| 3.4 | Acids naming | formula ↔ name | Binary: hydro-…-ic; oxyacid: -ate→-ic, -ite→-ous | Mixing hydro- with oxyacids | Anion→acid arrow table | C | OS*; KA, LT (hub) |

## 4. Mole, molar mass, composition

| # | Type | Given → Asked | Moves | Slips | Picture | Tier | Sources |
|---|---|---|---|---|---|---|---|
| 4.1 | Molar mass | formula → g/mol | Atom tally from formula (with parentheses); Look up each mass; Multiply by counts; Sum | Missing distribution of subscript outside parentheses; hydrates | Atom tally table | B | OS* `3-1-formula-mass-and-the-mole-concept`; KA, C1 |
| 4.2 | Grams ↔ moles | mass → mol (or reverse) | Molar mass; Chain with g on bottom (or top); Compute | Multiplying instead of dividing; wrong molar mass | Unit-cancel chain | B | OS* 3-1; CC; KA |
| 4.3 | Moles ↔ particles | mol → atoms/molecules | Avogadro's number as factor; Then atoms-per-molecule if asked | Forgetting atoms per molecule (H in H₂O) | Unit-cancel chain; particle picture | B | OS* 3-1; KA |
| 4.4 | Grams → particles (two-step) | mass → molecules/atoms | Grams to moles; Moles to molecules; (Molecules to atoms) | Skipping the mole step | Chain: g → mol → particles | C | OS* 3-1; CC |
| 4.5 | Percent composition by mass | formula → % each element | Molar mass; Element mass in one mole; Divide by molar mass; ×100; Check sum ≈ 100 | Using atomic mass without the subscript | Stacked bar of mass shares | C | OS* 3-1/`3-2-determining-empirical-and-molecular-formulas`; KA, LT |
| 4.6 | Empirical formula from % or grams | % or masses → empirical formula | Assume 100 g (% to g); Grams to moles each; Divide by smallest; Scale to whole numbers | Rounding 1.5 to 2 instead of ×2; skipping mole conversion | Table: element / g / mol / ratio / whole | C | OS* 3-2; KA, LT |
| 4.7 | Molecular formula from empirical + molar mass | empirical formula, molar mass → molecular formula | Empirical mass; Divide molar mass by it; Multiply subscripts | Using the ratio on wrong quantity | Table (same) | C | OS* 3-2; KA |
| 4.8 | Combustion analysis | CO₂, H₂O masses (± O by difference) → empirical formula | CO₂ g → mol C; H₂O g → mol H (×2); O by mass difference; Mole table; Smallest-ratio | Forgetting H is ×2; treating O as measured | Flow diagram sample → CO₂ trap/H₂O trap; mole table | H | OS* 3-2; LT (hub) |
| 4.9 | Hydrate formula | masses before/after heating → x in ·xH₂O | Mass of water lost; Moles water; Moles anhydrous; Ratio | Using the hydrate's mass as the anhydrous | Mole table | H | OS*; LT (hub) |

## 5. Balancing and reaction types

| # | Type | Given → Asked | Moves | Slips | Picture | Tier | Sources |
|---|---|---|---|---|---|---|---|
| 5.1 | Balancing by inspection | unbalanced equation → balanced | Atom tally left/right; Balance metals; Balance non-H/O; H, then O; Clear fractions; Recount | Changing subscripts; forgetting to recount polyatomics | Atom tally ledger left vs right | B–C | OS* `4-1-writing-and-balancing-chemical-equations`; KA |
| 5.2 | Predict products and balance (synth/decomp/combustion/single/double) | reactants → balanced eqn | Classify; Write products by pattern; Fix formulas by charge; Balance | Wrong charges in products | Pattern templates (A+B→AB etc.) | C | OS* `4-2-classifying-chemical-reactions`; KA |
| 5.3 | Solubility / precipitation | two salts mixed → precipitate? | Swap partners; Apply solubility rules; Mark (s)/(aq); Write molecular eqn | Misremembering rules | Rule table; before/after beakers with ions | C | OS* 4-2; KA, LT |
| 5.4 | Ionic and net ionic equations | molecular eqn → net ionic | Split strong electrolytes into ions; Cancel spectators; Rewrite; Check charge and atoms balance | Splitting solids/weak acids; wrong spectators | Three-line ladder; ion dot picture | C | OS* 4-2; KA, LT |
| 5.5 | Acid–base reaction (neutralization) | acid + base → salt + water, net ionic | Identify strong/weak; Write products; Balance; Net ionic H⁺ + OH⁻ → H₂O | Splitting weak acids | Ion picture | C | OS* 4-2; KA |
| 5.6 | Oxidation numbers | formula → oxidation numbers | Fixed values first; Sum to charge; Solve remaining | Treating charge as ox. number for covalent | Per-atom number labels over formula | C | OS* 4-2 (redox); KA |
| 5.7 | Identify redox / oxidizing and reducing agent | equation → what's oxidized | Assign ox. numbers; Compare changes; Oxidized = loses e⁻ (rises); Name agents | OIL RIG reversed; agent vs species confusion | Ox-number arrows over the equation | C | OS* 4-2; KA |
| 5.8 | Balance redox (half-reaction method) | skeleton redox → balanced | Split into halves; Balance atoms (O with H₂O, H with H⁺); Balance charge with e⁻; Equalize e⁻; Add; Base: add OH⁻ | Skipping charge balance; base conditions | Two-column half-reaction table | H | LT (hub); KA; OS* `17-1-review-of-redox-chemistry` |

## 6. Stoichiometry

| # | Type | Given → Asked | Moves | Slips | Picture | Tier | Sources |
|---|---|---|---|---|---|---|---|
| 6.1 | Mole-to-mole | mol A → mol B | Balanced eqn; Mole ratio coefficient B over A; Multiply | Using subscripts; ratio inverted | BCA row / ratio bars | B | **OS(4-3-reaction-stoichiometry) V**; KA; CC |
| 6.2 | Mass-to-mass (the spine) | g A → g B | Grams to moles; Mole ratio; Moles to grams | Skipping the balance; wrong molar mass | Unit-cancel chain with three links | C | **OS 4-3 V** (Ex 4.10, 4.11); CC; KA |
| 6.3 | Limiting reactant (two masses) | g A, g B → limiting, product made | Each to moles; Each to product moles via ratio; Smaller = limiting; Mass of product from it | Comparing grams; picking larger | BCA table; particle diagram of leftovers | C | OS* `4-4-reaction-yields`; KA; C1 |
| 6.4 | Excess reactant left over | same → g remaining | Moles used of excess = limiting × ratio; Subtract; To grams | Subtracting grams from the wrong reactant | BCA table (Before/Change/After) | H | OS* 4-4; KA |
| 6.5 | Theoretical and percent yield | actual g + masses → % yield | Theoretical yield via limiting; Actual ÷ theoretical; ×100 | Using a reactant's mass as theoretical | Bar: actual vs theoretical | C | OS* 4-4; KA, C1 |
| 6.6 | Stoichiometry with solutions | M, V → mol/mass | V × M = mol; Ratio; to mass or volume | mL not converted to L | Chain with M as factor | C | OS* `4-5-quantitative-chemical-analysis`; KA |
| 6.7 | Sequential/ multi-step reactions | two reactions → overall yield | Chain each stoichiometry; or multiply ratios | Using intermediate rounded | Flow arrows | H | LT (hub) — **1 source** |

## 7. Solutions

| # | Type | Given → Asked | Moves | Slips | Picture | Tier | Sources |
|---|---|---|---|---|---|---|---|
| 7.1 | Molarity from mass and volume | g solute, V → M | Grams to moles; Volume to L; Divide | mL left unconverted; solvent volume vs solution | Flask picture: solute + fill to line | C | **OS(3-3-molarity) V** (Ex 3.16); KA |
| 7.2 | Mass or volume from molarity | M + V (or mol) → g or V | M × V = mol; Moles to grams | Same | Cancel chain | C | **OS 3-3 V** (Ex 3.17, 3.18); KA |
| 7.3 | Dilution | M₁, V₁, M₂ → V₂ (or V₁) | State moles conserved; M₁V₁ = M₂V₂; Solve; Check final V ≥ added | Treating V₂ as volume of water added | Before/after beakers with same dot count | C | **OS 3-3 V** (Ex 3.19–3.21); KA |
| 7.4 | Ion concentration | M of salt → M of each ion | Dissociation equation; Multiply by coefficient | Forgetting 2 Cl⁻ per CaCl₂ | Ion dot picture | C | OS* 3-3/4-2; KA |
| 7.5 | Mass %, ppm, molality, mole fraction | composition → concentration | Pick definition; Convert units; Substitute | Mixing solvent vs solution mass in molality | Pie/bar of components | C | OS* `3-4-other-units-for-solution-concentrations`; LT |
| 7.6 | Mixing solutions / precipitate amount | two solutions → mass of ppt, leftover ions | Moles of each ion; Limiting; Mass of solid; Leftover ions ÷ total V | Forgetting total volume | BCA table + beaker | H | OS* 4-5; KA |
| 7.7 | Acid–base titration (strong/strong) | V, M of titrant, V analyte → M analyte | Balanced eqn; Moles titrant = V×M; Mole ratio; ÷ analyte V | Ratio ignored for H₂SO₄ | Burette/flask picture + cancel chain | C | OS* 4-5; KA |

## 8. Gases

| # | Type | Given → Asked | Moves | Slips | Picture | Tier | Sources |
|---|---|---|---|---|---|---|---|
| 8.1 | Pressure unit conversion | P in atm/torr/kPa → another | Equality; Cancel chain | Wrong equality | Cancel chain | B | OS* `9-1-gas-pressure`; KA |
| 8.2 | Single-gas-law change (Boyle, Charles, Gay-Lussac) | initial + 2 of 3 → unknown | Name constant quantity; Pick law; Kelvin; Solve; Sanity direction | Celsius instead of Kelvin | Piston pictures; graph | C | OS* `9-2-relating-pressure-volume-amount-and-temperature-the-ideal-gas-law`; KA |
| 8.3 | Combined gas law | P₁V₁/T₁ = P₂V₂/T₂ | List knowns in 2 columns (initial/final); Kelvin; Solve | Mixing units | Two-column table | C | OS* 9-2; KA |
| 8.4 | Ideal gas law (PV = nRT) | three of P, V, n, T → fourth | Choose R matching units; Convert T to K; Rearrange; Solve | R units mismatch | Variable list with units | C | OS* 9-2; KA, C1 |
| 8.5 | Molar mass/density of a gas | d, P, T → M | d = PM/RT; Solve | Density in wrong units | Variable list | H | OS* 9-2; C1 |
| 8.6 | Gas stoichiometry | g reactant → V gas at given P, T | Grams to moles; Ratio; PV=nRT for V | Using 22.4 L when not at STP | Spine chain with ideal-gas end step | H | OS* `9-3-stoichiometry-of-gaseous-substances-mixtures-and-reactions`; KA |
| 8.7 | Dalton's partial pressures | moles/pressure of gases → partial or total P | Mole fraction; P_i = X_i × P_total | Forgetting water vapor over water | Bar stack of partial pressures | C | OS* 9-3; KA |
| 8.8 | Gas collected over water | wet gas P → dry gas moles | Subtract vapor pressure; PV=nRT | Not subtracting | Eudiometer picture | H | OS* 9-3; LT |

## 9. Thermochemistry

| # | Type | Given → Asked | Moves | Slips | Picture | Tier | Sources |
|---|---|---|---|---|---|---|---|
| 9.1 | q = mcΔT | m, c, ΔT → q (or any) | Identify ΔT = final − initial; Substitute; Sign meaning | Using Tfinal alone; wrong sign | Heating curve segment | B–C | OS* `5-1-energy-basics`; KA |
| 9.2 | Calorimetry (coffee cup) | masses, temps → c of metal or ΔH | q_lost = −q_gained; Solve; Per mole | Sign errors | Two-object energy exchange bars | C | OS* `5-2-calorimetry`; KA |
| 9.3 | Bomb calorimetry / reaction ΔH from q | q of solution, moles → ΔH_rxn | q_rxn = −q_solution; ÷ moles | Per gram vs per mole | Energy diagram | H | OS* 5-2; KA |
| 9.4 | Thermochemical equation stoichiometry | g reactant → kJ | Grams to moles; Moles × ΔH per mole of rxn (ratio) | Not scaling ΔH by coefficient | Spine chain with kJ as final factor | C | **OS(5-3-enthalpy) V** (Ex 5.10); KA |
| 9.5 | Hess's law | steps → ΔH of target | Write target; Flip/multiply steps to match; Flip ΔH sign, scale ΔH; Add & cancel | Not scaling ΔH when scaling equation | Stacked equations with cancel marks; energy-level diagram | H | **OS 5-3 V** (Ex 5.13–5.15); KA |
| 9.6 | ΔH from enthalpies of formation | ΔHf° table → ΔH_rxn° | Σ products − Σ reactants; Multiply by coefficients; Elements = 0 | Reversed subtraction; ignoring coefficients | Two-column table; energy diagram | C | **OS 5-3 V** (Ex 5.11–5.12); KA |
| 9.7 | Heating curve | mass + phase changes → total q | Split into segments; q = mcΔT or n·ΔH; Add | Using mcΔT through a phase change | Heating curve graph | H | OS* `10-3-phase-transitions`; KA |

## 10. Light and electrons

| # | Type | Given → Asked | Moves | Slips | Picture | Tier | Sources |
|---|---|---|---|---|---|---|---|
| 10.1 | c = λν | λ or ν → other | Convert nm to m; Rearrange; Compute | nm vs m | EM spectrum bar | C | OS* `6-1-electromagnetic-energy`; KA |
| 10.2 | E = hν (photon energy) | ν or λ → E (per photon, per mole) | Get ν; E = hν; ×N_A for mole | Mixing J and kJ | Spectrum + energy arrow | C | OS* 6-1; KA |
| 10.3 | Bohr transitions | n_i, n_f → ΔE, λ | E_n = −R/n²; ΔE; Sign = absorb/emit; E→λ | Sign confusion | Energy-level ladder | H | OS* `6-2-the-bohr-model`; KA |
| 10.4 | Quantum numbers | n, l, mₗ, mₛ rules → valid/ count | Allowed l = 0…n−1; mₗ = −l…+l; mₛ ±½ | Allowing l = n | Table of subshells/orbitals | C | OS* `6-3-development-of-quantum-theory`; KA |
| 10.5 | Electron configuration | element/ion → configuration | Count electrons; Fill order; Abbreviate noble gas; Exceptions Cr, Cu; Ions: remove outer first | Removing from 3d first for cations | Orbital boxes; periodic-table blocks | C | OS* `6-4-electronic-structure-of-atoms-electron-configurations`; KA |
| 10.6 | Orbital diagram, unpaired electrons | element → boxes, magnetism | Fill boxes; Hund's rule; Count unpaired | Pairing before spreading | Orbital boxes | C | OS* 6-4; KA |

## 11. Periodic trends

| # | Type | Given → Asked | Moves | Slips | Picture | Tier | Sources |
|---|---|---|---|---|---|---|---|
| 11.1 | Rank atoms by radius/IE/EN | list → order | Locate on table; Apply across/down rule; Order; Note exceptions | Reversing rule; ions: isoelectronic series | Periodic-table arrows; ranking bar | C | OS* `6-5-periodic-variations-in-element-properties`; KA |
| 11.2 | Isoelectronic ions ranking | ions → size order | Count protons; More protons = smaller | Ranking by charge sign | Ordered circles | H | OS* 6-5; KA |

## 12. Bonding and structure

| # | Type | Given → Asked | Moves | Slips | Picture | Tier | Sources |
|---|---|---|---|---|---|---|---|
| 12.1 | Lewis structure (single central atom) | formula → drawing | Count valence e⁻; Skeleton; Single bonds; Fill octets on outer; Place leftovers on central; Make multiple bonds if short | Miscounting e⁻ for ions; H given 8 | Lewis drawing with e⁻ counter | C | OS* `7-3-lewis-symbols-and-structures`; KA |
| 12.2 | Formal charge | Lewis structure → FC each atom | FC = valence − nonbonding − ½ bonding; Sum = overall charge; Prefer structure near 0 | Counting bonds as full | Lewis drawing with FC badges | C | **OS(7-4) V** (Ex 7.6–7.8); KA |
| 12.3 | Resonance | structure → resonance forms | Move lone pair→π bond; Same atom positions; Draw all; Hybrid note | Moving atoms | Arrow-pushed pair of drawings | C | **OS 7-4 V**; KA |
| 12.4 | Octet exceptions | e.g. BF₃, PCl₅, SF₆, NO | Count; Allow expanded/incomplete | Forcing octet | Lewis drawing | H | OS* 7-3; KA |
| 12.5 | VSEPR geometry | Lewis structure → electron/molecular geometry, angle | Count electron domains; Electron geometry; Subtract lone pairs; Name shape, angles | Counting double bond as 2 domains | 3D shape (wedge-dash); domain count | C | OS* `7-6-molecular-structure-and-polarity`; KA |
| 12.6 | Polarity | shape + EN → polar? | Bond polarity from ΔEN; Shape; Vectors cancel? | Polar bonds ⇒ polar molecule | 3D shape with dipole arrows | C | OS* 7-6; KA |
| 12.7 | Intermolecular forces | molecule → strongest IMF, rank bp | Polar? H–N/O/F? Else dispersion; Compare size | Calling H-bonds "bonds" in molecule | Molecule pairs with dashed attractions | C | OS* `10-1-intermolecular-forces`; KA |

---

## Patterns

**Count of problem types:** 74 (6+3+4+9+8+7+7+8+7+6+2+7).

### Repeating move sequences

1. **The mole spine:** grams → moles → (mole ratio / coefficient) → moles → grams. Used by: mass-mass (6.2), limiting reactant (6.3–6.5), solution stoichiometry (6.6), titration (7.7), gas stoichiometry (8.6, last step PV=nRT), thermochemical equation (9.4, last factor kJ/mol), combustion analysis (4.8, run backward).
2. **Tally–compare–fix:** count items left vs right, change one thing, recount. Used by: balancing (5.1), net ionic charge check (5.4), half-reactions (5.8), formula charge balance (3.1–3.2), isotope p/n/e (2.1).
3. **Mole table, divide by smallest, whole numbers:** empirical formulas (4.6–4.9), hydrates, combustion analysis.
4. **Before/Change/After (BCA) table with a limiting step:** limiting reactant (6.3–6.4), precipitate mixing (7.6). (Chem 1A later reuses it as ICE.)
5. **State the conserved quantity, set up one equation, solve, sanity check:** dilution (moles conserved), calorimetry (energy conserved), Hess's law (state function), gas laws (constant quantity), weighted average (2.2–2.3).
6. **Pick formula → convert units to match → substitute → solve:** c=λν, E=hν, PV=nRT, q=mcΔT, density, temperature.
7. **Count → rule-table → classify:** sig figs, quantum numbers, VSEPR domains, IMF, solubility rules.

### Visual layouts by coverage (approx. number of types helped)

1. **Unit-cancel chain** (~30: 1.x, 4.2–4.4, 6.x, 7.x, 8.1, 9.4, 10.1–10.2) — the spine of the app.
2. **Table with columns (atom tally, mole table, BCA, two-column initial/final, Σ products − Σ reactants)** (~25: 4.1, 4.5–4.9, 5.1, 6.3–6.4, 7.6, 8.3, 9.6).
3. **Particle/ion picture (beaker with dots)** (~10: 5.3–5.5, 6.3, 7.3–7.4, 8.2).
4. **Energy diagram / ladder / heating curve** (~8: 9.2–9.7, 10.3).
5. **Lewis drawing + 3D shape** (~7: 12.1–12.7).
6. **Orbital boxes / periodic table with arrows** (~5: 10.4–10.6, 11.x).
7. **Graph (gas-law curves, heating curve)** (~3).

### Suggested build order
Cancel chain and atom tally first, then the mole spine, then BCA, then particle pictures; those four cover most of Chem 1A.

### Open items for the next pass
- Open every `OS*` slug and a real second source per topic (LibreTexts page URLs, one college learning-center handout each).
- Rows 6.7, 8.5, 8.8 and 5.8 have the thinnest support (**1 source**).
