import { Product } from '../data/products';

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'shopper';
  text: string;
  suggestedProductIds?: string[];
  timestamp: string;
}

export interface CheckoutDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  paymentMethod: 'ozow' | 'payfast' | 'card';
}
