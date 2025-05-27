import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem } from '../../../models/cart-item.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = `${environment.apiUrl}/cartitems`;

  constructor(private http: HttpClient) {}

  getCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.baseUrl);
  }

  addCartItem(item: CartItem): Observable<CartItem> {
    return this.http.post<CartItem>(this.baseUrl, item);
  }

  updateCartItem(item: CartItem): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${item.id}`, item);
  }

  removeCartItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
