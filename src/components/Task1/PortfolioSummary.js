import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PortfolioSummary({ summary }) {
  const { totalChange, count, totalValue } = summary;

  // Green color for gains red for losses
  const changeColor = totalChange >= 0 ? '#34C759' : '#FF3B30';

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.label}>Pinned Portfolio</Text>
        <Text style={styles.count}>
          {count > 0 ? `${count} item${count !== 1 ? 's' : ''}` : 'No pinned items'}
        </Text>
      </View>

      {count > 0 && (
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Total Value</Text>
            <Text style={styles.statValue}>${totalValue.toFixed(2)}</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Avg Change</Text>
            <Text style={[styles.statValue, { color: changeColor }]}>
              {totalChange >= 0 ? '+' : ''}{totalChange.toFixed(2)}%
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  content: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    marginBottom: 4,
  },
  count: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    paddingVertical: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#007AFF',
  },
});