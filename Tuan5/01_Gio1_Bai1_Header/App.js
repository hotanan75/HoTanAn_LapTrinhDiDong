import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";

const tabs = [
  { key: "home", icon: "🏠", label: "Trang chủ" },
  { key: "detail", icon: "📖", label: "Chi tiết" },
  { key: "cart", icon: "🛒", label: "Giỏ hàng" },
  { key: "account", icon: "👤", label: "Tài khoản" },
];

function HomeScreen() {
  const books = [
    { id: 1, title: "Nhà giả kim", price: "89.000 đ", seed: "p1" },
    { id: 2, title: "Atomic Habits", price: "135.000 đ", seed: "p2" },
    { id: 3, title: "Deep Work", price: "129.000 đ", seed: "p3" },
    { id: 4, title: "Sapiens", price: "145.000 đ", seed: "p4" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.screenContent}>
      <Text style={styles.pageTitle}>Trang chủ</Text>
      <View style={styles.grid}>
        {books.map((book) => (
          <View key={book.id} style={styles.bookCard}>
            <Image
              source={{
                uri: `https://picsum.photos/seed/${book.seed}/300/400`,
              }}
              style={styles.bookCover}
            />
            <Text style={styles.bookTitle} numberOfLines={2}>
              {book.title}
            </Text>
            <Text style={styles.bookPrice}>{book.price}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

function DetailScreen() {
  return (
    <ScrollView contentContainerStyle={styles.screenContent}>
      <Text style={styles.pageTitle}>Chi tiết sách</Text>
      <Image
        source={{ uri: "https://picsum.photos/seed/partdetail/360/480" }}
        style={styles.detailCover}
      />
      <Text style={styles.detailTitle}>Atomic Habits</Text>
      <Text style={styles.detailAuthor}>James Clear</Text>
      <Text style={styles.bookPrice}>135.000 đ</Text>
      <Text style={styles.description}>
        Nội dung mô tả sách được đặt trong vùng cuộn. Bài nâng cao này chỉ dùng
        state cục bộ để đổi màn hình, không dùng thư viện navigation.
      </Text>
    </ScrollView>
  );
}

function CartScreen() {
  const items = [
    { id: 1, title: "Nhà giả kim", qty: 1, price: "89.000 đ" },
    { id: 2, title: "Atomic Habits", qty: 2, price: "270.000 đ" },
  ];

  return (
    <View style={styles.cartScreen}>
      <ScrollView contentContainerStyle={styles.screenContent}>
        <Text style={styles.pageTitle}>Giỏ hàng</Text>
        {items.map((item) => (
          <View key={item.id} style={styles.cartRow}>
            <View style={styles.cartInfo}>
              <Text style={styles.cartTitle}>{item.title}</Text>
              <Text style={styles.cartQty}>Số lượng: {item.qty}</Text>
            </View>
            <Text style={styles.cartPrice}>{item.price}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.cartSummary}>
        <Text style={styles.summaryText}>Tổng: 359.000 đ</Text>
        <View style={styles.payButton}>
          <Text style={styles.payText}>Thanh toán</Text>
        </View>
      </View>
    </View>
  );
}

function AccountScreen() {
  return (
    <View style={styles.centerScreen}>
      <Text style={styles.pageTitle}>Tài khoản</Text>
      <Text style={styles.accountIcon}>👤</Text>
      <Text style={styles.accountText}>Nguyễn Văn A</Text>
      <Text style={styles.accountText}>student@example.com</Text>
    </View>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("home");

  let content = <HomeScreen />;
  if (activeTab === "detail") content = <DetailScreen />;
  if (activeTab === "cart") content = <CartScreen />;
  if (activeTab === "account") content = <AccountScreen />;

  return (
    <SafeAreaView style={styles.app}>
      <View style={styles.main}>{content}</View>

      <View style={styles.tabBar}>
        {tabs.map((tab) => {
          const active = activeTab === tab.key;

          return (
            <Pressable
              key={tab.key}
              style={styles.tabItem}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text style={styles.tabIcon}>{tab.icon}</Text>
              <Text style={[styles.tabText, active && styles.activeTabText]}>
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "#F5F6FA",
  },
  main: {
    flex: 1,
  },
  screenContent: {
    padding: 16,
    paddingBottom: 24,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1E2A5A",
    marginBottom: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  bookCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 10,
    marginBottom: 16,
  },
  bookCover: {
    width: "100%",
    aspectRatio: 3 / 4,
    borderRadius: 8,
  },
  bookTitle: {
    marginTop: 8,
    minHeight: 40,
    fontSize: 15,
    fontWeight: "700",
    color: "#222222",
  },
  bookPrice: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "700",
    color: "#D84A4A",
  },
  detailCover: {
    alignSelf: "center",
    width: "58%",
    aspectRatio: 3 / 4,
    borderRadius: 12,
    marginBottom: 16,
  },
  detailTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1E2A5A",
  },
  detailAuthor: {
    marginTop: 6,
    fontSize: 15,
    color: "#666666",
  },
  description: {
    marginTop: 16,
    fontSize: 15,
    lineHeight: 23,
    color: "#444444",
  },
  cartScreen: {
    flex: 1,
  },
  cartRow: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  cartInfo: {
    flex: 1,
  },
  cartTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222222",
  },
  cartQty: {
    marginTop: 6,
    color: "#666666",
  },
  cartPrice: {
    width: 100,
    textAlign: "right",
    color: "#D84A4A",
    fontWeight: "700",
  },
  cartSummary: {
    minHeight: 74,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#D84A4A",
  },
  payButton: {
    backgroundColor: "#3147C7",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  payText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  centerScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  accountIcon: {
    fontSize: 64,
    marginBottom: 10,
  },
  accountText: {
    marginTop: 5,
    fontSize: 16,
    color: "#444444",
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
  activeTabText: {
    color: "#3147C7",
    fontWeight: "700",
  },
});
