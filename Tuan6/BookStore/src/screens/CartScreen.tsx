import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList, TabParamList } from '../navigation/types';
import Screen from '../components/Screen';
import Header from '../components/Header';
import { EmptyView } from '../components/StateViews';
import { useCart } from '../hooks/useCart';
import { colors, formatPrice } from '../theme';

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Cart'>,
  NativeStackScreenProps<RootStackParamList>
>;

export default function CartScreen({ navigation }: Props) {
  // Đọc từ store, không còn mock cứng
  const { items, totalQuantity, totalPrice } = useCart();

  return (
    <Screen header={<Header title="Giỏ hàng" />}>
      {items.length === 0 ? (
        <EmptyView
          icon="cart-outline"
          title="Giỏ hàng đang trống"
          subtitle="Chọn vài cuốn sách yêu thích để bắt đầu."
          actionLabel="Đi mua sắm"
          onAction={() => navigation.navigate('Home')}
        />
      ) : (
        <>
          {/* Vùng giữa cuộn được */}
          <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {items.map(({ bookId, quantity, book }) => (
              <View key={bookId} style={styles.row}>
                {book.image ? (
                  <Image source={{ uri: book.image }} style={styles.thumb} />
                ) : (
                  <View style={[styles.thumb, styles.thumbPlaceholder]}>
                    <Ionicons name="book-outline" size={22} color={colors.indigo} />
                  </View>
                )}
                <View style={styles.info}>
                  <Text style={styles.name} numberOfLines={2}>
                    {book.title}
                  </Text>
                  <Text style={styles.author} numberOfLines={1}>
                    {book.author}
                  </Text>
                </View>
                <View style={styles.qtyPrice}>
                  <Text style={styles.qty}>x{quantity}</Text>
                  <Text style={styles.linePrice}>{formatPrice(book.price * quantity)}</Text>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Thanh tổng tiền cố định, nằm ngay trên Tab Bar */}
          <View style={styles.summary}>
            <View>
              <Text style={styles.summaryLabel}>Tổng cộng ({totalQuantity} sản phẩm)</Text>
              <Text style={styles.total}>{formatPrice(totalPrice)}</Text>
            </View>
            <Pressable style={styles.checkoutBtn} onPress={() => navigation.navigate('Checkout', { total: totalPrice })}>
              <Text style={styles.checkoutText}>Thanh toán</Text>
            </Pressable>
          </View>
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  scrollContent: { padding: 16, gap: 10 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 10,
    borderRadius: 12,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  thumb: { width: 56, height: 76, borderRadius: 6, backgroundColor: colors.indigoSoft },
  thumbPlaceholder: { alignItems: 'center', justifyContent: 'center' },
  info: { flex: 1 },
  name: { fontSize: 14, fontWeight: '600', color: colors.text },
  author: { marginTop: 2, fontSize: 12, color: colors.muted },
  qtyPrice: { width: 88, alignItems: 'flex-end', gap: 4 },
  qty: { fontSize: 13, color: colors.muted },
  linePrice: { fontSize: 14, fontWeight: '700', color: colors.indigo },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  summaryLabel: { fontSize: 12, color: colors.muted },
  total: { fontSize: 20, fontWeight: '800', color: colors.text },
  checkoutBtn: { backgroundColor: colors.indigo, paddingHorizontal: 24, paddingVertical: 13, borderRadius: 999 },
  checkoutText: { color: colors.white, fontSize: 15, fontWeight: '700' },
});
