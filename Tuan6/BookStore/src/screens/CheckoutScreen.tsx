import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import Screen from '../components/Screen';
import Header from '../components/Header';
import { colors, formatPrice } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Checkout'>;

/** Khung tối giản: chỉ hiển thị tổng tiền nhận qua route.params (hoàn thiện ở Tuần 9) */
export default function CheckoutScreen({ navigation, route }: Props) {
  return (
    <Screen header={<Header title="Thanh toán" onBack={() => navigation.goBack()} />}>
      <View style={styles.center}>
        <Text style={styles.label}>Tổng tiền cần thanh toán</Text>
        <Text style={styles.total}>{formatPrice(route.params.total)}</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 },
  label: { fontSize: 15, color: colors.muted },
  total: { fontSize: 34, fontWeight: '800', color: colors.indigo },
});
