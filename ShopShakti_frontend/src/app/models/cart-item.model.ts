export interface CartItem {
  id?: number;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

// ✅ New interface without `id` (used for POST)
export interface NewCartItem {
  productId: number;
  quantity: number;
}
