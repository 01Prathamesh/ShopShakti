import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../services/order.service';
import { RouterModule } from '@angular/router';
import { ToastService } from '../../../services/toast.service';

@Component({
  standalone: true,
  selector: 'app-order-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent implements OnInit {
  orders: any[] = [];
  isLoading = true;

  formatPaymentStatus(status: string): string {
  const labels: { [key: string]: string } = {
      Pending: 'Pending',
      COD_Pending: 'Cash on Delivery (Pending)',
      Success: 'Payment Successful',
      Failed: 'Payment Failed',
      Refunded: 'Refunded'
    };

    return labels[status] || status;
  }

  formatPaymentMethod(method: string): string {
    const methods: { [key: string]: string } = {
      COD: 'Cash on Delivery',
      CreditCard: 'Credit Card',
      DebitCard: 'Debit Card',
      NetBanking: 'Net Banking',
      UPI: 'UPI',
      PayPal: 'PayPal',
      Razorpay: 'Razorpay'
    };
    return methods[method] || method;
  }

  formatOrderStatus(status: string): string {
    return status?.replace(/([A-Z])/g, ' $1').trim();
  }

  constructor(private orderService: OrderService, private toast: ToastService) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user?.id;

    if (!userId) {
      this.toast.show('Please log in to view orders.', 'error');
      this.isLoading = false;
      return;
    }

    this.orderService.getOrdersByUser().subscribe({
      next: (data) => {
        this.orders = data;
        this.orders = this.orders.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
        this.isLoading = false;
      },
      error: () => {
        this.toast.show('Failed to load orders.', 'error');
        this.isLoading = false;
      }
    });
  }
}
