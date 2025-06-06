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
        email: parsedUser.email, 
        isAuthenticated: true,
        role: parsedUser.role
      };
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  login(userData: { id: number; name: string; email: string; role: string }) {
    this.user = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      isAuthenticated: true,
      role: userData.role
    };
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.user = null;
  }

  isLoggedIn(): boolean {
    return this.user?.isAuthenticated === true;
  }

  isAdmin(): boolean {
    return this.getRole() === 'Admin';
  }

  isStaff(): boolean {
    return this.getRole() === 'Staff';
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

  getRole(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload['role'] || payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || null;
  }

}
