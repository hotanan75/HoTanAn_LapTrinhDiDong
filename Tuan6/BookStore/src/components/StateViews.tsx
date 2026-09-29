import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

export function LoadingView({ text = 'Đang tải...' }: { text?: string }) {
  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color={colors.indigo} />
      <Text style={styles.sub}>{text}</Text>
    </View>
  );
}

type EmptyProps = {
  title: string;
  subtitle?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  actionLabel?: string;
  onAction?: () => void;
};

export function EmptyView({ title, subtitle, icon = 'alert-circle-outline', actionLabel, onAction }: EmptyProps) {
  return (
    <View style={styles.center}>
      <Ionicons name={icon} size={56} color={colors.indigo} />
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.sub}>{subtitle}</Text> : null}
      {actionLabel && onAction ? (
        <Pressable style={styles.btn} onPress={onAction}>
          <Text style={styles.btnText}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32, paddingVertical: 48, gap: 8, flex: 1 },
  title: { fontSize: 17, fontWeight: '700', color: colors.text, textAlign: 'center', marginTop: 4 },
  sub: { fontSize: 14, color: colors.muted, textAlign: 'center' },
  btn: { marginTop: 12, backgroundColor: colors.indigo, paddingHorizontal: 22, paddingVertical: 11, borderRadius: 999 },
  btnText: { color: colors.white, fontWeight: '700', fontSize: 14 },
});
