// Bảng màu + tiện ích dùng chung (navy / indigo / cyan theo bộ nhận diện khóa học)
export const colors = {
  navy: '#0F1B4C',
  indigo: '#4F46E5',
  indigoSoft: '#EEF2FF',
  cyan: '#06B6D4',
  bg: '#F5F6FA',
  card: '#FFFFFF',
  text: '#111827',
  muted: '#6B7280',
  border: '#E5E7EB',
  red: '#EF4444',
  orange: '#F59E0B',
  white: '#FFFFFF',
};

/** 86000 -> "86.000đ" (không dùng Intl để chạy ổn định trên mọi máy Android) */
export const formatPrice = (value: number): string =>
  `${Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ`;
