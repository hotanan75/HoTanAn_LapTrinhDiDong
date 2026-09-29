import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loginSuccess, logout as logoutAction } from '../store/authSlice';
import type { User } from '../types';

// Dữ liệu giả để test trước khi nối API đăng nhập ở Tuần 7
const FAKE_USER: User = { id: '1', name: 'Nguyễn Văn A', email: 'demo@bookstore.vn' };
const FAKE_TOKEN = 'fake-token-123';

/** Adapter cho store 'auth' */
export function useAuth() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const token = useAppSelector((s) => s.auth.token);
  const isLoggedIn = useAppSelector((s) => s.auth.isLoggedIn);

  const login = useCallback(
    () => dispatch(loginSuccess({ user: FAKE_USER, token: FAKE_TOKEN })),
    [dispatch]
  );
  const logout = useCallback(() => dispatch(logoutAction()), [dispatch]);

  return { user, token, isLoggedIn, login, logout };
}
