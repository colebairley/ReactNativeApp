import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StockListItem({ stock }) {
  const changeColor = stock.change >= 0 ? '#34C759' : '#FF3B30';

  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <Text style={styles.symbol}>{stock.symbol}</Text>
        <Text style={styles.name}>{stock.name}</Text>
      </View>

      <View style={styles.rightContent}>
        <Text style={styles.price}>${stock.price.toFixed(2)}</Text>
        <Text style={[styles.change, { color: changeColor }]}>
          {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginVertical: 4,
    marginHorizontal: 8,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContent: {
    flex: 1,
  },
  symbol: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  name: {
    fontSize: 12,
    color: '#999',
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  change: {
    fontSize: 13,
    fontWeight: '600',
  },
});