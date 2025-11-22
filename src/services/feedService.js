import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_KEY = 'cachedPosts';
const CACHE_TIMESTAMP_KEY = 'cacheTimestamp';

// Finance-themed mock posts
const MOCK_POSTS = [
  {
    id: '1',
    author: 'Sarah Chen',
    title: 'Fed Rate Hike Impact: What It Means for Your Portfolio',
    content: 'The Federal Reserve just announced another 0.25% rate hike. Here\'s how it affects stocks, bonds, and your savings account. Digital assets showing mixed signals.',
    timestamp: new Date(Date.now() - 2 * 60000).toISOString(),
    likes: 342,
    comments: [
      { id: 'c1', author: 'John Doe', text: 'Already moved 30% to bonds' },
      { id: 'c2', author: 'Emma Wilson', text: 'What about dividend stocks?' },
    ],
    liked: false,
  },
  {
    id: '2',
    author: 'Michael Rodriguez',
    title: 'Q4 Earnings Season: Which Tech Stocks Are Beating Estimates?',
    content: 'NVDA, MSFT, and GOOGL all crushed expectations this week. Looking at the biggest gainers and what it means for the broader market rally.',
    timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
    likes: 218,
    comments: [
      { id: 'c3', author: 'Lisa Park', text: 'AI boom is real' },
    ],
    liked: false,
  },
  {
    id: '3',
    author: 'Alex Thompson',
    title: 'Bitcoin Breaks $100k - Is This the Bull Run We\'ve Been Waiting For?',
    content: 'After months of consolidation, Bitcoin finally breaks through key resistance at $45k. Altcoins following suit. Is this sustainable or just a dead cat bounce?',
    timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
    likes: 567,
    comments: [
      { id: 'c4', author: 'David Kim', text: 'Bearish divergence on 4h though' },
      { id: 'c5', author: 'Rachel Stone', text: 'Long term bullish' },
      { id: 'c6', author: 'Chris Evans', text: 'Too volatile still' },
    ],
    liked: false,
  },
  {
    id: '4',
    author: 'Jessica Lee',
    title: 'High-Yield Dividend Stocks: 5% Yields Are Back',
    content: 'Tired of 0.5% savings rates? Check out these dividend aristocrats offering 5%+ yields. Updated list with current valuations.',
    timestamp: new Date(Date.now() - 90 * 60000).toISOString(),
    likes: 421,
    comments: [],
    liked: false,
  },
  {
    id: '5',
    author: 'Mark Johnson',
    title: 'Day Trading vs. Swing Trading: Which Strategy Makes More Money?',
    content: 'Analyzed 10 years of trading data. Swing trading beats day trading 8 out of 10 times. The psychology behind why day traders fail.',
    timestamp: new Date(Date.now() - 120 * 60000).toISOString(),
    likes: 892,
    comments: [
      { id: 'c7', author: 'Sophie Turner', text: 'My emotions cost me $5k last month' },
    ],
    liked: false,
  },
  {
    id: '6',
    author: 'Robert Chang',
    title: 'S&P 500 Hits New All-Time High - What\'s Driving the Rally?',
    content: 'Despite recession fears, the market keeps climbing. Mega-cap tech stocks and rate cut expectations are fueling the bull run.',
    timestamp: new Date(Date.now() - 150 * 60000).toISOString(),
    likes: 634,
    comments: [
      { id: 'c8', author: 'Nina Patel', text: 'Valuations getting scary though' },
    ],
    liked: false,
  },
];

// Simulate fetching posts from a remote API
export const fetchPostsFromAPI = async () => {
  console.log('Fetching from API...');
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Simulate 20% failure rate
  if (Math.random() < 0.2) {
    throw new Error('Failed to fetch posts from server');
  }

  console.log('API returned posts');
  return MOCK_POSTS;
};

// Cache posts to AsyncStorage
export const cachePosts = async (posts) => {
  try {
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(posts));
    await AsyncStorage.setItem(CACHE_TIMESTAMP_KEY, new Date().toISOString());
    console.log('Posts cached successfully');
  } catch (error) {
    console.error('Error caching posts:', error);
    throw error;
  }
};

// Retrieve cached posts from AsyncStorage
export const getCachedPosts = async () => {
  try {
    const cachedData = await AsyncStorage.getItem(CACHE_KEY);
    const timestamp = await AsyncStorage.getItem(CACHE_TIMESTAMP_KEY);

    if (!cachedData) {
      console.log('No cached posts found');
      return null;
    }

    console.log('Loaded posts from cache');
    return {
      posts: JSON.parse(cachedData),
      timestamp,
    };
  } catch (error) {
    console.error('Error reading cache:', error);
    return null;
  }
};

// Clear cache (for testing purposes)
export const clearPostsCache = async () => {
  try {
    await AsyncStorage.removeItem(CACHE_KEY);
    await AsyncStorage.removeItem(CACHE_TIMESTAMP_KEY);
    console.log('Cache cleared');
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
};

// Load posts with offline-first strategy
export const loadPosts = async (isOnline) => {
  try {
    if (isOnline) {
      console.log('Online: Fetching from API');
      const posts = await fetchPostsFromAPI();
      await cachePosts(posts);
      return { posts, source: 'api', cached: false };
    } else {
      console.log('Offline: Loading from cache');
      const cached = await getCachedPosts();
      if (cached) {
        return { posts: cached.posts, source: 'cache', cached: true };
      } else {
        throw new Error('No cached data available');
      }
    }
  } catch (error) {
    console.error('Error loading posts:', error);

    // Fallback: try cache if API fails
    if (isOnline) {
      console.log('API failed, attempting to load from cache...');
      const cached = await getCachedPosts();
      if (cached) {
        return { posts: cached.posts, source: 'cache', cached: true };
      }
    }

    throw error;
  }
};