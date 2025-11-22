const POKEMON_API = 'https://pokeapi.co/api/v2/pokemon';

// Helper to simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchPokemonList = async () => {
  // Simulate 10% chance of failure
  const shouldFail = Math.random() < 0.3;
  
  if (shouldFail) {
    throw new Error('Failed to fetch Pokemon. Network error or API timeout.');
  }

  try {
    const response = await fetch(`${POKEMON_API}?limit=20&offset=0`);
    
    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();

    // Simulate 2 second network delay so you can see skeleton
    await delay(2000);

    // Transform API data into simpler format
    const pokemon = data.results.map((poke) => {
      // Extract ID from URL: https://pokeapi.co/api/v2/pokemon/1/ → 1
      const urlParts = poke.url.split('/').filter(Boolean);
      const id = urlParts[urlParts.length - 1];
      
      return {
        id: parseInt(id),
        name: poke.name.charAt(0).toUpperCase() + poke.name.slice(1),
        url: poke.url,
        // Use reliable CDN for images
        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png` ,
      };
    });

    console.log('Pokemon loaded:',  pokemon[0].imageUrl, pokemon[0].url);
    return pokemon;
  } catch (error) {
    console.error('Pokemon API error:', error);
    throw new Error(error.message || 'Failed to fetch Pokemon');
  }
};