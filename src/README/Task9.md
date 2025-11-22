# Task 9: Context-Based Theme and User Settings (State Management)

## Explanation of Context Structure

The ThemeContext provides theme colors, font sizes, and settings functions (toggleTheme(), updateFontSize()) that automatically propagate to all screens in the component tree. When users adjust settings in the Settings screen, all screens instantly reflect the changes because they subscribe to the context via the useTheme() hook, with all changes persisted to AsyncStorage so settings survive app restarts.