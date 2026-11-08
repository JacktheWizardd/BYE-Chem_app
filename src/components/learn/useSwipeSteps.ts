import { useMemo } from 'react';
import { PanResponder, type ViewStyle } from 'react-native';

/**
 * Put on the swiped View: stops a drag on the web from highlighting label text. A web-only style:
 * React Native's own types don't list it (only Expo's generated web types do), hence the cast.
 */
export const noSelect = { userSelect: 'none' } as unknown as ViewStyle;

/** Taps in this left share of the picture go back; the rest go forward, like turning a page. */
const BACK_ZONE = 0.25;

/** The responder's own view, as the touch event gives it: a DOM element on the web, a native view on phones. */
type Target = {
  getBoundingClientRect?: () => { left: number; width: number };
  measureInWindow?: (cb: (x: number, y: number, width: number) => void) => void;
};

/**
 * Step through frames like an e-book page: tap the left quarter to go back, anywhere else to go
 * forward; or swipe left (next) and right (back). Vertical drags are left to the page's scroll.
 * Spread the result on the View. `move` must be stable (useCallback): it is called with +1 or −1.
 */
export function useSwipeSteps(move: (by: 1 | -1) => void) {
  return useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > 12 && Math.abs(g.dx) > Math.abs(g.dy) * 1.5,
        onPanResponderTerminationRequest: (_, g) => Math.abs(g.dy) > Math.abs(g.dx),
        onPanResponderRelease: (e, g) => {
          const ax = Math.abs(g.dx);
          if (ax > 40 && ax > Math.abs(g.dy)) {
            move(g.dx < 0 ? 1 : -1);
            return;
          }
          if (ax >= 8 || Math.abs(g.dy) >= 8) return;
          // A tap: which side of the picture was it on? Read x now: the gesture state is reset
          // before measureInWindow calls back.
          const x = g.x0;
          const side = (left: number, width: number) => move(width > 0 && (x - left) / width < BACK_ZONE ? -1 : 1);
          const t = e.currentTarget as unknown as Target | null;
          if (t?.getBoundingClientRect) {
            const r = t.getBoundingClientRect();
            side(r.left, r.width);
          } else if (t?.measureInWindow) t.measureInWindow((left, _top, width) => side(left, width));
          else move(1);
        },
      }).panHandlers,
    [move],
  );
}
