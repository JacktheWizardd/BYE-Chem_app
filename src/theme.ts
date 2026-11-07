// The BYE look: paper ground, hairlines, one meaning per colour (docs/design-guide.md).
export const color = {
  canvas: '#e7e1d5',
  ground: '#f6f3ec',
  band: '#fcfaf5',
  card: '#fffdf8',
  line: '#e3dccf',
  axis: '#8a8378',
  /** Secondary text that still reads at 4.5:1. */
  muted: '#6b655b',
  ink: '#1e1c19',
  ink2: '#5a554d',
  onInk: '#f6f3ec',
  /** "Where you are". */
  coral: '#d9846a',
  coralSoft: '#fbefe9',
  /** BYE's dot. */
  too: '#f3b63f',
  /** A measured or highlighted value; also "not yet". */
  shu: '#b5462a',
  /** Grams. */
  mass: '#2f4b7c',
  /** Moles; also "right". */
  mol: '#2f6b4a',
  molSoft: '#e6efe8',
  elH: '#fffdf8',
  elO: '#c4553a',
  water: '#9fc0e3',
} as const;

export const font = {
  sans: 'ZenKakuGothicNew_400Regular',
  sansMedium: 'ZenKakuGothicNew_500Medium',
  sansBold: 'ZenKakuGothicNew_700Bold',
  serif: 'ShipporiMincho_400Regular',
  chem: 'STIXTwoText_400Regular',
  chemItalic: 'STIXTwoText_400Regular_Italic',
  grotesk: 'SchibstedGrotesk_700Bold',
} as const;

/** The app column on wide screens. */
export const MAX_WIDTH = 520;
export const PAD = 24;
/** Smallest comfortable tap target. */
export const TAP = 44;
