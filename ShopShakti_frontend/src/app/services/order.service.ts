import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  shippingFee: number;
  tax: number;
  paymentMethod: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  // Place a new order
  placeOrder(order: any, clearCart: boolean = false): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user?.id;

    const headers = new HttpHeaders({
      'X-User-Id': userId,
      ...(clearCart ? { 'X-Clear-Cart': 'true' } : {})
    });

    return this.http.post(this.baseUrl, order, { headers });
  }

  // Get all orders
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl);
  }

  // Get a specific order by ID
  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/${id}`);
  }

  getOrdersByUser(userId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/user/${userId}`);
  }

}
