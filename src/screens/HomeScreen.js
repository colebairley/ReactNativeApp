import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { SafeAreaView } from 'react-native-safe-area-context';


const TASKS = [
  {
    id: '1',
    title: 'Task 1: Portfolio',
    description: 'Stock portfolio with holdings',
    screenName: 'Portfolio',
  },
  {
    id: '2',
    title: 'Task 2: Feed Navigation',
    description: 'Multi-screen feed with state',
    screenName: 'Feed',
  },
  {
    id: '3',
    title: 'Task 3: Searchable List',
    description: 'Search, sort, filter stocks',
    screenName: 'Task3',
  },
  {
    id: '4',
    title: 'Task 4: Bottom Tabs',
    description: 'Multi-tab navigation with theme',
    screenName: 'Task4',
  },
  {
    id: '5',
    title: 'Task 5: Loading States',
    description: 'Skeleton loaders & error handling',
    screenName: 'Task5',
  },
  {
    id: '6',
    title: 'Task 6: Form Validation',
    description: 'Form with validation & cooldown',
    screenName: 'Task6',
  },
  {
    id: '7',
    title: 'Task 7: Charts',
    description: 'Local data & chart interaction',
    screenName: 'Task7',
  },
  {
    id: '8',
    title: 'Task 8: Image Upload',
    description: 'Image picker & compression',
    screenName: 'Task8',
  },
  {
    id: '9',
    title: 'Task 9: Settings',
    description: 'Theme and font size customization',
    screenName: 'Task9',
  },
  {
    id: '10',
    title: 'Task 10: Offline-First Feed',
    description: 'Network-aware feed with caching',
    screenName: 'Task10',
 },
];

export default function HomeScreen({ navigation }) {
  const { theme, fontSizes } = useTheme();

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
    title: {
      fontSize: fontSizes['2xl'],
      fontWeight: '700',
      color: theme.colors.text,
      marginBottom: 4,
    },
    subtitle: {
      fontSize: fontSizes.sm,
      color: theme.colors.textSecondary,
    },
    taskItem: {
      backgroundColor: theme.colors.card,
      marginVertical: 6,
      marginHorizontal: 8,
      padding: 16,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    taskTitle: {
      fontSize: fontSizes.lg,
      fontWeight: '700',
      color: theme.colors.text,
      marginBottom: 6,
    },
    taskDescription: {
      fontSize: fontSizes.sm,
      color: theme.colors.textSecondary,
      marginBottom: 12,
    },
    taskButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 6,
      alignItems: 'center',
    },
    taskButtonText: {
      color: '#fff',
      fontSize: fontSizes.sm,
      fontWeight: '600',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Stock Social</Text>
        <Text style={styles.subtitle}>9 React Native Tasks</Text>
      </View>

      <FlatList
        data={TASKS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text style={styles.taskDescription}>{item.description}</Text>
            <TouchableOpacity
              style={styles.taskButton}
              onPress={() => navigation.navigate(item.screenName)}
            >
              <Text style={styles.taskButtonText}>Open →</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={{ paddingVertical: 8 }}
      />
    </SafeAreaView>
  );
}