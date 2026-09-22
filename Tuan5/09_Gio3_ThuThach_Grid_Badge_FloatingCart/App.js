import React from 'react';
import { SafeAreaView, ScrollView, View, Text, Image, StyleSheet } from 'react-native';

const books = [
  { id: 1, title: 'Nhà giả kim', price: '89.000 đ', sale: '-15%', seed: 'c1' },
  { id: 2, title: 'Dám bị ghét', price: '112.000 đ', sale: '-20%', seed: 'c2' },
  { id: 3, title: 'Atomic Habits', price: '135.000 đ', sale: '-10%', seed: 'c3' },
  { id: 4, title: 'Tâm lý học về tiền', price: '119.000 đ', sale: '-25%', seed: 'c4' },
  { id: 5, title: 'Sapiens', price: '145.000 đ', sale: '-12%', seed: 'c5' },
  { id: 6, title: 'Deep Work', price: '129.000 đ', sale: '-18%', seed: 'c6' },
];

export default function App() {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.heading}>Sách đang ưu đãi</Text>

        <View style={styles.grid}>
          {books.map((book) => (
            <View key={book.id} style={styles.card}>
              <View style={styles.imageWrapper}>
                <Image
                  source={{ uri: `https://picsum.photos/seed/${book.seed}/300/400` }}
                  style={styles.cover}
                />
                <View style={styles.saleBadge}>
                  <Text style={styles.saleText}>{book.sale}</Text>
                </View>
              </View>

              <Text style={styles.title} numberOfLines={2}>{book.title}</Text>
              <Text style={styles.price}>{book.price}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.floatingCart}>
        <Text style={styles.cartIcon}>🛒</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>3</Text>
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
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1E2A5A',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 10,
    marginBottom: 16,
  },
  imageWrapper: {
    position: 'relative',
  },
  cover: {
    width: '100%',
    aspectRatio: 3 / 4,
    borderRadius: 8,
  },
  saleBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: '#E53935',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },
  saleText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },
  title: {
    marginTop: 8,
    minHeight: 40,
    fontSize: 15,
    fontWeight: '700',
    color: '#222222',
  },
  price: {
    marginTop: 4,
    color: '#D84A4A',
    fontWeight: '700',
    fontSize: 15,
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
  cartIcon: { fontSize: 28 },
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
  countText: { color: '#FFFFFF', fontWeight: '700', fontSize: 12 },
});
