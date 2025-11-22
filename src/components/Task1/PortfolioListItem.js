import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function PortfolioListItem({ stock, isPinned, onPin }) {
  const changeColor = stock.change >= 0 ? '#34C759' : '#FF3B30';

  return (
    <TouchableOpacity activeOpacity={0.7} onLongPress={onPin}>
      <View
        style={[
          styles.container,
          isPinned && styles.containerPinned,
        ]}
      >
        {/* Left side: Symbol and Name */}
        <View style={styles.infoContainer}>
          <Text style={styles.symbol}>{stock.symbol}</Text>
          <Text style={styles.name}>{stock.name}</Text>
        </View>

        {/* Right side: Price and Change */}
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${stock.price.toFixed(2)}</Text>
          <Text style={[styles.change, { color: changeColor }]}>
            {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
          </Text>
        </View>

        {/* Pin indicator */}
        {isPinned && <View style={styles.pinIndicator} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 4,
    marginHorizontal: 8,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: 'transparent',
  },
  containerPinned: {
    backgroundColor: '#F0F7FF',  // light blue tint
    borderLeftColor: '#007AFF',   // blue left border
  },
  infoContainer: {
    flex: 1,
  },
  symbol: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  name: {
    fontSize: 13,
    color: '#666',
  },
  priceContainer: {
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
  pinIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#007AFF',
    marginLeft: 12,
  },
});