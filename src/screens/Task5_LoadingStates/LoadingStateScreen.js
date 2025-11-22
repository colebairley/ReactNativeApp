import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { fetchPokemonList } from '../../services/pokemonService';
import SkeletonLoader from '../../components/Task5/SkeletonLoader';
import PokemonListItem from '../../components/Task5/PokemonListItem';
import ErrorState from '../../components/Task5/ErrorState';

export default function LoadingStatesScreen() {
  const { theme } = useTheme();
  const [status, setStatus] = useState('loading'); // 'loading', 'success', 'error'
  const [pokemon, setPokemon] = useState([]);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch data on mount
  useEffect(() => {
    loadPokemon();
  }, []);

  const loadPokemon = async () => {
    setStatus('loading');
    setError(null);

    try {
      const data = await fetchPokemonList();
      setPokemon(data);
      setStatus('success');
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const data = await fetchPokemonList();
      setPokemon(data);
      setStatus('success');
      setError(null);
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
    setIsRefreshing(false);
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
    contentContainer: {
      flex: 1,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pokémon List</Text>
        <Text style={styles.subtitle}>Fetched with loading & error states</Text>
      </View>

      {status === 'loading' && !isRefreshing && (
        <SkeletonLoader count={5} />
      )}

      {status === 'success' && (
        <FlatList
          data={pokemon}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <PokemonListItem pokemon={item} />}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              tintColor={theme.colors.primary}
            />
          }
          contentContainerStyle={styles.contentContainer}
        />
      )}

      {status === 'error' && (
        <ErrorState error={error} onRetry={loadPokemon} />
      )}
    </SafeAreaView>
  );
}