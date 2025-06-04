import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem, NewCartItem } from '../models/cart-item.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = `${environment.apiUrl}/cartitems`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const user = localStorage.getItem('user');
    const userId = user ? JSON.parse(user).id : null;
    return new HttpHeaders({
      'X-User-Id': userId || ''
    });
  }

  getCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.baseUrl, { headers: this.getHeaders() });
  }

  addCartItem(item: NewCartItem): Observable<CartItem> {
    return this.http.post<CartItem>(this.baseUrl, item, { headers: this.getHeaders() });
  }

  updateCartItem(item: CartItem): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${item.id}`, item, { headers: this.getHeaders() });
  }

  removeCartItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }
}
