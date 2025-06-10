export interface CartItem {
  id?: number;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  availableStock?: number;
}

// ✅ New interface without `id` (used for POST)
export interface NewCartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}
