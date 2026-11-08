// Web: localStorage, read synchronously (prefs.ts is the native version).
export async function loadPrefs(): Promise<void> {}

export function readPref(key: string): string | null {
  try {
    return globalThis.localStorage?.getItem(`pref:${key}`) ?? null;
  } catch {
    return null;
  }
}

export function writePref(key: string, value: string): void {
  try {
    globalThis.localStorage?.setItem(`pref:${key}`, value);
  } catch {
    // Not saved: the choice holds until the page closes.
  }
}
