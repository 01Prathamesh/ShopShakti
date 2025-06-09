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
