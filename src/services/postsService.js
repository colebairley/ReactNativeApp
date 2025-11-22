import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'socialFeedPosts';

export const savePosts = async (posts) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  } catch (error) {
    console.error('Error saving posts:', error);
    throw error;
  }
};

export const loadPosts = async () => {
  try {
    const posts = await AsyncStorage.getItem(STORAGE_KEY);
    return posts ? JSON.parse(posts) : [];
  } catch (error) {
    console.error('Error loading posts:', error);
    return [];
  }
};

export const addPost = async (newPost) => {
  try {
    const posts = await loadPosts();
    const updatedPosts = [newPost, ...posts]; 
    await savePosts(updatedPosts);
    return updatedPosts;
  } catch (error) {
    console.error('Error adding post:', error);
    throw error;
  }
};

export const createPost = (text, imageBase64) => {
  return {
    id: Date.now().toString(), // Simple ID using timestamp
    text,
    imageBase64: imageBase64 || null,
    timestamp: new Date().toISOString(),
  };
};