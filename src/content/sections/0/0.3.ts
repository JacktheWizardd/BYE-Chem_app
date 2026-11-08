import type { SectionContent } from '../../types';

// Section 0.3 · Rearranging a Formula (Tro Appendix I). Maths section.
// Running example: ethanol, d = m ÷ V, with 19.7 g in 25.0 mL (d = 0.788 g/mL). Turned around three ways: m, V, then
// the same moves on n = m ÷ M and pV = nRT. Every worked number is recomputed by test/content.test.ts.
// Checker note: a work/eq line "a : b = c" has everything up to ": " stripped, so ratios are not used on those lines.
const NB = ' '; // keeps a number and its unit together

export const s0_3: SectionContent = {
  id: '0.3',
  intro: 'Chemistry formulas link three or four quantities, and the one you need is rarely the one the formula gives you. This section shows how to get any letter on its own, with one rule: do the same thing to both sides.',
  reads: [
    {
      id: 'one-formula-three-questions',
      title: 'One formula, three questions',
      gist: 'A formula links quantities, and any one of them can be the unknown.',
      minutes: 2,
      blocks: [
        { p: `A formula is a short rule that links quantities. Density is one: it says how much mass is packed into each millilitre. A 25.0${NB}mL sample of liquid ethanol has a mass of 19.7${NB}g.` },
        {
          frames: [
            { caption: 'Three quantities: a mass, a volume, and the density we want.', eq: [`<i>m</i> = 19.7${NB}g`, `<i>V</i> = 25.0${NB}mL`] },
            { caption: 'Density is mass for each mL, so divide mass by volume.', eq: ['<i>d</i> = <i>m</i> ÷ <i>V</i>'] },
            { caption: 'Put the numbers in. The density of ethanol.', eq: [`19.7${NB}g ÷ 25.0${NB}mL = 0.788${NB}g/mL`] },
          ],
          label: 'Picture it',
        },
        { p: 'The formula is written to give <i>d</i>. But often you know the density and want the mass, or the volume. Then the formula has to be turned around. That is called <b>rearranging</b> it.' },
        {
          table: {
            head: ['You know', 'You want', 'Use'],
            rows: [
              ['<i>m</i> and <i>V</i>', '<i>d</i>', '<i>d</i> = <i>m</i> ÷ <i>V</i>'],
              ['<i>d</i> and <i>V</i>', '<i>m</i>', '<i>m</i> = <i>d</i> × <i>V</i>'],
              ['<i>m</i> and <i>d</i>', '<i>V</i>', '<i>V</i> = <i>m</i> ÷ <i>d</i>'],
            ],
          },
        },
        { key: 'Rearranging gets the letter you want alone on one side.' },
        { p: 'Through this section we follow ethanol, <i>d</i> = 0.788 g/mL, and find each of the other two rows of the table.' },
      ],
    },
    {
      id: 'balance-rule',
      title: 'The balance rule',
      gist: 'Whatever you do to one side of an equals sign, do to the other.',
      minutes: 2,
      blocks: [
        { p: 'An equation is like a balance that is level: both sides weigh the same. If you do something to one side, the balance tips. Do the same to the other side and it is level again.' },
        {
          frames: [
            { caption: 'A level balance: both sides are 6.', eq: ['2 × 3 = 6'] },
            { caption: 'Multiply both sides by 5.', eq: ['(2 × 3) × 5 = 6 × 5'] },
            { caption: 'Both sides are now 30, still level.', eq: ['30 = 30'] },
          ],
          label: 'Picture it',
        },
        { work: [['(2 × 3) × 5 = 6 × 5 = 30', 'both sides become 30']] },
        { key: 'Do the same thing to both sides.' },
        { p: 'That is the only rule. Every move in this section is just it, used to peel things off the letter you want.' },
      ],
    },
    {
      id: 'undo-the-dividing',
      title: 'Undoing a division',
      gist: 'To free a letter that is being divided, multiply both sides.',
      minutes: 3,
      blocks: [
        { p: 'In <i>d</i> = <i>m</i> ÷ <i>V</i>, the mass <i>m</i> is being divided by <i>V</i>. To get <i>m</i> alone, undo the division with its opposite: multiply both sides by <i>V</i>.' },
        {
          frames: [
            { caption: 'Start: m is divided by V.', eq: ['<i>d</i> = <i>m</i> ÷ <i>V</i>'] },
            { caption: 'Multiply both sides by V. On the right, ÷ V and × V cancel.', eq: ['<i>d</i> × <i>V</i> = (<i>m</i> ÷ <i>V</i>) × <i>V</i>'] },
            { caption: 'What is left: m alone.', eq: ['<i>m</i> = <i>d</i> × <i>V</i>'] },
          ],
          label: 'Picture it',
        },
        { p: `Now use it. Ethanol has a density of 0.788${NB}g/mL. What is the mass of 25.0${NB}mL?` },
        { work: [[`0.788${NB}g/mL × 25.0${NB}mL = 19.7${NB}g`, 'the mL cancel']] },
        { key: 'Opposite moves undo each other: × undoes ÷, and ÷ undoes ×.' },
        { p: 'It gives back the 19.7 g we started with, which is a good sign the rearranging was right.' },
      ],
    },
    {
      id: 'free-the-bottom',
      title: 'A letter on the bottom',
      gist: 'To free a letter you are dividing by, multiply it across first, then divide.',
      minutes: 3,
      blocks: [
        { p: 'Now we want the volume. In <i>d</i> = <i>m</i> ÷ <i>V</i> the letter <i>V</i> is underneath, the one doing the dividing. It takes two moves.' },
        {
          frames: [
            { caption: 'Start: V is underneath.', eq: ['<i>d</i> = <i>m</i> ÷ <i>V</i>'] },
            { caption: 'Multiply both sides by V to get it out from underneath.', eq: ['<i>d</i> × <i>V</i> = <i>m</i>'] },
            { caption: 'Divide both sides by d. V is alone.', eq: ['<i>V</i> = <i>m</i> ÷ <i>d</i>'] },
          ],
          label: 'Picture it',
        },
        { p: 'How big is 19.7 g of ethanol, if its density is 0.788 g/mL?' },
        { work: [[`19.7${NB}g ÷ 0.788${NB}g/mL = 25.0${NB}mL`, 'the g cancel']] },
        { key: 'To free a letter from underneath, first multiply both sides by it.' },
        { p: 'Notice that <i>m</i> ÷ <i>d</i> and <i>d</i> ÷ <i>m</i> are different. The units tell you which is right: g ÷ g/mL leaves mL, a volume.' },
      ],
    },
    {
      id: 'adding-subtracting',
      title: 'Adding and subtracting',
      gist: 'Undo a plus with a minus, and a minus with a plus.',
      minutes: 2,
      blocks: [
        { p: 'Chemists measure temperature in kelvin (K) as well as in °C. The two are linked by a formula with an added number. Here <i>T</i> is in kelvin and <i>t</i> in °C.' },
        { eq: ['<i>T</i> = <i>t</i> + 273.15'] },
        { p: 'Liquid nitrogen is at 77 K. What is that in °C? Free <i>t</i> by undoing the plus with a minus.' },
        {
          frames: [
            { caption: 'Start: 273.15 is added to t.', eq: ['<i>T</i> = <i>t</i> + 273.15'] },
            { caption: 'Subtract 273.15 from both sides. On the right, + 273.15 and − 273.15 cancel.', eq: ['<i>T</i> − 273.15 = <i>t</i> + 273.15 − 273.15'] },
            { caption: 'What is left: t alone.', eq: ['<i>t</i> = <i>T</i> − 273.15'] },
          ],
          label: 'Picture it',
        },
        { work: [[`77${NB}K − 273.15${NB}K = −196${NB}°C`, 'subtract']] },
        { key: 'To undo + do −, to undo − do +, to undo × do ÷, and to undo ÷ do ×.' },
      ],
    },
    {
      id: 'longer-formulas',
      title: 'Longer formulas',
      gist: 'The same moves work on formulas with more letters, such as n = m ÷ M and pV = nRT.',
      minutes: 3,
      blocks: [
        { p: 'Chemistry formulas can have more letters, but they still need only the same moves. You will meet this one in Chapter 4: the amount in moles <i>n</i> is the mass <i>m</i> divided by the molar mass <i>M</i>.' },
        { eq: ['<i>n</i> = <i>m</i> ÷ <i>M</i>'] },
        { p: 'Look: <i>M</i> is underneath, just like <i>V</i> was. So it takes the same two moves, and the answer is <i>M</i> = <i>m</i> ÷ <i>n</i>. A sample of 2.50 g that is 0.0150 mol:' },
        { work: [[`2.50${NB}g ÷ 0.0150${NB}mol = 167${NB}g/mol`, '<i>M</i> = <i>m</i> ÷ <i>n</i>']] },
        { p: 'When your letter is multiplied by several others, divide by all of them together. The gas law is <i>pV</i> = <i>nRT</i>, and the temperature <i>T</i> is multiplied by <i>n</i> and <i>R</i>.' },
        {
          frames: [
            { caption: 'Start: T is multiplied by n and R.', eq: ['<i>pV</i> = <i>nRT</i>'] },
            { caption: 'Divide both sides by n and R together, in brackets.', eq: ['<i>pV</i> ÷ (<i>nR</i>) = <i>nRT</i> ÷ (<i>nR</i>)'] },
            { caption: 'On the right, n and R cancel. T is alone.', eq: ['<i>T</i> = <i>pV</i> ÷ (<i>nR</i>)'] },
          ],
          label: 'Picture it',
        },
        { key: 'Work one step at a time, doing the opposite of whatever is attached to your letter.' },
      ],
    },
    {
      id: 'using-it-well',
      title: 'Using it well',
      gist: 'Letters first and numbers last, units as a check, and the moves in Example 1.',
      minutes: 2,
      blocks: [
        { p: 'Rearrange with the letters first. Put the numbers in only at the end. Then you can check the shape of the answer before the arithmetic gets in the way.' },
        { p: 'Carry the units too. If <i>d</i> is in g/mL and <i>V</i> in mL, then <i>d</i> × <i>V</i> comes out in g. If the units come out wrong, the rearranging was wrong.' },
        {
          frames: [
            { caption: 'Ask: which letter do I want?', eq: ['want: <i>m</i>'] },
            { caption: 'Which letters do I know?', eq: ['know: <i>d</i> and <i>V</i>'] },
            { caption: 'Rearrange, then put the numbers in.', eq: ['<i>m</i> = <i>d</i> × <i>V</i>', `0.788${NB}g/mL × 25.0${NB}mL = 19.7${NB}g`] },
          ],
          label: 'Picture it',
        },
        { h: 'The moves in Example 1' },
        {
          work: [
            ['want <i>m</i>; know <i>d</i> and <i>V</i>', '1 · what you want'],
            ['<i>m</i> = <i>d</i> × <i>V</i>', '2 · rearrange'],
            [`0.788${NB}g/mL × 25.0${NB}mL = 19.7${NB}g`, '3 · put the numbers in'],
          ],
        },
      ],
    },
  ],
  tool: 'Do the same thing to both sides',
  toolNote: 'Undo each operation with its opposite: × with ÷, + with −. Letters first, numbers last.',
  ideas: [
    { title: 'The balance rule', body: 'Whatever you do to one side of the equals sign, do to the other.' },
    { title: 'Opposites undo', body: '× undoes ÷, + undoes −. Peel things off the letter you want, one step at a time.' },
    { title: 'A letter underneath', body: 'Multiply both sides by it first: <i>d</i> = <i>m</i> ÷ <i>V</i> becomes <i>V</i> = <i>m</i> ÷ <i>d</i>.' },
    { title: 'Letters first, numbers last', body: 'Rearrange, then substitute, and let the units confirm it.' },
  ],
  why: [
    { caption: 'An equation is a level balance: both sides are equal.', eq: ['<i>d</i> = <i>m</i> ÷ <i>V</i>'] },
    { caption: 'Multiply both sides by V. It stays level, and V leaves the bottom.', eq: ['<i>d</i> × <i>V</i> = <i>m</i>'] },
    { caption: 'Divide both sides by d. It stays level, and now V is alone.', eq: ['<i>V</i> = <i>m</i> ÷ <i>d</i>'] },
  ],
  spot: {
    clues: [
      { text: 'A formula with the letter you want buried', example: '<i>d</i> = <i>m</i> ÷ <i>V</i>, and you want <i>V</i>', note: 'rearrange before you put numbers in' },
      { text: 'Your letter is multiplied or divided', example: '<i>pV</i> = <i>nRT</i>', note: 'undo with the opposite operation' },
      { text: 'Something is added to your letter', example: '<i>T</i> = <i>t</i> + 273.15', note: 'undo with −' },
      { text: 'You know every letter but one', example: '<i>n</i> = <i>m</i> ÷ <i>M</i>, with <i>n</i> and <i>m</i> known', note: 'solve for <i>M</i>' },
    ],
    lookAlikes: [
      { looks: '12 mL in 30 s: find the rate', use: 'Ratios, rates and percent', why: 'with two numbers and no letters to move, a ratio is enough.', link: '0.2' },
      { looks: 'g/mL × mL', use: 'Units travel with numbers', why: 'units tell you whether the rearranging is right.', link: '0.4' },
    ],
  },
  mistakes: [
    { wrong: '<i>m</i> = <i>d</i> ÷ <i>V</i>', right: '<i>m</i> = <i>d</i> × <i>V</i>', why: 'm was divided by V. Undo a division by multiplying, not by dividing again.' },
    { wrong: '<i>V</i> = <i>d</i> ÷ <i>m</i>', right: '<i>V</i> = <i>m</i> ÷ <i>d</i>', why: 'Check with units: g/mL ÷ g leaves 1/mL, not mL. m ÷ d leaves mL.' },
    { wrong: '<i>t</i> = <i>T</i> + 273.15', right: '<i>t</i> = <i>T</i> − 273.15', why: 'T = t + 273.15, so undo the plus with a minus.' },
    { wrong: '<i>T</i> = <i>pV</i> ÷ <i>n</i> × <i>R</i>', right: '<i>T</i> = <i>pV</i> ÷ (<i>nR</i>)', why: 'Both n and R divide. Without brackets only n divides and R multiplies.' },
    { wrong: `0.788${NB}g/mL × 25.0${NB}mL = 19.7${NB}mL`, right: `0.788${NB}g/mL × 25.0${NB}mL = 19.7${NB}g`, why: 'The mL cancel, leaving grams. A mass can’t come out in mL.' },
  ],
  examples: [
    {
      id: '0.3-1',
      question: 'Ethanol has a density of 0.788 g/mL. What is the mass of 25.0 mL of it?',
      level: 'easy',
      steps: [
        {
          move: 'Write the formula',
          say: 'Density is mass for each mL, so mass divided by volume.',
          lines: [{ left: '<i>d</i>', right: '<i>m</i> ÷ <i>V</i>' }],
        },
        {
          move: 'Get m alone',
          say: 'm is being divided by V. Undo that by multiplying both sides by V.',
          lines: [{ left: '<i>d</i> × <i>V</i>', right: '<i>m</i>', op: '× <i>V</i>' }, { left: '<i>m</i>', right: '<i>d</i> × <i>V</i>' }],
        },
        {
          move: 'Put in numbers',
          say: 'Now the numbers go in. The mL cancel and grams are left. Three significant figures, as in the data.',
          lines: [{ left: '<i>m</i>', right: `0.788${NB}g/mL × 25.0${NB}mL`, op: '×' }, { right: `19.7${NB}g` }],
        },
      ],
      answer: '25.0 mL of ethanol has a mass of 19.7 g.',
    },
    {
      id: '0.3-2',
      question: 'A student weighs out 15.0 g of ethanol, density 0.788 g/mL. What volume is that?',
      level: 'typical',
      steps: [
        {
          move: 'Write the formula',
          say: 'The same density formula. This time the unknown is the volume.',
          lines: [{ left: '<i>d</i>', right: '<i>m</i> ÷ <i>V</i>' }],
        },
        {
          move: 'Get V alone',
          say: 'V is underneath. Multiply both sides by V to bring it up, then divide both sides by d.',
          lines: [{ left: '<i>d</i> × <i>V</i>', right: '<i>m</i>', op: '× <i>V</i>' }, { left: '<i>V</i>', right: '<i>m</i> ÷ <i>d</i>', op: '÷ <i>d</i>' }],
          qs: [['Why not just flip the formula over?', 'Flipping works for this formula, but it is the two steps that make it true. The two steps work on any formula.']],
        },
        {
          move: 'Put in numbers',
          say: 'The grams cancel and mL are left. Three significant figures, as in the data.',
          lines: [{ left: '<i>V</i>', right: `15.0${NB}g ÷ 0.788${NB}g/mL`, op: '÷' }, { right: `19.0${NB}mL` }],
        },
      ],
      answer: '15.0 g of ethanol fills 19.0 mL.',
    },
    {
      id: '0.3-3',
      question: 'The gas law is pV = nRT. A gas has p = 1.00 atm, V = 12.3 L and n = 0.500 mol, and R = 0.08206 L·atm/(mol·K). What is its temperature?',
      level: 'harder',
      steps: [
        {
          move: 'Write the formula',
          say: 'The gas law has four letters. We want T, which is multiplied by n and R.',
          lines: [{ left: '<i>pV</i>', right: '<i>nRT</i>' }],
        },
        {
          move: 'Get T alone',
          say: 'Divide both sides by n and R together, in brackets. On the right they cancel.',
          lines: [{ left: '<i>pV</i> ÷ (<i>nR</i>)', right: '<i>T</i>', op: '÷ (<i>nR</i>)' }, { left: '<i>T</i>', right: '<i>pV</i> ÷ (<i>nR</i>)' }],
        },
        {
          move: 'Put in numbers',
          say: 'Brackets round n × R. The units work out: atm × L over mol × L·atm/(mol·K) leaves K. Three significant figures, as in the data.',
          lines: [{ left: '<i>T</i>', right: '1.00 × 12.3 ÷ (0.500 × 0.08206)', op: '÷' }, { right: '3.00 × 10<sup>2</sup>' }],
        },
      ],
      answer: 'The temperature is 3.00 × 10<sup>2</sup> K, which is about 27 °C.',
    },
  ],
  realUses: [
    { where: 'Mass of a liquid', what: 'Ethanol has a density of 0.788 g/mL, so 50.0 mL of it has a mass of 39.4 g.', eq: `0.788${NB}g/mL × 50.0${NB}mL = 39.4${NB}g` },
    { where: 'Volume of a liquid', what: 'Water has a density of 1.00 g/mL, so 36.0 g of water fills 36.0 mL.', eq: `36.0${NB}g ÷ 1.00${NB}g/mL = 36.0${NB}mL` },
    { where: 'Liquid nitrogen', what: 'Nitrogen boils at 77 K, which is a very cold temperature in °C.', eq: `77${NB}K − 273.15${NB}K = −196${NB}°C` },
    { where: 'A gas at room temperature', what: 'At 1.00 atm and 298 K, 24.5 L of gas holds 1.00 mol. Here the gas law is turned around to find n.', eq: '1.00 × 24.5 ÷ (0.08206 × 298) = 1.00' },
    { where: 'A salt solution', what: 'The amount of dissolved stuff is the concentration times the volume: 0.250 L of a 0.100 mol/L solution holds 0.0250 mol.', eq: `0.100${NB}mol/L × 0.250${NB}L = 0.0250${NB}mol` },
  ],
  next: [
    { id: '1.6', note: 'Density, <i>d</i> = <i>m</i> ÷ <i>V</i>, is the formula you just turned around.' },
    { id: '4.1', note: '<i>n</i> = <i>m</i> ÷ <i>M</i> is used in all three directions.' },
    { id: '0.6', note: 'Sometimes rearranging leaves a squared letter: quadratics.' },
    { id: '0.7', note: 'A straight line is a formula you rearrange to read off its slope.' },
  ],
};
