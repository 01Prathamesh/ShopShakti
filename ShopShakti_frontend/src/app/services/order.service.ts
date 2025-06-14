import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { OrderStatus, ShippingStatus } from '../constants/order-status';
import { PaymentMethod } from '../constants/payment-method';
import { PaymentStatus } from '../constants/payment-status';

export interface OrderItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  orderId?: number;
}

export interface Order {
  id?: number;
  orderDate?: string;
  userId: number;
  status: OrderStatus;
  items: OrderItem[];
  totalAmount: number;
  shippingFee: number;
  tax: number;
  paymentMethod: PaymentMethod;
  shippingStatus?: ShippingStatus;
  paymentStatus?: PaymentStatus;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  placeOrder(order: Order, clearCart: boolean = false): Observable<any> {
    const headers = clearCart
      ? new HttpHeaders({ 'X-Clear-Cart': 'true' })
      : undefined;

    return this.http.post(this.baseUrl, order, { headers });
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl);
  }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/${id}`);
  }

  getOrdersByUser(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/user`);
  }

  updateOrder(id: number, updateData: Partial<Order>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, updateData);
  }

  updateShippingStatus(id: number, shippingStatus: string): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${id}/shipping-status`, { shippingStatus });
  }

  updatePaymentStatus(id: number, paymentStatus: string): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${id}/payment-status`, { paymentStatus });
  }

  downloadInvoice(orderId: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${orderId}/invoice`, {
      responseType: 'blob'
    });
  }
}
