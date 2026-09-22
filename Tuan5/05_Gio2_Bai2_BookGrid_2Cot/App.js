import React from 'react';
import { SafeAreaView, ScrollView, View, Text, Image, StyleSheet } from 'react-native';

const books = [
  { id: 1, title: 'Nhà giả kim', price: '89.000 đ', seed: 'g1' },
  { id: 2, title: 'Đắc nhân tâm', price: '86.000 đ', seed: 'g2' },
  { id: 3, title: 'Atomic Habits', price: '135.000 đ', seed: 'g3' },
  { id: 4, title: 'Cây cam ngọt của tôi', price: '99.000 đ', seed: 'g4' },
  { id: 5, title: 'Tâm lý học về tiền', price: '119.000 đ', seed: 'g5' },
  { id: 6, title: 'Deep Work', price: '129.000 đ', seed: 'g6' },
];

export default function App() {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.page} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Sách nổi bật</Text>

        <View style={styles.grid}>
          {books.map((book) => (
            <View key={book.id} style={styles.item}>
              <Image
                source={{ uri: `https://picsum.photos/seed/${book.seed}/300/400` }}
                style={styles.cover}
              />
              <Text style={styles.title} numberOfLines={2}>{book.title}</Text>
              <Text style={styles.price}>{book.price}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F5F6FA' },
  page: { padding: 16 },
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
  item: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 10,
    marginBottom: 16,
  },
  cover: {
    width: '100%',
    aspectRatio: 3 / 4,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    minHeight: 42,
    fontSize: 16,
    fontWeight: '700',
    color: '#222222',
  },
  price: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: '700',
    color: '#D84A4A',
  },
});
