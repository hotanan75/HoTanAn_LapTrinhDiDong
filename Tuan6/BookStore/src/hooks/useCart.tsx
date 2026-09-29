import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  addItem,
  clearCart as clearCartAction,
  removeItem,
  selectCartItems,
  selectTotalPrice,
  selectTotalQuantity,
  setQuantity,
} from '../store/cartSlice';
import type { Book } from '../types';

/**
 * Adapter: component chỉ gọi useCart(), không biết bên dưới là Redux hay Recoil.
 * Sau này đổi thư viện chỉ cần sửa file này.
 */
export function useCart() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const totalQuantity = useAppSelector(selectTotalQuantity);
  const totalPrice = useAppSelector(selectTotalPrice);

  const addToCart = useCallback(
    (book: Book, quantity = 1) => dispatch(addItem({ book, quantity })),
    [dispatch]
  );
  const removeFromCart = useCallback((bookId: string) => dispatch(removeItem(bookId)), [dispatch]);
  const updateQuantity = useCallback(
    (bookId: string, quantity: number) => dispatch(setQuantity({ bookId, quantity })),
    [dispatch]
  );
  const clearCart = useCallback(() => dispatch(clearCartAction()), [dispatch]);

  return { items, totalQuantity, totalPrice, addToCart, removeFromCart, updateQuantity, clearCart };
}
