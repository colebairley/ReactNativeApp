export const calculateStats = (data) => {
  const prices = data.map(item => item.price);
  
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const avgPrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;
  
  const firstPrice = prices[0];
  const lastPrice = prices[prices.length - 1];
  const change = lastPrice - firstPrice;
  const changePercent = ((change / firstPrice) * 100).toFixed(2);

  return {
    minPrice: minPrice.toFixed(2),
    maxPrice: maxPrice.toFixed(2),
    avgPrice: avgPrice.toFixed(2),
    currentPrice: lastPrice.toFixed(2),
    change: change.toFixed(2),
    changePercent,
    avgPriceValue: avgPrice, // ← ADD THIS
  };
};

// Format chart data for library
export const formatChartData = (rawData, avgPrice) => {
  const prices = rawData.map(item => item.price);
  
  return {
    labels: rawData.map(item => {
      const date = new Date(item.date);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    }),
    datasets: [
      {
        data: prices,
        strokeWidth: 3,
        color: () => '#007AFF',
        withDots: true,
      },
      {
        data: Array(prices.length).fill(avgPrice), // ← Average price line
        strokeWidth: 2,
        color: () => '#34C759',
        withDots: false,
        strokeDasharray: [5, 5], // Dashed line
      },
    ],
  };
};