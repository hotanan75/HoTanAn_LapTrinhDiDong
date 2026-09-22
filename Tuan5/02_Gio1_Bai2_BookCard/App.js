import React from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Image
          source={{ uri: 'https://picsum.photos/seed/bookcard/240/330' }}
          style={styles.cover}
        />

        <View style={styles.info}>
          <View>
            <Text style={styles.title} numberOfLines={2}>
              Nhà giả kim - Hành trình đi tìm kho báu của chính mình
            </Text>
            <Text style={styles.author}>Paulo Coelho</Text>
          </View>

          <Text style={styles.price}>89.000 đ</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FA',
    padding: 16,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  cover: {
    width: 80,
    height: 110,
    borderRadius: 8,
    marginRight: 14,
  },
  info: {
    flex: 1,
    minHeight: 110,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E2A5A',
  },
  author: {
    marginTop: 8,
    fontSize: 14,
    color: '#666666',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#D84A4A',
  },
});
