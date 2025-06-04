import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../services/order.service';

@Component({
  standalone: true,
  selector: 'app-order-summary',
  imports: [CommonModule],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css'
})
export class OrderSummaryComponent implements OnInit {
  order: any = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    const orderId = Number(this.route.snapshot.paramMap.get('id'));

    if (!orderId) {
      console.error('Invalid order ID.');
      this.isLoading = false;
      return;
    }

    this.orderService.getOrderById(orderId).subscribe({
      next: (data) => {
        this.order = {
          ...data,
          subtotal: data.items?.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0),
          shippingFee: (data as any).shippingFee || 0,
          tax: (data as any).tax || 0,
          totalAmount: data.totalAmount
        };
        this.isLoading = false;
      },
      error: () => {
        console.error('Order not found.');
        this.isLoading = false;
      }
    });
  }
}
