import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';

const books = [
  { id: 1, title: 'Đắc nhân tâm', author: 'Dale Carnegie', price: '86.000 đ', seed: 'b1' },
  { id: 2, title: 'Tuổi trẻ đáng giá bao nhiêu', author: 'Rosie Nguyễn', price: '79.000 đ', seed: 'b2' },
  { id: 3, title: 'Cây cam ngọt của tôi', author: 'José Mauro', price: '99.000 đ', seed: 'b3' },
  { id: 4, title: 'Không gia đình', author: 'Hector Malot', price: '105.000 đ', seed: 'b4' },
  { id: 5, title: 'Tư duy nhanh và chậm', author: 'Daniel Kahneman', price: '149.000 đ', seed: 'b5' },
];

export default function App() {
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="#1E2A5A" />

      <View style={styles.header}>
        <Text style={styles.logo}>BookStore</Text>
        <View style={styles.iconGroup}>
          <Text style={styles.icon}>🔍</Text>
          <Text style={styles.icon}>🛒</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {books.map((book) => (
          <View key={book.id} style={styles.card}>
            <Image
              source={{ uri: `https://picsum.photos/seed/${book.seed}/240/330` }}
              style={styles.cover}
            />
            <View style={styles.info}>
              <View>
                <Text style={styles.title} numberOfLines={2}>{book.title}</Text>
                <Text style={styles.author}>{book.author}</Text>
              </View>
              <Text style={styles.price}>{book.price}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F5F6FA' },
  header: {
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: '#1E2A5A',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: { color: '#FFFFFF', fontSize: 22, fontWeight: '700' },
  iconGroup: { flexDirection: 'row', gap: 16 },
  icon: { fontSize: 22 },
  content: { flex: 1, padding: 16 },
  card: {
    minHeight: 130,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  cover: { width: 80, height: 110, borderRadius: 8, marginRight: 14 },
  info: {
    flex: 1,
    minHeight: 110,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: { fontSize: 17, fontWeight: '700', color: '#1E2A5A' },
  author: { marginTop: 6, fontSize: 14, color: '#666666' },
  price: { fontSize: 17, fontWeight: '700', color: '#D84A4A' },
});
