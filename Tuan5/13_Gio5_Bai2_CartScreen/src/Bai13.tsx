import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';

interface User {
  id: number;
  name: string;
}

const filterList = <T extends { name: string }>(
  list: T[],
  keyword: string
): T[] => {
  return list.filter(item =>
    item.name.toLowerCase().includes(keyword.toLowerCase())
  );
};

const users: User[] = [
  { id: 1, name: 'Nguyễn Văn An' },
  { id: 2, name: 'Trần Văn Bình' },
  { id: 3, name: 'Lê Hoàng Nam' },
];

export default function Bai13() {
  const [keyword, setKeyword] = useState('');

  const result = filterList(users, keyword);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bài 13 - Filter Generic</Text>

      <TextInput
        style={styles.input}
        placeholder="Nhập tên cần tìm"
        value={keyword}
        onChangeText={setKeyword}
      />

      <FlatList
        data={result}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.name}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  input: { borderWidth: 1, padding: 10, marginBottom: 15 },
  item: { padding: 15, backgroundColor: '#eee', marginBottom: 8 },
});