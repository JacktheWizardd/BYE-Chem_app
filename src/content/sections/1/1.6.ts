import type { Particle, SectionContent } from '../../types';

// Section 1.6 · Density (Tro 1.6). A calculation section.
// Running example: a block of aluminium, 5.00 cm × 4.00 cm × 2.00 cm, mass 108 g: density 2.70 g/mL.
// Solids are measured in mL here (1 mL is 1 cm^3, Section 1.5), so every worked line is in units the content test reads.
const NB = ' '; // keeps a number and its unit together
const Al: Particle = { formula: 'Al' };
const H2O: Particle = { formula: 'H2O' };
const many = (p: Particle, n: number) => Array.from({ length: n }, () => p);

export const s1_6: SectionContent = {
  id: '1.6',
  intro: 'Which is heavier, a kilogram of feathers or a kilogram of bricks? Neither, but the bricks take up far less room. This section shows how <b>density</b> puts mass and volume in one number, and what it tells you.',
  reads: [
    {
      id: 'heavy-for-its-size',
      title: 'Heavy for its size',
      gist: 'Why two things the same size can have very different masses.',
      minutes: 2,
      blocks: [
        { p: 'Hold a ball of crumpled paper and a ball of steel the same size. The steel one feels far heavier. Both take up the same space, but the steel packs more matter into it.' },
        { p: 'The measure of how much mass is packed into a given volume is <b>density</b>. Dense things feel heavy for their size, and light things feel light for theirs.' },
        {
          particles: {
            describe: 'Two groups of the same volume. Left, aluminium atoms, labelled 40.0 millilitres of aluminium weighs 108 grams. Right, water molecules, labelled 40.0 millilitres of water weighs 40.0 grams.',
            groups: [{ items: many(Al, 3), label: '40.0 mL of aluminium: 108 g' }, { items: many(H2O, 3), label: '40.0 mL of water: 40.0 g' }],
            ops: [''],
          },
          level: 'particles',
          caption: 'Same volume, different mass: aluminium is denser than water.',
        },
        { key: 'Density: how much mass there is in each unit of volume.' },
        { p: 'Through this section we follow one block of aluminium: 5.00 cm by 4.00 cm by 2.00 cm, with a mass of 108 g. How dense is it?' },
      ],
    },
    {
      id: 'mass-over-volume',
      title: 'Mass over volume',
      gist: 'Density is mass divided by volume, so its unit is a mass per volume.',
      minutes: 2,
      blocks: [
        { p: 'To find the mass in each unit of volume, divide the mass by the volume.' },
        { eq: ['density = <g>mass</g> ÷ volume', '<i>d</i> = <g><i>m</i></g> ÷ <i>V</i>'] },
        { p: 'The unit comes out as a mass per volume. For solids and liquids it is usually grams per millilitre (g/mL) or grams per cubic centimetre (g/cm<sup>3</sup>), which are the same since 1 mL is 1 cm<sup>3</sup>. For our block:' },
        { eq: ['<i>d</i> = 108 g ÷ 40.0 mL = 2.70 g/mL'] },
        {
          frames: [
            { caption: 'The block of aluminium on a balance: its mass.', eq: ['<g>108 g</g>'], particles: { describe: 'Three aluminium atoms labelled 108 grams.', groups: [{ items: many(Al, 3), label: '<g>108 g</g>' }] } },
            { caption: 'Its volume is 40.0 mL. Divide the mass by it.', eq: [`<g>108${NB}g</g> ÷ 40.0${NB}mL`], particles: { describe: 'Three aluminium atoms labelled 108 grams over 40.0 millilitres.', groups: [{ items: many(Al, 3), label: '108 g in 40.0 mL' }] } },
            { caption: 'Every millilitre of aluminium has 2.70 g of mass.', eq: [`<i>d</i> = 2.70${NB}g/mL`], particles: { describe: 'One aluminium atom labelled 2.70 grams in each millilitre.', groups: [{ items: [Al], label: '2.70 g in each mL' }] } },
          ],
          label: 'Picture it',
        },
        { key: 'Density = mass ÷ volume. The unit shows it: g/mL is grams per millilitre.' },
        { p: 'Density does not depend on how much you have, so it is an intensive property (Section 1.3). It identifies a substance: any piece of pure aluminium has this same density.' },
      ],
    },
    {
      id: 'finding-volume',
      title: 'Finding the volume',
      gist: 'Two ways to measure a solid’s volume: by its size, or by the water it pushes aside.',
      minutes: 3,
      blocks: [
        { p: 'Density needs a volume, and a solid’s volume can be found two ways. A regular block, like ours, has a volume you can calculate from its sides.' },
        { eq: ['5.00 cm × 4.00 cm × 2.00 cm = 40.0 cm<sup>3</sup>'] },
        { p: 'An uneven lump, such as a rock, has no simple sides. Instead, drop it into water in a measuring cylinder. It pushes aside its own volume of water, and the level rises by that much. This is <b>displacement</b>.' },
        {
          frames: [
            { caption: 'Water in a cylinder, before: 50.0 mL.', eq: ['50.0 mL'], particles: { describe: 'Water molecules labelled 50.0 millilitres.', groups: [{ items: many(H2O, 3), label: '50.0 mL of water' }] } },
            { caption: 'Drop the block in. It takes up room, so the level rises to 90.0 mL.', eq: ['90.0 mL'], particles: { describe: 'Water molecules and an aluminium atom, labelled 90.0 millilitres together.', groups: [{ items: many(H2O, 3) }, { items: [Al], label: 'block' }], ops: ['+'] } },
            { caption: 'The rise in level is the volume of the block.', eq: ['90.0 mL − 50.0 mL = 40.0 mL'], particles: { describe: 'An aluminium atom labelled 40.0 millilitres.', groups: [{ items: [Al], label: 'block: 40.0 mL' }] } },
          ],
          label: 'Picture it',
        },
        { key: 'Volume of a solid: calculate it from its sides, or find the rise in water level when you drop it in.' },
        { p: 'Both methods agree: 40.0 mL for our block. Read the level before and after, and subtract. The volume is the difference, not the final reading.' },
      ],
    },
    {
      id: 'float-or-sink',
      title: 'Float or sink',
      gist: 'Comparing densities tells you what floats and what sinks.',
      minutes: 2,
      blocks: [
        { p: 'Water has a density of 1.00 g/mL. Anything with a smaller density floats in it, and anything with a larger density sinks.' },
        {
          particles: {
            describe: 'One millilitre of oil, water and aluminium, labelled with their masses: oil 0.92 grams, water 1.00 gram, aluminium 2.70 grams.',
            groups: [{ items: [{ formula: 'C', label: 'oil' }], label: '0.92 g' }, { items: [{ formula: 'H2O', label: 'water' }], label: '1.00 g' }, { items: [{ formula: 'Al', label: 'aluminium' }], label: '2.70 g' }],
            ops: ['<', '<'],
          },
          caption: 'The mass of 1 mL of each. The densest sinks lowest.',
          level: 'particles',
        },
        {
          table: {
            head: ['Substance', 'Density (g/mL)', 'In water'],
            rows: [
              ['cooking oil', '0.92', 'floats'],
              ['ice', '0.917', 'floats'],
              ['water', '1.00', 'is the reference'],
              ['aluminium', '2.70', 'sinks'],
              ['gold', '19.3', 'sinks'],
            ],
          },
        },
        { p: 'So our block sinks, since 2.70 is more than 1.00. Ice floats because it is slightly less dense than liquid water, which is unusual: most solids are denser than their liquid.' },
        { key: 'Density below 1.00 g/mL floats in water. Density above it sinks.' },
      ],
    },
    {
      id: 'using-it-well',
      title: 'Using it well',
      gist: 'One relation, three ways round, and the moves in Example 1.',
      minutes: 3,
      blocks: [
        { p: 'Whenever you have two of mass, volume and density, you can find the third. Rearrange the one relation to get the one you want (Section 0.3).' },
        {
          work: [
            [`<i>d</i> = <g>108${NB}g</g> ÷ 40.0${NB}mL = 2.70${NB}g/mL`, 'mass and volume: density'],
            [`<g><i>m</i></g> = 0.789${NB}g/mL × 250.0${NB}mL = 197${NB}g`, 'density and volume: mass'],
            [`<i>V</i> = <g>197${NB}g</g> ÷ 0.789${NB}g/mL = 2.50${NB}×${NB}10<sup>2</sup>${NB}mL`, 'mass and density: volume'],
          ],
        },
        {
          particles: {
            describe: 'The block of aluminium, 108 grams in 40.0 millilitres: 2.70 grams in each millilitre.',
            groups: [{ items: many(Al, 3), label: '<g>108 g</g> in 40.0 mL: 2.70 g/mL' }],
          },
          level: 'particles',
        },
        { p: 'Check the units each time. g/mL times mL leaves g. g divided by g/mL leaves mL. If you end with the wrong unit, the relation is upside down.' },
        { p: 'Keep as many significant figures as the least precise measurement. 108 g and 40.0 mL both have three, so the density has three: 2.70 g/mL.' },
      ],
    },
  ],
  tool: 'density = <g>mass</g> ÷ volume',
  toolNote: 'The unit is a mass per volume: g/mL, the same as g/cm<sup>3</sup>. Rearranged, mass = density × volume, and volume = mass ÷ density.',
  ideas: [
    { title: 'Density is mass per volume', body: `<i>d</i> = <g><i>m</i></g> ÷ <i>V</i>. Our aluminium block: 108${NB}g ÷ 40.0${NB}mL = 2.70${NB}g/mL.` },
    { title: 'It identifies a substance', body: 'Density does not depend on the amount, so any pure piece of aluminium has the same value.' },
    { title: 'Two ways to find volume', body: 'Calculate it from the sides, or use the rise in water level when you drop the solid in.' },
    { title: 'Float or sink', body: 'Less dense than water (1.00 g/mL) floats. More dense sinks.' },
  ],
  why: [
    {
      caption: 'Pack the same volume with different materials and the masses differ.',
      particles: { describe: 'Aluminium and water molecules, 40.0 millilitres of each.', groups: [{ items: many(Al, 3), label: '108 g' }, { items: many(H2O, 3), label: '40.0 g' }], ops: [''] },
    },
    {
      caption: 'Divide each mass by its volume to compare fairly: grams in each millilitre.',
      eq: [`108${NB}g ÷ 40.0${NB}mL = 2.70${NB}g/mL`],
      particles: { describe: 'Aluminium labelled 2.70 grams per millilitre and water labelled 1.00 gram per millilitre.', groups: [{ items: [Al], label: '2.70 g/mL' }, { items: [H2O], label: '1.00 g/mL' }], ops: ['>'] },
    },
    {
      caption: 'The denser one sinks in the other.',
      particles: { describe: 'Aluminium sinks below water.', groups: [{ items: [Al], label: 'sinks' }, { items: [H2O], label: 'water' }], ops: [''] },
    },
  ],
  spot: {
    clues: [
      { text: 'Mass and volume are both given', example: `108${NB}g and 40.0${NB}mL`, note: 'divide mass by volume' },
      { text: 'A density and one of mass or volume are given', example: `0.789${NB}g/mL, 250.0${NB}mL`, note: 'multiply, or divide, to find the other' },
      { text: 'The question asks if it floats or sinks', example: 'will this cork float in water?', note: 'compare to 1.00 g/mL' },
      { text: 'A unit with a slash and a mass on top', example: 'g/mL, g/cm<sup>3</sup>, kg/L', note: 'a density' },
    ],
    lookAlikes: [
      { looks: 'a mass given, and a number of particles wanted', use: 'The mole and molar mass', why: 'that is grams per mole, not grams per millilitre.', link: '4.1' },
      { looks: 'the density of a gas', use: 'Molar volume, density and molar mass of a gas', why: 'gas densities change with temperature and pressure; see Section 7.4.', link: '7.4' },
      { looks: 'a chain like mL → g → kg', use: 'Converting units step by step', why: 'density can be a factor in a chain; Section 1.8 shows how.', link: '1.8' },
    ],
  },
  mistakes: [
    { wrong: `<i>d</i> = 40.0${NB}mL ÷ 108${NB}g`, right: `<i>d</i> = 108${NB}g ÷ 40.0${NB}mL`, why: 'Mass goes on top: density is mass per volume.' },
    { wrong: 'A heavier object always sinks', right: 'An object sinks if it is denser than the liquid', why: 'A huge ship is heavy but floats, because its shape spreads the mass over a lot of volume.' },
    { wrong: `<i>V</i> = 90.0${NB}mL, the final reading`, right: `<i>V</i> = 90.0${NB}mL − 50.0${NB}mL = 40.0${NB}mL`, why: 'The block’s volume is the rise in the level, not the level itself.' },
    { wrong: `<i>d</i> = 2.70${NB}g`, right: `<i>d</i> = 2.70${NB}g/mL`, why: 'Without the unit the number means nothing: density is a mass per volume.' },
  ],
  examples: [
    {
      id: '1.6-1',
      question: 'A block of aluminium has a mass of 108 g. Dropped into a cylinder, it raises the water level by 40.0 mL. What is its density?',
      level: 'easy',
      steps: [
        {
          move: 'Mass and volume',
          say: 'The mass is given: 108 g. The rise in the level is the volume.',
          lines: [{ left: '<i>m</i>', right: `108${NB}g` }, { left: '<i>V</i>', right: `40.0${NB}mL` }],
        },
        {
          move: 'Divide',
          say: 'Density is mass ÷ volume. Both numbers have three significant figures, so the answer has three.',
          lines: [{ left: '<i>d</i>', right: `108${NB}g ÷ 40.0${NB}mL`, op: '÷ V' }, { right: `2.70${NB}g/mL` }],
          qs: [['Does it sink in water?', 'Yes. 2.70 g/mL is more than 1.00 g/mL.']],
        },
      ],
      answer: 'The aluminium has a density of 2.70 g/mL.',
    },
    {
      id: '1.6-2',
      question: 'Ethanol has a density of 0.789 g/mL. What is the mass of 250.0 mL of it?',
      level: 'typical',
      steps: [
        {
          move: 'Rearrange',
          say: 'Density is mass ÷ volume, so mass is density × volume.',
          lines: [{ left: '<i>m</i>', right: '<i>d</i> × <i>V</i>' }],
        },
        {
          move: 'Multiply',
          say: 'g/mL times mL leaves grams. 0.789 has three significant figures, so keep three.',
          lines: [{ left: '<i>m</i>', right: `0.789${NB}g/mL × 250.0${NB}mL`, op: '× V' }, { right: `197${NB}g` }],
          qs: [['Why is the answer in grams?', 'The mL cancels: g/mL × mL leaves g.']],
        },
      ],
      answer: '250.0 mL of ethanol has a mass of 197 g.',
    },
    {
      id: '1.6-3',
      question: 'A shiny yellow bar has a mass of 96.5 g. It raises the water in a cylinder from 25.0 mL to 30.0 mL. Is it gold (19.3 g/mL) or fool’s gold, pyrite (5.0 g/mL)?',
      level: 'harder',
      steps: [
        {
          move: 'Find the volume',
          say: 'The volume is the rise in the level. Subtract the two readings; the answer has one decimal place, so two significant figures.',
          lines: [{ left: '<i>V</i>', right: `30.0${NB}mL − 25.0${NB}mL`, op: 'rise' }, { right: `5.0${NB}mL` }],
        },
        {
          move: 'Divide',
          say: 'Mass ÷ volume. The volume has only two significant figures, so the density does too.',
          lines: [{ left: '<i>d</i>', right: `96.5${NB}g ÷ 5.0${NB}mL`, op: '÷ V' }, { right: `19${NB}g/mL` }],
          qs: [['Why two figures when 96.5 has three?', 'The answer can’t be more precise than the least precise measurement, 5.0 mL.']],
        },
        {
          move: 'Compare',
          say: 'Gold is 19.3 g/mL and pyrite is 5.0 g/mL. 19 is far from 5.0.',
          lines: [{ left: 'match', right: '19 g/mL fits gold, not pyrite' }],
        },
      ],
      answer: 'The bar’s density is 19 g/mL, which matches gold. Pyrite would have measured about 5.0 g/mL.',
    },
  ],
  realUses: [
    { where: 'Oil and water', what: 'Cooking oil has a density of 0.92 g/mL, so half a litre of it weighs less than half a litre of water, and it floats.', eq: `0.92${NB}g/mL × 500.${NB}mL = 460${NB}g` },
    { where: 'Gold', what: 'Gold is so dense that a thimble-sized piece, about 10 mL, weighs nearly 200 g.', eq: `19.3${NB}g/mL × 10.0${NB}mL = 193${NB}g` },
    { where: 'Mercury', what: 'A litre of liquid mercury has a mass of more than 13 kg, which is why it was used in barometers.', eq: `13.5${NB}g/mL × 1000.${NB}mL = 1.35${NB}×${NB}10<sup>4</sup>${NB}g` },
    { where: 'Sea water', what: 'Salt makes sea water denser than fresh water, so you float more easily in the sea.', eq: `1.03${NB}g/mL × 1000.${NB}mL = 1.03${NB}×${NB}10<sup>3</sup>${NB}g` },
    { where: 'Ice', what: 'Ice is a little less dense than liquid water, so it floats instead of sinking and lakes freeze from the top.', eq: `917${NB}g ÷ 1000.${NB}mL = 0.917${NB}g/mL` },
  ],
  next: [
    { id: '1.8', note: 'Density as a conversion factor between mL and g.' },
    { id: '4.1', note: 'Mass per mole works the same way as mass per volume.' },
    { id: '7.4', note: 'The density of a gas.' },
  ],
};
