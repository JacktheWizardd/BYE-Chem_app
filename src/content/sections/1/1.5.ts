import type { Particle, SectionContent } from '../../types';

// Section 1.5 · Units and Prefixes (Tro 1.6). A calculation section.
// Running example: a 2.0 L bottle of water: 2.0 × 10^3 mL, 2.0 kg, and 20 °C is 293 K.
const NB = ' '; // keeps a number and its unit together
const H2O: Particle = { formula: 'H2O' };
const many = (p: Particle, n: number) => Array.from({ length: n }, () => p);

export const s1_5: SectionContent = {
  id: '1.5',
  intro: 'A number alone says nothing: 2.0 of what? This section shows the units chemists agree on, the <b>SI</b> units, and how a <b>prefix</b> like kilo or milli is just a power of ten.',
  reads: [
    {
      id: 'numbers-need-units',
      title: 'Numbers need units',
      gist: 'Why every measurement has a unit, and why scientists agreed on one system.',
      minutes: 2,
      blocks: [
        { p: 'Say a bottle holds “2.0”. Two litres? Two cups? Two kilograms? A number without a unit tells you nothing, so every measurement in chemistry is a number <i>and</i> a unit.' },
        { p: 'Units only help if everyone uses the same ones. In 1999 a Mars spacecraft was lost because one team sent numbers in metric units and another read them as imperial. To avoid that, scientists agreed on one system: the <b>SI</b> units, short for Système International.' },
        {
          particles: {
            describe: 'Three water molecules standing for a bottle of water, labelled 2.0 litres.',
            groups: [{ items: many(H2O, 3), label: 'a bottle: <b>2.0 L</b> of water' }],
          },
          level: 'particles',
        },
        { key: 'A measurement is a number and a unit. Without the unit it means nothing.' },
        { p: 'Through this section we follow one bottle of water, 2.0 L of it, and write what it holds in several different units.' },
      ],
    },
    {
      id: 'si-base-units',
      title: 'The base units',
      gist: 'The five SI base units that chemistry uses most.',
      minutes: 2,
      blocks: [
        { p: 'SI builds everything from a few <b>base units</b>. Chemistry uses five of them nearly all the time.' },
        {
          table: {
            head: ['Measures', 'Base unit', 'Symbol'],
            rows: [
              ['length', 'metre', 'm'],
              ['mass', 'kilogram', 'kg'],
              ['time', 'second', 's'],
              ['temperature', 'kelvin', 'K'],
              ['amount of substance', 'mole', 'mol'],
            ],
          },
        },
        { p: 'Other units are built by combining these. Speed is metres per second (m/s). Density is mass per volume. The SI unit of volume is the cubic metre, but that is huge, so chemists use the <b>litre</b> (L) instead.' },
        {
          particles: {
            describe: 'The bottle of water as 2.0 kilograms: three water molecules labelled 2.0 kilograms of water.',
            groups: [{ items: many(H2O, 3), label: 'the same bottle: <b>2.0 kg</b> of water' }],
          },
          level: 'particles',
          caption: 'The bottle holds 2.0 L, and the water in it has a mass of 2.0 kg: two different things measured.',
        },
        { key: 'Five base units: metre (m), kilogram (kg), second (s), kelvin (K) and mole (mol).' },
        { p: 'You will meet the mole properly in Chapter 4. For now it is just the unit for amount of substance.' },
      ],
    },
    {
      id: 'prefixes',
      title: 'Prefixes',
      gist: 'A prefix is a power of ten, so it makes a unit bigger or smaller.',
      minutes: 3,
      blocks: [
        { p: 'A kilometre is a thousand metres and a millimetre is a thousandth of a metre. The <b>prefix</b> in front of the unit is a power of ten. Learn the prefix once, and it works on every unit.' },
        {
          table: {
            head: ['Prefix', 'Symbol', 'Power of ten', 'Meaning'],
            rows: [
              ['giga', 'G', '10<sup>9</sup>', 'a billion'],
              ['mega', 'M', '10<sup>6</sup>', 'a million'],
              ['kilo', 'k', '10<sup>3</sup>', 'a thousand'],
              ['centi', 'c', '10<sup>−2</sup>', 'a hundredth'],
              ['milli', 'm', '10<sup>−3</sup>', 'a thousandth'],
              ['micro', 'µ', '10<sup>−6</sup>', 'a millionth'],
              ['nano', 'n', '10<sup>−9</sup>', 'a billionth'],
              ['pico', 'p', '10<sup>−12</sup>', 'a trillionth'],
            ],
          },
        },
        { p: 'To turn a prefixed unit into its base unit, swap the prefix for its power of ten. A millilitre is 10<sup>−3</sup> L, so a 355 mL can holds:' },
        { eq: ['355 × 10<sup>−3</sup> = 0.355 L'] },
        {
          frames: [
            { caption: 'The bottle in litres, the base unit for volume.', eq: ['2.0 L'] },
            { caption: 'Milli means a thousandth, so there are a thousand millilitres in every litre.', eq: ['2.0 × 1000 = 2.0 × 10<sup>3</sup> mL'] },
            { caption: 'Same bottle, same water. Only the unit changed.', eq: ['2.0 L is 2.0 × 10<sup>3</sup> mL'] },
          ],
          label: 'Picture it',
        },
        { key: 'A prefix is a power of ten. kilo = 10<sup>3</sup>, milli = 10<sup>−3</sup>, micro = 10<sup>−6</sup>, nano = 10<sup>−9</sup>.' },
        { p: 'Watch the case. A small m is milli, but a capital M is mega: a mg is a thousandth of a gram, while an Mg is a megagram, a million grams.' },
      ],
    },
    {
      id: 'volume',
      title: 'Volume: litres and cubes',
      gist: 'Why 1 mL and 1 cm<sup>3</sup> are the same amount of space.',
      minutes: 2,
      blocks: [
        { p: 'Volume is how much space something takes up. For a box, multiply length by width by height. A cube 10 cm on each side has a volume of:' },
        { eq: ['10 cm × 10 cm × 10 cm = 1000 cm<sup>3</sup>'] },
        { p: 'That cube is exactly one litre. A litre is 1000 mL, so each millilitre is one cubic centimetre.' },
        {
          frames: [
            { caption: 'A cube 10 cm on each side holds one litre.', eq: ['1 L'] },
            { caption: 'Cut it into 1 cm cubes: there are a thousand of them.', eq: ['1000 cm<sup>3</sup>'] },
            { caption: 'Each little cube holds one millilitre of water.', eq: ['1 cm<sup>3</sup> is 1 mL'] },
          ],
          label: 'Picture it',
        },
        { key: '1 L is 1000 mL, and 1 mL is exactly 1 cm<sup>3</sup>.' },
        { p: 'Because of this, you will see volumes of liquids in mL and volumes of solids in cm<sup>3</sup>. They are the same unit of space.' },
      ],
    },
    {
      id: 'temperature',
      title: 'Temperature: °C and K',
      gist: 'How to move between Celsius and kelvin by adding a fixed number.',
      minutes: 2,
      blocks: [
        { p: 'Everyday temperature is in degrees Celsius (°C), where water freezes at 0 °C and boils at 100 °C. The SI unit is the <b>kelvin</b> (K). A kelvin is the same size as one degree Celsius, but the scale starts at the lowest temperature possible, 0 K, where particles have almost no motion.' },
        { eq: ['<i>T</i> (in K) = <i>T</i> (in °C) + 273.15'] },
        { p: 'Our bottle sits in a room at 25 °C. In kelvin that is:' },
        { eq: ['25 + 273.15 = 298 K'] },
        {
          table: {
            head: ['Temperature', '°C', 'K'],
            rows: [
              ['water freezes', '0', '273.15'],
              ['a room', '25', '298'],
              ['water boils (1 atm)', '100', '373.15'],
              ['nothing can be colder', '−273.15', '0'],
            ],
          },
        },
        {
          particles: {
            describe: 'Water molecules in the bottle at 25 degrees Celsius, which is 298 kelvin.',
            groups: [{ items: many(H2O, 3), label: 'the bottle: 25 °C = 298 K' }],
          },
          level: 'particles',
        },
        { key: 'K = °C + 273.15. A change of 1 °C is a change of 1 K. Kelvin has no degree sign.' },
      ],
    },
    {
      id: 'using-it-well',
      title: 'Using it well',
      gist: 'When to reach for a prefix, and the two moves in Example 1.',
      minutes: 2,
      blocks: [
        { p: 'When a unit has a prefix and you want the base unit, or the other way round, you are using a power of ten. There are two moves.' },
        {
          work: [
            ['milli means 10<sup>−3</sup>, so 1 mL is 10<sup>−3</sup> L', '1 · read the prefix'],
            ['2.0 L × 1000 mL/L = 2.0 × 10<sup>3</sup> mL', '2 · convert'],
          ],
        },
        {
          particles: {
            describe: 'The bottle, labelled 2.0 litres equals 2.0 times 10 to the 3 millilitres.',
            groups: [{ items: many(H2O, 3), label: '2.0 L is 2.0 × 10<sup>3</sup> mL' }],
          },
          level: 'particles',
        },
        { p: 'A smaller unit gives a bigger number: there are more millilitres than litres in the same bottle. If your answer goes the wrong way, the factor is upside down.' },
        { p: 'The factor 1000 mL per litre is <i>exact</i>: it is a definition, not a measurement. So it never limits the figures. 2.0 L has two significant figures, and so does the answer.' },
      ],
    },
  ],
  tool: 'number × (prefix as a power of ten) = number in the base unit',
  toolNote: 'kilo is 10<sup>3</sup>, milli is 10<sup>−3</sup>, micro is 10<sup>−6</sup>, nano is 10<sup>−9</sup>.',
  ideas: [
    { title: 'Number plus unit', body: 'A measurement always has both. The unit says what was measured.' },
    { title: 'SI base units', body: 'Metre, kilogram, second, kelvin and mole. Chemists use litres for volume.' },
    { title: 'A prefix is a power of ten', body: 'Kilo is 10<sup>3</sup> and milli is 10<sup>−3</sup>. Swap the prefix for its power of ten.' },
    { title: '1 mL is 1 cm<sup>3</sup>', body: 'A litre is a 10 cm cube, which is 1000 cm<sup>3</sup>, which is 1000 mL.' },
    { title: 'Kelvin is Celsius plus 273.15', body: 'Same size of step, different zero.' },
  ],
  why: [
    {
      caption: 'The bottle holds 2.0 L of water.',
      eq: ['2.0 L'],
      particles: { describe: 'Three water molecules labelled 2.0 litres.', groups: [{ items: many(H2O, 3), label: '2.0 L' }] },
    },
    {
      caption: 'Milli means a thousandth, so each litre holds a thousand millilitres.',
      eq: ['2.0 × 1000 = 2.0 × 10<sup>3</sup> mL'],
      particles: { describe: 'Three water molecules labelled 2.0 times 10 to the 3 millilitres.', groups: [{ items: many(H2O, 3), label: '2.0 × 10<sup>3</sup> mL' }] },
    },
    {
      caption: 'The water is no different, only the unit. A smaller unit means a bigger number.',
      particles: { describe: 'Three water molecules labelled same water.', groups: [{ items: many(H2O, 3), label: 'same water' }] },
    },
  ],
  spot: {
    clues: [
      { text: 'A prefix letter in front of a unit', example: `355${NB}mL, 5.0${NB}km, 250${NB}mg`, note: 'swap the prefix for its power of ten' },
      { text: 'Two units of the same kind in one problem', example: `a 2.0${NB}L bottle poured into 250${NB}mL cups`, note: 'convert to one unit first' },
      { text: 'A volume of a solid', example: `a cube of 8.0${NB}cm<sup>3</sup>`, note: 'cm<sup>3</sup> and mL are the same size' },
      { text: 'A temperature in a formula for gases or energy', example: `25${NB}°C`, note: 'add 273.15 to get kelvin' },
    ],
    lookAlikes: [
      { looks: 'a longer chain: mL → g → mol', use: 'Converting units step by step', why: 'chaining several factors is Section 1.8.', link: '1.8' },
      { looks: 'g per mL, or g per cm<sup>3</sup>', use: 'Density', why: 'a compound unit joins mass and volume; that is Section 1.6.', link: '1.6' },
      { looks: 'a huge or tiny number like 6.022 × 10<sup>23</sup>', use: 'Powers of ten', why: 'the maths of exponents is Section 0.1.', link: '0.1' },
    ],
  },
  mistakes: [
    { wrong: `1${NB}mg = 1000${NB}g`, right: `1${NB}mg = 10<sup>−3</sup>${NB}g`, why: 'Milli means a thousandth, not a thousand. A milligram is tiny.' },
    { wrong: `There are 100${NB}mL in a litre`, right: `There are 1000${NB}mL in a litre`, why: 'A litre is a 10 cm cube: 10 × 10 × 10 = 1000 cm<sup>3</sup>, and each is 1 mL.' },
    { wrong: `T = 25${NB}°C − 273.15 = −248${NB}K`, right: `T = 25${NB}°C + 273.15 = 298${NB}K`, why: 'Kelvin is bigger than Celsius at the same temperature, so you add.' },
    { wrong: `Mg means milligram`, right: `mg is milligram; Mg is megagram`, why: 'Case matters in unit symbols: small m is milli, capital M is mega.' },
  ],
  examples: [
    {
      id: '1.5-1',
      question: 'A bottle holds 2.0 L of water. How many millilitres is that?',
      level: 'easy',
      steps: [
        {
          move: 'Read the prefix',
          say: 'Milli means a thousandth, so 1 mL is 10<sup>−3</sup> L. That makes 1000 mL in every litre.',
          lines: [{ left: '1 mL', right: '10<sup>−3</sup> L' }],
        },
        {
          move: 'Convert',
          say: 'A mL is smaller than a litre, so the number gets bigger. 1000 is exact, so keep the two figures of 2.0.',
          lines: [{ left: 'V', right: `2.0${NB}L × 1000${NB}mL/L`, op: '× 1000' }, { right: `2.0${NB}×${NB}10<sup>3</sup>${NB}mL` }],
          qs: [['Why not 2000 mL?', 'Written 2000, the zeros could be read as exact digits. 2.0 × 10<sup>3</sup> shows there are two significant figures.']],
        },
      ],
      answer: '2.0 L is 2.0 × 10<sup>3</sup> mL.',
    },
    {
      id: '1.5-2',
      question: 'A red laser pointer gives light of wavelength 635 nm. How many metres is that?',
      level: 'typical',
      steps: [
        {
          move: 'Read the prefix',
          say: 'Nano means a billionth, 10<sup>−9</sup>. A nanometre is a billionth of a metre.',
          lines: [{ left: '1 nm', right: '10<sup>−9</sup> m' }],
        },
        {
          move: 'Convert',
          say: 'Replace nano with 10<sup>−9</sup>. A metre is bigger than a nanometre, so the number gets smaller.',
          lines: [{ left: 'length', right: `635${NB}×${NB}10<sup>−9</sup>${NB}m`, op: '× 10<sup>−9</sup>' }, { right: `6.35${NB}×${NB}10<sup>−7</sup>${NB}m` }],
          qs: [['Why move the point two places?', '635 is 6.35 × 10<sup>2</sup>. Then 10<sup>2</sup> × 10<sup>−9</sup> is 10<sup>−7</sup>.']],
        },
      ],
      answer: '635 nm is 6.35 × 10<sup>−7</sup> m.',
    },
    {
      id: '1.5-3',
      question: 'Put these masses in order, smallest first: 3.0 mg, 0.0025 g and 4.0 × 10<sup>3</sup> µg.',
      level: 'harder',
      steps: [
        {
          move: 'Pick one unit',
          say: 'You can only compare like with like, so change them all to grams. Milli is 10<sup>−3</sup> and micro is 10<sup>−6</sup>.',
          lines: [
            { left: '3.0 mg', right: `3.0${NB}×${NB}10<sup>−3</sup>${NB}g` },
            { left: '0.0025 g', right: `2.5${NB}×${NB}10<sup>−3</sup>${NB}g` },
          ],
        },
        {
          move: 'Convert micro',
          say: 'The microgram needs the power for micro, 10<sup>−6</sup>. Multiply, then add the exponents.',
          lines: [{ left: '4.0 × 10<sup>3</sup> µg', right: `4.0${NB}×${NB}10<sup>3</sup> × 10<sup>−6</sup>${NB}g` }, { right: `4.0${NB}×${NB}10<sup>−3</sup>${NB}g` }],
          qs: [['Why add the exponents?', '10<sup>3</sup> × 10<sup>−6</sup> = 10<sup>3 + (−6)</sup> = 10<sup>−3</sup>: multiplying powers of ten adds the exponents.']],
        },
        {
          move: 'Compare',
          say: 'All three are now written × 10<sup>−3</sup> g, so just compare the front numbers: 2.5, 3.0 and 4.0.',
          lines: [{ left: 'order', right: `2.5 < 3.0 < 4.0${NB}(all × 10<sup>−3</sup>${NB}g)` }],
        },
      ],
      answer: 'From smallest: 0.0025 g, then 3.0 mg, then 4.0 × 10<sup>3</sup> µg.',
    },
  ],
  realUses: [
    { where: 'A soda can', what: 'A can holds 355 mL, which is a little over a third of a litre.', eq: `355${NB}×${NB}10<sup>−3</sup> = 0.355${NB}L` },
    { where: 'A marathon', what: 'The race is 42.195 km long, which is 42 195 metres.', eq: `42.195${NB}×${NB}10<sup>3</sup> = 42 195${NB}m` },
    { where: 'A human hair', what: 'A hair is about 70 µm across, or seven hundred-thousandths of a metre.', eq: `70${NB}×${NB}10<sup>−6</sup> = 7.0${NB}×${NB}10<sup>−5</sup>${NB}m` },
    { where: 'Body temperature', what: 'A healthy body is at about 37 °C, which is the same as 310 K.', eq: `37 + 273.15 = 310${NB}K` },
    { where: 'A dose of medicine', what: 'A 250 mg tablet holds a quarter of a gram of the drug.', eq: `250${NB}×${NB}10<sup>−3</sup> = 0.250${NB}g` },
  ],
  next: [
    { id: '1.6', note: 'Density joins mass and volume in one unit.' },
    { id: '1.8', note: 'Chain several unit changes into one line.' },
    { id: '7.1', note: 'Pressure is measured in a unit built from these.' },
  ],
};
