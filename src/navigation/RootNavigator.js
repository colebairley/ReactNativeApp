import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from '../context/ThemeContext';
import HomeScreen from '../screens/HomeScreen';
import PortfolioScreen from '../screens/Task1_Portfolio/PortfolioScreen';
import FeedScreen from '../screens/Task2_Navigation/FeedScreen';
import DetailScreen from '../screens/Task2_Navigation/DetailsScreen';
import SearchableStockListScreen from '../screens/Task3_SearchableList/SearchableStockListScreen';
import BottomTabNavigator from './BottomTabNavigator';
import LoadingStatesScreen from '../screens/Task5_LoadingStates/LoadingStateScreen';
import FormValidationScreen from '../screens/Task6_FormValidation/FormValidation';
import ChartRenderingScreen from '../screens/Task7_ChartRendering/ChartRenderingScreen';
import ImageUploadScreen from '../screens/Task8_ImageUpload/ImageUploadScreen';
import SettingsScreen from '../screens/Task9_ContextTheme/SettingsScreen';
import OfflineFirstFeedScreen from '../screens/Task10_OfflineFirst/OfflineFirstFeedScreen';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Stock Social' }}
      />
      <Stack.Screen
        name="Portfolio"
        component={PortfolioScreen}
        options={{ title: 'Task 1: Portfolio' }}
      />
      <Stack.Screen
        name="Feed"
        component={FeedScreen}
        options={{ title: 'Task 2: Feed' }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{ title: 'Post Details' }}
      />
      <Stack.Screen
        name="Task3"
        component={SearchableStockListScreen}
        options={{ title: 'Task 3: Searchable List' }}
      />
      <Stack.Screen
        name="Task4"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Task5"
        component={LoadingStatesScreen}
        options={{ title: 'Task 5: Loading States' }}
        />
        <Stack.Screen
        name="Task6"
        component={FormValidationScreen}
        options={{ title: 'Task 6: Form Validation' }}
        />
        <Stack.Screen
        name="Task7"
        component={ChartRenderingScreen}
        options={{ title: 'Task 7: Charts' }}
        />
        <Stack.Screen
        name="Task8"
        component={ImageUploadScreen}
        options={{ title: 'Task 8: Image Upload' }}
        />
        <Stack.Screen
        name="Task9"
        component={SettingsScreen}
        options={{ title: 'Task 9: Settings' }}
        />
        <Stack.Screen
        name="Task10"
        component={OfflineFirstFeedScreen}
        options={{ title: 'Task 10: Offline-First Feed' }}
        />
    </Stack.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </ThemeProvider>
  );
}