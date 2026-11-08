import type { SectionContent } from '../../types';

// Section 0.5 · Logarithms (Tro Appendix I). Maths section.
// Running example: 0.0010 mol/L hydrochloric acid, [H+] = 1.0 × 10^-3, so pH = 3.00.
// Checker note: test/content.test.ts cannot follow log or 10^(decimal), so no "=" line in a read, example or real use
// is built on them: they sit in frames, in a worked line's own `left`, or in lines joined by "→" (docs report this).
const NB = ' '; // keeps a number and its unit together

export const s0_5: SectionContent = {
  id: '0.5',
  intro: 'A concentration can be 0.1 or 0.000 000 1. The pH scale squeezes that whole range into numbers from 0 to 14, and the tool that does it is the <b>logarithm</b>. This section shows what a log is, how to use one, and how to undo one.',
  reads: [
    {
      id: 'ph-is-a-power',
      title: 'pH is a power in disguise',
      gist: 'Why chemists squeeze huge ranges of concentration into one small number.',
      minutes: 3,
      blocks: [
        { p: `Acids put hydrogen ions, H<sup>+</sup>, into water. Square brackets mean “concentration of”, and M means mol/L. A 0.0010${NB}M solution of hydrochloric acid has [H<sup>+</sup>] = 1.0 × 10<sup>−3</sup>${NB}M, and pure water has only 1.0 × 10<sup>−7</sup>${NB}M.` },
        {
          table: {
            head: ['Solution', '[H<sup>+</sup>] in mol/L', 'Exponent'],
            rows: [
              ['0.10 M acid', '1.0 × 10<sup>−1</sup>', '−1'],
              ['0.0010 M acid (our example)', '1.0 × 10<sup>−3</sup>', '−3'],
              ['Pure water', '1.0 × 10<sup>−7</sup>', '−7'],
              ['Household ammonia', '1.0 × 10<sup>−11</sup>', '−11'],
            ],
          },
        },
        { p: 'Look at the last column. The exponent alone tells you almost everything, and it is a small, friendly number. Chemists keep just that, with the minus sign dropped, and call it the <b>pH</b>.' },
        {
          frames: [
            { caption: 'A concentration of H<sup>+</sup> written as a power of ten.', eq: [`[H<sup>+</sup>] = 1.0 × 10<sup>−3</sup>${NB}M`] },
            { caption: 'Look only at the exponent: −3.', eq: ['exponent −3'] },
            { caption: 'Drop the minus sign. That number is the pH.', eq: ['pH 3'] },
          ],
          label: 'Picture it',
        },
        { key: 'For a concentration like 1.0 × 10<sup>−3</sup>, the pH is the exponent with the minus sign dropped.' },
        { p: 'Through this section we follow that 0.0010 M acid: first its pH, then ways to find the pH when the front number isn’t 1.' },
      ],
    },
    {
      id: 'log-asks-for-the-exponent',
      title: 'Log asks for the exponent',
      gist: 'A logarithm answers “ten to what power gives this number?”',
      minutes: 3,
      blocks: [
        { p: 'The shortcut has a name. The <b>logarithm</b> of a number, written log, answers one question: 10 to what power gives this number?' },
        {
          table: {
            head: ['Number', 'As a power of ten', 'Its log'],
            rows: [
              ['1000', '10<sup>3</sup>', '3'],
              ['100', '10<sup>2</sup>', '2'],
              ['10', '10<sup>1</sup>', '1'],
              ['1', '10<sup>0</sup>', '0'],
              ['0.1', '10<sup>−1</sup>', '−1'],
              ['0.001', '10<sup>−3</sup>', '−3'],
            ],
          },
        },
        {
          frames: [
            { caption: 'Ask: 10 to what power is 1000?', eq: ['10<sup>?</sup> → 1000'] },
            { caption: 'Three tens multiplied: 10 × 10 × 10.', eq: ['10<sup>3</sup> → 1000'] },
            { caption: 'So the log of 1000 is 3.', eq: ['log 1000 → 3'] },
          ],
          label: 'Picture it',
        },
        { key: 'A log asks for the exponent: log(10<sup>n</sup>) is n.' },
        { p: 'A log undoes a power of ten. That is why you saw the same exponents in the table above: 1.0 × 10<sup>−3</sup> has a log of −3. Numbers below 1 have a negative log; numbers above 1 have a positive one.' },
      ],
    },
    {
      id: 'between-two-powers',
      title: 'When the front number isn’t 1',
      gist: 'Between two powers of ten, a log lands between two whole numbers.',
      minutes: 3,
      blocks: [
        { p: `What about a solution with [H<sup>+</sup>] = 3.0 × 10<sup>−4</sup>${NB}M? That is bigger than 10<sup>−4</sup> and smaller than 10<sup>−3</sup>, so its log must lie between −4 and −3.` },
        {
          frames: [
            { caption: 'Place the number between its neighbours.', eq: ['between 10<sup>−4</sup> and 10<sup>−3</sup>'] },
            { caption: 'So the log is between −4 and −3.', eq: ['between −4 and −3'] },
            { caption: 'The calculator’s log key finds exactly where.', eq: ['log(3.0 × 10<sup>−4</sup>) → −3.52'] },
          ],
          label: 'Picture it',
        },
        { p: 'Type 3.0, the <b>EE</b> key, −4, then press <b>log</b>. If you split the number, you see why it works: the log of a product is a sum.' },
        { work: [['0.48 + (−4) = −3.52', 'log 3.0 is 0.48; the 10<sup>−4</sup> adds −4']] },
        { key: 'log(<i>a</i> × 10<sup>n</sup>) = log <i>a</i> + <i>n</i>' },
        { p: 'It is the same idea as multiplying powers of ten by adding exponents (Section 0.1). Significant figures work differently for logs: the digits after the decimal point in the log count the significant figures of the number. 3.0 has two, so the log keeps two decimals: −3.52.' },
      ],
    },
    {
      id: 'ph-from-concentration',
      title: 'pH from concentration',
      gist: 'pH = −log[H<sup>+</sup>]: the minus sign makes the pH positive.',
      minutes: 3,
      blocks: [
        { p: 'Now the full definition. The pH is the negative of the log of the hydrogen-ion concentration.' },
        { eq: ['pH = −log[H<sup>+</sup>]'] },
        { p: 'Why the minus? Concentrations below 1 have negative logs, and a positive number is easier to say. Back to our 0.0010 M acid:' },
        {
          frames: [
            { caption: 'Start with the concentration of H<sup>+</sup>.', eq: [`[H<sup>+</sup>] = 1.0 × 10<sup>−3</sup>${NB}M`] },
            { caption: 'Take the log: the exponent.', eq: ['log(1.0 × 10<sup>−3</sup>) → −3.00'] },
            { caption: 'Flip the sign so the pH is positive.', eq: ['pH = −(−3.00) = 3.00'] },
          ],
          label: 'Picture it',
        },
        { work: [['pH = −(−3.00) = 3.00', 'the minus flips the sign']] },
        { key: 'pH = −log[H<sup>+</sup>]. A smaller [H<sup>+</sup>] means a bigger pH.' },
        { p: 'Two significant figures in 1.0 × 10<sup>−3</sup> means two decimals in the pH, so it is written 3.00.' },
      ],
    },
    {
      id: 'concentration-from-ph',
      title: 'From pH back to concentration',
      gist: 'To undo a log, raise ten to that power.',
      minutes: 3,
      blocks: [
        { p: 'Sometimes you read a pH and want the concentration. Blood has a pH of 7.40. A log is undone by a power of ten, so run the steps backwards.' },
        {
          frames: [
            { caption: 'Start from the pH.', eq: ['pH 7.40'] },
            { caption: 'Change the sign: the log of [H<sup>+</sup>] is −7.40.', eq: ['log[H<sup>+</sup>] → −7.40'] },
            { caption: 'Undo the log: ten to that power.', eq: ['[H<sup>+</sup>] → 10<sup>−7.40</sup>'] },
            { caption: 'The 10<sup>x</sup> key gives the number.', eq: [`[H<sup>+</sup>] → 4.0 × 10<sup>−8</sup>${NB}M`] },
          ],
          label: 'Picture it',
        },
        { key: '[H<sup>+</sup>] = 10<sup>−pH</sup>. The log and the power of ten undo each other.' },
        { p: 'A quick check: pH 7.40 is between 7 and 8, so the concentration should be between 10<sup>−8</sup> and 10<sup>−7</sup>. And 4.0 × 10<sup>−8</sup> is.' },
        { p: 'On a calculator, the 10<sup>x</sup> key is usually the second function of log. Type −7.40 first, then 10<sup>x</sup>.' },
      ],
    },
    {
      id: 'ten-times',
      title: 'One pH step is ten times',
      gist: 'Each unit on the pH scale is a tenfold change in concentration.',
      minutes: 2,
      blocks: [
        { p: 'Because the pH is an exponent, one step on the scale changes [H<sup>+</sup>] by a factor of ten. pH 3 has ten times as much H<sup>+</sup> as pH 4, not just a bit more.' },
        {
          frames: [
            { caption: 'pH 3 has [H<sup>+</sup>] of 10<sup>−3</sup>.', eq: ['10<sup>−3</sup>'] },
            { caption: 'pH 4 has 10<sup>−4</sup>: ten times less.', eq: ['10<sup>−3</sup>', '10<sup>−4</sup>'] },
            { caption: 'pH 5 has 10<sup>−5</sup>: a hundred times less than pH 3.', eq: ['10<sup>−3</sup>', '10<sup>−4</sup>', '10<sup>−5</sup>'] },
          ],
          label: 'Picture it',
        },
        { work: [['10<sup>−3</sup> ÷ 10<sup>−5</sup> = 10<sup>2</sup>', 'two steps: 100 times']] },
        { key: 'One pH step is a factor of 10. A difference of 2 is 100 times, and of 3 is 1000 times.' },
      ],
    },
    {
      id: 'using-it-well',
      title: 'Using it well',
      gist: 'How to check a log or a pH, and the moves in Example 1.',
      minutes: 2,
      blocks: [
        { p: 'Check the sign first. A concentration below 1 has a negative log, and a positive pH. If a pH comes out negative for a dilute acid, the minus sign got lost somewhere.' },
        {
          frames: [
            { caption: 'Concentration below 1: the log is negative.', eq: ['log(1.0 × 10<sup>−3</sup>) → −3.00'] },
            { caption: 'The pH flips the sign: positive.', eq: ['pH → 3.00'] },
            { caption: 'Going back, the pH becomes a negative power again.', eq: ['10<sup>−3.00</sup> → 1.0 × 10<sup>−3</sup>'] },
          ],
          label: 'Picture it',
        },
        { h: 'The moves in Example 1' },
        {
          work: [
            [`[H<sup>+</sup>] = 1.0 × 10<sup>−3</sup>${NB}M`, '1 · write the concentration'],
            ['log(1.0 × 10<sup>−3</sup>) = −3.00', '2 · take the log'],
            ['pH = −(−3.00) = 3.00', '3 · flip the sign'],
          ],
        },
      ],
    },
  ],
  tool: 'pH = −log[H<sup>+</sup>]',
  toolNote: 'log asks “ten to what power?” Undo it with [H<sup>+</sup>] = 10<sup>−pH</sup>. Decimals in the pH match significant figures in [H<sup>+</sup>].',
  ideas: [
    { title: 'A log asks for the exponent', body: 'log(10<sup>3</sup>) is 3, and log(10<sup>−3</sup>) is −3.' },
    { title: 'pH = −log[H<sup>+</sup>]', body: 'The minus sign makes the pH positive for concentrations below 1.' },
    { title: 'Undo a log with a power of ten', body: '[H<sup>+</sup>] = 10<sup>−pH</sup>. The calculator’s 10<sup>x</sup> key does it.' },
    { title: 'One step is ten times', body: 'pH 3 has ten times the H<sup>+</sup> of pH 4, and a hundred times that of pH 5.' },
    { title: 'Decimals are significant figures', body: 'Two significant figures in the concentration gives two decimals in the pH.' },
  ],
  why: [
    { caption: 'A power of ten hides a number: 10<sup>3</sup> is 1000.', eq: ['10<sup>3</sup> → 1000'] },
    { caption: 'A log asks for that hidden number back.', eq: ['log 1000 → 3'] },
    { caption: 'pH uses it so a tiny concentration becomes an easy number.', eq: ['[H<sup>+</sup>] 10<sup>−3</sup> M → pH 3'] },
  ],
  spot: {
    clues: [
      { text: 'A “p” in front of a quantity', example: 'pH, pOH, p<i>K</i><sub>a</sub>', note: 'p means −log of what follows' },
      { text: 'A very small concentration to compare', example: `[H<sup>+</sup>] = 3.0 × 10<sup>−4</sup>${NB}M`, note: 'take the log, then flip the sign' },
      { text: 'A pH given, a concentration wanted', example: 'pH 7.40', note: 'undo with ten to the power −pH' },
      { text: 'A calculator key labelled log or 10<sup>x</sup>', example: 'log and 10<sup>x</sup>', note: 'they undo each other' },
    ],
    lookAlikes: [
      { looks: '3.0 × 10<sup>−4</sup>', use: 'Powers of ten', why: 'a log undoes a power of ten, so read Section 0.1 first.', link: '0.1' },
      { looks: 'ln, the natural log', use: 'Free energy and K', why: 'ln uses a different base (e instead of 10); it comes up with Δ<i>G</i>° and K.', link: '21.9' },
    ],
  },
  mistakes: [
    { wrong: 'pH = log[H<sup>+</sup>]', right: 'pH = −log[H<sup>+</sup>]', why: 'The pH has a minus sign in front. It makes the answer positive.' },
    { wrong: 'log(1.0 × 10<sup>−3</sup>) = 3', right: 'log(1.0 × 10<sup>−3</sup>) = −3.00', why: 'A number below 1 has a negative log. The sign of the exponent is kept.' },
    { wrong: 'pH 3 has 3 times the H<sup>+</sup> of pH 4', right: 'pH 3 has 10 times the H<sup>+</sup> of pH 4', why: 'Each pH step is a factor of 10, not a difference of 1.' },
    { wrong: '[H<sup>+</sup>] = 10<sup>8.30</sup>', right: '[H<sup>+</sup>] = 10<sup>−8.30</sup>', why: 'Going back from pH, the exponent is −pH. Keep the minus sign.' },
    { wrong: 'pH = 3.5 for [H<sup>+</sup>] = 3.0 × 10<sup>−4</sup>', right: 'pH = 3.52', why: 'Two significant figures in 3.0 means two decimals in the pH.' },
  ],
  examples: [
    {
      id: '0.5-1',
      question: 'A solution of hydrochloric acid, HCl, is 0.0010 M. M means mol/L. HCl gives one H<sup>+</sup> for each HCl, so [H<sup>+</sup>] is 1.0 × 10<sup>−3</sup> M. What is its pH?',
      level: 'easy',
      steps: [
        {
          move: 'Write the concentration',
          say: 'Start with the hydrogen-ion concentration, in scientific notation.',
          lines: [{ left: '[H<sup>+</sup>]', right: `1.0 × 10<sup>−3</sup>${NB}mol/L` }],
        },
        {
          move: 'Take the log',
          say: 'A log asks for the exponent: 10 to what power is 1.0 × 10<sup>−3</sup>? Two significant figures in 1.0 give two decimals.',
          lines: [{ left: 'log(1.0 × 10<sup>−3</sup>)', right: '−3.00', op: 'log key' }],
        },
        {
          move: 'Flip the sign',
          say: 'The pH is minus the log, so it comes out positive.',
          lines: [{ left: 'pH', right: '−(−3.00)', op: '−' }, { right: '3.00' }],
        },
      ],
      answer: 'The 0.0010 M hydrochloric acid has a pH of 3.00.',
    },
    {
      id: '0.5-2',
      question: 'A cola has [H<sup>+</sup>] = 3.0 × 10<sup>−4</sup> mol/L. What is its pH?',
      level: 'typical',
      steps: [
        {
          move: 'Estimate first',
          say: '3.0 × 10<sup>−4</sup> is bigger than 10<sup>−4</sup> and smaller than 10<sup>−3</sup>, so the pH should be between 3 and 4.',
          lines: [{ left: 'pH', right: 'between 3 and 4' }],
        },
        {
          move: 'Take the log',
          say: 'Use the log key: 3.0, EE, −4, log. Keep two decimals, to match the two significant figures.',
          lines: [{ left: 'log(3.0 × 10<sup>−4</sup>)', right: '−3.52', op: 'log key' }],
        },
        {
          move: 'Flip the sign',
          say: 'The pH is the negative of the log. It is between 3 and 4, as estimated.',
          lines: [{ left: 'pH', right: '−(−3.52)', op: '−' }, { right: '3.52' }],
        },
      ],
      answer: 'The cola has a pH of 3.52.',
    },
    {
      id: '0.5-3',
      question: 'A solution of baking soda in water has a pH of 8.30. What is [H<sup>+</sup>]?',
      level: 'harder',
      steps: [
        {
          move: 'Flip the sign',
          say: 'The pH is minus the log, so the log of [H<sup>+</sup>] is minus the pH.',
          lines: [{ left: 'log[H<sup>+</sup>]', right: '−pH' }, { left: 'log[H<sup>+</sup>]', right: '−8.30' }],
        },
        {
          move: 'Undo the log',
          say: 'A log is undone by a power of ten. Raise 10 to the power −8.30.',
          lines: [{ left: '[H<sup>+</sup>]', right: '10<sup>−8.30</sup>', op: '10<sup>x</sup> key' }],
          qs: [['Where is the 10x key?', 'On most calculators it is the second function of the log key: press shift or 2nd, then log.']],
        },
        {
          move: 'Read the key',
          say: 'The calculator gives 5.01 × 10<sup>−9</sup>. Two decimals in the pH means two significant figures.',
          lines: [{ left: '10<sup>−8.30</sup>', right: `5.0 × 10<sup>−9</sup>${NB}mol/L` }],
        },
        {
          move: 'Check it',
          say: 'pH 8.30 is between 8 and 9, so [H<sup>+</sup>] must be between 10<sup>−9</sup> and 10<sup>−8</sup>. It is.',
          lines: [{ left: '5.0 × 10<sup>−9</sup>', right: 'between 10<sup>−9</sup> and 10<sup>−8</sup>' }],
        },
      ],
      answer: 'The baking soda solution has [H<sup>+</sup>] = 5.0 × 10<sup>−9</sup> mol/L.',
    },
  ],
  realUses: [
    { where: 'Pure water', what: 'Pure water has [H<sup>+</sup>] of 1.0 × 10<sup>−7</sup> mol/L. Its exponent is −7, so the pH is 7.00.', eq: '[H<sup>+</sup>] 1.0 × 10<sup>−7</sup> M → pH 7.00' },
    { where: 'Blood', what: 'Blood has a pH of 7.40, which means [H<sup>+</sup>] is only about 4.0 × 10<sup>−8</sup> mol/L.', eq: '10<sup>−7.40</sup> → 4.0 × 10<sup>−8</sup> M' },
    { where: 'Cola', what: 'A cola with [H<sup>+</sup>] of 2.5 × 10<sup>−3</sup> mol/L has a pH of 2.60.', eq: '−log(2.5 × 10<sup>−3</sup>) → 2.60' },
    { where: 'Acid rain', what: 'Normal rain has a pH of about 5.60. Rain with pH 4.00 differs by 1.60 steps, which is 10<sup>1.6</sup>, about 40 times as much H<sup>+</sup>.', eq: '5.60 − 4.00 = 1.60' },
    { where: 'Comparing acids', what: 'A drink at pH 3 has a hundred times the H<sup>+</sup> of one at pH 5.', eq: '10<sup>−3</sup> ÷ 10<sup>−5</sup> = 10<sup>2</sup>' },
  ],
  next: [
    { id: '6.7', note: 'A first look at pH and why 3 is ten times more acidic than 4.' },
    { id: '19.3', note: 'Water, pH and pOH.' },
    { id: '21.9', note: 'Free energy and equilibrium use logarithms too.' },
  ],
};
