import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartItem } from '../../../models/cart-item.model';
import { CartService } from '../../../services/cart.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  standalone: true,
  selector: 'app-cart',
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(
    private cartService: CartService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.loadCartItems();
  }

  loadCartItems() {
    this.cartService.getCartItems().subscribe({
      next: items => {
        this.cartItems = items;
        this.toastService.show('Cart items loaded successfully!', 'success');
      },
      error: err => {
        console.error('Error loading cart items:', err);
        this.toastService.show('Failed to load cart items.', 'error', 4000);
      }
    });
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  updateQuantity(item: CartItem, change: number): void {
    const newQuantity = item.quantity + change;

    if (newQuantity < 1) {
      this.removeItem(item.id!);
      return;
    }

    if (item.availableStock !== undefined && newQuantity > item.availableStock) {
      this.toastService.show(`Only ${item.availableStock} units available in stock.`, 'error');
      return;
    }

    this.cartService.updateCartItemQuantity(item.id!, newQuantity).subscribe({
      next: () => {
        this.loadCartItems();
        this.toastService.show('Cart item updated.', 'success');
      },
      error: err => {
        console.error('Error updating item:', err);
        this.toastService.show('Failed to update cart item.', 'error');
      }
    });
  }

  removeItem(id: number): void {
    this.cartService.removeCartItem(id).subscribe({
      next: () => {
        this.loadCartItems();
        this.toastService.show('Item removed from cart.', 'success');
      },
      error: err => {
        console.error('Error removing item:', err);
        this.toastService.show('Failed to remove item.', 'error', 4000);
      }
    });
  }
}
