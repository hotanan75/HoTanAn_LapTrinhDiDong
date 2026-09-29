import axios from 'axios';
import type { Book } from '../types';

const api = axios.create({
  baseURL: 'https://6aba0ce45b549d818d61cfdd.mockapi.io/bookstore',
  timeout: 10000,
});

type RawBook = {
  id: string | number;
  title: string;
  author: string;
  price: number | string;
  image?: string;
  category: string;
  description: string;
  badge?: string;
};

// mockapi sinh sẵn dữ liệu rác kiểu "badge 5", "image 5" -> làm sạch để UI không hiển thị sai
const PLACEHOLDER_BADGE = /^badge\s*\d+$/i;
const VALID_URL = /^https?:\/\//i;

function normalizeBook(raw: RawBook): Book {
  return {
    id: String(raw.id),
    title: raw.title,
    author: raw.author,
    price: Number(raw.price) || 0,
    image: raw.image && VALID_URL.test(raw.image) ? raw.image : null,
    category: raw.category,
    description: raw.description,
    badge: raw.badge && !PLACEHOLDER_BADGE.test(raw.badge) ? raw.badge : undefined,
  };
}

/** Lấy danh sách sách từ API để đổ vào Home */
export async function getBooks(): Promise<Book[]> {
  const res = await api.get<RawBook[]>('/books');
  return res.data.map(normalizeBook);
}

/** Lấy 1 cuốn theo bookId nhận từ route.params */
export async function getBookById(id: string): Promise<Book> {
  const res = await api.get<RawBook>(`/books/${id}`);
  return normalizeBook(res.data);
}
