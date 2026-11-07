import type { ChapterContent, FadeProblem } from '../types';

// Chapter 4 · Counting by Weighing: the Mole (Tro 2.9, 3.8–3.10).
// Every molar mass here is recomputed from the engine's atomic weights by test/content.test.ts.

/** A two-step "grams ↔ moles" problem: molar mass, then the conversion. */
function gramsToMoles(id: string, grams: string, formula: string, fRich: string, sumRich: string, M: number, answer: string, sig: number): FadeProblem {
  return {
    id,
    prompt: `How many moles of ${fRich} are in ${grams} g?`,
    steps: [
      { work: `Molar mass of ${fRich} = ${sumRich} = ${M.toFixed(2)} g/mol`, why: 'Add up every atom in the formula.', ask: `Molar mass of ${fRich} = ? g/mol`, check: { type: 'molarMass', formula } },
      { work: `<m>moles</m> = <g>${grams} g</g> ÷ ${M.toFixed(2)} g/mol = ${answer} mol`, why: `Grams ÷ grams per mole leaves moles. Keep ${sig} significant figures.`, ask: `<m>moles</m> = <g>${grams} g</g> ÷ ${M.toFixed(2)} g/mol = ? mol`, check: { type: 'moles', grams: Number(grams), molarMass: Number(M.toFixed(2)), sig } },
    ],
  };
}

export const ch04: ChapterContent = {
  num: 4,
  promise: 'Count atoms you can’t see, by weighing them.',
  letsYouDo: {
    task: 'Weigh 36 g of water and say how many molecules are in it, without counting a single one.',
    picture: 'water-mole',
    caption: 'The trick: 18.02 g of water is always the same number of molecules. So 36.04 g is twice as many.',
  },
  recall: {
    id: '4-recall', from: '3.2', prompt: 'How many O atoms are in Ca(NO<sub>3</sub>)<sub>2</sub>?',
    spec: { type: 'count', answer: 6, slips: [[3, 'Count both NO<sub>3</sub> groups: the 2 outside the bracket doubles everything inside.']], hint: 'Count the O inside the bracket, then multiply by the number outside.' },
    answer: '6. Each NO<sub>3</sub> has 3 O, and the 2 outside the bracket doubles it.',
  },
  lab: { challenge: 'Try this: find the mass of water that gives exactly 1 mole.', title: 'Lab balance', body: 'Weigh anything; the molecule counter climbs with it. Coming soon to the Lab.' },
  glance: [
    { eq: '<m>moles</m> = <g>grams</g> ÷ molar mass', note: 'Molar mass is grams per mole: add up the atomic masses in the formula.', from: '4.1' },
    { eq: 'particles = <m>moles</m> × 6.022 × 10<sup>23</sup>', note: 'Avogadro’s number: how many are in one mole.', from: '4.1' },
    { eq: '% by mass = part ÷ whole × 100', note: 'The element’s grams in one mole, over the compound’s molar mass.', from: '4.2' },
    { eq: 'grams → <m>moles</m> → ÷ smallest', note: 'For a formula from masses: assume 100 g, change each element to moles, divide by the smallest.', from: '4.3' },
  ],
  uses: [
    { where: 'A spoonful of sugar', what: '4 g of table sugar (C<sub>12</sub>H<sub>22</sub>O<sub>11</sub>) is about 7 × 10<sup>21</sup> molecules.', eq: '4.0 g ÷ 342.30 g/mol = 0.0117 mol' },
    { where: 'A vitamin C tablet', what: '500 mg of vitamin C (C<sub>6</sub>H<sub>8</sub>O<sub>6</sub>) is 2.84 millimoles.', eq: '0.500 g ÷ 176.12 g/mol = 0.00284 mol' },
    { where: 'Iron supplements', what: 'Iron(II) sulfate, FeSO<sub>4</sub>, is 36.8% iron by mass.', eq: '55.85 ÷ 151.90 × 100 = 36.8%' },
  ],
  writeOneLine: true,
  sections: {
    '4.1': {
      id: '4.1',
      intro: 'You can’t count atoms one by one, so you count them by weighing. One <b>mole</b> of anything is 6.022 × 10<sup>23</sup> of it, the way one dozen is 12.',
      tool: '<m>moles</m> = <g>grams</g> ÷ molar mass',
      ideas: [
        { title: 'Formula mass', body: 'Add the masses of every atom in the formula. H<sub>2</sub>O: 2 × 1.008 + 15.999 = 18.02.' },
        { title: 'The mole is a count', body: '6.022 × 10<sup>23</sup> particles, chosen so the numbers line up with grams.' },
        { title: 'Molar mass', body: 'The mass of one mole: the same number as the formula mass, in grams. Water: 18.02 g/mol.' },
        { title: 'Count by weighing', body: 'Divide grams by molar mass and you have moles; multiply by 6.022 × 10<sup>23</sup> for particles.' },
      ],
      views: {
        title: 'One mole of water, three ways',
        caption: {
          amt: 'All three say <b>how much</b>: 18 g of water is 1 mol, which is 6.022 × 10<sup>23</sup> molecules.',
          what: 'All three say <b>what</b>: water, its molecules, and the formula H<sub>2</sub>O (2 H and 1 O).',
        },
        cols: [
          { label: 'See it', parts: [{ text: '18 g', link: 'amt' }, { text: 'of water', link: 'what' }] },
          { label: 'Particles', parts: [{ text: '6.022 × 10<sup>23</sup>', link: 'amt' }, { text: 'water molecules', link: 'what' }] },
          { label: 'Symbols', parts: [{ text: '1 mol', link: 'amt' }, { text: 'H<sub>2</sub>O', link: 'what' }, { text: '= 18.02 g' }] },
        ],
      },
      lab: { challenge: 'Try this: find the mass that gives exactly 1 mole.', title: 'How many molecules is that?', body: 'Weigh out water on the lab balance and watch the molecule counter climb. Coming soon to the Lab.' },
      check: [
        { id: '4.1-a', from: '4.1', prompt: 'How many moles are in 36.04 g of water? (Molar mass 18.02 g/mol.)', placeholder: 'number and unit', spec: { type: 'moles', grams: 36.04, molarMass: 18.02, sig: 4 }, answer: '2.000 mol. 36.04 g ÷ 18.02 g/mol.' },
        { id: '4.1-b', from: '4.1', prompt: 'What is the molar mass of CO<sub>2</sub>? (C 12.011, O 15.999)', placeholder: 'number and unit', spec: { type: 'molarMass', formula: 'CO2' }, answer: '44.01 g/mol. 12.011 + 2 × 15.999.' },
      ],
      simple: [
        gramsToMoles('4.1-s1', '9.01', 'H2O', 'H<sub>2</sub>O', '2 × 1.008 + 15.999', 18.02, '0.500', 3),
        gramsToMoles('4.1-s2', '22.0', 'CO2', 'CO<sub>2</sub>', '12.011 + 2 × 15.999', 44.01, '0.500', 3),
        gramsToMoles('4.1-s3', '4.00', 'NaCl', 'NaCl', '22.99 + 35.45', 58.44, '0.0684', 3),
        {
          id: '4.1-s4',
          prompt: 'What is the mass of 0.250 mol of methane, CH<sub>4</sub>?',
          steps: [
            { work: 'Molar mass of CH<sub>4</sub> = 12.011 + 4 × 1.008 = 16.04 g/mol', why: 'Add up every atom in the formula.', ask: 'Molar mass of CH<sub>4</sub> = ? g/mol', check: { type: 'molarMass', formula: 'CH4' } },
            { work: '<g>grams</g> = <m>0.250 mol</m> × 16.04 g/mol = 4.01 g', why: 'This time go the other way: moles × grams per mole leaves grams.', ask: '<g>grams</g> = <m>0.250 mol</m> × 16.04 g/mol = ? g', check: { type: 'grams', moles: 0.25, molarMass: 16.04, sig: 3 } },
          ],
        },
      ],
      showsUp: [
        { id: '5.2', note: 'Every recipe calculation goes through moles.' },
        { id: '6.1', note: 'Moles per litre starts here.' },
        { id: '7.3', note: 'The n in PV = nRT is moles.' },
      ],
    },
  },
  review: [
    { id: '4.1-r', from: '4.1', prompt: 'How many moles is 88.02 g of CO<sub>2</sub>? (Molar mass 44.01 g/mol.)', placeholder: 'number and unit', spec: { type: 'moles', grams: 88.02, molarMass: 44.01, sig: 4 }, answer: '2.000 mol. 88.02 g ÷ 44.01 g/mol.' },
  ],
};
