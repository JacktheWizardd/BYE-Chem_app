import type { ParticleScene, SectionContent } from '../../types';

// Section 0.2 · Ratios, Rates and Percent (Tro Appendix I). Maths section, calculator-free arithmetic first.
// Running example: the water recipe, 2 hydrogen molecules for every 1 oxygen molecule. Every worked number
// is recomputed by test/content.test.ts.
const NB = ' '; // keeps a number and its unit together

const h2 = (n: number) => Array.from({ length: n }, () => ({ formula: 'H2' }));
const o2 = (n: number) => Array.from({ length: n }, () => ({ formula: 'O2' }));
const recipe: ParticleScene = {
  describe: 'Two hydrogen molecules plus one oxygen molecule: the recipe for water, 2 to 1.',
  groups: [{ items: h2(2), label: '2 H<sub>2</sub>' }, { items: o2(1), label: '1 O<sub>2</sub>' }],
  ops: ['+'],
};
const threeBatches: ParticleScene = {
  describe: 'Six hydrogen molecules plus three oxygen molecules: the same recipe made three times, still 2 to 1.',
  groups: [{ items: h2(6), label: '6 H<sub>2</sub>' }, { items: o2(3), label: '3 O<sub>2</sub>' }],
  ops: ['+'],
};

export const s0_2: SectionContent = {
  id: '0.2',
  intro: 'Chemistry runs on recipes: 2 parts of this for every 1 part of that. This section shows how to read a <b>ratio</b>, scale it up, and turn “per” and “out of a hundred” into arithmetic you can do in your head.',
  reads: [
    {
      id: 'two-for-every-one',
      title: 'Two for every one',
      gist: 'A ratio says how much of one thing goes with another.',
      minutes: 2,
      blocks: [
        { p: 'Water is made from hydrogen and oxygen in a fixed recipe: 2 molecules of hydrogen for every 1 molecule of oxygen. That “for every” is a <b>ratio</b>.' },
        { particles: recipe, level: 'particles' },
        { p: 'A ratio compares two amounts of the same kind. We write it with a colon, 2 : 1, and say “two to one”. The order matters: hydrogen first and oxygen second, so 2 : 1 is not the same recipe as 1 : 2.' },
        { key: 'A ratio of 2 : 1 means 2 of the first for every 1 of the second.' },
        { p: 'Through this section we follow that recipe: make more of it, put units on it, and ask what part of the whole each piece is.' },
      ],
    },
    {
      id: 'bigger-batch',
      title: 'Same recipe, bigger batch',
      gist: 'Multiply both sides of a ratio by the same number and the recipe stays the same.',
      minutes: 3,
      blocks: [
        { p: 'Suppose you have 3 oxygen molecules. How many hydrogen molecules go with them? Think of it as making the recipe 3 times over.' },
        {
          frames: [
            { caption: 'One batch of the recipe: 2 hydrogen for 1 oxygen.', eq: ['2 : 1'], particles: recipe },
            { caption: 'Make 3 batches. Multiply both numbers by 3.', eq: ['(2 × 3) : (1 × 3)', '6 : 3'], particles: threeBatches },
          ],
          label: 'Picture it',
        },
        { work: [['2 : 1 → 6 : 3', 'both multiplied by 3']] },
        { key: 'Multiply or divide both sides of a ratio by the same number and the recipe does not change.' },
        { p: 'Work out the multiplier first: you have 3 oxygen, the recipe has 1, so it is 3 batches. Then every number in the recipe is multiplied by 3.' },
        { p: 'Going the other way works too. 6 hydrogen : 3 oxygen, with both divided by 3, is 2 : 1 again. Dividing both numbers by the biggest number that goes into both is called <b>simplifying</b> a ratio.' },
      ],
    },
    {
      id: 'per-means-divide',
      title: 'Per means divide',
      gist: 'A rate is a ratio with units: how much of one thing for each one of another.',
      minutes: 3,
      blocks: [
        { p: 'Sometimes the two amounts are different kinds of thing. Then the ratio is a <b>rate</b>, and we read “per” as “for each one”.' },
        { p: `A flask collects 12${NB}mL of hydrogen gas in 30${NB}s. How fast is the gas coming off? A rate is an amount per time, so divide the amount by the time.` },
        {
          frames: [
            { caption: 'The rate has two different units: millilitres and seconds.', eq: [`12${NB}mL in 30${NB}s`] },
            { caption: 'Divide the amount by the time to get the amount for each second.', eq: [`12${NB}mL ÷ 30${NB}s`] },
            { caption: 'Read “per” as “for each one”: 0.40 mL for each 1 s.', eq: [`0.40${NB}mL/s`] },
          ],
          label: 'Picture it',
        },
        { work: [[`12${NB}mL ÷ 30${NB}s = 0.40${NB}mL/s`, 'amount ÷ time']] },
        { key: 'A rate is one amount ÷ another. The slash in mL/s is read “per”.' },
        { p: 'A rate scales like any ratio. At 0.40 mL/s, one minute (60 s) gives:' },
        { work: [[`60${NB}s × 0.40${NB}mL/s = 24${NB}mL`, 'the seconds cancel']] },
      ],
    },
    {
      id: 'percent',
      title: 'Percent: out of a hundred',
      gist: 'Percent is a ratio with 100 as the second number.',
      minutes: 3,
      blocks: [
        { p: 'Percent means “per hundred”. 25% is 25 out of every 100. It is a ratio whose second number is always 100, which makes very different amounts easy to compare.' },
        { p: 'Look at one water molecule. It has 3 atoms, and 1 of them is oxygen. What percent of the atoms is oxygen?' },
        { particles: { describe: 'One water molecule, ringed: three atoms, two hydrogen and one oxygen.', groups: [{ items: [{ formula: 'H2O', ring: true }], label: '3 atoms: 2 H and 1 O' }] }, level: 'particles' },
        {
          frames: [
            { caption: 'Part over whole: 1 oxygen atom out of 3 atoms.', eq: ['1 ÷ 3 = 0.333'] },
            { caption: 'Multiply by 100 to ask “out of a hundred?”', eq: ['0.333 × 100 = 33.3'] },
            { caption: 'Oxygen is 33.3% of the atoms.', eq: ['1 ÷ 3 × 100 = 33.3%'] },
          ],
          label: 'Picture it',
        },
        { key: 'Percent = part ÷ whole × 100.' },
        { p: 'This is a percent by <i>atoms</i>. By <i>mass</i> it is different, because an oxygen atom is far heavier than a hydrogen atom: oxygen is about 88.8% of the mass of water. You will work that out in Chapter 4.' },
      ],
    },
    {
      id: 'percent-in-your-head',
      title: 'Percent in your head',
      gist: 'The few fractions worth knowing by heart, and how to find a percent of a number.',
      minutes: 3,
      blocks: [
        { p: 'You don’t need a calculator for the common ones. Learn this small table once.' },
        {
          table: {
            head: ['Fraction', 'Decimal', 'Percent'],
            rows: [
              ['1/2', '0.5', '50%'],
              ['1/4', '0.25', '25%'],
              ['3/4', '0.75', '75%'],
              ['1/5', '0.2', '20%'],
              ['1/10', '0.1', '10%'],
              ['1/100', '0.01', '1%'],
            ],
          },
        },
        { p: `To find a percent <i>of</i> a number, turn the percent into a decimal and multiply. Air is about 21% oxygen. How much oxygen is in 1000${NB}mL of air?` },
        {
          frames: [
            { caption: 'Percent to decimal: divide by 100, which moves the point two places left.', eq: ['21 ÷ 100 = 0.21'] },
            { caption: 'Multiply the whole by that decimal.', eq: [`1000${NB}mL × 0.21 = 210${NB}mL`] },
          ],
          label: 'Picture it',
        },
        { key: 'Percent of a number: divide the percent by 100, then multiply.' },
        { p: 'A quick check: 21% is a bit more than 20%, and 20% is one fifth. One fifth of 1000 is:' },
        { work: [['1000 ÷ 5 = 200', 'about 200 mL, so 210 mL is sensible']] },
      ],
    },
    {
      id: 'using-it-well',
      title: 'Using it well',
      gist: 'How to check an answer by estimating, run a percent backwards, and the moves in Example 1.',
      minutes: 3,
      blocks: [
        { p: 'Before you trust a number, ask whether it is sensible. A percent of something can never be more than the whole thing. A ratio of 2 : 1 means the first number should be about twice the second.' },
        { p: 'A percent can also run backwards. If you know the part and the percent, you divide instead of multiply. Oxygen is 88.8% of the mass of water, and a sample holds 8.88 g of oxygen. How heavy is the sample?' },
        {
          frames: [
            { caption: 'The part is a fraction of the whole.', eq: ['part = fraction × whole'] },
            { caption: 'To get the whole, undo the multiplying.', eq: ['whole = part ÷ fraction'] },
            { caption: 'Put in 8.88 g and 88.8% = 0.888.', eq: [`8.88${NB}g ÷ 0.888 = 10.0${NB}g`] },
          ],
          label: 'Picture it',
        },
        { h: 'The moves in Example 1' },
        {
          work: [
            ['2 : 1 → ? : 5', '1 · read the ratio'],
            ['multiplier: 5 ÷ 1 = 5', '2 · find the multiplier'],
            ['2 × 5 = 10', '3 · scale the other side'],
          ],
        },
      ],
    },
  ],
  tool: '<i>a</i> : <i>b</i> = (<i>k</i> × <i>a</i>) : (<i>k</i> × <i>b</i>)',
  toolNote: 'Multiply both numbers by the same <i>k</i> and the ratio is unchanged. Percent is part ÷ whole × 100.',
  ideas: [
    { title: 'A ratio compares amounts', body: 'Water needs 2 hydrogen for every 1 oxygen, written 2 : 1.' },
    { title: 'Scale both sides together', body: 'Multiply or divide both numbers by the same <i>k</i> and the recipe is the same.' },
    { title: 'A rate has a “per”', body: `12${NB}mL in 30${NB}s is 0.40${NB}mL/s: divide the amount by the time.` },
    { title: 'Percent is out of a hundred', body: 'Percent = part ÷ whole × 100. To find a percent of a number, divide by 100 and multiply.' },
  ],
  why: [
    { caption: 'A ratio is about how amounts compare, not how big they are. These are all the same recipe.', eq: ['2 : 1', '4 : 2', '6 : 3'] },
    { caption: 'Multiplying both numbers by the same factor keeps the comparison.', eq: ['2 : 1 → (2 × 3) : (1 × 3)'] },
    { caption: 'Percent is the same idea with 100 as the whole.', eq: ['25 : 100', '1 : 4', '25%'] },
  ],
  spot: {
    clues: [
      { text: 'The words “for every” or “to”', example: '2 hydrogen for every 1 oxygen', note: 'a ratio: scale both numbers by the same factor' },
      { text: 'A slash or “per” between two units', example: `0.40${NB}mL/s`, note: 'a rate: one amount ÷ another' },
      { text: 'A % sign', example: '21% oxygen', note: 'out of 100: divide by 100, then multiply' },
      { text: 'A part and a whole', example: '1 oxygen atom in 3', note: 'percent = part ÷ whole × 100' },
    ],
    lookAlikes: [
      { looks: 'A ratio with a missing letter, like 2 : 1 = <i>x</i> : 5', use: 'Rearranging a formula', why: 'when the unknown is a letter, you may need to get it alone first.', link: '0.3' },
      { looks: 'g/mL, mol/L, m/s', use: 'Units travel with numbers', why: 'the units of a rate multiply, divide and cancel too.', link: '0.4' },
    ],
  },
  mistakes: [
    { wrong: '2 : 1 = 6 : 4', right: '2 : 1 = 6 : 3', why: 'Both numbers are multiplied by the same factor, here 3. Adding 4 to the second one changes the recipe.' },
    { wrong: `25% of 80${NB}g = 25 × 80${NB}g`, right: `25% of 80${NB}g = 0.25 × 80${NB}g = 20${NB}g`, why: 'Turn the percent into a decimal first: divide by 100.' },
    { wrong: `12${NB}mL ÷ 30${NB}s = 2.5${NB}mL/s`, right: `12${NB}mL ÷ 30${NB}s = 0.40${NB}mL/s`, why: 'The amount goes on top and the time underneath: 12 ÷ 30, not 30 ÷ 12.' },
    { wrong: '1 ÷ 3 = 0.33, so 0.33% is oxygen', right: '1 ÷ 3 × 100 = 33%', why: 'A decimal is not a percent yet. Multiply by 100.' },
    { wrong: 'Water is H : O = 1 : 2', right: 'Water is H : O = 2 : 1', why: 'Say the first thing first. Swapping the order flips the ratio.' },
  ],
  examples: [
    {
      id: '0.2-1',
      question: 'Water forms from 2 hydrogen molecules for every 1 oxygen molecule. How many hydrogen molecules react with 5 oxygen molecules?',
      level: 'easy',
      steps: [
        {
          move: 'Read the ratio',
          say: 'The recipe has 2 hydrogen for every 1 oxygen.',
          lines: [{ left: 'H<sub>2</sub> : O<sub>2</sub>', right: '2 : 1' }],
        },
        {
          move: 'Find the multiplier',
          say: 'You have 5 oxygen where the recipe has 1, so you need 5 batches of the recipe.',
          lines: [{ left: '<i>k</i>', right: '5 ÷ 1', op: '÷' }, { right: '5' }],
          qs: [['What if the numbers don’t divide evenly?', 'Use a decimal. With 7 oxygen the multiplier is 7, but with a recipe of 3 oxygen it is 7 ÷ 3 = 2.33. Keep going the same way.']],
        },
        {
          move: 'Scale it',
          say: 'Multiply the hydrogen side of the recipe by the same multiplier.',
          lines: [{ left: 'H<sub>2</sub>', right: '2 × 5', op: '× <i>k</i>' }, { right: '10' }],
        },
      ],
      answer: '5 oxygen molecules react with 10 hydrogen molecules.',
    },
    {
      id: '0.2-2',
      question: 'A gas syringe collects 75 mL of hydrogen in 25 s. If the gas keeps coming off at the same rate, how much is collected in 2 minutes?',
      level: 'typical',
      steps: [
        {
          move: 'Find the rate',
          say: 'A rate is an amount per time, so divide the amount by the time.',
          lines: [{ left: 'rate', right: `75${NB}mL ÷ 25${NB}s`, op: '÷' }, { right: `3.0${NB}mL/s` }],
        },
        {
          move: 'Same units',
          say: 'The rate uses seconds, so change 2 minutes to seconds first: 60 s in each minute.',
          lines: [{ left: '<i>t</i>', right: '2 × 60', op: '× 60' }, { right: `120${NB}s` }],
        },
        {
          move: 'Multiply',
          say: 'Rate times time gives the amount. The seconds cancel. The rate has two significant figures, so the answer keeps two.',
          lines: [{ left: '<i>V</i>', right: `3.0${NB}mL/s × 120${NB}s`, op: '×' }, { right: `3.6 × 10<sup>2</sup>${NB}mL` }],
        },
      ],
      answer: 'In 2 minutes the syringe collects about 3.6 × 10<sup>2</sup> mL of hydrogen.',
    },
    {
      id: '0.2-3',
      question: 'Oxygen is 88.8% of the mass of water. A water sample contains 8.88 g of oxygen. What is the mass of the sample?',
      level: 'harder',
      steps: [
        {
          move: 'Percent to decimal',
          say: 'Divide the percent by 100, which moves the point two places left.',
          lines: [{ left: 'fraction', right: '88.8 ÷ 100', op: '÷ 100' }, { right: '0.888' }],
        },
        {
          move: 'Set it up',
          say: 'The oxygen is the part and the sample is the whole. The part is the fraction times the whole, so to get the whole, divide.',
          lines: [{ left: 'part', right: 'fraction × whole' }, { left: 'whole', right: 'part ÷ fraction', op: '÷ fraction' }],
        },
        {
          move: 'Divide',
          say: 'Put in the part and the fraction. Three significant figures, as in the data.',
          lines: [{ left: 'whole', right: `8.88${NB}g ÷ 0.888`, op: '÷' }, { right: `10.0${NB}g` }],
        },
        {
          move: 'Check it',
          say: 'Does it give the part back? 88.8% of 10.0 g should be 8.88 g.',
          lines: [{ left: 'part', right: `0.888 × 10.0${NB}g`, op: '×' }, { right: `8.88${NB}g` }],
          qs: [['Why is the whole bigger than the part?', 'The part is only a share of the whole, 88.8% here, so the whole must be larger.']],
        },
      ],
      answer: 'The sample has a mass of 10.0 g.',
    },
  ],
  realUses: [
    { where: 'Air', what: 'Air is about 21% oxygen, so 1000 mL of air holds about 210 mL of it.', eq: `1000${NB}mL × 0.21 = 210${NB}mL` },
    { where: 'A saline drip', what: 'A saline drip is 0.9% salt by mass. 500 g of it holds 4.5 g of salt.', eq: `500${NB}g × 0.009 = 4.5${NB}g` },
    { where: 'A cleaner', what: 'A cleaner is mixed 1 part concentrate to 4 parts water. In 250 mL of mix, one part is 50 mL.', eq: `250${NB}mL ÷ (1 + 4) = 50${NB}mL` },
    { where: 'A vitamin tablet', what: 'A 2.00 g tablet holds 0.500 g of vitamin C, which is 25.0% by mass.', eq: `0.500${NB}g ÷ 2.00${NB}g × 100 = 25.0%` },
    { where: 'Making water', what: 'Every 2 hydrogen molecules need 1 oxygen, so 40 hydrogen molecules need 20 oxygen.', eq: '40 ÷ 2 = 20' },
  ],
  next: [
    { id: '0.4', note: 'The units of a rate multiply, divide and cancel.' },
    { id: '2.6', note: 'Atomic mass is a weighted average of percents.' },
    { id: '4.2', note: 'Percent by mass of each element in a compound.' },
  ],
};
