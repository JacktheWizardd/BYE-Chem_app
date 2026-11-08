# BYE Chem sound candidates: credits

Every recording below is **CC0 1.0** (public domain dedication,
https://creativecommons.org/publicdomain/zero/1.0/), which allows shipping in an app with no attribution. The credits
are a courtesy. Each licence was read on the sound's own Freesound page on 2026-11-07. None of these sounds is made in
code. Mixkit was left out because its licence forbids redistributing the files on their own, and this repo is public.

## The source and the edits

The source of every file is the Freesound high-quality preview (Ogg Vorbis, about 192 kbps). Every file gets the same
edits:

- resampled to 44.1 kHz mono;
- 80 Hz high-pass and 4 kHz low-pass (2nd-order Butterworth, zero phase), to take off rumble and the sharp top;
- trimmed from 3 ms before the first attack, with a 1.5 ms fade-in and a raised-cosine fade-out;
- padded to BYE Math's lengths: tap and select are 70 ms, done is 500 ms;
- loudness-matched to BYE Math's files (`assets/sounds/` on its `origin/main`). Each file's K-weighted energy equals
  the BYE Math file for the same role: tap −32.7 dB, select −38.0 dB, done −26.2 dB. The peak is never above −3 dBFS;
- written as 16-bit PCM WAV, 44.1 kHz mono, the same format as BYE Math's files.

"Start" below is in seconds in the original recording.

## Glass

| File | Source | Author | Licence | Edits beyond the common ones |
|---|---|---|---|---|
| `candidates/glass/tap.wav` | [Test Tube pluck (Bb)](https://freesound.org/people/robni7/sounds/857650/), a test tube plucked with a finger | robni7 | CC0 1.0 | start 0.000, fade-out 30 ms, gain −9.1 dB |
| `candidates/glass/select.wav` | [Glass Tap](https://freesound.org/people/zembacraftworks/sounds/427389/), a single tap on a pint glass | zembacraftworks | CC0 1.0 | start 0.089, fade-out 30 ms, gain −3.8 dB |
| `candidates/glass/done.wav` | [clinking glass.aiff](https://freesound.org/people/TheWah/sounds/104815/), a knife clinking a wine glass | TheWah | CC0 1.0 | start 0.217, the first two of its three clinks, cut at 0.648 with a 90 ms fade-out before the third, gain +6.0 dB |

## Water

| File | Source | Author | Licence | Edits beyond the common ones |
|---|---|---|---|---|
| `candidates/water/tap.wav` | [Drop_PipetteDripFast_7_SFX](https://freesound.org/people/hanasmusic/sounds/841488/), a cosmetic pipette dripping into a small glass jar of water (AKG C414) | hanasmusic | CC0 1.0 | start 0.000, fade-out 30 ms, gain −7.6 dB |
| `candidates/water/select.wav` | [Water Drop 01](https://freesound.org/people/LilMati/sounds/348022/), a single water drop | LilMati | CC0 1.0 | start 0.005, fade-out 30 ms, gain −9.7 dB |
| `candidates/water/done.wav` | [bubble1.wav](https://freesound.org/people/Godowan/sounds/235264/), bubbles blown through a straw into a teacup | Godowan | CC0 1.0 | start 0.025, fade-out 120 ms, gain +8.2 dB |

## Ceramic

| File | Source | Author | Licence | Edits beyond the common ones |
|---|---|---|---|---|
| `candidates/ceramic/tap.wav` | [cup_02.wav](https://freesound.org/people/Nightflame/sounds/368613/), a ceramic mug set down on a wooden desk | Nightflame | CC0 1.0 | start 0.077, fade-out 30 ms, gain −6.7 dB |
| `candidates/ceramic/select.wav` | [teacup three taps](https://freesound.org/people/nikerk/sounds/764773/), cutlery clinking on a teacup | nikerk | CC0 1.0 | **pitched down 7 semitones by resampling** (from about 3.6 kHz, to sit nearer BYE Math's 1–1.5 kHz), start 0.744 (the third tap), fade-out 30 ms, gain −0.8 dB |
| `candidates/ceramic/done.wav` | [spoon on cup.WAV](https://freesound.org/people/samplecat/sounds/11593/), a spoon knocking on a cup | samplecat | CC0 1.0 | **pitched down 5 semitones by resampling**, start 0.286, its 2nd and 3rd knocks, cut at 0.605 (before the 4th) with an 80 ms fade-out, gain −1.6 dB |

## Rejected while sourcing

- Mouth-made "water drops", so not real water: Freesound 166325, 661630 and 533146.
- Balloon or cartoon pops tagged "funny": 422812 and 422813.
- Made in a DAW with synths: 840042.
- Clipped in the source: 255670 and 368614.
- Too bright or clicky by measurement (more than 75 % of the energy above 4 kHz): 629997, 667276 and 129796.
