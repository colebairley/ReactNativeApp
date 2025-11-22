# Task 2: Multi-Screen Navigation Flow (React Navigation + Data Passing)

## Navigation Approach

Feed and Detail are separate screens in a stack navigator. Feed passes `postId` via navigation params to Detail:
```javascript
navigation.navigate('Detail', { postId: '1' });
```

Detail receives it and fetches the post:
```javascript
const { postId } = route.params;
const post = MOCK_POSTS.find(p => p.id === postId);
```

User taps back → returns to Feed.

## State Persistence Approach 

Like state persists using custom callback module (`likeTracker`) instead of Redux/Context:

1. Detail Screen likes a post → calls `setLikedPost(postId)`
2. User navigates back to Feed
3. Feed's `useFocusEffect` runs and calls `getLikedPost()`
4. Feed updates its local posts state with the liked post ID
5. Module clears itself to prevent duplicate updates
