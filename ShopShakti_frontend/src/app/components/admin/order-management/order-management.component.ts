import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService, Order } from '../../../services/order.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-order-management',
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './order-management.component.html',
  styleUrl: './order-management.component.css'
})
export class OrderManagementComponent implements OnInit {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  searchQuery = '';
  isLoading = false;
  errorMessage = '';

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.isLoading = true;
    this.orderService.getOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.filteredOrders = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load orders.';
        this.isLoading = false;
      }
    });
  }

  onSearch(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredOrders = this.orders.filter(order =>
      order.status.toLowerCase().includes(query) ||
      order.userId.toString().includes(query)
    );
  }

  calculateSubtotal(order: Order): number {
    return order.totalAmount - (order.shippingFee ?? 0) - (order.tax ?? 0);
  }
}
