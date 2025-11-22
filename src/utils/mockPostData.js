export const MOCK_POSTS = [
  {
    id: '1',
    title: 'Getting Started with React Native',
    author: 'Sarah Chen',
    timestamp: '2025-01-15T10:30:00Z',
    content: `React Native allows you to build mobile apps using JavaScript and React. 
    
This comprehensive guide covers the basics of setting up your environment, understanding components, and managing state effectively. You'll learn how to structure your app, handle navigation, and optimize performance.

Key topics include:
- Component lifecycle
- State management with hooks
- Navigation patterns
- Performance optimization`,
    liked: false,
    likes: 124,
    comments: [
      { id: '1', author: 'Mike Johnson', text: 'Great explanation of hooks!' },
      { id: '2', author: 'Emily Davis', text: 'This helped me understand navigation better' },
    ],
  },
  {
    id: '2',
    title: 'Best Practices for Mobile UI Design',
    author: 'Alex Rodriguez',
    timestamp: '2025-01-14T15:45:00Z',
    content: `Mobile UI design is fundamentally different from web design. Screen sizes vary, touch interactions are different, and users have different expectations.

In this post, we cover:
- Responsive design patterns
- Touch-friendly components
- Accessibility considerations
- Platform-specific guidelines (iOS vs Android)`,
    liked: false,
    likes: 89,
    comments: [
      { id: '1', author: 'Lisa Wong', text: 'The accessibility section was eye-opening' },
    ],
  },
  {
    id: '3',
    title: 'Debugging React Native Apps',
    author: 'James Wilson',
    timestamp: '2025-01-13T09:15:00Z',
    content: `Debugging is crucial for development productivity. This guide walks through the best tools and techniques for debugging React Native applications.

Learn about:
- React DevTools
- React Native Debugger
- Console logging strategies
- Performance profiling
- Common pitfalls and how to avoid them`,
    liked: false,
    likes: 156,
    comments: [
      { id: '1', author: 'Tom Brown', text: 'The profiling tips saved me hours!' },
      { id: '2', author: 'Nina Patel', text: 'DevTools setup was confusing before this' },
    ],
  },
  {
    id: '4',
    title: 'State Management: Context vs Redux vs Zustand',
    author: 'David Lee',
    timestamp: '2025-01-12T14:20:00Z',
    content: `Choosing the right state management solution is critical for app scalability. Each approach has tradeoffs.

This post compares:
- React Context (simple, built-in)
- Redux (powerful, verbose)
- Zustand (lightweight alternative)
- When to use each approach`,
    liked: false,
    likes: 203,
    comments: [
      { id: '1', author: 'Rachel Green', text: 'Finally understand when to use Context vs Redux' },
    ],
  },
];