import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, formatPrice } from '../theme';
import type { Book } from '../types';

type Props = { book: Book; onPress?: () => void };

/** Book Card dạng lưới: ảnh bìa (aspectRatio 3/4) + badge absolute góc trên-trái + tên + tác giả + giá */
export default function BookCard({ book, onPress }: Props) {
  const badgeColor = book.badge?.startsWith('-') ? colors.red : colors.orange;

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.coverWrap}>
        {book.image ? (
          <Image source={{ uri: book.image }} style={styles.cover} resizeMode="cover" />
        ) : (
          <View style={[styles.cover, styles.placeholder]}>
            <Ionicons name="book-outline" size={40} color={colors.indigo} />
          </View>
        )}
        {book.badge ? (
          <View style={[styles.badge, { backgroundColor: badgeColor }]}>
            <Text style={styles.badgeText}>{book.badge}</Text>
          </View>
        ) : null}
      </View>
      <Text style={styles.title} numberOfLines={2}>
        {book.title}
      </Text>
      <Text style={styles.author} numberOfLines={1}>
        {book.author}
      </Text>
      <Text style={styles.price}>{formatPrice(book.price)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { width: '48%', marginBottom: 16 },
  coverWrap: { position: 'relative', borderRadius: 10, overflow: 'hidden', backgroundColor: colors.indigoSoft },
  cover: { width: '100%', aspectRatio: 3 / 4 },
  placeholder: { alignItems: 'center', justifyContent: 'center' },
  badge: { position: 'absolute', top: 6, left: 6, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4 },
  badgeText: { color: colors.white, fontSize: 12, fontWeight: '700' },
  title: { marginTop: 8, fontSize: 14, fontWeight: '600', color: colors.text, lineHeight: 19, minHeight: 38 },
  author: { marginTop: 2, fontSize: 12, color: colors.muted },
  price: { marginTop: 4, fontSize: 15, fontWeight: '700', color: colors.indigo },
});
