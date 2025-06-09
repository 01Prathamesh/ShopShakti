import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../services/order.service';
import { ToastService } from '../../../services/toast.service';

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
    private orderService: OrderService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    const orderId = Number(this.route.snapshot.paramMap.get('id'));

    if (!orderId) {
      this.toast.show('Invalid order ID.', 'error');
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
        this.toast.show('Order not found.', 'error');
        this.isLoading = false;
      }
    });
  }
}
