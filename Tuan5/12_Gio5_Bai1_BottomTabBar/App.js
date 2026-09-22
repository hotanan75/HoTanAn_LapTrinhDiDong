import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

const tabs = [
  { id: 1, icon: '🏠', label: 'Trang chủ', active: true },
  { id: 2, icon: '📚', label: 'Danh mục', active: false },
  { id: 3, icon: '🛒', label: 'Giỏ hàng', active: false },
  { id: 4, icon: '👤', label: 'Tài khoản', active: false },
];

export default function App() {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.heading}>Nội dung màn hình</Text>
      </View>

      <View style={styles.tabBar}>
        {tabs.map((tab) => (
          <View key={tab.id} style={styles.tabItem}>
            <Text style={styles.tabIcon}>{tab.icon}</Text>
            <Text style={[styles.tabText, tab.active && styles.activeText]}>
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
    backgroundColor: '#F5F6FA',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E2A5A',
  },
  tabBar: {
    height: 68,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    flexDirection: 'row',
  },
  tabItem: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    fontSize: 22,
  },
  tabText: {
    marginTop: 4,
    fontSize: 12,
    color: '#777777',
  },
  activeText: {
    color: '#3147C7',
    fontWeight: '700',
  },
});
