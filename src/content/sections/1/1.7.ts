import type { SectionContent } from '../../types';

// Section 1.7 · How Sure Is a Number? (Tro 1.7). A calculation section.
// Running example: the aluminium block of Section 1.6, measured with a ruler and a balance:
// 5.00 cm, 4.0 cm, 2.00 cm, and what the answer may honestly claim.
// Rounding rules used in every section: 5 or more rounds up, keep one extra figure in the middle, round once at the end.
const NB = ' '; // keeps a number and its unit together

export const s1_7: SectionContent = {
  id: '1.7',
  intro: 'A measurement is only as good as the instrument that made it, and a calculation can never be better than its data. This section shows how <b>significant figures</b> say how sure a number is, and how <b>accuracy</b> and <b>precision</b> describe how good a set of results is.',
  reads: [
    {
      id: 'the-guess-digit',
      title: 'The last digit is a guess',
      gist: 'Why every measured number has one digit you are not sure of.',
      minutes: 2,
      blocks: [
        { p: 'Measure the aluminium block with a ruler marked in millimetres. Its edge falls on the 5.0 cm mark, close to dead on. You are sure of the 5 and the 0. You can also judge by eye that it is a hair either way, and say the next digit: 5.00 cm.' },
        {
          frames: [
            { caption: 'The ruler marks are 0.1 cm apart. The edge sits on 5.0. You are sure of these two digits.', eq: ['5.0 cm'] },
            { caption: 'Look closer: it sits on the mark, so you add a third digit by eye. That last digit is an estimate.', eq: ['5.00 cm'] },
            { caption: 'The estimate shows how fine your tool is. A balance showing 108 g and one showing 108.00 g are not equally good.', eq: ['5.00 cm   108 g   108.00 g'] },
          ],
          label: 'Picture it',
        },
        { p: 'The digits you are sure of, plus the one you estimate, are the <b>significant figures</b> of the measurement. 5.00 cm has three.' },
        { key: 'Significant figures: every digit you are sure of, plus one estimated digit.' },
        { p: 'Through this section we measure the block three ways: its sides with a ruler, its mass on a balance, and what we can honestly say about the volume and density that come out.' },
      ],
    },
    {
      id: 'counting-figures',
      title: 'Counting figures',
      gist: 'The rules for which digits of a number are significant.',
      minutes: 3,
      blocks: [
        { p: 'You will often see a number and need to know how many figures it has. The zeros are the tricky ones, so the rules are about zeros.' },
        {
          table: {
            head: ['Rule', 'Example', 'Figures'],
            rows: [
              ['Nonzero digits always count', '2.45', '3'],
              ['Zeros between digits count', '108', '3'],
              ['Zeros at the start never count', '0.0025', '2'],
              ['Zeros at the end count after a decimal point', '40.0', '3'],
              ['Zeros at the end of a whole number are unclear', '2500', '2 to 4'],
            ],
          },
        },
        { p: 'The last rule needs a fix. Is 2500 g good to the nearest gram or the nearest hundred grams? Scientific notation settles it, because every digit in front of the × counts.' },
        {
          table: {
            head: ['Written', 'Figures'],
            rows: [
              ['2.5 × 10<sup>3</sup> g', '2'],
              ['2.50 × 10<sup>3</sup> g', '3'],
              ['2.500 × 10<sup>3</sup> g', '4'],
            ],
          },
        },
        {
          frames: [
            { caption: 'Cross out the zeros at the start: they only show where the point is.', eq: ['0.00250'] },
            { caption: 'The 2, 5 and the last 0 are left. That zero is after a decimal point, so it counts.', eq: ['2.50 → 3 figures'] },
          ],
          label: 'Picture it',
        },
        { key: 'Count from the first nonzero digit. Zeros after a decimal point count. Zeros in a whole number need scientific notation.' },
        { p: 'Exact numbers have no limit. 12 eggs in a dozen and 1000 mL in a litre are counted or defined, not measured, so they never limit the figures of an answer.' },
      ],
    },
    {
      id: 'multiplying-dividing',
      title: 'Multiplying and dividing',
      gist: 'A product or quotient has as many figures as the least precise number in it.',
      minutes: 3,
      blocks: [
        { p: 'Suppose we measure the block’s sides as 5.00 cm, 4.0 cm and 2.00 cm. The 4.0 cm came from a coarser ruler. The volume is the three multiplied together.' },
        { eq: ['5.00 cm × 4.0 cm × 2.00 cm = 4.0 × 10<sup>1</sup> cm<sup>3</sup>'] },
        { p: 'A calculator would show 40, or 40.00. But one of our sides has only two figures. A chain is only as strong as its weakest link, so the answer gets only two: 4.0 × 10<sup>1</sup>.' },
        {
          frames: [
            { caption: 'Count the figures in each number.', eq: ['5.00 (3)   4.0 (2)   2.00 (3)'] },
            { caption: 'The fewest is two. That limits the answer.', eq: ['fewest = 2'] },
            { caption: 'Multiply, then round to two figures.', eq: ['40.00 → 4.0 × 10<sup>1</sup> cm<sup>3</sup>'] },
          ],
          label: 'Picture it',
        },
        { key: 'Multiplying or dividing: keep as many figures as the number with the fewest.' },
        { p: 'Dividing works the same way. In Section 1.6 the block’s density came from 108 g and 40.0 mL, both with three figures:' },
        { eq: ['108 g ÷ 40.0 mL = 2.70 g/mL'] },
        { p: 'Keep the trailing zero: 2.70 says three figures, and 2.7 says only two.' },
      ],
    },
    {
      id: 'adding-subtracting',
      title: 'Adding and subtracting',
      gist: 'A sum or difference is limited by decimal places, not figures.',
      minutes: 3,
      blocks: [
        { p: 'Adding is different. Weigh the block, its box and a label on a balance, then add the masses.' },
        { eq: ['108.2 g + 12.35 g + 0.057 g = 120.6 g'] },
        { p: 'A calculator says 120.607. But the first mass, 108.2 g, is only known to the nearest tenth of a gram. Adding a few hundredths from the other masses cannot make the tenth any surer.' },
        {
          table: {
            head: ['Mass', 'Decimal places'],
            rows: [
              ['108.2 g', '1  (the fewest)'],
              ['12.35 g', '2'],
              ['0.057 g', '3'],
            ],
          },
        },
        {
          frames: [
            { caption: 'Line the numbers up on the decimal point.', eq: ['108.2', '12.35', '0.057'] },
            { caption: 'The sum is 120.607, but the answer cannot go past the last place all three share.', eq: ['120.607'] },
            { caption: 'The fewest decimal places is one, so round to the tenths.', eq: ['120.6 g'] },
          ],
          label: 'Picture it',
        },
        { key: 'Adding or subtracting: keep as many decimal places as the number with the fewest.' },
        { p: 'Subtraction follows the same rule. The water level in Section 1.6 rose from 25.0 mL to 30.0 mL, so the volume is 5.0 mL, with one decimal place. It has only two figures, even though both readings have three.' },
      ],
    },
    {
      id: 'rounding-well',
      title: 'Rounding well',
      gist: 'When to round, which way, and what to carry in the middle of a calculation.',
      minutes: 2,
      blocks: [
        { p: 'To round, look at the first digit you drop. If it is 5 or more, round the last kept digit up. If it is less than 5, leave it.' },
        {
          table: {
            head: ['Number', 'Keep 3 figures', 'Why'],
            rows: [
              ['2.7049', '2.70', 'the next digit is 4'],
              ['2.7051', '2.71', 'the next digit is 5'],
              ['120.607', '121', 'the next digit is 6'],
            ],
          },
        },
        { p: 'Round only once, at the end. In the middle of a long calculation, carry one more figure than you need, then round the final answer. Rounding early can change the last digit.' },
        {
          frames: [
            { caption: 'Subtract: the answer is good to 9.5 g, but keep the extra figure for now.', eq: ['61.9 g − 52.37 g = 9.53 g'] },
            { caption: 'Divide with the extra figure kept, and the calculator’s digits written down.', eq: ['9.53 g ÷ 8.50 mL = 1.121 g/mL'] },
            { caption: 'Now round once, to two figures, the fewest in the chain.', eq: ['1.1 g/mL'] },
          ],
          label: 'Picture it',
        },
        { key: 'Round once at the end. Carry one extra figure in the middle. 5 or more rounds up.' },
        { p: 'Every worked example in this book follows these rules, so its last digit will agree with yours.' },
      ],
    },
    {
      id: 'accurate-precise',
      title: 'Accurate or precise',
      gist: 'Two different ways a set of measurements can be good.',
      minutes: 3,
      blocks: [
        { p: 'A balance is checked with a standard mass of exactly 25.00 g. Three students each weigh it three times. How good are the results?' },
        {
          table: {
            head: ['Student', 'Readings (g)', 'Average'],
            rows: [
              ['A', '24.98, 25.01, 25.00', '25.00'],
              ['B', '25.62, 25.63, 25.61', '25.62'],
              ['C', '24.1, 25.9, 25.0', '25.0'],
            ],
          },
        },
        {
          frames: [
            { caption: 'A: the readings agree with each other and with 25.00 g. Accurate and precise.', eq: ['close to each other, close to the true value'] },
            { caption: 'B: the readings agree with each other, but all are too high. Precise but not accurate.', eq: ['close to each other, far from the true value'] },
            { caption: 'C: the average is right, but the readings jump around. Accurate on average, but not precise.', eq: ['spread out, centred on the true value'] },
          ],
          label: 'Picture it',
        },
        { key: 'Accuracy: how close to the true value. Precision: how close the readings are to each other.' },
        { p: 'Precision is what significant figures show: more figures means a finer instrument. Accuracy needs a known true value to check against. A precise set that is off, like B’s, often means a mistake in the method, such as a balance that has not been zeroed.' },
        { p: 'Section 1.9 turns accuracy into a number, the percent error.' },
      ],
    },
    {
      id: 'using-it-well',
      title: 'Using it well',
      gist: 'The two rules to reach for, and the moves in Example 1.',
      minutes: 2,
      blocks: [
        { p: 'Every time you finish a calculation, ask which rule applies. It depends only on the operation.' },
        {
          table: {
            head: ['Operation', 'Keep', 'Example'],
            rows: [
              ['× or ÷', 'the fewest figures', '5.00 × 4.0 → 2 figures'],
              ['+ or −', 'the fewest decimal places', '108.2 + 12.35 → 1 place'],
              ['mixed', 'follow each step, round at the end', '(61.9 − 52.37) ÷ 8.50'],
            ],
          },
        },
        {
          frames: [
            { caption: 'Ask what the operation is.', eq: ['× ÷  or  + −'] },
            { caption: 'Count what that operation cares about: figures, or decimal places.', eq: ['figures  or  decimal places'] },
            { caption: 'Round once to the fewest, at the end.', eq: ['4.0 × 10<sup>1</sup> cm<sup>3</sup>'] },
          ],
          label: 'Picture it',
        },
        {
          work: [
            ['5.00 cm × 4.0 cm × 2.00 cm = 40.00 cm<sup>3</sup>', '1 · multiply'],
            ['3, 2, 3 figures: the fewest is 2', '2 · count figures'],
            ['4.0 × 10<sup>1</sup> cm<sup>3</sup>', '3 · round once'],
          ],
        },
        { p: 'Counted and defined numbers never limit the answer. Three doses of 0.250 g each make 0.750 g: the 3 is exact, so the answer has the three figures of 0.250.' },
        { p: 'And never round away a zero that counts. 2.70 and 2.7 are different claims about how sure you are.' },
      ],
    },
  ],
  tool: '× ÷: fewest figures · + −: fewest decimal places',
  toolNote: 'Round once, at the end, carrying one extra figure in the middle. Counted and defined numbers are exact and never limit the answer.',
  ideas: [
    { title: 'Figures show how sure you are', body: 'The sure digits plus one estimated digit. 5.00 cm has three.' },
    { title: 'Counting zeros', body: 'Leading zeros never count. Zeros after a decimal point do. In a whole number, use scientific notation.' },
    { title: 'Multiply and divide', body: 'Keep as many figures as the number with the fewest.' },
    { title: 'Add and subtract', body: 'Keep as many decimal places as the number with the fewest.' },
    { title: 'Accurate and precise', body: 'Accurate is close to the truth. Precise is close together.' },
  ],
  why: [
    {
      caption: 'Every measurement has an estimated last digit, so it has limits.',
      eq: ['5.00 cm'],
    },
    {
      caption: 'A result built from several measurements can’t be surer than the weakest.',
      eq: ['5.00 × 4.0 × 2.00 → only 2 figures'],
    },
    {
      caption: 'So the answer gets rounded to match its data. No more, no fewer.',
      eq: ['4.0 × 10<sup>1</sup> cm<sup>3</sup>'],
    },
  ],
  spot: {
    clues: [
      { text: 'A calculator answer with many digits', example: '2.7027027…', note: 'round it to match the data' },
      { text: 'Multiplying or dividing measured numbers', example: `108${NB}g ÷ 40.0${NB}mL`, note: 'count figures, keep the fewest' },
      { text: 'Adding or subtracting measured numbers', example: `61.9${NB}g − 52.37${NB}g`, note: 'count decimal places, keep the fewest' },
      { text: 'A whole number ending in zeros', example: '1500 g', note: 'unclear: use 1.5 × 10<sup>3</sup> or 1.50 × 10<sup>3</sup>' },
      { text: 'A comparison with a known value', example: 'the label says 25.00 g, we got 25.62 g', note: 'that is accuracy; see percent error in 1.9' },
    ],
    lookAlikes: [
      { looks: 'how big is the error, as a percent?', use: 'Reading data', why: 'percent error turns accuracy into a number; see Section 1.9.', link: '1.9' },
      { looks: 'a count like 12 eggs or 3 doses', use: 'Units and prefixes', why: 'counted and defined numbers are exact and have no limit; see Section 1.5.', link: '1.5' },
      { looks: 'moving the decimal point in a huge number', use: 'Powers of ten', why: 'scientific notation is the maths of Section 0.1.', link: '0.1' },
    ],
  },
  mistakes: [
    { wrong: `108${NB}g ÷ 40.0${NB}mL = 2.7${NB}g/mL`, right: `108${NB}g ÷ 40.0${NB}mL = 2.70${NB}g/mL`, why: 'The trailing zero is a figure you measured. Dropping it claims less than you know.' },
    { wrong: '0.0025 has 4 significant figures', right: '0.0025 has 2', why: 'Zeros at the start only mark the place of the decimal point.' },
    { wrong: `5.00${NB}cm × 4.0${NB}cm = 20.0${NB}cm<sup>2</sup>`, right: `5.00${NB}cm × 4.0${NB}cm = 2.0${NB}×${NB}10<sup>1</sup>${NB}cm<sup>2</sup>`, why: 'In multiplying, the answer matches the fewest figures, which is 2. 20.0 claims three.' },
    { wrong: `12.35${NB}g + 0.057${NB}g = 12${NB}g`, right: `12.35${NB}g + 0.057${NB}g = 12.41${NB}g`, why: 'Adding is limited by decimal places, not figures. 12.35 has two decimal places, so keep two.' },
    { wrong: `3 doses × 0.250${NB}g = 0.8${NB}g`, right: `3 doses × 0.250${NB}g = 0.750${NB}g`, why: 'The 3 is counted, so it is exact and does not limit the figures.' },
  ],
  examples: [
    {
      id: '1.7-1',
      question: 'A block measures 5.00 cm, 4.0 cm and 2.00 cm. What is its volume, with the right number of significant figures?',
      level: 'easy',
      steps: [
        {
          move: 'Multiply',
          say: 'Volume is length × width × height. Write down the full calculator answer first.',
          lines: [{ left: '<i>V</i>', right: `5.00${NB}cm × 4.0${NB}cm × 2.00${NB}cm`, op: '× × ×' }, { right: `40.00${NB}cm<sup>3</sup>` }],
        },
        {
          move: 'Count figures',
          say: 'The numbers have 3, 2 and 3 figures. When multiplying, the fewest wins.',
          lines: [{ left: 'figures', right: '3, 2, 3: fewest is 2' }],
        },
        {
          move: 'Round',
          say: 'Round once, to two figures. In scientific notation, 4.0 × 10<sup>1</sup> shows both.',
          lines: [{ left: '<i>V</i>', right: `4.0${NB}×${NB}10<sup>1</sup>${NB}cm<sup>3</sup>` }],
        },
      ],
      answer: 'The volume is 4.0 × 10<sup>1</sup> cm<sup>3</sup>.',
    },
    {
      id: '1.7-2',
      question: 'The block (108.2 g) sits in a box (12.35 g) with a label (0.057 g). What is the total mass?',
      level: 'typical',
      steps: [
        {
          move: 'Add',
          say: 'Add all three masses, and write down the full sum.',
          lines: [{ left: 'sum', right: `108.2${NB}g + 12.35${NB}g + 0.057${NB}g`, op: '+' }, { right: `120.607${NB}g` }],
        },
        {
          move: 'Decimal places',
          say: 'For adding, count decimal places, not figures. The fewest is one place, from 108.2.',
          lines: [{ left: 'places', right: '1, 2, 3: fewest is 1' }],
          qs: [['Why not count figures?', 'Adding needs the digits to line up. The tenths place of 108.2 is the last one all three numbers can speak for.']],
        },
        {
          move: 'Round',
          say: 'Round to the tenths. The next digit is 0, so the 6 stays.',
          lines: [{ left: 'mass', right: `120.6${NB}g` }],
        },
      ],
      answer: 'The total mass is 120.6 g.',
    },
    {
      id: '1.7-3',
      question: 'A flask weighs 52.37 g empty and 61.9 g with a liquid in it. The liquid fills 8.50 mL. What is the liquid’s density?',
      level: 'harder',
      steps: [
        {
          move: 'Subtract',
          say: 'The liquid’s mass is the difference. The answer is limited to one decimal place, from 61.9, so it is good to 9.5 g. Keep the extra 3 for now.',
          lines: [{ left: 'mass', right: `61.9${NB}g − 52.37${NB}g`, op: '−' }, { right: `9.53${NB}g` }],
        },
        {
          move: 'Divide',
          say: 'Density is mass ÷ volume. Write down the calculator answer.',
          lines: [{ left: '<i>d</i>', right: `9.53${NB}g ÷ 8.50${NB}mL`, op: '÷ V' }, { right: `1.121${NB}g/mL` }],
        },
        {
          move: 'Round once',
          say: 'The mass was good to 2 figures (9.5 g) and the volume to 3, so the quotient keeps 2.',
          lines: [{ left: '<i>d</i>', right: `1.1${NB}g/mL` }],
          qs: [['Why not round 9.53 to 9.5 first?', 'You can, and here it gives the same 1.1. But rounding early can change the last digit in other problems, so round once at the end.']],
        },
      ],
      answer: 'The liquid’s density is 1.1 g/mL.',
    },
  ],
  realUses: [
    { where: 'Weighing a sample', what: 'A balance reads 12.35 g, then a label of 0.057 g is added. The sum can only claim two decimal places.', eq: `12.35${NB}g + 0.057${NB}g = 12.41${NB}g` },
    { where: 'A sprint', what: 'A 100.0 m race is timed at 9.58 s. The speed has the three figures of the time.', eq: `100.0${NB}m ÷ 9.58${NB}s = 10.4${NB}m/s` },
    { where: 'Fuel use', what: 'A car goes 412 km on 38.5 L. Three figures in the data, so three in the answer.', eq: `412${NB}km ÷ 38.5${NB}L = 10.7${NB}km/L` },
    { where: 'Medicine', what: 'Four doses of 0.250 g make 1.00 g. The 4 is counted, so it doesn’t limit the figures.', eq: `0.250${NB}g × 4 = 1.00${NB}g` },
    { where: 'Painting a floor', what: 'A floor 3.5 m by 2.4 m has an area known to two figures, so the paint is bought to two figures too.', eq: `3.5${NB}m × 2.4${NB}m = 8.4${NB}m<sup>2</sup>` },
  ],
  next: [
    { id: '1.8', note: 'Units cancel in chains, and figures follow the data.' },
    { id: '1.9', note: 'Accuracy as a percent error.' },
    { id: '4.1', note: 'Molar masses and counts follow these rules.' },
  ],
};
