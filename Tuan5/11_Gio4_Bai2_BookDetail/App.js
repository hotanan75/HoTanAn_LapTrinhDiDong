import React from 'react';
import { SafeAreaView, ScrollView, View, Text, Image, StyleSheet } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <Image
          source={{ uri: 'https://picsum.photos/seed/detailbook/360/480' }}
          style={styles.cover}
        />

        <Text style={styles.title}>Atomic Habits - Thay đổi tí hon, hiệu quả bất ngờ</Text>
        <Text style={styles.author}>James Clear</Text>
        <Text style={styles.price}>135.000 đ</Text>

        <Text style={styles.descriptionTitle}>Mô tả</Text>
        <Text style={styles.description}>
          Cuốn sách trình bày cách những thay đổi nhỏ, được lặp lại đều đặn,
          có thể tạo nên kết quả lớn theo thời gian. Nội dung nhấn mạnh việc
          xây dựng hệ thống thói quen, thiết kế môi trường phù hợp và duy trì
          các hành vi tích cực một cách bền vững.
          {'\n\n'}
          Đây là phần mô tả dài để kiểm tra ScrollView. Khi nội dung tăng lên,
          thanh “Thêm vào giỏ” bên dưới vẫn đứng yên và không bị đẩy ra khỏi
          màn hình.
          {'\n\n'}
          Người dùng có thể cuộn phần nội dung này để xem hết thông tin của sách.
        </Text>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.bottomLabel}>Giá</Text>
          <Text style={styles.bottomPrice}>135.000 đ</Text>
        </View>

        <View style={styles.addButton}>
          <Text style={styles.addButtonText}>Thêm vào giỏ</Text>
        </View>
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
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 24,
  },
  cover: {
    alignSelf: 'center',
    width: '58%',
    aspectRatio: 3 / 4,
    borderRadius: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1E2A5A',
  },
  author: {
    marginTop: 8,
    fontSize: 16,
    color: '#666666',
  },
  price: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: '700',
    color: '#D84A4A',
  },
  descriptionTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '700',
    color: '#222222',
  },
  description: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 24,
    color: '#444444',
  },
  bottomBar: {
    minHeight: 76,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E7E7E7',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomLabel: {
    fontSize: 12,
    color: '#777777',
  },
  bottomPrice: {
    marginTop: 3,
    fontSize: 18,
    fontWeight: '700',
    color: '#D84A4A',
  },
  addButton: {
    backgroundColor: '#3147C7',
    paddingHorizontal: 22,
    paddingVertical: 13,
    borderRadius: 10,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
});
