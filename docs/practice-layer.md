# The practice layer (superseded)

> **Superseded on 2026-11-08.** The user decided BYE Chem is a textbook: no quizzes, answer boxes, fading or review. Reads, a recap and read-only worked examples follow `docs/learn-template.md` and `docs/ui-guide.md`. This file is kept for history and for a possible practice mode later.

How BYE Chem makes learners practise, not only read. It comes from the structure research (`reports/BYE Chem structure vs research.md`). The techniques with the strongest evidence are recalling answers, spaced review, mixing problem types, and feedback on answers (Dunlosky et al. 2013; Brunmair & Richter 2019; Alfieri et al. 2011). The mockup boards are in `design/chem-chapters.html`, row 1.

## Rules
1. **Answer first, then reveal.** Every "Ready?" check and every question asks for an answer before showing it. Pre-questions help far more when learners produce an answer (g ≈ 0.65 vs 0.22 when they only read it).
2. **Every section ends with "Check yourself"**: two or three questions with answer entry. The checker understands units and significant figures, and explains a wrong answer by naming the likely slip (for example "you multiplied by the molar mass instead of dividing"). It never just says "wrong".
3. **Fading follows the learner, not the tab.** Simple starts fully worked. After each correct step the next problem hides one more step, starting from the end. A wrong answer brings the worked step back. Medium and Hard start partly worked.
4. **Mixed review is spaced.** Home shows "Today's review": 5 questions mixed from chapters already done, weighted to older and missed ones. Each chapter page starts its "Ready?" strip with one recall question from an earlier chapter.
5. **Mix types after learning them.** Within a section, practise one type first. Mixed review and Hard mix in types from earlier sections. (The "one type first, mix later" rule is our inference; no chemistry interleaving study was found.)
6. **"Find your gaps" reports skills, not chapters.** It is adaptive (about 10–20 questions) and names skills ("powers of ten", "reading formulas", "the mole"). It re-checks a skipped skill when it first comes up in a later "Ready?" strip.
7. **"At a glance" has a recall mode.** "Test me" hides each formula until the learner tries to say it, then taps to reveal.
8. **Relevance is written by the learner.** At the end of a chapter: "Where could you use this? Write one line." This is optional and saved privately. "Where it shows up" stays as the told version.
9. **The Lab leads with the challenge.** A sandbox opens with its first "Try this" above the controls; free play is always available.
10. **The three views are linked.** Tapping See it, Particles or Symbols highlights the matching part of the other two, and each view stays labelled.
