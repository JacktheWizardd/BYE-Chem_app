import { describe, expect, it } from 'vitest';
import { configuration, position } from '@/practice/table';

describe('periodic table positions', () => {
  it.each([[1, 1, 1], [2, 1, 18], [6, 2, 14], [11, 3, 1], [17, 3, 17], [26, 4, 8], [36, 4, 18]])('Z=%i → period %i, group %i', (z, period, group) => {
    expect(position(z)).toEqual({ period, group });
  });
});

describe('electron configurations', () => {
  it.each([
    [1, '1s<sup>1</sup>'],
    [8, '[He] 2s<sup>2</sup> 2p<sup>4</sup>'],
    [17, '[Ne] 3s<sup>2</sup> 3p<sup>5</sup>'],
    [24, '[Ar] 4s<sup>1</sup> 3d<sup>5</sup>'],
    [29, '[Ar] 4s<sup>1</sup> 3d<sup>10</sup>'],
    [26, '[Ar] 4s<sup>2</sup> 3d<sup>6</sup>'],
  ])('Z=%i', (z, want) => expect(configuration(z)).toBe(want));
});
