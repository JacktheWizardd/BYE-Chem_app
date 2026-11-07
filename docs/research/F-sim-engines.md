# F. Simulation engines for BYE Chem sandboxes

Research date: 2026-11-06. Licences and push dates come from the GitHub API (`https://api.github.com/repos/OWNER/REPO`) unless noted; npm licences from `https://registry.npmjs.org/<pkg>/latest`. The GitHub API hit its anonymous rate limit part-way through, so some rows say UNVERIFIED.

## Comparison table

| Name | Simulates | 2D/3D | Language / runtime | Licence + last push | RN / Hermes feasibility | Verdict |
|---|---|---|---|---|---|---|
| Concord "Lab" (md2d) https://github.com/concord-consortium/lab | Classical MD: atoms, LJ, bonds, charges, gas/liquid, reactions-ish | 2D (md2d) | JS (plus a Ruby build toolchain) | MIT, pushed 2023-07-18 (https://api.github.com/repos/concord-consortium/lab) | Engine is plain JS, but tied to a webpack/Ruby toolchain and old code; engine could be ported, not dropped in. UNVERIFIED how separable it is | Learn from (and possibly adapt; MIT) |
| Molecular Workbench (Java) | Same family, older Java app | 2D/3D | Java | UNVERIFIED (repo `concord-consortium/molecular-workbench` returned 404: https://api.github.com/repos/concord-consortium/molecular-workbench) | No | Avoid |
| PhET states-of-matter | Atoms, LJ, phases, pressure/temperature | 2D (3D in a later screen: UNVERIFIED) | JS on PhET's scenery stack | Repo now a "no longer maintained" notice, no LICENSE file found (https://github.com/phetsims/states-of-matter); API shows no licence, pushed 2026-10-09 | Model code is framework-coupled | Learn from the physics ideas only |
| PhET gas-properties | Ideal-gas particles, pressure, volume, temperature | 2D | JS / scenery | Same notice, no licence; pushed 2026-10-09 (https://api.github.com/repos/phetsims/gas-properties) | Same | Learn from |
| PhET build-a-molecule | Assembling molecules from atoms | 2D | JS / scenery | Same notice, no licence; pushed 2026-10-09 (https://api.github.com/repos/phetsims/build-a-molecule) | Same | Learn from |
| PhET molecule-shapes | VSEPR shapes | 3D | JS / three.js-based | Same notice, no licence; pushed 2026-10-09 (https://api.github.com/repos/phetsims/molecule-shapes) | Same | Learn from |
| PhET reactants-products-and-leftovers | Limiting reactant, counted-particle model | 2D (counts, not dynamics) | JS | Same notice, no licence; pushed 2026-10-09 (https://api.github.com/repos/phetsims/reactants-products-and-leftovers) | Same | Learn from |
| PhET sugar-and-salt-solutions | Dissolving, concentration | 2D | JS | GPL-3.0 (LICENSE file: https://raw.githubusercontent.com/phetsims/sugar-and-salt-solutions/main/LICENSE), pushed 2023-08-14 | GPL: cannot go in a closed app | Learn from; do not copy |
| PhET scenery / axon / dot / joist / kite / phet-core / phetcommon | Rendering, observable properties, maths, sim shell | n/a | JS/TS | MIT each; pushed 2026-09-13 (https://api.github.com/repos/phetsims/scenery, .../axon, .../dot, .../joist; scenery LICENSE: https://raw.githubusercontent.com/phetsims/scenery/main/LICENSE) | Built for the DOM/canvas, not RN; not useful | Avoid (as a dependency) |
| ChemCollective | Virtual lab, stoichiometry | n/a | Flash/Java/web | UNVERIFIED, not checked | UNVERIFIED | Learn from (UX only) |
| OpenMM | Biomolecular MD | 3D | C++/Python | MIT for API, reference and CPU platforms; GPL/LGPL parts for GPU platforms (https://raw.githubusercontent.com/OpenMM/openmm/master/docs-source/licenses/Licenses.txt); pushed 2026-11-05 (https://api.github.com/repos/OpenMM/openmm) | No JS/WASM port found | Reference only |
| LAMMPS | General MD | 2D/3D | C++ | GPL-2.0, pushed 2026-11-06 (https://api.github.com/repos/lammps/lammps) | No | Avoid (GPL) |
| GROMACS | Biomolecular MD | 3D | C++ | LGPL-2.1, pushed 2026-11-06 (https://api.github.com/repos/gromacs/gromacs) | No | Reference only |
| HOOMD-blue | Particle MD / MC | 2D/3D | C++/Python | BSD-3-Clause, pushed 2026-11-06 (https://api.github.com/repos/glotzerlab/hoomd-blue) | No | Reference only |
| Rapier 2D / 3D | Rigid bodies, collisions | 2D and 3D | Rust compiled to WASM, JS bindings | Apache-2.0; main repo pushed 2026-11-01 (https://api.github.com/repos/dimforge/rapier); JS repo archived 2026-07-12 and merged into the main repo (https://github.com/dimforge/rapier.js); npm `@dimforge/rapier2d-compat` and `3d-compat` 0.21.0, about 12 MB / 15 MB unpacked (https://registry.npmjs.org/@dimforge/rapier3d-compat/latest) | Needs WebAssembly; Hermes support unconfirmed (see below) | Web only for now; learn from |
| cannon-es | Rigid bodies | 3D | Pure JS | MIT, pushed 2024-01-06 (https://api.github.com/repos/pmndrs/cannon-es); about 0.77 MB unpacked (https://registry.npmjs.org/cannon-es/latest) | Works anywhere JS runs | Learn from; stale |
| Matter.js | Rigid bodies | 2D | Pure JS | MIT, pushed 2026-09-30 (https://api.github.com/repos/liabru/matter-js); about 0.93 MB unpacked (https://registry.npmjs.org/matter-js/latest) | Works anywhere JS runs | Build on only for simple bouncing; see notes |
| planck.js (Box2D port) | Rigid bodies | 2D | Pure JS | MIT per npm `planck` 1.5.1 (https://registry.npmjs.org/planck/latest); GitHub push date UNVERIFIED (old URL redirects: https://api.github.com/repos/shakiba/planck.js) | Pure JS, fine | Learn from |
| Jolt (jolt-physics) | Rigid bodies, soft bodies | 3D | C++ to WASM (also asm.js build, UNVERIFIED) | MIT, JS repo pushed 2026-10-29 (https://api.github.com/repos/jrouwe/JoltPhysics.js); about 47 MB unpacked on npm (https://registry.npmjs.org/jolt-physics/latest) | WASM needed | Avoid (too big, wrong tool) |
| Ammo.js | Bullet port | 3D | C++ to WASM/asm.js | GitHub API said NOASSERTION, pushed 2026-09-22 (https://api.github.com/repos/kripken/ammo.js); LICENSE text is zlib-style (https://raw.githubusercontent.com/kripken/ammo.js/main/LICENSE); npm package shows no licence field (https://registry.npmjs.org/ammo.js/latest) | WASM or asm.js | Avoid |
| Oimo.js | Rigid bodies | 3D | Pure JS | MIT per npm `oimo` 1.0.9 (https://registry.npmjs.org/oimo/latest); LICENSE shown is three.js's (https://raw.githubusercontent.com/lo-th/Oimo.js/master/LICENSE), push date UNVERIFIED | Pure JS | Avoid (old) |

## Key finding: PhET code is not a base we can use

- Every PhET sim repo I checked (states-of-matter, gas-properties, build-a-molecule, molecule-shapes, RPAL) now shows a banner saying the repo is out of date, that PhET moved to a monorepo, and that the monorepo is not public at present: https://github.com/phetsims/states-of-matter (same text served at https://raw.githubusercontent.com/phetsims/states-of-matter/main/README.md). No LICENSE file was found on that repo (https://raw.githubusercontent.com/phetsims/states-of-matter/main/LICENSE returns 404).
- PhET's HTML terms (found via a search result, mirror copies; the official page body would not load for me) say sim-specific source is GPLv3, shared "common code" is per-repo (often MIT), the compiled sim files are CC-BY 4.0, and "interoperable" code is only by agreement: https://phet.colorado.edu/mn/licensing/html. The page also contains a contradictory MIT/GPL sentence, so confirm with PhET before relying on it. Official page for the user to read: https://phet.colorado.edu/en/licensing/html (UNVERIFIED; I read only the mirror above).
- Consequence: we may study the published sims' behaviour, but any copied sim model code is GPL-3 (e.g. https://raw.githubusercontent.com/phetsims/sugar-and-salt-solutions/main/LICENSE), which conflicts with a closed-source App Store app.
- Running model code outside their framework: the sims lean on `axon` observable properties and `dot` vectors (MIT, https://github.com/phetsims/axon), so extraction is possible in principle but needs untangling. UNVERIFIED (I did not read the model code).

## Notes per item

**Concord Lab.** README calls it HTML5 open-source scientific models, visualisation and graphing, MIT licensed, 9,085 commits, not marked archived; build needs npm plus Ruby: https://github.com/concord-consortium/lab. Last push 2023-07 (API above). The md2d folder exists in the tree. A page fetch could not confirm md2d details, so the engine's features (charges, bonds, reactions) are UNVERIFIED. Because it is MIT, it is the one educational MD engine we could legally port from; the cost is reading old code and rewriting it in TypeScript.

**Particle JS libraries on npm.** Searches for "molecular dynamics" and "lennard-jones" found only small or niche packages: `@atomistics/lennard-jones-pairwise-js` (2018, https://www.npmjs.com/package/@atomistics/lennard-jones-pairwise-js), `baoabmd` (protein MD, 2026-09, https://www.npmjs.com/package/baoabmd), `d3-force-md` (velocity-Verlet layout, 2021, https://www.npmjs.com/package/d3-force-md), `d3-force-3d` (https://www.npmjs.com/package/d3-force-3d). Licences of these were not checked: UNVERIFIED. None is a mature, maintained kid-sandbox engine. `3dmol` and `ngl` are viewers, not simulators (https://www.npmjs.com/package/3dmol, https://www.npmjs.com/package/ngl).

**Big MD engines.** OpenMM (MIT core, GPL/LGPL on GPU backends; text at the Licences.txt link), LAMMPS (GPL-2.0), GROMACS (LGPL-2.1), HOOMD-blue (BSD-3). I searched for no JS/WASM ports and found none in the npm results above; absence of a port is UNVERIFIED beyond that. They are tuned for thousands of atoms with realistic force fields, which is the wrong scale for a phone sandbox. Use them only to cross-check our numbers offline.

**Physics engines.** These solve rigid-body contact, not molecular forces. A particle bouncing in a box is trivially simple (our own loop, a few lines per step), and Lennard-Jones attraction, bond springs and thermostats are not in any of them. Matter.js and planck.js are 2D pure JS and run under Hermes. cannon-es is 3D pure JS but last pushed in Jan 2024. Rapier, Jolt and Ammo need WebAssembly.

**Hermes and WebAssembly (authoritative source not found).** Third-party coverage says React Native 0.84 ships Hermes V1 as default and mentions WebAssembly support (https://www.callstack.com/events/react-native-0-84-and-other-news). The official 0.84 blog post lists Hermes V1 but did not mention WebAssembly when I read it (https://reactnative.dev/blog/2026/02/11/react-native-0.84), and the 2020 Hermes issue only records that maintainers wanted it (https://github.com/facebook/hermes/issues/395). So Hermes WASM is UNVERIFIED; do not plan on it. Treat Rapier as web-only until the Hermes repo's docs or release notes confirm it.

## Modelling correctness (sources)

- **Attraction: Lennard-Jones.** A pair potential with a short-range repulsive wall and a longer-range attractive tail, defined by a well depth and a size parameter: https://en.wikipedia.org/wiki/Lennard-Jones_potential. Integrate with velocity Verlet, a standard stable choice for MD: https://en.wikipedia.org/wiki/Verlet_integration. That PhET sims use LJ is a reasonable inference from the sim titles but I did not read their code: UNVERIFIED.
- **Temperature: thermostats.** Common trick is to randomly redraw particle speeds from the target distribution (Andersen): https://en.wikipedia.org/wiki/Andersen_thermostat. Simple rescaling of velocities to a target kinetic energy is the cheap kid-sandbox alternative (not sourced; UNVERIFIED as to which sims do it).
- **Reactions: rule-based bonding with activation energy.** Collision theory says a reaction needs enough collision energy and the right orientation: https://en.wikipedia.org/wiki/Collision_theory. A game rule such as "bond forms when two compatible atoms collide with relative speed above a threshold, bond breaks when stretch/energy exceeds a limit" follows from this. Whether Concord or PhET use exactly this: UNVERIFIED.
- **Molecule shapes.** VSEPR: electron groups repel and arrange themselves to minimise repulsion: https://en.wikipedia.org/wiki/VSEPR_theory. Implementable as repulsion between unit vectors on a sphere, our own code.

## Recommendation

**Build ourselves (a small TypeScript module, no physics engine).** A 2D particle core: velocity-Verlet, cell-grid neighbour search, LJ plus wall bounces, an energy-rescale thermostat, bond list with spring and break threshold, and a rule table for reactions with an activation-energy gate. This covers gas pressure/volume/temperature, states of matter, reactions with limiting reactant (count atoms, let reactions run until reagent runs out), and dissolving (ions as charged LJ particles with a simple screened attraction to water). Reasons: none of the engines model chemistry; the code is short; it runs identically in Hermes and web; no licence risk. A 3D version is the same maths with a third coordinate, rendered by whichever 3D layer the app already uses (not researched here).

**Molecule building and VSEPR.** Write ourselves: sphere-repulsion solver for shapes, spring graph for bonds.

**Learn from, do not copy:** PhET sims (GPL-3 or unlicensed, and the public repos are going away), Lennard-Jones/thermostat articles above. **Port-able if useful:** Concord Lab's md2d (MIT) with attribution kept.

**Optional dependency.** Matter.js (MIT, pure JS) only if we want a quick rigid-body toy (e.g. beakers, tilting containers); it is not suitable for molecular forces.

**Licence implications.** Anything GPL (LAMMPS, PhET sugar-and-salt and, per PhET's terms, PhET sim code) must not be linked into or copied into a closed-source app. MIT, Apache-2.0 and BSD (Concord Lab, Matter.js, planck, cannon-es, Rapier, HOOMD) are fine with attribution notices. OpenMM's MIT core is fine but its GPU parts are not relevant. Ammo.js licence handling is ambiguous in metadata: avoid. If we want PhET-style behaviour, reimplement from the science, not from their files.

## UNVERIFIED list

1. Hermes WebAssembly support: only third-party sources; official RN 0.84 blog did not mention it.
2. Exact licence of PhET sim repos (no LICENSE file, API shows none); the official PhET licensing page body would not load, so PhET terms come from a search snippet of a mirror.
3. Whether PhET's states-of-matter has a 3D screen, and that it uses LJ.
4. Concord md2d's feature set and how separable it is from the build.
5. Molecular Workbench (Java) repo location and licence.
6. ChemCollective licence and status.
7. Licences of small npm MD packages (baoabmd, d3-force-md, etc.).
8. planck.js and Oimo.js GitHub licence/push date (rate-limited; only npm licences used).
9. Whether Jolt has an asm.js fallback, and Hermes behaviour with large WASM files.
10. Which sims use energy-rescale thermostats versus others.
