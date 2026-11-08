import type { ParticleScene, SectionContent } from '../../types';

// Section 0.4 · Units Travel With Numbers (Tro 1.8). Maths section.
// Running example: a mug of water, 275 mL, density 1.00 g/mL, so 275 g. The same cancelling then runs on mol/L
// and g/mol. Every worked number is recomputed by test/content.test.ts.
const NB = ' '; // keeps a number and its unit together

const water = (n: number) => Array.from({ length: n }, () => ({ formula: 'H2O' }));
const volumeScene: ParticleScene = {
  describe: 'Three water molecules standing for a mug of water, labelled 275 millilitres: how much space it takes up.',
  groups: [{ items: water(3), label: `275${NB}mL` }],
};
const massScene: ParticleScene = {
  describe: 'The same three water molecules, now labelled 275 grams: how heavy the mug of water is.',
  groups: [{ items: water(3), label: `275${NB}g` }],
};

export const s0_4: SectionContent = {
  id: '0.4',
  intro: 'A number in chemistry is almost never alone. It has a unit, and the unit does the same things the number does: it multiplies, divides and cancels. This section shows how to let the units check your work.',
  reads: [
    {
      id: 'number-needs-unit',
      title: 'A number needs its unit',
      gist: 'The same number means different things with different units.',
      minutes: 2,
      blocks: [
        { p: 'Is 275 a lot? It depends what it counts. A mug holds 275 mL of water, and that same water has a mass of 275 g. The number is the same; the quantity is not.' },
        {
          frames: [
            { caption: 'The volume: how much space the water takes up.', eq: [`275${NB}mL`], particles: volumeScene },
            { caption: 'The mass: how heavy the same water is.', eq: [`275${NB}g`], particles: massScene },
          ],
          label: 'Picture it',
        },
        { key: 'A measurement is a number and a unit. Neither is complete without the other.' },
        { p: 'Through this section we follow that mug of water: 275 mL of it, and the 275 g it weighs. We will see that the units themselves can tell you which maths to do.' },
      ],
    },
    {
      id: 'units-multiply-divide',
      title: 'Units multiply and divide',
      gist: 'g/mL is a unit made by dividing, and units combine like numbers.',
      minutes: 3,
      blocks: [
        { p: `Water has a density of 1.00${NB}g/mL. The slash is read “per”: 1.00 grams for each millilitre. It is a unit made by dividing grams by millilitres.` },
        {
          frames: [
            { caption: 'Take 1 mL of water. Its mass is 1.00 g.', eq: [`1${NB}mL → 1.00${NB}g`] },
            { caption: 'Grams for each millilitre: divide grams by millilitres.', eq: [`1.00${NB}g ÷ 1${NB}mL`] },
            { caption: 'The unit of the answer is made the same way.', eq: ['g ÷ mL → g/mL'] },
          ],
          label: 'Picture it',
        },
        {
          table: {
            head: ['Unit', 'Made from', 'Read as'],
            rows: [
              ['g/mL', 'g ÷ mL', 'grams per millilitre'],
              ['mol/L', 'mol ÷ L', 'moles per litre'],
              ['m/s', 'm ÷ s', 'metres per second'],
              ['mL/s', 'mL ÷ s', 'millilitres per second'],
            ],
          },
        },
        { key: 'A slash in a unit means “per”. It comes from dividing.' },
        { p: 'Units behave like the letters of algebra: they are carried along through every multiplication and division, and they combine into new units.' },
      ],
    },
    {
      id: 'units-cancel',
      title: 'Units cancel',
      gist: 'The same unit on top and bottom cancels, just like the same number.',
      minutes: 3,
      blocks: [
        { p: 'What is the mass of the mug of water? Volume times density. The units show why this works.' },
        {
          frames: [
            { caption: 'The numbers: volume times density.', eq: ['275 × 1.00 = 275'] },
            { caption: 'Look only at the units: mL times g per mL.', eq: ['mL × g/mL'] },
            { caption: 'The mL on top cancels the mL underneath.', eq: ['g'] },
            { caption: 'Put the number and the unit together.', eq: [`275${NB}g`] },
          ],
          label: 'Picture it',
        },
        { work: [[`275${NB}mL × 1.00${NB}g/mL = 275${NB}g`, 'the mL cancel']] },
        { key: 'Units multiply and cancel like numbers. What is left is the unit of the answer.' },
        { p: 'This is a powerful check. If you multiplied the wrong things, the leftover unit won’t be the one you wanted.' },
      ],
    },
    {
      id: 'dividing-by-a-rate',
      title: 'Dividing by a rate',
      gist: 'Dividing by g/mol flips the unit, so g ÷ g/mol leaves mol.',
      minutes: 3,
      blocks: [
        { p: 'Sometimes you divide by a unit that has a slash. A chemist’s counting unit is the mole (mol), and water has a mass of 18.02 g for each mole. How many moles are in 36.04 g of water?' },
        {
          frames: [
            { caption: 'Units only: grams divided by grams per mole.', eq: ['g ÷ g/mol'] },
            { caption: 'Dividing by a fraction is the same as multiplying by its flip. g/mol flips to mol/g.', eq: ['g × mol/g'] },
            { caption: 'The g cancel. Moles are left.', eq: ['mol'] },
          ],
          label: 'Picture it',
        },
        { work: [[`36.04${NB}g ÷ 18.02${NB}g/mol = 2.000${NB}mol`, 'the g cancel']] },
        { key: 'Dividing by a rate flips it: ÷ g/mol means × mol/g.' },
        { p: 'The same happens with litres. How many litres hold 0.0750 mol of a solution that has 0.150 mol in each litre?' },
        { work: [[`0.0750${NB}mol ÷ 0.150${NB}mol/L = 0.500${NB}L`, 'the mol cancel']] },
      ],
    },
    {
      id: 'only-like-units',
      title: 'Adding needs matching units',
      gist: 'You can only add or subtract amounts that have the same unit.',
      minutes: 2,
      blocks: [
        { p: 'Multiplying mixes units, but adding does not. 275 g plus 30 g makes 305 g. But 275 g plus 30 mL means nothing, because grams and millilitres measure different things.' },
        {
          frames: [
            { caption: 'Same unit: add the numbers.', eq: [`275${NB}g + 30${NB}g`] },
            { caption: 'Different units: there is no answer.', eq: [`275${NB}g + 30${NB}mL`] },
            { caption: 'Same quantity but different sizes: change one first.', eq: [`1.5${NB}L → 1500${NB}mL`] },
          ],
          label: 'Picture it',
        },
        { work: [[`275${NB}g + 30${NB}g = 305${NB}g`, 'same unit: just add']] },
        { p: 'A 1.5 L bottle and a 250 mL cup are both volumes, but different sizes. Change the bottle to millilitres first.' },
        { work: [[`1500${NB}mL + 250${NB}mL = 1750${NB}mL`, '1.5 L is 1500 mL']] },
        { key: 'Add and subtract only like units. Multiply and divide any units, and keep track of them.' },
      ],
    },
    {
      id: 'using-it-well',
      title: 'Using it well',
      gist: 'How to let the units check your answer, and the moves in Example 1.',
      minutes: 2,
      blocks: [
        { p: 'Write the unit after every number, all the way down the page. At the end, look at the unit you are left with. If you wanted a mass and you are left with mL, something went wrong.' },
        {
          frames: [
            { caption: 'Want: a mass, in grams.', eq: ['want: g'] },
            { caption: 'Have: a volume in mL, and a density in g/mL.', eq: ['have: mL and g/mL'] },
            { caption: 'The units say to multiply: mL × g/mL leaves g.', eq: ['mL × g/mL → g'] },
          ],
          label: 'Picture it',
        },
        { p: 'The same check works for any formula. A concentration times a volume should give an amount: mol/L × L is mol.' },
        { work: [[`0.100${NB}mol/L × 0.250${NB}L = 0.0250${NB}mol`, 'the L cancel']] },
        { h: 'The moves in Example 1' },
        {
          work: [
            [`275${NB}mL and 1.00${NB}g/mL`, '1 · write each number with its unit'],
            ['mL × g/mL → g', '2 · cancel the units'],
            [`275${NB}mL × 1.00${NB}g/mL = 275${NB}g`, '3 · write the answer with its unit'],
          ],
        },
      ],
    },
  ],
  tool: 'Units multiply, divide and cancel',
  toolNote: 'Write the unit after every number. What is left at the end is the unit of the answer.',
  ideas: [
    { title: 'A number needs a unit', body: '275 mL and 275 g are not the same thing.' },
    { title: 'A slash means per', body: 'g/mL is grams divided by millilitres.' },
    { title: 'Same units cancel', body: 'mL × g/mL leaves g. Dividing by g/mol flips it to × mol/g.' },
    { title: 'Add only like units', body: 'Grams plus grams, yes. Grams plus millilitres, never.' },
  ],
  why: [
    { caption: 'A unit says what the number counts.', eq: [`275${NB}mL`, `275${NB}g`] },
    { caption: 'Multiplying numbers multiplies their units too.', eq: ['mL × g/mL'] },
    { caption: 'The same unit on top and bottom cancels, and the leftover unit is the answer’s.', eq: ['g'] },
  ],
  spot: {
    clues: [
      { text: 'A number with letters after it', example: `275${NB}mL`, note: 'always keep the unit with the number' },
      { text: 'A slash in a unit', example: `1.00${NB}g/mL`, note: 'per: made by dividing' },
      { text: 'The same unit on top and bottom', example: 'mL × g/mL', note: 'they cancel' },
      { text: 'Two amounts being added', example: `1.5${NB}L + 250${NB}mL`, note: 'change to the same unit first' },
    ],
    lookAlikes: [
      { looks: 'Turning 1.5 L into mL', use: 'Converting units step by step', why: 'a conversion is a fraction equal to 1 that cancels one unit and brings in another.', link: '1.8' },
      { looks: 'kilo, milli, micro', use: 'Units and prefixes', why: 'each prefix stands for a power of ten.', link: '1.5' },
    ],
  },
  mistakes: [
    { wrong: `275${NB}mL × 1.00${NB}g/mL = 275${NB}mL`, right: `275${NB}mL × 1.00${NB}g/mL = 275${NB}g`, why: 'The mL cancel. What is left is grams.' },
    { wrong: `275${NB}g + 30${NB}mL = 305`, right: `275${NB}g + 30${NB}g = 305${NB}g`, why: 'Only add amounts with the same unit, and keep the unit in the answer.' },
    { wrong: '<i>m</i> = 275', right: `<i>m</i> = 275${NB}g`, why: 'A number alone doesn’t say what was measured. The unit is part of the answer.' },
    { wrong: 'g ÷ g/mol = g/mol', right: 'g ÷ g/mol = mol', why: 'Dividing by g/mol means multiplying by mol/g. The g cancel.' },
    { wrong: `1.5${NB}L + 250${NB}mL = 251.5`, right: `1500${NB}mL + 250${NB}mL = 1750${NB}mL`, why: 'Change to the same unit first: 1.5 L is 1500 mL.' },
  ],
  examples: [
    {
      id: '0.4-1',
      question: 'A mug holds 275 mL of water. The density of water is 1.00 g/mL. What is the mass of the water?',
      level: 'easy',
      steps: [
        {
          move: 'Write the units',
          say: 'Write each number with its unit, and the answer’s unit: grams.',
          lines: [{ left: '<i>V</i>', right: `275${NB}mL` }, { left: '<i>d</i>', right: `1.00${NB}g/mL` }],
        },
        {
          move: 'Cancel the units',
          say: 'Look at the units alone. mL times g per mL: the mL cancel and grams are left, which is what we want.',
          lines: [{ left: 'mL × g/mL', right: 'g', op: 'cancel' }],
        },
        {
          move: 'Multiply',
          say: 'Now the numbers. Three significant figures, as in the data.',
          lines: [{ left: '<i>m</i>', right: `275${NB}mL × 1.00${NB}g/mL`, op: '×' }, { right: `275${NB}g` }],
        },
      ],
      answer: 'The mug of water has a mass of 275 g.',
    },
    {
      id: '0.4-2',
      question: 'You take 0.250 L of a salt solution that has 0.100 mol in each litre. How many moles of salt are in it?',
      level: 'typical',
      steps: [
        {
          move: 'Write the units',
          say: 'The concentration is 0.100 mol/L. The volume is 0.250 L. We want moles.',
          lines: [{ left: '<i>c</i>', right: `0.100${NB}mol/L` }, { left: '<i>V</i>', right: `0.250${NB}L` }],
        },
        {
          move: 'Cancel the units',
          say: 'mol/L times L: the litres cancel and moles are left. That is the unit we want, so multiply.',
          lines: [{ left: 'mol/L × L', right: 'mol', op: 'cancel' }],
        },
        {
          move: 'Multiply',
          say: 'Put the numbers in. Three significant figures, as in the data.',
          lines: [{ left: '<i>n</i>', right: `0.100${NB}mol/L × 0.250${NB}L`, op: '×' }, { right: `0.0250${NB}mol` }],
        },
      ],
      answer: 'The 0.250 L holds 0.0250 mol of salt.',
    },
    {
      id: '0.4-3',
      question: 'A solution has 0.150 mol in each litre. What volume holds 0.0750 mol?',
      level: 'harder',
      steps: [
        {
          move: 'Units first',
          say: 'We have moles and mol/L, and we want litres. Dividing by mol/L flips it to × L/mol, and the moles cancel.',
          lines: [{ left: 'mol ÷ mol/L', right: 'mol × L/mol', op: 'flip' }, { left: 'mol × L/mol', right: 'L', op: 'cancel' }],
          qs: [['Why divide and not multiply?', 'Try multiplying: mol × mol/L leaves mol<sup>2</sup>/L, which is not a volume. Dividing leaves litres, so divide.']],
        },
        {
          move: 'Divide',
          say: 'Divide the amount by the concentration. Three significant figures, as in the data.',
          lines: [{ left: '<i>V</i>', right: `0.0750${NB}mol ÷ 0.150${NB}mol/L`, op: '÷' }, { right: `0.500${NB}L` }],
        },
        {
          move: 'Check it',
          say: 'Does 0.500 L of that solution give back the moles we started with?',
          lines: [{ left: '<i>n</i>', right: `0.500${NB}L × 0.150${NB}mol/L`, op: '×' }, { right: `0.0750${NB}mol` }],
        },
      ],
      answer: '0.500 L of the solution holds 0.0750 mol.',
    },
  ],
  realUses: [
    { where: 'A mug of water', what: 'Water is 1.00 g in each mL, so 275 mL has a mass of 275 g.', eq: `275${NB}mL × 1.00${NB}g/mL = 275${NB}g` },
    { where: 'Counting by weighing', what: 'Water has a mass of 18.02 g for each mole, so 36.04 g is 2.000 mol.', eq: `36.04${NB}g ÷ 18.02${NB}g/mol = 2.000${NB}mol` },
    { where: 'A salt solution', what: 'A solution with 0.100 mol in each litre holds 0.0250 mol in a 0.250 L sample.', eq: `0.100${NB}mol/L × 0.250${NB}L = 0.0250${NB}mol` },
    { where: 'A reaction rate', what: 'If 0.060 mol of a product forms in 30 s, the rate is 0.0020 mol each second.', eq: `0.060${NB}mol ÷ 30${NB}s = 0.0020${NB}mol/s` },
    { where: 'Mixing volumes', what: 'A 1.5 L bottle poured with a 250 mL cup. Change to one unit, then add.', eq: `1500${NB}mL + 250${NB}mL = 1750${NB}mL` },
  ],
  next: [
    { id: '1.8', note: 'Conversion factors are fractions made of units that cancel.' },
    { id: '1.5', note: 'Prefixes such as milli and kilo are part of the unit.' },
    { id: '1.6', note: 'Density is a unit made by dividing: g/mL.' },
  ],
};
