import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export default function ChartLegend() {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.card,
      padding: 12,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.border,
      marginBottom: 16,
    },
    title: {
      fontSize: 12,
      fontWeight: '600',
      color: theme.colors.textSecondary,
      marginBottom: 8,
      textTransform: 'uppercase',
    },
    legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 6,
    },
    colorBox: {
      width: 12,
      height: 12,
      borderRadius: 2,
      marginRight: 8,
    },
    label: {
      fontSize: 13,
      color: theme.colors.text,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Legend</Text>
      
      <View style={styles.legendItem}>
        <View style={[styles.colorBox, { backgroundColor: '#007AFF' }]} />
        <Text style={styles.label}>Price Trend (Line)</Text>
      </View>
      
      <View style={styles.legendItem}>
        <View style={[styles.colorBox, { backgroundColor: '#34C759' }]} />
        <Text style={styles.label}>Average Price</Text>
      </View>

      <View style={styles.legendItem}>
        <View style={[styles.colorBox, { backgroundColor: '#FF9500' }]} />
        <Text style={styles.label}>Tap chart to see details</Text>
      </View>
    </View>
  );
}