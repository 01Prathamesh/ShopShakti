import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../services/order.service';
import { RouterModule } from '@angular/router';

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

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user?.id;

    if (!userId) {
      console.error('User not logged in.');
      this.isLoading = false;
      return;
    }

    this.orderService.getOrdersByUser(userId).subscribe({
      next: (data) => {
        this.orders = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load orders', err);
        this.isLoading = false;
      }
    });
  }
}
