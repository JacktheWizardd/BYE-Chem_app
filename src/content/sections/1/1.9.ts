import type { Particle, SectionContent } from '../../types';

// Section 1.9 · Reading Data (Tro 1.9). A calculation section.
// Running example: pieces of aluminium of different sizes, volume against mass: 10.0 mL weighs 27.1 g … 40.0 mL weighs 108.0 g.
// The slope of mass against volume is the density, 2.70 g/mL (Section 1.6).
const NB = ' '; // keeps a number and its unit together
const Al: Particle = { formula: 'Al' };
const many = (p: Particle, n: number) => Array.from({ length: n }, () => p);

export const s1_9: SectionContent = {
  id: '1.9',
  intro: 'A table of results is the evidence in chemistry. This section shows how to read one: spot the pattern, find the <b>slope</b> that hides in it, average repeated trials, and measure how far a result is from the truth.',
  reads: [
    {
      id: 'a-table-of-results',
      title: 'A table of results',
      gist: 'What the columns of a table of measurements are, and what to look for first.',
      minutes: 2,
      blocks: [
        { p: 'To learn what aluminium is like, a student weighs pieces of it of different sizes and measures each volume by displacement (Section 1.6). The results go in a table.' },
        {
          table: {
            head: ['Volume (mL)', 'Mass (g)'],
            rows: [
              ['10.0', '27.1'],
              ['20.0', '54.0'],
              ['30.0', '81.2'],
              ['40.0', '108.0'],
            ],
          },
        },
        {
          particles: {
            describe: 'Four groups of aluminium atoms, with 1, 2, 3 and 4 atoms, labelled 10.0 millilitres 27.1 grams, 20.0 millilitres 54.0 grams, 30.0 millilitres 81.2 grams, and 40.0 millilitres 108.0 grams.',
            groups: [
              { items: many(Al, 1), label: '10.0 mL · 27.1 g'},
              { items: many(Al, 2), label: '20.0 mL · 54.0 g' },
              { items: many(Al, 3), label: '30.0 mL · 81.2 g' },
              { items: many(Al, 4), label: '40.0 mL · 108.0 g' },
            ],
            ops: ['', '', ''],
          },
          level: 'particles',
        },
        { p: 'One column is what the student <b>chose</b>, the volumes, and the other is what they <b>measured</b>, the masses. Read a table the way you would read a sentence: what changes, what responds, and by how much?' },
        { key: 'First look: which column did the experimenter set, and which did they measure?' },
        { p: 'Through this section we follow this table of aluminium, and see what it tells us.' },
      ],
    },
    {
      id: 'spotting-a-pattern',
      title: 'Spotting a pattern',
      gist: 'When one number doubles and the other doubles with it.',
      minutes: 2,
      blocks: [
        { p: 'Look down the table. As the volume goes up, the mass goes up. Double the volume, from 10.0 to 20.0 mL, and the mass roughly doubles, from 27.1 to 54.0 g. That steady pattern is called a <b>direct proportion</b>.' },
        {
          frames: [
            { caption: 'More aluminium means more mass.', eq: ['10.0 mL → 27.1 g'] },
            { caption: 'Twice the volume gives about twice the mass.', eq: ['20.0 mL → 54.0 g'] },
            { caption: 'Divide each mass by its volume. The answer hardly changes.', eq: ['27.1 ÷ 10.0 = 2.71', '54.0 ÷ 20.0 = 2.70'] },
          ],
          label: 'Picture it',
        },
        { p: 'In a direct proportion, mass ÷ volume is the same every time. Here it is about 2.70 g/mL, which is the density from Section 1.6. The small differences, 2.71 against 2.70, come from measuring, not from the aluminium.' },
        { key: 'Direct proportion: double one, double the other. Their ratio stays the same.' },
        { p: 'If you plotted mass up the side against volume along the bottom, these points would fall on a straight line that starts at zero. Section 0.7 is about reading such lines.' },
      ],
    },
    {
      id: 'slope',
      title: 'The slope',
      gist: 'How to turn a whole table into one number: rise over run.',
      minutes: 3,
      blocks: [
        { p: 'Instead of dividing every row, you can use the whole table at once. Pick two points far apart, and compare how much the mass changes to how much the volume changes. The ratio is the <b>slope</b>: the rise over the run.' },
        { eq: ['slope = (<i>y</i><sub>2</sub> − <i>y</i><sub>1</sub>) ÷ (<i>x</i><sub>2</sub> − <i>x</i><sub>1</sub>)'] },
        {
          frames: [
            { caption: 'Take the first and last rows. The rise is the change in mass.', eq: ['108.0 g − 27.1 g = 80.9 g'] },
            { caption: 'The run is the change in volume.', eq: ['40.0 mL − 10.0 mL = 30.0 mL'] },
            { caption: 'Divide the rise by the run. The slope has the unit g/mL.', eq: ['80.9 g ÷ 30.0 mL = 2.70 g/mL'] },
          ],
          label: 'Picture it',
        },
        { p: 'The slope of mass against volume is exactly the density. A steeper line means a denser material. That is why chemists like to plot data: the slope averages out the small errors in single points.' },
        { key: 'Slope = rise ÷ run = change in <i>y</i> ÷ change in <i>x</i>. Keep the same order, later minus earlier, on top and bottom.' },
        { p: 'Check the units. The rise is in g and the run in mL, so the slope is in g/mL. If the unit is not a unit you expected, you may have put the rise and the run the wrong way up.' },
      ],
    },
    {
      id: 'averages-and-spread',
      title: 'Averages and spread',
      gist: 'Why chemists repeat a measurement, and how to combine the results.',
      minutes: 2,
      blocks: [
        { p: 'Repeat a measurement and you get slightly different numbers each time. Our student finds the density of the aluminium three times.' },
        {
          table: {
            head: ['Trial', 'Density (g/mL)'],
            rows: [
              ['1', '2.69'],
              ['2', '2.71'],
              ['3', '2.70'],
            ],
          },
        },
        { p: 'The best single value is the <b>mean</b>, or average: add the trials and divide by how many there are.' },
        { eq: ['(2.69 g/mL + 2.71 g/mL + 2.70 g/mL) ÷ 3 = 2.70 g/mL'] },
        { p: 'How much the trials differ shows how precise they are (Section 1.7). The difference between the largest and the smallest is the <b>range</b>.' },
        { eq: ['2.71 g/mL − 2.69 g/mL = 0.02 g/mL'] },
        {
          particles: {
            describe: 'Three aluminium atoms with a spread of density readings, labelled mean 2.70 grams per millilitre, range 0.02.',
            groups: [{ items: many(Al, 3), label: 'mean 2.70 g/mL, range 0.02' }],
          },
          level: 'particles',
        },
        { key: 'Mean = sum ÷ number of trials. A small range means high precision.' },
        { p: 'The 3 in the sum is a count, so it is exact. The mean keeps the two decimal places of the readings.' },
      ],
    },
    {
      id: 'how-far-off',
      title: 'How far off is it?',
      gist: 'Percent error turns “close to the true value” into a number.',
      minutes: 3,
      blocks: [
        { p: 'Suppose a second student gets trials of 2.58, 2.60 and 2.59 g/mL. They agree with each other, but is the average right? The accepted value of aluminium’s density is 2.70 g/mL. First the mean:' },
        { eq: ['(2.58 g/mL + 2.60 g/mL + 2.59 g/mL) ÷ 3 = 2.59 g/mL'] },
        { p: 'Then the <b>percent error</b>: how far the result is from the accepted value, as a fraction of the accepted value, written as a percent. Ignore the sign: the error is the size of the gap.' },
        { eq: ['(2.70 g/mL − 2.59 g/mL) ÷ 2.70 g/mL × 100 = 4.1%'] },
        {
          frames: [
            { caption: 'The trials agree closely, so the results are precise.', eq: ['2.58, 2.60, 2.59'] },
            { caption: 'But the mean is 4.1% below the accepted value, so they are not accurate.', eq: ['2.59 against 2.70'] },
            { caption: 'Every trial missed the same way. That points to a systematic error in the method, such as air bubbles clinging to the block.', eq: ['all too low'] },
          ],
          label: 'Picture it',
        },
        { key: 'Percent error = |accepted − measured| ÷ accepted × 100. Divide by the accepted value, not by your own.' },
        { p: 'Random errors scatter the trials either way and average out. A systematic error pushes them all the same way, and averaging does not fix it. The only cure is to find and remove the cause.' },
      ],
    },
    {
      id: 'using-it-well',
      title: 'Using it well',
      gist: 'The questions to ask of any table, and the moves in Example 1.',
      minutes: 2,
      blocks: [
        { p: 'Whenever you are handed data, ask these questions in order.' },
        {
          work: [
            ['What did they set, and what did they measure?', '1 · read the columns'],
            ['Is there a pattern? Slope? A mean?', '2 · summarise with one number'],
            ['How close is it to a known value?', '3 · percent error'],
          ],
        },
        {
          particles: {
            describe: 'The table of aluminium summarised as one aluminium atom labelled 2.70 grams per millilitre.',
            groups: [{ items: [Al], label: '2.70 g/mL' }],
          },
          caption: 'The whole table, in one number.',
          level: 'particles',
        },
        { p: 'Keep the sign and the unit with every number, and keep within the data. A table shows what happened for the volumes that were tested. It does not promise what happens far outside them.' },
        { p: 'Round the final answer the way Section 1.7 describes: the least precise reading sets the figures.' },
      ],
    },
  ],
  tool: 'slope = (<i>y</i><sub>2</sub> − <i>y</i><sub>1</sub>) ÷ (<i>x</i><sub>2</sub> − <i>x</i><sub>1</sub>)',
  toolNote: 'Rise over run. With mass up and volume along, the slope is the density. Also: mean = sum ÷ count, and percent error = (accepted − measured) ÷ accepted × 100, as a positive number.',
  ideas: [
    { title: 'Read the columns', body: 'One column is what was set, the other is what was measured.' },
    { title: 'Direct proportion', body: 'If doubling one doubles the other, their ratio is constant. For mass and volume, that is the density.' },
    { title: 'Slope is rise ÷ run', body: 'It uses the whole table to give one number with a unit, such as 2.70 g/mL.' },
    { title: 'Mean and percent error', body: 'Average the trials, then compare to the accepted value: precision and accuracy as numbers.' },
  ],
  why: [
    {
      caption: 'The table: bigger pieces weigh more.',
      particles: { describe: 'Aluminium pieces of 10.0 and 40.0 millilitres, labelled 27.1 grams and 108.0 grams.', groups: [{ items: many(Al, 1), label: '10.0 mL · 27.1 g' }, { items: many(Al, 4), label: '40.0 mL · 108.0 g' }], ops: [''] },
    },
    {
      caption: 'Rise over run turns the whole table into one number: grams per millilitre.',
      eq: ['80.9 g ÷ 30.0 mL = 2.70 g/mL'],
      particles: { describe: 'One aluminium atom labelled 2.70 grams per millilitre.', groups: [{ items: [Al], label: '2.70 g/mL' }] },
    },
    {
      caption: 'Compare it with the accepted value to judge how good the experiment was.',
      eq: ['2.70 against 2.70: 0% error'],
      particles: { describe: 'Measured density next to the accepted density, both 2.70 grams per millilitre.', groups: [{ items: [Al], label: 'measured 2.70' }, { items: [Al], label: 'accepted 2.70' }], ops: ['='] },
    },
  ],
  spot: {
    clues: [
      { text: 'Pairs of measurements in a table', example: 'volume and mass of pieces', note: 'look for a pattern, then the slope' },
      { text: 'A question about how fast, or how steep', example: 'degrees gained per second', note: 'rise ÷ run' },
      { text: 'The same measurement repeated', example: 'three trials of a density', note: 'take the mean; the range shows precision' },
      { text: 'A known value to compare with', example: 'accepted density 2.70 g/mL', note: 'percent error' },
    ],
    lookAlikes: [
      { looks: 'plotting and reading a straight line, with its intercept', use: 'Straight-line graphs', why: 'the maths of slope and intercept has its own section.', link: '0.7' },
      { looks: 'how many figures to keep in a mean', use: 'How sure is a number?', why: 'significant figures follow the data; see Section 1.7.', link: '1.7' },
      { looks: 'finding the density from one mass and one volume', use: 'Density', why: 'a single pair needs no slope; see Section 1.6.', link: '1.6' },
    ],
  },
  mistakes: [
    { wrong: `slope = (40.0${NB}mL − 10.0${NB}mL) ÷ (108.0${NB}g − 27.1${NB}g)`, right: `slope = (108.0${NB}g − 27.1${NB}g) ÷ (40.0${NB}mL − 10.0${NB}mL)`, why: 'Rise (the quantity plotted up) on top, run (along) on the bottom.' },
    { wrong: `(108.0${NB}g − 27.1${NB}g) ÷ (10.0${NB}mL − 40.0${NB}mL) = −2.70${NB}g/mL`, right: `(108.0${NB}g − 27.1${NB}g) ÷ (40.0${NB}mL − 10.0${NB}mL) = 2.70${NB}g/mL`, why: 'Subtract in the same order on top and bottom, or the sign flips.' },
    { wrong: `(2.70 − 2.59) ÷ 2.59 × 100 = 4.2%`, right: `(2.70 − 2.59) ÷ 2.70 × 100 = 4.1%`, why: 'Percent error divides by the accepted value, not by your own result.' },
    { wrong: 'The three trials agree, so the answer is right', right: 'They agree, so they are precise; compare with the accepted value to judge accuracy', why: 'A systematic error moves every trial the same way, so agreeing trials can all be wrong.' },
  ],
  examples: [
    {
      id: '1.9-1',
      question: 'A student finds the density of aluminium three times and gets 2.69, 2.71 and 2.70 g/mL. What is the mean, and what is the range?',
      level: 'easy',
      steps: [
        {
          move: 'Add the trials',
          say: 'The mean needs the sum first.',
          lines: [{ left: 'sum', right: `2.69${NB}g/mL + 2.71${NB}g/mL + 2.70${NB}g/mL`, op: '+' }, { right: `8.10${NB}g/mL` }],
        },
        {
          move: 'Divide by three',
          say: 'Divide by the number of trials. The 3 is a count, so it is exact and the answer keeps two decimal places.',
          lines: [{ left: 'mean', right: `8.10${NB}g/mL ÷ 3`, op: '÷ 3' }, { right: `2.70${NB}g/mL` }],
        },
        {
          move: 'Find the range',
          say: 'Largest minus smallest. A small range means the trials are precise.',
          lines: [{ left: 'range', right: `2.71${NB}g/mL − 2.69${NB}g/mL`, op: '−' }, { right: `0.02${NB}g/mL` }],
        },
      ],
      answer: 'The mean is 2.70 g/mL, with a range of 0.02 g/mL.',
    },
    {
      id: '1.9-2',
      question: 'Pieces of aluminium of 10.0, 20.0, 30.0 and 40.0 mL weigh 27.1, 54.0, 81.2 and 108.0 g. Using the first and last points, find the slope of mass against volume. What does it mean?',
      level: 'typical',
      steps: [
        {
          move: 'Pick two points',
          say: 'Take points far apart: they give the least error.',
          lines: [{ left: 'first', right: '10.0 mL, 27.1 g' }, { left: 'last', right: '40.0 mL, 108.0 g' }],
        },
        {
          move: 'Rise',
          say: 'The rise is the change in mass: later minus earlier. Subtracting keeps one decimal place.',
          lines: [{ left: 'rise', right: `108.0${NB}g − 27.1${NB}g`, op: 'change in mass' }, { right: `80.9${NB}g` }],
        },
        {
          move: 'Run',
          say: 'The run is the change in volume, in the same order.',
          lines: [{ left: 'run', right: `40.0${NB}mL − 10.0${NB}mL`, op: 'change in volume' }, { right: `30.0${NB}mL` }],
        },
        {
          move: 'Divide',
          say: 'Rise ÷ run. Three figures each, so three in the answer.',
          lines: [{ left: 'slope', right: `80.9${NB}g ÷ 30.0${NB}mL`, op: 'rise ÷ run' }, { right: `2.70${NB}g/mL` }],
          qs: [['What does the slope mean?', 'Every extra millilitre of aluminium adds 2.70 g of mass. That is its density.']],
        },
      ],
      answer: 'The slope is 2.70 g/mL, the density of aluminium.',
    },
    {
      id: '1.9-3',
      question: 'A second student gets 2.58, 2.60 and 2.59 g/mL for aluminium, whose accepted density is 2.70 g/mL. What is the percent error of their mean, and what does it show?',
      level: 'harder',
      steps: [
        {
          move: 'Find the mean',
          say: 'Add and divide by the number of trials.',
          lines: [{ left: 'mean', right: `(2.58${NB}g/mL + 2.60${NB}g/mL + 2.59${NB}g/mL) ÷ 3`, op: '÷ 3' }, { right: `2.59${NB}g/mL` }],
        },
        {
          move: 'Percent error',
          say: 'The gap to the accepted value, divided by the accepted value, times 100. Two significant figures, from the gap of 0.11.',
          lines: [{ left: 'error', right: `(2.70${NB}g/mL − 2.59${NB}g/mL) ÷ 2.70${NB}g/mL × 100`, op: '÷ accepted' }, { right: '4.1%' }],
          qs: [['Why divide by 2.70?', 'The error is measured against the truth, so the accepted value is the whole. Dividing by your own result would change the size of the whole.']],
        },
        {
          move: 'Read it',
          say: 'The trials differ by only 0.02, so they are precise. But all of them are about 4% low, so they are not accurate.',
          lines: [{ left: 'verdict', right: 'precise, not accurate: look for a systematic error' }],
        },
      ],
      answer: 'The percent error is 4.1%. The trials are precise but not accurate, which suggests a systematic error such as air bubbles on the block.',
    },
  ],
  realUses: [
    { where: 'Heating water', what: 'A kettle warms water from 293.2 K to 353.2 K in 150 s. The slope of temperature against time is the heating rate.', eq: `(353.2${NB}K − 293.2${NB}K) ÷ 150${NB}s = 0.400${NB}K/s` },
    { where: 'A runner', what: 'At 10 s a runner is 100 m from the start, at 30 s 250 m. The slope of distance against time is the speed.', eq: `(250${NB}m − 100${NB}m) ÷ (30${NB}s − 10${NB}s) = 7.5${NB}m/s` },
    { where: 'Density from data', what: 'Using the 20.0 mL and 40.0 mL pieces of aluminium gives the same density as the whole table.', eq: `(108.0${NB}g − 54.0${NB}g) ÷ (40.0${NB}mL − 20.0${NB}mL) = 2.70${NB}g/mL` },
    { where: 'Checking a kitchen scale', what: 'A scale reads 98.6 g for a standard 100.0 g mass, a small percent error.', eq: `(100.0${NB}g − 98.6${NB}g) ÷ 100.0${NB}g × 100 = 1.4%` },
    { where: 'Monthly rainfall', what: 'Three months of rain are averaged to give a typical month.', eq: `(12${NB}mm + 30${NB}mm + 18${NB}mm) ÷ 3 = 20${NB}mm` },
  ],
  next: [
    { id: '0.7', note: 'The maths of straight-line graphs.' },
    { id: '4.1', note: 'Grams against moles is a straight line whose slope is the molar mass.' },
    { id: '17.1', note: 'Rate is a slope on a graph of concentration against time.' },
  ],
};
