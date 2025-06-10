import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { Router } from '@angular/router';
import { CartItem } from '../../../models/cart-item.model';
import { CommonModule } from '@angular/common';
import { OrderService, OrderItem } from '../../../services/order.service';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { User } from '../../../models/user.model';
import { ProfileService } from '../../../services/profile.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  standalone: true,
  selector: 'app-checkout',
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;
  selectedAddress: string = '';
  isLoading = false;
  user: User | null = null;
  useDifferentAddress = false;
  isBuyNow: boolean = false;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private authService: AuthService,
    private userService: ProfileService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    const userId = this.authService.getCurrentUserId();

    if (!userId) {
      this.router.navigate(['/login']);
      return;
    }

    this.userService.getUserProfile().subscribe({
      next: (userData: User) => {
        this.user = userData;
        this.selectedAddress = userData.address || '';
      },
      error: (err) => {
        console.error('Failed to fetch user profile:', err);
        this.selectedAddress = '';
        this.toastService.show('Failed to fetch user details.', 'error', 4000);
      }
    });

    const buyNowItem = this.authService.getBuyNowItem();
    if (buyNowItem) {
      this.cartItems = [buyNowItem];
      this.total = buyNowItem.price * buyNowItem.quantity;
      this.authService.clearBuyNowItem();
      this.isBuyNow = true;
      return;
    }

    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    });
  }

  confirmOrder() {
    const orderItems = this.cartItems.map(item => ({
      productId: item.productId,
      name: item.name,
      price: item.price,
      quantity: item.quantity
    }));

    const userId = this.authService.getCurrentUserId();
    const deliveryAddress = this.useDifferentAddress ? this.selectedAddress : this.user?.address;

    if (!userId) {
      this.toastService.show('Please log in to place an order.', 'error');
      this.router.navigate(['/login']);
      return;
    }

    const order = {
      userId,
      items: orderItems,
      totalAmount: this.total + 40 + 20,
      shippingFee: 40,
      tax: 20,
      address: deliveryAddress,
      paymentMethod: 'Cash on Delivery',
      status: 'Pending'
    };

    this.orderService.placeOrder(order, !this.isBuyNow).subscribe({
      next: (response) => {
        this.toastService.show('Order placed successfully!', 'success');
        this.router.navigate(['/order-success'], { queryParams: { orderId: response.id } });
      },
      error: (err) => {
        console.error('Order placement failed:', err);
        this.toastService.show('Failed to place order.', 'error', 4000);
      }
    });
  }
}
