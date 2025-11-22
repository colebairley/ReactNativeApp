import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export default function ChartTooltip({ visible, data, position }) {
  const { theme } = useTheme();

  if (!visible || !data) return null;

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: position.y - 80,
      left: Math.max(10, position.x - 60),
      backgroundColor: theme.colors.text,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderRadius: 6,
      zIndex: 1000,
    },
    date: {
      fontSize: 11,
      color: theme.colors.background,
      fontWeight: '500',
      marginBottom: 2,
    },
    price: {
      fontSize: 14,
      color: theme.colors.background,
      fontWeight: '700',
    },
    arrow: {
      position: 'absolute',
      bottom: -4,
      left: '50%',
      marginLeft: -5,
      width: 0,
      height: 0,
      borderLeftWidth: 5,
      borderRightWidth: 5,
      borderTopWidth: 5,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderTopColor: theme.colors.text,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{data.date}</Text>
      <Text style={styles.price}>${data.price}</Text>
      <View style={styles.arrow} />
    </View>
  );
}