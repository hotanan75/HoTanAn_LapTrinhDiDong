import React from 'react';
import { SafeAreaView, ScrollView, View, Text, Image, StyleSheet } from 'react-native';

const books = [
  { id: 1, title: 'Sapiens', price: '145K', seed: 't1' },
  { id: 2, title: 'Ikigai', price: '95K', seed: 't2' },
  { id: 3, title: 'Deep Work', price: '129K', seed: 't3' },
  { id: 4, title: '1984', price: '88K', seed: 't4' },
  { id: 5, title: 'Dám bị ghét', price: '112K', seed: 't5' },
  { id: 6, title: 'The Alchemist', price: '99K', seed: 't6' },
  { id: 7, title: 'Zero to One', price: '120K', seed: 't7' },
  { id: 8, title: 'Start With Why', price: '130K', seed: 't8' },
  { id: 9, title: 'Essentialism', price: '118K', seed: 't9' },
];

export default function App() {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.page}>
        <Text style={styles.heading}>Lưới 3 cột dùng gap</Text>

        <View style={styles.grid}>
          {books.map((book) => (
            <View key={book.id} style={styles.card}>
              <Image
                source={{ uri: `https://picsum.photos/seed/${book.seed}/240/320` }}
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
  screen: { flex: 1, backgroundColor: '#F6F7FB' },
  page: { padding: 12 },
  heading: {
    fontSize: 21,
    fontWeight: '700',
    color: '#1E2A5A',
    marginBottom: 14,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  card: {
    width: '31.8%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 8,
  },
  cover: {
    width: '100%',
    aspectRatio: 3 / 4,
    borderRadius: 7,
    marginBottom: 8,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    color: '#222222',
    minHeight: 34,
  },
  price: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: '700',
    color: '#D84A4A',
  },
});
