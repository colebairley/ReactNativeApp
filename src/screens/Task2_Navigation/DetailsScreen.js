import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { MOCK_POSTS } from '../../utils/mockPostData';
import CommentItem from '../../components/Task2/CommentItem';
import { setLikedPost } from '../../services/likeTracker';

export default function DetailScreen() {
  const route = useRoute();
  const { postId } = route.params;

  const initialPost = MOCK_POSTS.find((p) => p.id === postId);
  const [post, setPost] = useState(initialPost);

  const handleLike = () => {
    console.log('Like pressed! Current liked state:', post.liked);
    
    const newLiked = !post.liked;

    setPost((prevPost) => ({
      ...prevPost,
      liked: newLiked,
      likes: newLiked ? prevPost.likes + 1 : prevPost.likes - 1,
    }));

    // Signal to FeedScreen which post was liked
    console.log('Setting liked post:', postId);
    setLikedPost(postId);
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!post) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Post not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>{post.title}</Text>

          <View style={styles.authorSection}>
            <Text style={styles.author}>{post.author}</Text>
            <Text style={styles.date}>{formatDate(post.timestamp)}</Text>
          </View>
        </View>

        <View style={styles.actionBar}>
          <TouchableOpacity
            style={[
              styles.likeButton,
              post.liked && styles.likeButtonActive,
            ]}
            onPress={handleLike}
          >
            <Text style={styles.likeIcon}>{post.liked ? '♥' : '♡'}</Text>
            <Text style={styles.likeCount}>{post.likes} likes</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contentSection}>
          <Text style={styles.content}>{post.content}</Text>
        </View>

        <View style={styles.commentsSection}>
          <Text style={styles.commentsTitle}>Comments ({post.comments.length})</Text>

          {post.comments.length > 0 ? (
            <FlatList
              data={post.comments}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              renderItem={({ item }) => <CommentItem comment={item} />}
            />
          ) : (
            <Text style={styles.noComments}>No comments yet</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  authorSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  author: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginRight: 8,
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  actionBar: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  likeButtonActive: {
    backgroundColor: '#FFE5E5',
  },
  likeIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  likeCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  contentSection: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
  },
  content: {
    fontSize: 15,
    color: '#555',
    lineHeight: 24,
  },
  commentsSection: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  noComments: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
});