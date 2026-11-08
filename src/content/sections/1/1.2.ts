import type { Particle, SectionContent } from '../../types';

// Section 1.2 · Sorting Matter (Tro 1.3). PATTERN SECTION: descriptive, no calculations.
// Running example: a glass of salt water, sorted all the way down to the elements in it.
// Descriptive sections have no tool, at most one worked example, and real uses written as statements.
const H2O: Particle = { formula: 'H2O' };
const NaCl: Particle = { formula: 'NaCl' };
const H2: Particle = { formula: 'H2' };
const O2: Particle = { formula: 'O2' };
const N2: Particle = { formula: 'N2' };
const many = (p: Particle, n: number) => Array.from({ length: n }, () => p);

export const s1_2: SectionContent = {
  id: '1.2',
  intro: 'Everything around you is matter, and every sample of it is one of a few kinds. This section shows how to tell an <b>element</b>, a <b>compound</b> and a <b>mixture</b> apart, by asking what its particles are.',
  reads: [
    {
      id: 'one-kind-or-many',
      title: 'One kind, or more?',
      gist: 'The first question that sorts every sample of matter.',
      minutes: 2,
      blocks: [
        { p: 'Stir a spoonful of salt into a glass of water. The salt disappears, but it is still there: you can taste it. Is the result one substance, or more than one?' },
        { p: 'Chemists sort matter by its particles. If every particle is the same kind, the sample is a <b>pure substance</b>. If two or more kinds are mixed together, it is a <b>mixture</b>.' },
        {
          particles: {
            describe: 'Left: four identical water molecules, labelled pure water, one kind. Right: water molecules with two units of sodium chloride among them, labelled salt water, two kinds.',
            groups: [
              { items: many(H2O, 4), label: 'pure water: one kind' },
              { items: [H2O, NaCl, H2O, H2O, NaCl], label: 'salt water: two kinds' },
            ],
            ops: [''],
          },
          level: 'particles',
        },
        { key: 'Pure substance: one kind of particle. Mixture: two or more kinds, each keeping its own identity.' },
        { p: 'Our salt water is a mixture: water molecules with salt spread among them. We will keep coming back to this glass, and sort it all the way down.' },
      ],
    },
    {
      id: 'elements-and-compounds',
      title: 'Elements and compounds',
      gist: 'A pure substance is either one kind of atom, or atoms joined in a fixed recipe.',
      minutes: 3,
      blocks: [
        { p: 'Pure substances come in two kinds. An <b>element</b> is made of only one kind of atom. Helium is single helium atoms. Oxygen gas is O<sub>2</sub> molecules, but both atoms in each one are oxygen, so it is still an element.' },
        { p: 'A <b>compound</b> is two or more elements joined by chemical bonds in a fixed ratio. Every water molecule is two hydrogen atoms and one oxygen atom, H<sub>2</sub>O, in any glass of pure water anywhere.' },
        {
          particles: {
            describe: 'Three groups: helium atoms labelled element, oxygen molecules labelled element, and water molecules labelled compound.',
            groups: [
              { items: many({ formula: 'He' }, 3), label: 'helium: element' },
              { items: many(O2, 2), label: 'O<sub>2</sub>: element' },
              { items: many(H2O, 2), label: 'water: compound' },
            ],
            ops: ['', ''],
          },
          level: 'particles',
        },
        {
          table: {
            head: ['Substance', 'Atoms in it', 'Kind'],
            rows: [
              ['He', 'He only', 'element'],
              ['O<sub>2</sub>', 'O only', 'element'],
              ['H<sub>2</sub>O', 'H and O, always 2 to 1', 'compound'],
              ['NaCl', 'Na and Cl, always 1 to 1', 'compound'],
            ],
          },
        },
        { key: 'Element: one kind of atom. Compound: different atoms bonded in a fixed ratio.' },
        { p: 'A compound is nothing like the elements it is made from. Sodium is a soft metal that fizzes violently in water, and chlorine is a poisonous green gas, yet bonded together they make table salt.' },
      ],
    },
    {
      id: 'two-kinds-of-mixture',
      title: 'Mixed evenly, or not',
      gist: 'Some mixtures look the same everywhere; others show their parts.',
      minutes: 2,
      blocks: [
        { p: 'In salt water the salt spreads out evenly, so every sip tastes equally salty. A mixture that is the same all the way through is <b>homogeneous</b>; another name for it is a <b>solution</b>. Air is one too: mostly nitrogen and oxygen, evenly mixed.' },
        {
          particles: {
            describe: 'Air drawn as six nitrogen molecules and two oxygen molecules, evenly mixed.',
            groups: [{ items: [N2, O2, N2, N2, N2, O2, N2, N2], label: 'air: N<sub>2</sub> and O<sub>2</sub>, evenly mixed' }],
          },
          level: 'particles',
        },
        { p: 'Stir sand into water and it settles to the bottom. Pour oil on water and it floats in a layer. Open a fizzy drink and bubbles of carbon dioxide gas appear. You can see the parts. A mixture whose parts you can see, or that differs from place to place, is <b>heterogeneous</b>.' },
        {
          particles: {
            describe: 'A fizzy drink: water molecules in one group, and carbon dioxide molecules gathered apart in a bubble.',
            groups: [
              { items: many(H2O, 4), label: 'the drink' },
              { items: many({ formula: 'CO2' }, 2), label: 'a bubble of CO<sub>2</sub>' },
            ],
            ops: [''],
          },
          level: 'particles',
        },
        { key: 'Homogeneous: the same all the way through (a solution). Heterogeneous: you can see the parts.' },
      ],
    },
    {
      id: 'separating-mixtures',
      title: 'Separating a mixture',
      gist: 'A mixture can be pulled apart without changing what its parts are.',
      minutes: 3,
      blocks: [
        { p: 'The parts of a mixture keep their own properties, so you can separate them using those properties, with no chemical reaction at all. These are <b>physical</b> methods.' },
        {
          table: {
            head: ['Method', 'It uses', 'It separates'],
            rows: [
              ['Filtering', 'particle size', 'sand from water'],
              ['Distilling', 'boiling point', 'water from salt water'],
              ['Pouring off', 'floating or sinking', 'oil from water'],
              ['A magnet', 'magnetism', 'iron filings from sand'],
            ],
          },
        },
        {
          frames: [
            {
              caption: 'Salt water: water molecules with salt among them.',
              particles: { describe: 'Water molecules with two units of sodium chloride among them.', groups: [{ items: [H2O, NaCl, H2O, H2O, NaCl], label: 'salt water' }] },
            },
            {
              caption: 'Heat it. Water boils at 100 °C but salt only above 1400 °C, so the water leaves as steam.',
              particles: { describe: 'The salt is left behind on the left; the water molecules have moved away as steam on the right.', groups: [{ items: many(NaCl, 2), label: 'salt stays' }, { items: many(H2O, 3), label: 'steam' }], ops: [''] },
            },
            {
              caption: 'Cool the steam and collect it. Both parts are back, unchanged: salt and pure water.',
              particles: { describe: 'Two separate groups: salt, labelled NaCl, and pure water.', groups: [{ items: many(NaCl, 2), label: 'salt, NaCl' }, { items: many(H2O, 3), label: 'pure water' }], ops: [''] },
            },
          ],
          label: 'Picture it',
        },
        { key: 'Separating a mixture is a physical change: every part comes out as it went in.' },
        { p: 'Distilling is how many dry countries turn sea water into drinking water.' },
      ],
    },
    {
      id: 'breaking-compounds',
      title: 'Breaking down a compound',
      gist: 'Only a chemical reaction can split a compound, and nothing can split an element.',
      minutes: 3,
      blocks: [
        { p: 'No filter or boiling splits water into hydrogen and oxygen: boil it and you get steam, which is still H<sub>2</sub>O. To split it, the bonds inside each molecule have to break. That takes a <b>chemical</b> change, such as passing electricity through the water.' },
        {
          frames: [
            {
              caption: 'Pure water: every molecule is H<sub>2</sub>O.',
              particles: { describe: 'Two water molecules.', groups: [{ items: many(H2O, 2), label: 'water' }] },
            },
            {
              caption: 'Electricity breaks the bonds, and the atoms regroup as two new substances.',
              eq: ['2 H<sub>2</sub>O → 2 H<sub>2</sub> + O<sub>2</sub>'],
              particles: { describe: 'Two water molecules become two hydrogen molecules and one oxygen molecule.', groups: [{ items: many(H2O, 2) }, { items: many(H2, 2), label: 'hydrogen' }, { items: [O2], label: 'oxygen' }], ops: ['→', '+'] },
            },
            {
              caption: 'No reaction breaks hydrogen or oxygen into anything simpler: they are elements.',
              particles: { describe: 'Hydrogen molecules and an oxygen molecule, each labelled element.', groups: [{ items: many(H2, 2), label: 'H<sub>2</sub>: element' }, { items: [O2], label: 'O<sub>2</sub>: element' }], ops: [''] },
            },
          ],
          label: 'Picture it',
        },
        { key: 'A chemical reaction can break a compound into simpler substances. Nothing breaks an element down further.' },
        { p: 'That is the test that tells a compound from an element. It also shows the two kinds of change you will meet in Section 1.3: a physical change leaves the particles as they were; a chemical change makes new ones.' },
      ],
    },
    {
      id: 'using-it-well',
      title: 'Using it well',
      gist: 'Three questions that sort any sample, and the moves in the worked example.',
      minutes: 2,
      blocks: [
        { p: 'Ask three questions, in order. The first splits pure substances from mixtures; the second splits elements from compounds; the third sorts mixtures.' },
        {
          work: [
            ['Is there only one kind of particle?', '1 · no: a mixture'],
            ['Can a reaction break it into simpler substances?', '2 · yes: compound; no: element'],
            ['Is the mixture the same all the way through?', '3 · yes: homogeneous'],
          ],
        },
        {
          table: {
            head: ['Sample', 'One kind?', 'Breaks down?', 'Kind'],
            rows: [
              ['Helium', 'yes', 'no', 'element'],
              ['Water', 'yes', 'yes', 'compound'],
              ['Salt water', 'no', '', 'homogeneous mixture'],
              ['Sand in water', 'no', '', 'heterogeneous mixture'],
            ],
          },
        },
        {
          particles: {
            describe: 'The glass of salt water sorted: water molecules labelled compound, plus sodium chloride labelled compound.',
            groups: [{ items: many(H2O, 2), label: 'water: compound' }, { items: [NaCl], label: 'salt: compound' }],
          },
          caption: 'Our glass: two compounds, mixed evenly. A homogeneous mixture.',
          level: 'particles',
        },
        { p: 'A formula helps. One element symbol (He, O<sub>2</sub>) means an element; two or more (H<sub>2</sub>O, NaCl) means a compound. A name with “and” in it, or a percentage, usually means a mixture.' },
      ],
    },
  ],
  ideas: [
    { title: 'One kind or more', body: 'A pure substance has one kind of particle. A mixture has two or more, each unchanged.' },
    { title: 'Element or compound', body: 'An element has one kind of atom. A compound bonds different atoms in a fixed ratio, like H<sub>2</sub>O.' },
    { title: 'Two kinds of mixture', body: 'A homogeneous mixture (a solution) is the same throughout; a heterogeneous one shows its parts.' },
    { title: 'Two kinds of change', body: 'Mixtures separate by physical means. A compound needs a chemical reaction to break down.' },
  ],
  why: [
    {
      caption: 'Salt water holds two kinds of particle, mixed together.',
      particles: { describe: 'Water molecules with sodium chloride among them.', groups: [{ items: [H2O, NaCl, H2O, H2O], label: 'salt water' }] },
    },
    {
      caption: 'Boiling pulls them apart unchanged, so salt water was a mixture.',
      particles: { describe: 'Water and salt in two separate groups.', groups: [{ items: many(H2O, 3), label: 'water' }, { items: [NaCl], label: 'salt' }], ops: [''] },
    },
    {
      caption: 'Electricity splits water into new substances, so water is a compound.',
      particles: { describe: 'Two water molecules become two hydrogen molecules and one oxygen molecule.', groups: [{ items: many(H2O, 2) }, { items: many(H2, 2) }, { items: [O2] }], ops: ['→', '+'] },
    },
    {
      caption: 'Hydrogen and oxygen split no further: they are elements.',
      particles: { describe: 'Hydrogen molecules and an oxygen molecule, each labelled element.', groups: [{ items: many(H2, 2), label: 'element' }, { items: [O2], label: 'element' }], ops: [''] },
    },
  ],
  spot: {
    clues: [
      { text: 'A formula with one element symbol', example: 'O<sub>2</sub>, Fe, He', note: 'an element' },
      { text: 'A formula with two or more symbols', example: 'H<sub>2</sub>O, NaCl, CO<sub>2</sub>', note: 'a compound' },
      { text: 'A percentage, or “and” in the name', example: 'salt water with 3% salt', note: 'a mixture: the amounts can vary' },
      { text: 'Layers or bits you can see', example: 'oil on water, sand in water', note: 'a heterogeneous mixture' },
      { text: 'Looks like one thing, but made by mixing', example: 'sugar water, air, brass', note: 'a homogeneous mixture (a solution)' },
    ],
    lookAlikes: [
      { looks: 'ice melting, water boiling', use: 'Changes and properties', why: 'that is a change of state, not a new substance: it is still H<sub>2</sub>O.', link: '1.3' },
      { looks: 'why water is always 2 H to 1 O', use: 'The laws that pointed to atoms', why: 'the fixed ratio in a compound is a law, and atoms explain it.', link: '2.2' },
      { looks: 'how much salt is in each litre?', use: 'Molarity', why: 'that measures how concentrated a solution is.', link: '6.1' },
    ],
  },
  mistakes: [
    { wrong: 'O<sub>2</sub> is a compound', right: 'O<sub>2</sub> is an element', why: 'Two atoms, but both are oxygen. A compound needs two or more different elements.' },
    { wrong: 'Salt water is a compound', right: 'Salt water is a mixture', why: 'Boil off the water and the salt is left, and the amount of salt can be anything.' },
    { wrong: 'Air is a pure substance', right: 'Air is a homogeneous mixture', why: 'It looks like one thing, but it holds N<sub>2</sub>, O<sub>2</sub>, argon and more, in amounts that vary.' },
    { wrong: 'Hydrogen mixed with oxygen is water', right: 'Water is hydrogen and oxygen bonded as H<sub>2</sub>O', why: 'Mixed, the two gases stay gases. Only a reaction joins them into a new substance.' },
  ],
  examples: [
    {
      id: '1.2-1',
      question: 'Brass is made by melting copper and zinc together. Is it an element, a compound or a mixture?',
      level: 'typical',
      steps: [
        {
          move: 'One kind?',
          say: 'Look at the particles. Brass holds copper atoms and zinc atoms: two kinds of atom, so it isn’t an element.',
          lines: [{ left: 'particles', right: 'Cu atoms and Zn atoms' }],
        },
        {
          move: 'Fixed recipe?',
          say: 'A compound has a fixed ratio. Brass can be made with a little zinc or a lot, so it is a mixture, not a compound.',
          lines: [{ left: 'zinc', right: 'from about 5% to 40%: it varies' }],
          qs: [['How do you know it isn’t a compound?', 'A compound always has the same ratio, like H<sub>2</sub>O’s 2 to 1. Brass doesn’t.']],
        },
        {
          move: 'Same throughout?',
          say: 'A piece of brass looks the same all the way through, so it is a homogeneous mixture.',
          lines: [{ left: 'looks', right: 'the same all through' }],
        },
      ],
      answer: 'Brass is a homogeneous mixture of copper and zinc. A metal mixture like this is called an <b>alloy</b>.',
    },
  ],
  realUses: [
    { where: 'Drinking water from the sea', what: 'Desalination plants boil or filter sea water and leave the salt behind: separating a mixture.', eq: 'sea water → water + salt (distilling)' },
    { where: 'Oxygen for hospitals', what: 'Air is cooled until it turns liquid, then warmed so its parts boil off one at a time.', eq: 'liquid air → N<sub>2</sub> + O<sub>2</sub> + Ar (boiling off in turn)' },
    { where: 'Panning for gold', what: 'Gold is far denser than sand, so swirling river gravel in water lets the gold settle out.', eq: 'gravel → gold + sand (settling)' },
    { where: 'Hydrogen fuel', what: 'Electricity splits water into hydrogen and oxygen: water is a compound.', eq: '2 H<sub>2</sub>O → 2 H<sub>2</sub> + O<sub>2</sub> (electricity)' },
    { where: 'Blood tests', what: 'Spinning a tube of blood fast makes the heavier cells sink below the pale plasma.', eq: 'blood → plasma + cells (spinning)' },
  ],
  next: [
    { id: '1.3', note: 'Physical and chemical changes: the two tests used here.' },
    { id: '2.2', note: 'Why a compound always has the same ratio.' },
    { id: '6.1', note: 'How much is dissolved in a solution.' },
  ],
};
