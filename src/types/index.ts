
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  features?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CompareItem {
  product: Product;
}

export interface Order {
  id: number;
  customerName: string;
  customerEmail: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: CartItem[];
  totalAmount: number;
  shippingAddress: string;
  orderDate: string;
  paymentMethod: string;
}
