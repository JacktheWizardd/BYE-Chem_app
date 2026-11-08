// Web version of sound.ts. It uses Web Audio, which starts a sound within a few milliseconds of the tap;
// an <audio> element can lag noticeably, especially in Safari. On iPhone, Web Audio also stays quiet
// when the silent switch is on, like the app.
import { Asset } from 'expo-asset';

export const SOURCES = {
  press: require('../assets/sounds/tap.wav'),
  select: require('../assets/sounds/tap-select.wav'),
  done: require('../assets/sounds/done.wav'),
};
export type Sound = keyof typeof SOURCES;

/** How loud the sounds play, 0–1. Kept very low so they're a subtle hint, not a noise. */
export const VOLUME = 0.07;

const KINDS = Object.keys(SOURCES) as Sound[];
let ready: Promise<void> | null = null;
let ctx: AudioContext | null = null;
let out: GainNode | null = null;
const buffers: Partial<Record<Sound, AudioBuffer>> = {};

/**
 * Downloads and decodes the (tiny) sounds ahead of the first tap, so even that tap's sound starts at
 * once. Decoding uses an offline context, which needs no tap and starts no audio.
 */
export function preloadSounds(): Promise<void> {
  ready ??= (async () => {
    const OAC = globalThis.OfflineAudioContext ?? (globalThis as { webkitOfflineAudioContext?: typeof OfflineAudioContext }).webkitOfflineAudioContext;
    if (!OAC) return;
    const decoder = new OAC(1, 1, 44100);
    await Promise.all(
      KINDS.map(async (k) => {
        try {
          const res = await fetch(Asset.fromModule(SOURCES[k]).uri);
          buffers[k] = await decoder.decodeAudioData(await res.arrayBuffer());
        } catch {
          // This one stays silent.
        }
      }),
    );
  })();
  return ready;
}

/** The audio context is made on the first tap: browsers only let a page start audio from a tap. */
function context(): AudioContext | null {
  if (!ctx) {
    const AC = globalThis.AudioContext ?? (globalThis as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    out = ctx.createGain();
    out.gain.value = VOLUME;
    out.connect(ctx.destination);
    // Safari: mix in over the student's music instead of pausing it.
    const session = (navigator as { audioSession?: { type: string } }).audioSession;
    if (session) session.type = 'ambient';
  }
  if (ctx.state !== 'running') ctx.resume().catch(() => {});
  return ctx;
}

export function playSound(kind: Sound): void {
  const c = context();
  if (!c || !out) return;
  const start = () => {
    const b = buffers[kind];
    if (!b) return;
    const src = c.createBufferSource();
    src.buffer = b;
    src.connect(out!);
    src.start();
  };
  if (buffers[kind]) start();
  else preloadSounds().then(start, () => {});
}
