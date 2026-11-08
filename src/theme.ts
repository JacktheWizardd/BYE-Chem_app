// BYE Chem design tokens (light theme only). From BYE Math @ b49d14a (src/theme.ts), with chemistry
// meanings; see docs/ui-guide.md. Every colour has one meaning.
export const color = {
  ground: '#f6f3ec', // page background; everything sits directly on it
  card: '#fffdf8',
  band: '#fcfaf5', // every other part of a page, so parts don't blend together
  note: '#efeadf', // press tint, key-fact box
  track: '#ece6da',
  grid: '#ece6da',
  line: '#e3dccf', // 1px hairlines: the main structuring device
  axis: '#8a8378', // disabled / "Soon" rows, inactive tabs, hints
  muted: '#6b655b', // small secondary text that must still read at 4.5:1
  ink: '#1e1c19',
  ink2: '#5a554d',
  onInk: '#f6f3ec',
  coral: '#d9846a', // where you are: active tab, current step, current sidebar row
  coralSoft: '#fbefe9', // the picked tile behind a coral edge (periodic table)
  too: '#f3b63f', // the dot in BYE. and nothing else
  ai: '#2f4b7c', // grams / mass; links
  matsu: '#2f6b4a', // moles / amount; the new part on a frame
  shu: '#b5462a', // a measured, plugged-in or carried value; the operation in the margin
  wrongTint: '#f6e7e1', // behind a common mistake's wrong line
  rightTint: '#e6efe8', // behind its right line
  // Chemistry figures (docs/design-guide.md)
  elH: '#fffdf8',
  elO: '#c4553a',
  elC: '#2c2a27',
  elN: '#3b5ea8',
  elCl: '#3f8a5a',
  elNa: '#7b6aa8',
  water: '#9fc0e3',
} as const;

/** Chemistry meaning aliases, so content code reads as chemistry. */
export const mass = color.ai;
export const mol = color.matsu;

export const font = {
  sans: 'ZenKakuGothicNew_400Regular',
  sansMedium: 'ZenKakuGothicNew_500Medium',
  sansBold: 'ZenKakuGothicNew_700Bold',
  serif: 'ShipporiMincho_400Regular',
  chem: 'STIXTwoText_400Regular',
  chemItalic: 'STIXTwoText_400Regular_Italic',
  grotesk: 'SchibstedGrotesk_700Bold',
} as const;

export const space = { xs: 6, sm: 10, md: 14, lg: 22, pageX: 26, section: 34 } as const;

/** The app is a phone-width column; on tablets and laptops it sits centred with the page colour around it. */
export const MAX_WIDTH = 520;

/** Desktop mode: from DESKTOP_MIN wide the column becomes a sidebar for the book plus wider pages. */
export const DESKTOP_MIN = 900;
export const SIDEBAR_W = 280;
export const SIDEBAR_W_SMALL = 256;
/** On a worked example the sidebar folds to this rail, so the two panes get the width. */
export const RAIL_W = 60;
/** Reading pages keep their text to this width. */
export const READ_MAX = 680;
/** Figures never grow past this. */
export const FIGURE_MAX = 560;
/** The widest the two-pane worked example gets. */
export const PROBLEM_MAX = 1180;

/** Smallest comfortable tap target. */
export const TAP = 44;
