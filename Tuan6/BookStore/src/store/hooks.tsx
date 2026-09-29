import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './index';

// Chỉ các adapter hook (useCart, useAuth) được import file này.
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
