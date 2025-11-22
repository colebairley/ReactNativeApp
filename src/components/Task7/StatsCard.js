import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export default function StatsCard({ stats }) {
  const { theme } = useTheme();
  const isPositive = parseFloat(stats.change) >= 0;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.card,
      padding: 16,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.border,
      marginBottom: 16,
    },
    header: {
      marginBottom: 12,
    },
    currentPrice: {
      fontSize: 28,
      fontWeight: '700',
      color: theme.colors.text,
    },
    change: {
      fontSize: 14,
      fontWeight: '600',
      color: isPositive ? theme.colors.success : theme.colors.error,
      marginTop: 4,
    },
    statsGrid: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    statItem: {
      flex: 1,
    },
    statLabel: {
      fontSize: 12,
      color: theme.colors.textSecondary,
      marginBottom: 4,
    },
    statValue: {
      fontSize: 15,
      fontWeight: '600',
      color: theme.colors.text,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.currentPrice}>${stats.currentPrice}</Text>
        <Text style={styles.change}>
          {isPositive ? '+' : ''}{stats.change} ({stats.changePercent}%)
        </Text>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Low</Text>
          <Text style={styles.statValue}>${stats.minPrice}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>High</Text>
          <Text style={styles.statValue}>${stats.maxPrice}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Avg</Text>
          <Text style={styles.statValue}>${stats.avgPrice}</Text>
        </View>
      </View>
    </View>
  );
}