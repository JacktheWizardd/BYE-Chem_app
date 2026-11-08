// The chemistry sound set (tap, select, done) is still being chosen by the user from
// design/sounds/ candidates (docs/ui-guide.md §3). Until then there are no sounds to play and the
// Sounds switch is hidden; feedback.ts already calls these, so wiring the chosen set in is local.
export type Sound = 'press' | 'select' | 'done';

export const SOUNDS_READY = false;

export function preloadSounds(): void {}

export function playSound(_kind: Sound): void {}
