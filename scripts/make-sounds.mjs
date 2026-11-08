// Copied from BYE Math @ b49d14a: BYE Chem uses BYE Math's own sounds (docs/ui-guide.md §3).
// Renders the app's sounds to assets/sounds/*.wav. They're synthesized here, not recorded,
// with the same maths as the sound board mockup (design/sound-demo.html), so they can be
// re-tuned and regenerated: node scripts/make-sounds.mjs
//
//   tap.wav         "Wooden soroban": two wooden abacus beads, for buttons and rows
//   tap-select.wav  its lighter, shorter version, for tabs and choosing a step
//   done.wav        "Wood blocks": a dry double knock, the second higher, when a problem is finished
//
// All three go through a low-pass filter at 1 kHz: the same sounds, with the high, sharp edge taken off.
import { Buffer } from 'node:buffer';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const SR = 44100;
const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'assets', 'sounds');

/** A small seeded random number generator (mulberry32), so every render is identical. */
function rng(seed) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const make = (sec) => new Float32Array(Math.ceil(sec * SR));

/** A sine that can glide from f to f2, with a short attack and an exponential fade. */
function tone(out, { f, f2 = f, sweep = 0.03, at = 0, attack = 0.002, tau, amp = 1 }) {
  const start = Math.round(at * SR);
  let ph = 0;
  for (let i = 0; start + i < out.length; i++) {
    const t = i / SR;
    const fr = t < sweep ? f * Math.pow(f2 / f, t / sweep) : f2;
    ph += (2 * Math.PI * fr) / SR;
    const env = (t < attack ? t / attack : 1) * Math.exp(-Math.max(0, t - attack) / tau);
    if (env < 1e-5 && t > attack) break;
    out[start + i] += amp * env * Math.sin(ph);
  }
}

/** A burst of band-passed noise (RBJ biquad). */
function noise(out, { at = 0, attack = 0.001, tau, amp = 1, bp, q = 1, seed = 7 }) {
  const r = rng(seed);
  const start = Math.round(at * SR);
  const w = (2 * Math.PI * bp) / SR;
  const alpha = Math.sin(w) / (2 * q);
  const a0 = 1 + alpha;
  const b0 = alpha / a0, b2 = -alpha / a0, a1 = (-2 * Math.cos(w)) / a0, a2 = (1 - alpha) / a0;
  let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
  for (let i = 0; start + i < out.length; i++) {
    const t = i / SR;
    const env = (t < attack ? t / attack : 1) * Math.exp(-Math.max(0, t - attack) / tau);
    if (env < 1e-5 && t > attack) break;
    const x = r() * 2 - 1;
    const y = b0 * x + b2 * x2 - a1 * y1 - a2 * y2;
    x2 = x1; x1 = x; y2 = y1; y1 = y;
    out[start + i] += amp * env * y;
  }
}

/**
 * Softens a sound: a low-pass filter (two cascaded RBJ biquads, about 24 dB per octave above
 * `cutoff`) that keeps the sound itself but takes away the high, sharp part of it.
 */
function lowpass(out, cutoff = 1000) {
  const w = (2 * Math.PI * cutoff) / SR;
  const cos = Math.cos(w);
  for (const q of [0.54, 1.31]) { // a 4th-order Butterworth: flat below the cutoff, no ringing bump
    const alpha = Math.sin(w) / (2 * q);
    const a0 = 1 + alpha;
    const b0 = (1 - cos) / 2 / a0, b1 = (1 - cos) / a0, b2 = b0, a1 = (-2 * cos) / a0, a2 = (1 - alpha) / a0;
    let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
    for (let i = 0; i < out.length; i++) {
      const x = out[i];
      const y = b0 * x + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2;
      x2 = x1; x1 = x; y2 = y1; y1 = y;
      out[i] = y;
    }
  }
  return out;
}

/** Scale to a target peak and fade out the last few ms so nothing clicks. */
function finish(out, peak) {
  let m = 0;
  for (const v of out) m = Math.max(m, Math.abs(v));
  const g = m ? peak / m : 0;
  const fade = Math.round(SR * 0.006);
  for (let i = 0; i < out.length; i++) out[i] *= g * Math.min(1, (out.length - 1 - i) / fade);
  return out;
}

// --- Wooden soroban: two big wooden beads, low and warm, the click almost gone. ---
// v: { p: pitch, a: loudness, t: length }. Tabs use a lighter, shorter, slightly higher version.
const PRESS = { p: 1, a: 1, t: 1 };
const SELECT = { p: 1.12, a: 0.55, t: 0.75 };
function bead(o, v, at, f, amp) {
  const attack = 0.002, tau = 0.008;
  tone(o, { f: f * v.p, at, attack, tau: tau * v.t, amp });
  tone(o, { f: f * 2.4 * v.p, at, attack, tau: tau * 0.5 * v.t, amp: amp * 0.2 });
  noise(o, { at, bp: 2200, q: 0.9, attack: 0.001, tau: 0.0015, amp: amp * 0.2, seed: 13 });
}
function soroban(v) {
  const o = make(0.07);
  bead(o, v, 0, 1400, 1);
  bead(o, v, 0.01 * v.t, 1600, 0.6);
  return finish(lowpass(o), 0.42 * v.a);
}

// --- Wood blocks: a dry double knock, the second one higher. ---
function knock(o, f, at, tau = 0.03) {
  tone(o, { f, at, attack: 0.001, tau });
  tone(o, { f: f * 2.3, at, attack: 0.001, tau: tau * 0.4, amp: 0.4 });
  noise(o, { at, bp: f * 3, q: 1, tau: 0.002, amp: 0.5 });
}
function woodBlocks() {
  const o = make(0.5);
  knock(o, 880, 0);
  knock(o, 1180, 0.13);
  return finish(lowpass(o), 0.45);
}

/** 16-bit mono PCM WAV. */
function wav(samples) {
  const data = Buffer.alloc(samples.length * 2);
  samples.forEach((s, i) => data.writeInt16LE(Math.round(Math.max(-1, Math.min(1, s)) * 32767), i * 2));
  const head = Buffer.alloc(44);
  head.write('RIFF', 0);
  head.writeUInt32LE(36 + data.length, 4);
  head.write('WAVE', 8);
  head.write('fmt ', 12);
  head.writeUInt32LE(16, 16);
  head.writeUInt16LE(1, 20); // PCM
  head.writeUInt16LE(1, 22); // mono
  head.writeUInt32LE(SR, 24);
  head.writeUInt32LE(SR * 2, 28);
  head.writeUInt16LE(2, 32);
  head.writeUInt16LE(16, 34);
  head.write('data', 36);
  head.writeUInt32LE(data.length, 40);
  return Buffer.concat([head, data]);
}

mkdirSync(OUT, { recursive: true });
for (const [name, samples] of [
  ['tap.wav', soroban(PRESS)],
  ['tap-select.wav', soroban(SELECT)],
  ['done.wav', woodBlocks()],
]) {
  const file = wav(samples);
  writeFileSync(join(OUT, name), file);
  console.log(`${name}  ${Math.round((samples.length / SR) * 1000)} ms  ${(file.length / 1024).toFixed(1)} KB`);
}
