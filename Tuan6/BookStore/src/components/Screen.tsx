import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme';

/** Khung màn hình chung: vùng status bar màu navy (chứa Header) + nội dung nền sáng */
export default function Screen({ header, children }: { header: React.ReactNode; children: React.ReactNode }) {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {header}
      <View style={styles.body}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.navy },
  body: { flex: 1, backgroundColor: colors.bg },
});
