import type { SectionContent } from '../../types';

// Section 4.1 · The Mole and Molar Mass (Tro 2.9, 3.8). PATTERN SECTION: a calculation section.
// Running example: 36.04 g of water → 2.000 mol → 1.204 × 10^24 molecules.
// Every number is recomputed from the engine's atomic weights by test/content.test.ts.
const NB = ' '; // keeps a term together, so a long line breaks only between terms

export const s4_1: SectionContent = {
  id: '4.1',
  intro: 'Atoms are far too small to count one by one, so chemists count them by weighing. This section shows how a mass turns into a number of particles, using one counting unit: the <b>mole</b>.',
  reads: [
    {
      id: 'counting-by-weighing',
      title: 'Counting by weighing',
      gist: 'Why weighing something can tell you how many particles are in it.',
      minutes: 2,
      blocks: [
        { p: 'A sip of water holds more molecules than there are grains of sand on every beach. Nobody can count them. But chemists still need to know how many there are, because reactions happen particle by particle.' },
        { p: 'The trick is the one a bank uses for a bag of coins. If every coin weighs the same, the weight of the bag tells you how many coins are in it. You weigh, then divide by the mass of one.' },
        { work: [[`250${NB}g ÷ 2.50${NB}g per coin = 100 coins`, 'divide by the mass of one']] },
        {
          particles: { describe: 'Three water molecules, each drawn the same size: two white hydrogen atoms touching one terracotta oxygen atom.', groups: [{ items: [{ formula: 'H2O' }, { formula: 'H2O' }, { formula: 'H2O' }], label: 'every H<sub>2</sub>O molecule has the same mass' }] },
          level: 'particles',
        },
        { key: 'If every particle has the same mass, a mass tells you a count.' },
        { p: 'Through this section we follow one sample: <b>36.04 g of water</b> on a balance. By the end you will say how many molecules it holds, without counting one.' },
      ],
    },
    {
      id: 'mole-is-a-count',
      title: 'The mole is a count',
      gist: 'A mole is a number, like a dozen, only far bigger.',
      minutes: 2,
      blocks: [
        { p: 'A dozen eggs is 12 eggs, whatever size the eggs are. A <b>mole</b> works the same way: one mole of anything is 6.022 × 10<sup>23</sup> of it. This number is called <b>Avogadro’s number</b>.' },
        {
          particles: {
            describe: 'Twelve water molecules in two rows: a dozen.',
            groups: [{ items: Array.from({ length: 12 }, () => ({ formula: 'H2O' })), label: 'a dozen water molecules: 12 H<sub>2</sub>O' }],
          },
          caption: 'A mole is the same idea with 6.022 × 10<sup>23</sup> of them.',
          level: 'particles',
        },
        { key: 'One mole = 6.022 × 10<sup>23</sup> particles, of whatever you name: atoms, molecules or ions.' },
        { p: 'The number is huge so that a mole of something is an amount you can hold. It was chosen so that the mass of one mole, in grams, matches the mass of one particle in atomic mass units. That link is the next read.' },
        { work: [[`1${NB}mol H<sub>2</sub>O = 6.022${NB}×${NB}10<sup>23</sup> H<sub>2</sub>O molecules`, 'a count, like a dozen']] },
      ],
    },
    {
      id: 'molar-mass',
      title: 'Molar mass',
      gist: 'How heavy one mole of a substance is, read straight from its formula.',
      minutes: 3,
      blocks: [
        { p: 'The <b>molar mass</b> of a substance is the mass of one mole of it, in grams per mole (g/mol). You find it by adding up the atomic masses of every atom in the formula. The small numbers in the formula tell you how many of each atom there are.' },
        {
          table: {
            head: ['Atom', 'How many', 'Mass each', 'Total'],
            rows: [
              ['H', '2', '1.008', '2.016'],
              ['O', '1', '15.999', '15.999'],
              ['H<sub>2</sub>O', '', '', '18.02 g/mol'],
            ],
          },
        },
        { eq: [`M(H<sub>2</sub>O) = 2${NB}×${NB}1.008 + 15.999 = 18.02${NB}g/mol`] },
        { p: 'So one mole of water, 6.022 × 10<sup>23</sup> molecules, has a mass of 18.02 g: a little more than a tablespoon.' },
        {
          views: {
            title: 'One mole of water, three ways',
            caption: {
              amt: 'All three say <b>how much</b>: 18.02 g of water is 1 mol, which is 6.022 × 10<sup>23</sup> molecules.',
              what: 'All three say <b>what</b>: water, its molecules, and the formula H<sub>2</sub>O (2 H and 1 O).',
            },
            cols: [
              { label: 'See it', parts: [{ text: '18.02 g', link: 'amt' }, { text: 'of water', link: 'what' }] },
              { label: 'Particles', parts: [{ text: '6.022 × 10<sup>23</sup>', link: 'amt' }, { text: 'water molecules', link: 'what' }] },
              { label: 'Symbols', parts: [{ text: '1 mol', link: 'amt' }, { text: 'H<sub>2</sub>O', link: 'what' }] },
            ],
          },
        },
      ],
    },
    {
      id: 'grams-moles-particles',
      title: 'Grams ↔ moles ↔ particles',
      gist: 'Every trip between grams and particles goes through moles.',
      minutes: 3,
      blocks: [
        { p: 'You can measure grams. You want particles. Moles sit in the middle: divide grams by the molar mass to get moles, then multiply by Avogadro’s number to get particles. Going back, do the opposite.' },
        { eq: ['<m>moles</m> = <g>grams</g> ÷ molar mass', 'particles = <m>moles</m> × 6.022 × 10<sup>23</sup>'] },
        {
          frames: [
            {
              caption: 'Start from what you can measure: the mass of the sample.',
              eq: ['<g>36.04 g</g> of H<sub>2</sub>O'],
              particles: { describe: 'Two water molecules standing for the sample, labelled 36.04 grams.', groups: [{ items: [{ formula: 'H2O' }, { formula: 'H2O' }], label: '<g>36.04 g</g>' }] },
            },
            {
              caption: 'Divide by the molar mass. Grams ÷ grams per mole leaves moles.',
              eq: [`<g>36.04${NB}g</g> ÷ 18.02${NB}g/mol = <m>2.000${NB}mol</m>`],
              particles: { describe: 'Two water molecules, labelled 2.000 mol.', groups: [{ items: [{ formula: 'H2O' }, { formula: 'H2O' }], label: '2.000 mol' }] },
            },
            {
              caption: 'Multiply by Avogadro’s number to count the molecules.',
              eq: [`<m>2.000${NB}mol</m> × 6.022${NB}×${NB}10<sup>23</sup> = 1.204${NB}×${NB}10<sup>24</sup> molecules`],
              particles: { describe: 'Two water molecules, labelled 1.204 times 10 to the 24 molecules.', groups: [{ items: [{ formula: 'H2O' }, { formula: 'H2O' }], label: '1.204 × 10<sup>24</sup> molecules' }] },
            },
          ],
          label: 'Picture it',
        },
        { key: 'Grams → moles: divide by the molar mass. Moles → particles: multiply by 6.022 × 10<sup>23</sup>.' },
        { p: 'That answers the opening question: 36.04 g of water holds 1.204 × 10<sup>24</sup> molecules.' },
      ],
    },
    {
      id: 'using-it-well',
      title: 'Using it well',
      gist: 'When to reach for molar mass, and the two moves in Example 1.',
      minutes: 2,
      blocks: [
        { p: 'Use this whenever a question gives a mass of a pure substance and asks for an amount, or the other way round. You need its formula, to find the molar mass.' },
        {
          particles: {
            describe: 'A drop of 9.01 grams of water shown as one water molecule, labelled half a mole.',
            groups: [{ items: [{ formula: 'H2O' }], label: '<g>9.01 g</g> = <m>0.500 mol</m>: half a mole' }],
          },
          level: 'particles',
        },
        { h: 'The two moves' },
        {
          work: [
            [`M(H<sub>2</sub>O) = 2${NB}×${NB}1.008 + 15.999 = 18.02${NB}g/mol`, '1 · molar mass'],
            [`n = 9.01${NB}g ÷ 18.02${NB}g/mol = 0.500${NB}mol`, '2 · divide'],
          ],
        },
        { p: 'Write the units at every step. Grams on top divided by grams per mole leaves moles; if you end with g<sup>2</sup>/mol, the division is upside down.' },
        { p: 'Keep as many significant figures as the measured mass has: 9.01 g has three, so the answer is 0.500 mol, not 0.5 mol.' },
      ],
    },
  ],
  tool: '<m>moles</m> = <g>grams</g> ÷ molar mass',
  toolNote: 'Molar mass is grams per mole: add up the atomic masses in the formula.',
  ideas: [
    { title: 'The mole is a count', body: 'One mole is 6.022 × 10<sup>23</sup> particles of whatever you name.' },
    { title: 'Molar mass from the formula', body: 'Add every atom’s mass. H<sub>2</sub>O: 2 × 1.008 + 15.999 = 18.02 g/mol.' },
    { title: 'Weighing is counting', body: 'Grams ÷ molar mass gives moles; moles × 6.022 × 10<sup>23</sup> gives particles.' },
  ],
  why: [
    {
      caption: 'You can weigh water, but you can’t count its molecules.',
      eq: ['<g>18.02 g</g> of water'],
      particles: { describe: 'One faded water molecule, labelled 18.02 grams, how many?', groups: [{ items: [{ formula: 'H2O', faded: true }], label: '<g>18.02 g</g> · how many?' }] },
    },
    {
      caption: 'Every water molecule has the same mass, so 18.02 g is always the same count: one mole.',
      eq: ['<g>18.02 g</g> = <m>1 mol</m>'],
      particles: { describe: 'One water molecule, labelled 1 mol.', groups: [{ items: [{ formula: 'H2O' }], label: '1 mol' }] },
    },
    {
      caption: 'Twice the grams is twice the moles: weighing is counting.',
      eq: ['<g>36.04 g</g> = <m>2.000 mol</m>'],
      particles: { describe: 'Two water molecules, labelled 2.000 mol.', groups: [{ items: [{ formula: 'H2O' }, { formula: 'H2O' }], label: '2.000 mol' }] },
    },
  ],
  spot: {
    clues: [
      { text: 'A mass is given, an amount is wanted', example: `9.01${NB}g H<sub>2</sub>O → ?${NB}mol`, note: 'divide by the molar mass' },
      { text: 'A number of particles is asked for', example: 'how many molecules in 5.00 g of sugar?', note: 'grams → moles → × 6.022 × 10<sup>23</sup>' },
      { text: 'Moles are given, a mass is wanted', example: `0.250${NB}mol CH<sub>4</sub> → ?${NB}g`, note: 'multiply by the molar mass' },
    ],
    lookAlikes: [
      { looks: 'grams of one substance → grams of another, in a reaction', use: 'Reaction stoichiometry', why: 'you need the balanced equation’s mole ratio between the two moles.', link: '5.2' },
      { looks: 'how many moles in each litre of a solution?', use: 'Molarity', why: 'that is moles per volume, not per gram.', link: '6.1' },
    ],
  },
  mistakes: [
    { wrong: `n = 18.02${NB}g/mol ÷ 9.01${NB}g`, right: `n = 9.01${NB}g ÷ 18.02${NB}g/mol`, why: 'Grams go on top: grams ÷ grams per mole leaves moles.' },
    { wrong: `M(O<sub>2</sub>) = 16.00${NB}g/mol`, right: `M(O<sub>2</sub>) = 32.00${NB}g/mol`, why: 'The 2 means two oxygen atoms in every molecule.' },
    { wrong: '1 mol H<sub>2</sub>O = 6.022 × 10<sup>23</sup> atoms', right: '1 mol H<sub>2</sub>O = 6.022 × 10<sup>23</sup> molecules', why: 'A mole counts the particles you name. Each water molecule is 3 atoms, so that is 3 × as many atoms.' },
  ],
  examples: [
    {
      id: '4.1-1',
      question: 'How many moles of water, H<sub>2</sub>O, are in 9.01 g?',
      level: 'easy',
      steps: [
        {
          move: 'Molar mass',
          say: 'Add up every atom in the formula: two hydrogens and one oxygen.',
          lines: [{ left: 'M', right: `2${NB}×${NB}1.008 + 15.999` }, { right: `18.02${NB}g/mol` }],
          qs: [['Where do 1.008 and 15.999 come from?', 'They are the atomic masses of hydrogen and oxygen, from the periodic table.']],
        },
        {
          move: 'Divide',
          say: 'Grams ÷ grams per mole leaves moles. Keep three significant figures, as in 9.01 g.',
          lines: [{ left: 'n', right: `9.01${NB}g ÷ 18.02${NB}g/mol`, op: '÷ M' }, { right: `0.500${NB}mol` }],
          qs: [['Why 0.500 and not 0.5?', 'The mass 9.01 g has three significant figures, so the answer keeps three: 0.500.']],
        },
      ],
      answer: '9.01 g of water is 0.500 mol.',
    },
    {
      id: '4.1-2',
      question: 'How many moles of carbon dioxide, CO<sub>2</sub>, are in 11.0 g?',
      level: 'typical',
      steps: [
        {
          move: 'Molar mass',
          say: 'One carbon and two oxygens: the 2 belongs to O.',
          lines: [{ left: 'M', right: `12.011 + 2${NB}×${NB}15.999` }, { right: `44.01${NB}g/mol` }],
          qs: [['Why not 2 × 12.011?', 'The small 2 sits after O, so it counts oxygen atoms. There is one carbon.']],
        },
        {
          move: 'Divide',
          say: 'Grams ÷ grams per mole. Three significant figures, as in 11.0 g.',
          lines: [{ left: 'n', right: `11.0${NB}g ÷ 44.01${NB}g/mol`, op: '÷ M' }, { right: `0.250${NB}mol` }],
        },
      ],
      answer: '11.0 g of carbon dioxide is 0.250 mol.',
    },
    {
      id: '4.1-3',
      question: 'How many molecules are in 5.00 g of table sugar, C<sub>12</sub>H<sub>22</sub>O<sub>11</sub>?',
      level: 'harder',
      steps: [
        {
          move: 'Molar mass',
          say: 'Add up every atom: 12 carbons, 22 hydrogens and 11 oxygens.',
          lines: [{ left: 'M', right: `12${NB}×${NB}12.011 + 22${NB}×${NB}1.008 + 11${NB}×${NB}15.999` }, { right: `342.30${NB}g/mol` }],
          qs: [['Why not just 12 + 22 + 11?', 'Those are counts of atoms, not masses. Each count is multiplied by that atom’s mass.']],
        },
        {
          move: 'Grams → moles',
          say: 'Divide the grams by the molar mass. Keep one extra figure until the last step.',
          lines: [{ left: 'n', right: `5.00${NB}g ÷ 342.30${NB}g/mol`, op: '÷ M' }, { right: `0.01461${NB}mol` }],
          qs: [['Why keep an extra figure?', 'Rounding in the middle can shift the last digit of the answer. Keep one more figure than you need, and round once at the end.']],
        },
        {
          move: 'Moles → molecules',
          say: 'Multiply by Avogadro’s number, then round to three significant figures, as in 5.00 g.',
          lines: [{ left: 'N', right: `0.01461${NB}mol × 6.022${NB}×${NB}10<sup>23</sup>`, op: '× N<sub>A</sub>' }, { right: `8.80${NB}×${NB}10<sup>21</sup> molecules` }],
        },
      ],
      answer: '5.00 g of sugar holds 8.80 × 10<sup>21</sup> molecules.',
    },
  ],
  realUses: [
    { where: 'A spoonful of sugar', what: '4.0 g of table sugar, C<sub>12</sub>H<sub>22</sub>O<sub>11</sub>, is about 7.0 × 10<sup>21</sup> molecules.', eq: `4.0${NB}g ÷ 342.30${NB}g/mol = 0.012${NB}mol` },
    { where: 'A vitamin C tablet', what: '500 mg of vitamin C, C<sub>6</sub>H<sub>8</sub>O<sub>6</sub>, is 2.84 millimoles.', eq: `0.500${NB}g ÷ 176.12${NB}g/mol = 0.00284${NB}mol` },
    { where: 'Salt in a recipe', what: 'A teaspoon of salt, about 6.0 g of NaCl, is a tenth of a mole.', eq: `6.0${NB}g ÷ 58.44${NB}g/mol = 0.10${NB}mol` },
    { where: 'A bottle of water', what: 'Half a litre of water, 500. g, is nearly 28 moles of molecules.', eq: `500.${NB}g ÷ 18.02${NB}g/mol = 27.7${NB}mol` },
  ],
  next: [
    { id: '5.2', note: 'Every recipe calculation goes through moles.' },
    { id: '6.1', note: 'Moles per litre starts here.' },
    { id: '7.3', note: 'The n in PV = nRT is moles.' },
  ],
};
