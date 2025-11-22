import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from '../../hooks/useTheme';
import { compressImage } from '../../utils/imageCompression';

export default function ImagePickerModal({
  visible,
  onImageSelected,
  onClose,
}) {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);

  const handlePickFromGallery = async () => {
    try {
      // Request permission
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please allow access to your photo library');
        return;
      }

      // Launch picker - this opens the native image picker dialog
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: false,
        quality: 0.8,
      });

      // User cancelled
      if (result.canceled) {
        console.log('User cancelled image picker');
        return;
      }

      // Got an image
      if (result.assets && result.assets[0]) {
        setLoading(true);
        try {
          const imageUri = result.assets[0].uri;
          console.log('Selected image URI:', imageUri);
          
          // Compress the image
          const compressedUri = await compressImage(imageUri);
          onImageSelected(compressedUri);
          onClose();
        } catch (error) {
          console.error('Error processing image:', error);
          Alert.alert('Error', 'Failed to process image');
        } finally {
          setLoading(false);
        }
      }
    } catch (error) {
      console.error('Error in gallery picker:', error);
      Alert.alert('Error', 'Failed to open gallery');
    }
  };

  const handlePickFromCamera = async () => {
    try {
      // Request permission
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please allow access to your camera');
        return;
      }

      // Launch camera - this opens the native camera
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
        quality: 0.8,
      });

      // User cancelled
      if (result.canceled) {
        console.log('User cancelled camera');
        return;
      }

      // Got a photo
      if (result.assets && result.assets[0]) {
        setLoading(true);
        try {
          const imageUri = result.assets[0].uri;
          console.log('Captured image URI:', imageUri);
          
          // Compress the image
          const compressedUri = await compressImage(imageUri);
          onImageSelected(compressedUri);
          onClose();
        } catch (error) {
          console.error('Error processing photo:', error);
          Alert.alert('Error', 'Failed to process photo');
        } finally {
          setLoading(false);
        }
      }
    } catch (error) {
      console.error('Error in camera:', error);
      Alert.alert('Error', 'Failed to open camera');
    }
  };

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    modalContent: {
      backgroundColor: theme.colors.card,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      paddingVertical: 16,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    title: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.colors.text,
    },
    closeButton: {
      fontSize: 24,
      color: theme.colors.textSecondary,
    },
    option: {
      paddingHorizontal: 16,
      paddingVertical: 14,
      flexDirection: 'row',
      alignItems: 'center',
    },
    optionIcon: {
      fontSize: 20,
      marginRight: 12,
    },
    optionText: {
      fontSize: 15,
      color: theme.colors.text,
      fontWeight: '500',
    },
    loadingContainer: {
      paddingVertical: 40,
      alignItems: 'center',
    },
    loadingText: {
      marginTop: 12,
      color: theme.colors.text,
      fontSize: 13,
      fontWeight: '500',
    },
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Select Image</Text>
            <TouchableOpacity onPress={onClose} disabled={loading}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator
                size="large"
                color={theme.colors.primary}
              />
              <Text style={styles.loadingText}>Processing image...</Text>
            </View>
          ) : (
            <>
              <TouchableOpacity
                style={styles.option}
                onPress={handlePickFromGallery}
              >
                <Text style={styles.optionIcon}>📸</Text>
                <Text style={styles.optionText}>Choose from Gallery</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.option}
                onPress={handlePickFromCamera}
              >
                <Text style={styles.optionIcon}>📷</Text>
                <Text style={styles.optionText}>Take a Photo</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}