import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Screen from '../components/Screen';
import Header from '../components/Header';
import { useAuth } from '../hooks/useAuth';
import { colors } from '../theme';

export default function AccountScreen() {
  const { user, isLoggedIn, login, logout } = useAuth();

  return (
    <Screen header={<Header title="Tài khoản" />}>
      {isLoggedIn && user ? (
        <View style={styles.container}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user.name.charAt(0).toUpperCase()}</Text>
          </View>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <Pressable style={[styles.btn, styles.btnOutline]} onPress={logout}>
            <Text style={[styles.btnText, styles.btnOutlineText]}>Đăng xuất</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.container}>
          <Ionicons name="person-circle-outline" size={88} color={colors.indigo} />
          <Text style={styles.name}>Bạn chưa đăng nhập</Text>
          <Text style={styles.email}>Đăng nhập để theo dõi đơn hàng và lưu sách yêu thích.</Text>
          <Pressable style={styles.btn} onPress={login}>
            <Text style={styles.btnText}>Đăng nhập (dữ liệu giả)</Text>
          </Pressable>
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32, gap: 8 },
  avatar: { width: 88, height: 88, borderRadius: 44, backgroundColor: colors.indigo, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: colors.white, fontSize: 36, fontWeight: '800' },
  name: { marginTop: 8, fontSize: 20, fontWeight: '800', color: colors.text, textAlign: 'center' },
  email: { fontSize: 14, color: colors.muted, textAlign: 'center' },
  btn: { marginTop: 16, backgroundColor: colors.indigo, paddingHorizontal: 28, paddingVertical: 13, borderRadius: 999 },
  btnOutline: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.indigo },
  btnText: { color: colors.white, fontSize: 15, fontWeight: '700' },
  btnOutlineText: { color: colors.indigo },
});
