import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-cart-button',
  imports: [CommonModule, RouterModule],
  templateUrl: './cart-button.component.html',
  styleUrl: './cart-button.component.css'
})
export class CartButtonComponent implements OnInit {
  cartCount = 0;
  isLoggedIn = false;

  constructor(private cartService: CartService, private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();

    if (this.isLoggedIn) {
      // Subscribe to reactive cart count
      this.cartService.cartCount$.subscribe(count => {
        this.cartCount = count;
      });

      // Trigger initial fetch
      this.cartService.refreshCartCount();
    }
  }
}
