// Content types for the BYE Chem textbook (docs/learn-template.md). Text marked `Rich` may use
// <sub>, <sup>, <b>, <i>, <g> (grams, blue) and <m> (moles, green); formulas always use real
// <sub>/<sup>, never Unicode ₂ (docs/notation.md). There are no questions to answer anywhere.
export type Rich = string;
export type Level = 'Intro' | '1A' | '1B' | 'AP';

// ───── The chapter map (generated from docs/chapter-map.md) ─────

export interface MapSection {
  id: string;
  title: string;
  question: Rich;
  /** Matching sections of Tro 6e (or "App. I"). */
  tro: string[];
  levels: Level[];
  apUnit?: string;
  /** "Ready? You need": earlier sections. */
  needs: string[];
}

export interface MapChapter {
  num: number;
  title: string;
  question: Rich;
  tro: string;
  levels: Level[];
  /** e.g. "Lab: Mix and react", "Tools: periodic table". */
  links: string[];
  sections: MapSection[];
}

// ───── Pictures ─────

/** One molecule or atom in a flat particle picture: a formula the drawer knows (H2O, CO2, O2…). */
export interface Particle {
  formula: string;
  /** Under the particle, e.g. "H<sub>2</sub>O" or "1 mol". Defaults to the formula. */
  label?: Rich;
  /** Ring it in shu: the measured or highlighted one. */
  ring?: boolean;
  /** Draw it faded (an earlier part). */
  faded?: boolean;
}

/** A flat particle picture (src/figures/Particles.tsx): groups of particles in a row, with + or → or = between. */
export interface ParticleScene {
  /** Accessibility text: what the picture shows. */
  describe: string;
  groups: { items: Particle[]; label?: Rich }[];
  /** Between groups, in order: "+", "→", "=", "⇌". */
  ops?: string[];
}

/** One frame of a picture built up step by step. Pictures only add. */
export interface Frame {
  caption: Rich;
  eq?: Rich[];
  particles?: ParticleScene;
}

// ───── Reads ─────

export type Block =
  | { p: Rich }
  | { h: string }
  | { eq: Rich[] }
  | { key: Rich }
  | { particles: ParticleScene; caption?: Rich; level?: 'see it' | 'particles' | 'symbols' }
  | { frames: Frame[]; label: string }
  | { molecule: { formula: string; describe: string; size?: 'model' | 'cut' | 'real' } }
  | { figure: { describe: string; spec: unknown } }
  | { work: [Rich, Rich][] }
  | { views: Views }
  | { table: { head: Rich[]; rows: Rich[][] } };

/** One quantity three ways (see it · particles · symbols); parts sharing a `link` highlight together. */
export interface Views {
  title: string;
  caption: Record<string, Rich>;
  cols: { label: string; parts: { text: Rich; link?: string }[] }[];
}

export interface Read {
  /** Short, used in the link: /learn/4.1/counting-by-weighing */
  id: string;
  title: string;
  /** What you will understand (not what the page contains). */
  gist: Rich;
  minutes: number;
  blocks: Block[];
}

// ───── Recap ─────

export interface Clue {
  text: string;
  /** What it looks like on the page. */
  example: Rich;
  note: Rich;
}

export interface LookAlike {
  looks: Rich;
  use: string;
  why: Rich;
  /** The section that handles it. */
  link?: string;
}

export interface Mistake {
  wrong: Rich;
  right: Rich;
  why: Rich;
}

export interface Use {
  where: string;
  what: Rich;
  /** A worked line; every number in it is recomputed by the content test. */
  eq: Rich;
}

// ───── Worked examples (read-only) ─────

export interface WorkLine {
  /** The left side; omitted on a continuation line, so the = lines up under the line above. */
  left?: Rich;
  right: Rich;
  /** The operation, written in the shu margin. */
  op?: Rich;
}

export interface ExampleStep {
  /** The move's name in the method bar (2–3 words). */
  move: string;
  /** Why this move, in one or two sentences. */
  say: Rich;
  lines: WorkLine[];
  /** "Common questions": [question, answer], opened by a tap. */
  qs?: [string, Rich][];
}

export interface Example {
  /** "4.1-1": the section and the example's number. */
  id: string;
  question: Rich;
  level: 'easy' | 'typical' | 'harder';
  steps: ExampleStep[];
  /** One line under the last step: the answer in words. */
  answer: Rich;
}

// ───── A section and a chapter ─────

export interface SectionContent {
  id: string;
  intro: Rich;
  reads: Read[];
  /** The key relation, shown big. Descriptive sections may have none. */
  tool?: Rich;
  toolNote?: Rich;
  ideas: { title: string; body: Rich }[];
  why: Frame[];
  spot: { clues: Clue[]; lookAlikes: LookAlike[] };
  mistakes: Mistake[];
  examples: Example[];
  realUses: Use[];
  /** Later sections that use this one. */
  next?: { id: string; note: Rich }[];
}

export interface ChapterContent {
  num: number;
  promise: Rich;
  /** "What this lets you do". */
  letsYouDo?: { task: Rich; particles?: ParticleScene; caption?: Rich };
  /** The story: paragraphs naming each section, with the chapter picture as frames. */
  story?: Block[];
  /** The road map: every section of the chapter in exactly one group. */
  groups?: { name: string; ids: string[] }[];
  glance?: { eq: Rich; note: Rich; from: string }[];
  uses?: Use[];
  lab?: { challenge: Rich; title: string; body: Rich; href?: string };
}
