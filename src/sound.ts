// Plays the app's short sounds on iOS and Android. The web build uses sound.web.ts (Web Audio).
// The sounds are made by scripts/make-sounds.mjs.
import { createAudioPlayer, setAudioModeAsync, type AudioPlayer } from 'expo-audio';

export const SOURCES = {
  press: require('../assets/sounds/tap.wav'),
  select: require('../assets/sounds/tap-select.wav'),
  done: require('../assets/sounds/done.wav'),
};
export type Sound = keyof typeof SOURCES;

/** How loud the sounds play, 0–1. Kept very low so they're a subtle hint, not a noise. */
export const VOLUME = 0.07;

let players: Record<Sound, AudioPlayer> | null = null;

function player(kind: Sound): AudioPlayer {
  const p = createAudioPlayer(SOURCES[kind]);
  p.volume = VOLUME;
  return p;
}

/** Loads the sounds ahead of the first tap, so it isn't late. */
export function preloadSounds(): void {
  if (players) return;
  // Silent when the iPhone's silent switch is on, and mixed in over the student's music instead of stopping it.
  setAudioModeAsync({ playsInSilentMode: false, interruptionMode: 'mixWithOthers' }).catch(() => {});
  players = { press: player('press'), select: player('select'), done: player('done') };
}

export function playSound(kind: Sound): void {
  preloadSounds();
  const p = players![kind];
  // Normally the sound is already rewound (below), so it starts at once; only a tap during it seeks first.
  if (p.playing || p.currentTime > 0) p.seekTo(0).catch(() => {});
  p.play();
  // Rewind once it has finished, so the next tap doesn't have to wait for a seek.
  setTimeout(() => {
    if (!p.playing) p.seekTo(0).catch(() => {});
  }, 600);
}
