
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
  stock: number;
  badge?: 'Trend' | 'Utility' | 'Viral';
  warranty?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type Category = 'All' | 'Tech' | 'Home' | 'Kitchen' | 'Lifestyle';

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  color: string;
}
