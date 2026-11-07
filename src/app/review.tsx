// Today's review: 5 questions mixed from built chapters. Missed ones come first, then never-seen, then the oldest.
import { useMemo } from 'react';
import { reviewPool } from '@/content';
import { AnswerCheck } from '@/components/practice';
import { Back, Plain, Screen, Small, Title } from '@/components/ui';
import { useProgress } from '@/store/progress';

export default function Review() {
  const { p, ready } = useProgress();
  // Pick once per visit, so answering doesn't reshuffle the list.
  const picked = useMemo(() => {
    const score = (id: string) => {
      const a = p.answers[id];
      if (!a) return 1e12; // never seen
      if (a.last === 'no') return 2e12 + a.misses; // missed: first
      return 1e12 - a.seen; // older first
    };
    return [...reviewPool()].sort((x, y) => score(y.id) - score(x.id)).slice(0, 5);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  return (
    <Screen>
      <Back href="/" label="Learn" />
      <Title size={30}>Today’s review</Title>
      <Plain>{`${picked.length} questions from chapters you’ve started, mixed. About 4 minutes.`}</Plain>
      {picked.map((q, i) => <AnswerCheck key={q.id} q={q} label={`${i + 1} of ${picked.length} · from ${q.from}`} />)}
      <Small style={{ marginTop: 16 }}>Missed questions come back sooner; ones you got right come back later. This is spaced review: the study habit with some of the strongest evidence behind it.</Small>
    </Screen>
  );
}
