import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { RootStackParamList } from '../navigation/types';
import Screen from '../components/Screen';
import Header from '../components/Header';
import { EmptyView, LoadingView } from '../components/StateViews';
import { useCart } from '../hooks/useCart';
import { getBookById } from '../services/api';
import { colors, formatPrice } from '../theme';
import type { Book } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'BookDetail'>;

export default function BookDetailScreen({ navigation, route }: Props) {
  const { bookId } = route.params;
  const insets = useSafeAreaInsets();
  const { addToCart } = useCart();

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setBook(await getBookById(bookId));
    } catch (e) {
      setError('Hãy kiểm tra kết nối mạng rồi thử lại.');
    } finally {
      setLoading(false);
    }
  }, [bookId]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const onAdd = () => {
    if (!book) return;
    addToCart(book, 1);
    setAdded(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1200);
  };

  const goCart = () => navigation.navigate('Tabs', { screen: 'Cart' });

  const renderBody = () => {
    if (loading) return <LoadingView text="Đang tải chi tiết sách..." />;
    if (error || !book) return <EmptyView title="Không tải được sách" subtitle={error ?? 'Không tìm thấy sách.'} />;

    return (
      <>
        {/* Phần nội dung dài cuộn được, thanh đáy nằm ngoài ScrollView */}
        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.coverWrap}>
            {book.image ? (
              <Image source={{ uri: book.image }} style={styles.cover} resizeMode="cover" />
            ) : (
              <View style={[styles.cover, styles.placeholder]}>
                <Ionicons name="book-outline" size={64} color={colors.indigo} />
              </View>
            )}
            {book.badge ? (
              <View style={[styles.badge, { backgroundColor: book.badge.startsWith('-') ? colors.red : colors.orange }]}>
                <Text style={styles.badgeText}>{book.badge}</Text>
              </View>
            ) : null}
          </View>

          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.author}>{book.author}</Text>

          <View style={styles.tagRow}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{book.category}</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Mô tả</Text>
          <Text style={styles.description}>{book.description}</Text>
        </ScrollView>

        <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 12) }]}>
          <View>
            <Text style={styles.priceLabel}>Giá</Text>
            <Text style={styles.price}>{formatPrice(book.price)}</Text>
          </View>
          <Pressable style={[styles.addBtn, added && styles.addBtnDone]} onPress={onAdd}>
            <Ionicons name={added ? 'checkmark' : 'cart-outline'} size={20} color={colors.white} />
            <Text style={styles.addText}>{added ? 'Đã thêm' : 'Thêm vào giỏ'}</Text>
          </Pressable>
        </View>
      </>
    );
  };

  return (
    <Screen header={<Header title="Chi tiết sách" onBack={() => navigation.goBack()} onCartPress={goCart} />}>
      {renderBody()}
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 24 },
  coverWrap: { alignSelf: 'center', width: '60%', position: 'relative', borderRadius: 12, overflow: 'hidden', backgroundColor: colors.indigoSoft },
  cover: { width: '100%', aspectRatio: 3 / 4 },
  placeholder: { alignItems: 'center', justifyContent: 'center' },
  badge: { position: 'absolute', top: 8, left: 8, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 4 },
  badgeText: { color: colors.white, fontSize: 13, fontWeight: '700' },
  title: { marginTop: 20, fontSize: 22, fontWeight: '800', color: colors.text },
  author: { marginTop: 4, fontSize: 15, color: colors.muted },
  tagRow: { flexDirection: 'row', marginTop: 12 },
  tag: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 999, backgroundColor: colors.indigoSoft },
  tagText: { fontSize: 12, color: colors.indigo, fontWeight: '600' },
  sectionTitle: { marginTop: 20, fontSize: 16, fontWeight: '700', color: colors.text },
  description: { marginTop: 6, fontSize: 15, lineHeight: 23, color: colors.text },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  priceLabel: { fontSize: 12, color: colors.muted },
  price: { fontSize: 20, fontWeight: '800', color: colors.indigo },
  addBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: colors.indigo, paddingHorizontal: 22, paddingVertical: 13, borderRadius: 999 },
  addBtnDone: { backgroundColor: colors.cyan },
  addText: { color: colors.white, fontSize: 15, fontWeight: '700' },
});
