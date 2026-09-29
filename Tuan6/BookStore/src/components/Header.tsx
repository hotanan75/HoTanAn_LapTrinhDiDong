import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

type Props = {
  title?: string;
  onBack?: () => void;
  onCartPress?: () => void;
};

/** Header Tuần 3-4: row + space-between + center, cao 56, padding ngang 16, nền navy */
export default function Header({ title = 'BookStore', onBack, onCartPress }: Props) {
  return (
    <View style={styles.header}>
      <View style={styles.left}>
        {onBack ? (
          <Pressable onPress={onBack} hitSlop={12} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={26} color={colors.white} />
          </Pressable>
        ) : (
          <Ionicons name="book" size={22} color={colors.cyan} />
        )}
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>

      {onCartPress && (
        <Pressable onPress={onCartPress} hitSlop={10}>
          <Ionicons name="cart-outline" size={25} color={colors.white} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.navy,
  },
  left: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 },
  backBtn: { marginLeft: -6 },
  title: { color: colors.white, fontSize: 20, fontWeight: '700', flexShrink: 1 },
});
