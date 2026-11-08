# How BYE Chem writes chemistry

This is the notation spec for every read, recap and worked example. It says how to type each kind of chemistry in `Rich` markup (`src/components/Rich.tsx`). The look, figures and the reasons behind these rules are in [design-guide.md §3](design-guide.md#3-notation-how-chemists-write). This page follows it and adds the exact markup.

The rules follow IUPAC: the Green Book (*Quantities, Units and Symbols in Physical Chemistry*, 3rd ed., 2007) for units, quantities, states and arrows, and the Red Book (*Nomenclature of Inorganic Chemistry*, 2005) for charges, oxidation states and isotopes. Where we use the classroom form instead, the rule says so.

## How this page is checked

`test/notation.test.ts` reads this file.

- Every code span on a **Markup:** line must pass `validateRich` (`src/content/notation.ts`).
- Every code span on a **Caught:** line must fail it, with the issue named in brackets after it.
- Every character in those examples, and in `src/content`, is looked up in the shipped fonts. The gaps are listed in [Glyph gaps](#glyph-gaps) at the end. The test fails if the fonts lose a glyph or gain one, so keep that table true.

Other code spans on this page are not checked.

## The markup

`Rich` knows six tags and nothing else: `<sub>`, `<sup>`, `<b>`, `<i>`, `<g>` (grams, blue) and `<m>` (moles, green). Every tag is closed, in the order it was opened. Tags can nest, as in a power that has a subscript inside it.

**Markup:** `<i>k</i> = <i>A</i>e<sup>−<i>E</i><sub>a</sub>/<i>RT</i></sup>`

Example: the Arrhenius equation, with a subscript inside a power.

**Caught:** `H<sub>2</sub>O<sub>` (tag-unclosed), `<b>CO<sub>2</b></sub>` (tag-crossed), `H<sub>2</sub>O<br>` (tag-unknown), `CO<sub></sub>` (tag-empty)

**Never use Unicode subscript or superscript characters** (₂, ², ⁻ and the rest of U+2070–U+209F, ¹ ² ³). They come from a fallback font and break the line height. Always use the tags.

**Caught:** `H₂O` (unicode-script), `x² + 1` (unicode-script), `Fe³⁺` (unicode-script)

## Formulas

**Rule.** Element symbols are upright and written as they are, capital first (Co is cobalt; CO is carbon monoxide). Subscript counts use `<sub>`. A count of 1 is never written. A group that repeats goes in round brackets with its count after the bracket.

**Markup:** `H<sub>2</sub>O`, `C<sub>6</sub>H<sub>12</sub>O<sub>6</sub>`, `Ca(NO<sub>3</sub>)<sub>2</sub>`, `(NH<sub>4</sub>)<sub>2</sub>SO<sub>4</sub>`

Example: calcium nitrate, Ca(NO<sub>3</sub>)<sub>2</sub>, has 1 Ca, 2 N and 6 O. The 2 after the bracket doubles everything inside it.

**Hydrates.** A centred dot, the middle dot · (U+00B7), joins the salt and its water. There is no space on either side, and the water count is full size, straight after the dot.

**Markup:** `CuSO<sub>4</sub>·5H<sub>2</sub>O`

Example: copper(II) sulfate pentahydrate, CuSO<sub>4</sub>·5H<sub>2</sub>O, carries 5 water molecules for each CuSO<sub>4</sub>.

**Caught:** `CuSO<sub>4</sub>.5H<sub>2</sub>O` (wrong-dot), `CuSO<sub>4</sub>⋅5H<sub>2</sub>O` (wrong-dot)

Use only the middle dot. The dot operator ⋅ (U+22C5) and bullet operator ∙ (U+2219) look the same but are missing from our fonts.

**Formulas in a sentence** are upright, never italic or bold. Wrap a formula in `<g>` or `<m>` only when the colour means grams or moles, never for decoration.

## Ion charges

**Rule.** The charge is a superscript with the number first, then the sign: 2+, 3−. A charge of 1 is just the sign. The sign is a real minus, − (U+2212), never a hyphen - or an en dash –. On a polyatomic ion the subscript comes first, then the charge.

**Markup:** `Na<sup>+</sup>`, `Cl<sup>−</sup>`, `Fe<sup>3+</sup>`, `SO<sub>4</sub><sup>2−</sup>`, `[Cu(NH<sub>3</sub>)<sub>4</sub>]<sup>2+</sup>`

Example: the sulfate ion, SO<sub>4</sub><sup>2−</sup>, has 4 O and a charge of 2−.

**Caught:** `SO<sub>4</sub><sup>2-</sup>` (charge-hyphen), `Cl<sup>–</sup>` (charge-hyphen)

`Rich` puts the subscript and the charge one after the other, not stacked as in print. That is fine and is how most screens show it. Write `SO<sub>4</sub><sup>2−</sup>`, never `SO<sub>4</sub><sup>−2</sup>`: the order of number and sign is what tells a charge from an oxidation state.

## Oxidation states

**Rule.** In names, the oxidation state is a Roman numeral in brackets with no space: iron(III) chloride. When you assign oxidation states in a worked example, write them as signed numbers with the sign first (+3, −2), as Chem 1A does. IUPAC's own form is a raised Roman numeral on the symbol, Fe<sup>III</sup>; it appears in the element card. The minus is −, as for charges.

**Markup:** `iron(III) chloride, FeCl<sub>3</sub>`, `In Fe<sub>2</sub>O<sub>3</sub>, Fe is +3 and O is −2.`, `Fe<sup>III</sup>`

Example: in Fe<sub>2</sub>O<sub>3</sub>, each O is −2, so the two Fe share +6 and each is +3.

**Caught:** `O is -2` (minus-hyphen)

The rule of thumb for learners: a charge is "number then sign" (2−) because it is a label on an ion; an oxidation state is "sign then number" (−2) because it is a number you add up.

## States of matter

**Rule.** The state symbol goes in round brackets straight after the formula, no space, full size and upright: (s) solid, (l) liquid, (g) gas, (aq) dissolved in water. Never put it in `<sub>` or `<i>`. A charge comes before the state.

**Markup:** `NaCl(aq)`, `H<sub>2</sub>O(l)`, `CO<sub>2</sub>(g)`, `Fe(s)`, `Na<sup>+</sup>(aq)`

Example: table salt dissolved in water is NaCl(aq); each Na<sup>+</sup>(aq) ion is surrounded by water.

**Caught:** `NaCl<sub>(aq)</sub>` (state-styled), `CO<sub>2</sub>(<i>g</i>)` (state-styled)

## Reaction arrows

**Rule.** Put a space on each side of every arrow and every +. A coefficient is full size, followed by a space. A coefficient of 1 is not written.

| Arrow | Means | Type it as |
|---|---|---|
| → (U+2192) | reacts to give | `→` |
| ⇌ (U+21CC) | equilibrium, both ways at once | `⇌` |
| ↔ (U+2194) | resonance forms only, never equilibrium. Resonance forms are Lewis structures, so ↔ appears in figures, not in text | (figure only) |

**Markup:** `2 H<sub>2</sub>(g) + O<sub>2</sub>(g) → 2 H<sub>2</sub>O(l)`, `N<sub>2</sub>(g) + 3 H<sub>2</sub>(g) ⇌ 2 NH<sub>3</sub>(g)`, `CH<sub>3</sub>COOH(aq) + H<sub>2</sub>O(l) ⇌ CH<sub>3</sub>COO<sup>−</sup>(aq) + H<sub>3</sub>O<sup>+</sup>(aq)`

Example: hydrogen burns in oxygen to give water: 2 H<sub>2</sub>(g) + O<sub>2</sub>(g) → 2 H<sub>2</sub>O(l).

**Caught:** `2 H<sub>2</sub> + O<sub>2</sub> -> 2 H<sub>2</sub>O` (ascii-arrow), `N<sub>2</sub> + 3 H<sub>2</sub> <=> 2 NH<sub>3</sub>` (ascii-arrow)

Do not use ⇄ (U+21C4) for equilibrium. IUPAC uses it for "a reaction going both ways", but Chem 1A uses ⇌, and so do we.

### Conditions over the arrow: the plain-words convention

`Rich` has no way to stack text over an arrow, and stacking breaks badly at 323 px. So **in text, conditions never go on the arrow.** Write the equation with a plain arrow, then a comma, then the conditions in words. Heat is the word "heated", never a Δ by the arrow. A catalyst is named with its formula.

**Markup:** `2 KClO<sub>3</sub>(s) → 2 KCl(s) + 3 O<sub>2</sub>(g), heated`, `2 H<sub>2</sub>O<sub>2</sub>(aq) → 2 H<sub>2</sub>O(l) + O<sub>2</sub>(g), with MnO<sub>2</sub> as a catalyst`, `N<sub>2</sub>(g) + 3 H<sub>2</sub>(g) ⇌ 2 NH<sub>3</sub>(g), at 450 °C and 200 atm over iron`

Example: potassium chlorate gives off oxygen when it is heated: 2 KClO<sub>3</sub>(s) → 2 KCl(s) + 3 O<sub>2</sub>(g), heated.

In **figures** drawn by the engine, conditions go over the arrow as in print: the catalyst or reagent above, temperature and pressure below, and Δ above for heat. The figure's caption says the same thing in words.

## Δ: change, and heat

**Rule.** Δ (U+0394, capital Greek delta) means "change in". It is upright and sits straight against the quantity, which is italic: Δ<i>H</i>, Δ<i>T</i>. The standard-state mark is the degree sign ° straight after the symbol, not in `<sup>`. A "formation" or "reaction" label is an upright subscript after the °, as Chem 1A writes it. (IUPAC puts that label on the Δ instead, Δ<sub>f</sub><i>H</i>°; we use the classroom form.)

**Markup:** `Δ<i>T</i> = 15.0 °C`, `Δ<i>H</i> = −286 kJ/mol`, `Δ<i>H</i>°<sub>f</sub>`, `Δ<i>G</i> = Δ<i>H</i> − <i>T</i>Δ<i>S</i>`

Example: the water warms by Δ<i>T</i> = 15.0 °C.

**Heat.** In text, say "heat" or "heated" (see the conditions rule above). Δ for heat appears only over an arrow in a figure.

**Transition state.** The double dagger ‡ (U+2021) marks the activated complex. It is a superscript straight after the quantity, as Chem 1A writes it; IUPAC's newer form puts it on the Δ (Δ<sup>‡</sup><i>G</i>). Most reads need only the activation energy, <i>E</i><sub>a</sub>.

**Markup:** `Δ<i>G</i><sup>‡</sup>`, `<i>E</i><sub>a</sub> = 50 kJ/mol`

## Quantity symbols

**Rule.** A symbol for a quantity is italic; its label subscript is upright; a unit is always upright. Wrap only the letter in `<i>`, never the number or unit. Square brackets mean "concentration of" at equilibrium.

**Markup:** `<i>m</i> = 4.01 g`, `<i>n</i> = 0.250 mol`, `<i>K</i><sub>a</sub> = 1.8 × 10<sup>−5</sup>`, `<i>pV</i> = <i>nRT</i>`, `[H<sup>+</sup>] = 1.0 × 10<sup>−7</sup> M`

Example: for acetic acid, <i>K</i><sub>a</sub> = 1.8 × 10<sup>−5</sup>.

Pressure is <i>p</i>, as IUPAC and the [design guide](design-guide.md) write it. Tro and most US classes write <i>P</i>; the gas-law page says so once.

## Units

**Rule.**

- A unit is upright, with a space between the number and the unit: 25.0 mL, 18.02 g/mol, 25 °C. The only exceptions are the angle degree (109.5°) and percent in running text (36.8%), as the design guide says.
- A compound unit is written inline with a slash, never stacked as a fraction. Use at most one slash. For more than one unit under it, put them in brackets joined by a middle dot: J/(g·°C).
- Reads and problems use the slash form, because that is how unit cancelling is taught in Chapter 0. Data tables and graph axes may use the power form (mol L<sup>−1</sup>), as the design guide does. Never mix the two forms for the same unit on one page.
- **mol/L and M.** M ("molar") is short for mol/L. Problems use M, as Chem 1A does. The first page that uses it says "M means mol/L". When a worked step cancels units, write mol/L so the cancelling shows. M is a unit, so it is upright; the quantity is the word "molarity" or <i>c</i>.

**Markup:** `25.0 mL`, `18.02 g/mol`, `4.184 J/(g·°C)`, `0.100 M`, `0.100 mol/L`, `0.100 mol L<sup>−1</sup>`, `<i>R</i> = 0.08206 L·atm/(mol·K)`

Example: 0.250 L of 0.100 M NaCl holds 0.250 L × 0.100 mol/L = 0.0250 mol.

**Caught:** `25.0mL` (unit-glued), `18.02g/mol` (unit-glued)

## Numbers, significant figures and scientific notation

**Rule.**

- **Scientific notation** is a number from 1 to just under 10, then a space, ×, a space, and 10 with its power in `<sup>`. The times sign is × (U+00D7), never the letter x or a *. Never use "E" or "e" notation in text.
- **Minus signs** are − (U+2212) everywhere: in powers, in charges, in negative numbers (−273.15 °C).
- **Significant figures** follow the data. Keep zeros that count (0.500 mol is 3 figures). When zeros at the end of a whole number would be unclear, use scientific notation (1.50 × 10<sup>3</sup> g). Counts and defined conversions (12 eggs, 1000 mL = 1 L) are exact and do not limit the figures.
- **In worked examples**, write each step with the rounded value it shows, round only the final answer, and say how many figures it keeps in the "why" line.
- **Digit groups.** Numbers of five digits or more are grouped in threes with a plain space, on both sides of the point: 602 200 and 0.000 15. Four digits are not grouped (2500). No commas.

**Markup:** `6.022 × 10<sup>23</sup>`, `1.5 × 10<sup>−4</sup>`, `1.50 × 10<sup>3</sup> g`, `0.000 15`, `−273.15 °C`

Example: one mole is 6.022 × 10<sup>23</sup> particles.

**Caught:** `6.022 x 10<sup>23</sup>` (times-x), `1.5 × 10<sup>-4</sup>` (charge-hyphen), `6.022E23` (e-notation), `-273.15 °C` (minus-hyphen)

The answer box still accepts what learners can type (`x 10^-4`, `e-4`). This rule is for what we show, not for what they type.

## Isotopes

**Rule.** The mass number is a superscript before the symbol. In sentences, the name form "carbon-14" is also fine and is easier to say. The atomic number is not written in text: `Rich` cannot stack it under the mass number, and the symbol already tells it. Nuclear equations that need both numbers stacked are drawn as figures.

**Markup:** `<sup>14</sup>C`, `<sup>235</sup>U`, `carbon-14 (<sup>14</sup>C)`, `<sup>2</sup>H`

Example: carbon-14, <sup>14</sup>C, has 6 protons and 8 neutrons.

## Electron configurations

**Rule.** Each subshell is the shell number and the letter (upright), with the electron count in `<sup>`. A count of 1 is written. Subshells are separated by a space and listed in filling order, as Chem 1A does. A noble-gas core is the symbol in square brackets, then a space.

**Markup:** `1s<sup>2</sup> 2s<sup>2</sup> 2p<sup>6</sup>`, `[Ne] 3s<sup>1</sup>`, `[Ar] 4s<sup>2</sup> 3d<sup>6</sup>`

Example: sodium is 1s<sup>2</sup> 2s<sup>2</sup> 2p<sup>6</sup> 3s<sup>1</sup>, or [Ne] 3s<sup>1</sup> for short.

Orbital box diagrams (arrows in boxes) are figures only.

## Lewis structures and bonds

**Rule.** Lewis structures are figures only: dots for lone pairs, lines for bonds, drawn by the engine (see [design-guide.md §4](design-guide.md#4-structures-2d)). Resonance forms are figures too, each in square brackets, joined by ↔. Text never draws dots with colons, bullets or full stops. In text, use the words: lone pair, bonding pair, single, double and triple bond, octet. A formal charge in text is a signed number, sign first, like an oxidation state: "a formal charge of +1".

If a bond must be shown inside a line of text, a single bond is an en dash – (U+2013) and a double bond is =. Say a triple bond in words: the ≡ sign is missing from STIX Two Text.

**Markup:** `H–Cl`, `O=C=O`, `N<sub>2</sub> has a triple bond.`, `Water has two lone pairs on O.`, `a formal charge of +1`

Example: CO<sub>2</sub> is O=C=O: two double bonds and two lone pairs on each O.

Condensed formulas need no bond marks: `CH<sub>3</sub>CH<sub>2</sub>OH`.

## Temperature

**Rule.** Celsius has a degree sign and a space before it: 25 °C. Kelvin has no degree sign: 298 K, and the unit is "kelvin", not "degrees kelvin". A change in temperature has the same size in K and °C, so Δ<i>T</i> = 15.0 °C = 15.0 K.

**Markup:** `25 °C`, `298 K`, `<i>T</i> = 273.15 K`, `0 K`

Example: room temperature, 25 °C, is 298 K.

**Caught:** `298 °K` (kelvin-degree), `25°C` (unit-glued)

## What `validateRich` catches

`validateRich(src)` returns a list of issues; an empty list means the string is fine. Each issue starts with its name.

| Issue | What it means |
|---|---|
| `tag-unknown` | A tag that is not one of the six, or a tag with attributes or capitals |
| `tag-broken` | A `<` that starts a tag but never closes it with `>` |
| `tag-unclosed` | A tag that is opened and never closed |
| `tag-stray-close` | A closing tag with nothing open |
| `tag-crossed` | Tags closed in the wrong order |
| `tag-empty` | A tag with nothing inside |
| `unicode-script` | A Unicode subscript or superscript character |
| `times-x` | An x or * used as a times sign between numbers |
| `charge-hyphen` | A hyphen or en dash used as the minus in a charge or a power |
| `minus-hyphen` | A hyphen used as the minus of a negative number |
| `ascii-arrow` | `->`, `=>`, `<->` or `<=>` instead of a real arrow |
| `state-styled` | A state symbol put in a subscript, a superscript or italics |
| `unit-glued` | A number with no space before its unit |
| `kelvin-degree` | °K |
| `e-notation` | 6.022E23 in place of × 10<sup>23</sup> |
| `wrong-dot` | A full stop, ⋅ or ∙ in place of the middle dot · |

The other rules on this page (italics, the order of number and sign, coefficients, which arrow) need a person's eye.

## Glyph gaps

These are the characters, used in this page's examples or in `src/content`, that a shipped font does not have. On screen, a missing glyph falls back to another font, so it may look a little different from the text around it. STIX Two Text and Zen Kaku Gothic New are checked against every character used. Shippori Mincho is used only for titles, so it is checked against the chapter and section titles and the eight key glyphs (→ ⇌ Δ ° ‡ · − ×).

| Font | Missing |
|---|---|
| STIX Two Text | `→ ⇌ √` |
| Zen Kaku Gothic New | `Δ ‡ ⇌` |
| Shippori Mincho | `Δ ⇌` |

So today ⇌ is in none of the three fonts, and STIX Two Text, the formula font, has no arrows at all. The square-root sign √ (U+221A, the quadratic formula in Section 0.6) is missing from STIX Two Text too, but Zen Kaku Gothic New has it. The resonance arrow ↔ is missing from all three as well; it is not in this table because it is used only in figures. Filling these gaps (for example with a small symbol font) is a design choice for the user. When a gap is filled, remove it from this table.
