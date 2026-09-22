import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";

interface ApiResponse<T> {
  data: T[];
  total: number;
  page: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

export default function Bai14() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);

  const loadProducts = async () => {
    const response: ApiResponse<Product> = {
      data: [
        { id: 1, name: "iPhone 15", price: 20000000 },
        { id: 2, name: "Samsung S24", price: 18000000 },
        { id: 3, name: "Xiaomi 14", price: 12000000 },
      ],
      total: 9,
      page: page,
    };

    setProducts(response.data);
  };

  useEffect(() => {
    loadProducts();
  }, [page]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bài 14 - Pagination</Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
            <Text>{item.price.toLocaleString()} VNĐ</Text>
          </View>
        )}
      />

      <Text>Trang: {page}</Text>

      <View style={styles.buttons}>
        <Button
          title="Trang trước"
          disabled={page === 1}
          onPress={() => setPage(page - 1)}
        />

        <Button
          title="Trang sau"
          onPress={() => setPage(page + 1)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  item: {
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});