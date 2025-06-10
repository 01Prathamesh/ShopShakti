import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService, Order } from '../../../services/order.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../services/toast.service';

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

  constructor(
    private orderService: OrderService,
    private toastService: ToastService
  ) {}

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
        this.toastService.show('Orders loaded successfully!', 'success');
      },
      error: () => {
        this.errorMessage = 'Failed to load orders.';
        this.isLoading = false;
        this.toastService.show('Failed to load orders.', 'error', 4000);
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
    return (order.totalAmount || 0) - (order.shippingFee || 0) - (order.tax || 0);
  }
  updateShipping(order: Order) {
    this.orderService.updateShippingStatus(order.id!, order.shippingStatus!).subscribe({
      next: () => this.toastService.show('Shipping status updated', 'success'),
      error: () => this.toastService.show('Failed to update status', 'error')
    });
  }
}
