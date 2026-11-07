import type { ChapterContent } from '../types';

// Chapter 0 · Maths for Chemistry. Focus: fast, calculator-free arithmetic (docs/chapter-map.md).
export const ch00: ChapterContent = {
  num: 0,
  promise: 'The few maths moves chemistry uses, refreshed. No chemistry needed.',
  sections: {
    '0.1': {
      id: '0.1',
      intro: 'Chemistry counts things that are huge, like the molecules in a spoonful of sugar, and tiny, like the mass of one atom. Powers of ten keep those numbers short.',
      tool: 'a × 10<sup>n</sup>, with a between 1 and 10',
      ideas: [
        { title: 'Move the point', body: 'Each place the point moves is one power of ten. 4500 = 4.5 × 10<sup>3</sup>.' },
        { title: 'Small numbers, negative powers', body: '0.000 15 = 1.5 × 10<sup>−4</sup>: the point moves 4 places right.' },
        { title: 'Multiply: add the powers', body: '(2 × 10<sup>3</sup>) × (3 × 10<sup>4</sup>) = 6 × 10<sup>7</sup>.' },
        { title: 'Divide: subtract the powers', body: '(6 × 10<sup>23</sup>) ÷ (2 × 10<sup>20</sup>) = 3 × 10<sup>3</sup>.' },
      ],
      check: [
        { id: '0.1-a', from: '0.1', prompt: 'Write 0.000 15 in scientific notation.', placeholder: 'e.g. 2.3 × 10^-5', spec: { type: 'sci', value: 1.5e-4 }, answer: '1.5 × 10<sup>−4</sup>. Move the point 4 places right, so the power is −4.' },
        { id: '0.1-b', from: '0.1', prompt: 'Write 602 200 in scientific notation.', placeholder: 'e.g. 2.3 × 10^5', spec: { type: 'sci', value: 6.022e5 }, answer: '6.022 × 10<sup>5</sup>. Move the point 5 places left, so the power is 5.' },
      ],
    },
    '0.2': {
      id: '0.2',
      intro: 'Chemical recipes are ratios: 2 hydrogens for every 1 oxygen. A percent is a ratio out of 100.',
      tool: 'percent = part ÷ whole × 100',
      ideas: [
        { title: '“For every”', body: 'Water has 2 H for every 1 O, so 10 O atoms need 20 H atoms.' },
        { title: 'Scale both sides', body: 'Double one side of a ratio and the other side doubles too.' },
        { title: 'Percent to decimal', body: '15% = 15 ÷ 100 = 0.15. Then “15% of” means “0.15 ×”.' },
      ],
      check: [
        { id: '0.2-a', from: '0.2', prompt: 'What is 15% of 40 g?', placeholder: 'number and unit', spec: { type: 'number', target: 6, unit: 'g', slips: [[600, '15% means 0.15 (15 ÷ 100), not 15.'], [0.06, '15% means 0.15 (15 ÷ 100), not 0.0015.'], [40 / 15, '“15% of 40” means 0.15 × 40, not 40 ÷ 15.']], hint: 'Change 15% to a decimal, then multiply.', explain: '0.15 × 40 g = 6 g.' }, answer: '6 g. 0.15 × 40 = 6.' },
        { id: '0.2-b', from: '0.2', prompt: 'Water has 2 H for every 1 O. How many H atoms go with 12 O atoms?', spec: { type: 'count', answer: 24, slips: [[6, 'That halves it. 2 H for <i>every</i> O means double: 24.']], hint: 'Two H for each O: multiply by 2.' }, answer: '24. Two for every one, so 12 × 2.' },
      ],
    },
    '0.3': {
      id: '0.3',
      intro: 'Most chemistry formulas link three letters with × or ÷. To get the one you want on its own, undo what is being done to it.',
      tool: 'd = m ÷ V  ⇄  m = d × V  ⇄  V = m ÷ d',
      ideas: [
        { title: 'Undo ÷ with ×', body: 'In d = m ÷ V, m is divided by V. Multiply both sides by V: m = d × V.' },
        { title: 'Undo × with ÷', body: 'In m = d × V, V is multiplied by d. Divide both sides by d: V = m ÷ d.' },
        { title: 'Same to both sides', body: 'Whatever you do to one side, do to the other, and the formula stays true.' },
      ],
      check: [
        { id: '0.3-a', from: '0.3', prompt: 'Solve d = m ÷ V for m.', placeholder: 'm = …', spec: { type: 'expr', accept: ['d*v', 'dv', 'v*d', 'vd'], slips: [['d/v', 'Don’t divide. V is dividing m, so multiply both sides by V.'], ['v/d', 'Don’t divide. V is dividing m, so multiply both sides by V.']], hint: 'Get m alone: what undoes “÷ V”?', explain: 'm = d × V. Multiplying both sides by V cancels it on the right.' }, answer: 'm = d × V. Multiply both sides by V.' },
        { id: '0.3-b', from: '0.3', prompt: 'Solve d = m ÷ V for V.', placeholder: 'V = …', spec: { type: 'expr', accept: ['m/d'], slips: [['d/m', 'Upside down. From m = d × V, divide both sides by d: V = m ÷ d.'], ['m*d', 'Multiply both sides by V first (m = d × V), then divide by d.'], ['d*m', 'Multiply both sides by V first (m = d × V), then divide by d.']], hint: 'First get m = d × V, then undo the “× d”.', explain: 'V = m ÷ d.' }, answer: 'V = m ÷ d. From m = d × V, divide both sides by d.' },
      ],
    },
    '0.4': {
      id: '0.4',
      intro: 'Units multiply, divide and cancel just like numbers. Write them at every step, and they tell you whether you set the problem up right.',
      tool: '250 mL × (1 L ÷ 1000 mL) = 0.250 L',
      ideas: [
        { title: 'A conversion factor equals 1', body: '1 L and 1000 mL are the same amount, so (1 L ÷ 1000 mL) is just 1.' },
        { title: 'Cancel top with bottom', body: 'mL on top and mL on the bottom cancel, leaving L.' },
        { title: 'Check what is left', body: 'If the unit left over isn’t the one you want, the factor is upside down.' },
      ],
      check: [
        { id: '0.4-a', from: '0.4', prompt: 'Change 250 mL to litres.', placeholder: 'number and unit', spec: { type: 'number', target: 0.25, unit: 'L', slips: [[250000, 'You multiplied by 1000. From mL to L the number gets smaller: divide by 1000.']], hint: 'There are 1000 mL in 1 L.', explain: '250 mL × (1 L ÷ 1000 mL) = 0.250 L.' }, answer: '0.250 L. There are 1000 mL in a litre.' },
        { id: '0.4-b', from: '0.4', prompt: 'How many grams is 2.5 kg?', placeholder: 'number and unit', spec: { type: 'number', target: 2500, unit: 'g', slips: [[0.0025, 'From kg to g the number gets bigger: × 1000.']], hint: 'There are 1000 g in 1 kg.', explain: '2.5 kg × (1000 g ÷ 1 kg) = 2500 g.' }, answer: '2500 g. There are 1000 g in a kilogram.' },
      ],
    },
  },
  review: [
    { id: '0.1-r', from: '0.1', prompt: 'Write 0.0042 in scientific notation.', placeholder: 'e.g. 2.3 × 10^-5', spec: { type: 'sci', value: 4.2e-3 }, answer: '4.2 × 10<sup>−3</sup>.' },
  ],
};
