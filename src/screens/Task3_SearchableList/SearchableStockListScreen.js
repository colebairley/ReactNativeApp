import React, { useState, useRef } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TASK3_STOCKS } from '../../utils/mockStockData';
import StockListItem from '../../components/Task3/StockListItem';
import SortModal from '../../components/Task3/SortModal';

export default function SearchableStockListScreen() {
  const [allStocks, setAllStocks] = useState(TASK3_STOCKS);
  const [searchQuery, setSearchQuery] = useState('');
  //Sort by: 'symbol' | 'price' | 'change'
  const [sortBy, setSortBy] = useState('symbol');
  const [isLoading, setIsLoading] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);

  // Filter stocks based on search query
  const filterStocks = () => {
    return allStocks.filter((stock) => {
      const query = searchQuery.toLowerCase();
      return (
        stock.symbol.toLowerCase().includes(query) ||
        stock.name.toLowerCase().includes(query)
      );
    });
  };

  // Sort stocks based on sortBy value
  const sortStocks = (stocks) => {
    const sorted = [...stocks]; 

    if (sortBy === 'symbol') {
      sorted.sort((a, b) => a.symbol.localeCompare(b.symbol));
    } else if (sortBy === 'price') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'change') {
      sorted.sort((a, b) => b.change - a.change);
    }

    return sorted;
  };

  // Get filtered and sorted stocks
  const filteredStocks = filterStocks();
  const displayStocks = sortStocks(filteredStocks);

  // Handle refresh
  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setAllStocks([...TASK3_STOCKS]);
      setIsLoading(false);
    }, 1000);
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchQuery('');
  };

  // Get sort label for display
  const getSortLabel = () => {
    switch (sortBy) {
      case 'symbol':
        return 'Symbol';
      case 'price':
        return 'Price';
      case 'change':
        return 'Change %';
      default:
        return 'Sort';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by symbol or name..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClearSearch}
          >
            <Text style={styles.clearButtonText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Sort and Filter Controls */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={styles.sortButton}
          onPress={() => setShowSortModal(true)}
        >
          <Text style={styles.sortButtonText}>⬇ {getSortLabel()}</Text>
        </TouchableOpacity>
        <Text style={styles.resultCount}>
          {displayStocks.length} result{displayStocks.length !== 1 ? 's' : ''}
        </Text>
      </View>

      {/* Stock List or No Results */}
      {displayStocks.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>No stocks found</Text>
          <Text style={styles.noResultsSubtext}>
            Try searching with a different symbol or name
          </Text>
        </View>
      ) : (
        <FlatList
          data={displayStocks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <StockListItem stock={item} />}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={handleRefresh}
              tintColor="#007AFF"
            />
          }
        />
      )}

      {/* Sort Modal */}
      <SortModal
        visible={showSortModal}
        currentSort={sortBy}
        onSelectSort={(sort) => {
          setSortBy(sort);
          setShowSortModal(false);
        }}
        onClose={() => setShowSortModal(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  searchContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#333',
  },
  clearButton: {
    marginLeft: 8,
    padding: 8,
  },
  clearButtonText: {
    fontSize: 18,
    color: '#999',
  },
  controlsContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  sortButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#007AFF',
    borderRadius: 6,
  },
  sortButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  resultCount: {
    fontSize: 13,
    color: '#999',
    fontWeight: '500',
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#999',
  },
  listContent: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
});