import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export default function TextInputWithError({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  multiline = false,
  maxLength,
}) {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      marginBottom: 16,
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: 6,
    },
    input: {
      backgroundColor: theme.colors.background,
      borderWidth: 2,
      borderColor: error ? theme.colors.error : theme.colors.border,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 14,
      color: theme.colors.text,
      minHeight: multiline ? 100 : 45,
      textAlignVertical: multiline ? 'top' : 'center',
    },
    errorText: {
      color: theme.colors.error,
      fontSize: 12,
      marginTop: 4,
      fontWeight: '500',
    },
    counterText: {
      color: theme.colors.textSecondary,
      fontSize: 12,
      marginTop: 4,
      textAlign: 'right',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textSecondary}
        multiline={multiline}
        maxLength={maxLength}
      />
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}
      {maxLength && (
        <Text style={styles.counterText}>
          {value.length}/{maxLength} characters
        </Text>
      )}
    </View>
  );
}