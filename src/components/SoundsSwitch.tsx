// The Sounds switch (BYE Math @ b49d14a). Hidden until BYE Chem's own chemistry sound set is chosen
// (src/sound.ts SOUNDS_READY); off by default.
import { StyleSheet, Switch, Text, View } from 'react-native';
import { setSoundsOn, useSoundsOn } from '@/components/feedback';
import { SOUNDS_READY } from '@/sound';
import { color, font } from '@/theme';

export function SoundsSwitch() {
  const on = useSoundsOn();
  if (!SOUNDS_READY) return null;
  return (
    <View style={styles.row}>
      <Text style={styles.label}>Sounds</Text>
      <Switch value={on} onValueChange={setSoundsOn} trackColor={{ true: color.ink, false: color.line }} accessibilityLabel="Sounds" />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 26, minHeight: 44 },
  label: { fontFamily: font.sans, fontSize: 13, color: color.ink2 },
});
