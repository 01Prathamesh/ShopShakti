import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private user = {
    isAuthenticated: true,
    role: 'admin' // or 'user'
  };

  isLoggedIn(): boolean {
    return this.user.isAuthenticated;
  }

  isAdmin(): boolean {
    return this.user.role === 'admin';
  }

  // You can expand this to use JWT or real backend APIs
}
