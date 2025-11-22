import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'pinnedStockIds';

export function usePinnedStocks() {
  const [pinnedIds, setPinnedIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load pinned stocks from storage when component mounts
  useEffect(() => {
    loadPinnedStocks();
  }, []); 

  // Save to storage whenever pinnedIds changes
  useEffect(() => {
    if (!isLoading) {
      savePinnedStocks();
    }
  }, [pinnedIds, isLoading]);

  const loadPinnedStocks = async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) {
        setPinnedIds(JSON.parse(saved));
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading pinned stocks:', error);
      setIsLoading(false);
    }
  };

  const savePinnedStocks = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(pinnedIds));
    } catch (error) {
      console.error('Error saving pinned stocks:', error);
    }
  };

  const togglePin = (stockId) => {
    setPinnedIds((prevIds) => {
      // If already pinned, remove it
      if (prevIds.includes(stockId)) {
        return prevIds.filter((id) => id !== stockId);
      }
      // If not pinned and under 3 limit, add it
      if (prevIds.length < 3) {
        return [...prevIds, stockId];
      }
      // If already 3 pinned, do nothing
      return prevIds;
    });
  };

  const isPinned = (stockId) => pinnedIds.includes(stockId);

  return {
    pinnedIds,
    isLoading,
    togglePin,
    isPinned,
  };
}