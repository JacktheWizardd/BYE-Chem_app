import { useCallback, type ReactNode } from 'react';
import { useFocusEffect } from 'expo-router';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

/**
 * Web only (phones get the native slide): each time a screen comes into view, opening it,
 * coming back to it or moving to the next problem, it fades in rising 8 px instead of cutting in.
 */
export function ScreenEnter({ children }: { children: ReactNode }) {
  const v = useSharedValue(1);
  useFocusEffect(
    useCallback(() => {
      v.set(0);
      v.set(withTiming(1, { duration: 220, easing: Easing.out(Easing.cubic) }));
    }, [v]),
  );
  const style = useAnimatedStyle(() => ({ opacity: v.get(), transform: [{ translateY: (1 - v.get()) * 8 }] }));
  return <Animated.View style={[{ flex: 1 }, style]}>{children}</Animated.View>;
}
