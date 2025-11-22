import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export default function PokemonListItem({ pokemon }) {
  const { theme } = useTheme();
  const [imageError, setImageError] = useState(false);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.card,
      marginVertical: 6,
      marginHorizontal: 8,
      borderRadius: 8,
      padding: 12,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    imageContainer: {
      width: 80,
      height: 80,
      marginRight: 12,
      backgroundColor: theme.colors.background,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
    content: {
      flex: 1,
    },
    name: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.colors.text,
      marginBottom: 4,
    },
    id: {
      fontSize: 13,
      color: theme.colors.textSecondary,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {imageError ? (
          <Text style={{ fontSize: 40 }}>🎪</Text>
        ) : (
          <Image
            source={{ uri: pokemon.imageUrl }}
            style={styles.image}
            onError={() => {
              console.log('Image failed to load:', pokemon.imageUrl);
              setImageError(true);
            }}
          />
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{pokemon.name}</Text>
        <Text style={styles.id}>#{pokemon.id.toString().padStart(3, '0')}</Text>
      </View>
    </View>
  );
}