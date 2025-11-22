import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OfflineBadge from '../../components/Task10/OfflineBadge';
import FeedPostItem from '../../components/Task2/FeedPostItem';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';
import { useTheme } from '../../hooks/useTheme';
import { loadPosts } from '../../services/feedService';

export default function OfflineFirstFeedScreen() {
  const { theme, fontSizes } = useTheme();
  const { isOnline, isLoading: networkLoading } = useNetworkStatus();

  // State
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [isCached, setIsCached] = useState(false);
  const [source, setSource] = useState('api');

  // Load posts on mount
  useEffect(() => {
    if (!networkLoading) {
      loadPostsData();
    }
  }, []);

  // Reload when network state changes
  useEffect(() => {
    if (!networkLoading && posts.length === 0) {
      loadPostsData();
    }
  }, [isOnline, networkLoading]);

  const loadPostsData = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log(`Loading posts. Online: ${isOnline}`);
      const result = await loadPosts(isOnline);
      console.log('Posts loaded successfully:', result.posts.length);
      setPosts(result.posts);
      setIsCached(result.cached);
      setSource(result.source);
    } catch (err) {
      console.error('Error loading posts:', err);
      setError(err.message);
      Alert.alert('Error', err.message || 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadPostsData();
    setRefreshing(false);
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
      fontSize: fontSizes['2xl'],
      fontWeight: '700',
      color: theme.colors.text,
      marginBottom: 4,
    },
    subtitle: {
      fontSize: fontSizes.sm,
      color: theme.colors.textSecondary,
    },
    statusContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
    },
    statusDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginRight: 6,
      backgroundColor: isOnline ? theme.colors.success : theme.colors.error,
    },
    statusText: {
      fontSize: fontSizes.xs,
      fontWeight: '500',
      color: isOnline ? theme.colors.success : theme.colors.error,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 32,
    },
    errorIcon: {
      fontSize: 48,
      marginBottom: 16,
    },
    errorText: {
      fontSize: fontSizes.base,
      color: theme.colors.error,
      textAlign: 'center',
      marginBottom: 16,
    },
    listContent: {
      paddingVertical: 8,
    },
    sourceInfo: {
      backgroundColor: theme.colors.card,
      marginHorizontal: 16,
      marginVertical: 8,
      padding: 12,
      borderRadius: 8,
      borderLeftWidth: 4,
      borderLeftColor: source === 'api' ? theme.colors.primary : theme.colors.error,
    },
    sourceText: {
      fontSize: fontSizes.sm,
      color: theme.colors.text,
      fontWeight: '500',
    },
  });

  if (networkLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Finance Feed</Text>
          <Text style={styles.subtitle}>Loading network status...</Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Finance Feed</Text>
        <Text style={styles.subtitle}>Offline-first posts with smart caching</Text>
        <View style={styles.statusContainer}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>
            {isOnline ? 'Online' : 'Offline'}
          </Text>
        </View>
      </View>

      {loading && posts.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={[styles.errorText, { marginTop: 16, color: theme.colors.text }]}>
            {isOnline ? 'Fetching from server...' : 'Loading from cache...'}
          </Text>
        </View>
      ) : error && posts.length === 0 ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <FeedPostItem post={item} onPress={() => {}} theme={theme} />
          )}
          ListHeaderComponent={
            <>
              <OfflineBadge isOnline={isOnline} isCached={isCached} />
              <View style={styles.sourceInfo}>
                <Text style={styles.sourceText}>
                  📌 Data from: <Text style={{ fontWeight: '700' }}>
                    {source === 'api' ? 'Live Server' : 'Local Cache'}
                  </Text>
                </Text>
              </View>
            </>
          }
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={theme.colors.primary}
            />
          }
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
}