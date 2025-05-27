import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartItem } from '../../../models/cart-item.model';
import { CartService } from '../../../services/cart.service';

@Component({
  standalone: true,
  selector: 'app-cart',
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.loadCartItems();
  }

  loadCartItems() {
    this.cartService.getCartItems().subscribe(items => this.cartItems = items);
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  updateQuantity(item: CartItem, change: number): void {
    item.quantity += change;
    if (item.quantity <= 0) {
      this.removeItem(item.id);
    } else {
      // Update item quantity in backend
      this.cartService.updateCartItem(item).subscribe({
        next: () => this.loadCartItems(),
        error: err => console.error('Error updating item:', err)
      });
    }
  }

  removeItem(id: number): void {
    // Remove item in backend
    this.cartService.removeCartItem(id).subscribe({
      next: () => this.loadCartItems(),
      error: err => console.error('Error removing item:', err)
    });
  }
}