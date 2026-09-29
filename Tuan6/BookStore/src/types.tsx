export type Book = {
  id: string;
  title: string;
  author: string;
  price: number;
  image: string | null;
  category: string;
  description: string;
  badge?: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
};