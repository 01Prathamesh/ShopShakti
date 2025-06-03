import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface OrderItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  orderId?: number;
}

export interface Order {
  id?: number;
  date?: string;
  userId: number;
  status: string;
  items: OrderItem[];
  totalAmount: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  // Place a new order
  placeOrder(order: any): Observable<any> {
    return this.http.post(this.baseUrl, order);
  }

  // Get all orders (for a specific user, if applicable)
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl);
  }

  // Get a specific order by ID
  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/${id}`);
  }
}
