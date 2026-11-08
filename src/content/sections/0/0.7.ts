import type { SectionContent } from '../../types';

// Section 0.7 · Straight-Line Graphs (Tro 1.9). Maths section.
// Running example: ethanol added to an empty beaker 10 mL at a time. Total mass = 0.790 g/mL × volume + 52.0 g, so the
// slope is the density and the intercept is the empty beaker. Every worked number is recomputed by test/content.test.ts.
// This section has no plotted graph (no scatter-plus-line figure exists yet); tables and frames stand in for it.
const NB = ' '; // keeps a number and its unit together

export const s0_7: SectionContent = {
  id: '0.7',
  intro: 'Chemists test an idea by changing one thing and measuring another. When the points line up, the line itself holds the answer. This section shows how to read its slope and intercept, and how to use them both ways.',
  reads: [
    {
      id: 'points-on-a-line',
      title: 'Points that line up',
      gist: 'When one quantity changes steadily with another, the data points fall on a line.',
      minutes: 3,
      blocks: [
        { p: `Put an empty beaker on a balance and add ethanol 10${NB}mL at a time, weighing each time. The table is one point for each row: volume across, mass up.` },
        {
          table: {
            head: ['Volume added (mL)', 'Total mass (g)'],
            rows: [['0', '52.0'], ['10.0', '59.9'], ['20.0', '67.8'], ['30.0', '75.7'], ['40.0', '83.6']],
          },
        },
        { p: 'Look at the second column. Every 10 mL adds the same amount of mass. Between the first two rows the mass goes up by:' },
        { eq: [`59.9${NB}g − 52.0${NB}g = 7.9${NB}g`, `67.8${NB}g − 59.9${NB}g = 7.9${NB}g`] },
        {
          frames: [
            { caption: 'Each row is a point: (volume, mass).', eq: ['(0, 52.0)', '(10.0, 59.9)'] },
            { caption: 'Each step of 10 mL adds the same 7.9 g, so the points climb evenly.', eq: ['(20.0, 67.8)', '(30.0, 75.7)'] },
            { caption: 'Join the points: they lie on a straight line.', eq: ['(40.0, 83.6)'] },
          ],
          label: 'Picture it',
        },
        { key: 'A steady change makes a straight line.' },
        { p: 'Through this section we follow the beaker: what the line’s steepness means, what its starting height means, and how to use it.' },
      ],
    },
    {
      id: 'slope',
      title: 'Slope: rise over run',
      gist: 'The slope says how much y changes for each 1 of x.',
      minutes: 3,
      blocks: [
        { p: 'How steep is the line? Choose two points. The <b>rise</b> is how far up the line goes between them, and the <b>run</b> is how far across. Take the points at 10.0 mL and 40.0 mL.' },
        {
          frames: [
            { caption: 'Two points far apart: (10.0, 59.9) and (40.0, 83.6).', eq: ['(10.0, 59.9)', '(40.0, 83.6)'] },
            { caption: 'The rise: how far the mass goes up.', eq: [`83.6${NB}g − 59.9${NB}g = 23.7${NB}g`] },
            { caption: 'The run: how far the volume goes across.', eq: [`40.0${NB}mL − 10.0${NB}mL = 30.0${NB}mL`] },
            { caption: 'Divide the rise by the run.', eq: [`23.7${NB}g ÷ 30.0${NB}mL = 0.790${NB}g/mL`] },
          ],
          label: 'Picture it',
        },
        { eq: [`83.6${NB}g − 59.9${NB}g = 23.7${NB}g`, `40.0${NB}mL − 10.0${NB}mL = 30.0${NB}mL`, `23.7${NB}g ÷ 30.0${NB}mL = 0.790${NB}g/mL`] },
        { key: 'Slope = rise ÷ run = change in <i>y</i> ÷ change in <i>x</i>.' },
        { p: 'The slope has units: the units of <i>y</i> divided by the units of <i>x</i>. Here that is g/mL. It is 0.790 g for each mL, which is the <b>density</b> of ethanol. A line of mass against volume always has the density as its slope.' },
        { p: 'Subtract in the same order on top and bottom, later point minus earlier point both times. Otherwise the sign flips.' },
      ],
    },
    {
      id: 'intercept',
      title: 'The intercept',
      gist: 'The intercept is where the line crosses the y axis: y when x is zero.',
      minutes: 2,
      blocks: [
        { p: 'Look at the first row of the table. With 0 mL of ethanol added, the balance reads 52.0 g. That is the empty beaker alone.' },
        {
          frames: [
            { caption: 'Go to x = 0: no liquid added.', eq: [`<i>x</i> = 0${NB}mL`] },
            { caption: 'Read y there: the beaker on its own.', eq: [`<i>y</i> = 52.0${NB}g`] },
            { caption: 'That value is the intercept, called b.', eq: [`<i>b</i> = 52.0${NB}g`] },
          ],
          label: 'Picture it',
        },
        { key: 'The intercept is the value of <i>y</i> when <i>x</i> is 0.' },
        { p: 'It is not the first point you happened to pick. It is the point at zero. In chemistry it often has a meaning: the container, the starting concentration, the reading with nothing in it.' },
      ],
    },
    {
      id: 'y-equals-mx-plus-b',
      title: 'The equation of the line',
      gist: 'y = mx + b puts the slope and the intercept into one formula.',
      minutes: 3,
      blocks: [
        { p: 'Put the two ideas together. Start at the intercept, then add the slope for every step of <i>x</i>. Mathematicians call the slope <i>m</i> and the intercept <i>b</i>.' },
        { eq: ['<i>y</i> = <i>m</i><i>x</i> + <i>b</i>'] },
        {
          frames: [
            { caption: 'The general line.', eq: ['<i>y</i> = <i>m</i><i>x</i> + <i>b</i>'] },
            { caption: 'Our slope, from the last read.', eq: [`<i>m</i> = 0.790${NB}g/mL`] },
            { caption: 'Our intercept, the empty beaker.', eq: [`<i>b</i> = 52.0${NB}g`] },
            { caption: 'The beaker’s line, in words.', eq: [`total mass = 0.790${NB}g/mL × volume + 52.0${NB}g`] },
          ],
          label: 'Picture it',
        },
        { p: 'Now use it to look ahead. What would the beaker read with 50.0 mL of ethanol in it? That is further than the table goes, but the line gives the answer.' },
        { work: [[`0.790${NB}g/mL × 50.0${NB}mL + 52.0${NB}g = 91.5${NB}g`, 'slope × volume + intercept']] },
        { key: '<i>y</i> = <i>m</i><i>x</i> + <i>b</i>. <i>m</i> is the slope, <i>b</i> is where the line starts.' },
      ],
    },
    {
      id: 'reading-both-ways',
      title: 'Reading the line both ways',
      gist: 'Find y from x, or rearrange to find x from y.',
      minutes: 3,
      blocks: [
        { p: 'So far we started with a volume and found a mass. Often it is the other way round: the balance reads 67.8 g, how much ethanol is in there? Rearrange the line with the balance rule from Section 0.3.' },
        {
          frames: [
            { caption: 'The line.', eq: ['<i>y</i> = <i>m</i><i>x</i> + <i>b</i>'] },
            { caption: 'Subtract b from both sides.', eq: ['<i>y</i> − <i>b</i> = <i>m</i><i>x</i>'] },
            { caption: 'Divide both sides by m. x is alone.', eq: ['<i>x</i> = (<i>y</i> − <i>b</i>) ÷ <i>m</i>'] },
          ],
          label: 'Picture it',
        },
        { work: [[`(67.8${NB}g − 52.0${NB}g) ÷ 0.790${NB}g/mL = 20.0${NB}mL`, 'subtract the beaker, then divide']] },
        { key: 'To go back from <i>y</i> to <i>x</i>: subtract the intercept, then divide by the slope.' },
        { p: 'The answer, 20.0 mL, matches the row in the table. That is a good check.' },
      ],
    },
    {
      id: 'real-data',
      title: 'Real data aren’t perfect',
      gist: 'Real points scatter a little; the best-fit line runs through the middle of them.',
      minutes: 2,
      blocks: [
        { p: 'Real balances have small errors, so real points miss the line by a little. Suppose the reading at 30.0 mL was 75.9 g, when the line says 75.7 g.' },
        { eq: [`75.9${NB}g − 75.7${NB}g = 0.2${NB}g`] },
        {
          frames: [
            { caption: 'The line says 75.7 g at 30.0 mL.', eq: [`75.7${NB}g`] },
            { caption: 'The balance read 75.9 g: it misses by 0.2 g.', eq: [`75.9${NB}g`] },
            { caption: 'The best-fit line passes as close as it can to all the points.', eq: ['some misses above, some below'] },
          ],
          label: 'Picture it',
        },
        { p: 'The <b>best-fit line</b> is the line that comes closest to all the points together. It need not touch any one of them. A spreadsheet or calculator finds its slope and intercept (“linear regression”). Don’t just join the first and last points.' },
        { key: 'The best-fit line goes through the middle of the points.' },
      ],
    },
    {
      id: 'using-it-well',
      title: 'Using it well',
      gist: 'How to label a line, check the slope’s units, and the moves in Example 1.',
      minutes: 2,
      blocks: [
        { p: 'Label both axes with their quantity and unit before you read anything off. The slope’s unit is then the <i>y</i> unit divided by the <i>x</i> unit, which tells you what the slope means. Mass over volume is density.' },
        { p: 'A slope can also be negative. If <i>y</i> falls as <i>x</i> grows, the rise is negative, so the slope is too. Check the sign by looking at which way the points run.' },
        {
          frames: [
            { caption: 'Points climbing: the slope is positive.', eq: ['rise +, run +'] },
            { caption: 'Points falling: the slope is negative.', eq: ['rise −, run +'] },
          ],
          label: 'Picture it',
        },
        { h: 'The moves in Example 1' },
        {
          work: [
            [`(10.0${NB}mL, 59.9${NB}g) and (40.0${NB}mL, 83.6${NB}g)`, '1 · pick two points far apart'],
            [`83.6${NB}g − 59.9${NB}g = 23.7${NB}g`, '2 · the rise'],
            [`40.0${NB}mL − 10.0${NB}mL = 30.0${NB}mL`, '3 · the run'],
            [`23.7${NB}g ÷ 30.0${NB}mL = 0.790${NB}g/mL`, '4 · slope = rise ÷ run'],
          ],
        },
      ],
    },
  ],
  tool: '<i>y</i> = <i>m</i><i>x</i> + <i>b</i>',
  toolNote: '<i>m</i> is the slope (rise ÷ run, in <i>y</i> units per <i>x</i> unit). <i>b</i> is the intercept, the value of <i>y</i> when <i>x</i> is 0.',
  ideas: [
    { title: 'A steady change makes a line', body: 'Every step of 10 mL adds the same 7.9 g of mass.' },
    { title: 'Slope is rise ÷ run', body: 'Its unit is the <i>y</i> unit per <i>x</i> unit. Mass against volume gives density.' },
    { title: 'Intercept is y at x = 0', body: 'Often it is the container or the start: 52.0 g for the empty beaker.' },
    { title: 'Go backwards with the balance rule', body: '<i>x</i> = (<i>y</i> − <i>b</i>) ÷ <i>m</i>: subtract the intercept, then divide by the slope.' },
  ],
  why: [
    { caption: 'If each step in x adds the same amount to y, the points line up.', eq: ['+10 mL adds +7.9 g every time'] },
    { caption: 'The amount added for each 1 of x is the slope.', eq: ['7.9 ÷ 10 = 0.79'] },
    { caption: 'Where the line starts, at x = 0, is the intercept.', eq: ['52.0 g at 0 mL'] },
  ],
  spot: {
    clues: [
      { text: 'Data that change steadily', example: 'a table where each step adds the same amount', note: 'the points make a straight line' },
      { text: 'The words slope or intercept', example: 'the slope of the line of mass against volume', note: 'rise ÷ run; <i>y</i> at <i>x</i> = 0' },
      { text: '<i>y</i> = <i>m</i><i>x</i> + <i>b</i>', example: `total mass = 0.790${NB}g/mL × volume + 52.0${NB}g`, note: 'slope times x, plus where it starts' },
      { text: 'A plot of one quantity against another', example: 'concentration against time', note: 'read the slope for how fast it changes' },
    ],
    lookAlikes: [
      { looks: 'A curve that bends', use: 'Reading data', why: 'only a straight line has a single slope; a curve needs other tools.', link: '1.9' },
      { looks: 'An equation with <i>x</i><sup>2</sup>', use: 'Solving a quadratic', why: 'a squared term is a curve, not a line.', link: '0.6' },
    ],
  },
  mistakes: [
    { wrong: 'slope = run ÷ rise', right: 'slope = rise ÷ run', why: 'The slope is how much y changes for each 1 of x: y on top.' },
    { wrong: `slope = (83.6 − 59.9) ÷ (10.0 − 40.0)`, right: `slope = (83.6 − 59.9) ÷ (40.0 − 10.0)`, why: 'Subtract in the same order on top and bottom, or the sign flips.' },
    { wrong: `slope = 23.7${NB}g`, right: `slope = 0.790${NB}g/mL`, why: 'The rise is not the slope. Divide by the run, and keep the units.' },
    { wrong: `intercept = 59.9${NB}g (the first point I picked)`, right: `intercept = 52.0${NB}g (the point at 0 mL)`, why: 'The intercept is where x is 0, not wherever you started.' },
    { wrong: '<i>x</i> = (<i>y</i> + <i>b</i>) ÷ <i>m</i>', right: '<i>x</i> = (<i>y</i> − <i>b</i>) ÷ <i>m</i>', why: 'b was added in y = mx + b, so undo it by subtracting.' },
  ],
  examples: [
    {
      id: '0.7-1',
      question: 'A beaker is filled with ethanol. At 10.0 mL the total mass is 59.9 g, and at 40.0 mL it is 83.6 g. What is the slope of mass against volume?',
      level: 'easy',
      steps: [
        {
          move: 'Pick two points',
          say: 'Use the two given points. Points far apart give the most reliable slope.',
          lines: [{ left: 'point 1', right: `(10.0${NB}mL, 59.9${NB}g)` }, { left: 'point 2', right: `(40.0${NB}mL, 83.6${NB}g)` }],
        },
        {
          move: 'Rise and run',
          say: 'The rise is the change in mass. The run is the change in volume. Later point minus earlier point, both times.',
          lines: [{ left: 'rise', right: `83.6${NB}g − 59.9${NB}g`, op: '−' }, { right: `23.7${NB}g` }, { left: 'run', right: `40.0${NB}mL − 10.0${NB}mL`, op: '−' }, { right: `30.0${NB}mL` }],
        },
        {
          move: 'Divide',
          say: 'Slope is rise over run. The unit is g per mL, the density.',
          lines: [{ left: 'slope', right: `23.7${NB}g ÷ 30.0${NB}mL`, op: '÷' }, { right: `0.790${NB}g/mL` }],
        },
      ],
      answer: 'The slope is 0.790 g/mL. That is the density of ethanol.',
    },
    {
      id: '0.7-2',
      question: 'A reactant is used up. Its concentration is 0.100 mol/L at 0 s and 0.040 mol/L at 30 s, falling steadily. Find the slope and the intercept of concentration against time, and write the line.',
      level: 'typical',
      steps: [
        {
          move: 'Pick two points',
          say: 'Use the first and last points.',
          lines: [{ left: 'point 1', right: `(0${NB}s, 0.100${NB}mol/L)` }, { left: 'point 2', right: `(30${NB}s, 0.040${NB}mol/L)` }],
        },
        {
          move: 'Rise and run',
          say: 'The concentration goes down, so the rise is negative. The run is the time that passes.',
          lines: [{ left: 'rise', right: `0.040${NB}mol/L − 0.100${NB}mol/L`, op: '−' }, { right: `−0.060${NB}mol/L` }, { left: 'run', right: `30${NB}s − 0${NB}s`, op: '−' }, { right: `30${NB}s` }],
        },
        {
          move: 'Divide',
          say: 'Rise over run. A negative slope means the concentration falls. Two significant figures, as in the data.',
          lines: [{ left: 'slope', right: `−0.060${NB}mol/L ÷ 30${NB}s`, op: '÷' }, { right: `−0.0020${NB}mol/(L·s)` }],
        },
        {
          move: 'Read the intercept',
          say: 'The intercept is the value at t = 0 s: the starting concentration.',
          lines: [{ left: '<i>b</i>', right: `0.100${NB}mol/L` }],
        },
        {
          move: 'Write the line',
          say: 'Slope times t, plus the intercept. The slope is negative.',
          lines: [{ left: '<i>c</i>', right: '−0.0020 <i>t</i> + 0.100' }],
        },
      ],
      answer: 'The slope is −0.0020 mol/(L·s) and the intercept is 0.100 mol/L, so <i>c</i> = −0.0020 <i>t</i> + 0.100.',
    },
    {
      id: '0.7-3',
      question: 'A reactant’s concentration follows c = −0.0020 t + 0.100, with c in mol/L and t in seconds. When does it reach 0.050 mol/L?',
      level: 'harder',
      steps: [
        {
          move: 'Write the line',
          say: 'We know c and want t, so we have to rearrange the line.',
          lines: [{ left: '<i>c</i>', right: '<i>m</i><i>t</i> + <i>b</i>' }],
        },
        {
          move: 'Free t',
          say: 'Subtract b from both sides, then divide both sides by m. This is the balance rule from Section 0.3.',
          lines: [{ left: '<i>c</i> − <i>b</i>', right: '<i>m</i><i>t</i>', op: '− <i>b</i>' }, { left: '<i>t</i>', right: '(<i>c</i> − <i>b</i>) ÷ <i>m</i>', op: '÷ <i>m</i>' }],
        },
        {
          move: 'Put in numbers',
          say: 'The slope is negative, so the top and bottom are both negative and the time comes out positive.',
          lines: [{ left: '<i>t</i>', right: '(0.050 − 0.100) ÷ (−0.0020)', op: '÷' }, { right: `25${NB}s` }],
          qs: [['Why is the bottom negative?', 'The slope m is −0.0020: the concentration falls as time goes on.']],
        },
        {
          move: 'Check it',
          say: 'Put 25 s back into the line. It should give 0.050 mol/L.',
          lines: [{ left: '<i>c</i>', right: '−0.0020 × 25 + 0.100', op: '×' }, { right: `0.050${NB}mol/L` }],
        },
      ],
      answer: 'The concentration reaches 0.050 mol/L after 25 s.',
    },
  ],
  realUses: [
    { where: 'Finding a density', what: 'The slope of mass against volume for ethanol is its density, 0.790 g/mL.', eq: `23.7${NB}g ÷ 30.0${NB}mL = 0.790${NB}g/mL` },
    { where: 'Predicting a mass', what: 'With the line, 50.0 mL of ethanol in the beaker reads 91.5 g.', eq: `0.790${NB}g/mL × 50.0${NB}mL + 52.0${NB}g = 91.5${NB}g` },
    { where: 'A falling concentration', what: 'A reactant that goes from 0.100 mol/L to 0.060 mol/L in 20 s has a negative slope: −0.0020 mol/(L·s).', eq: `(0.060${NB}mol/L − 0.100${NB}mol/L) ÷ (20${NB}s − 0${NB}s) = −0.0020` },
    { where: 'A calibration line', what: 'A coloured solution has an absorbance of 0.60 at 2.0 mmol/L, so the line has a slope of 0.30 per mmol/L. An absorbance of 0.45 then means 1.5 mmol/L.', eq: '0.45 ÷ 0.30 = 1.5' },
    { where: 'A gas heating up', what: 'For 1.00 mol of gas at 1.00 atm, the volume rises 0.08206 L for each kelvin. At 300 K that is 24.6 L.', eq: '0.08206 × 300 = 24.6' },
  ],
  next: [
    { id: '1.9', note: 'Reading data: tables and graphs of real results.' },
    { id: '1.6', note: 'Density is the slope of mass against volume.' },
  ],
};
