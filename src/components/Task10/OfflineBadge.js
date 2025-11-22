import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export default function OfflineBadge({ isOnline, isCached }) {
  const { theme } = useTheme();

  if (isOnline && !isCached) {
    return null; // No badge for fresh online data
  }

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 6,
      backgroundColor: isCached ? theme.colors.error : theme.colors.error,
      marginHorizontal: 16,
      marginVertical: 8,
    },
    icon: {
      fontSize: 14,
      marginRight: 8,
      color: '#fff',
    },
    text: {
      color: '#fff',
      fontSize: 12,
      fontWeight: '600',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>
        {isOnline ? '⚠️' : '📡'}
      </Text>
      <Text style={styles.text}>
        {isOnline ? 'Using cached data' : 'You are offline'}
      </Text>
    </View>
  );
}