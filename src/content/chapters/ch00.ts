import type { ChapterContent } from '../types';

// Chapter 0 · Maths for Chemistry. Focus: fast, calculator-free arithmetic (docs/chapter-map.md). Numbers checked by test/content.test.ts.
const NB = ' '; // keeps a number and its unit together

export const ch00: ChapterContent = {
  num: 0,
  promise: 'The few maths moves chemistry uses, refreshed. No chemistry needed.',
  story: [
    { p: 'Chemistry counts things that are huge, like the molecules in a drop of water, and tiny, like the mass of one atom. Powers of ten keep those numbers short and let you multiply them without counting a zero (0.1).' },
    { p: 'Recipes in chemistry are ratios, rates and percent (0.2). Its formulas link three or four quantities, and you rearrange them to get the one you want (0.3). Units travel with every number, and they multiply and cancel just as the numbers do (0.4). These four are the ones to make quick, with or without a calculator.' },
    { p: 'The last three wait until a later chapter needs them. Logarithms turn tiny concentrations into pH (0.5). Quadratics solve the equilibrium problems that have an unknown squared (0.6). And a straight-line graph turns a table of data into a slope and an intercept, like the density of a liquid (0.7).' },
  ],
  groups: [
    { name: 'Before Chapter 1', ids: ['0.1', '0.2', '0.3', '0.4'] },
    { name: 'When a later chapter needs it', ids: ['0.5', '0.6', '0.7'] },
  ],
  glance: [
    { eq: '<i>a</i> × 10<sup>n</sup>', note: 'A front number from 1 to 10 times a power of ten. Multiply: add the exponents.', from: '0.1' },
    { eq: 'percent = part ÷ whole × 100', note: 'A ratio out of 100. Scale a ratio by multiplying both numbers by the same <i>k</i>.', from: '0.2' },
    { eq: 'do the same to both sides', note: 'Undo each operation with its opposite to get one letter alone: × with ÷, + with −.', from: '0.3' },
    { eq: 'mL × g/mL → g', note: 'Units multiply, divide and cancel like numbers. What is left is the answer’s unit.', from: '0.4' },
    { eq: 'pH = −log[H<sup>+</sup>]', note: 'A log asks “ten to what power?” Undo it with [H<sup>+</sup>] = 10<sup>−pH</sup>.', from: '0.5' },
    { eq: '<i>x</i> = (−<i>b</i> ± √(<i>b</i><sup>2</sup> − 4<i>ac</i>)) ÷ (2<i>a</i>)', note: 'Solves <i>a</i><i>x</i><sup>2</sup> + <i>b</i><i>x</i> + <i>c</i> = 0. Two answers: keep the one that can happen.', from: '0.6' },
    { eq: '<i>y</i> = <i>m</i><i>x</i> + <i>b</i>', note: '<i>m</i> is the slope, rise ÷ run. <i>b</i> is the intercept, <i>y</i> when <i>x</i> is 0.', from: '0.7' },
  ],
  uses: [
    { where: 'Weighing a mole', what: 'One water molecule has a mass of 3.0 × 10<sup>−23</sup> g, so 6.022 × 10<sup>23</sup> of them have a mass of about 18 g.', eq: `6.022 × 10<sup>23</sup> × 3.0 × 10<sup>−23</sup>${NB}g = 18${NB}g` },
    { where: 'Diluting a cleaner', what: 'A cleaner is mixed 1 part concentrate to 4 parts water. In 250 mL of mix, one part is 50 mL.', eq: `250${NB}mL ÷ (1 + 4) = 50${NB}mL` },
    { where: 'A density, with units', what: 'Ethanol has a density of 0.788 g/mL. The mL cancel, so 25.0 mL has a mass of 19.7 g.', eq: `0.788${NB}g/mL × 25.0${NB}mL = 19.7${NB}g` },
    { where: 'Comparing acids', what: 'Each pH step is a factor of ten. A drink at pH 3 has a hundred times the H<sup>+</sup> of one at pH 5.', eq: '10<sup>−3</sup> ÷ 10<sup>−5</sup> = 10<sup>2</sup>' },
  ],
};
