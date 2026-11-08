import type { ParticleScene, SectionContent } from '../../types';

// Section 0.1 · Powers of Ten (Tro Appendix I). PATTERN SECTION: maths.
// Running example: one drop of water (about 0.05 g) holds 1.7 × 10^21 molecules, each 3.0 × 10^-23 g;
// multiplying the two gives back the drop's mass. Every worked number is recomputed by test/content.test.ts.
const NB = ' '; // keeps a number and its unit together
const G = ' '; // groups digits in threes inside a short number (never breaks)
const T = ' '; // groups digits in a long number (may break between groups on a narrow screen)

const water = (n: number) => Array.from({ length: n }, () => ({ formula: 'H2O' }));
const drop: ParticleScene = {
  describe: 'Three water molecules standing for one drop of water, labelled about 1.7 times 10 to the 21 of these.',
  groups: [{ items: water(3), label: 'one drop: about 1.7 × 10<sup>21</sup> of these' }],
};

export const s0_1: SectionContent = {
  id: '0.1',
  intro: 'Atoms are so small that chemistry is full of huge and tiny numbers. This section shows how to write them with <b>powers of ten</b>, and how to multiply them without counting a single zero.',
  reads: [
    {
      id: 'too-many-zeros',
      title: 'Too many zeros',
      gist: 'Why chemists write huge and tiny numbers with powers of ten.',
      minutes: 2,
      blocks: [
        { p: `One drop of water holds about 1${T}700${T}000${T}000${T}000${T}000${T}000${T}000 molecules. Try reading that number out loud, or copying it without losing a zero.` },
        { particles: drop, level: 'particles' },
        { p: 'Numbers like this are everywhere in chemistry, because atoms are so small. A <b>power of ten</b> says how many zeros there are, so you never have to write them all out.' },
        { key: '10<sup>n</sup> is 1 followed by n zeros. The drop holds 1.7 × 10<sup>21</sup> molecules.' },
        { p: 'Through this section we follow that drop: how many molecules it holds, how much one molecule weighs, and how the two numbers give back the mass of the drop.' },
      ],
    },
    {
      id: 'reading-powers',
      title: 'Reading a power of ten',
      gist: 'The small raised number counts how many tens are multiplied together.',
      minutes: 2,
      blocks: [
        { p: 'The small raised number is the <b>exponent</b>. It says how many tens are multiplied together: 10<sup>3</sup> is 10 × 10 × 10, which is 1000.' },
        { eq: ['10<sup>3</sup> = 10 × 10 × 10 = 1000'] },
        {
          table: {
            head: ['Power', 'Number', 'In words'],
            rows: [
              ['10<sup>3</sup>', '1000', 'a thousand'],
              ['10<sup>2</sup>', '100', 'a hundred'],
              ['10<sup>1</sup>', '10', 'ten'],
              ['10<sup>0</sup>', '1', 'one'],
              ['10<sup>−1</sup>', '0.1', 'a tenth'],
              ['10<sup>−2</sup>', '0.01', 'a hundredth'],
              ['10<sup>−3</sup>', '0.001', 'a thousandth'],
            ],
          },
        },
        { p: 'Each row is ten times the one below it. Going down, you divide by ten each time, and that carries you past 1 into the small numbers: 10<sup>0</sup> is 1, and negative exponents are tenths, hundredths and thousandths.' },
        {
          frames: [
            { caption: 'Start at a thousand: three tens multiplied.', eq: ['10<sup>3</sup> = 1000'] },
            { caption: 'Each step down divides by ten, and the exponent drops by one.', eq: ['10<sup>2</sup> = 100', '10<sup>1</sup> = 10'] },
            { caption: 'No tens at all leaves just 1.', eq: ['10<sup>0</sup> = 1'] },
            { caption: 'Keep dividing and the exponent goes below zero: tenths, then hundredths.', eq: ['10<sup>−1</sup> = 0.1', '10<sup>−2</sup> = 0.01'] },
          ],
          label: 'Picture it',
        },
        { key: '10<sup>0</sup> = 1. A negative exponent means divide: 10<sup>−2</sup> = 1 ÷ 100.' },
      ],
    },
    {
      id: 'scientific-notation',
      title: 'Scientific notation',
      gist: 'Any number, written as a number from 1 to 10 times a power of ten.',
      minutes: 3,
      blocks: [
        { p: 'In <b>scientific notation</b> a number is written as <i>a</i> × 10<sup>n</sup>. The front number <i>a</i> is at least 1 and less than 10; it carries the digits that matter. The power of ten carries the size.' },
        { eq: ['<i>a</i> × 10<sup>n</sup>'] },
        { p: 'To get there, move the decimal point until exactly one digit sits in front of it, and count the hops. Each hop to the left divides the front number by ten, so the exponent goes up by one to keep the value the same.' },
        {
          frames: [
            { caption: 'Start with the number. Its decimal point sits at the end.', eq: [`1${G}700${G}000.`] },
            { caption: 'Move the point left until one digit is in front of it: 6 hops.', eq: [`1.700${G}000`] },
            { caption: 'Six hops left, so the exponent is 6.', eq: ['1.7 × 10<sup>6</sup>'] },
          ],
          label: 'Picture it',
        },
        { work: [[`1${G}700${G}000 = 1.7 × 10<sup>6</sup>`, '6 hops left']] },
        { key: 'Count the hops of the decimal point. Hops to the left give a positive exponent.' },
        { p: 'The drop works the same way: from the end of its long number to just after the 1 is 21 hops, so it holds 1.7 × 10<sup>21</sup> molecules. To check, go back: 1.7 × 10<sup>6</sup> means move the point 6 places right, which gives 1 700 000 again.' },
      ],
    },
    {
      id: 'tiny-numbers',
      title: 'Tiny numbers',
      gist: 'A number smaller than 1 gets a negative exponent.',
      minutes: 2,
      blocks: [
        { p: `One water molecule has a mass of about 0.000${T}000${T}000${T}000${T}000${T}000${T}000${T}030 g. For a number below 1, move the decimal point to the <b>right</b> until one digit that isn’t zero is in front of it. Hops to the right give a negative exponent.` },
        {
          particles: { describe: 'One water molecule, ringed, labelled 3.0 times 10 to the minus 23 grams.', groups: [{ items: [{ formula: 'H2O', ring: true }], label: 'one molecule: 3.0 × 10<sup>−23</sup> g' }] },
          level: 'particles',
        },
        { work: [[`0.000${G}52 = 5.2 × 10<sup>−4</sup>`, '4 hops right']] },
        { key: 'Hops to the right give a negative exponent. One water molecule: 23 hops, so 3.0 × 10<sup>−23</sup> g.' },
        { p: 'A negative exponent doesn’t make a negative number. 10<sup>−23</sup> is still above zero, just very small: 1 divided by 10<sup>23</sup>.' },
      ],
    },
    {
      id: 'multiply-divide',
      title: 'Multiplying and dividing',
      gist: 'Multiply the front numbers and add the exponents: no long strings of zeros.',
      minutes: 3,
      blocks: [
        { p: 'Here is where powers of ten pay off. To multiply, multiply the front numbers and <b>add</b> the exponents. To divide, divide the front numbers and <b>subtract</b> the exponents.' },
        { eq: ['10<sup>a</sup> × 10<sup>b</sup> = 10<sup>a + b</sup>', '10<sup>a</sup> ÷ 10<sup>b</sup> = 10<sup>a − b</sup>'] },
        { p: 'Back to the drop. It holds 1.7 × 10<sup>21</sup> molecules, and each has a mass of 3.0 × 10<sup>−23</sup> g. The mass of the drop is the number of molecules times the mass of one.' },
        {
          frames: [
            { caption: 'Multiply the front numbers.', eq: ['1.7 × 3.0 = 5.1'] },
            { caption: 'Add the exponents.', eq: ['21 + (−23) = −2'] },
            { caption: 'Put them together: the mass of the drop.', eq: [`5.1 × 10<sup>−2</sup>${NB}g = 0.051${NB}g`] },
          ],
          label: 'Picture it',
        },
        { work: [[`1.7 × 10<sup>21</sup> × 3.0 × 10<sup>−23</sup>${NB}g = 5.1 × 10<sup>−2</sup>${NB}g`, 'multiply, add exponents']] },
        { key: 'Multiply: add the exponents. Divide: subtract them.' },
        { p: 'That is 0.051 g, about the mass of a drop of water. The powers of ten did the bookkeeping: 21 zeros one way, 23 the other, leaving 2.' },
      ],
    },
    {
      id: 'using-it-well',
      title: 'Using it well',
      gist: 'How to tidy an answer, use a calculator’s EE key, and the moves in Example 1.',
      minutes: 2,
      blocks: [
        { p: 'After multiplying, the front number can land outside 1 to 10. Tidy it: make the front number ten times smaller and add one to the exponent, so the value stays the same.' },
        {
          frames: [
            { caption: 'After multiplying, the front number is 12: too big.', eq: ['12 × 10<sup>3</sup>'] },
            { caption: 'Write 12 as 1.2 × 10.', eq: ['1.2 × 10 × 10<sup>3</sup>'] },
            { caption: 'Add the exponents: 1 + 3 = 4.', eq: ['1.2 × 10<sup>4</sup>'] },
          ],
          label: 'Picture it',
        },
        { work: [['12 × 10<sup>3</sup> = 1.2 × 10<sup>4</sup>', 'front ÷ 10, exponent + 1']] },
        { h: 'On a calculator' },
        { p: 'Type 1.7 × 10<sup>21</sup> as 1.7, then the <b>EE</b> or <b>EXP</b> key, then 21. That key already means “times ten to the”, so don’t type × 10 as well. A display showing 1.7E21 means 1.7 × 10<sup>21</sup>.' },
        { h: 'The moves in Example 1' },
        {
          work: [
            [`1${G}700${G}000 → 1.7`, '1 · place the point'],
            ['6 hops to the left: n = 6', '2 · count the hops'],
            ['1.7 × 10<sup>6</sup>', '3 · write it'],
          ],
        },
      ],
    },
  ],
  tool: '<i>a</i> × 10<sup>n</sup>',
  toolNote: '<i>a</i> is from 1 up to 10. n counts the hops of the decimal point: to the left is +, to the right is −.',
  ideas: [
    { title: 'Powers count tens', body: '10<sup>3</sup> = 10 × 10 × 10 = 1000, and 10<sup>0</sup> = 1.' },
    { title: 'Scientific notation', body: 'A front number from 1 to 10, times a power of ten: 1.7 × 10<sup>21</sup>.' },
    { title: 'Negative means small', body: `Below 1 the exponent is negative: 0.000${G}52 = 5.2 × 10<sup>−4</sup>.` },
    { title: 'Multiply: add exponents', body: 'Multiply the front numbers and add the exponents. To divide, divide and subtract.' },
  ],
  why: [
    { caption: 'Each hop of the decimal point is one factor of ten.', eq: ['1700 = 1.7 × 1000'] },
    { caption: 'So the number of hops is the exponent.', eq: ['1.7 × 1000 = 1.7 × 10<sup>3</sup>'] },
    { caption: 'Multiplying powers of ten just adds up the hops.', eq: ['10<sup>3</sup> × 10<sup>2</sup> = 10<sup>5</sup>'] },
  ],
  spot: {
    clues: [
      { text: 'A number with a long string of zeros', example: `45${G}000${G}000`, note: 'count the places: 4.5 × 10<sup>7</sup>' },
      { text: 'A number that starts 0.000…', example: `0.000${G}052${NB}m`, note: 'a negative exponent: 5.2 × 10<sup>−5</sup> m' },
      { text: 'Powers of ten multiplied or divided', example: '(2.0 × 10<sup>3</sup>) × (4.0 × 10<sup>5</sup>)', note: 'multiply 2.0 × 4.0, add 3 + 5: 8.0 × 10<sup>8</sup>' },
      { text: 'A calculator shows an E', example: '6.02E23', note: 'it means 6.02 × 10<sup>23</sup>' },
    ],
    lookAlikes: [
      { looks: 'pH = −log[H<sup>+</sup>]', use: 'Logarithms', why: 'a logarithm undoes a power of ten: it asks what the exponent is.', link: '0.5' },
      { looks: 'kilo, milli, nano in a unit', use: 'Units and prefixes', why: 'each prefix stands for a power of ten, like milli = 10<sup>−3</sup>.', link: '1.5' },
    ],
  },
  mistakes: [
    { wrong: `0.000${G}52 = 5.2 × 10<sup>4</sup>`, right: `0.000${G}52 = 5.2 × 10<sup>−4</sup>`, why: 'A number below 1 has a negative exponent: the point hopped to the right.' },
    { wrong: '10<sup>3</sup> × 10<sup>4</sup> = 10<sup>12</sup>', right: '10<sup>3</sup> × 10<sup>4</sup> = 10<sup>7</sup>', why: 'Multiplying powers of ten adds the exponents; it doesn’t multiply them.' },
    { wrong: '45 × 10<sup>3</sup>', right: '4.5 × 10<sup>4</sup>', why: 'The front number must be from 1 up to 10. Make it ten times smaller and add one to the exponent.' },
    { wrong: '10<sup>0</sup> = 0', right: '10<sup>0</sup> = 1', why: 'No tens multiplied leaves the number you started with: 1.' },
    { wrong: '6.022 × 10 EE 23', right: '6.022 EE 23', why: 'The EE key already means “times ten to the”. Typing × 10 too makes the answer ten times too big.' },
  ],
  examples: [
    {
      id: '0.1-1',
      question: `Write the number of molecules in a drop of water, 1${T}700${T}000${T}000${T}000${T}000${T}000${T}000, in scientific notation.`,
      level: 'easy',
      steps: [
        {
          move: 'Place the point',
          say: 'Put the decimal point just after the first digit, so the front number is from 1 to 10.',
          lines: [{ left: '<i>a</i>', right: '1.7' }],
          qs: [['What happens to all the zeros?', 'After the 7 they only hold places. The power of ten will carry them.']],
        },
        {
          move: 'Count the hops',
          say: 'From the end of the number to just after the 1, the point moves 21 places to the left. Left means a positive exponent.',
          lines: [{ left: 'n', right: '21', op: '21 hops ←' }],
        },
        {
          move: 'Write it',
          say: 'Put the front number and the power of ten together. Check: it gives back the long number.',
          lines: [{ left: 'N', right: `1${T}700${T}000${T}000${T}000${T}000${T}000${T}000` }, { right: '1.7 × 10<sup>21</sup>' }],
        },
      ],
      answer: 'A drop of water holds about 1.7 × 10<sup>21</sup> molecules.',
    },
    {
      id: '0.1-2',
      question: `A sodium atom has a radius of about 0.000${T}000${T}000${T}186 m. Write it in scientific notation.`,
      level: 'typical',
      steps: [
        {
          move: 'Place the point',
          say: 'Move the point to just after the first digit that isn’t zero: the 1.',
          lines: [{ left: '<i>a</i>', right: '1.86' }],
          qs: [['Why keep the 8 and the 6?', 'They are measured digits. Only the zeros in front just hold places.']],
        },
        {
          move: 'Count the hops',
          say: 'The point moves 10 places to the right. Right means a negative exponent.',
          lines: [{ left: 'n', right: '−10', op: '10 hops →' }],
        },
        {
          move: 'Write it',
          say: 'Put them together. A tiny number has a negative exponent.',
          lines: [{ left: 'r', right: `0.000${T}000${T}000${T}186${NB}m` }, { right: `1.86 × 10<sup>−10</sup>${NB}m` }],
        },
      ],
      answer: 'A sodium atom’s radius is about 1.86 × 10<sup>−10</sup> m.',
    },
    {
      id: '0.1-3',
      question: 'One water molecule has a mass of 2.99 × 10<sup>−23</sup> g. What is the mass of 6.02 × 10<sup>23</sup> water molecules?',
      level: 'harder',
      steps: [
        {
          move: 'Set it up',
          say: 'The total mass is the number of molecules times the mass of one.',
          lines: [{ left: 'm', right: `6.02 × 10<sup>23</sup> × 2.99 × 10<sup>−23</sup>${NB}g` }],
        },
        {
          move: 'Front numbers',
          say: 'Multiply the front numbers. Keep three significant figures, as in the data.',
          lines: [{ left: '<i>a</i>', right: '6.02 × 2.99', op: '×' }, { right: '18.0' }],
        },
        {
          move: 'Add exponents',
          say: 'The exponents 23 and −23 cancel, leaving 10<sup>0</sup>, which is 1.',
          lines: [{ left: 'n', right: '23 + (−23)', op: '+' }, { right: '0' }],
          qs: [['What is 10 to the power 0?', 'One. No tens multiplied leaves the number unchanged.']],
        },
        {
          move: 'Put together',
          say: 'The front number times 10<sup>0</sup>: the powers of ten have cancelled out.',
          lines: [{ left: 'm', right: `18.0 × 10<sup>0</sup>${NB}g` }, { right: `18.0${NB}g` }],
        },
      ],
      answer: '6.02 × 10<sup>23</sup> water molecules have a mass of 18.0 g. That many of anything is one mole: you will meet it again in Section 4.1.',
    },
  ],
  realUses: [
    { where: 'A drop of water', what: 'A 0.050 g drop is about 2.8 × 10<sup>−3</sup> mol of water, which is 1.7 × 10<sup>21</sup> molecules.', eq: `2.8 × 10<sup>−3</sup>${NB}mol × 6.022 × 10<sup>23</sup> = 1.7 × 10<sup>21</sup>` },
    { where: 'Sunlight', what: 'Light covers the 1.5 × 10<sup>11</sup> m from the Sun in about 500 seconds: just over 8 minutes.', eq: `1.5 × 10<sup>11</sup>${NB}m ÷ 3.0 × 10<sup>8</sup>${NB}m/s = 5.0 × 10<sup>2</sup>${NB}s` },
    { where: 'Red blood cells', what: 'Each microlitre of blood holds about 5 × 10<sup>6</sup> red cells, and an adult has about 5 × 10<sup>6</sup> microlitres of blood.', eq: '5 × 10<sup>6</sup> × 5 × 10<sup>6</sup> = 2.5 × 10<sup>13</sup>' },
    { where: 'One hydrogen atom', what: 'A mole of hydrogen atoms has a mass of 1.008 g, so one atom has a mass of about 1.674 × 10<sup>−24</sup> g.', eq: `1.008${NB}g ÷ 6.022 × 10<sup>23</sup> = 1.674 × 10<sup>−24</sup>${NB}g` },
    { where: 'A human hair', what: `A hair is about 0.000${G}08 m across.`, eq: `0.000${G}08${NB}m = 8 × 10<sup>−5</sup>${NB}m` },
  ],
  next: [
    { id: '0.5', note: 'A logarithm reads off the exponent.' },
    { id: '1.5', note: 'Kilo, milli and nano are powers of ten.' },
    { id: '4.1', note: 'A mole is 6.022 × 10<sup>23</sup> of something.' },
  ],
};
