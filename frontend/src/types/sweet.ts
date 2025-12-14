export interface Sweet {
  _id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  description: string;
  image: string;
  featured?: boolean;
}

export interface User {
  _id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

export type SweetCategory = 
  | 'chocolates'
  | 'candies'
  | 'cakes'
  | 'cookies'
  | 'ice-cream'
  | 'pastries';

export const CATEGORIES: { value: SweetCategory; label: string; emoji: string }[] = [
  { value: 'chocolates', label: 'Chocolates', emoji: '🍫' },
  { value: 'candies', label: 'Candies', emoji: '🍬' },
  { value: 'cakes', label: 'Cakes', emoji: '🎂' },
  { value: 'cookies', label: 'Cookies', emoji: '🍪' },
  { value: 'ice-cream', label: 'Ice Cream', emoji: '🍦' },
  { value: 'pastries', label: 'Pastries', emoji: '🥐' },
];
