// From BYE Math @ b49d14a (docs/ui-guide.md §3).
import { useEffect } from 'react';
import { Platform } from 'react-native';
import {
  Easing,
  FadeIn,
  FadeInLeft,
  FadeInRight,
  FadeOut,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

// The app's motion, one feel throughout ("Snappy"): springs that settle fast with almost no bounce.
// Reanimated follows the system's Reduce Motion setting by default, so with it on these jump
// straight to their end instead of moving.

/** Presses and the tab underline. */
export const SPRING = { stiffness: 620, damping: 42, mass: 1 } as const;

/** Rows below a change glide to their new place. (Layout animations can't spring on web yet.) */
export const glide = Platform.OS === 'web' ? LinearTransition.duration(240) : LinearTransition.springify().stiffness(340).damping(37);

/** New content after a tab change comes in from the side you went: dir 1 = a tab to the right. */
export const enterFrom = (dir: number) => (dir > 0 ? FadeInRight : FadeInLeft).duration(240);

/** Something new on the page (an opened answer). */
export const fadeIn = FadeIn.duration(200);
export const fadeOut = FadeOut.duration(120);

/**
 * Fades a new line of the working in, rising 8 px, once on mount when `play` is true;
 * otherwise it just sits there.
 */
export function useEntranceStyle(play: boolean, duration: number) {
  const v = useSharedValue(play ? 0 : 1);
  useEffect(() => {
    if (!play) {
      v.set(1);
      return;
    }
    v.set(0);
    v.set(withTiming(1, { duration, easing: Easing.out(Easing.cubic) }));
  }, [play, duration, v]);
  return useAnimatedStyle(() => ({ opacity: v.get(), transform: [{ translateY: (1 - v.get()) * 8 }] }));
}

/** Fades content back in whenever `key` changes (not on first mount), e.g. the explanation of a newly focused step. */
export function useRefreshFade(key: unknown, duration = 200) {
  const opacity = useSharedValue(1);
  const last = useSharedValue(key);
  useEffect(() => {
    if (last.get() === key) return;
    last.set(key);
    opacity.set(0);
    opacity.set(withTiming(1, { duration, easing: Easing.out(Easing.quad) }));
  }, [key, duration, opacity, last]);
  return useAnimatedStyle(() => ({ opacity: opacity.get() }));
}
