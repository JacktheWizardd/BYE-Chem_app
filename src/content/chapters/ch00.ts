import type { ChapterContent } from '../types';

// Chapter 0 · Maths for Chemistry. Focus: fast, calculator-free arithmetic (docs/chapter-map.md).
export const ch00: ChapterContent = {
  num: 0,
  promise: 'The few maths moves chemistry uses, refreshed. No chemistry needed.',
  story: [
    { p: 'Chemistry counts things that are huge, like the molecules in a spoonful of sugar, and tiny, like the mass of one atom. Powers of ten keep those numbers short (0.1).' },
    { p: 'Recipes in chemistry are ratios (0.2), its formulas link three quantities you rearrange (0.3), and units travel with every number (0.4). Logarithms, quadratics and straight-line graphs wait until a later chapter needs them (0.5–0.7).' },
  ],
  groups: [
    { name: 'Before Chapter 1', ids: ['0.1', '0.2', '0.3', '0.4'] },
    { name: 'When a later chapter needs it', ids: ['0.5', '0.6', '0.7'] },
  ],
};
