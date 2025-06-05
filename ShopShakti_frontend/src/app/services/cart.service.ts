import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CartItem, NewCartItem } from '../models/cart-item.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = `${environment.apiUrl}/cartitems`;

  // Reactive cart count
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const user = localStorage.getItem('user');
    const userId = user ? JSON.parse(user).id : null;
    return new HttpHeaders({
      'X-User-Id': userId || ''
    });
  }

  getCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.baseUrl, { headers: this.getHeaders() }).pipe(
      tap(items => {
        const total = items.reduce((sum, item) => sum + item.quantity, 0);
        this.cartCountSubject.next(total);
      })
    );
  }

  addCartItem(item: NewCartItem): Observable<CartItem> {
    return this.http.post<CartItem>(this.baseUrl, item, { headers: this.getHeaders() }).pipe(
      tap(() => this.refreshCartCount())
    );
  }

  updateCartItem(item: CartItem): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${item.id}`, item, { headers: this.getHeaders() }).pipe(
      tap(() => this.refreshCartCount())
    );
  }

  removeCartItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() }).pipe(
      tap(() => this.refreshCartCount())
    );
  }

  // Public method to trigger count refresh
  refreshCartCount(): void {
    this.getCartItems().subscribe(); // calls tap() above
  }
}
