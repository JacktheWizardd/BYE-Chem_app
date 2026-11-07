// Progress, kept only on this device (AsyncStorage: localStorage on the web). No accounts; nothing is sent anywhere.
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type { Verdict } from '@/practice/checks';

export interface Progress {
  /** Sections whose "Check yourself" is done. */
  done: string[];
  /** Per question: last verdict, how many misses, when last seen (ms). */
  answers: Record<string, { last: Verdict; misses: number; seen: number }>;
  /** Per section: how many steps from the end the learner now does in Simple. */
  fade: Record<string, number>;
  /** Per section: which Simple problem is next. */
  problem: Record<string, number>;
  /** Per chapter: the learner's own "where could you use this?" line. */
  oneLine: Record<string, string>;
}

const EMPTY: Progress = { done: [], answers: {}, fade: {}, problem: {}, oneLine: {} };
const KEY = 'bye-chem-progress-v1';

interface Store {
  p: Progress;
  ready: boolean;
  record(questionId: string, verdict: Verdict): void;
  markDone(sectionId: string): void;
  setFade(sectionId: string, level: number, problem: number): void;
  setOneLine(chapter: string, text: string): void;
  reset(): void;
}

const Ctx = createContext<Store | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [p, setP] = useState<Progress>(EMPTY);
  const [ready, setReady] = useState(false);
  const loaded = useRef(false);

  useEffect(() => {
    AsyncStorage.getItem(KEY)
      .then((raw) => { if (raw) setP({ ...EMPTY, ...(JSON.parse(raw) as Partial<Progress>) }); })
      .catch(() => {})
      .finally(() => { loaded.current = true; setReady(true); });
  }, []);

  useEffect(() => {
    if (loaded.current) AsyncStorage.setItem(KEY, JSON.stringify(p)).catch(() => {});
  }, [p]);

  const record = useCallback((id: string, verdict: Verdict) => setP((q) => {
    const prev = q.answers[id];
    return { ...q, answers: { ...q.answers, [id]: { last: verdict, misses: (prev?.misses ?? 0) + (verdict === 'no' ? 1 : 0), seen: Date.now() } } };
  }), []);
  const markDone = useCallback((id: string) => setP((q) => (q.done.includes(id) ? q : { ...q, done: [...q.done, id] })), []);
  const setFade = useCallback((id: string, level: number, problem: number) => setP((q) => ({ ...q, fade: { ...q.fade, [id]: level }, problem: { ...q.problem, [id]: problem } })), []);
  const setOneLine = useCallback((ch: string, text: string) => setP((q) => ({ ...q, oneLine: { ...q.oneLine, [ch]: text } })), []);
  const reset = useCallback(() => setP(EMPTY), []);

  const value = useMemo(() => ({ p, ready, record, markDone, setFade, setOneLine, reset }), [p, ready, record, markDone, setFade, setOneLine, reset]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useProgress(): Store {
  const s = useContext(Ctx);
  if (!s) throw new Error('useProgress needs <ProgressProvider>');
  return s;
}
