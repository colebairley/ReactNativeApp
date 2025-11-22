import React from 'react';
import { 
    View, 
    ScrollView, 
    StyleSheet,
    Text 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';

export default function HomeScreen() {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      backgroundColor: theme.colors.card,
      paddingHorizontal: 16,
      paddingVertical: 20,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: '700',
      color: theme.colors.text,
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 14,
      color: theme.colors.textSecondary,
    },
    scrollView: {
      flex: 1,
    },
    card: {
      backgroundColor: theme.colors.card,
      marginHorizontal: 16,
      marginVertical: 8,
      paddingHorizontal: 16,
      paddingVertical: 20,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.colors.text,
      marginBottom: 12,
    },
    stat: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    statLabel: {
      fontSize: 14,
      color: theme.colors.textSecondary,
    },
    statValue: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.text,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Portfolio</Text>
        <Text style={styles.subtitle}>Your stock overview</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Portfolio Summary</Text>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Total Value</Text>
            <Text style={styles.statValue}>$12,450.50</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Total Gain/Loss</Text>
            <Text style={[styles.statValue, { color: theme.colors.success }]}>
              +$245.30 (+2.01%)
            </Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Holdings</Text>
            <Text style={styles.statValue}>8 stocks</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Top Performers</Text>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>NVDA</Text>
            <Text style={[styles.statValue, { color: theme.colors.success }]}>
              +6.10%
            </Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>BTC</Text>
            <Text style={[styles.statValue, { color: theme.colors.success }]}>
              +8.50%
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Theme Demo</Text>
          <Text style={styles.statLabel}>
            Switch to dark mode in the Profile tab to see all colors change instantly across the entire app.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}