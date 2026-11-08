import { useEffect, useRef } from 'react';
import { Platform } from 'react-native';

/**
 * Keyboard shortcuts on the web (desktop mode, or a keyboard on an iPad browser). `onKey` gets the
 * key's name and returns true when it used it, which stops the browser's own action (Space scrolling).
 * Keys held with Cmd/Ctrl/Alt are left alone, and so is typing in a field; Space and Enter on a
 * focused button or link are left to that button, so a press never counts twice.
 */
export function useKeys(onKey: (key: string) => boolean | void, active = true) {
  const handler = useRef(onKey);
  useEffect(() => {
    handler.current = onKey;
  });
  useEffect(() => {
    if (Platform.OS !== 'web' || !active || typeof document === 'undefined') return;
    const listen = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.defaultPrevented) return;
      const t = e.target as HTMLElement | null;
      if (t?.closest?.('input, textarea, select, [contenteditable="true"]')) return;
      if ((e.key === ' ' || e.key === 'Enter') && t?.closest?.('button, a, [role="button"], [role="link"], [role="switch"], [role="tab"]')) return;
      if (handler.current(e.key)) e.preventDefault();
    };
    document.addEventListener('keydown', listen);
    return () => document.removeEventListener('keydown', listen);
  }, [active]);
}
