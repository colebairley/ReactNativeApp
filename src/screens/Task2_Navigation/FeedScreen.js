import React, { useState, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { MOCK_POSTS } from '../../utils/mockPostData';
import FeedPostItem from '../../components/Task2/FeedPostItem';
import { getLikedPost } from '../../services/likeTracker';
import { useTheme } from '../../hooks/useTheme';

export default function FeedScreen({ navigation }) {
  const { theme } = useTheme();
  const [posts, setPosts] = useState(MOCK_POSTS);

  useFocusEffect(
    useCallback(() => {
      console.log('Feed focused');
      
      const likedPostId = getLikedPost();
      
      if (likedPostId) {
        console.log('Updating liked post:', likedPostId);
        toggleLike(likedPostId);
      }
    }, [])
  );

  const toggleLike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          const newLiked = !post.liked;
          return {
            ...post,
            liked: newLiked,
            likes: newLiked ? post.likes + 1 : post.likes - 1,
          };
        }
        return post;
      })
    );
  };

  const handlePostPress = (postId) => {
    navigation.navigate('Detail', { postId });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: theme.colors.card,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: theme.colors.text,
    },
    listContent: {
      paddingVertical: 8,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Community Feed</Text>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FeedPostItem
            post={item}
            onPress={() => handlePostPress(item.id)}
            theme={theme}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}