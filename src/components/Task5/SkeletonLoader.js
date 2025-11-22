import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export default function SkeletonLoader({ count = 5 }) {
  const { theme } = useTheme();
  
  // Array to show multiple skeleton cards
  const skeletons = Array(count).fill(0);

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 8,
      paddingVertical: 8,
    },
    skeletonCard: {
      backgroundColor: theme.colors.card,
      marginVertical: 6,
      marginHorizontal: 8,
      borderRadius: 8,
      padding: 12,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    skeletonLine: {
      height: 12,
      backgroundColor: theme.colors.background,
      borderRadius: 4,
      marginVertical: 6,
    },
    skeletonImage: {
      height: 80,
      backgroundColor: theme.colors.background,
      borderRadius: 8,
      marginBottom: 12,
    },
  });

  return (
    <View style={styles.container}>
      {skeletons.map((_, index) => (
        <View key={index} style={styles.skeletonCard}>
          <View style={styles.skeletonImage} />
          <View style={[styles.skeletonLine, { width: '70%' }]} />
          <View style={[styles.skeletonLine, { width: '50%' }]} />
        </View>
      ))}
    </View>
  );
}