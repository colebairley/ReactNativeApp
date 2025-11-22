# Task 10: Offline-First Feed (Networking + Caching)

## Explanation of Caching Logic

Using a network-aware feed that uses @react-native-community/netinfo to detect online/offline status and dynamically switches between live API data and cached posts. When online, posts are fetched from the API and automatically saved to AsyncStorage; when offline, the app loads from cache and displays an "offline" badge. This ensures users always have content available, gracefully degrading from fresh data to cached data depending on connection state.