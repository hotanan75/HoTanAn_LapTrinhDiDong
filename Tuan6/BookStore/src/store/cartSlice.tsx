import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Book } from '../types';

/** Giỏ hàng lưu bookId + số lượng; kèm snapshot `book` để Cart Screen hiển thị/tính tiền mà không phải gọi lại API */
export type CartItem = {
  bookId: string;
  quantity: number;
  book: Book;
};

type CartState = { items: CartItem[] };

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<{ book: Book; quantity?: number }>) {
      const { book, quantity = 1 } = action.payload;
      const existing = state.items.find((i) => i.bookId === book.id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ bookId: book.id, quantity, book });
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.bookId !== action.payload);
    },
    setQuantity(state, action: PayloadAction<{ bookId: string; quantity: number }>) {
      const { bookId, quantity } = action.payload;
      if (quantity <= 0) {
        state.items = state.items.filter((i) => i.bookId !== bookId);
        return;
      }
      const item = state.items.find((i) => i.bookId === bookId);
      if (item) item.quantity = quantity;
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, setQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

// ---- Selectors (nhận state dạng tối thiểu để tránh import vòng với store/index) ----
type WithCart = { cart: CartState };
export const selectCartItems = (s: WithCart) => s.cart.items;
export const selectTotalQuantity = (s: WithCart) =>
  s.cart.items.reduce((sum, i) => sum + i.quantity, 0);
export const selectTotalPrice = (s: WithCart) =>
  s.cart.items.reduce((sum, i) => sum + i.quantity * i.book.price, 0);
