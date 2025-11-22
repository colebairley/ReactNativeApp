import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

const THEME_STORAGE_KEY = 'appTheme';
const FONT_SIZE_STORAGE_KEY = 'appFontSize';

// Light theme colors
const lightTheme = {
  dark: false,
  colors: {
    primary: '#007AFF',
    background: '#F5F5F5',
    card: '#fff',
    text: '#333',
    textSecondary: '#999',
    border: '#E0E0E0',
    error: '#FF3B30',
    success: '#34C759',
  },
};

// Dark theme colors
const darkTheme = {
  dark: true,
  colors: {
    primary: '#0A84FF',
    background: '#1a1a1a',
    card: '#2c2c2c',
    text: '#fff',
    textSecondary: '#aaa',
    border: '#444',
    error: '#FF453A',
    success: '#30B0C0',
  },
};

// Font size multipliers
const fontSizes = {
  small: {
    xs: 10,
    sm: 12,
    base: 14,
    lg: 16,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
  },
  medium: {
    xs: 11,
    sm: 13,
    base: 15,
    lg: 17,
    xl: 21,
    '2xl': 25,
    '3xl': 29,
  },
  large: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 22,
    '2xl': 26,
    '3xl': 30,
  },
};

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState('medium'); // 'small', 'medium', 'large'
  const [isLoading, setIsLoading] = useState(true);

  // Load theme and font size from storage on mount
  useEffect(() => {
    loadSettings();
  }, []);

  // Save theme to storage when it changes
  useEffect(() => {
    if (!isLoading) {
      saveTheme();
    }
  }, [isDarkMode, isLoading]);

  // Save font size to storage when it changes
  useEffect(() => {
    if (!isLoading) {
      saveFontSize();
    }
  }, [fontSize, isLoading]);

  const loadSettings = async () => {
    try {
      const [savedTheme, savedFontSize] = await Promise.all([
        AsyncStorage.getItem(THEME_STORAGE_KEY),
        AsyncStorage.getItem(FONT_SIZE_STORAGE_KEY),
      ]);

      if (savedTheme !== null) {
        setIsDarkMode(savedTheme === 'dark');
      }

      if (savedFontSize !== null) {
        setFontSize(savedFontSize);
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error loading settings:', error);
      setIsLoading(false);
    }
  };

  const saveTheme = async () => {
    try {
      const themeValue = isDarkMode ? 'dark' : 'light';
      await AsyncStorage.setItem(THEME_STORAGE_KEY, themeValue);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const saveFontSize = async () => {
    try {
      await AsyncStorage.setItem(FONT_SIZE_STORAGE_KEY, fontSize);
    } catch (error) {
      console.error('Error saving font size:', error);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const updateFontSize = (size) => {
    if (Object.keys(fontSizes).includes(size)) {
      setFontSize(size);
    }
  };

  const theme = isDarkMode ? darkTheme : lightTheme;
  const currentFontSizes = fontSizes[fontSize];

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDarkMode,
        toggleTheme,
        fontSize,
        updateFontSize,
        fontSizes: currentFontSizes,
        isLoading,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}