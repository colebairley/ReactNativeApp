import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export default function SuccessToast({ visible, message, onDismiss }) {
  const { theme } = useTheme();
  const opacity = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(2000),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => onDismiss());
    }
  }, [visible]);

  if (!visible) return null;

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 32,
      left: 16,
      right: 16,
      backgroundColor: theme.colors.success,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    text: {
      color: '#fff',
      fontSize: 14,
      fontWeight: '500',
    },
  });

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Text style={styles.text}>✓ {message}</Text>
    </Animated.View>
  );
}