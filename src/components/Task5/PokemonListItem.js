import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export default function PokemonListItem({ pokemon }) {
  const { theme } = useTheme();
  const [imageLoading, setImageLoading] = useState(true);
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
    },
    image: {
      width: 80,
      height: 80,
      borderRadius: 8,
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
          <Text style={{ fontSize: 40 }}>🤷</Text>
        ) : (
          <>
            {imageLoading && (
              <ActivityIndicator color={theme.colors.primary} />
            )}
            <Image
              source={{ uri: pokemon.imageUrl }}
              style={[styles.image, imageLoading && { display: 'none' }]}
              onLoadStart={() => setImageLoading(true)}
              onLoadEnd={() => setImageLoading(false)}
              onError={() => {
                setImageError(true);
                setImageLoading(false);
              }}
            />
          </>
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{pokemon.name}</Text>
        <Text style={styles.id}>#{pokemon.id.toString().padStart(3, '0')}</Text>
      </View>
    </View>
  );
}