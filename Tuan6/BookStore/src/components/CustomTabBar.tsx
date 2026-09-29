import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme';
import { useCart } from '../hooks/useCart';

type IconName = keyof typeof Ionicons.glyphMap;

const TABS: Record<string, { label: string; icon: IconName; iconActive: IconName }> = {
  Home: { label: 'Trang chủ', icon: 'home-outline', iconActive: 'home' },
  Categories: { label: 'Danh mục', icon: 'grid-outline', iconActive: 'grid' },
  Cart: { label: 'Giỏ hàng', icon: 'cart-outline', iconActive: 'cart' },
  Account: { label: 'Tài khoản', icon: 'person-outline', iconActive: 'person' },
};

/**
 * Tab Bar Tuần 3-4 dùng làm custom tabBar: row, mỗi mục flex:1, icon trên - chữ dưới.
 * Dùng state.index để biết tab nào đang chọn.
 */
export default function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { totalQuantity } = useCart();

  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const tab = TABS[route.name];
        const color = focused ? colors.indigo : colors.muted;

        const onPress = () => {
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!focused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable key={route.key} style={styles.item} onPress={onPress}>
            <View>
              <Ionicons name={focused ? tab.iconActive : tab.icon} size={24} color={color} />
              {route.name === 'Cart' && totalQuantity > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{totalQuantity > 99 ? '99+' : totalQuantity}</Text>
                </View>
              )}
            </View>
            <Text style={[styles.label, { color }, focused && styles.labelActive]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 8,
  },
  item: { flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3 },
  label: { fontSize: 11 },
  labelActive: { fontWeight: '700' },
  badge: {
    position: 'absolute',
    top: -5,
    right: -10,
    minWidth: 17,
    height: 17,
    paddingHorizontal: 4,
    borderRadius: 9,
    backgroundColor: colors.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { color: colors.white, fontSize: 10, fontWeight: '700' },
});
