import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CommentItem({ comment }) {
  return (
    <View style={styles.container}>
      <Text style={styles.author}>{comment.author}</Text>
      <Text style={styles.text}>{comment.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  author: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  text: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
});