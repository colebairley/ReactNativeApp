import * as ImageManipulator from 'expo-image-manipulator';

/// Compress image to reduce file size
export const compressImage = async (imageUri) => {
  try {
    console.log('Starting compression for:', imageUri);
    
    const manipulatedImage = await ImageManipulator.manipulateAsync(
      imageUri,
      [
        {
          resize: {
            width: 600,
            height: 600,
          },
        },
      ],
      {
        compress: 0.6, // 60% quality
        format: ImageManipulator.SaveFormat.JPEG,
      }
    );

    console.log('Compression complete:', manipulatedImage.uri);
    return manipulatedImage.uri;
  } catch (error) {
    console.error('Error compressing image:', error);
    // Return original URI if compression fails
    return imageUri;
  }
};

// Convert image URI to base64 string
export const imageToBase64 = async (imageUri) => {
  try {
    console.log('Converting to base64:', imageUri);
    
    const response = await fetch(imageUri);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        try {
          const base64 = reader.result.split(',')[1];
          console.log('Base64 conversion complete');
          resolve(base64);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error converting image to base64:', error);
    throw error;
  }
};

// Convert base64 string back to image URI
export const base64ToImageUri = (base64) => {
  return `data:image/jpeg;base64,${base64}`;
};