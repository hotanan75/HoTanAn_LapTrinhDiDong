import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
} from "react-native";

const cartItems = [
  { id: 1, title: "Nhà giả kim", qty: 1, price: "89.000 đ", seed: "cart1" },
  { id: 2, title: "Atomic Habits", qty: 2, price: "270.000 đ", seed: "cart2" },
  { id: 3, title: "Đắc nhân tâm", qty: 1, price: "86.000 đ", seed: "cart3" },
  { id: 4, title: "Deep Work", qty: 1, price: "129.000 đ", seed: "cart4" },
];

const tabs = [
  { id: 1, icon: "🏠", label: "Trang chủ" },
  { id: 2, icon: "📚", label: "Danh mục" },
  { id: 3, icon: "🛒", label: "Giỏ hàng", active: true },
  { id: 4, icon: "👤", label: "Tài khoản" },
];

export default function App() {
  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.heading}>Giỏ hàng của bạn</Text>

      <ScrollView
        style={styles.list}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        {cartItems.map((item) => (
          <View key={item.id} style={styles.row}>
            <Image
              source={{
                uri: `https://picsum.photos/seed/${item.seed}/180/240`,
              }}
              style={styles.thumbnail}
            />

            <View style={styles.nameArea}>
              <Text style={styles.title} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.qty}>Số lượng: {item.qty}</Text>
            </View>

            <View style={styles.priceArea}>
              <Text style={styles.price}>{item.price}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.summary}>
        <View>
          <Text style={styles.summaryLabel}>Tổng tiền</Text>
          <Text style={styles.total}>574.000 đ</Text>
        </View>

        <View style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>Thanh toán</Text>
        </View>
      </View>

      <View style={styles.tabBar}>
        {tabs.map((tab) => (
          <View key={tab.id} style={styles.tabItem}>
            <Text style={styles.tabIcon}>{tab.icon}</Text>
            <Text style={[styles.tabText, tab.active && styles.activeTab]}>
              {tab.label}
            </Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F5F6FA",
  },
  heading: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 22,
    fontWeight: "700",
    color: "#1E2A5A",
    backgroundColor: "#FFFFFF",
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  row: {
    minHeight: 112,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  thumbnail: {
    width: 64,
    height: 88,
    borderRadius: 7,
  },
  nameArea: {
    flex: 1,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222222",
  },
  qty: {
    marginTop: 8,
    fontSize: 14,
    color: "#666666",
  },
  priceArea: {
    width: 92,
    alignItems: "flex-end",
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
    color: "#D84A4A",
  },
  summary: {
    minHeight: 78,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 13,
    color: "#777777",
  },
  total: {
    marginTop: 3,
    fontSize: 20,
    fontWeight: "700",
    color: "#D84A4A",
  },
  checkoutButton: {
    backgroundColor: "#3147C7",
    paddingHorizontal: 24,
    paddingVertical: 13,
    borderRadius: 10,
  },
  checkoutText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  tabBar: {
    height: 68,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
    flexDirection: "row",
  },
  tabItem: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  tabIcon: {
    fontSize: 21,
  },
  tabText: {
    marginTop: 4,
    fontSize: 12,
    color: "#777777",
  },
  activeTab: {
    color: "#3147C7",
    fontWeight: "700",
  },
});
