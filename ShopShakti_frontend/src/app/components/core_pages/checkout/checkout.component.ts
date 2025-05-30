import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { Router } from '@angular/router';
import { CartItem } from '../../../models/cart-item.model';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-checkout',
  imports: [CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = [];
  total = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    });
  }

  checkout() {
    // Simulate checkout
    alert('Checkout successful!');
    this.router.navigate(['/order-success']);
  }
}
