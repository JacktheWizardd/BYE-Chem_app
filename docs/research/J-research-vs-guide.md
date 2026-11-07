# J. BYE Chem visual design guide vs published research

Compiled 2026-11-06. Compares `docs/design-guide.md` with research on chemistry visualisation and learning. Does not repeat `C-learning.md` (Johnstone, worked examples, misconceptions, basic WCAG) except where it bears on a visual rule.

**Method and honesty note.** Every DOI below was checked against Crossref (title, journal, volume, pages, year match) unless marked otherwise. For most papers I read only the abstract or a search snippet, and for some (marked "record only") only the bibliographic record. What a paper *found* is therefore stated at abstract level; where I have only the record, the finding is marked **UNVERIFIED (content)** and is background knowledge to be checked before it is relied on. Evidence strength: **Strong** (replicated or standard), **Moderate**, **Weak**. Contrast ratios were computed by me from the guide's hex values (WCAG relative-luminance formula).

## Summary table

| # | Topic | Research says | Our guide | Match? | Change (evidence) |
|---|---|---|---|---|---|
| 1 | Multiple representations, 2D-3D translation | Understanding needs moving between representations, and many students cannot translate 2D diagrams to 3D; concrete/virtual models and linked views help (Moderate) | 2D rules (s4) and 3D rules (s5) are separate; wedge/dash drawn correctly; no link between them | Partly | Link each 2D structure to its 3D model with highlight-on-tap; teach wedge/dash explicitly (Moderate) |
| 2 | Model types, rotation | No single best model; fit the model to the task; learner-controlled manipulation helps (Moderate) | Ball-and-stick default, space-filling toggle, free turning | Matches | Add a learner-controlled rotate with reset; keep "real size" as a toggle (Moderate/Weak) |
| 3 | Molecular graphics design | Ambient occlusion plus edge cues improve perceived 3D structure; surveys cover illustrative rendering (Moderate, one study read at snippet level) | Matte Lambert, one key light, outlines in ink; no AO or depth cue rule | Partly / silent | Require a depth cue (AO or soft contact shadow plus outline) for any engine; AO can distort colour reading, so keep letters (Moderate/Weak) |
| 4 | Simulation design, animation | Implicit scaffolding, cueing, learner control; animation helps when it is the change being learned, not as decoration (Moderate) | Calm motion, "move only when chemistry moves", Reduce Motion | Matches | Add pause/step/replay on every particle animation; mark the changing quantity with a cue (Moderate) |
| 5 | Graph literacy | Students struggle with features of titration, kinetics and energy graphs; they read slope/area/points poorly (Moderate) | Graphs from Math Engine, axis labels *quantity / unit*, live graph beside scene | Partly | Mark key points on graphs (equivalence point etc.), pair with particle view, add "what to look at" caption (Weak/Moderate) |
| 6 | Accessibility | Colour must not be the sole cue (WCAG, standard); text 4.5:1; graphics 3:1; CVD is common | Letters on atoms, 4.5:1 text, 44 pt targets, `describe` strings | Mostly, with measurable gaps | Fix 5 atom colours whose letters fall below 4.5:1; lift H and bond outline contrast; test CVD (Strong as standard) |
| 7 | Cognitive load | Labels integrated with the picture beat separate ones (spatial contiguity); signalling helps; redundant text hurts (Strong in general, Moderate in chemistry) | Labels as overlay on the diagram; one dimension/angle/tag at once | Matches | Keep it; add a rule against narrating on-screen text, and fade scaffolds with skill (Strong/Moderate) |

---

## 1. Representational competence and multiple representations

**Sources**
- Kozma & Russell 1997 and Kozma 2003 (record verified): https://doi.org/10.1016/S0959-4752(02)00021-X (Kozma 2003, *Learning and Instruction* 13, 205-226; Crossref confirms title "The material features of multiple representations and their cognitive and social affordances for science understanding"). Kozma & Russell 1997 is in C-learning.md.
- Ainsworth 2006, DeFT framework, *Learning and Instruction* 16, 183-198. https://doi.org/10.1016/j.learninstruc.2006.03.001 (record verified, no abstract returned). **UNVERIFIED (content)**: from background knowledge, the framework looks at a representation's design, its function (complement, constrain, construct) and the learner's task of translating between representations. Check before citing.
- Wu & Shah 2004, *Science Education* 88, 465-492. https://doi.org/10.1002/sce.10126 (abstract read). Reviews spatial ability and chemistry learning, concluding that visuospatial ability is relevant, that some conceptual errors stem from difficulty operating on visuospatial representations, and that some visualisation tools helped students overcome them.
- Stieff 2011, *J. Res. Sci. Teach.* 48, 1137-1158. https://doi.org/10.1002/tea.20438 (abstract read). A quasi-experiment with 16 secondary classrooms: a visualisation-based curriculum (Connected Chemistry) gave only small to modest achievement gains but led students to use expert-like submicroscopic representations significantly more often.
- Harle & Towns 2011, review of spatial ability in chemistry, *J. Chem. Educ.* 88, 351-360. https://doi.org/10.1021/ed900003n (record only; Crossref year 2010 online). Content **UNVERIFIED**.
- Stull, Hegarty, Dixon & Stieff 2012, "Representational translation with concrete models in organic chemistry", *Cognition and Instruction* 30, 404-434. https://doi.org/10.1080/07370008.2012.719956 (record only). Content **UNVERIFIED**.
- Mohamed-Salah et al. 2016, *CERP* 17, 862-877. https://doi.org/10.1039/c5rp00180c (title verified: "To what degree does handling concrete molecular models promote the ability to translate and coordinate between 2D and 3D molecular structure representations?"). From a search snippet: translation was better for dash-wedge diagrams than for Newman, and absent for Fischer projections. Snippet level only.
- Kumi et al. 2013, *CERP* 14, 177-187. https://doi.org/10.1039/c3rp20166j (title verified: organic textbooks and representational competence). A search snippet says abstracting 3D from 2D diagrams is a known hard task. Olimpo et al. 2015, *CERP* 16, 143-153, https://doi.org/10.1039/c4rp00169a (title verified, about 2D diagrammatic conventions and success on translation tasks; findings **UNVERIFIED**).
- Mistry, Singh & Ridley 2020, *J. Chem. Educ.* 97, 1157-1161. https://doi.org/10.1021/acs.jchemed.9b00688 (record verified). Search snippet: web tools that link dashed-wedged 2D structures to virtual 3D models improved students' ability to draw Newman projections and assign R/S. Single course, snippet level.
- Hutchison et al. 2017, *J. Chem. Educ.* 94, 892-896. https://doi.org/10.1021/acs.jchemed.6b00720 (record verified, title on improving accuracy between dash-wedge and Newman projections; findings **UNVERIFIED**).

**What research says.** Skill at moving between representations (formula, 2D structure, 3D model, particle picture) is a core part of chemical understanding, and it is not automatic: novice difficulty with wedge/dash and projections is repeatedly reported, and spatial ability is a relevant factor. Tools that show a 2D drawing linked to a rotating 3D model are reported to help in at least one course study. Strength: **Moderate** (many small studies, mostly organic chemistry at university level, abstract-level reading by me).

**Matches.** The guide says wedge is toward the viewer and hash is away, narrow end at the stereocentre (s4), and it treats 3D as a separate engineered layer. Putting a 3D viewer on every Learn page (s7) supports the translation idea.

**Differs / silent.** The guide never says how a 2D structure and its 3D model are *connected*. It also does not ask the learner to do any translating. It says nothing about first-year-specific traps (a wedge is a perspective cue, not a length; bonds in plane vs out of plane).

**Recommendation.** (a) Make the 2D structure and 3D viewer a linked pair: tapping an atom or bond lights it in both. (b) For chiral centres, offer a "turn it to match the drawing" step. (c) Add a short caption convention: "In the drawing, the wedge means this bond points toward you" with the 3D model beside it. (d) Keep wedge/dash for the 2D layer; do not add Newman and Fischer projections until the unit needs them.

---

## 2. Which model types help

**Sources**
- Wu & Shah 2004 and Stieff 2011 (above).
- Stull & Hegarty 2016, *J. Educ. Psychol.* 108, 509-527, "Model manipulation and learning: fostering representational competence with virtual and concrete models". https://doi.org/10.1037/edu0000077 (record verified, no abstract). **UNVERIFIED (content)**: background knowledge says manipulating either a physical or a virtual model improved representational translation similarly.
- Mohamed-Salah et al. 2016 (above).
- Kozlíková et al. 2017 (see s3) for the engineering side.
- No source found for electrostatic-potential maps and learning. **UNVERIFIED**: I did not locate a study on whether ESP maps help beginners.

**What research says.** I found no evidence that one *model style* (ball-and-stick vs space-filling) is better in general; the literature framing is that each makes different features visible, and that students should be taught to choose and translate. Manipulating models (physical or virtual) is reported to help translation tasks. Strength: **Weak/Moderate**; the model-style claim is an absence of evidence in what I searched, not evidence of absence.

**Matches.** Ball-and-stick default for shape and angle, space-filling as a "real size" toggle, bond-visible radii (s5). The guide already says "hide the ball-and-stick model inside" is a don't, so both are visible together, which supports translating between them.

**Differs / silent.** The guide is silent on interaction: free turning is implied in s7 ("Turn a molecule") but there are no rules for it (reset, snap to a standard view, inertia). Electrostatic maps are not offered, which is reasonable given the lack of beginner evidence.

**Recommendation.** Keep the defaults. Add: learner-controlled rotation with a one-tap "reset view" and standard views (front, top); and let the learner switch between ball-and-stick and real size on the same molecule so the link is visible. Do not add ESP maps until a unit needs them.

---

## 3. Molecular graphics design research

**Sources**
- Kozlíková et al. 2017, "Visualization of biomolecular structures: state of the art revisited", *Computer Graphics Forum* 36, 178-204. https://doi.org/10.1111/cgf.13072 (abstract read). A taxonomy and survey of techniques, efficient display (image quality and frame rate), level of detail, and dynamic data, with a focus on structural biology. It is a technique survey, not a learner study.
- Tarini, Cignoni & Montani 2006, "Ambient occlusion and edge cueing for enhancing real time molecular visualization", *IEEE TVCG* 12, 1237-1244. https://doi.org/10.1109/TVCG.2006.115 (record verified). Search snippet of the paper PDF reports that AO plus depth-aware halos and contour lines strongly increased understanding of 3D structure even in still images. Snippet level; authors' own claim, not an independent user study.
- Lawonn et al. 2018, "A survey of surface-based illustrative rendering for visualization", *CGF* 37, 205-234. https://doi.org/10.1111/cgf.13322 (abstract read). Covers sparse lines, stippling, hatching, illustrative shading and evaluation approaches. Not molecule-specific.
- A PMC article on ambient occlusion and reading colour-encoded data on molecular surfaces (https://pmc.ncbi.nlm.nih.gov/articles/PMC4982670). Seen only through a search snippet (page blocked by verification screen): it reported lightness-constancy effects with AO. Authors, title and DOI **UNVERIFIED**; treat as a pointer.
- Wong 2011, "Points of view: colour blindness", *Nature Methods* 8, 441. https://doi.org/10.1038/nmeth.1618 (record verified; content **UNVERIFIED**, background knowledge says it recommends colour-blind-safe palettes and redundant cues).
- Goodsell-style illustration, 3D label placement: **no source located; UNVERIFIED**. I could not find a peer-reviewed evaluation of label placement on rotating molecular models.

**What research says.** The graphics literature agrees that plain shaded spheres are hard to read in depth, and cheap cues (ambient occlusion, edge halos, outlines) help perceived structure. The cited evidence is mostly the technique authors' own demonstration plus surveys. Strength: **Moderate for the depth-cue claim**, **Weak** for illustrative-style learning benefit.

**Matches.** The guide asks for matte materials, soft sky light plus one key, ink outlines in the engineering layer. Those are in the spirit of illustrative rendering.

**Differs / silent.** The guide specifies no depth cue. Pure Lambert with a key light flattens depth when many same-coloured atoms overlap. It is also silent on *overlap*: two atoms of the same colour behind one another merge. And it forbids gloss and metal, which is fine, but does not say what replaces specular highlights as a shape cue.

**Recommendation.** Add an engine-neutral requirement: "Every 3D scene needs at least one depth cue beyond lighting: soft ambient occlusion or contact shadow, plus a thin ink outline on atoms." Keep the element letters as the primary identifier (AO may shift perceived colour). Label placement: keep the existing overlay rule (s8); there is no research I could cite to improve on it.

---

## 4. Simulation design, signalling, animation

**Sources**
- Podolefsky, Moore & Perkins, "Implicit scaffolding in interactive simulations: design strategies to support multiple educational goals", arXiv:1306.6544. https://arxiv.org/abs/1306.6544 (found via search; arXiv page not read in full). The summary I saw: affordances, constraints, cueing and feedback frame and scaffold exploration without explicit instruction, to support affect, process and content goals. Not peer-reviewed in that form as far as I could verify.
- Moore, Herzog & Perkins 2013, "Interactive simulations as implicit support for guided-inquiry", *CERP* 14, 257-268. https://doi.org/10.1039/c3rp20157k (record verified). Search snippet: students in large chemistry classes used implicit-scaffold sims through exploration.
- Moore et al. 2014, PhET for chemistry, *J. Chem. Educ.* 91, 1191-1197. https://doi.org/10.1021/ed4005084 (record verified; design/use description per C-learning.md).
- Williamson & Abraham 1995, *J. Res. Sci. Teach.* 32, 521-534. https://doi.org/10.1002/tea.3660320508 (abstract partly read): computer animations of particulate behaviour were studied as a lecture supplement and in other conditions, with a test of students' particulate mental models. The result sentence was cut off in what I retrieved, so the outcome is **UNVERIFIED (content)**.
- Sanger, Phelps & Fienhold 2000, "Using a computer animation to improve students' conceptual understanding of a can-crushing demonstration", *J. Chem. Educ.* 77, 1517. https://doi.org/10.1021/ed077p1517 (record verified; this resolves the item C-learning.md listed as unfound). Content **UNVERIFIED**.
- Tversky, Morrison & Betrancourt 2002, "Animation: can it facilitate?", *Int. J. Human-Computer Studies* 57, 247-262. https://doi.org/10.1006/ijhc.2002.1017 (record verified). **UNVERIFIED (content)**: background knowledge says it argues animations often fail to beat static graphics unless they are congruent with the mental model and the comparison is fair.
- Hegarty 2004, "Dynamic visualizations and learning: getting to the difficult questions", *Learning and Instruction* 14, 343-351. https://doi.org/10.1016/j.learninstruc.2004.06.007 (record only). Content **UNVERIFIED**.
- Mayer & Moreno 2002, "Animation as an aid to multimedia learning", *Educ. Psychol. Rev.* 14, 87-99. https://doi.org/10.1023/a:1013184611077 (record verified). Content **UNVERIFIED**. Mayer & Moreno 2003, "Nine ways to reduce cognitive load in multimedia learning", *Educ. Psychol.* 38, 43-52. https://doi.org/10.1207/S15326985EP3801_6 (record only).
- Rutten, van Joolingen & van der Veen 2012, simulations in science education, *Computers & Education* 58, 136-153. https://doi.org/10.1016/j.compedu.2011.07.017 (record only). Content **UNVERIFIED**.
- Schneider et al. 2018, meta-analysis of signalling, *Educ. Res. Rev.* 23, 1-24. https://doi.org/10.1016/j.edurev.2017.11.001 (record only). Content **UNVERIFIED**; see s7.

**What research says.** PhET-style design leans on constraints and visual cueing so that learners can explore without instructions (the authors' own framework; Moderate). Particulate animation is a standard recommendation in chemistry education, but the strongest general-literature caution (Tversky et al.) is that animation per se is not better than well-designed static pictures. So the benefit depends on what the motion shows and whether the learner can control pace. Strength: **Moderate** for interactive sims, **Weak/mixed** for animation vs static.

**Matches.** "Things move only when the chemistry moves" (s1) is the right spirit. Instrument readout with a live graph beside the scene (s2) fits the PhET linked-representation pattern. Reduce Motion handling is good practice.

**Differs / silent.** No rule for pause, step or replay. No rule for *cueing*: which quantity is changing in the sandbox. No rule for starting state (a sandbox that opens with a surprising result is better than an empty one in the PhET approach; this is my reading of the framework, not a quoted finding).

**Recommendation.** Every particle animation gets Pause / Step / Replay. Highlight (shu red) the one quantity that changes and show it in the readout. Open each sandbox in a sensible default state with only the controls the step needs.

---

## 5. Data and graph literacy

**Sources**
- A 2026 *CERP* think-aloud study of 12 second-semester students reading titration curves (https://pubs.rsc.org/en/content/articlehtml/2026/rp/d5rp00456j; DOI inferred from URL, not Crossref-checked). Search summary: reasoning depended on which features students noticed and on context; students did not always treat rate-based features (slope) as informative. Snippet level, small sample.
- Rodriguez, Bain & Towns et al. 2018, "Using symbolic and graphical forms to analyze students' mathematical reasoning in chemical contexts", *J. Chem. Educ.* 95, 2114-2125. https://doi.org/10.1021/acs.jchemed.8b00584 (record verified; content **UNVERIFIED**, I did not confirm it concerns kinetics).
- Bain et al. 2014, thermodynamics teaching and learning review, *CERP* 15, 320-335. https://doi.org/10.1039/C4RP00011K (record verified; content **UNVERIFIED** with respect to energy diagrams).
- A search result stated that undergraduates struggle to construct and interpret kinetics graphs and often fail to distinguish initial, instantaneous and average rates. Source page not opened; **UNVERIFIED**.
- Phase diagrams: **no education research found** in my search.
- No guidance on graph design specific to chemistry learners located.

**What research says.** Reading graphs is a recurring difficulty: learners fix on salient points or shapes and under-use slope and area; a titration curve is read as a picture, not a relationship. The evidence is a handful of small studies. Strength: **Weak/Moderate**. For phase diagrams: **none found**.

**Matches.** Axis label as quantity / unit makes tick values pure numbers, a recognised convention (s3, s6). Running a live graph under the scene (s2) ties the graph to what it shows. "Measured and theory values labelled" (s8) also helps.

**Differs / silent.** The graph table (s6) lists what can be drawn, not how to teach reading it. No rule to annotate key features, to show a point moving along the curve while the experiment runs, or to ask the learner to predict the shape first.

**Recommendation.** For each graph: (a) a moving marker showing the current point while a scene runs; (b) shu-red callouts on the one feature being taught (equivalence point, activation energy, plateau) with a caption saying what the feature means in particles; (c) a predict-then-reveal step for the first graph of each kind. Treat phase diagrams as an engine-addition task and also a teaching risk, since there is no research I could find to lean on.

---

## 6. Accessibility in chemistry visuals

**Sources**
- WCAG 2.2 (fetched this session): https://www.w3.org/TR/WCAG22/ . SC 1.4.1 colour not the only means (A); 1.4.3 text 4.5:1, large text 3:1 (AA); 1.4.4 resize to 200% (AA); 1.4.11 non-text contrast 3:1 for UI components and required graphical parts (AA); 1.1.1 text alternatives (A).
- Target size: https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html . 2.5.8 requires 24 by 24 CSS px (AA) with spacing and other exceptions; 44 by 44 is the stricter 2.5.5 (level not stated on the page I read; C-learning.md called it AAA, unconfirmed).
- Okabe & Ito colour universal design palette (2008): secondary pages only, e.g. https://siegal.bio.nyu.edu/color-palette/ . Primary source not read.
- CVD prevalence about 8% of men: secondary sources only; NEI source not found. **UNVERIFIED**.
- Wong 2011 (s3), content **UNVERIFIED**.
- Blind and low-vision students: Njardarson 2023, *J. Chem. Educ.* 100, 3960-3967. https://doi.org/10.1021/acs.jchemed.3c00616 (record verified). Search summary: adapted model kits plus tactile drawing board and braille for one-to-one teaching. Wedler et al. 2012, *J. Chem. Educ.* 89, 1400-1404. https://doi.org/10.1021/ed3000364 (record verified), accommodations combining tactile drawings, model kits, software and 3D printing (snippet).
- Lewis Structure Explorer preprint (ChemRxiv, not peer-reviewed): https://www.cambridge.org/engage/coe/article-details/65cfc5d8e9ebbb4db9867dc2 . Search summary: screen-reader accessible, alt text generated dynamically; tested with four blind adults.
- Sonification and MathML/ChemML for chemistry, and dyslexia-friendly notation: **no sources found**. A "Visualization without Vision" review in *J. Sci. Educ. Students with Disabilities* 23 was named in a search summary; not opened, **UNVERIFIED**.
- Evidence that CPK palettes specifically harm learners: none found (as C-learning.md).

**Measured contrast of the guide's colours (my calculation, WCAG formula).**

| Element | Letter and its ratio on the atom | Passes 4.5:1? | Atom vs paper |
|---|---|---|---|
| H | ink 16.2 | yes | 1.05 (no visible edge without an outline) |
| C | white 9.4 | yes | 8.5 |
| N | white 3.7 | **no** | 3.3 |
| O | white 3.2 | **no** | 2.9 |
| S | ink 8.6 | yes | 1.8 |
| P | ink 6.2 | yes | 2.5 |
| F, Cl | white 2.9 | **no** | 2.6 |
| Br | white 5.3 | yes | 4.8 |
| I | white 5.7 | yes | 5.2 |
| Alkali metals | white 3.6 | **no** | 3.3 |
| Alkaline earths | white 3.2 | **no** | 2.8 |
| Transition metals | ink 6.1 | yes | 2.5 |
| Noble gases | ink 7.6 | yes | 2.0 |

Other values: bond `#b9b1a3` on paper 1.9:1; dimension line `#5a554d` 6.7:1; shu `#b5462a` 4.9:1; coral `#d9846a` 2.5:1; grid `#e8e2d6` 1.2:1 (decorative).

**What the standards say.** Colour alone is not enough (1.4.1); text needs 4.5:1; meaningful graphics need 3:1 (1.4.11). Strength: **Strong** as requirements. Whether CPK-like palettes impair learning: no evidence found.

**Matches.** Atom letters (s1, s9), text description for graphs, scene `describe` string, 44 pt targets (stricter than the 24 px AA minimum), scalable text, ↔ vs ⇌ notation redundancy. Red/green combination avoided as a sole cue, and the guide is the only place I saw "highlighted molecules also change in the readout text".

**Differs / gaps.**
1. Letters on N, O, F/Cl, alkali and alkaline-earth atoms fall below 4.5:1 for small text (text under about 18 pt counts as small). The guide's rule "text contrast at least 4.5:1" is therefore not met by its own palette. Only the "ink letter" colours (S, P, TM, Ng) and C, Br, I pass.
2. Hydrogen (paper white on paper) and noble gases/sulfur have almost no edge contrast against the page. The ink outline rule is stated only for the engineering layer (s2), not for atoms in general. Non-text contrast (1.4.11) asks for 3:1 for the shape that identifies a component.
3. Bonds (1.9:1) are very light. They are redundant with atom position, but they carry structural meaning.
4. Red-green deficiency: O clay (`#cf7a62`) and F/Cl sage (`#7fa36b`) are close in lightness and could be confused, as are N slate and alkali violet. The letters cover this, but only above the 16 px size limit; below it, colour alone distinguishes them. I did not run a CVD simulation, so this is a risk flag, not a measured result.
5. No rule for the alt text of a 2D structure (what a screen-reader user hears for a skeletal formula), beyond the one-line `describe`.

**Recommendation.** (a) Darken the atom colours for N, O, Cl/F, alkali and alkaline-earth until white letters reach 4.5:1, or switch those letters to ink where ink passes. (b) Give every atom a 1 px ink outline (fixes H and edge contrast). (c) Darken bonds to at least 3:1. (d) Run a CVD simulation on the element table before freezing it. (e) For each 2D structure, generate alt text from the structure data (atoms, bonds, charges, stereo) as the Lewis Structure Explorer preprint does; and define the sonification question as out of scope for now.

---

## 7. Cognitive load: split attention, redundancy, signalling

**Sources**
- Chandler & Sweller 1991, "Cognitive load theory and the format of instruction", *Cognition and Instruction* 8, 293-332. https://doi.org/10.1207/s1532690xci0804_2 (record verified; the classic split-attention source; content **UNVERIFIED** in this pass beyond the title).
- Ginns 2006, meta-analysis of spatial and temporal contiguity, *Learning and Instruction* 16, 511-525. https://doi.org/10.1016/j.learninstruc.2006.10.001 (record only). **UNVERIFIED (content)**: background knowledge says integrating text with the picture improved learning with a moderate-to-large effect.
- Schneider et al. 2018 (above), signalling meta-analysis (content **UNVERIFIED**).
- Ozcelik et al. 2010, "Why does signaling enhance multimedia learning? Evidence from eye movements", *Computers in Human Behavior* 26, 110-117. https://doi.org/10.1016/j.chb.2009.09.001 (record verified; content **UNVERIFIED**). Ozcelik et al. 2009, colour coding and eye-tracking, *Computers & Education* 53, 445-453. https://doi.org/10.1016/j.compedu.2009.03.002 (record verified).
- Mayer & Moreno 2003 (above); Sweller, van Merrienboer & Paas 1998 and Sweller et al. 2019 (in C-learning.md).
- Johnstone 1991/2000 (C-learning.md): one level at a time.

**What research says (stated cautiously).** The cognitive-load literature predicts that labels placed on the diagram beat labels in a separate key (split attention), that duplicating the same information in two forms can add load for novices (redundancy), and that cues pointing at the relevant element reduce search. These effects are well established in general multimedia research; in chemistry-specific tasks the evidence is thinner. I could not confirm effect sizes in this pass. Strength: **Strong** in general literature (from background; only the Chandler & Sweller and Ginns titles verified), **Moderate** for chemistry.

**Matches.** Overlay labels on the picture (s8) is the integrated-label pattern. "At most one dimension, one angle and one tag visible" (s2, s8) is a direct application of limiting load. Signalling in shu red for the measured quantity (s1) matches the cueing idea. "Never show a gauge without unit" is sound.

**Differs / silent.** Redundancy: the guide wants both letters on atoms and (in places) a colour and a text readout; that is purposeful redundancy for accessibility and probably fine, but the guide has no rule against narrating or repeating on-screen text in the caption. Also nothing on fading scaffolds as the learner improves (expertise reversal, C-learning.md): "one at a time" is right for novices but may annoy a learner who knows the content.

**Recommendation.** Keep the overlay and one-at-a-time rules. Add: (a) a text caption should say what the picture does not (why), not repeat the labels; (b) a "show all dimensions" toggle for confident learners; (c) the shu-red highlight is reserved for one thing per screen.

---

## Recommended changes (ranked)

1. **Fix atom-colour contrast (Strong as a standard; measured).** Letters on N, O, F/Cl, alkali metals and alkaline earths are below 4.5:1. Darken those atoms or use ink letters. Guide s1 and s9.
2. **Outline every atom and darken bonds (Strong as standard, 1.4.11).** H is 1.05:1 against paper, bonds 1.9:1. Ink outline in all layers; bonds at 3:1 or more.
3. **Link 2D and 3D (Moderate).** Tap an atom in the drawing, light it in the 3D model; add a "match the drawing" turning step for stereo (Mistry 2020; Wu & Shah 2004; Stieff 2011).
4. **Add a depth cue requirement for any 3D engine (Moderate).** AO or soft contact shadow plus outline (Tarini 2006 snippet; Kozlíková 2017 survey). Add to s10.
5. **Add pause, step, replay and a changing-quantity cue to every animation (Moderate).** Applies the animation-vs-static caution (Tversky 2002, content to verify) and PhET's implicit scaffolding.
6. **Teach graph reading (Weak/Moderate).** Moving marker, feature callouts, predict-then-reveal, particle caption for the feature.
7. **Run a CVD simulation on the element table (Strong as a requirement, risk not measured).** Mainly O vs Cl/F and N vs alkali.
8. **Alt text for 2D structures generated from structure data (Weak; one preprint).**
9. **Scaffold fading: a "show all labels" toggle once a learner is confident (Moderate in general, via C-learning.md).**
10. **Rotation controls: reset view and standard views (Weak).**

## UNVERIFIED list

- Content (not just the record) of: Ainsworth 2006; Stull & Hegarty 2016; Stull et al. 2012; Harle & Towns; Olimpo 2015; Hutchison 2017; Tversky et al. 2002; Hegarty 2004; Mayer & Moreno 2002 and 2003; Rutten 2012; Chandler & Sweller 1991; Ginns 2006; Schneider 2018; Ozcelik 2009/2010; Wong 2011; Sanger et al. 2000; Rodriguez 2018 (kinetics link); Bain 2014 (energy diagrams). DOIs resolve in Crossref for all of these; the findings I describe for them are background knowledge and flagged in the text.
- Williamson & Abraham 1995 outcome (abstract cut off).
- 2026 *CERP* titration paper: DOI inferred from URL, not checked.
- PMC4982670 (ambient occlusion and colour reading): authors, title, DOI.
- Podolefsky/Moore/Perkins arXiv paper: read only via a search summary.
- Okabe-Ito palette primary source; colour-vision-deficiency prevalence (primary source); 2.5.5 conformance level (page did not state it).
- Electrostatic-potential maps and beginner learning; 3D label-placement evaluation; Goodsell-style illustration and learning; sonification, ChemML/MathML for chemistry; dyslexia-friendly chemical notation; phase-diagram education research. No sources found.
- A Crossref lookup for Barnea & Dori 1999 (DOI 10.1023/A:1009436510037) returned 404, so that paper is not cited.
- Kinetics-graph claim ("initial/instantaneous/average rates") from a search summary; page not opened.
