// types.ts

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  image: string;
  category_id: number;
  description: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
