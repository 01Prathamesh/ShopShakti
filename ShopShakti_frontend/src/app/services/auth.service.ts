import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private user: any = null;

  constructor() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      this.user = {
        id: parsedUser.id,
        isAuthenticated: true,
        role: parsedUser.role
      };
    }
  }

  login(userData: { id: number; role: string }) {
    this.user = {
      id: userData.id,
      isAuthenticated: true,
      role: userData.role
    };
  }

  isLoggedIn(): boolean {
    return this.user?.isAuthenticated === true;
  }

  isAdmin(): boolean {
    return this.user?.role === 'admin';
  }

  getCurrentUserId(): number {
    if (!this.user || !this.user.id) {
      console.error('❌ No user is logged in.');
      throw new Error('User not logged in');
    }
    return this.user.id;
  }

  private buyNowItem: CartItem | null = null;

  setBuyNowItem(item: CartItem): void {
    this.buyNowItem = item;
  }

  getBuyNowItem(): CartItem | null {
    return this.buyNowItem;
  }

  clearBuyNowItem(): void {
    this.buyNowItem = null;
  }

}
