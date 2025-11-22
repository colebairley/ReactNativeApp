export const calculatePinnedSummary = (stocks, pinnedIds) => {
  // Filter to only pinned stocks
  const pinnedStocks = stocks.filter((stock) => pinnedIds.includes(stock.id));

  // Calculate total change percentage
  // Average of all pinned stocks' changes
  if (pinnedStocks.length === 0) {
    return {
      totalChange: 0,
      count: 0,
      averagePrice: 0,
    };
  }

  const totalChange = pinnedStocks.reduce((sum, stock) => sum + stock.change, 0);
  const averageChange = totalChange / pinnedStocks.length;
  const totalValue = pinnedStocks.reduce((sum, stock) => sum + stock.price, 0);

  return {
    totalChange: averageChange,
    count: pinnedStocks.length,
    totalValue,
  };
};

export const sortStocks = (stocks, pinnedIds) => {
  // Separate into pinned and unpinned
  const pinned = stocks.filter((stock) => pinnedIds.includes(stock.id));
  const unpinned = stocks.filter((stock) => !pinnedIds.includes(stock.id));

  // Return pinned first, then unpinned
  return [...pinned, ...unpinned];
};