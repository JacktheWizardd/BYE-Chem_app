# BYE Chem simulation engine: what to build on

*2026-11-06. Based on [F-sim-engines.md](F-sim-engines.md) (simulation engines) and [G-rendering.md](G-rendering.md) (2D/3D rendering on Expo). The main session rechecked every licence and last-push date below through the signed-in GitHub CLI.*

## The answer in one paragraph

No open-source engine does what the Lab needs. The chemistry simulators are either GPL or unlicensed (PhET), old (Concord Lab, last push 2023), or desktop research software with no phone build (OpenMM, LAMMPS, GROMACS). The physics engines (Matter.js, cannon-es, Rapier) only do rigid bodies bumping. They have no attraction between particles, no temperature, no bonds and no reactions.

So we **write a small simulation core ourselves**, in plain TypeScript. One core runs both views: **2D drawn with Skia** and **3D drawn with three.js on expo-gl**. That's the same 3D stack BYE Math Engine already uses, so its 3D pieces carry over. We **learn from** PhET and Concord's designs, and may **port** Concord's MIT-licensed code with credit.

## Licences (checked 2026-11-06)

| Project | What it is | Licence | Last push | Verdict |
|---|---|---|---|---|
| Concord Consortium Lab (md2d) | Educational molecular dynamics in JS | MIT | 2023-07-18 | **Learn from / port pieces** with attribution; old toolchain |
| PhET states-of-matter, gas-properties, molecule-shapes | Educational chemistry sims | **none** (no LICENSE file) | 2026-10-09 | **Learn from the design only**; don't copy code |
| PhET sugar-and-salt-solutions | Dissolving sim | **GPL-3.0** | 2023-08-14 | Learn from the design only; GPL can't go into a closed app |
| PhET scenery, axon | PhET's shared libraries | MIT | 2026-09-13 | Not needed (DOM/web scene graph) |
| Matter.js | 2D rigid-body physics, pure JS | MIT | 2026-09-30 | Optional, only for rigid "toy" scenes |
| cannon-es | 3D rigid-body physics, pure JS | MIT | 2024-01-06 | Stale; not needed |
| planck.js | 2D Box2D port, pure JS | MIT | 2026-10-23 | Not needed |
| Rapier | 2D/3D physics, WASM | Apache-2.0 | 2026-11-01 (JS repo **archived** 2026-07-12) | Avoid for now: needs WebAssembly on the phone (unconfirmed) |
| three.js | 3D rendering | MIT | 2026-11-06 | **Use** (already in BYE Math Engine) |
| React Three Fiber | React wrapper for three.js | MIT | 2026-10-21 | Optional; adds nothing we need |
| react-native-skia | Fast 2D drawing (iOS, Android, web) | MIT | 2026-11-06 | **Use for 2D** (Atlas: one sprite drawn many times) |
| react-native-filament | 3D renderer (Google Filament) | MIT | 2026-05-27 | Skip: native-only, more setup |
| react-native-webgpu | WebGPU for RN | MIT | 2026-11-06 | Watch; pre-1.0, dev build only |
| NGL, Mol*, Miew | Molecule viewers | MIT | 2026 | Browser-only; style reference |
| OpenChemLib JS | Chemistry toolkit | BSD-3-Clause | 2026-11-03 | Possible build-time 3D coordinates |
| RDKit.js | Chemistry toolkit (WASM) | none on GitHub (BSD-3 on npm) | 2026-09-19 | Build-time only, if at all |

## The engine we'd build: "BYE Chem Engine"

It mirrors BYE Math Engine: a plain-JSON description in, a picture out, never a crash or a blank screen. It has three parts.

**1. Core (plain TypeScript, no React, same code on phone and web)**
- Particles live in flat number arrays: position, velocity, type, bonds. 2D is just 3D with z held at 0, so one core serves both views.
- Each step uses a standard method (velocity Verlet) with a fixed time step and a seeded random generator. The same settings always play out the same way, so challenges can be checked automatically.
- **Forces:**
  - soft repulsion for an ideal gas;
  - Lennard-Jones attraction for states of matter (particles cling when cool, fly apart when hot);
  - springs for bonds, with a break threshold.
- **Temperature:** a thermostat that rescales speeds toward the slider's temperature.
- **Pressure:** measured from the actual wall hits (momentum transferred to the walls and piston), and shown next to the PV = nRT value. Kids see the two agree.
- **Reactions:** a rule table, e.g. "an H₂ and an O₂ close together with enough energy become water". The rules always conserve atoms, which is checked every step. Activation energy is part of each rule.
- **Molecule shapes:** a small VSEPR solver that pushes bond and lone-pair directions apart on a sphere, giving linear, bent, trigonal and tetrahedral shapes for 3D models.

**2. Scenarios (JSON)** — one per Lab sandbox: `gasBox`, `statesOfMatter`, `mixReact`, `dissolve`, `buildMolecule`. Each has its controls, its "Try this" challenges (checked against the core's state), and a `describe` line for screen readers.

**3. Renderers (thin)**
- **2D:** react-native-skia's Atlas draws hundreds of atom sprites in one call, with the element letter baked into each sprite. It runs in Expo Go and on the web, and fits the app's installed Reanimated and worklets.
- **3D:** three.js `InstancedMesh` (one draw for all spheres of an element) on expo-gl. This reuses BYE Math Engine's `ByeFigure3D` setup, renderer workaround, orbit gestures, label overlay and theme.
- **Thread:** the loop starts on the JS thread with the math engine's frame clock. It moves to a worklet thread only if profiling says so.

## What's still unknown (test before committing)

- **Speed on a real phone.** No published benchmark exists for Skia Atlas or three.js instancing at hundreds of particles. The first spike must measure frames per second on a mid-range phone and on the iOS Simulator.
- **3D on the iOS Simulator.** React Three Fiber's docs warn OpenGL is unreliable there, and you test on the simulator. Check early, and confirm on a real phone.
- **WebAssembly on the phone (Hermes).** No authoritative source says it's available. The plan doesn't need it, which is one more reason to skip Rapier.
- **Concord md2d.** How cleanly its code separates from its old build is unknown; read it before porting anything.

## Suggested first step

**A spike:** Gas in a box, one core, two views (Skia 2D and three.js 3D), in a throwaway Expo app. Done means:
1. About 300 particles run smoothly in both views on the simulator and a phone.
2. Wall-hit pressure lands within about 10% of PV = nRT.
3. Same seed, same result.

That proves the engine shape before any sandbox is built for real.
