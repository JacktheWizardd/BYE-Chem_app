import { StyleSheet, Text } from 'react-native';
import { setSoundsOn, useSoundsOn } from '@/components/feedback';
import { PressFade } from '@/components/ui';
import { color, font } from '@/theme';

/** Tap sounds, off until the student turns them on. Turning them on plays one, so it's heard. */
export function SoundsSwitch() {
  const on = useSoundsOn();
  return (
    <PressFade
      onPress={() => setSoundsOn(!on)}
      haptic="select"
      accessibilityRole="switch"
      accessibilityLabel="Sounds"
      accessibilityState={{ checked: on }}
      aria-checked={on}
      hitSlop={8}
      style={styles.sounds}
    >
      <Text style={styles.soundsText}>
        Sounds <Text style={[styles.soundsState, on && { color: color.ink }]}>{on ? 'On' : 'Off'}</Text>
      </Text>
    </PressFade>
  );
}

const styles = StyleSheet.create({
  sounds: { minHeight: 32, justifyContent: 'center', alignSelf: 'flex-start' },
  soundsText: { fontFamily: font.sans, fontSize: 13, color: color.ink2 },
  soundsState: { fontFamily: font.sansMedium, color: color.axis },
});
