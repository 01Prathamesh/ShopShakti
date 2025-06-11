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
import { OrderSettingsService } from '../../../services/order-settings.service';
import { PaymentMethod } from '../../../constants/payment-method';
import { OrderStatus } from '../../../constants/order-status';

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
  shippingFee: number = 0;
  tax: number = 0;
  paymentMethods = Object.values(PaymentMethod);
  paymentMethod: PaymentMethod = PaymentMethod.CashOnDelivery;
  paymentMethodLabels: { [key: string]: string } = {
    COD: 'Cash on Delivery',
    CreditCard: 'Credit Card',
    DebitCard: 'Debit Card',
    NetBanking: 'Net Banking',
    UPI: 'UPI',
    PayPal: 'PayPal',
    Razorpay: 'Razorpay'
  };


  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private authService: AuthService,
    private userService: ProfileService,
    private router: Router,
    private toastService: ToastService,
    private settingsService: OrderSettingsService
  ) {}

  ngOnInit() {
    const userId = this.authService.getCurrentUserId();
    if (!userId) {
      this.router.navigate(['/login']);
      return;
    }

    // Fetch user profile
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

    // Check for Buy Now
    const buyNowItem = this.authService.getBuyNowItem();
    if (buyNowItem) {
      this.cartItems = [buyNowItem];
      this.settingsService.getSettings().subscribe(setting => {
        this.shippingFee = setting.shippingFee;
        this.tax = setting.tax;
        this.total = buyNowItem.price * buyNowItem.quantity + this.shippingFee + this.tax;
      });
      this.authService.clearBuyNowItem();
      this.isBuyNow = true;
      return;
    }

    // Chain: get cartItems → then settings → then total
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.settingsService.getSettings().subscribe(setting => {
        this.shippingFee = setting.shippingFee;
        this.tax = setting.tax;
        const subtotal = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        this.total = subtotal + this.shippingFee + this.tax;
      });
    });
  }

  getSubtotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
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
      totalAmount: this.total,
      shippingFee: this.shippingFee,
      tax: this.tax,
      paymentMethod: this.paymentMethod,
      address: deliveryAddress,
      status: OrderStatus.Pending,

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
