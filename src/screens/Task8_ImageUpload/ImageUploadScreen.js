import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from '../../hooks/useTheme';
import { addPost, loadPosts, createPost } from '../../services/postsService';
import { imageToBase64 } from '../../utils/imageCompression';
import ImagePickerModal from '../../components/Task8/ImagePickerModal';
import PostCard from '../../components/Task8/PostCard';

export default function ImageUploadScreen() {
  const { theme } = useTheme();

  // Form state
  const [text, setText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showImagePicker, setShowImagePicker] = useState(false);

  // Load posts on mount and when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadPostsFromStorage();
    }, [])
  );

  const loadPostsFromStorage = async () => {
    try {
      const loadedPosts = await loadPosts();
      setPosts(loadedPosts);
    } catch (error) {
      console.error('Error loading posts:', error);
    }
  };

  const handleImageSelected = async (imageUri) => {
    try {
      // Convert image to base64
      const base64 = await imageToBase64(imageUri);
      setSelectedImage({ uri: imageUri, base64 });
    } catch (error) {
      Alert.alert('Error', 'Failed to process image');
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  const handlePost = async () => {
    if (!text.trim()) {
      Alert.alert('Error', 'Please enter some text');
      return;
    }

    setLoading(true);
    try {
      // Create post with optional image
      const newPost = createPost(text, selectedImage?.base64 || null);

      // Save to storage and update state
      const updatedPosts = await addPost(newPost);
      setPosts(updatedPosts);

      // Clear form
      setText('');
      setSelectedImage(null);

      // Show success
      Alert.alert('Success', 'Post created!');
    } catch (error) {
      console.error('Error creating post:', error);
      Alert.alert('Error', 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  const isPostDisabled = !text.trim() || loading;

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
    scrollView: {
      flex: 1,
    },
    contentContainer: {
      padding: 16,
      paddingBottom: 32,
    },
    composerCard: {
      backgroundColor: theme.colors.card,
      borderRadius: 8,
      padding: 12,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    input: {
      backgroundColor: theme.colors.background,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 14,
      color: theme.colors.text,
      minHeight: 80,
      textAlignVertical: 'top',
      marginBottom: 12,
    },
    imagePreview: {
      width: '100%',
      height: 150,
      borderRadius: 8,
      marginBottom: 12,
    },
    removeImageButton: {
      alignSelf: 'flex-end',
      paddingHorizontal: 8,
      paddingVertical: 4,
      marginBottom: 12,
    },
    removeImageText: {
      color: theme.colors.error,
      fontSize: 12,
      fontWeight: '500',
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 8,
    },
    imageButton: {
      flex: 1,
      backgroundColor: theme.colors.background,
      borderRadius: 8,
      paddingVertical: 10,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    imageButtonText: {
      color: theme.colors.text,
      fontSize: 13,
      fontWeight: '600',
    },
    postButton: {
      flex: 1,
      backgroundColor: theme.colors.primary,
      borderRadius: 8,
      paddingVertical: 10,
      alignItems: 'center',
      opacity: isPostDisabled ? 0.5 : 1,
    },
    postButtonText: {
      color: '#fff',
      fontSize: 13,
      fontWeight: '600',
    },
    feedSection: {
      marginTop: 12,
    },
    feedTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.colors.text,
      marginBottom: 8,
    },
    emptyFeed: {
      alignItems: 'center',
      paddingVertical: 40,
    },
    emptyText: {
      color: theme.colors.textSecondary,
      fontSize: 14,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Social Feed</Text>
        <Text style={styles.subtitle}>Share photos and thoughts</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
        >
          {/* Composer */}
          <View style={styles.composerCard}>
            <TextInput
              style={styles.input}
              placeholder="What's on your mind?"
              placeholderTextColor={theme.colors.textSecondary}
              value={text}
              onChangeText={setText}
              multiline
              editable={!loading}
            />

            {selectedImage && (
              <>
                <Image
                  source={{ uri: selectedImage.uri }}
                  style={styles.imagePreview}
                />
                <TouchableOpacity
                  style={styles.removeImageButton}
                  onPress={handleRemoveImage}
                  disabled={loading}
                >
                  <Text style={styles.removeImageText}>Remove Image</Text>
                </TouchableOpacity>
              </>
            )}

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.imageButton}
                onPress={() => setShowImagePicker(true)}
                disabled={loading}
              >
                <Text style={styles.imageButtonText}>
                  {selectedImage ? '📸 Change' : '📸 Add Image'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.postButton}
                onPress={handlePost}
                disabled={isPostDisabled}
              >
                <Text style={styles.postButtonText}>
                  {loading ? 'Posting...' : 'Post'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Feed */}
          <View style={styles.feedSection}>
            <Text style={styles.feedTitle}>
              Feed ({posts.length})
            </Text>

            {posts.length === 0 ? (
              <View style={styles.emptyFeed}>
                <Text style={styles.emptyText}>No posts yet. Create one!</Text>
              </View>
            ) : (
              <FlatList
                scrollEnabled={false}
                data={posts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <PostCard post={item} />}
              />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Image Picker Modal */}
      <ImagePickerModal
        visible={showImagePicker}
        onImageSelected={handleImageSelected}
        onClose={() => setShowImagePicker(false)}
      />
    </SafeAreaView>
  );
}