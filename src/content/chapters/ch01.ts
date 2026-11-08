import type { ChapterContent } from '../types';

// Chapter 1 · Matter and Measurement (Tro ch. 1). Numbers checked by test/content.test.ts.
const NB = ' ';

export const ch01: ChapterContent = {
  num: 1,
  promise: 'See what everything is made of, and measure it honestly.',
  letsYouDo: {
    task: 'Hold a 750 mL bottle of water and say what it weighs in kilograms, to the right number of digits, without a scale.',
    particles: {
      describe: 'Three water molecules labelled 750 millilitres equals 0.750 kilograms.',
      groups: [{ items: [{ formula: 'H2O' }, { formula: 'H2O' }, { formula: 'H2O' }], label: '750 mL = 0.750 kg' }],
    },
    caption: 'The trick: water has a density of 1.00 g/mL, and units cancel like numbers. Change the unit, not the water.',
  },
  story: [
    { p: 'Chemistry starts with matter, anything that has mass and takes up space, and with the atoms and molecules it is made of (1.1). Matter comes in a few kinds, and you can tell an element from a compound from a mixture by asking what its particles are (1.2).' },
    { p: 'Matter changes. In a physical change the same particles are arranged differently, and in a chemical change new substances appear (1.3). Every change also moves energy, out of the chemicals or into them (1.4).' },
    { p: 'To say how much, you need numbers with units. SI units and their prefixes keep everyone talking about the same amounts (1.5), and density joins mass and volume in one number (1.6). Significant figures say how sure each number is (1.7).' },
    { p: 'The factor-label method turns any unit into any other, with the units cancelling to check your work (1.8). Reading data then pulls a pattern out of a table: a slope, a mean, a percent error (1.9). By the end, the water in the bottle at the top of the page is no mystery: 750 mL is 0.750 kg.' },
  ],
  groups: [
    { name: 'What matter is', ids: ['1.1', '1.2'] },
    { name: 'How matter changes', ids: ['1.3', '1.4'] },
    { name: 'Measuring it honestly', ids: ['1.5', '1.6', '1.7', '1.8', '1.9'] },
  ],
  glance: [
    { eq: 'one kind of particle: pure · more than one kind: mixture', note: 'A pure substance is an element (one kind of atom) or a compound (a fixed recipe).', from: '1.2' },
    { eq: 'same substance: physical · new substance: chemical', note: 'The test is always whether new substances formed.', from: '1.3' },
    { eq: 'energy out: exothermic · energy in: endothermic', note: 'Heat flows from hot to cold. Energy is never lost.', from: '1.4' },
    { eq: 'kilo 10<sup>3</sup> · milli 10<sup>−3</sup> · micro 10<sup>−6</sup> · nano 10<sup>−9</sup>', note: 'A prefix is a power of ten. K = °C + 273.15.', from: '1.5' },
    { eq: 'density = <g>mass</g> ÷ volume', note: 'Grams per millilitre. Less than 1.00 g/mL floats in water.', from: '1.6' },
    { eq: '× ÷: fewest figures · + −: fewest decimal places', note: 'Round once, at the end. Counted and defined numbers are exact.', from: '1.7' },
    { eq: 'start × (new unit ÷ old unit)', note: 'The factor equals 1. The unit you remove goes on the bottom to cancel.', from: '1.8' },
    { eq: 'slope = rise ÷ run', note: 'Mean = sum ÷ count. Percent error = gap ÷ accepted × 100.', from: '1.9' },
  ],
  uses: [
    { where: 'A bottle of water', what: 'A 750 mL bottle of water has a mass of 0.750 kg: density, then a unit change.', eq: `750${NB}mL × 1.00${NB}g/mL × (1${NB}kg ÷ 1000${NB}g) = 0.750${NB}kg` },
    { where: 'A dose of medicine', what: 'A prescription of 0.250 g is 250 mg on the tablet.', eq: `0.250${NB}g × (1000${NB}mg ÷ 1${NB}g) = 2.50${NB}×${NB}10<sup>2</sup>${NB}mg` },
    { where: 'Oil on water', what: 'Half a litre of cooking oil has less mass than half a litre of water, so it floats.', eq: `0.92${NB}g/mL × 500.${NB}mL = 460${NB}g` },
    { where: 'Identifying a metal', what: 'The slope of mass against volume for a metal gives its density, which names it: this is aluminium.', eq: `(108.0${NB}g − 54.0${NB}g) ÷ (40.0${NB}mL − 20.0${NB}mL) = 2.70${NB}g/mL` },
  ],
};
