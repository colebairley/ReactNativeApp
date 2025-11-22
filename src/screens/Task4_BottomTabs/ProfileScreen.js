import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';

export default function ProfileScreen() {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const [username, setUsername] = useState('John Doe');
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveUsername = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      backgroundColor: theme.colors.card,
      paddingHorizontal: 16,
      paddingVertical: 20,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: '700',
      color: theme.colors.text,
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 14,
      color: theme.colors.textSecondary,
    },
    scrollView: {
      flex: 1,
    },
    card: {
      backgroundColor: theme.colors.card,
      marginHorizontal: 16,
      marginVertical: 8,
      paddingHorizontal: 16,
      paddingVertical: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.colors.text,
      marginBottom: 12,
    },
    label: {
      fontSize: 13,
      color: theme.colors.textSecondary,
      fontWeight: '500',
      marginBottom: 6,
    },
    input: {
      backgroundColor: theme.colors.background,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 14,
      color: theme.colors.text,
      marginBottom: 12,
    },
    saveButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    saveButtonText: {
      color: '#fff',
      fontSize: 14,
      fontWeight: '600',
    },
    savedMessage: {
      color: theme.colors.success,
      fontSize: 13,
      marginTop: 8,
      textAlign: 'center',
    },
    themeRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    themeLabel: {
      fontSize: 14,
      color: theme.colors.text,
      fontWeight: '500',
    },
    themeModeText: {
      fontSize: 13,
      color: theme.colors.textSecondary,
      marginTop: 8,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <Text style={styles.subtitle}>Manage your settings</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Username Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Account</Text>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Enter username"
            placeholderTextColor={theme.colors.textSecondary}
          />
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveUsername}
          >
            <Text style={styles.saveButtonText}>Save Username</Text>
          </TouchableOpacity>
          {isSaved && <Text style={styles.savedMessage}>✓ Saved!</Text>}
        </View>

        {/* Theme Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Appearance</Text>
          <View style={styles.themeRow}>
            <Text style={styles.themeLabel}>Dark Mode</Text>
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              trackColor={{
                false: theme.colors.border,
                true: theme.colors.primary,
              }}
              thumbColor={isDarkMode ? theme.colors.primary : '#fff'}
            />
          </View>
          <Text style={styles.themeModeText}>
            Currently: {isDarkMode ? 'Dark Mode' : 'Light Mode'}
          </Text>
          <Text style={styles.themeModeText}>
            Theme changes are saved automatically and applied across all tabs.
          </Text>
        </View>

        {/* Info Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>About</Text>
          <Text style={styles.themeModeText}>App Version: 1.0.0</Text>
          <Text style={styles.themeModeText}>
            Switch between light and dark mode to see how context-based theming works across all tabs.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}