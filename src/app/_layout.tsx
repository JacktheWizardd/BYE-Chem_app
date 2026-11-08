// Root layout (BYE Math @ b49d14a, src/app/_layout.tsx): the phone column, or on desktop the
// sidebar plus the page; screens fade in on the web (phones slide natively).
import { useFonts } from 'expo-font';
import { Stack, usePathname } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Platform, StyleSheet, useWindowDimensions, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Sidebar } from '@/components/desktop/Sidebar';
import { initFeedback } from '@/components/feedback';
import { ScreenEnter } from '@/components/ScreenEnter';
import { fontSources } from '@/fonts';
import { computeLayout, LayoutProvider } from '@/layout';
import { loadPrefs } from '@/prefs';
import { color, MAX_WIDTH } from '@/theme';

SplashScreen.preventAutoHideAsync().catch(() => {});

/** On a slow connection, show the page with fallback fonts after this long. */
const FONT_WAIT_MS = 1200;

export default function RootLayout() {
  const [loaded, error] = useFonts(fontSources);
  const [waited, setWaited] = useState(false);
  const [prefs, setPrefs] = useState(Platform.OS === 'web');
  useEffect(() => {
    const t = setTimeout(() => setWaited(true), FONT_WAIT_MS);
    loadPrefs(['sounds']).then(() => {
      initFeedback();
      setPrefs(true);
    });
    return () => clearTimeout(t);
  }, []);
  const ready = (loaded || !!error || waited) && prefs;
  const width = useWindowDimensions().width;
  const pathname = usePathname();
  const layout = computeLayout(width, pathname);

  useEffect(() => {
    if (ready) SplashScreen.hideAsync().catch(() => {});
  }, [ready]);

  if (!ready) return null;
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <LayoutProvider value={layout}>
        {/* The Stack keeps its place in the tree either way, so resizing across the line keeps the history. */}
        <View style={[styles.page, layout.desktop && styles.pageDesktop]}>
          {layout.desktop && <Sidebar />}
          <View style={layout.desktop ? styles.main : [styles.column, width > MAX_WIDTH && styles.columnEdges]}>
            <Stack
              screenOptions={{ headerShown: false, contentStyle: { backgroundColor: color.ground } }}
              screenLayout={Platform.OS === 'web' ? ({ children }) => <ScreenEnter>{children}</ScreenEnter> : undefined}
            />
          </View>
        </View>
      </LayoutProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: color.ground, alignItems: 'center' },
  pageDesktop: { flexDirection: 'row', alignItems: 'stretch' },
  main: { flex: 1, minWidth: 0 },
  column: { flex: 1, width: '100%', maxWidth: MAX_WIDTH },
  columnEdges: { borderLeftWidth: 1, borderRightWidth: 1, borderColor: color.line },
});
