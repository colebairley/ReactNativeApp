import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { base64ToImageUri } from '../../utils/imageCompression';

export default function PostCard({ post }) {
  const { theme } = useTheme();

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.card,
      marginVertical: 6,
      marginHorizontal: 8,
      borderRadius: 8,
      padding: 12,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    user: {
      fontSize: 13,
      fontWeight: '600',
      color: theme.colors.text,
    },
    timestamp: {
      fontSize: 12,
      color: theme.colors.textSecondary,
    },
    text: {
      fontSize: 14,
      color: theme.colors.text,
      lineHeight: 20,
      marginBottom: post.imageBase64 ? 12 : 0,
    },
    image: {
      width: '100%',
      height: 200,
      borderRadius: 8,
      marginBottom: 8,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.user}>You</Text>
        <Text style={styles.timestamp}>{formatDate(post.timestamp)}</Text>
      </View>

      <Text style={styles.text}>{post.text}</Text>

      {post.imageBase64 && (
        <Image
          source={{ uri: base64ToImageUri(post.imageBase64) }}
          style={styles.image}
        />
      )}
    </View>
  );
}