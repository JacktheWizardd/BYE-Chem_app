// Small saved preferences (Sounds on/off). Native: AsyncStorage, read once at start (async);
// web: localStorage (prefs.web.ts), read synchronously.
import AsyncStorage from '@react-native-async-storage/async-storage';

const cache = new Map<string, string | null>();

/** Loads saved preferences into memory; call once at start. */
export async function loadPrefs(keys: string[]): Promise<void> {
  try {
    const pairs = await AsyncStorage.multiGet(keys.map((k) => `pref:${k}`));
    for (const [k, v] of pairs) cache.set(k.slice(5), v);
  } catch {
    // Not available: defaults hold.
  }
}

export function readPref(key: string): string | null {
  return cache.get(key) ?? null;
}

export function writePref(key: string, value: string): void {
  cache.set(key, value);
  AsyncStorage.setItem(`pref:${key}`, value).catch(() => {});
}
