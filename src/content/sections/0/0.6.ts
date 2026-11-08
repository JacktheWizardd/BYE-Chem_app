import type { SectionContent } from '../../types';

// Section 0.6 · Solving a Quadratic (Tro Appendix I). Maths section, 1B and AP.
// Running example: a weak acid (acetic acid), 0.100 mol/L with K_a = 1.8 × 10^-5. The unknown x is how much breaks up:
// x<sup>2</sup> + 1.8 × 10^-5 x − 1.8 × 10^-6 = 0, so x = 1.33 × 10^-3 mol/L. Every worked number is recomputed by test/content.test.ts;
// √ lines have their own `left` because the checker cannot follow a square root.
const NB = ' '; // keeps a number and its unit together

export const s0_6: SectionContent = {
  id: '0.6',
  intro: 'Equilibrium problems often end with an unknown that is squared and also on its own. This section shows how to put such an equation in standard form, solve it with the quadratic formula, and pick the answer that makes chemical sense.',
  reads: [
    {
      id: 'x-twice',
      title: 'When x appears twice',
      gist: 'An unknown that is squared and also on its own makes a quadratic.',
      minutes: 3,
      blocks: [
        { p: `Acetic acid, the acid in vinegar, starts at 0.100${NB}mol/L. A small amount, <i>x</i>, breaks up into H<sup>+</sup> and acetate ions. Its balance is a fraction with <i>x</i> × <i>x</i> on top, and it equals the acid’s constant, <i>K</i><sub>a</sub> = 1.8 × 10<sup>−5</sup>.` },
        { eq: ['<i>x</i><sup>2</sup> ÷ (0.100 − <i>x</i>) = 1.8 × 10<sup>−5</sup>'] },
        { p: 'We can’t just divide to get <i>x</i>, because it is in two places. Use the balance rule from Section 0.3: multiply out, then collect everything on one side.' },
        {
          frames: [
            { caption: 'The balance, with the unknown x.', eq: ['<i>x</i><sup>2</sup> ÷ (0.100 − <i>x</i>) = 1.8 × 10<sup>−5</sup>'] },
            { caption: 'Multiply both sides by the bracket.', eq: ['<i>x</i><sup>2</sup> = 1.8 × 10<sup>−5</sup> × (0.100 − <i>x</i>)'] },
            { caption: 'Multiply out the bracket.', eq: ['<i>x</i><sup>2</sup> = 1.8 × 10<sup>−6</sup> − 1.8 × 10<sup>−5</sup> <i>x</i>'] },
            { caption: 'Move everything to the left, so the right side is zero.', eq: ['<i>x</i><sup>2</sup> + 1.8 × 10<sup>−5</sup> <i>x</i> − 1.8 × 10<sup>−6</sup> = 0'] },
          ],
          label: 'Picture it',
        },
        { key: 'An unknown that is squared and also on its own makes a quadratic equation.' },
        { p: 'Through this section we follow this acid: write its equation in a standard form, solve it, and decide which answer is real.' },
      ],
    },
    {
      id: 'standard-form',
      title: 'Standard form',
      gist: 'Every quadratic can be lined up as <i>a</i><i>x</i><sup>2</sup> + <i>b</i><i>x</i> + <i>c</i> = 0.',
      minutes: 3,
      blocks: [
        { p: 'Mathematicians line quadratics up the same way: the <i>x</i><sup>2</sup> term first, then the <i>x</i> term, then the plain number, all equal to zero. The numbers in front are called <i>a</i>, <i>b</i> and <i>c</i>.' },
        { eq: ['<i>a</i><i>x</i><sup>2</sup> + <i>b</i><i>x</i> + <i>c</i> = 0'] },
        {
          table: {
            head: ['Part', 'Name', 'In our acid'],
            rows: [
              ['in front of <i>x</i><sup>2</sup>', '<i>a</i>', '1'],
              ['in front of <i>x</i>', '<i>b</i>', '1.8 × 10<sup>−5</sup>'],
              ['the plain number', '<i>c</i>', '−1.8 × 10<sup>−6</sup>'],
            ],
          },
        },
        {
          frames: [
            { caption: 'Our equation, from the last read.', eq: ['<i>x</i><sup>2</sup> + 1.8 × 10<sup>−5</sup> <i>x</i> − 1.8 × 10<sup>−6</sup> = 0'] },
            { caption: 'There is a 1 hiding in front of x<sup>2</sup>. That is a.', eq: ['<i>a</i> = 1'] },
            { caption: 'The number in front of x is b.', eq: ['<i>b</i> = 1.8 × 10<sup>−5</sup>'] },
            { caption: 'The plain number is c, and it keeps its minus sign.', eq: ['<i>c</i> = −1.8 × 10<sup>−6</sup>'] },
          ],
          label: 'Picture it',
        },
        { key: 'Read <i>a</i>, <i>b</i> and <i>c</i> with their signs. Here <i>c</i> is negative.' },
        { p: 'If an equation doesn’t equal zero yet, use the balance rule to move everything to one side first.' },
      ],
    },
    {
      id: 'quadratic-formula',
      title: 'The quadratic formula',
      gist: 'One formula solves any quadratic, and it gives two answers.',
      minutes: 4,
      blocks: [
        { p: 'There is a formula that gives <i>x</i> straight from <i>a</i>, <i>b</i> and <i>c</i>.' },
        { key: '<i>x</i> = (−<i>b</i> ± √(<i>b</i><sup>2</sup> − 4<i>ac</i>)) ÷ (2<i>a</i>)' },
        { p: 'The ± means “plus or minus”: do the sum once with + and once with −, so you get two answers. Try it first on small numbers: <i>x</i><sup>2</sup> + 3<i>x</i> − 10 = 0, so <i>a</i> = 1, <i>b</i> = 3 and <i>c</i> = −10.' },
        {
          frames: [
            { caption: 'Work out what is under the root first.', eq: ['3 × 3 − 4 × 1 × (−10) = 9 + 40 = 49'] },
            { caption: 'Take the root.', eq: ['√49 = 7'] },
            { caption: 'Plus gives one answer.', eq: ['(−3 + 7) ÷ 2 = 2'] },
            { caption: 'Minus gives the other.', eq: ['(−3 − 7) ÷ 2 = −5'] },
          ],
          label: 'Picture it',
        },
        { work: [['(−3 + 7) ÷ 2 = 2', 'the plus answer'], ['(−3 − 7) ÷ 2 = −5', 'the minus answer']] },
        { p: 'Check one by putting it back: 2 × 2 + 3 × 2 − 10 = 4 + 6 − 10 = 0. It works. So do −5 and its square.' },
      ],
    },
    {
      id: 'small-numbers',
      title: 'Putting in small numbers',
      gist: 'Powers of ten go into the formula too: work through the weak acid.',
      minutes: 3,
      blocks: [
        { p: 'Back to the acid. Put <i>a</i> = 1, <i>b</i> = 1.8 × 10<sup>−5</sup> and <i>c</i> = −1.8 × 10<sup>−6</sup> in. Start with what is under the root.' },
        { eq: ['(1.8 × 10<sup>−5</sup>) × (1.8 × 10<sup>−5</sup>) − 4 × 1 × (−1.8 × 10<sup>−6</sup>) = 7.200 × 10<sup>−6</sup>'] },
        { p: 'The first part is only 3.24 × 10<sup>−10</sup>, tiny next to 7.2 × 10<sup>−6</sup>. Keep an extra digit in the middle steps and round only the final answer. Now the root, with the calculator’s square-root key, and the two answers.' },
        {
          frames: [
            { caption: 'Under the root.', eq: ['7.200 × 10<sup>−6</sup>'] },
            { caption: 'The root, on a calculator.', eq: ['√(7.200 × 10<sup>−6</sup>) = 2.683 × 10<sup>−3</sup>'] },
            { caption: 'Plus answer.', eq: ['(−1.8 × 10<sup>−5</sup> + 2.683 × 10<sup>−3</sup>) ÷ 2 = 1.33 × 10<sup>−3</sup>'] },
            { caption: 'Minus answer.', eq: ['(−1.8 × 10<sup>−5</sup> − 2.683 × 10<sup>−3</sup>) ÷ 2 = −1.35 × 10<sup>−3</sup>'] },
          ],
          label: 'Picture it',
        },
        { eq: ['(−1.8 × 10<sup>−5</sup> + 2.683 × 10<sup>−3</sup>) ÷ 2 = 1.33 × 10<sup>−3</sup>', '(−1.8 × 10<sup>−5</sup> − 2.683 × 10<sup>−3</sup>) ÷ 2 = −1.35 × 10<sup>−3</sup>'] },
        { key: 'Keep an extra digit in the middle steps. Round only the final answer.' },
      ],
    },
    {
      id: 'which-answer',
      title: 'Which answer is real?',
      gist: 'A quadratic gives two answers, and the chemistry usually allows only one.',
      minutes: 3,
      blocks: [
        { p: 'The ± gave two values: 1.33 × 10<sup>−3</sup> and −1.35 × 10<sup>−3</sup>. But <i>x</i> is how many mol/L of acid broke up. You can’t break up a negative amount, so throw out the negative one.' },
        {
          frames: [
            { caption: 'Two answers from the formula.', eq: ['<i>x</i> = 1.33 × 10<sup>−3</sup>', '<i>x</i> = −1.35 × 10<sup>−3</sup>'] },
            { caption: 'A negative amount of acid is impossible. Cross it out.', eq: ['<i>x</i> = 1.33 × 10<sup>−3</sup>'] },
            { caption: 'What is left is [H<sup>+</sup>], in mol/L.', eq: [`[H<sup>+</sup>] = 1.33 × 10<sup>−3</sup>${NB}mol/L`] },
          ],
          label: 'Picture it',
        },
        { p: 'Another check: <i>x</i> can’t be larger than what you started with. Here 1.33 × 10<sup>−3</sup> is far below 0.100 mol/L. Finally, put <i>x</i> back into the original balance. It should give <i>K</i><sub>a</sub>.' },
        { eq: ['(1.33 × 10<sup>−3</sup>) × (1.33 × 10<sup>−3</sup>) ÷ (0.100 − 1.33 × 10<sup>−3</sup>) = 1.8 × 10<sup>−5</sup>'] },
        { key: 'Throw out any answer that can’t happen: negative, or bigger than what you started with.' },
        { p: 'Since <i>x</i> is the hydrogen-ion concentration, the pH of this acid is −log(1.33 × 10<sup>−3</sup>) = 2.88, using Section 0.5.' },
      ],
    },
    {
      id: 'using-it-well',
      title: 'Using it well',
      gist: 'Watch the signs, know when a shortcut works, and see the moves in Example 1.',
      minutes: 3,
      blocks: [
        { p: 'Most slips are signs. In our acid <i>c</i> is negative, so −4<i>ac</i> comes out positive: a minus times a minus is a plus.' },
        { p: 'There is also a shortcut. When the acid is weak, <i>x</i> is tiny next to the starting amount, so 0.100 − <i>x</i> is almost 0.100. The quadratic disappears.' },
        {
          frames: [
            { caption: 'Take away the tiny x and see how little changes.', eq: ['0.100 − 0.00133 = 0.0987'] },
            { caption: 'So the balance is almost x<sup>2</sup> divided by 0.100.', eq: ['<i>x</i><sup>2</sup> ÷ 0.100 = 1.8 × 10<sup>−5</sup>'] },
            { caption: 'Its root is about 1.34 × 10<sup>−3</sup>, close to the 1.33 × 10<sup>−3</sup> from the formula.', eq: ['<i>x</i> = √(1.8 × 10<sup>−6</sup>) = 1.34 × 10<sup>−3</sup>'] },
          ],
          label: 'Picture it',
        },
        { p: 'Chapter 18 shows when the shortcut is safe. When it isn’t, the formula always works.' },
        { h: 'The moves in Example 1' },
        {
          work: [
            ['<i>x</i><sup>2</sup> + <i>x</i> − 6 = 0', '1 · standard form'],
            ['<i>a</i> = 1, <i>b</i> = 1, <i>c</i> = −6', '2 · read a, b and c'],
            ['1 × 1 − 4 × 1 × (−6) = 25', '3 · under the root'],
            ['(−1 + 5) ÷ 2 = 2', '4 · plus answer (the minus answer is −3)'],
          ],
        },
      ],
    },
  ],
  tool: '<i>x</i> = (−<i>b</i> ± √(<i>b</i><sup>2</sup> − 4<i>ac</i>)) ÷ (2<i>a</i>)',
  toolNote: 'For <i>a</i><i>x</i><sup>2</sup> + <i>b</i><i>x</i> + <i>c</i> = 0. The ± gives two answers; keep the one that makes sense.',
  ideas: [
    { title: 'Standard form', body: 'Line the equation up as <i>a</i><i>x</i><sup>2</sup> + <i>b</i><i>x</i> + <i>c</i> = 0, using the balance rule.' },
    { title: 'Read a, b and c with their signs', body: 'For <i>x</i><sup>2</sup> + 1.8 × 10<sup>−5</sup> <i>x</i> − 1.8 × 10<sup>−6</sup> = 0, <i>c</i> is negative.' },
    { title: 'The formula gives two answers', body: 'The ± means plus once and minus once.' },
    { title: 'Keep the answer that can happen', body: 'A negative amount, or more than you started with, is thrown out.' },
  ],
  why: [
    { caption: 'A quadratic has an x<sup>2</sup> term and an x term, so one step of dividing isn’t enough.', eq: ['<i>a</i><i>x</i><sup>2</sup> + <i>b</i><i>x</i> + <i>c</i> = 0'] },
    { caption: 'The formula is what solving it in general gives. The ± is there because both +3 and −3 square to 9.', eq: ['3 × 3 = 9', '(−3) × (−3) = 9'] },
    { caption: 'So there are usually two answers, and the real problem decides which one to keep.', eq: ['<i>x</i> = 2 or <i>x</i> = −5'] },
  ],
  spot: {
    clues: [
      { text: 'An x<sup>2</sup> and an x in the same equation', example: '<i>x</i><sup>2</sup> + 1.8 × 10<sup>−5</sup> <i>x</i> − 1.8 × 10<sup>−6</sup> = 0', note: 'use the quadratic formula' },
      { text: 'A balance with x × x on top', example: '<i>x</i><sup>2</sup> ÷ (0.100 − <i>x</i>) = 1.8 × 10<sup>−5</sup>', note: 'rearrange to equal zero first' },
      { text: 'A ± in a formula', example: '−<i>b</i> ± √(…)', note: 'two answers: plus once, minus once' },
      { text: 'An amount that can’t be negative', example: '<i>x</i> in mol/L', note: 'throw out the negative answer' },
    ],
    lookAlikes: [
      { looks: 'x is tiny next to the start amount', use: 'Finding equilibrium amounts', why: 'then you may skip the quadratic and use a shortcut.', link: '18.6' },
      { looks: 'Only x, no x<sup>2</sup>', use: 'Rearranging a formula', why: 'without a squared term it is just the balance rule.', link: '0.3' },
    ],
  },
  mistakes: [
    { wrong: 'With <i>x</i><sup>2</sup> + 1.8 × 10<sup>−5</sup> <i>x</i> − 1.8 × 10<sup>−6</sup> = 0, <i>c</i> = 1.8 × 10<sup>−6</sup>', right: '<i>c</i> = −1.8 × 10<sup>−6</sup>', why: 'The sign belongs to the number. Read it with its minus.' },
    { wrong: '1 − 4 × 1 × (−6) = −23', right: '1 − 4 × 1 × (−6) = 25', why: 'The −6 makes −4<i>ac</i> positive: 1 + 24.' },
    { wrong: '−3 + 7 ÷ 2 = 0.5', right: '(−3 + 7) ÷ 2 = 2', why: 'Divide the whole top by 2<i>a</i>, not only the root. Use brackets.' },
    { wrong: '<i>x</i> = (−<i>b</i> ± √<i>b</i><sup>2</sup> − 4<i>ac</i>) ÷ 2<i>a</i>', right: '<i>x</i> = (−<i>b</i> ± √(<i>b</i><sup>2</sup> − 4<i>ac</i>)) ÷ (2<i>a</i>)', why: 'The root covers all of b<sup>2</sup> − 4ac, and 2a divides the whole top.' },
    { wrong: 'Keep both: 1.33 × 10<sup>−3</sup> and −1.35 × 10<sup>−3</sup>', right: 'Keep only 1.33 × 10<sup>−3</sup>', why: 'A negative amount of acid can’t break up.' },
  ],
  examples: [
    {
      id: '0.6-1',
      question: 'In a made-up equilibrium, <i>x</i><sup>2</sup> ÷ (6 − <i>x</i>) = 1, with <i>x</i> in mol/L. Find <i>x</i>.',
      level: 'easy',
      steps: [
        {
          move: 'Standard form',
          say: 'Multiply both sides by (6 − x), then move everything to the left so the right side is zero.',
          lines: [{ left: '<i>x</i><sup>2</sup>', right: '6 − <i>x</i>' }, { left: '<i>x</i><sup>2</sup> + <i>x</i> − 6', right: '0' }],
        },
        {
          move: 'Read the numbers',
          say: 'Read the numbers in front, with their signs. There is a 1 hiding in front of each x.',
          lines: [{ left: '<i>a</i>', right: '1' }, { left: '<i>b</i>', right: '1' }, { left: '<i>c</i>', right: '−6' }],
        },
        {
          move: 'Under the root',
          say: 'b × b − 4ac. Because c is negative, −4ac is positive.',
          lines: [{ left: '<i>b</i><sup>2</sup> − 4<i>ac</i>', right: '1 × 1 − 4 × 1 × (−6)' }, { right: '25' }],
        },
        {
          move: 'Both answers',
          say: 'The root of 25 is 5. Plus gives one answer and minus gives the other.',
          lines: [{ left: '<i>x</i>', right: '(−1 + 5) ÷ 2', op: '+' }, { right: '2' }, { left: '<i>x</i>', right: '(−1 − 5) ÷ 2', op: '−' }, { right: '−3' }],
        },
        {
          move: 'Keep one',
          say: 'x is an amount, so it can’t be negative. Keep 2. Check: 2 × 2 ÷ (6 − 2) = 1.',
          lines: [{ left: '<i>x</i>', right: `2${NB}mol/L` }],
        },
      ],
      answer: '<i>x</i> = 2 mol/L. The other answer, −3, is thrown out.',
    },
    {
      id: '0.6-2',
      question: 'Acetic acid starts at 0.100 mol/L and <i>K</i><sub>a</sub> = 1.8 × 10<sup>−5</sup>. If <i>x</i> breaks up, then <i>x</i><sup>2</sup> ÷ (0.100 − <i>x</i>) = <i>K</i><sub>a</sub>. Find <i>x</i>.',
      level: 'typical',
      steps: [
        {
          move: 'Read the numbers',
          say: 'In standard form the equation is x<sup>2</sup> + 1.8 × 10<sup>−5</sup> x − 1.8 × 10<sup>−6</sup> = 0. The plain number is minus K_a times the starting amount.',
          lines: [{ left: '<i>a</i>', right: '1' }, { left: '<i>b</i>', right: '1.8 × 10<sup>−5</sup>' }, { left: '<i>c</i>', right: '−1.8 × 10<sup>−5</sup> × 0.100' }, { right: '−1.8 × 10<sup>−6</sup>' }],
          qs: [['Where does c come from?', 'Multiplying out Ka × (0.100 − x) gives 1.8 × 10<sup>−6</sup> − 1.8 × 10<sup>−5</sup> x. Moving it all left turns the 1.8 × 10<sup>−6</sup> into minus.']],
        },
        {
          move: 'Under the root',
          say: 'b × b − 4ac. Keep an extra digit in the middle.',
          lines: [{ left: '<i>b</i><sup>2</sup> − 4<i>ac</i>', right: '(1.8 × 10<sup>−5</sup>) × (1.8 × 10<sup>−5</sup>) − 4 × 1 × (−1.8 × 10<sup>−6</sup>)' }, { right: '7.200 × 10<sup>−6</sup>' }],
        },
        {
          move: 'Take the root',
          say: 'Use the square-root key.',
          lines: [{ left: '√(7.200 × 10<sup>−6</sup>)', right: '2.683 × 10<sup>−3</sup>', op: '√ key' }],
        },
        {
          move: 'Both answers',
          say: 'Plus gives one answer, minus gives the other.',
          lines: [{ left: '<i>x</i>', right: '(−1.8 × 10<sup>−5</sup> + 2.683 × 10<sup>−3</sup>) ÷ 2', op: '+' }, { right: '1.33 × 10<sup>−3</sup>' }, { left: '<i>x</i>', right: '(−1.8 × 10<sup>−5</sup> − 2.683 × 10<sup>−3</sup>) ÷ 2', op: '−' }, { right: '−1.35 × 10<sup>−3</sup>' }],
        },
        {
          move: 'Keep one',
          say: 'A negative amount can’t break up. Keep the first answer, which is [H<sup>+</sup>].',
          lines: [{ left: '<i>x</i>', right: `1.33 × 10<sup>−3</sup>${NB}mol/L` }],
        },
      ],
      answer: '<i>x</i> = [H<sup>+</sup>] = 1.33 × 10<sup>−3</sup> mol/L, about 1.3% of the acid.',
    },
    {
      id: '0.6-3',
      question: 'Dinitrogen tetroxide, N<sub>2</sub>O<sub>4</sub>, breaks up into 2 NO<sub>2</sub>. Starting at 0.10 mol/L, with <i>x</i> breaking up, the balance is (2<i>x</i>)<sup>2</sup> ÷ (0.10 − <i>x</i>) = 0.20. Find <i>x</i> and the NO<sub>2</sub> concentration.',
      level: 'harder',
      steps: [
        {
          move: 'Standard form',
          say: 'Each N<sub>2</sub>O<sub>4</sub> that breaks up makes 2 NO<sub>2</sub>, so [NO<sub>2</sub>] is 2x and its square is 4x<sup>2</sup>. Multiply out and move everything left.',
          lines: [{ left: '(2<i>x</i>)<sup>2</sup>', right: '0.20 × (0.10 − <i>x</i>)' }, { left: '4<i>x</i><sup>2</sup> + 0.20<i>x</i> − 0.020', right: '0' }],
        },
        {
          move: 'Read the numbers',
          say: 'This time a is 4, not 1.',
          lines: [{ left: '<i>a</i>', right: '4' }, { left: '<i>b</i>', right: '0.20' }, { left: '<i>c</i>', right: '−0.020' }],
        },
        {
          move: 'Under the root',
          say: 'b × b − 4ac, with 4 and 4 and the minus sign of c.',
          lines: [{ left: '<i>b</i><sup>2</sup> − 4<i>ac</i>', right: '0.20 × 0.20 − 4 × 4 × (−0.020)' }, { right: '0.36' }],
          qs: [['Is 0.60 the root of 0.36?', 'Yes: 0.60 × 0.60 = 0.36.']],
        },
        {
          move: 'Both answers',
          say: 'The root of 0.36 is 0.60. Notice the 2a in the bottom is 2 × 4, not 2.',
          lines: [{ left: '<i>x</i>', right: '(−0.20 + 0.60) ÷ (2 × 4)', op: '+' }, { right: '0.050' }, { left: '<i>x</i>', right: '(−0.20 − 0.60) ÷ (2 × 4)', op: '−' }, { right: '−0.10' }],
        },
        {
          move: 'Keep one',
          say: 'x is an amount, so keep 0.050. The NO<sub>2</sub> concentration is twice x.',
          lines: [{ left: '<i>x</i>', right: `0.050${NB}mol/L` }, { left: '[NO<sub>2</sub>]', right: '2 × 0.050' }, { right: `0.10${NB}mol/L` }],
        },
      ],
      answer: '<i>x</i> = 0.050 mol/L, so [NO<sub>2</sub>] = 0.10 mol/L. Check: 0.10 × 0.10 ÷ (0.10 − 0.050) = 0.20.',
    },
  ],
  realUses: [
    { where: 'Vinegar', what: 'Acetic acid at 0.100 mol/L breaks up to give [H<sup>+</sup>] of 1.33 × 10<sup>−3</sup> mol/L.', eq: '(−1.8 × 10<sup>−5</sup> + 2.683 × 10<sup>−3</sup>) ÷ 2 = 1.33 × 10<sup>−3</sup>' },
    { where: 'Percent broken up', what: 'The acetic acid is only about 1.33% broken up. Most of it stays whole.', eq: '1.33 × 10<sup>−3</sup> ÷ 0.100 × 100 = 1.33%' },
    { where: 'Hydrofluoric acid', what: 'For 0.0500 mol/L HF with <i>K</i><sub>a</sub> = 6.8 × 10<sup>−4</sup>, the quadratic gives <i>x</i> = 5.50 × 10<sup>−3</sup> mol/L.', eq: '(−6.8 × 10<sup>−4</sup> + 1.168 × 10<sup>−2</sup>) ÷ 2 = 5.50 × 10<sup>−3</sup>' },
    { where: 'Dinitrogen tetroxide', what: 'From 0.10 mol/L N<sub>2</sub>O<sub>4</sub> at <i>K</i><sub>c</sub> = 0.20, 0.050 mol/L breaks up.', eq: '(−0.20 + 0.60) ÷ (2 × 4) = 0.050' },
    { where: 'A plain quadratic', what: '<i>x</i><sup>2</sup> + 3<i>x</i> − 10 = 0 gives <i>x</i> = 2 or −5.', eq: '(−3 + 7) ÷ 2 = 2' },
  ],
  next: [
    { id: '18.6', note: 'ICE tables lead straight to quadratics.' },
    { id: '19.4', note: 'The pH of a weak acid solves one.' },
  ],
};
