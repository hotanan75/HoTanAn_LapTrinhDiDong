import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from 'react-native';

interface Product {
  id: number;
  title: string;
  price: number;
}

interface ProductResponse {
  products: Product[];
}

export default function Bai11() {
  const [keyword, setKeyword] = useState('');
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async (
    keyword: string,
    limit: number
  ): Promise<void> => {
    const response = await fetch(
      `https://dummyjson.com/products/search?q=${keyword}&limit=${limit}`
    );

    const data = (await response.json()) as ProductResponse;
    setProducts(data.products);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bài 11 - Product Search</Text>

      <TextInput
        style={styles.input}
        placeholder="Nhập tên sản phẩm"
        value={keyword}
        onChangeText={setKeyword}
      />

      <Button
        title="Tìm kiếm"
        onPress={() => fetchProducts(keyword, 10)}
      />

      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.title}</Text>
            <Text>{item.price}$</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    marginBottom: 10,
  },
  item: {
    padding: 15,
    marginTop: 10,
    backgroundColor: '#eee',
  },
});