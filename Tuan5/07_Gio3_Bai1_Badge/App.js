import React from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.card}>
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: 'https://picsum.photos/seed/badgebook/360/480' }}
            style={styles.cover}
          />

          <View style={styles.badge}>
            <Text style={styles.badgeText}>-20%</Text>
          </View>
        </View>

        <Text style={styles.title}>Sách mới đang giảm giá</Text>
        <Text style={styles.price}>120.000 đ</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5F6FA',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '72%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
  },
  imageWrapper: {
    position: 'relative',
  },
  cover: {
    width: '100%',
    aspectRatio: 3 / 4,
    borderRadius: 10,
  },
  badge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: '#E53935',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  badgeText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  title: {
    marginTop: 10,
    fontSize: 17,
    fontWeight: '700',
    color: '#1E2A5A',
  },
  price: {
    marginTop: 6,
    fontSize: 17,
    fontWeight: '700',
    color: '#D84A4A',
  },
});
