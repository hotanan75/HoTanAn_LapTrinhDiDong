import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
} from 'react-native';

const categories = ['Văn học', 'Kinh tế', 'Thiếu nhi', 'Kỹ năng', 'Truyện tranh'];

const books = [
  { id: 1, title: 'Nhà giả kim', price: '89.000 đ', sale: '-15%', seed: 'h1' },
  { id: 2, title: 'Đắc nhân tâm', price: '86.000 đ', sale: '-10%', seed: 'h2' },
  { id: 3, title: 'Atomic Habits', price: '135.000 đ', sale: '-20%', seed: 'h3' },
  { id: 4, title: 'Cây cam ngọt của tôi', price: '99.000 đ', sale: '-12%', seed: 'h4' },
  { id: 5, title: 'Deep Work', price: '129.000 đ', sale: '-18%', seed: 'h5' },
  { id: 6, title: 'Sapiens', price: '145.000 đ', sale: '-25%', seed: 'h6' },
];

export default function App() {
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="#1E2A5A" />

      <View style={styles.header}>
        <Text style={styles.logo}>BookStore</Text>
        <View style={styles.headerIcons}>
          <Text style={styles.icon}>🔍</Text>
          <Text style={styles.icon}>🛒</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.sectionTitle}>Danh mục</Text>

        <View style={styles.chips}>
          {categories.map((category) => (
            <View key={category} style={styles.chip}>
              <Text style={styles.chipText}>{category}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Sách nổi bật</Text>

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

              <Text style={styles.bookTitle} numberOfLines={2}>{book.title}</Text>
              <Text style={styles.price}>{book.price}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.floatingCart}>
        <Text style={styles.cartIcon}>🛒</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>2</Text>
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
  header: {
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: '#1E2A5A',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 16,
  },
  icon: { fontSize: 22 },
  scroll: { flex: 1 },
  scrollContent: {
    padding: 16,
    paddingBottom: 120,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E2A5A',
    marginBottom: 12,
    marginTop: 4,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#4B5CC4',
    backgroundColor: '#FFFFFF',
  },
  chipText: {
    color: '#3340A0',
    fontWeight: '600',
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
  imageWrapper: { position: 'relative' },
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
    fontSize: 12,
    fontWeight: '700',
  },
  bookTitle: {
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
    right: 20,
    bottom: 24,
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
  countText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },
});
