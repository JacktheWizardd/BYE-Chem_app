import type { ChapterContent } from '../types';

// Chapter 4 · Counting by Weighing: the Mole (Tro 2.9, 3.8–3.10). Numbers checked by test/content.test.ts.
export const ch04: ChapterContent = {
  num: 4,
  promise: 'Count atoms you can’t see, by weighing them.',
  letsYouDo: {
    task: 'Weigh 36 g of water and say how many molecules are in it, without counting a single one.',
    particles: {
      describe: 'One water molecule labelled 18.02 grams equals one mole.',
      groups: [{ items: [{ formula: 'H2O' }], label: '<g>18.02 g</g> = <m>1 mol H<sub>2</sub>O</m>' }],
    },
    caption: 'The trick: 18.02 g of water is always the same number of molecules, 6.022 × 10<sup>23</sup>. So 36.04 g is twice as many.',
  },
  story: [
    { p: 'Atoms are far too small to count, so chemists count them by weighing, the way a bank weighs a bag of coins (4.1). The counting unit is the mole: 6.022 × 10<sup>23</sup> of anything.' },
    { p: 'The same counting tells you how much of a compound is each element, by mass (4.2). Run it backwards and the masses from an experiment give you the compound’s formula (4.3).' },
    { p: 'By the end, the 36 g of water from the top of this page is no mystery: it is 2.000 mol, 1.204 × 10<sup>24</sup> molecules.' },
  ],
  groups: [
    { name: 'Counting by weighing', ids: ['4.1'] },
    { name: 'Reading a compound', ids: ['4.2', '4.3'] },
  ],
  glance: [
    { eq: '<m>moles</m> = <g>grams</g> ÷ molar mass', note: 'Molar mass is grams per mole: add up the atomic masses in the formula.', from: '4.1' },
    { eq: 'particles = <m>moles</m> × 6.022 × 10<sup>23</sup>', note: 'Avogadro’s number: how many are in one mole.', from: '4.1' },
    { eq: '% by mass = part ÷ whole × 100', note: 'The element’s grams in one mole, over the compound’s molar mass.', from: '4.2' },
    { eq: 'grams → <m>moles</m> → ÷ smallest', note: 'For a formula from masses: assume 100 g, change each element to moles, divide by the smallest.', from: '4.3' },
  ],
  uses: [
    { where: 'A spoonful of sugar', what: '4.0 g of table sugar, C<sub>12</sub>H<sub>22</sub>O<sub>11</sub>, is about 7.0 × 10<sup>21</sup> molecules.', eq: '4.0 g ÷ 342.30 g/mol = 0.012 mol' },
    { where: 'Iron supplements', what: 'Iron(II) sulfate, FeSO<sub>4</sub>, is 36.8% iron by mass.', eq: '55.845 ÷ 151.90 × 100 = 36.8%' },
    { where: 'A vitamin C tablet', what: '500 mg of vitamin C, C<sub>6</sub>H<sub>8</sub>O<sub>6</sub>, is 2.84 millimoles.', eq: '0.500 g ÷ 176.12 g/mol = 0.00284 mol' },
  ],
  lab: { challenge: 'Try this: find the mass of water that gives exactly 1 mole.', title: 'Lab balance', body: 'Weigh anything; the molecule counter climbs with it. Coming to the Lab.' },
};
