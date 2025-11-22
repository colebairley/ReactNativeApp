import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LineChart } from 'react-native-chart-kit';
import { useTheme } from '../../hooks/useTheme';
import stockPriceData from '../../data/stockPriceHistory.json';
import { calculateStats, formatChartData } from '../../utils/chartCalculations';
import ChartLegend from '../../components/Task7/ChartLegend';
import StatsCard from '../../components/Task7/StatsCard';
import ChartTooltip from '../../components/Task7/ChartTooltip';

const screenWidth = Dimensions.get('window').width;

export default function ChartRenderingScreen() {
  const { theme } = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  // Calculate stats from local JSON
  const stats = calculateStats(stockPriceData.data);
  
  // Format data for chart with average line
  const chartData = formatChartData(stockPriceData.data, stats.avgPriceValue);

  // Handle data point selection
  const handleSelectDataPoint = (index) => {
    setSelectedIndex(index);
    setTooltipVisible(true);
    setTimeout(() => setTooltipVisible(false), 2500);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      backgroundColor: theme.colors.card,
      paddingHorizontal: 16,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: '700',
      color: theme.colors.text,
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 13,
      color: theme.colors.textSecondary,
    },
    scrollView: {
      flex: 1,
    },
    contentContainer: {
      padding: 16,
    },
    chartContainer: {
      backgroundColor: theme.colors.card,
      borderRadius: 8,
      overflow: 'hidden',
      marginBottom: 16,
    },
    chartHint: {
      textAlign: 'center',
      color: theme.colors.textSecondary,
      fontSize: 12,
      marginVertical: 8,
    },
    dataPointsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    dataPointButton: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    dataPointButtonActive: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    dataPointText: {
      fontSize: 11,
      color: theme.colors.textSecondary,
      fontWeight: '500',
    },
    dataPointTextActive: {
      color: '#fff',
    },
    tooltipContainer: {
      position: 'absolute',
      top: 40,
      left: '50%',
      marginLeft: -50,
      backgroundColor: theme.colors.text,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 6,
      zIndex: 1000,
      minWidth: 100,
      alignItems: 'center',
    },
    tooltipDate: {
      fontSize: 11,
      color: theme.colors.background,
      fontWeight: '500',
      marginBottom: 2,
    },
    tooltipPrice: {
      fontSize: 14,
      color: theme.colors.background,
      fontWeight: '700',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{stockPriceData.name}</Text>
        <Text style={styles.subtitle}>Historical price chart with interaction</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.contentContainer}>
          {/* Stats Card */}
          <StatsCard stats={stats} />

          {/* Custom Legend */}
          <ChartLegend />

          {/* Chart Container */}
          <View style={styles.chartContainer}>
            {tooltipVisible && selectedIndex !== null && (
              <View style={styles.tooltipContainer}>
                <Text style={styles.tooltipDate}>
                  {stockPriceData.data[selectedIndex].date}
                </Text>
                <Text style={styles.tooltipPrice}>
                  ${stockPriceData.data[selectedIndex].price}
                </Text>
              </View>
            )}

            <LineChart
              data={chartData}
              width={screenWidth - 32}
              height={220}
              chartConfig={{
                backgroundColor: theme.colors.card,
                backgroundGradientFrom: theme.colors.card,
                backgroundGradientTo: theme.colors.card,
                color: () => theme.colors.border,
                strokeWidth: 2,
                propsForDots: {
                  r: '4',
                  strokeWidth: '2',
                  stroke: '#007AFF',
                },
                propsForBackgroundLines: {
                  strokeDasharray: '',
                  stroke: theme.colors.border,
                  strokeWidth: 1,
                },
              }}
              bezier
              style={{
                borderRadius: 8,
              }}
            />

            <Text style={styles.chartHint}>Tap dates below to see price details</Text>
          </View>

          {/* Interactive Data Points */}
          <View style={styles.dataPointsContainer}>
            {stockPriceData.data.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dataPointButton,
                  selectedIndex === index && styles.dataPointButtonActive,
                ]}
                onPress={() => handleSelectDataPoint(index)}
              >
                <Text
                  style={[
                    styles.dataPointText,
                    selectedIndex === index && styles.dataPointTextActive,
                  ]}
                >
                  {item.date.slice(5)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}