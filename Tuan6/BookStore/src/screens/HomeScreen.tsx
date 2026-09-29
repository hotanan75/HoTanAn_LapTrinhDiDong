import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList, TabParamList } from '../navigation/types';
import Screen from '../components/Screen';
import Header from '../components/Header';
import BookGrid from '../components/BookGrid';
import FloatingCartButton from '../components/FloatingCartButton';
import { EmptyView, LoadingView } from '../components/StateViews';
import { useCart } from '../hooks/useCart';
import { getBooks } from '../services/api';
import type { Book } from '../types';

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

export default function HomeScreen({ navigation }: Props) {
  const { totalQuantity } = useCart(); // badge lấy từ store giỏ hàng
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    getBooks()
      .then(setBooks)
      .catch(() => setFailed(true))
      .finally(() => setLoading(false));
  }, []);

  const goCart = () => navigation.navigate('Cart');

  const renderContent = () => {
    if (loading) return <LoadingView text="Đang tải sách..." />;
    if (failed) return <EmptyView title="Không tải được sách" subtitle="Hãy kiểm tra kết nối mạng rồi mở lại ứng dụng." />;

    return (
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Nhấn Book Card -> sang BookDetail kèm bookId qua route.params */}
        <BookGrid books={books} onPressBook={(book) => navigation.navigate('BookDetail', { bookId: book.id })} />
      </ScrollView>
    );
  };

  return (
    <Screen header={<Header onCartPress={goCart} />}>
      {renderContent()}
      {/* Nút nổi nằm ngoài ScrollView để không cuộn theo nội dung */}
      <FloatingCartButton count={totalQuantity} onPress={goCart} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollContent: { padding: 16, paddingBottom: 110 },
});
