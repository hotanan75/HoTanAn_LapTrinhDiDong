import React from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <View key={item} style={styles.block}>
            <Text style={styles.blockText}>Nội dung {item}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.floatingCart}>
        <Text style={styles.cartIcon}>🛒</Text>

        <View style={styles.countBadge}>
          <Text style={styles.countText}>4</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#F5F6FA',
  },
  content: {
    padding: 16,
    paddingBottom: 120,
  },
  block: {
    height: 110,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    marginBottom: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blockText: {
    fontSize: 17,
    color: '#444444',
  },
  floatingCart: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#3147C7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartIcon: {
    fontSize: 28,
  },
  countBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E53935',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  countText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});
