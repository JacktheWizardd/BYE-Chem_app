// Content types. Text marked `Rich` may use <sub>, <sup>, <b> and <i> (see src/components/Rich.tsx);
// formulas always use real <sub>/<sup>, never Unicode ₂.
export type Rich = string;
export type Level = 'Intro' | '1A' | '1B' | 'AP';

/** One section of the chapter map (generated from docs/chapter-map.md). */
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

/** A question the learner answers; checked by src/practice/checks.ts. */
export type QuestionSpec =
  | { type: 'moles'; grams: number; molarMass: number; sig: number }
  | { type: 'grams'; moles: number; molarMass: number; sig: number }
  | { type: 'molarMass'; formula: string; given?: string }
  | { type: 'sci'; value: number }
  | { type: 'count'; answer: number; slips?: [number, Rich][]; hint: Rich }
  | { type: 'number'; target: number; unit?: string; slips?: [number, Rich][]; hint: Rich; explain: Rich }
  | { type: 'expr'; accept: string[]; slips?: [string, Rich][]; hint: Rich; explain: Rich };

export interface Question {
  id: string;
  /** The section it practises (for review and "from 4.1" labels). */
  from: string;
  prompt: Rich;
  placeholder?: string;
  spec: QuestionSpec;
  /** Worked answer, shown after an attempt. */
  answer: Rich;
}

export interface FadeStep {
  work: Rich;
  why: Rich;
  /** The step's result, checked when this step is the learner's. */
  check: QuestionSpec;
  /** What the learner sees in place of the step when it is theirs. */
  ask: Rich;
}

export interface FadeProblem {
  id: string;
  prompt: Rich;
  steps: FadeStep[];
}

export interface Idea { title: string; body: Rich }

export interface SectionContent {
  id: string;
  intro: Rich;
  /** The key formula, shown big. */
  tool?: Rich;
  ideas: Idea[];
  /** One quantity three ways; parts sharing a `link` highlight together. */
  views?: { title: string; caption: Record<string, Rich>; cols: { label: string; parts: { text: Rich; link?: string }[] }[] };
  lab?: { challenge: Rich; title: string; body: Rich };
  check: Question[];
  simple?: FadeProblem[];
  showsUp?: { id: string; note: Rich }[];
}

export interface ChapterContent {
  num: number;
  promise: Rich;
  /** "What this lets you do". */
  letsYouDo?: { task: Rich; picture?: 'water-mole'; caption?: Rich };
  /** Quick recall at the top of "Ready?". */
  recall?: Question;
  lab?: { challenge: Rich; title: string; body: Rich; href?: string };
  glance?: { eq: Rich; note: Rich; from: string }[];
  uses?: { where: string; what: Rich; eq: Rich }[];
  writeOneLine?: boolean;
  sections: Record<string, SectionContent>;
  /** Extra questions for Today's review. */
  review?: Question[];
}
