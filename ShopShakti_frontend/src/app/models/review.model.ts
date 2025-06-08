export interface Review {
  id?: number;
  productId?: number; // undefined = platform-level review
  userId: number;
  userName: string;
  message: string;
  rating: number;
  createdAt?: Date;
  isApprovedForHomepage?: boolean;
}
