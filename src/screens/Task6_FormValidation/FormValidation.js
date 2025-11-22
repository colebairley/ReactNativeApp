import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { validateTip, isFormValid } from '../../utils/formValidation';
import TextInputWithError from '../../components/Task6/TextInputWithError';
import CategoryDropdown from '../../components/Task6/CategoryDropdown';
import SuccessToast from '../../components/Task6/SuccessToast';

export default function FormValidationScreen() {
  const { theme } = useTheme();

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('stocks');
  const [errors, setErrors] = useState({});
  const [cooldown, setCooldown] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  // Cooldown timer
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleSubmit = () => {
    // Validate
    const newErrors = validateTip(title, description);
    setErrors(newErrors);

    if (!isFormValid(newErrors)) {
      return;
    }

    // Submit successful
    console.log('Submitted:', { title, description, category });

    // Show success message
    setShowSuccess(true);

    // Clear form
    setTitle('');
    setDescription('');
    setCategory('stocks');

    // Start cooldown
    setCooldown(10);
  };

  const isSubmitDisabled = cooldown > 0 || !title.trim() || !description.trim();

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
      fontSize: 24,
      fontWeight: '700',
      color: theme.colors.text,
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 13,
      color: theme.colors.textSecondary,
    },
    scrollView: {
      flex: 1,
    },
    formContainer: {
      padding: 16,
    },
    submitButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: 'center',
      marginBottom: 16,
      opacity: isSubmitDisabled ? 0.5 : 1,
    },
    submitButtonText: {
      color: '#fff',
      fontSize: 15,
      fontWeight: '600',
    },
    cooldownText: {
      color: theme.colors.textSecondary,
      fontSize: 12,
      textAlign: 'center',
      marginTop: 8,
    },
    infoCard: {
      backgroundColor: theme.colors.card,
      borderLeftWidth: 4,
      borderLeftColor: theme.colors.primary,
      padding: 12,
      borderRadius: 8,
      marginBottom: 16,
    },
    infoText: {
      color: theme.colors.textSecondary,
      fontSize: 13,
      lineHeight: 18,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Post a Tip</Text>
        <Text style={styles.subtitle}>Share your market insights</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.formContainer}>
          {/* Info Card */}
          <View style={styles.infoCard}>
            <Text style={styles.infoText}>
              Share valuable trading tips with the community. After posting, you'll need to wait 10 seconds before posting again.
            </Text>
          </View>

          {/* Form Fields */}
          <TextInputWithError
            label="Title"
            value={title}
            onChangeText={setTitle}
            placeholder="e.g., Apple Stock Rally"
            error={errors.title}
            maxLength={50}
          />

          <TextInputWithError
            label="Description"
            value={description}
            onChangeText={setDescription}
            placeholder="Describe your tip in detail..."
            error={errors.description}
            multiline
            maxLength={200}
          />

          <CategoryDropdown
            value={category}
            onSelect={setCategory}
          />

          {/* Submit Button */}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            disabled={isSubmitDisabled}
          >
            <Text style={styles.submitButtonText}>
              {cooldown > 0 ? `Wait ${cooldown}s` : 'Post Tip'}
            </Text>
          </TouchableOpacity>

          {cooldown > 0 && (
            <Text style={styles.cooldownText}>
              You can post again in {cooldown} second{cooldown !== 1 ? 's' : ''}
            </Text>
          )}
        </View>
      </ScrollView>

      {/* Success Toast */}
      <SuccessToast
        visible={showSuccess}
        message="Tip posted successfully!"
        onDismiss={() => setShowSuccess(false)}
      />
    </SafeAreaView>
  );
}