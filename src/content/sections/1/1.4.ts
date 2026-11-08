import type { Particle, SectionContent } from '../../types';

// Section 1.4 · Energy, a First Look (Tro 1.5). Descriptive: no calculations.
// Running example: a mug of hot water cooling on a table, and where its energy goes.
const H2O: Particle = { formula: 'H2O' };
const many = (p: Particle, n: number) => Array.from({ length: n }, () => p);

export const s1_4: SectionContent = {
  id: '1.4',
  intro: 'Every change in matter moves energy around. This section shows what energy is, how heat differs from temperature, and how to tell a change that gives energy out from one that takes it in.',
  reads: [
    {
      id: 'what-energy-is',
      title: 'What energy is',
      gist: 'Energy is what makes things move or change, and it comes in two basic forms.',
      minutes: 2,
      blocks: [
        { p: 'Energy is the ability to make something move or change. You can’t hold it, but you see what it does: it heats a pan, lifts a load, makes a light glow.' },
        { p: '<b>Kinetic energy</b> is the energy of motion. A moving ball has it, and so does every particle in a drink. <b>Potential energy</b> is stored energy: a ball held high, or the chemical energy stored in the bonds of a fuel.' },
        {
          particles: {
            describe: 'Two groups of water molecules. Left, three molecules labelled hot water, moving fast, lots of kinetic energy. Right, three molecules labelled cold water, moving slowly.',
            groups: [{ items: many(H2O, 3), label: 'hot water: particles move fast' }, { items: many(H2O, 3), label: 'cold water: particles move slowly' }],
            ops: [''],
          },
          level: 'particles',
        },
        { key: 'Kinetic energy is motion; potential energy is stored. Hotter matter has particles with more kinetic energy.' },
        { p: 'Through this section we follow a mug of hot water on a table. It starts at about 80 °C in a room at about 20 °C, and it slowly cools. Where does its energy go?' },
      ],
    },
    {
      id: 'heat-and-temperature',
      title: 'Heat and temperature',
      gist: 'Temperature tells how fast particles move; heat is energy on its way from hot to cold.',
      minutes: 3,
      blocks: [
        { p: 'People use “heat” and “temperature” as if they meant one thing. In chemistry they don’t. <b>Temperature</b> tells how energetic the particles are on average. <b>Heat</b> is energy that moves from something hotter to something colder.' },
        { p: 'A tiny spark is very hot, but it carries almost no energy. A bath of warm water is much cooler, but it holds far more. Temperature does not tell you how much energy there is.' },
        {
          frames: [
            {
              caption: 'The mug of hot water, and the cooler room around it.',
              particles: { describe: 'Three water molecules labelled hot water, and two nitrogen molecules labelled cool air.', groups: [{ items: many(H2O, 3), label: 'hot water, 80 °C' }, { items: many({ formula: 'N2' }, 2), label: 'cool air, 20 °C' }], ops: [''] },
            },
            {
              caption: 'Energy flows from the hot water to the air. That flow is heat.',
              eq: ['hot water → energy → cooler air'],
              particles: { describe: 'The same three water molecules and two air molecules, with an arrow showing energy flowing from the water to the air.', groups: [{ items: many(H2O, 3), label: 'water loses energy' }, { items: many({ formula: 'N2' }, 2), label: 'air gains energy' }], ops: ['→'] },
            },
            {
              caption: 'When both are at the same temperature, the flow stops.',
              particles: { describe: 'The water and the air at the same temperature, labelled 20 degrees Celsius.', groups: [{ items: many(H2O, 3), label: 'water, 20 °C' }, { items: many({ formula: 'N2' }, 2), label: 'air, 20 °C' }], ops: [''] },
            },
          ],
          label: 'Picture it',
        },
        { key: 'Heat flows from hot to cold, never the other way, until the temperatures match.' },
        { p: 'So “cold” is not something that flows in. When you touch ice, your hand feels cold because energy flows out of your hand into the ice.' },
      ],
    },
    {
      id: 'energy-is-conserved',
      title: 'Energy is never lost',
      gist: 'Energy can move and change form, but the total stays the same.',
      minutes: 2,
      blocks: [
        { p: 'The mug lost energy, but the energy didn’t vanish. It went to the air and the table. Chemists have tested this in countless ways, and it always holds: energy can be moved from place to place and changed from one form to another, but it can’t be created or destroyed. This is the <b>law of conservation of energy</b>.' },
        {
          table: {
            head: ['Where it starts', 'Where it goes', 'Example'],
            rows: [
              ['chemical (in bonds)', 'heat and light', 'a burning candle'],
              ['electrical', 'chemical (in bonds)', 'splitting water with a battery'],
              ['light', 'chemical (in bonds)', 'a leaf making sugar'],
              ['heat', 'kinetic (motion)', 'water heated until it boils'],
            ],
          },
        },
        {
          particles: {
            describe: 'A methane molecule and two oxygen molecules become one carbon dioxide molecule and two water molecules, with energy released as heat and light.',
            groups: [{ items: [{ formula: 'CH4' }], label: 'methane' }, { items: [{ formula: 'O2' }, { formula: 'O2' }], label: 'oxygen' }, { items: [{ formula: 'CO2' }], label: 'carbon dioxide' }, { items: many(H2O, 2), label: 'water' }],
            ops: ['+', '→', '+'],
          },
          caption: 'A flame: energy stored in the bonds of CH<sub>4</sub> is released as heat and light.',
          level: 'particles',
        },
        { key: 'Energy is conserved: it only moves or changes form.' },
      ],
    },
    {
      id: 'exothermic-endothermic',
      title: 'Giving out, taking in',
      gist: 'A change either releases energy to its surroundings or takes it in from them.',
      minutes: 3,
      blocks: [
        { p: 'To follow the energy, chemists split the world in two. The <b>system</b> is the part you are studying, such as the molecules that react. The <b>surroundings</b> are everything else: the flask, the air, your hand.' },
        { p: 'If the system gives energy out, the surroundings warm up. That change is <b>exothermic</b>. If the system takes energy in, the surroundings cool down. That change is <b>endothermic</b>.' },
        {
          frames: [
            {
              caption: 'Exothermic: burning methane lets its stored energy out as heat. The surroundings warm up.',
              eq: ['CH<sub>4</sub> + 2 O<sub>2</sub> → CO<sub>2</sub> + 2 H<sub>2</sub>O, energy released'],
              particles: { describe: 'Methane and two oxygen molecules become carbon dioxide and two water molecules, releasing energy.', groups: [{ items: [{ formula: 'CH4' }], label: 'CH<sub>4</sub>' }, { items: [{ formula: 'O2' }, { formula: 'O2' }], label: '2 O<sub>2</sub>' }, { items: [{ formula: 'CO2' }], label: 'CO<sub>2</sub>' }, { items: many(H2O, 2), label: '2 H<sub>2</sub>O' }], ops: ['+', '→', '+'] },
            },
            {
              caption: 'Endothermic: melting ice takes in energy from a drink or your hand. The surroundings cool down.',
              eq: ['H<sub>2</sub>O(s) → H<sub>2</sub>O(l), energy absorbed'],
              particles: { describe: 'Ice becomes liquid water, absorbing energy.', groups: [{ items: many(H2O, 2), label: 'ice' }, { items: many(H2O, 2), label: 'water' }], ops: ['→'] },
            },
          ],
          label: 'Picture it',
        },
        { key: 'Exothermic: energy goes out, the surroundings warm. Endothermic: energy comes in, the surroundings cool.' },
        { p: 'The word endothermic often tricks people. A cold pack feels cold because it pulls energy out of your skin and into the change happening inside it.' },
      ],
    },
    {
      id: 'measuring-energy',
      title: 'Measuring energy',
      gist: 'Joules, calories and food Calories, and how they relate.',
      minutes: 2,
      blocks: [
        { p: 'The SI unit of energy is the <b>joule</b> (J). A joule is small: it is about the energy needed to lift an apple one metre. A kilojoule (kJ) is 1000 J.' },
        { p: 'The older unit, the <b>calorie</b> (cal), was defined from water. It is the energy that warms 1 g of water by 1 °C, and it is exactly 4.184 J.' },
        {
          particles: {
            describe: 'Water molecules standing for 1 gram of water, labelled warming this by 1 degree Celsius takes 4.184 joules.',
            groups: [{ items: many(H2O, 3), label: '1 g of water: +1 °C takes 4.184 J' }],
          },
          level: 'particles',
        },
        {
          table: {
            head: ['Unit', 'Size', 'Where you meet it'],
            rows: [
              ['joule, J', 'the SI unit', 'chemistry data tables'],
              ['kilojoule, kJ', '1000 J', 'energy of reactions'],
              ['calorie, cal', '4.184 J', 'older chemistry texts'],
              ['Calorie, Cal', '1000 cal, or 4.184 kJ', 'food labels'],
            ],
          },
        },
        { key: 'A food Calorie (capital C) is 1000 chemistry calories: 4.184 kJ.' },
        { p: 'Chapter 8 returns to energy with numbers, and shows how to calculate how much heat a change gives out.' },
      ],
    },
    {
      id: 'using-it-well',
      title: 'Using it well',
      gist: 'Three questions that follow the energy in any change.',
      minutes: 2,
      blocks: [
        { p: 'To follow the energy in any change, ask three questions about the system and its surroundings.' },
        {
          work: [
            ['Which way does the energy go?', '1 · out of the system, or in'],
            ['What do the surroundings do?', '2 · warm up, or cool down'],
            ['Name the change.', '3 · exothermic or endothermic'],
          ],
        },
        {
          particles: {
            describe: 'The cooling mug in one picture: the hot water gives energy to the air, so water cools and air warms.',
            groups: [{ items: many(H2O, 2), label: 'water: energy out, cools' }, { items: many({ formula: 'N2' }, 2), label: 'air: energy in, warms' }],
            ops: ['→'],
          },
          caption: 'Our mug: heat flows out of the water, so the water cools and the room gets a little warmer.',
          level: 'particles',
        },
        { p: 'The hints you can feel are a good start. If the container gets warm, energy flowed out of the change into your hand. If it gets cold, energy flowed in from your hand.' },
      ],
    },
  ],
  ideas: [
    { title: 'Kinetic and potential', body: 'Kinetic energy is motion. Potential energy is stored, as in the bonds of a fuel.' },
    { title: 'Heat is a flow', body: 'Heat is energy moving from hot to cold. Temperature tells how energetic the particles are, not how much energy there is.' },
    { title: 'Energy is conserved', body: 'Energy is never made or lost. It only moves or changes form.' },
    { title: 'Out or in', body: 'Exothermic changes release energy and warm the surroundings. Endothermic changes absorb it and cool them.' },
  ],
  why: [
    {
      caption: 'Hot particles move fast. Cooler particles move slower.',
      particles: { describe: 'Hot water and cool water, three molecules each.', groups: [{ items: many(H2O, 3), label: 'hot: fast' }, { items: many(H2O, 3), label: 'cool: slow' }], ops: [''] },
    },
    {
      caption: 'Energy flows from the hot to the cool, until both match.',
      particles: { describe: 'Water gives energy to air.', groups: [{ items: many(H2O, 2), label: 'water' }, { items: many({ formula: 'N2' }, 2), label: 'air' }], ops: ['→'] },
    },
    {
      caption: 'Nothing is lost: it is the same energy, in a new place.',
      particles: { describe: 'Both water and air at the same temperature.', groups: [{ items: many(H2O, 2), label: 'same temperature' }, { items: many({ formula: 'N2' }, 2), label: 'same temperature' }], ops: [''] },
    },
  ],
  spot: {
    clues: [
      { text: 'Something gets hot as it changes', example: 'a hand warmer, a flame', note: 'exothermic: energy goes out' },
      { text: 'Something gets cold as it changes', example: 'an instant cold pack, melting ice', note: 'endothermic: energy goes in' },
      { text: 'Two things at different temperatures touch', example: 'a hot mug on a cold table', note: 'heat flows from hot to cold' },
      { text: 'A unit of kJ or Calories', example: '4.184 kJ, 1 Cal', note: 'energy; convert between them with 4.184' },
    ],
    lookAlikes: [
      { looks: 'how much heat does the change give out?', use: 'Heat and temperature', why: 'putting numbers on heat needs specific heat, which Section 8.3 covers.', link: '8.3' },
      { looks: 'which sign does ΔH have?', use: 'Enthalpy', why: 'the sign of the energy change is Section 8.5.', link: '8.5' },
      { looks: 'why do the particles move faster when hot?', use: 'Why gases behave this way', why: 'particle motion and temperature is Section 7.7.', link: '7.7' },
    ],
  },
  mistakes: [
    { wrong: 'Heat and temperature are the same', right: 'Temperature is how energetic the particles are; heat is energy moving', why: 'A spark is hot but carries little heat. A warm bath holds far more.' },
    { wrong: 'Cold flows from the ice into your hand', right: 'Heat flows from your hand into the ice', why: 'Only energy moves. Cold is just having less of it.' },
    { wrong: 'An endothermic change feels hot', right: 'An endothermic change feels cold', why: 'It takes energy in from its surroundings, such as your hand.' },
    { wrong: 'Energy is used up when a fuel burns', right: 'Energy is moved and changed, never used up', why: 'The stored energy becomes heat and light. The total stays the same.' },
    { wrong: 'A food Calorie is a chemistry calorie', right: 'A food Calorie is 1000 calories', why: 'The capital C means kilocalorie, which is 4.184 kJ.' },
  ],
  examples: [
    {
      id: '1.4-1',
      question: 'A hand warmer gets hot when you open it. An instant cold pack gets cold when you squeeze it. Which one is exothermic, and which is endothermic?',
      level: 'typical',
      steps: [
        {
          move: 'Which way?',
          say: 'Feel where the energy goes. If the pack warms your hand, energy flows from the pack to you. If it cools your hand, energy flows from you into the pack.',
          lines: [
            { left: 'hand warmer', right: 'warms your hand: energy out' },
            { left: 'cold pack', right: 'cools your hand: energy in' },
          ],
        },
        {
          move: 'Name it',
          say: 'Energy out is exothermic. Energy in is endothermic.',
          lines: [
            { left: 'hand warmer', right: 'exothermic' },
            { left: 'cold pack', right: 'endothermic' },
          ],
          qs: [['Is the hand warmer making energy?', 'No. Energy stored in the chemicals’ bonds is released as heat. The total energy is the same.']],
        },
      ],
      answer: 'The hand warmer is exothermic; the cold pack is endothermic.',
    },
  ],
  realUses: [
    { where: 'Hand warmers', what: 'Iron powder slowly joins with oxygen from the air and gives out heat for hours.', eq: '4 Fe(s) + 3 O<sub>2</sub>(g) → 2 Fe<sub>2</sub>O<sub>3</sub>(s), energy released' },
    { where: 'Instant cold packs', what: 'Dissolving ammonium nitrate takes in energy, so the pack and your skin cool down.', eq: 'NH<sub>4</sub>NO<sub>3</sub>(s) → NH<sub>4</sub><sup>+</sup>(aq) + NO<sub>3</sub><sup>−</sup>(aq), energy absorbed' },
    { where: 'A gas stove', what: 'Burning methane turns bond energy into the heat that cooks your food.', eq: 'CH<sub>4</sub>(g) + 2 O<sub>2</sub>(g) → CO<sub>2</sub>(g) + 2 H<sub>2</sub>O(g), energy released' },
    { where: 'Sweating', what: 'Sweat that evaporates takes energy from your skin, which is why it cools you.', eq: 'H<sub>2</sub>O(l) → H<sub>2</sub>O(g), energy absorbed' },
    { where: 'Photosynthesis', what: 'A leaf stores energy from sunlight in the bonds of sugar.', eq: '6 CO<sub>2</sub>(g) + 6 H<sub>2</sub>O(l) → C<sub>6</sub>H<sub>12</sub>O<sub>6</sub>(aq) + 6 O<sub>2</sub>(g), light absorbed' },
  ],
  next: [
    { id: '8.1', note: 'Energy, heat and work, with numbers.' },
    { id: '8.5', note: 'Exothermic and endothermic as a sign on ΔH.' },
    { id: '13.5', note: 'Why the temperature stops rising while ice melts.' },
  ],
};
