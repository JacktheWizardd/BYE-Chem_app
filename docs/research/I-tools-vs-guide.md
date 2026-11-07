# I. Real chemistry tools and style standards vs the BYE Chem design guide

*2026-11-06. Read-only comparison of `docs/design-guide.md` against how chemists' tools and publication standards actually behave. Every claim has a URL. "UNVERIFIED" means I could not confirm it from a primary page in this pass. I did not skim `design/chem-design-guide.html` line by line; the .md is the source of the rules compared here.*

## Summary table

| Area | Real practice | Our guide | Match? | Change |
|---|---|---|---|---|
| 2D drawing geometry | ChemDraw ACS 1996: bond 14.4 pt, line 0.6 pt, bold 2 pt, hash 2.5 pt, chain angle 120, 10 pt Arial/Helvetica. IUPAC: one consistent bond length, 120 degrees at chain atoms, line weight about the label stroke | Same bond length, 120 degrees zig-zag. But 2D bonds are pale `#b9b1a3` | Mostly | Draw 2D bonds in ink, not pale grey; set stroke near label stroke |
| Lone pairs / charges | IUPAC: lone pairs as dot pairs (never lines); circled charge only for a single +/-; multiple charge written as number then sign | Dot pairs OK. "Formal charges as small signed numbers in a circle" | Partly | Circle only for single +/-; write 2+ / 2- uncircled |
| 3D default style | Avogadro: ball-and-stick. ChimeraX: sticks/ball/sphere styles, ball scale 0.3 x vdW, stick 0.2 A. VMD: Lines. PyMOL: lines. Jmol bond radius 0.15 A | Ball-and-stick; balls 0.2-0.35 A radius | Style yes, size no | Balls are smaller than the tools' (C about 0.5 A at 0.3 x vdW). Use 0.3 x vdW, sticks 0.15-0.2 A |
| Element colours | Jmol: H FFFFFF, C 909090, N 3050F8, O FF0D0D, P FF8000, S FFFF30, Cl 1FF01F | Muted CPK families; O clay `#cf7a62` | Families match | O clay is almost the app's "where you are" coral `#d9846a`: collision. Keep O clearly red |
| Labels | Jmol/PyMOL show none by default; Avogadro has an optional label layer | Letters on every atom over 16 px | Differs (better) | Keep; it is an accessibility gain |
| Measurements | ChimeraX: gold dashed line, 9 dashes, 3 decimals, A. Avogadro measure tool: 4 atoms max | Dimension line with ticks, shu angle arc, one at a time | Differs by design | Keep; show bond length to 2 decimals in A, angles to 1 decimal |
| vdW radii | Bondi H 1.20, C 1.70, N 1.55, O 1.52. Alvarez 2013: H 1.20, C 1.77, N 1.66, O 1.50 | Bondi | Match | Cite Bondi by name; note Alvarez as the newer table |
| Number/unit spacing | Green Book: space before % ("0.5 %") and unit; degree C has no space inside the symbol | 25 degC with space; "12%" in running text | Partly | Pick one rule; the Green Book form is "12 %". ACS rule UNVERIFIED |
| Molarity "M" | Green Book writes mol dm-3; NIST checklist calls M improper | M in Chem 1A, mol L-1 in data | Differs (deliberate) | Keep M for students; say so; use mol L-1 in axes and data |
| Charges, states, arrows | Green Book: SO4 2-, state in round brackets, two-sided arrow not for reactions (resonance) | Same | Match | None |
| Oxidation states | Green Book writes Roman numeral on the symbol (In-III style) | Signed numbers (+3, -2) | Differs | Say "textbook habit"; keep signed numbers for students |
| Axis labels | Green Book/ IUPAC: quantity/unit so ticks are numbers. Elsevier checklist agrees. Textbooks often use "quantity (unit)" | quantity / unit | Match to IUPAC | Keep, but allow a plain-name prefix; ACS journal rule UNVERIFIED |
| Data sources | NIST WebBook is copyrighted SRD with no stated reuse licence; PubChem/NCBI restricts nothing itself but submitter copyright may apply; CODATA 2022 is current | Rows "cited to NIST" | Risky | Citing is not permission; check terms before copying tables |
| Atomic weights | CIAAW gives intervals for H, C, N, O, Cl; abridged values are single numbers | "standard atomic weight" | Needs a choice | Show abridged value, mark it as such; intervals in the card detail |
| Spectra / plots | IR wavenumber falls left to right; NMR ppm rises right to left (secondary sources) | Reversed axes flagged as engine addition | Match | Keep |
| Lab practice | Class A 50 mL buret +/-0.05 mL; 100 mL flask +/-0.08 mL, 250 mL +/-0.12 mL | Buret reading, one estimated digit | Match in spirit | Put tolerances in the Lab page |
| GHS | Black symbol, white ground, red diamond; one signal word | Referenced, not redrawn | Match | Check UNECE terms before any redraw |
| Tools list | Ptable, PubChem, Wolfram|Alpha offer more | 17 rows | Good core | Add percent composition, empirical formula, limiting reagent, titration, isotopes |

## 1. 2D structure drawing

**What real tools do.**
- ChemDraw's "ACS Document 1996" preset: fixed length 14.4 pt, bold width 2 pt, line width 0.6 pt, margin 1.6 pt, hash spacing 2.5 pt, chain angle 120, bond spacing 18 % of length, 10 pt Arial/Helvetica labels ([Wikipedia chemistry MoS, structure drawing](https://wikipedia.com/wiki/MOS:Structure_drawing)). This is a secondary source; no first-party Revvity preset page loaded (the Revvity support page returned 403, [link](https://support.revvitysignals.com/hc/en-us/articles/4408234173332)). The same numbers appear in ChemDoodle's tutorial, which sets them to match ACS 1996: bond length 14.4, width 0.6, hash spacing 2.5, label size 10, Helvetica/Arial ([ChemDoodle styles](https://web.chemdoodle.com/tutorial/advanced/styles)). Note the 2.6 there is the spacing of multiple-bond lines, not a bond length.
- RDKit: default `bondLineWidth` 2.0, wedge/dash bonds on by default ([RDKit MolDraw2D docs via search](https://rdkit.org/docs/source/rdkit.Chem.Draw.html)). Lone-pair drawing, OpenChemLib and Ketcher defaults: UNVERIFIED.
- IUPAC 2008 ([Brecher, Pure Appl. Chem. 80, 277](https://www.epfl.ch/labs/lcso/wp-content/uploads/2018/06/IUPAC-drawing-rules.pdf), mirror of the paper): bonds share one length; line thickness about the stroke of the label font (not more than 4x or less than 1/4); chain atoms with two bonds at 120 degrees; plain fonts (Arial, Helvetica, Times); avoid colour except for emphasis, red the usual emphasis colour, avoid red-with-green; if colouring 2D by element, do not contradict the 3D modelling colours.
- Charges: plus/minus after the element symbol, preferably superscript and top right; circled symbols acceptable for a single charge only; magnitude as a number before the sign. Lone pairs: dot pairs placed above, below, left or right of the label, never lines; and Lewis structures outside teaching are "strongly discouraged" (same PDF).

**Where we match.** One bond length in 2D; 120 degree zig-zag; hetero atoms labelled with their H; dot-pair lone pairs; red as the emphasis colour; letters never alone with colour. The guide's element colours stay in the traditional red O / blue N / green Cl family, which IUPAC asks for.

**Where we differ.**
1. Guide section 4 says formal charges are "small signed numbers in a circle". IUPAC allows circles only for a single + or -; a 2+ goes uncircled.
2. Guide section 1 gives bonds `#b9b1a3` on paper `#f6f3ec`. My estimate of that contrast is about 2:1, below the 3:1 that WCAG asks of graphics ([WCAG 2.1 non-text contrast](https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html), not fetched in this pass: UNVERIFIED). Pale 3D bonds suit a hairline look; a 2D skeletal formula needs ink-strength lines.
3. Wedge convention "narrow end at the stereocentre" is correct in practice but the IUPAC 2008 text does not state it; the rule lives in the 2006 stereochemistry recommendations (Pure Appl. Chem. 78, 1897). Not read: UNVERIFIED.

**Recommendation.** Draw 2D bonds at `#1e1c19` with stroke about the label stroke (about 0.6 pt at 14.4 pt bond length, scaled); circled charge only for +/- single; cite IUPAC 2008 section GR-5 for lone pairs/charges.

## 2. 3D molecular viewers

| Viewer | Default style | Background | Labels | Measurements | Source |
|---|---|---|---|---|---|
| Jmol/JSmol | Ball-and-stick (bond radius 0.15 A; atom size 23 % of vdW in constants) | UNVERIFIED | none by default (UNVERIFIED) | measure command | [Jmol source constants](https://raw.githubusercontent.com/BobHanson/Jmol-SwingJS/master/src/org/jmol/viewer/JC.java) |
| PyMOL | Lines; carbons coloured per-object from a cycling set unless `auto_color` off | Black | none | wizard (UNVERIFIED) | [PyMOL mailing-list threads](https://sourceforge.net/p/pymol/mailman/message/9029447) |
| ChimeraX | `style` has stick, ball, sphere; default per structure type UNVERIFIED | UNVERIFIED | on request | `distance`: gold, 9 dashes, 3 decimals, A | [distance](https://www.cgl.ucsf.edu/chimerax/docs/user/commands/distance.html), [style](https://www.cgl.ucsf.edu/chimerax/docs/user/commands/style.html) |
| Avogadro | Ball-and-stick is the default display type | UNVERIFIED | label display type available | measure tool: up to 4 atoms; distances, angles, dihedrals | [Display types](https://avogadro.cc/docs/display-types/), [measure tool](https://avogadro.cc/docs/tools/measure-tool) |
| VMD | Lines, bond halves coloured by atom | UNVERIFIED | on request | on request | [VMD user guide](https://www.ks.uiuc.edu/research/vmd/current/ug.pdf) |
| Mol* | Ball-and-stick around the clicked residue; Shift+wheel moves clipping planes | UNVERIFIED | UNVERIFIED | Measurements panel | [Mol* docs](https://molstar.org/viewer-docs/) |
| PubChem 3D | page blocked (reCAPTCHA); UNVERIFIED | | | | [PubChem](https://pubchem.ncbi.nlm.nih.gov/docs/3d-viewer) |
| ChemDoodle 3D | Ball and Stick example; Jmol colours option; black background in example | black (example) | | | [ChemDoodle](https://web.chemdoodle.com/tutorial/advanced/styles) |

**Jmol default colours** (exact, from the table that drives the Jmol colour page, first colour column; second column is the RasMol scheme): H `FFFFFF`, C `909090`, N `3050F8`, O `FF0D0D`, P `FF8000`, S `FFFF30`, Cl `1FF01F`. Also F `90E050`, Br `A62929`, I `940094`, Li `CC80FF`, Na `AB5CF2`, K `8F40D4`, Mg `8AFF00`, Ca `3DFF00`, Fe `E06633`, He `D9FFFF`, Ne `B3E3F5`, Ar `80D1E3`. Source: [jmol_constants.js on the Jmol colour page](https://jmol.sourceforge.net/jscolors/jmol_constants.js) (page: [jscolors](https://jmol.sourceforge.net/jscolors/)). The column-order reading (Jmol first, RasMol second) follows the page's own two-scheme layout; the page text itself did not label the columns in what I could fetch. ChimeraX says its `byelement` / `byhet` use the Jmol default element colours ([color](https://www.cgl.ucsf.edu/chimerax/docs/user/commands/colortables.html)). ChemDoodle can switch on Jmol colours. The older CPK convention goes back to Corey-Pauling/Koltun ([CPK coloring](https://en.wikipedia.org/wiki/CPK_coloring)).

**Sizes.** ChimeraX: ball scale 0.3 of vdW, stick radius 0.2 A ([size](https://www.cgl.ucsf.edu/chimerax/docs/user/commands/size.html)). For carbon at Bondi 1.70 A that is a ball about 0.51 A and for H about 0.36 A. Our guide says balls "about 0.2-0.35 A radius": smaller than every mainstream default I could check, so the balls will read as dots next to Jmol or ChimeraX images that students may see.

**vdW tables.** Bondi: H 1.20, C 1.70, N 1.55, O 1.52 A. Alvarez (2013/14): H 1.2, C 1.77, N 1.66, O 1.5. Batsanov 2001: 1.0 / 1.7 / 1.6 / 1.55. Hu 2009: 1.08 / 1.53 / 1.51 / 1.49 ([Wikipedia: Van der Waals radius](https://en.wikipedia.org/wiki/Van_der_Waals_radius)). Which table each viewer uses by default: UNVERIFIED.

**Our colour table against Jmol.**
- H paper-white, N slate blue, S ochre/yellow, P amber/orange, Cl sage green, Br brick, I plum, alkali violet: same hue families as Jmol. Good.
- C charcoal `#4a4641` is darker than Jmol grey `909090` but near classic CPK black; fine on paper.
- O clay `#cf7a62` sits within a few percent of the app's "where you are" coral `#d9846a`. In a molecule view the highlighted/current-position colour and oxygen can be confused. Make O clearly red (for example a deeper `#c0432f`) or retire coral from the 3D layers.
- Noble gases: lilac vs Jmol's cyan family; alkaline earths teal vs Jmol's green (Mg, Ca); alkali violet matches. Both are our own choices; no standard says otherwise, but students meeting Jmol images will see cyan noble gases.
- The shu red `#b5462a` used for measured values is close to the O colour too. IUPAC itself warns against red-with-green (above) and the guide uses sage Cl next to red O in the same molecule (CCl, C=O ...): add a letter (already done) and keep shape cues.

**Clipping/slab.** Mol* exposes clipping planes via Shift+wheel ([Mol* docs](https://molstar.org/viewer-docs/)). A "clip that always faces the viewer" in our guide is normal behaviour for slab planes; ChimeraX and Jmol also keep slab view-aligned (UNVERIFIED for Jmol).

## 3. Notation and style

| Rule | Real standard | Our guide |
|---|---|---|
| Italic quantity, upright unit | Green Book requires it ([IUPAC Green Book 3rd ed. PDF](https://iupac.org/wp-content/uploads/2019/05/IUPAC-GB3-2012-2ndPrinting-PDFsearchable.pdf); IUPAC report rules: [guidelines section 5](https://reports.iupac.org/guidelines-for-drafting-reports/5-quantities.html)) | Match |
| Space before unit and before % | Green Book examples "0.5 %" and "1.1 %" use a space; the section on dimensionless quantities treats % as a unit | Differs: guide allows "12%" in running text |
| Degree Celsius | Single symbol "degC", no space inside; a space before it | Match |
| % in axis denominator | Green Book: avoid x/% in tables and graphs; prefer 100 x | Not mentioned; add to rules |
| Molarity | Green Book writes mol dm-3; NIST SI checklist lists "M" among improper forms ([NIST checklist](https://www.physics.nist.gov/cuu/Units/checklist.html)); Elsevier checklist says avoid M on graph labels | Differs deliberately (Chem 1A) |
| Charges | Number then sign: SO4 2-, Na+ | Match |
| State symbols | Round brackets after the formula: NaOH(aq), also (cr) for crystalline, (s), (l), (g) | Match; note (cr) exists |
| Arrows | Single arrow reaction; two-sided arrow reserved for resonance, not reactions | Match |
| Oxidation number | Roman numeral written on the symbol in the Green Book (example "In-III") | Differs; our form is the textbook habit |
| Axis labels | quantity divided by unit ("labeling the axes of graphs"), so ticks are pure numbers | Match |
| Digit grouping with thin space | Green Book UNVERIFIED in this pass (search did not reach section 4.1); SI practice widely quoted | Probably match: UNVERIFIED |

**ACS Style Guide.** I could not open the ACS Style Guide text. A secondary summary says a space goes between a number and a unit (6 min, 30 degC, 50 %), with a self-contradicting note on %; treat all ACS-specific claims as UNVERIFIED ([slideshare summary](https://www.slideshare.net/jameswud/17-things-to-remember-while-styling-your-paper-as-per-acs-style-guide)). "M" for molarity in ACS style: UNVERIFIED. The ACS journals' figure label format: UNVERIFIED (no ACS page found; the Elsevier and Green Book guidance supports quantity/unit, the [Illinois Writers' Workshop figure guide](https://writersworkshop.illinois.edu/resources-2/writer-resources/academic-writing/style-guide-for-science-writing/) shows the "quantity (unit)" alternative).

**RSC.** The RSC author pages I reached cover article types, not unit typography ([Chemical Science guidelines](https://www.rsc.org/publishing/publish-with-us/publish-a-journal-article/chemical-science)). Whether RSC asks for quantity/unit: UNVERIFIED. A third-party blog says RSC and others accept ChemDraw in ACS 1996 or RSC settings (UNVERIFIED).

**Recommendation.** Decide one % rule: "12 %" everywhere is consistent with the Green Book you cite; the guide currently splits. State in the guide that M is a classroom exception. Add "never put % in an axis label denominator".

## 4. Data sources and licensing

- **NIST Chemistry WebBook** (SRD 69): footer reads copyright by the U.S. Secretary of Commerce, "all rights reserved", governed by the Standard Reference Data Act; the page gives no reuse licence and reserves the right to charge ([WebBook](https://webbook.nist.gov/chemistry/)). DOI [10.18434/T4D303](https://doi.org/10.18434/T4D303). Bulk copying into an app is not permitted by anything I saw. Individual facts versus compiled tables is a legal question: UNVERIFIED, ask NIST (or use measured/derived values from a source that does state a licence).
- **PubChem / NCBI**: NCBI places no restrictions itself, but submitters may hold copyright and PubChem is listed among resources with third-party material; services should show NCBI's disclaimer and copyright notice ([NCBI policies](https://www.ncbi.nlm.nih.gov/home/about/policies/)). The PubChem data-usage page itself was behind a bot check: UNVERIFIED for PubChem-specific wording.
- **CODATA**: NIST Standard Reference Database 121 presents the 2022 values; the next regular adjustment is 2026 ([CODATA constants](https://physics.nist.gov/cuu/Constants/)). Exact-since-2019 SI constants (h, e, k, NA, c) are well known but were not on the fetched page: UNVERIFIED here. Plan to re-check the table after the 2026 adjustment.
- **IUPAC CIAAW atomic weights**: intervals for elements with natural variation, for example H [1.00784, 1.00811], C [12.0096, 12.0116], N [14.00643, 14.00728], O [15.99903, 15.99977], Cl [35.446, 35.457] ([CIAAW](https://www.ciaaw.org/atomic-weights.htm)). Abridged single values are on the "Abridged" page (not fetched: UNVERIFIED). Commonly quoted abridged values are H 1.008, C 12.011, N 14.007, O 15.999, Cl 35.45; I did not confirm them in this pass. CIAAW's reuse terms: UNVERIFIED.

**Our guide.** "Standard atomic weight" on the element card is ambiguous because the standard weight of H is an interval. Recommendation: show the abridged (conventional) number on the card, labelled "abridged, 4 significant figures" where that is true, with the interval one tap away; do the same for the periodic table colour layer.

## 5. Graphs

- **IR**: wavenumber on the x-axis, falling from left to right; spectra usually drawn as transmittance so bands point down. **NMR**: ppm on the x-axis, rising right to left, 0 (TMS) at the right ([overview via search](https://faculty.fiu.edu/~wnuk/CHM2211%20Spring%202011/SolomonsSFW%20Chapter%209,2.pdf), secondary; no authoritative standard page loaded: UNVERIFIED). These are textbook-universal. Guide's "reversed x-axis" engine addition is correct.
- **UV-Vis**: absorbance (dimensionless) vs wavelength in nm; **mass spec**: bars of relative abundance vs *m/z*; **titration**: pH vs titrant volume; **heating curve**: temperature vs heat added or time; **phase diagram**: pressure vs temperature (log pressure common). I did not find a single authoritative source for these; all UNVERIFIED but standard textbook practice.
- **Energy diagrams** and Origin/Excel defaults: UNVERIFIED (no documents read). Excel and Origin default to "quantity (unit)" style titles; the Green Book quotient form must be typed by hand.

**Guide check.** Axis style quantity/unit matches IUPAC. Spectra list is incomplete: add UV-Vis (absorbance vs wavelength) and mass spec (bar chart, *m/z*) when those chapters arrive; the guide's `chart` bars cover the latter. For the Beer-Lambert line, absorbance is a pure number: label it *A* with no unit.

## 6. Lab practice

- **Buret**: ASTM E287 table (as quoted by a search summary of the 2012 edition) gives Class A tolerance 50 mL +/-0.05 mL, 25 mL +/-0.03 mL, 10 mL +/-0.02 mL ([ASTM E287 store page](https://store.astm.org/e0287-02r19.html)); the table numbers are second-hand, the standard itself is paywalled. Reading to one estimated digit past the smallest mark (so 0.01 mL on a 0.1 mL graduation) is standard teaching practice; no primary source loaded: UNVERIFIED. Read the bottom of the meniscus at eye level: UNVERIFIED primary.
- **Volumetric flasks**: Class A 100 mL +/-0.08 mL and 250 mL +/-0.12 mL per manufacturer listings of ASTM E288 flasks ([Thomas Scientific](https://www.thomassci.com/p/volumetric-flasks-with-pe-stopper-astm-class-a), [Kimble 250 mL](https://www.dwk.com/na/kimble-kimax-serialized-and-certified-volumetric-flask-class-a-with-snap-cap-250-ml-28012-250)). Class B is twice Class A where not stated (same DWK source).
- **Pipets** (ASTM E969): 25 mL Class A +/-0.03 mL is plausible but the only table I found was garbled: UNVERIFIED. **Balances**: UNVERIFIED.
- **GHS label elements**: pictogram (black symbol, white ground, red diamond border), signal word (one only; Danger for more severe categories, Warning for less severe), hazard statements (H-codes), precautionary statements (P-codes) ([summary via search](https://www.casrai.org/guides/understanding-ghs-labels-pictograms-signal-words-hazard-statements)). Red border width 1.0-1.5 mm comes from one vendor blog: UNVERIFIED. **Reproduction rights**: UNECE's page returned 403 ([UNECE pictograms](https://unece.org/transport/standards/transport/dangerous-goods/ghs-pictograms)); I found no licence text. UNVERIFIED. Our "referenced, not redrawn" stance is the safe one until that is read.

## 7. Calculators and tools in real apps

| Product | Features found | Source |
|---|---|---|
| Ptable.com | State-of-matter control, "time machine", orbitals, isotopes, compounds, oxidation states, trends, search (third-party descriptions) | [overview](https://www.educatorstechnology.com/2023/03/ptable-interactive-periodic-table-for.html), [creator Q&A](https://teachchemistry.org/periodical/issues/november-2015/q-and-a-with-michael-dayah) |
| PubChem periodic table | Table, List and Game views; colour by property; element pages | [PMC article](https://pmc.ncbi.nlm.nih.gov/articles/PMC8276875) |
| PubChem Sketcher | Structure input for searches | [sketcher](https://pubchem.ncbi.nlm.nih.gov/sketch) |
| Wolfram|Alpha | Balance equations, molar mass, element/compound properties, titration, dilution, molarity; steps in Pro | [chemistry examples](https://www.wolframalpha.com/examples/science-and-technology/chemistry/index.html), [step-by-step blog](https://blog.wolfram.com/2020/04/23/chemistry-step-by-step-solutions-chemical-reactions/) |
| ChemSpider, Merck/Sigma tools | UNVERIFIED (not fetched) | |

**Against our Tools list (section 7 of the guide).** We cover periodic table, element card, constants, data, molar mass, balancer, dilution, gas law, calorimetry/Hess, pH, units, structure drawer, 3D viewer, glassware, spectra, safety. Missing against the reference set: isotopes and mass numbers on the element card, state-of-matter by temperature, percent composition and empirical formula, limiting reagent and percent yield, titration calculator, buffer (Henderson-Hasselbalch), compound lookup by name or formula, orbital/electron-shell view. Ptable-style "state at temperature" fits the cut-away layer. Whether chapters 3 and 4 already have these: check the lessons; this report only compares tool lists.

## Recommended changes (ranked)

1. **Fix the oxygen/coral collision.** O `#cf7a62` is nearly the "where you are" coral `#d9846a`; change one, or restrict coral to non-3D layers. Check the shu `#b5462a` highlight against O too.
2. **Enlarge ball radii.** Use 0.3 x vdW (about 0.5 A for C, 0.36 A for H) and 0.15-0.2 A sticks, matching ChimeraX and Jmol; keep the guide's smaller 0.2-0.35 A only for crowded scenes.
3. **Charge circles.** Circle only a single +/-; write 2+ / 2- as number then sign without a circle (IUPAC GR-5.1).
4. **2D bond colour.** Use ink `#1e1c19` for 2D skeletal and Lewis bonds, stroke about the label stroke; keep pale `#b9b1a3` for 3D bonds only.
5. **One percent rule.** "12 %" with a space everywhere (the Green Book you cite), and never % in an axis denominator.
6. **Atomic weight policy.** Show abridged values with the interval on request; say which, in the element card text.
7. **Data licensing.** Do not copy NIST WebBook tables wholesale; "cited to NIST" is not a licence. Record the source and licence per Data row, and re-check CODATA after the 2026 adjustment.
8. **Mark M and Roman/signed oxidation states as classroom conventions** in section 3, so the guide does not read as contradicting the Green Book it cites.
9. **Add spectra types**: UV-Vis (absorbance vs wavelength), mass spec (bars vs *m/z*), absorbance without a unit.
10. **Add glassware tolerances** to the Lab page once the pipet and balance figures are checked against E969 or manufacturer tables.
11. **Tools to add** (decision for the product): percent composition, empirical formula, limiting reagent, titration, buffer, isotopes on element card.
12. **Cite Bondi by name** in section 5 and mention Alvarez as the newer table.

## UNVERIFIED list

- ChemDraw ACS 1996 preset values: only from Wikipedia's style page and ChemDoodle's tutorial, not a Revvity page.
- RDKit lone-pair drawing, OpenChemLib and Ketcher defaults.
- Wedge narrow-end rule (IUPAC 2006 stereochemistry recommendations, not read).
- Jmol column order (Jmol first, RasMol second) read from the colour data file, page text did not label it.
- Default background and label state for Jmol, ChimeraX, Avogadro, VMD, Mol*; PubChem 3D viewer defaults (reCAPTCHA).
- Which vdW table each viewer uses by default.
- Jmol clipping plane facing behaviour.
- ACS Style Guide rules on %, M, charges, axis format; ACS and RSC journal figure rules.
- Green Book thin-space digit grouping.
- WCAG contrast figure for `#b9b1a3` (my estimate, W3C page not fetched).
- Exact SI values since 2019 (not on fetched CODATA page); CIAAW abridged values and reuse terms.
- PubChem data-usage wording; legal status of copying facts from NIST tables.
- Authoritative sources for spectra axis conventions, titration/heating/phase diagram conventions, energy diagrams, Origin/Excel defaults.
- ASTM E287 secondary table numbers; E969 pipet tolerances; balance specs; meniscus reading text.
- GHS red border width and UNECE reproduction terms.
- ChemSpider and Merck/Sigma tool features.
