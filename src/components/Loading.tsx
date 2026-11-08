// BYE Math @ b49d14a (src/components/Loading.tsx, NotFound.tsx): an empty page while a section
// loads on demand, a "didn't load" page when it can't, and the not-found page.
import { router, type ErrorBoundaryProps } from 'expo-router';
import { Suspense, type ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Eyebrow, PrimaryButton } from '@/components/ui';
import { color, font, space } from '@/theme';

export function Loading({ children }: { children: ReactNode }) {
  return <Suspense fallback={<View style={styles.page} />}>{children}</Suspense>;
}

/** Use with `export { LoadFailed as ErrorBoundary } from '@/components/Loading'`. */
export function LoadFailed({ retry }: ErrorBoundaryProps) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.page, styles.pad, { paddingTop: insets.top + 60 }]}>
      <Eyebrow>Not loaded</Eyebrow>
      <Text style={styles.title} accessibilityRole="header">
        {"This page didn't load."}
      </Text>
      <Text style={styles.body}>Check your connection, then try again.</Text>
      <View style={{ marginTop: 30, alignItems: 'flex-start' }}>
        <PrimaryButton label="Try again" onPress={() => void retry()} />
      </View>
    </View>
  );
}

export function NotFound() {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.page, styles.pad, { paddingTop: insets.top + 60 }]}>
      <Eyebrow>Page not found</Eyebrow>
      <Text style={styles.title} accessibilityRole="header">
        {"This page isn't here."}
      </Text>
      <Text style={styles.body}>{"The link may be old or mistyped, or this part isn't written yet."}</Text>
      <View style={{ marginTop: 30, alignItems: 'flex-start' }}>
        <PrimaryButton label="Go to the start  →" onPress={() => router.replace('/')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: color.ground },
  pad: { paddingHorizontal: space.pageX },
  title: { marginTop: 12, marginBottom: 8, fontFamily: font.serif, fontSize: 34, lineHeight: 40, color: color.ink },
  body: { fontFamily: font.sans, fontSize: 16, lineHeight: 25, color: color.ink2 },
});
