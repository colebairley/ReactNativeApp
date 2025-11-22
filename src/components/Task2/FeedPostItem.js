import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';

export default function FeedPostItem({ post, onPress, theme }) {
  // Format timestamp to readable format
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.card,
      marginVertical: 6,
      marginHorizontal: 8,
      borderRadius: 8,
      padding: 16,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    pressed: {
      opacity: 0.7,
    },
    header: {
      marginBottom: 12,
    },
    authorInfo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    author: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.text,
      marginRight: 8,
    },
    timestamp: {
      fontSize: 12,
      color: theme.colors.textSecondary,
    },
    title: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.colors.text,
      marginBottom: 8,
    },
    preview: {
      fontSize: 13,
      color: theme.colors.text,
      lineHeight: 18,
      marginBottom: 12,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    stats: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    statText: {
      fontSize: 12,
      color: theme.colors.textSecondary,
      fontWeight: '500',
    },
    separator: {
      marginHorizontal: 6,
      color: theme.colors.border,
    },
    likeIndicator: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: theme.colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
    likeIndicatorActive: {
      backgroundColor: '#FFE5E5',
    },
    likeText: {
      fontSize: 16,
    },
  });

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [
      styles.container,
      pressed && styles.pressed,
    ]}>
      <View style={styles.header}>
        <View style={styles.authorInfo}>
          <Text style={styles.author}>{post.author}</Text>
          <Text style={styles.timestamp}>{formatDate(post.timestamp)}</Text>
        </View>
      </View>

      <Text style={styles.title}>{post.title}</Text>

      <Text style={styles.preview} numberOfLines={2}>
        {post.content}
      </Text>

      <View style={styles.footer}>
        <View style={styles.stats}>
          <Text style={styles.statText}>{post.likes} likes</Text>
          <Text style={styles.separator}>•</Text>
          <Text style={styles.statText}>{post.comments.length} comments</Text>
        </View>

        <View style={[
          styles.likeIndicator,
          post.liked && styles.likeIndicatorActive,
        ]}>
          <Text style={styles.likeText}>{post.liked ? '♥' : '♡'}</Text>
        </View>
      </View>
    </Pressable>
  );
}