// How the window is laid out (BYE Math @ b49d14a, src/layout.tsx; docs/ui-guide.md §1):
// phone: the 520 px column; desktop (≥ 900 px): the sidebar plus the page. On a worked example the
// sidebar folds to a rail so the working and its explanation can sit side by side.
import { createContext, useContext } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DESKTOP_MIN, MAX_WIDTH, RAIL_W, READ_MAX, SIDEBAR_W, SIDEBAR_W_SMALL, space } from '@/theme';

export interface Layout {
  desktop: boolean;
  sidebar: 'none' | 'open' | 'rail';
  sideW: number;
  /** Width of the area screens draw in. */
  contentW: number;
}

export function computeLayout(width: number, pathname: string): Layout {
  if (width < DESKTOP_MIN) return { desktop: false, sidebar: 'none', sideW: 0, contentW: Math.min(width, MAX_WIDTH) };
  const rail = pathname.startsWith('/example');
  const sideW = rail ? RAIL_W : width < 1200 ? SIDEBAR_W_SMALL : SIDEBAR_W;
  return { desktop: true, sidebar: rail ? 'rail' : 'open', sideW, contentW: width - sideW };
}

const LayoutContext = createContext<Layout>({ desktop: false, sidebar: 'none', sideW: 0, contentW: MAX_WIDTH });
export const LayoutProvider = LayoutContext.Provider;
export const useLayout = () => useContext(LayoutContext);

/** A scrolling page's padding: wide sides on desktop so text stays READ_MAX wide, and the width text gets. */
export function usePage() {
  const L = useLayout();
  const insets = useSafeAreaInsets();
  if (!L.desktop) return { desktop: false, pageX: space.pageX, top: insets.top + 4, bottom: insets.bottom + 48, textW: L.contentW - 2 * space.pageX };
  const pageX = Math.max(40, Math.floor((L.contentW - READ_MAX) / 2));
  return { desktop: true, pageX, top: insets.top + 36, bottom: insets.bottom + 72, textW: L.contentW - 2 * pageX };
}
