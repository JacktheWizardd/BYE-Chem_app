import type { Particle, SectionContent } from '../../types';

// Section 1.8 · Converting Units Step by Step (Tro 1.8). A calculation section: the factor-label method.
// Running example: a 750 mL bottle of water: 0.750 L, then 7.50 × 10^2 g, then 0.750 kg.
// Every conversion factor is written (new unit ÷ old unit) so the content test can read it; units cancel in the words beside it.
const NB = ' '; // keeps a number and its unit together
const H2O: Particle = { formula: 'H2O' };
const many = (p: Particle, n: number) => Array.from({ length: n }, () => p);

export const s1_8: SectionContent = {
  id: '1.8',
  intro: 'Chemistry problems are full of units: millilitres, grams, kilograms, moles. This section shows one method, the <b>factor-label method</b>, that turns any unit into any other and shows you if you set it up wrong, because the units cancel.',
  reads: [
    {
      id: 'same-amount-new-unit',
      title: 'Same amount, new unit',
      gist: 'Why changing a unit does not change how much there is.',
      minutes: 2,
      blocks: [
        { p: 'A bottle holds 750 mL of water. A recipe asks for it in litres. The water is the same water. Only the unit we count it in changes.' },
        {
          particles: {
            describe: 'The same three water molecules twice, equal to each other. Left they are labelled 750 millilitres. Right they are labelled 0.750 litres.',
            groups: [{ items: many(H2O, 3), label: '750 mL' }, { items: many(H2O, 3), label: '0.750 L' }],
            ops: ['='],
          },
          level: 'particles',
          caption: 'One bottle, two names.',
        },
        { p: 'We know the link between the units: 1 L is the same amount as 1000 mL. Write that as a fraction, (1 L ÷ 1000 mL), and the fraction equals 1, because its top and bottom are the same amount.' },
        { p: 'Multiplying by 1 never changes an amount. So multiplying by this fraction changes the unit and leaves the water alone. That fraction is a <b>conversion factor</b>.' },
        { key: 'A conversion factor is a fraction equal to 1. Multiplying by it changes the unit, never the amount.' },
        { p: 'Through this section we follow that bottle: 750 mL to litres, then to grams, then to kilograms.' },
      ],
    },
    {
      id: 'writing-a-factor',
      title: 'Writing a factor',
      gist: 'How to turn a fact like 1 L = 1000 mL into the factor that makes the units cancel.',
      minutes: 3,
      blocks: [
        { p: 'Every fact about two units gives you two factors, one the flip of the other. For litres and millilitres:' },
        {
          table: {
            head: ['The fact', 'Factor', 'It turns…'],
            rows: [
              ['1 L is 1000 mL', '(1 L ÷ 1000 mL)', 'mL into L'],
              ['1 L is 1000 mL', '(1000 mL ÷ 1 L)', 'L into mL'],
              ['1 kg is 1000 g', '(1 kg ÷ 1000 g)', 'g into kg'],
              ['1 kg is 1000 g', '(1000 g ÷ 1 kg)', 'kg into g'],
            ],
          },
        },
        { p: 'Which one to use? The one that cancels the unit you start with. Put the unit you want to get rid of on the <i>bottom</i>. A unit that is on the top of one thing and the bottom of another cancels, just like 5 × (3 ÷ 5) = 3.' },
        {
          frames: [
            { caption: 'Start with what you have.', eq: ['750 mL'], particles: { describe: 'Three water molecules labelled 750 millilitres.', groups: [{ items: many(H2O, 3), label: '750 mL' }] } },
            { caption: 'Choose the factor with mL on the bottom. The mL on top and bottom cancel, leaving L.', eq: ['750 mL × (1 L ÷ 1000 mL)'], particles: { describe: 'The same three water molecules, labelled 750 millilitres times 1 litre over 1000 millilitres.', groups: [{ items: many(H2O, 3), label: '750 mL × 1 L ÷ 1000 mL' }] } },
            { caption: 'What is left is the new unit. The number is 750 ÷ 1000.', eq: ['= 0.750 L'], particles: { describe: 'Three water molecules labelled 0.750 litres.', groups: [{ items: many(H2O, 3), label: '0.750 L' }] } },
          ],
          label: 'Picture it',
        },
        { eq: ['750 mL × (1 L ÷ 1000 mL) = 0.750 L'] },
        { key: 'Choose the factor so that the unit you start with is on the bottom. It cancels, and the unit you want is left.' },
        { p: 'If your units do not cancel, the factor is upside down. The units are your check: they tell you the answer is wrong before you even look at the number.' },
      ],
    },
    {
      id: 'chains',
      title: 'A chain of factors',
      gist: 'How to string several factors together, even one built from a measurement like density.',
      minutes: 3,
      blocks: [
        { p: 'Often one factor is not enough. You want kilograms of water but you only know the volume. There is no direct link from mL to kg, so go in steps: mL to g, then g to kg.' },
        { p: 'The first link is not a definition but a measurement: water has a density of 1.00 g/mL. That reads as the fact “1 mL of water has a mass of 1.00 g”, so it is also a conversion factor.' },
        {
          frames: [
            { caption: 'Start with the volume.', eq: ['750 mL'], particles: { describe: 'Three water molecules labelled 750 millilitres.', groups: [{ items: many(H2O, 3), label: '750 mL' }] } },
            { caption: 'Density turns mL into g. The mL cancel.', eq: ['750 mL × 1.00 g/mL = 7.50 × 10<sup>2</sup> g'], particles: { describe: 'Three water molecules labelled 750 grams.', groups: [{ items: many(H2O, 3), label: '750 g' }] } },
            { caption: 'Then 1000 g per kg turns g into kg. The g cancel.', eq: ['7.50 × 10<sup>2</sup> g × (1 kg ÷ 1000 g) = 0.750 kg'], particles: { describe: 'Three water molecules labelled 0.750 kilograms.', groups: [{ items: many(H2O, 3), label: '0.750 kg' }] } },
          ],
          label: 'Picture it',
        },
        { p: 'You can write the whole chain in one line. Each factor cancels the unit before it, and only kg is left:' },
        { eq: ['750 mL × 1.00 g/mL × (1 kg ÷ 1000 g) = 0.750 kg'] },
        { key: 'A chain is several factors in a row. Each one cancels the unit before it, until only the unit you want is left.' },
        { p: 'Density is not the only measured factor you will meet. A price per item, a speed, and a molar mass in Chapter 4 are all “per” facts that work the same way.' },
      ],
    },
    {
      id: 'which-limit-figures',
      title: 'What limits the figures',
      gist: 'Some factors are exact and some are measured, and only the measured ones count.',
      minutes: 2,
      blocks: [
        { p: 'Section 1.7 gave a rule: the answer keeps the figures of the least precise number. A conversion factor can be part of that, or not.' },
        {
          table: {
            head: ['Kind of factor', 'Example', 'Limits the figures?'],
            rows: [
              ['a definition', '1 L is 1000 mL', 'no: it is exact'],
              ['a count', '12 in a dozen', 'no: it is exact'],
              ['a measurement', 'density 1.00 g/mL', 'yes: 3 figures'],
            ],
          },
        },
        {
          particles: {
            describe: 'The bottle, labelled 750 millilitres, 3 figures, and the factor 1.00 grams per millilitre, 3 figures, giving 7.50 times 10 to the 2 grams, 3 figures.',
            groups: [{ items: many(H2O, 3), label: '750 mL (3 figures)' }, { items: many(H2O, 3), label: '7.50 × 10<sup>2</sup> g (3 figures)' }],
            ops: ['→'],
          },
          level: 'particles',
        },
        { p: 'In our chain, 750 mL has three figures and 1.00 g/mL has three. The factor 1000 g per kg is a definition. So the answer, 0.750 kg, has three.' },
        { p: 'Compare the version where the density is only known roughly, as “1 g/mL”. That has one figure, so the whole answer would be 0.8 kg. The units would still cancel, but the answer would claim less.' },
        { key: 'Exact factors (definitions and counts) never limit the figures. Measured ones, like density, do.' },
      ],
    },
    {
      id: 'using-it-well',
      title: 'Using it well',
      gist: 'The three moves for any conversion, and how they run in Example 1.',
      minutes: 2,
      blocks: [
        { p: 'Any conversion, however long, takes the same three moves.' },
        {
          work: [
            ['write the start, and name the unit you want', '1 · start and finish'],
            ['multiply by factors, each with the old unit on the bottom', '2 · set up the chain'],
            ['cancel the units, then work out the number', '3 · calculate'],
          ],
        },
        {
          particles: {
            describe: 'The bottle in three steps: 750 millilitres, then 750 grams, then 0.750 kilograms.',
            groups: [{ items: many(H2O, 2), label: '750 mL' }, { items: many(H2O, 2), label: '750 g' }, { items: many(H2O, 2), label: '0.750 kg' }],
            ops: ['→', '→'],
          },
          level: 'particles',
        },
        { p: 'Write the units on every number and never drop them. They are the whole point: if the leftover unit is not the one you want, find the factor that is upside down.' },
        { p: 'Then check the size. A kilogram is bigger than a gram, so a number in kg should be smaller than the same amount in g. 0.750 is smaller than 750, so that fits.' },
      ],
    },
  ],
  tool: 'start × (new unit ÷ old unit) = answer in the new unit',
  toolNote: 'The factor equals 1. Put the unit you are removing on the bottom so it cancels. Chain factors when no single one links your units.',
  ideas: [
    { title: 'A factor is 1', body: 'Top and bottom are the same amount, so multiplying by the factor changes the unit but never the amount.' },
    { title: 'Cancel the old unit', body: 'Choose the factor with the starting unit on the bottom. If the units do not cancel, flip it.' },
    { title: 'Chain them', body: 'No direct link? Go in steps, such as mL to g to kg. Each factor cancels the one before.' },
    { title: 'Exact or measured', body: 'Definitions and counts are exact. A measured factor like density limits the figures.' },
  ],
  why: [
    {
      caption: 'The water you start with, in the unit you were given.',
      eq: ['750 mL'],
      particles: { describe: 'Three water molecules labelled 750 millilitres.', groups: [{ items: many(H2O, 3), label: '750 mL' }] },
    },
    {
      caption: 'Each factor equals 1, so the water is unchanged and only its name changes.',
      eq: ['750 mL × 1.00 g/mL = 7.50 × 10<sup>2</sup> g'],
      particles: { describe: 'The same three water molecules labelled 750 grams.', groups: [{ items: many(H2O, 3), label: '750 g' }] },
    },
    {
      caption: 'The units cancel until only the one you want is left.',
      eq: ['7.50 × 10<sup>2</sup> g × (1 kg ÷ 1000 g) = 0.750 kg'],
      particles: { describe: 'The same three water molecules labelled 0.750 kilograms.', groups: [{ items: many(H2O, 3), label: '0.750 kg' }] },
    },
  ],
  spot: {
    clues: [
      { text: 'The answer is in a different unit from the data', example: `750${NB}mL → ?${NB}L`, note: 'one factor, with the old unit on the bottom' },
      { text: 'There is no direct link between the two units', example: `750${NB}mL → ?${NB}kg`, note: 'a chain, such as mL → g → kg' },
      { text: 'A “per” fact is given', example: `1.00${NB}g/mL, 0.789${NB}g/mL`, note: 'use it as a conversion factor' },
      { text: 'A prefix on either unit', example: `250${NB}mg → ?${NB}g`, note: 'the factor is the prefix’s power of ten' },
    ],
    lookAlikes: [
      { looks: 'only a prefix changes: kilo, milli, nano', use: 'Units and prefixes', why: 'one power of ten is enough; see Section 1.5.', link: '1.5' },
      { looks: 'grams to moles', use: 'The mole and molar mass', why: 'the factor is the molar mass in g/mol, and the method is the same.', link: '4.1' },
      { looks: 'grams of A to grams of B in a reaction', use: 'Reaction stoichiometry', why: 'a longer chain with a mole ratio from the equation.', link: '5.2' },
    ],
  },
  mistakes: [
    { wrong: `750${NB}mL × (1000${NB}mL ÷ 1${NB}L)`, right: `750${NB}mL × (1${NB}L ÷ 1000${NB}mL)`, why: 'The unit you start with goes on the bottom so it cancels. The wrong way gives mL × mL per L, which is nothing you want.' },
    { wrong: `750${NB}mL ÷ 1.00${NB}g/mL`, right: `750${NB}mL × 1.00${NB}g/mL`, why: 'g/mL has mL on the bottom, so it cancels the mL of the start when you multiply. Dividing leaves mL<sup>2</sup> per g.' },
    { wrong: `(1${NB}L ÷ 100${NB}mL)`, right: `(1${NB}L ÷ 1000${NB}mL)`, why: 'A conversion factor must equal 1: its top and bottom are the same amount. 1 L is 1000 mL, not 100.' },
    { wrong: `0.250${NB}g × (1000${NB}mg ÷ 1${NB}g) = 3${NB}×${NB}10<sup>2</sup>${NB}mg`, right: `0.250${NB}g × (1000${NB}mg ÷ 1${NB}g) = 2.50${NB}×${NB}10<sup>2</sup>${NB}mg`, why: 'The factor 1000 is a definition, so it is exact and does not limit the figures. 0.250 has three.' },
  ],
  examples: [
    {
      id: '1.8-1',
      question: 'A bottle holds 750 mL of water. How many litres is that?',
      level: 'easy',
      steps: [
        {
          move: 'Pick the factor',
          say: 'The fact is 1 L = 1000 mL. We start in mL, so put mL on the bottom to cancel it.',
          lines: [{ left: 'factor', right: `1${NB}L ÷ 1000${NB}mL` }],
        },
        {
          move: 'Multiply',
          say: 'The mL cancel and L is left. 1000 is exact, so keep the three figures of 750.',
          lines: [{ left: '<i>V</i>', right: `750${NB}mL × (1${NB}L ÷ 1000${NB}mL)`, op: '× factor' }, { right: `0.750${NB}L` }],
          qs: [['Why is the number smaller?', 'A litre is a bigger unit than a millilitre, so you need fewer of them.']],
        },
      ],
      answer: '750 mL is 0.750 L.',
    },
    {
      id: '1.8-2',
      question: 'What is the mass in kilograms of 750 mL of water? Water has a density of 1.00 g/mL.',
      level: 'typical',
      steps: [
        {
          move: 'Plan the chain',
          say: 'There is no direct link from mL to kg. Go through grams: density takes mL to g, and 1000 g per kg takes g to kg.',
          lines: [{ left: 'plan', right: 'mL → g → kg' }],
        },
        {
          move: 'mL to g',
          say: 'The density has mL on the bottom, so it cancels the mL we start with. Keep three figures, as in 1.00.',
          lines: [{ left: '<i>m</i>', right: `750${NB}mL × 1.00${NB}g/mL`, op: '× d' }, { right: `7.50${NB}×${NB}10<sup>2</sup>${NB}g` }],
        },
        {
          move: 'g to kg',
          say: 'Now 1000 g per kg, with g on the bottom to cancel.',
          lines: [{ left: '<i>m</i>', right: `7.50${NB}×${NB}10<sup>2</sup>${NB}g × (1${NB}kg ÷ 1000${NB}g)`, op: '× factor' }, { right: `0.750${NB}kg` }],
          qs: [['Why is 1.00 g/mL a factor?', 'It says 1.00 g and 1 mL are the same amount of water. Any fact like that can be turned into a fraction equal to 1.']],
        },
      ],
      answer: '750 mL of water has a mass of 0.750 kg.',
    },
    {
      id: '1.8-3',
      question: 'A tank must hold 2.50 kg of ethanol. How many litres is that? Ethanol has a density of 0.789 g/mL.',
      level: 'harder',
      steps: [
        {
          move: 'Plan the chain',
          say: 'Start with a mass, finish with a volume. Mass to volume needs density, but it works in grams, so: kg → g → mL → L.',
          lines: [{ left: 'plan', right: 'kg → g → mL → L' }],
        },
        {
          move: 'kg to g',
          say: 'The kg goes on the bottom of the factor. 1000 is exact.',
          lines: [{ left: '<i>m</i>', right: `2.50${NB}kg × (1000${NB}g ÷ 1${NB}kg)`, op: '× factor' }, { right: `2.50${NB}×${NB}10<sup>3</sup>${NB}g` }],
        },
        {
          move: 'g to mL',
          say: 'Now density works the other way up. We are going from g to mL, so g must be on the bottom: 1 mL for every 0.789 g.',
          lines: [{ left: '<i>V</i>', right: `2.50${NB}×${NB}10<sup>3</sup>${NB}g × (1${NB}mL ÷ 0.789${NB}g)`, op: '÷ d' }, { right: `3.17${NB}×${NB}10<sup>3</sup>${NB}mL` }],
          qs: [['Why is the density upside down?', 'The density is 0.789 g per 1 mL. To cancel g we need g on the bottom, so we flip it: 1 mL per 0.789 g.']],
        },
        {
          move: 'mL to L',
          say: 'Finish with the litre factor. The answer keeps three figures.',
          lines: [{ left: '<i>V</i>', right: `3.17${NB}×${NB}10<sup>3</sup>${NB}mL × (1${NB}L ÷ 1000${NB}mL)`, op: '× factor' }, { right: `3.17${NB}L` }],
        },
      ],
      answer: '2.50 kg of ethanol fills 3.17 L.',
    },
  ],
  realUses: [
    { where: 'A dose of medicine', what: 'A prescription is written in grams but the tablets are in milligrams. 0.250 g is 250 mg.', eq: `0.250${NB}g × (1000${NB}mg ÷ 1${NB}g) = 2.50${NB}×${NB}10<sup>2</sup>${NB}mg` },
    { where: 'Rain', what: 'A weather report gives rain in millimetres. 25 mm is 2.5 cm.', eq: `25${NB}mm × (1${NB}cm ÷ 10${NB}mm) = 2.5${NB}cm` },
    { where: 'A marathon', what: 'The race is 42.195 km long, so it is 42 195 m.', eq: `42.195${NB}km × (1000${NB}m ÷ 1${NB}km) = 42 195${NB}m` },
    { where: 'A fuel tank', what: 'A tank holds 50.0 L, which is fifty thousand millilitres.', eq: `50.0${NB}L × (1000${NB}mL ÷ 1${NB}L) = 5.00${NB}×${NB}10<sup>4</sup>${NB}mL` },
    { where: 'Red light', what: 'Light of wavelength 500. nm has a wavelength of 5.00 × 10<sup>−7</sup> m.', eq: `500.${NB}nm × (1${NB}m ÷ 10<sup>9</sup>${NB}nm) = 5.00${NB}×${NB}10<sup>−7</sup>${NB}m` },
  ],
  next: [
    { id: '4.1', note: 'Grams to moles is one more factor in a chain.' },
    { id: '5.2', note: 'Stoichiometry is a longer chain with a mole ratio.' },
    { id: '6.1', note: 'Moles per litre is another “per” factor.' },
  ],
};
