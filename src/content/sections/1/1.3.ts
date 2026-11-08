import type { Particle, SectionContent } from '../../types';

// Section 1.3 · Changes and Properties (Tro 1.4). Descriptive: no calculations.
// Running example: an ice cube that melts (physical), and the melted water split into hydrogen and oxygen (chemical).
const H2O: Particle = { formula: 'H2O' };
const H2: Particle = { formula: 'H2' };
const O2: Particle = { formula: 'O2' };
const many = (p: Particle, n: number) => Array.from({ length: n }, () => p);

export const s1_3: SectionContent = {
  id: '1.3',
  intro: 'Things around you change all the time. This section shows how to tell a change that only alters how matter <i>looks</i> from one that makes something <i>new</i>, and how <b>properties</b> help you decide.',
  reads: [
    {
      id: 'properties',
      title: 'Properties',
      gist: 'The features that describe a substance, and the two kinds chemists use.',
      minutes: 2,
      blocks: [
        { p: 'Picture an ice cube. It is cold, clear and hard, it floats in water, and it melts at 0 °C. Each of these is a <b>property</b>: a feature that describes the substance.' },
        { p: 'A <b>physical property</b> is one you can observe without changing what the substance is: colour, hardness, melting point, how dense it is. A <b>chemical property</b> tells how a substance can turn into something else: iron rusts, hydrogen burns, water does not.' },
        {
          particles: {
            describe: 'Four water molecules standing for an ice cube, labelled ice: cold, clear, hard, melts at 0 degrees Celsius.',
            groups: [{ items: many(H2O, 4), label: 'ice: cold, clear, hard, melts at 0 °C' }],
          },
          level: 'particles',
        },
        {
          table: {
            head: ['Kind', 'It tells you', 'Ice example'],
            rows: [
              ['Physical', 'what it is like', 'clear, floats, melts at 0 °C'],
              ['Chemical', 'what it can turn into', 'does not burn; can be split by electricity'],
            ],
          },
        },
        { key: 'A physical property is seen without changing the substance. A chemical property shows how it can change into another substance.' },
        { p: 'Through this section we follow that ice cube: first it melts, and then we split the melted water.' },
      ],
    },
    {
      id: 'physical-changes',
      title: 'Physical changes',
      gist: 'In a physical change the particles stay the same and only their arrangement changes.',
      minutes: 3,
      blocks: [
        { p: 'Leave the ice cube out. It melts into liquid water, and if you heat it, the water boils into steam. Matter comes in three common <b>states</b>: solid, liquid and gas. Moving between them is a <b>change of state</b>.' },
        {
          frames: [
            {
              caption: 'Ice, a solid: the molecules are packed close together and stay in place.',
              particles: { describe: 'Four water molecules close together, labelled ice (solid).', groups: [{ items: many(H2O, 4), label: 'ice (solid)' }] },
            },
            {
              caption: 'Water, a liquid: still touching, but free to slide past each other.',
              particles: { describe: 'Four water molecules close together, labelled liquid water.', groups: [{ items: many(H2O, 4), label: 'water (liquid)' }] },
            },
            {
              caption: 'Steam, a gas: the molecules are far apart and moving freely.',
              particles: { describe: 'Four water molecules spread apart, labelled steam (gas).', groups: [{ items: [H2O] }, { items: [H2O] }, { items: [H2O] }, { items: [H2O] }], ops: ['', '', ''] },
            },
          ],
          label: 'Picture it',
        },
        { p: 'Look at the molecules: every one is H<sub>2</sub>O in all three pictures. Nothing new was made. Only the way the molecules are arranged and how freely they move changed. That is a <b>physical change</b>.' },
        { eq: ['H<sub>2</sub>O(s) → H<sub>2</sub>O(l) → H<sub>2</sub>O(g)'] },
        { key: 'Physical change: the same substance, arranged differently. Melting, freezing, boiling, dissolving and cutting are physical changes.' },
      ],
    },
    {
      id: 'chemical-changes',
      title: 'Chemical changes',
      gist: 'In a chemical change the atoms regroup, and new substances appear.',
      minutes: 3,
      blocks: [
        { p: 'Now pass electricity through the melted water. Bubbles of two different gases rise: hydrogen and oxygen. Neither one is water. The molecules themselves have been broken and rebuilt, which is a <b>chemical change</b>, also called a <b>chemical reaction</b>.' },
        {
          frames: [
            {
              caption: 'Before: water molecules, each with two H and one O bonded.',
              particles: { describe: 'Two water molecules.', groups: [{ items: many(H2O, 2), label: 'water' }] },
            },
            {
              caption: 'Electricity breaks the bonds. The same atoms regroup as new molecules.',
              eq: ['2 H<sub>2</sub>O(l) → 2 H<sub>2</sub>(g) + O<sub>2</sub>(g)'],
              particles: { describe: 'Two water molecules become two hydrogen molecules and one oxygen molecule.', groups: [{ items: many(H2O, 2) }, { items: many(H2, 2), label: 'hydrogen' }, { items: [O2], label: 'oxygen' }], ops: ['→', '+'] },
            },
          ],
          label: 'Picture it',
        },
        { p: 'The substances before the arrow are the <b>reactants</b>. The substances after it are the <b>products</b>. The atoms are the same, but the molecules are new, and so are the properties: water puts fires out, while hydrogen burns.' },
        { key: 'Chemical change: atoms regroup into different substances, with different properties.' },
      ],
    },
    {
      id: 'telling-them-apart',
      title: 'Telling them apart',
      gist: 'Signs that often point to a chemical change, and why none of them is proof.',
      minutes: 3,
      blocks: [
        { p: 'You can’t see molecules, so you look for signs. These often mean a chemical change: gas bubbles you didn’t add, a colour change, a solid forming in a clear liquid, heat or light given off, a new smell.' },
        {
          table: {
            head: ['Sign', 'Example', 'Careful'],
            rows: [
              ['Bubbles', 'hydrogen from split water', 'boiling water bubbles too'],
              ['Colour change', 'a nail turning orange-brown', 'dye dissolving also colours water'],
              ['Heat or light', 'a burning candle', 'a lamp glows without any reaction'],
              ['New solid', 'a cloudy white solid forms', 'sugar can also look cloudy as it dissolves'],
            ],
          },
        },
        {
          particles: {
            describe: 'Two bubbles side by side. Left: water molecules in a boiling bubble, labelled steam, still water. Right: hydrogen molecules in an electrolysis bubble, labelled new substance.',
            groups: [{ items: many(H2O, 2), label: 'boiling bubble: steam, still H<sub>2</sub>O' }, { items: many(H2, 2), label: 'splitting bubble: H<sub>2</sub>, new' }],
            ops: [''],
          },
          level: 'particles',
        },
        { p: 'Both bubbles look the same, but only one holds a new substance. The signs are clues. The real test asks the particle question: <b>is there a new substance?</b> If every particle is as it was, the change is physical.' },
        { key: 'The test: did new substances with new properties form? Bubbles, colour or heat are only hints.' },
      ],
    },
    {
      id: 'intensive-extensive',
      title: 'Does the amount matter?',
      gist: 'Some properties depend on how much you have, and some do not.',
      minutes: 2,
      blocks: [
        { p: 'Cut the ice cube in two. Each half has half the mass and half the volume, but each half still melts at 0 °C and still floats. Properties split into two groups by that rule.' },
        {
          particles: {
            describe: 'Two groups of water molecules: two molecules and four molecules. The four-molecule group has twice the mass, but both have the same melting point.',
            groups: [{ items: many(H2O, 2), label: 'half: melts at 0 °C' }, { items: many(H2O, 4), label: 'whole: melts at 0 °C' }],
            ops: [''],
          },
          level: 'particles',
        },
        {
          table: {
            head: ['Kind', 'It depends on', 'Examples'],
            rows: [
              ['Extensive', 'how much you have', 'mass, volume, length'],
              ['Intensive', 'what it is, not how much', 'melting point, density, colour'],
            ],
          },
        },
        { p: 'Because intensive properties belong to the substance, chemists use them to identify it. A mystery liquid that freezes at 0 °C and has a density of 1.00 g/mL is very likely water, whether you hold a drop or a bucket.' },
        { key: 'Extensive: depends on the amount. Intensive: the same for any amount, so it identifies the substance.' },
      ],
    },
    {
      id: 'using-it-well',
      title: 'Using it well',
      gist: 'One question that sorts any change, and the moves in the worked example.',
      minutes: 2,
      blocks: [
        { p: 'Whenever you are asked whether a change is physical or chemical, ask one question about the particles: <b>are there new substances after?</b>' },
        {
          work: [
            ['Name what you start with and what you end with.', '1 · the substances before and after'],
            ['Are they the same substance?', '2 · yes: physical; no: chemical'],
            ['Check against the hints.', '3 · bubbles, colour, heat: clues only'],
          ],
        },
        {
          particles: {
            describe: 'The ice cube story in two steps: ice melts to water with the same molecules, then water becomes hydrogen and oxygen.',
            groups: [{ items: many(H2O, 2), label: 'ice → water: physical' }, { items: [H2, O2], label: 'water → H<sub>2</sub> and O<sub>2</sub>: chemical' }],
            ops: [''],
          },
          level: 'particles',
        },
        { p: 'Our ice cube had one of each: melting kept the molecules and changed their arrangement, and the electricity made new ones. Being easy to undo is not the test. A cake can’t be un-baked (chemical), and a smashed glass can’t be un-smashed (physical).' },
      ],
    },
  ],
  ideas: [
    { title: 'Properties describe a substance', body: 'Physical properties are seen without changing it. Chemical properties show how it can turn into something else.' },
    { title: 'Physical change', body: 'The particles stay the same; only their arrangement changes, as when ice melts.' },
    { title: 'Chemical change', body: 'Atoms regroup into new substances with new properties, as when water is split.' },
    { title: 'Intensive and extensive', body: 'Mass and volume depend on the amount. Melting point and density do not, so they identify a substance.' },
  ],
  why: [
    {
      caption: 'Melting leaves every molecule as H<sub>2</sub>O: only the arrangement changes.',
      particles: { describe: 'Four ice molecules and four water molecules, all H2O.', groups: [{ items: many(H2O, 2), label: 'ice' }, { items: many(H2O, 2), label: 'water' }], ops: ['→'] },
    },
    {
      caption: 'Splitting water makes molecules that were not there before.',
      particles: { describe: 'Two water molecules become two hydrogen molecules and one oxygen molecule.', groups: [{ items: many(H2O, 2) }, { items: many(H2, 2) }, { items: [O2] }], ops: ['→', '+'] },
    },
    {
      caption: 'So the test is always: are there new substances?',
      particles: { describe: 'Left, the same molecule before and after, labelled physical. Right, a different molecule after, labelled chemical.', groups: [{ items: [H2O], label: 'same: physical' }, { items: [H2], label: 'new: chemical' }], ops: [''] },
    },
  ],
  spot: {
    clues: [
      { text: 'A change of state', example: 'melting, freezing, boiling, condensing', note: 'physical: same substance' },
      { text: 'Dissolving or cutting', example: 'sugar in tea, chopping wood', note: 'physical: the substance is still there' },
      { text: 'A reaction arrow in an equation', example: '2 H<sub>2</sub>O → 2 H<sub>2</sub> + O<sub>2</sub>', note: 'chemical: reactants and products differ' },
      { text: 'Burning, rusting, rotting, cooking', example: 'a nail rusting', note: 'chemical: new substances form' },
      { text: 'A property that does not change with amount', example: 'melting point, density', note: 'intensive: use it to identify a substance' },
    ],
    lookAlikes: [
      { looks: 'a mixture being separated', use: 'Sorting matter', why: 'pulling a mixture apart is a physical change, and Section 1.2 covers the methods.', link: '1.2' },
      { looks: 'where does the heat or light come from?', use: 'Energy, a first look', why: 'energy released or absorbed is the next section.', link: '1.4' },
      { looks: 'how fast does the change happen?', use: 'Reaction rates', why: 'speed of a reaction is a different question.', link: '17.1' },
    ],
  },
  mistakes: [
    { wrong: 'Boiling water makes hydrogen and oxygen', right: 'Boiling water makes steam, which is still H<sub>2</sub>O', why: 'Boiling is a physical change: the molecules do not break. Splitting them needs electricity.' },
    { wrong: 'Dissolving sugar is a chemical change because the sugar disappears', right: 'Dissolving is a physical change', why: 'Evaporate the water and the sugar is still there, unchanged.' },
    { wrong: 'If you can’t undo it, it is chemical', right: 'Ask whether new substances formed', why: 'Smashing a glass can’t be undone and is physical. Water freezing can be undone and is physical too.' },
    { wrong: 'Bubbles always mean a chemical change', right: 'Bubbles are a hint, not proof', why: 'Boiling water bubbles with steam, which is still H<sub>2</sub>O.' },
    { wrong: 'Density changes if you take more of the substance', right: 'Density is intensive: it does not depend on the amount', why: 'A drop and a bucket of water both have a density of 1.00 g/mL.' },
  ],
  examples: [
    {
      id: '1.3-1',
      question: 'Decide whether each change is physical or chemical: (A) sugar dissolving in tea, (B) a cut banana turning brown, (C) dry ice, solid CO<sub>2</sub>, vanishing into gas.',
      level: 'typical',
      steps: [
        {
          move: 'Before and after',
          say: 'For each, name the substance at the start and the one at the end.',
          lines: [
            { left: 'A', right: 'sugar → sugar, spread in water' },
            { left: 'B', right: 'banana → new brown substances' },
            { left: 'C', right: 'CO<sub>2</sub>(s) → CO<sub>2</sub>(g)' },
          ],
        },
        {
          move: 'Same substance?',
          say: 'If the substance is the same at both ends, the change is physical. If new substances form, it is chemical.',
          lines: [
            { left: 'A', right: 'same: physical' },
            { left: 'B', right: 'new: chemical' },
            { left: 'C', right: 'same: physical' },
          ],
          qs: [['How could you check A?', 'Let the water evaporate. The sugar is left behind, so it never changed into anything else.']],
        },
        {
          move: 'Check hints',
          say: 'The hints agree. Browning is a colour change you can’t undo, and it came with a new smell. Dry ice makes lots of fog, but fog alone is only a sign: the gas is still CO<sub>2</sub>.',
          lines: [{ left: 'B', right: 'colour and smell changed: fits chemical' }],
        },
      ],
      answer: '(A) physical, (B) chemical, (C) physical.',
    },
  ],
  realUses: [
    { where: 'Ice in a drink', what: 'Melting uses up energy from the drink, which is how ice cools it. No new substance forms.', eq: 'H<sub>2</sub>O(s) → H<sub>2</sub>O(l)' },
    { where: 'Rusting', what: 'Iron slowly joins with oxygen from the air to make rust, a new substance that crumbles.', eq: '4 Fe(s) + 3 O<sub>2</sub>(g) → 2 Fe<sub>2</sub>O<sub>3</sub>(s)' },
    { where: 'Baking soda and vinegar', what: 'The fizz is carbon dioxide gas, a new substance made when the two react.', eq: 'NaHCO<sub>3</sub>(s) + CH<sub>3</sub>COOH(aq) → CH<sub>3</sub>COONa(aq) + H<sub>2</sub>O(l) + CO<sub>2</sub>(g)' },
    { where: 'Dry ice at a show', what: 'The fog is cold CO<sub>2</sub> gas chilling the air’s water into droplets. The solid turns straight to gas.', eq: 'CO<sub>2</sub>(s) → CO<sub>2</sub>(g)' },
    { where: 'A gas flame', what: 'Burning regroups methane and oxygen into carbon dioxide and water, releasing heat and light.', eq: 'CH<sub>4</sub>(g) + 2 O<sub>2</sub>(g) → CO<sub>2</sub>(g) + 2 H<sub>2</sub>O(g)' },
  ],
  next: [
    { id: '1.4', note: 'Where the energy goes in a change.' },
    { id: '5.1', note: 'Writing chemical changes as balanced equations.' },
    { id: '2.2', note: 'Why atoms regroup in fixed ratios.' },
  ],
};
