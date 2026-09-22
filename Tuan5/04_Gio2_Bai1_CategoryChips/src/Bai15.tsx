import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

interface Product {
  id: number;
  name: string;
}

export default function Bai15() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadProducts = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setProducts([
      { id: 1, name: "iPhone 15" },
      { id: 2, name: "Samsung S24" },
      { id: 3, name: "Xiaomi 14" },
    ]);
  };

  // Load dữ liệu lần đầu
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      await loadProducts();

      setLoading(false);
    };

    fetchData();
  }, []);

  // Kéo xuống để refresh
  const onRefresh = async () => {
    setRefreshing(true);

    await loadProducts();

    setRefreshing(false);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bài 15 - Pull to Refresh</Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        refreshing={refreshing}
        onRefresh={onRefresh}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  item: {
    padding: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 8,
  },
});