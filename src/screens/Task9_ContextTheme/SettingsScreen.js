import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Switch,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';

export default function SettingsScreen() {
  const { theme, isDarkMode, toggleTheme, fontSize, updateFontSize, fontSizes } = useTheme();

  // Map font size to slider value (0 = small, 1 = medium, 2 = large)
  const fontSizeValues = { small: 0, medium: 1, large: 2 };
  const sliderValue = fontSizeValues[fontSize];

  const handleSliderChange = (value) => {
    const sizes = ['small', 'medium', 'large'];
    updateFontSize(sizes[Math.round(value)]);
  };

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
    headerTitle: {
      fontSize: fontSizes['3xl'],
      fontWeight: '700',
      color: theme.colors.text,
      marginBottom: 4,
    },
    subtitle: {
      fontSize: fontSizes.base,
      color: theme.colors.textSecondary,
    },
    scrollView: {
      flex: 1,
    },
    contentContainer: {
      padding: 16,
    },
    section: {
      backgroundColor: theme.colors.card,
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    sectionTitle: {
      fontSize: fontSizes.xl,
      fontWeight: '700',
      color: theme.colors.text,
      marginBottom: 16,
    },
    settingRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    settingRow_last: {
      borderBottomWidth: 0,
      marginBottom: 0,
      paddingBottom: 0,
    },
    settingLabel: {
      fontSize: fontSizes.base,
      color: theme.colors.text,
      fontWeight: '600',
    },
    settingDescription: {
      fontSize: fontSizes.sm,
      color: theme.colors.textSecondary,
      marginTop: 4,
    },
    fontSizeContainer: {
      width: '100%',
      marginBottom: 12,
    },
    sliderLabel: {
      fontSize: fontSizes.sm,
      color: theme.colors.textSecondary,
      marginBottom: 8,
      fontWeight: '500',
    },
    fontSizeOptions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 8,
    },
    fontSizeOption: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.background,
    },
    fontSizeOptionActive: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    fontSizeOptionText: {
      color: theme.colors.text,
      fontSize: fontSizes.sm,
      fontWeight: '500',
    },
    fontSizeOptionTextActive: {
      color: '#fff',
    },
    previewBox: {
      backgroundColor: theme.colors.background,
      padding: 12,
      borderRadius: 8,
      marginTop: 12,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    previewText: {
      fontSize: fontSizes.base,
      color: theme.colors.text,
      lineHeight: fontSizes.base * 1.5,
    },
    infoCard: {
      backgroundColor: theme.colors.background,
      borderLeftWidth: 4,
      borderLeftColor: theme.colors.primary,
      padding: 12,
      borderRadius: 8,
      marginTop: 12,
    },
    infoText: {
      fontSize: fontSizes.sm,
      color: theme.colors.textSecondary,
      lineHeight: fontSizes.sm * 1.5,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
        <Text style={styles.subtitle}>Customize your experience</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.contentContainer}>
          {/* Theme Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Appearance</Text>

            <View style={styles.settingRow}>
              <View>
                <Text style={styles.settingLabel}>Dark Mode</Text>
                <Text style={styles.settingDescription}>
                  {isDarkMode ? 'Enabled' : 'Disabled'}
                </Text>
              </View>
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
          </View>

          {/* Font Size Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Font Size</Text>

            <View style={styles.fontSizeContainer}>
              <Text style={styles.sliderLabel}>
                Current: <Text style={{ fontWeight: '700', textTransform: 'capitalize' }}>{fontSize}</Text>
              </Text>
              <Slider
                style={{ height: 40 }}
                minimumValue={0}
                maximumValue={2}
                step={1}
                value={sliderValue}
                onValueChange={handleSliderChange}
                minimumTrackTintColor={theme.colors.primary}
                maximumTrackTintColor={theme.colors.border}
                thumbTintColor={theme.colors.primary}
              />

              <View style={styles.fontSizeOptions}>
                <TouchableOpacity
                  style={[
                    styles.fontSizeOption,
                    fontSize === 'small' && styles.fontSizeOptionActive,
                  ]}
                  onPress={() => updateFontSize('small')}
                >
                  <Text
                    style={[
                      styles.fontSizeOptionText,
                      fontSize === 'small' && styles.fontSizeOptionTextActive,
                    ]}
                  >
                    S
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.fontSizeOption,
                    fontSize === 'medium' && styles.fontSizeOptionActive,
                  ]}
                  onPress={() => updateFontSize('medium')}
                >
                  <Text
                    style={[
                      styles.fontSizeOptionText,
                      fontSize === 'medium' && styles.fontSizeOptionTextActive,
                    ]}
                  >
                    M
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.fontSizeOption,
                    fontSize === 'large' && styles.fontSizeOptionActive,
                  ]}
                  onPress={() => updateFontSize('large')}
                >
                  <Text
                    style={[
                      styles.fontSizeOptionText,
                      fontSize === 'large' && styles.fontSizeOptionTextActive,
                    ]}
                  >
                    L
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.previewBox}>
                <Text style={styles.previewText}>
                  Sample text showing the current font size. It updates in real-time!
                </Text>
              </View>

              <View style={styles.infoCard}>
                <Text style={styles.infoText}>
                  Font size changes are applied instantly across the entire app. Move the slider or tap S/M/L buttons to adjust.
                </Text>
              </View>
            </View>
          </View>

          {/* About Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>

            <View style={[styles.settingRow, styles.settingRow_last]}>
              <View>
                <Text style={styles.settingLabel}>Settings Version</Text>
                <Text style={styles.settingDescription}>
                  All changes are saved automatically to your device
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}