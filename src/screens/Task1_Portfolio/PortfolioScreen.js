import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PortfolioListItem from '../../components/Task1/PortfolioListItem';
import PortfolioSummary from '../../components/Task1/PortfolioSummary';
import { usePinnedStocks } from '../../hooks/usePinnedStocks';
import { MOCK_STOCKS } from '../../utils/mockStockData';
import { calculatePinnedSummary, sortStocks } from '../../utils/stockCalculations';

export default function PortfolioScreen() {
  const { pinnedIds, isLoading, togglePin, isPinned } = usePinnedStocks();

  // Sort stocks so pinned appear first
  const sortedStocks = sortStocks(MOCK_STOCKS, pinnedIds);

  // Calculate summary for pinned stocks
  const summary = calculatePinnedSummary(MOCK_STOCKS, pinnedIds);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <PortfolioSummary summary={summary} />
      </View>

      <FlatList
        data={sortedStocks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PortfolioListItem
            stock={item}
            isPinned={isPinned(item.id)}
            onPin={() => togglePin(item.id)}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  listContent: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
});