import type { Particle, SectionContent } from '../../types';

// Section 1.1 · What Chemistry Looks At (Tro 1.1, 1.2). Descriptive: no calculations.
// Running example: a 250 g glass of water, seen three ways, then one question tested: does ice weigh the same when it melts?
const H2O: Particle = { formula: 'H2O' };
const many = (p: Particle, n: number) => Array.from({ length: n }, () => p);

export const s1_1: SectionContent = {
  id: '1.1',
  intro: 'Chemistry is the study of <b>matter</b> and how it changes. This section shows what matter is, why chemists look at atoms and molecules, and how they test ideas instead of just believing them.',
  reads: [
    {
      id: 'matter-is-stuff',
      title: 'Matter is stuff',
      gist: 'What counts as matter, and the difference between mass and weight.',
      minutes: 2,
      blocks: [
        { p: 'Pour a glass of water. It feels heavy in your hand, and it fills the glass. That is all it takes to be <b>matter</b>: it has mass, and it takes up space.' },
        { p: 'Air is matter too. You can’t see it, but a balloon full of air has mass and pushes its walls outward. Light and heat are not matter: you can’t put them on a balance.' },
        { key: 'Matter: anything that has mass and takes up space.' },
        { p: '<b>Mass</b> is how much matter there is, and we measure it in grams. It is not quite the same as weight, which is the pull of gravity on that mass. Your mass is the same on the Moon; your weight there is about six times smaller.' },
        {
          particles: {
            describe: 'Four water molecules standing for a glass of water, labelled matter: it has mass and takes up space.',
            groups: [{ items: many(H2O, 4), label: 'a glass of water: matter' }],
          },
          level: 'particles',
        },
        { p: 'Through this section we follow one glass of water, 250 g of it. We will look at what it is made of, three ways to describe it, and one question about it that we can test.' },
      ],
    },
    {
      id: 'atoms-and-molecules',
      title: 'Atoms and molecules',
      gist: 'What water is made of, one tiny piece at a time.',
      minutes: 3,
      blocks: [
        { p: 'Split a drop of water in half, then in half again, and keep going. At the end you would reach one water <b>molecule</b>: the smallest piece that is still water.' },
        { p: 'A molecule is built from <b>atoms</b> joined by chemical bonds. A water molecule has two hydrogen atoms and one oxygen atom, so its formula is H<sub>2</sub>O. An atom is about a ten-billionth of a metre across.' },
        {
          particles: {
            describe: 'One water molecule: two white hydrogen atoms touching one terracotta oxygen atom, labelled 3 atoms.',
            groups: [{ items: [{ formula: 'H2O', label: 'H<sub>2</sub>O' }], label: 'one molecule, 3 atoms' }],
          },
          level: 'particles',
        },
        { molecule: { formula: 'H2O', describe: 'A 3D model of water: an oxygen atom with two hydrogen atoms attached, bent at about 104.5 degrees. Drag to turn it.' } },
        { key: 'Atoms join to make molecules. Chemists explain matter by looking at its atoms and molecules.' },
        { p: 'An atom is the smallest piece of an <b>element</b>, and there are only about 118 elements. Every kind of matter, from water to a tree to you, is built from them.' },
        { p: 'Our glass holds about 8 × 10<sup>24</sup> water molecules. Nobody counts them. Chapter 4 shows how to know that number from the mass alone.' },
      ],
    },
    {
      id: 'three-ways-to-look',
      title: 'Three ways to look',
      gist: 'The same glass of water can be seen, pictured as particles, and written in symbols.',
      minutes: 2,
      blocks: [
        { p: 'Chemistry works at three levels, and each of them describes the same thing. You <b>see it</b> with your eyes. You <b>picture the particles</b> that you can’t see. And you <b>write the symbols</b> that chemists use to say it briefly.' },
        {
          views: {
            title: 'A glass of water, three ways',
            caption: {
              amt: 'These say <b>how much</b>: 250 g of water holds about 8 × 10<sup>24</sup> molecules.',
              what: 'These say <b>what</b>: a clear liquid, made of molecules with the formula H<sub>2</sub>O.',
            },
            cols: [
              { label: 'See it', parts: [{ text: '250 g', link: 'amt' }, { text: 'of clear liquid', link: 'what' }] },
              { label: 'Particles', parts: [{ text: 'about 8 × 10<sup>24</sup>', link: 'amt' }, { text: 'water molecules', link: 'what' }] },
              { label: 'Symbols', parts: [{ text: 'H<sub>2</sub>O(l)', link: 'what' }] },
            ],
          },
        },
        { p: 'The (l) means liquid. You will often need to move from one level to another, for example to read a formula and picture the molecule behind it. Every picture in this book says which level it shows.' },
        { key: 'See it, picture the particles, write the symbols: three descriptions of one thing.' },
      ],
    },
    {
      id: 'finding-out',
      title: 'How we find out',
      gist: 'Chemists test ideas with experiments that could prove them wrong.',
      minutes: 3,
      blocks: [
        { p: 'Chemists don’t only collect facts; they test ideas. They notice something, ask a question, make a guess that an experiment could prove wrong, and then do the experiment. That guess is a <b>hypothesis</b>.' },
        { p: 'Here is a question about our glass. When an ice cube melts, does it get lighter, heavier, or stay the same? Our hypothesis: the mass stays the same.' },
        {
          frames: [
            {
              caption: 'Seal an ice cube in a bag, so nothing can escape, and weigh it.',
              particles: { describe: 'Four water molecules labelled ice, standing for the sealed ice cube.', groups: [{ items: many(H2O, 4), label: 'ice, weighed' }] },
            },
            {
              caption: 'Let it melt. The molecules are free to slide, but none has left the bag.',
              particles: { describe: 'Four water molecules labelled liquid water, the same four as before.', groups: [{ items: many(H2O, 4), label: 'melted water' }] },
            },
            {
              caption: 'Weigh again. The balance reads the same, so the hypothesis survives this test.',
              particles: { describe: 'The same four water molecules, labelled same mass as before.', groups: [{ items: many(H2O, 4), label: 'same mass as before' }] },
            },
          ],
          label: 'Picture it',
        },
        { key: 'A hypothesis must be testable: some result could show it wrong. One test never proves it; many agreeing tests make it trusted.' },
      ],
    },
    {
      id: 'laws-and-theories',
      title: 'Laws and theories',
      gist: 'What a law says, what a theory explains, and why “just a theory” is a mistake.',
      minutes: 3,
      blocks: [
        { p: 'Test enough ice cubes, candles and rusting nails, and the same thing keeps happening: the total mass doesn’t change. A short statement of what always happens is a <b>law</b>. This one is the law of conservation of mass.' },
        { p: 'A law says <i>what</i>. A <b>theory</b> says <i>why</i>. Atomic theory explains the law: matter is made of atoms, and a change only regroups them, so no atom is lost and the mass can’t change.' },
        {
          frames: [
            {
              caption: 'Before: hydrogen and oxygen molecules. Count the atoms: 4 H and 2 O.',
              particles: { describe: 'Two hydrogen molecules and one oxygen molecule.', groups: [{ items: [{ formula: 'H2' }, { formula: 'H2' }], label: 'hydrogen' }, { items: [{ formula: 'O2' }], label: 'oxygen' }], ops: ['+'] },
            },
            {
              caption: 'After: the same atoms, regrouped as two water molecules. Still 4 H and 2 O.',
              eq: ['2 H<sub>2</sub> + O<sub>2</sub> → 2 H<sub>2</sub>O'],
              particles: { describe: 'Two hydrogen molecules and one oxygen molecule become two water molecules.', groups: [{ items: [{ formula: 'H2' }, { formula: 'H2' }] }, { items: [{ formula: 'O2' }] }, { items: many(H2O, 2) }], ops: ['+', '→'] },
            },
          ],
          label: 'Picture it',
        },
        {
          table: {
            head: ['Idea', 'What it does', 'Example'],
            rows: [
              ['Hypothesis', 'a testable guess', 'ice weighs the same when melted'],
              ['Law', 'says what always happens', 'mass is conserved'],
              ['Theory', 'explains why', 'atoms only regroup'],
            ],
          },
        },
        { p: 'In daily speech “theory” means a hunch. In science it is the opposite: an explanation that has passed test after test. A theory does not become a law when it is proven; they do different jobs.' },
      ],
    },
  ],
  ideas: [
    { title: 'Matter has mass and takes up space', body: 'Water, air and you are matter. Mass is how much matter there is, measured in grams.' },
    { title: 'Atoms make molecules', body: 'Atoms join into molecules, like the two H and one O of H<sub>2</sub>O. Chemistry explains matter by its atoms.' },
    { title: 'Three levels', body: 'Every idea can be seen, pictured as particles, and written in symbols.' },
    { title: 'Testing, not believing', body: 'A hypothesis is a testable guess. A law says what happens; a theory says why.' },
  ],
  why: [
    {
      caption: 'A glass of water is matter: you can weigh it and it fills the glass.',
      particles: { describe: 'Four water molecules standing for a glass of water.', groups: [{ items: many(H2O, 4), label: 'a glass of water' }] },
    },
    {
      caption: 'It is made of molecules, and each molecule is atoms bonded together.',
      particles: { describe: 'One water molecule, labelled H2O, 2 H and 1 O.', groups: [{ items: [H2O], label: 'H<sub>2</sub>O: 2 H and 1 O' }] },
    },
    {
      caption: 'Changes only regroup the atoms, so a test that weighs everything finds the same mass.',
      particles: { describe: 'Two hydrogen molecules and one oxygen molecule become two water molecules.', groups: [{ items: [{ formula: 'H2' }, { formula: 'H2' }] }, { items: [{ formula: 'O2' }] }, { items: many(H2O, 2) }], ops: ['+', '→'] },
    },
  ],
  spot: {
    clues: [
      { text: 'A question about what something is made of', example: 'what is in this water?', note: 'think particles: atoms and molecules' },
      { text: 'Something has mass and takes up space', example: 'water, air, a coin', note: 'it is matter' },
      { text: 'A formula appears in a sentence', example: 'H<sub>2</sub>O, CO<sub>2</sub>', note: 'the symbol level: picture the molecule behind it' },
      { text: 'A claim that could be checked by an experiment', example: 'ice weighs the same when melted', note: 'a hypothesis' },
      { text: 'A statement that says “always”', example: 'mass is never lost in a change', note: 'a law' },
    ],
    lookAlikes: [
      { looks: 'is this water, salt water or a compound?', use: 'Sorting matter', why: 'sorting needs the particles of each kind, which is Section 1.2.', link: '1.2' },
      { looks: 'how do we know atoms exist at all?', use: 'Atoms are real', why: 'the evidence for atoms is a story of its own.', link: '2.1' },
      { looks: 'did the ice become a new substance?', use: 'Changes and properties', why: 'physical and chemical changes are the next section.', link: '1.3' },
    ],
  },
  mistakes: [
    { wrong: 'Air isn’t matter because you can’t see it', right: 'Air is matter', why: 'It has mass and takes up space. A balloon full of it weighs more than an empty one.' },
    { wrong: 'Mass and weight are the same thing', right: 'Mass is how much matter; weight is gravity’s pull on it', why: 'On the Moon your mass is unchanged and your weight is about a sixth.' },
    { wrong: 'A molecule is just a big atom', right: 'A molecule is two or more atoms bonded together', why: 'H<sub>2</sub>O is three atoms: two H and one O.' },
    { wrong: 'A theory is only a guess', right: 'A theory is an explanation that has survived many tests', why: 'A hypothesis is the guess. A theory has already passed much testing.' },
  ],
  examples: [],
  realUses: [
    { where: 'Medicine', what: 'A drug is a molecule. Aspirin has 9 carbon, 8 hydrogen and 4 oxygen atoms bonded in one shape.', eq: 'aspirin: C<sub>9</sub>H<sub>8</sub>O<sub>4</sub>, 21 atoms in each molecule' },
    { where: 'Cooking', what: 'Table sugar is a molecule of 45 atoms. Heat it long enough and the molecules break apart and brown.', eq: 'sugar: C<sub>12</sub>H<sub>22</sub>O<sub>11</sub>, 45 atoms in each molecule' },
    { where: 'Growing food', what: 'Plants need nitrogen atoms. Factories make ammonia from the nitrogen in the air for fertiliser.', eq: 'N<sub>2</sub> + 3 H<sub>2</sub> → 2 NH<sub>3</sub> (ammonia, for fertiliser)' },
    { where: 'Cooking with gas', what: 'A gas stove regroups the atoms of methane and oxygen into carbon dioxide and water. No atom is lost.', eq: 'CH<sub>4</sub> + 2 O<sub>2</sub> → CO<sub>2</sub> + 2 H<sub>2</sub>O' },
    { where: 'Leaves', what: 'A leaf rebuilds the atoms of carbon dioxide and water into sugar and oxygen, using light.', eq: '6 CO<sub>2</sub> + 6 H<sub>2</sub>O → C<sub>6</sub>H<sub>12</sub>O<sub>6</sub> + 6 O<sub>2</sub> (using light)' },
  ],
  next: [
    { id: '1.2', note: 'Sort matter into elements, compounds and mixtures.' },
    { id: '1.3', note: 'Physical and chemical changes.' },
    { id: '2.1', note: 'How anyone proved atoms are real.' },
  ],
};
