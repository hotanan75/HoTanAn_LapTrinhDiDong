import React from 'react';
import { StyleSheet, View } from 'react-native';
import BookCard from './BookCard';
import type { Book } from '../types';

type Props = { books: Book[]; onPressBook: (book: Book) => void };

/** Book Grid Tuần 3-4: row + wrap + space-between, mỗi item width 48% */
export default function BookGrid({ books, onPressBook }: Props) {
  return (
    <View style={styles.grid}>
      {books.map((book) => (
        <BookCard key={book.id} book={book} onPress={() => onPressBook(book)} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
});
