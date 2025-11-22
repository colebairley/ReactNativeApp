import { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';

export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check initial network state
    const checkConnection = async () => {
      try {
        const state = await NetInfo.fetch();
        setIsOnline(state.isConnected ?? true);
      } catch (error) {
        console.error('Error checking network:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkConnection();

    // Subscribe to network state changes
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Network state changed:', state.isConnected);
      setIsOnline(state.isConnected ?? true);
    });

    // Cleanup subscription
    return () => {
      unsubscribe();
    };
  }, []);

  return { isOnline, isLoading };
}