// Tap feedback (BYE Math @ b49d14a, src/components/feedback.ts): a light vibration always, and a
// soft sound when the reader has turned Sounds on. The sound plays first: a late sound is noticed
// more than a late vibration.
import * as Haptics from 'expo-haptics';
import { useSyncExternalStore } from 'react';
import { Platform } from 'react-native';
import { readPref, writePref } from '@/prefs';
import { playSound, preloadSounds, type Sound } from '@/sound';

// On the web only a touchscreen can vibrate.
const canVibrate = Platform.OS !== 'web' || (typeof matchMedia === 'function' && matchMedia('(pointer: coarse)').matches);

let soundsOn = false;
const listeners = new Set<() => void>();

/** Reads the saved Sounds choice (after loadPrefs on native). */
export function initFeedback(): void {
  soundsOn = readPref('sounds') === 'on';
  if (soundsOn) preloadSounds();
  listeners.forEach((l) => l());
}
initFeedback();

function play(kind: Sound): void {
  if (!soundsOn) return;
  try {
    playSound(kind);
  } catch {
    // No audio here: the tap still works.
  }
}

/** 'select' (a crisp tick) for tabs, frame dots and choosing; 'press' (a soft tap) for buttons and rows. */
export function tap(kind: 'select' | 'press' = 'press'): void {
  play(kind);
  if (!canVibrate) return;
  try {
    const done = kind === 'select' ? Haptics.selectionAsync() : Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    done.catch(() => {});
  } catch {
    // No haptics here.
  }
}

/** The last line of a worked example has appeared. */
export function finished(): void {
  play('done');
}

export function setSoundsOn(on: boolean): void {
  soundsOn = on;
  writePref('sounds', on ? 'on' : 'off');
  listeners.forEach((l) => l());
  if (on) play('press');
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};
const snapshot = () => soundsOn;

export function useSoundsOn(): boolean {
  return useSyncExternalStore(subscribe, snapshot, () => false);
}
