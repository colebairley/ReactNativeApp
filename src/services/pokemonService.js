// Fetch Pokemon data from public API
// Includes random failure simulation

const POKEMON_API = 'https://pokeapi.co/api/v2/pokemon';

// Simulating network delay to show skeleton feature
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchPokemonList = async () => {
  /* Explanation of how failure simulation works:
     We use Math.random() to generate a number between 0 and 1.
     If this number is less than 0.1 (10% chance), we throw an error
     to simulate a network failure or API timeout.
  */
  const shouldFail = Math.random() < 0.1;
  
  if (shouldFail) {
    throw new Error('Failed to fetch Pokemon. Network error or API timeout.');
  }

  try {
    const response = await fetch(`${POKEMON_API}?limit=20&offset=0`);
    
    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();

    await delay(2000);
    // Transform API data into simpler format
    const pokemon = data.results.map((poke, index) => ({
      id: index + 1,
      name: poke.name.charAt(0).toUpperCase() + poke.name.slice(1),
      url: poke.url,
      imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/pokemon/other/official-artwork/${index + 1}.png`,
    }));

    return pokemon;
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch Pokemon');
  }
};