export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

// ✅ New interface without `id` (used for POST)
export interface NewCartItem {
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}
