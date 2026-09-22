import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

export default function Bai10() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/1')
      .then(res => res.json())
      .then(data => setUser(data as User));
  }, []);

  if (!user) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bài 10 - User Profile</Text>

      <Text>Tên: {user?.name}</Text>
      <Text>Username: {user?.username}</Text>
      <Text>Email: {user?.email}</Text>
      <Text>Phone: {user?.phone}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, paddingTop: 60 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});