import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

const categories = [
  'Văn học',
  'Kinh tế',
  'Thiếu nhi',
  'Kỹ năng sống',
  'Truyện tranh',
  'Ngoại ngữ',
  'Lịch sử',
  'Công nghệ',
];

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Danh mục sách</Text>

      <View style={styles.chipContainer}>
        {categories.map((item) => (
          <View key={item} style={styles.chip}>
            <Text style={styles.chipText}>{item}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1E2A5A',
    marginBottom: 16,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    alignContent: 'flex-start',
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#4B5CC4',
    backgroundColor: '#F9FAFF',
  },
  chipText: {
    fontSize: 14,
    color: '#3340A0',
    fontWeight: '600',
  },
});
