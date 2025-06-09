import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CartItem, NewCartItem } from '../models/cart-item.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = `${environment.apiUrl}/cartitems`;

  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  constructor(private http: HttpClient) {}

  getCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.baseUrl).pipe(
      tap(items => {
        const total = items.reduce((sum, item) => sum + item.quantity, 0);
        this.cartCountSubject.next(total);
      })
    );
  }

  addCartItem(item: NewCartItem): Observable<CartItem> {
    return this.http.post<CartItem>(this.baseUrl, item).pipe(
      tap(() => this.refreshCartCount())
    );
  }

  updateCartItem(item: CartItem): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${item.id}`, item).pipe(
      tap(() => this.refreshCartCount())
    );
  }

  updateCartItemQuantity(id: number, quantity: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, { quantity }).pipe(
      tap(() => this.refreshCartCount())
    );
  }

  removeCartItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      tap(() => this.refreshCartCount())
    );
  }

  refreshCartCount(): void {
    this.getCartItems().subscribe();
  }
}
